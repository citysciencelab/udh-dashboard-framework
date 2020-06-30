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
           class="layer-tag"
           @click="onClick">
          {{ layerTitle || overlay || mapTitle }}
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
        @Prop({default: "GeoOnline | LGV Hamburg"}) mapTitle!: string;
        @Prop() overlay!: string;
        @Prop({default: {}}) portal!: { [key: string]: any };
        @Prop() services!: { [key: string]: any };
        @Prop() mapStyle!: object;
        @Prop() featureData!: FeatureSet;
        @Prop() md_id!: string;
        @Prop() linkPrefix!: string;
        @Prop({default: 'FHHNET'}) internalNetwork!: string

        map!: mpapi.MPMap;
        tempLayers!: Layer[];
        layerTitle: string | null = null;
        isFullscreen: boolean = false;
        mapEl: Element | null = null;

        $refs!: {
            fullscreen: InfoOverlay,
            mapWrapper: Element,
            map: Element
        }

        get linkTitle(): LocaleMessage {
            return this.md_id ? this.$t('udpc.tooltipHdmkLink') : this.$t('udpc.tooltipGeneralLink');
        }

        get linkUrl(): string {
            return this.md_id ? this.linkPrefix + this.md_id : "https://geoportal-hamburg.de/geo-online/";
        }

        mounted() {
            this.createMap();
            this.showFeaturesInMap();
            this.createLayerByMdId();
        }

        /**
         * initialize the map with it's initial/default props
         * uses MasterportalAPI.createMap
         * @returns {void}
         */
        createMap() {
            const mapElement = this.$refs.map;
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
                        color: "rgba(255,255,255,0.2)"

                    })
                })
            });

            this.map = mpapi.createMap(Object.assign(this.portal, {layerConf: this.services}));

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

        /**
         * remove the window.onresize listener if the component is unmounted
         */
        destroyed() {
            window.removeEventListener('resize', this.onResize.bind(this));
        }

        /**
         * renders a new layer if dedicated vector features are provided
         * @returns {void}
         */
        showFeaturesInMap() {
            const layer = mpapi.wfs.createLayer({id: this.customLayerId}, {}, {}, this.featureData);

            this.map.removeLayer(this.customLayerId);
            this.map.addLayer(layer);
        }

        /**
         * reads out the md_id property and triggers the rendering of the resp. layer by
         * MasterportalAPI.map.createLayer
         * @returns {void}
         */
        createLayerByMdId() {
            if (this.md_id) {
                if (this.tempLayers) {
                    (this.tempLayers as Layer[]).forEach(layer => {
                       this.map.removeLayer(layer);
                    });
                }
                this.map.createLayer(this.md_id, 5).then((layers: Layer[]) => {
                    this.tempLayers = layers;
                    this.layerTitle = this.composeLayerTitle(layers[0]);
                });
            }
        }

        /**
         * creates a Title for the map overlay, uses default title as fallback
         * @returns {string}
         */
        composeLayerTitle (layer: Layer): string | null {
            const title = this.overlay ? this.overlay + ': ' : '',
                layerName = layer ? layer.get('name') : '';

            return title || layerName ? title + layerName : null;
        }

        @Watch('featureData') onFeatureDataChanged() {
            this.showFeaturesInMap();
        }

        @Watch('md_id') onMdIdChanged() {
            this.createLayerByMdId();
        }

        /**
         * fired when viewport is resized and manually, resizes the map to it's new container constraints
         * @returns {void}
         */
        onResize() {
            if (this.$refs.map) {
                this.map.setSize([0, 0]);
                setTimeout(() => {
                        this.map.setSize([(this.$refs.map as Element).clientWidth, (this.$refs.map as Element).clientHeight]);
                }, 5);
            }
        }

        /**
         * move map to the opened overlay, resize accordingly
         * @listens onOpenFullscreen Event on Fullscreen Button
         * @returns {void}
         */
        onOpenFullscreen () {
            (this.$refs.fullscreen as InfoOverlay).show();
            this.onResize();
            this.isFullscreen = true;
            this.$emit('fullscreenMap', true);
        }

        /**
         * move map back to original container, resize accordingly
         * @listens onCloseFullscreen Event on Overlay
         * @returns {void}
         */
        onCloseFullscreen () {
            this.$el.append(this.$refs.mapWrapper);
            this.onResize();
            this.isFullscreen = false;
            this.$emit('fullscreenMap', false);
        }

        /**
         * click event handler on <a> element click and alerts the app if the link leads to an internal source
         * @fires tooltip-internal-network Event to the parent component
         * @returns {void}
         */
        onClick(evt: Event) {
            if (this.layerTitle) {
                if (this.layerTitle.includes(this.internalNetwork)) {
                    evt.preventDefault();
                    this.$emit('tooltip-internal-network', {
                        label: this.layerTitle,
                        link: this.linkUrl
                    });
                }
            }
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
