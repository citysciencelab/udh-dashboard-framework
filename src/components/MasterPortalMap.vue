<template>
    <div id="map-div-id"></div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    import "ol/ol.css";
    import {Style, Stroke, Fill} from "ol/style";
    import * as mpapi from "masterportalAPI";

    @Component({})
    export default class MasterPortalMap extends Vue {
        @Prop() portal!: Datum;
        @Prop() services!: Datum;
        @Prop() geoJson!: any;
        geoJsonId = '2002';
        cWindow: CustomWindow = window;

        mounted() {
            console.log(this.geoJson);
            this.testCreateMPMap();
        }

        @Watch('geoJson') onGeoJsonChanged(newVal: any) {
            //TODO: in the case of a local GeoJSON this should update the corresponding layer
            let newLayer = this.createGeoJsonLayer();
            this.cWindow.mpapi.map.removeLayer(this.geoJsonId);
            // how to add this to layerconf
            // this.services.push(this.createGeoJsonLayer());
            // this.cWindow.mpapi.map.addLayer(this.geoJsonId);
        }

        testCreateMPMap() {
            this.cWindow.mpapi = {
                ...mpapi,
                map: null
            };

            const mapElement = document.getElementById(this.portal.target);
            if (mapElement) {
                mapElement.innerHTML = "";
            }

            this.services.push(this.createGeoJsonLayer());

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

            ["2001", this.geoJsonId].forEach(id =>
                this.cWindow.mpapi.map.addLayer(id)
            );
        }

        createGeoJsonLayer() {
            const localService: Datum = {
                id: this.geoJsonId,
                typ: "GeoJSON",
                features: this.geoJson
            };
            return localService;
        }
    }
</script>

<style scoped>
    #map-div-id {
        height: 100% !important;
        width: 100% !important;
    }
</style>