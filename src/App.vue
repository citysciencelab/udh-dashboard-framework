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

        .flag {
            cursor: pointer;
        }

        .main-row {
            margin-top: 40px;
        }

    }


    /*
        Tooltip, Hover Info etc.
    */

    .d3-tip, .md-tooltip, .md-snackbar {
        line-height: 1 !important;
        padding: 10px !important;
        color: #fff !important;
        border-radius: 4px !important;
        pointer-events: none !important;
        font-size: 1rem !important;
        height: initial !important;
    }

    .udpc-tooltip .arrow::before {
        border-top-color: rgba(0, 0, 0, 0.65) !important;
    }

</style>
