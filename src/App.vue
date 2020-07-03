<template>
  <div class="page">
    <div v-if="loading"
         class="loading-overlay">
      <md-progress-spinner md-mode="indeterminate" />
    </div>

    <md-app class="md-app-scroll-fix"
            md-waterfall
            md-mode="fixed">
      <md-app-content>
        <router-view />
      </md-app-content>
    </md-app>

    <div id="snack" />
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
        return this.$store.getters.loading();
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons");

.page {
    text-align: center;
    color: #2c3e50;
    background-size: cover;
    -webkit-transition: background-image 0.5s ease-in-out;
    transition: background-image 0.5s ease-in-out;

    .loading-overlay {
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

    .nav {
        height: 80px;
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

    .md-toolbar {
        background-color: white;
        border-bottom: 1px solid black;
    }

    .md-app, .md-app-container, .md-app-content {
        background: none;
        padding: 0;
    }

    .md-app {
        height: 100vh;
    }

    .flag {
        cursor: pointer;
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
    font-size: 12px !important;
    font-weight: bold;
    height: initial !important;
}

.udpc-tooltip .arrow::before {
    border-top-color: rgba(0, 0, 0, 0.65) !important;
}

.d3-tip, .md-tooltip, .md-snackbar, .udpc-tooltip .tooltip-inner {
  background: rgba(0, 0, 0, 0.65) !important;

  a:link, a:hover, a:visited, a:active {
    color: white;
    text-decoration: underline;
  }
}

  /*
  Creates a small triangle extender for the tooltip
  */

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
