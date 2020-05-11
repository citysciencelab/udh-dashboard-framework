<template>
  <div id="map-wrapper">
    <div class="overlay top right"
         @click="onOpenFullscreen">
      <md-icon>aspect_ratio</md-icon>
    </div>
    <div id="map-wrapper"
         ref="mapWrapper">
      <div id="map-div-id"
           ref="map"
           :style="mapStyle" />
      <div class="overlay bottom left banner">
        <a :href="linkUrl"
           :title="linkTitle"
           target="_blank"
           class="layer-tag">
          {{ overlayText || overlay }}
          <md-icon v-if="linkUrl">launch</md-icon>
        </a>
      </div>
    </div>
    <info-overlay v-if="mapEl"
                  ref="fullscreen"
                  style="width:95%; height:95%;"
                  :html="mapEl"
                  @closed="onCloseFullscreen" />
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import InfoOverlay from './InfoOverlay.vue';
    import "ol/ol.css";
    import {Style, Stroke, Fill} from "ol/style";
    import * as mpapi from "masterportalAPI";
    // eslint-disable-next-line no-unused-vars
    import { Layer } from 'ol/layer';
    // eslint-disable-next-line no-unused-vars
    import { LocaleMessage } from 'vue-i18n';

    @Component({
        components: {
            InfoOverlay
        }
    })
    export default class MasterPortalMap extends Vue {
        @Prop({default: "dashboardData"}) customLayerId!: string;
        @Prop({default: "GeoOnline | LGV Hamburg"}) overlay!: string;
        @Prop() portal!: { [key: string]: any };
        @Prop() services!: { [key: string]: any };
        @Prop() mapStyle!: object;
        @Prop() featureData!: FeatureSet;
        @Prop() md_id!: string;
        @Prop() storeId!: string;

        map!: mpapi.MPMap;
        tempLayers!: Layer[];
        overlayText: string | null = null;
        isFullscreen: boolean = false;
        mapEl: Element | null = null;

        $refs!: {
            fullscreen: InfoOverlay,
            mapWrapper: Element,
            map: Element
        }

        get hmdkUrl(): string | undefined {
            if (this.storeId) {
                return this.$store.state[this.storeId].hmdkUrl;
            }
            return this.$store.state.hmdkUrl
        }

        get linkTitle(): LocaleMessage {
            return this.md_id ? this.$t('udpc.tooltipHdmkLink') : this.$t('udpc.tooltipGeneralLink');
        }

        get linkUrl(): string {
            return this.md_id ? this.hmdkUrl + this.md_id : "https://geoportal-hamburg.de/geo-online/";
        }

        mounted() {
            this.createMap();
            this.showFeaturesInMap();
            this.createLayerByMdId();
        }

        createMap() {
            const mapElement = document.getElementById(this.portal.target);
            if (mapElement) {
                mapElement.innerHTML = "";
            }

            mpapi.geojson.setCustomStyles({
                MultiPolygon: new Style({
                    stroke: new Stroke({
                        width: 2,
                        color: "#000000"
                    }),
                    fill: new Fill({
                        color: "#FFFFFF55"
                    })
                })
            });

            this.map = mpapi.createMap({
                ...this.portal,
                layerConf: this.services
            });

            // set the Prop for the fullscreen container after map init
            this.mapEl = this.$refs.mapWrapper;

            // make map resolution responsive on window resize
            window.addEventListener('resize', this.onResize.bind(this));

            // HACK: wait briefly for render of charts to finish an readjust the scaling
            // TODO: Make event/lifecycle based
            setTimeout(() => {
                this.onResize();
            }, 2000);
        }

        destroyed() {
            window.removeEventListener('resize', this.onResize.bind(this));
        }

        showFeaturesInMap() {
            const layer = mpapi.wfs.createLayer({id: this.customLayerId}, {}, {}, this.featureData);

            this.map.removeLayer(this.customLayerId);
            this.map.addLayer(layer);
        }

        createLayerByMdId() {
            if (this.md_id) {
                if (this.tempLayers) {
                    (this.tempLayers as Layer[]).forEach(layer => {
                       this.map.removeLayer(layer);
                    });
                }
                this.map.createLayer(this.md_id, 5).then((layers: Layer[]) => {
                    this.tempLayers = layers;
                    this.overlayText = layers[0] ? layers[0].get('name') : null;
                });
            }
        }

        @Watch('featureData') onFeatureDataChanged() {
            this.showFeaturesInMap();
        }

        @Watch('md_id') onMdIdChanged() {
            this.createLayerByMdId();
        }

        onResize() {
            if (this.$refs.map) {
                this.map.setSize([0, 0]);
                setTimeout(() => {
                        this.map.setSize([(this.$refs.map as Element).clientWidth, (this.$refs.map as Element).clientHeight]);
                }, 5);
            }
        }

        onOpenFullscreen () {
            (this.$refs.fullscreen as InfoOverlay).show();
            this.onResize();
            this.isFullscreen = true;
            this.$emit('fullscreenMap', true);
        }

        onCloseFullscreen () {
            this.$el.append(this.$refs.mapWrapper);
            this.onResize();
            this.isFullscreen = false;
            this.$emit('fullscreenMap', false);
        }
    }
</script>

<style scoped lang="scss">
    #map-div-id {
        height: 100%;
        width: 100%;
    }
    #map-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        min-height: 240px;
    }
</style>
