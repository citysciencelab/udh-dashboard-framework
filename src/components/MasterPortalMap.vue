<template>
    <div id="map-div-id" v-bind:style="mapStyle"></div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import "ol/ol.css";
    import {Style, Stroke, Fill} from "ol/style";
    import * as mpapi from "masterportalAPI";
    import { Feature } from 'ol';

    @Component({})
    export default class MasterPortalMap extends Vue {
        @Prop() customLayerId!: string;
        @Prop() portal!: Datum;
        @Prop() services!: Datum;
        @Prop() mapStyle!: object;
        @Prop() featureData!: Feature[];
        cWindow: CustomWindow = window;

        mounted() {
            if (!this.customLayerId) this.customLayerId === "dashboardData";
            this.createMap();
            this.showFeaturesInMap();
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

        @Watch('featureData') onFeatureDataChanged() {
            this.showFeaturesInMap();
        }
    }
</script>

<style scoped>
    #map-div-id {
        height: 100% !important;
        width: 100% !important;
    }
</style>