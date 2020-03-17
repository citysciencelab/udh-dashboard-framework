<template>
  <div
    id="map-div-id"
    ref="map"
    :style="mapStyle"
  />
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import "ol/ol.css";
    import {Style, Stroke, Fill} from "ol/style";
    import * as mpapi from "masterportalAPI";

    @Component({})
    export default class MasterPortalMap extends Vue {
        @Prop() customLayerId!: string;
        @Prop() portal!: { [key: string]: any };
        @Prop() services!: { [key: string]: any };
        @Prop() mapStyle!: object;
        @Prop() featureData!: FeatureSet;
        @Prop() md_id!: string;
        map!: mpapi.MPMap;
        tempLayers!: Layer[];

        mounted() {
            if (!this.customLayerId) this.customLayerId === "dashboardData";
            // wait for the Tile To be rendered completely
            // wait for DOM height to be adjusted
            // TODO: make it event based
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

            window.addEventListener('resize', this.onResize.bind(this));
            this.onResize();
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
            this.map.setSize([0, 0]);
            setTimeout(() => {
                 this.map.setSize([(this.$refs.map as Element).clientWidth, (this.$refs.map as Element).clientHeight]);
            }, 5);
        }
    }
</script>

<style scoped>
    #map-div-id {
        height: 100%;
    }
</style>
