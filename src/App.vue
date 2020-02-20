<template>
    <div id="page" class="page-container">
        <div id="loading-overlay" v-if="this.loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>

        <div id="nav">
            <router-link to="/udpc">UDPC</router-link>
            |
            <router-link to="/participation">Participation</router-link>
        </div>

        <md-app class="md-app-scroll-fix" md-waterfall md-mode="fixed">
            <md-app-content>
                <router-view/>
            </md-app-content>
        </md-app>
        <div id="snack"><div></div></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CountryFlag from 'vue-country-flag';

@Component({
    components: {
        CountryFlag
    }
})
export default class App extends Vue {
    get loading(): boolean {
        return this.$store.getters.loading;
    }
}
</script>

<style lang="scss" scoped>
    #loading-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.4);
        position: absolute;
        z-index: 1000;

        div {
            top: 45%;

            circle {
                stroke: green;
            }
        }
    }
</style>

<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");

    #page {
        text-align: center;
        color: #2c3e50;
        background-size: cover;
        -webkit-transition: background-image 0.5s ease-in-out;
        transition: background-image 0.5s ease-in-out;

        .md-card.chart-card, .md-card.md-theme-default,
        .filter-button, .md-menu.md-select,
        .facts-holder span {
            background-color: rgba(255, 255, 255, 0.9) !important;
        }

        .md-card {
            padding: 15px;
            margin: 0;
            height: 100%;
            position: relative;

            .md-card-header {
                position: relative;
                padding: 0 !important;
                z-index: 2;

                .tool-tip-header {
                    cursor: pointer;
                    font-size: 15pt;
                    text-align: left;
                }
            }

            .md-card-content {
                padding: 15px 0 0 0;
                height: auto;
            }

            .md-card-actions {
                position: absolute;
                bottom: 0;
                left: 0;
                margin: 0;
                padding: 0 20px !important;
                width: 100%;
            }
        }


        .md-card .md-card-header .info-icon {
            font-size: 19px !important;
            width: 15px;
            height: 15px;
            position: absolute;
            top: 2px;
            right: 2px;
            min-width: 15px;
        }

        .md-toolbar {
            background-color: white;
            border-bottom: 1px solid black;
        }

        .md-app, .md-app-container, .md-app-content {
            background: none;
            padding: 0;
        }

        .md-app-scroll-fix {
            height: 100vh;
        }

        #nav {
            background-color: rgba(255,255,255,0.5);
            padding: 30px;

            a {
                font-weight: bold;
                color: #2c3e50;

                &.router-link-exact-active {
                    color: #42b983;
                }
            }
        }

        .content {
            display: grid;
            grid-template-columns: 1fr 2fr;
        }

        .chart {
            padding: 10px;
        }

        rect.bar {
            fill: #004e79;
        }

        circle.point {
            fill: #9B59B6;
        }

        .tt {
            font-size: 10px;
            background-color: white;
        }

        .flag {
            cursor: pointer;
        }
    }


    /*
        Charts
    */

    .chart-row {
        margin-top: 40px;

        .chart-holder {
            height: 100%;
            width: 100%;
            margin: 0;
            padding-left: 10px !important;
            padding-right: 10px !important;
            padding-bottom: 20px !important;
        }
    }


    /*
     Tooltip
    */

    .d3-tip, .md-tooltip, .md-snackbar, .udpc-tooltip .tooltip-inner {
        background: rgba(0, 0, 0, 0.65) !important;

        a:link, a:hover, a:visited, a:active {
            color: white;
            text-decoration: underline;
        }
    }

    .udpc-tooltip .arrow::before {
        border-top-color: rgba(0, 0, 0, 0.65) !important;
    }

    .d3-tip, .md-tooltip, .md-snackbar {
        font-family: 'HamburgSans' !important;
        line-height: 1 !important;
        padding: 10px !important;
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
        margin: 0 0 0 0;
        top: 100%;
        left: 50%;
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
