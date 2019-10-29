# vue-dashboard

## Project setup
```
npm install
```

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
