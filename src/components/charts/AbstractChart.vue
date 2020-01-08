<script>
    import $ from 'jquery';

    export default {
        name: "abstract-chart",
        data: () => ({
            width: 300,
            height: 300,
            horizontalOffset: 60,
            barAxisSpace: 10
        }),
        props: {
            ds: Array,
            title: String,
            options: Object,
            metric: String,
            selector: String,
            holderElement: String
        },
        watch: {
            ds() {
                if (this.ds.length > 0) {
                    this.createChart(this.$d3, this.ds, this.options);
                }
            }
        },
        mounted() {
            // This double checks the setting of all $props variables
            // If the component gets initiated by

            //TODO: vielleicht in der componente vue-masterportal attrs gegen props austauschen und das callen ausprobieren!!!
            for (let obj of Object.keys(this.$props)) {
                if (this.$props[obj] === null) {
                    // console.log("Property " + this.$props[obj] + " is NOT set.");
                    if (this.$attrs[obj] !== null) {
                        // console.log("Found property " + this.$props[obj] + " in attrs instead.");
                        this.$props[obj] = this.$attrs[obj];
                    }
                } else {
                    // console.log("Property " + this.$props[obj] + " is set.")
                }
            }
        },
        methods: {
            redrawOnDimensionsChange: function (svg) {
                const dimensions = this.$utils.chart.getDimensions(svg, this.title, this.holderElement);
                if (this.$data.width !== dimensions[0] || this.$data.height !== dimensions[1]) {
                    this.$data.width = dimensions[0];
                    this.$data.height = dimensions[1] < 1 ? 300 : dimensions[1];
                    if (this.ds.length > 0) {
                        this.createChart(this.$d3, this.ds, this.options);
                    }
                }
            },
            getSVGElement() {
                return $('#' + this.selector);
            }
        }
    }
</script>

<style>
    .chart-container {
        display: inline-block;
        position: relative;
        width: 100%;
        padding-bottom: 100%;
        vertical-align: top;
        overflow: hidden;
    }

    .chart {
        padding: 0 !important;
        height: 100%;
        width: 100%;
        display: inline-block;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>