# vue-dashboard

## Including a Vue component in the Masterportal Backbone environment

The vue dashboard framework has been designed so that single components can be included in a backbone environment.
Further details for the integration process can also be found in the following tutorial:
[Vue based scale switcher](https://bitbucket.org/illD/masterportal-vue/src/dev/doc/03_tutorial_vue_module_scale_switcher.md).
The BackBoneVueRenderer should be used in the same way as shown in the example.

## Project setup
```
npm install
```

## Create a new dashboad

Try to reuse existing components as much as possible.
Create a new view in the views folder and add a path to the routing.js file.
Create a new vuex storage module in the store folder.
The storage module should handle your view specific data request and processing.
The storage module should be lazy loaded in the corresponding view - this way it will only be loaded when used.


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


##Include  Vue-Chart-Components in a Backbone Context

```
The corresponding Vue-Component has to be imported in the view.js filer
import BarChart from "./vue-dashboard/src/charts/BarChart.vue";
Define the options = {} in the Render-Method
Those two components and the parent HTML element will be passed to the BackboneVueRenderer  
new BackboneVueRenderer(BarChart, document.getElementsByClassName("win-body")[0], options);

Beforehand the main.js of the importing project has to be adjusted to match the neccessary imports (see main.js of this projectz)
```
