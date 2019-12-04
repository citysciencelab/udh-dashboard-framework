<script>
    export default {
        name: "abstract-chart",
        data: () => ({
            width: 300,
            height: 300,
            horizontalOffset: 60
        }),
        props: {
            ds: Array
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
                const dimensions = this.$utils.chart.getDimensions(svg, this.title);
                if (this.$data.width !== dimensions[0] || this.$data.height !== dimensions[1]) {
                    this.$data.width = dimensions[0];
                    this.$data.height = dimensions[1] < 1 ? 300 : dimensions[1];
                    this.createChart(this.$d3, this.ds, this.options);
                }
            }
        }
    }
</script>

<style scoped>

</style>

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

    /*
     Tooltip
    */
    .d3-tip, .md-tooltip, .md-snackbar {
        font-family: 'HamburgSans-Regular' !important;
        line-height: 1 !important;
        padding: 10px !important;
        background: rgba(0, 0, 0, 0.55) !important;
        color: #fff !important;
        border-radius: 4px !important;
        pointer-events: none !important;
        font-size: 1rem !important;
        height: initial !important;
    }

    /* Creates a small triangle extender for the tooltip */
    .d3-tip:after {
        box-sizing: border-box;
        display: inline;
        font-size: 8px;
        line-height: 1;
        color: rgba(0, 0, 0, 0.55);
        position: absolute;
        pointer-events: none;
    }

    /* Northward tooltips */
    .d3-tip.n:after {
        content: "\25BC";
        /*margin: -1px 0 0 0;*/
        margin: 0 0 0 0;
        top: 100%;
        left: 0;
        text-align: center;
    }

    /* Eastward tooltips */
    .d3-tip.e:after {
        content: "\25C0";
        margin: -4px 0 0 0;
        top: 50%;
        left: -8px;
    }

    /* Southward tooltips */
    .d3-tip.s:after {
        content: "\25B2";
        margin: 0 0 1px 0;
        top: -8px;
        left: 0;
        text-align: center;
    }

    /* Westward tooltips */
    .d3-tip.w:after {
        content: "\25B6";
        margin: -4px 0 0 -1px;
        top: 50%;
        left: 100%;
    }
</style>