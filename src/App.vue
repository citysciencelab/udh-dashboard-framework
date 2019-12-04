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

</style>
