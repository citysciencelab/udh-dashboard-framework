<template>
    <div id="map-div-id" v-bind:style="mapStyle"></div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import "ol/ol.css";
    import {Style, Stroke, Fill} from "ol/style";
    import * as mpapi from "masterportalAPI";
    import { Feature } from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import VectorLayer from 'ol/layer/Vector';
    import { Layer } from 'ol/layer';

    @Component({})
    export default class MasterPortalMap extends Vue {
        @Prop() customLayerId!: string;
        @Prop() portal!: Datum;
        @Prop() services!: Datum;
        @Prop() mapStyle!: object;
        @Prop() featureData!: Feature[];
        @Prop() md_id!: string;
        cWindow: any = window;
        tempLayers: Layer[] | unknown;

        mounted() {
            if (!this.customLayerId) this.customLayerId === "dashboardData";
            // wait for the Tile To be rendered completely
            // wait for DOM height to be adjusted
            // TODO: make it event based
            setTimeout(() => {
                this.createMap();
                this.showFeaturesInMap();
                this.createLayerByMdId();
            }, 1000);
        }

        createMap() {
            this.cWindow.mpapi = {
                ...mpapi,
                map: null
            };

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

            this.cWindow.mpapi.map = mpapi.createMap({
                ...this.portal,
                layerConf: this.services
            });
        }

        showFeaturesInMap() {
            const layer = this.cWindow.mpapi.wfs.createLayer({id: this.customLayerId}, {}, {}, this.featureData);

            this.cWindow.mpapi.map.removeLayer(this.customLayerId);
            this.cWindow.mpapi.map.addLayer(layer);
        }

        createLayerByMdId() {
            if (this.md_id) {
                if (this.tempLayers) {
                    (this.tempLayers as Layer[]).forEach(layer => {
                       this.cWindow.mpapi.map.removeLayer(layer);
                    });
                }
                this.cWindow.mpapi.createLayer(this.md_id, 1).then((layer: Layer) => {
                    this.tempLayers = layer;
                });
            }
        }

        @Watch('featureData') onFeatureDataChanged() {
            this.showFeaturesInMap();
        }

        @Watch('md_id') onMdIdChanged() {
            this.createLayerByMdId();
        }
    }
</script>

<style scoped>
    #map-div-id {
        height: 100% !important;
        width: 100% !important;
    }
</style>