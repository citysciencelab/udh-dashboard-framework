<template>
    <div id="page" class="page-container">
        <md-app class="md-app-scroll-fix" md-waterfall md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <div class="md-toolbar-row">
                    <span class="md-title">My Title</span>
                    <div class="md-toolbar-section-end">
                        <md-menu md-direction="bottom-start">
                            <md-button md-menu-trigger>
                                <country-flag v-if="$i18n.locale === 'de'" @click="changeLanguage('de')"
                                              country='de' size='normal' />
                                <country-flag v-if="$i18n.locale === 'en'" @click="changeLanguage('en')"
                                              country='gb' size='normal' />
                            </md-button>
                            <md-menu-content>
                                <md-menu-item @click="changeLanguage('de')">
                                    <country-flag country='de' size='normal' />
                                </md-menu-item>
                                <md-menu-item @click="changeLanguage('en')">
                                    <country-flag country='gb' size='normal' />
                                </md-menu-item>
                            </md-menu-content>
                        </md-menu>
                    </div>
                </div>
            </md-app-toolbar>
            <md-app-content>
                <div id="nav">
                    <router-link to="/">Home</router-link>
                    |
                    <router-link to="/about">About</router-link>
                    |
                    <router-link to="/charts">Charts</router-link>
                </div>
                <router-view/>
            </md-app-content>
        </md-app>
        <!--<div id="snack"><div></div></div>-->
    </div>
</template>

<script>
    import CountryFlag from 'vue-country-flag'

    export default {
        components: {
            CountryFlag
        },
        methods: {
            changeLanguage: function (lang) {
                this.$i18n.locale = lang
            }
        }
    }

</script>

<style lang="scss">
    @import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");

    #page {
        font-family: 'HamburgSans-Regular';
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 10px;*/

        .md-app-scroll-fix {
            height: 100vh;
        }

        #nav {
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

        .segment {
            display: grid;
            grid-template-columns: 1fr 1fr;
            text-align: center;
        }

        .chart {
            /*justify-self: center;*/
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

        .md-button.md-primary.md-raised.active {
            background-color: rgba(211,211,211 ,.5 ) !important;
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
        font-family: 'HamburgSans-Regular' !important;
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
        /*margin: -1px 0 0 0;*/
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
