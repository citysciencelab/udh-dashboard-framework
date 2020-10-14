# vue-dashboard

Vue Dashboard is a generic dashboard tool currently containing two example implementations:
- `udpc` - Urban Data Platform Cockpit
- `participation` - Participation Cockpit

## Developer Documentation

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
Plese note that the paths in the built /dist/ folder are all *absolute*!
The built app cannot be opened on a local system, since it relies on the webserver to define a `root` path to its index.html.

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files

This projct uses ESLint with the [Vue Recommended ruleset](https://eslint.vuejs.org/rules/#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead-for-vue-js-2-x).

```
npm run lint
```

### Creating a new dashboard

Try to reuse existing components as much as possible.
Create a new view in the views folder and add a path to the router.js file.
Create a new vuex storage module in the store folder.
The storage modules (src/store) should handle your view specific data request and processing.
Default storage state, mutations, actions, getters and setters is initialized for every dashboard and included via dashboard.module.ts
The individual storage modules for a single dashboard should be lazy loaded in the corresponding view:
```
    this.$store.registerModule('storename', storeVariable);
```
This way it will only be loaded when used.


### Data connectors

Many dashboards will get the underlying data from a variety of sources.
The connectors should be as reusable as possible so that they dont have to be recreated again for every project.
They will all be in the connectors folder.


### Internationalization

vue-i18n package is used to change the applications language
The corresponding messages are stored in an individual file for each dashboard in the /messages folder and lazy loaded 
Messages that will be used by a multitude components, should be kept in the messages.module.ts
A changeLanguage method is in the AbstractDashboard and can be reused


### Including a Vue component in the Masterportal Backbone environment

The vue dashboard framework has been designed so that single components can be included in a backbone environment.
Further details for the integration process can also be found in the following tutorial:
[Vue based scale switcher](https://bitbucket.org/illD/masterportal-vue/src/dev/doc/03_tutorial_vue_module_scale_switcher.md).
The BackBoneVueRenderer should be used in the same way as shown in the example.

### MasterportalAPI

Uses the lightweight [MasterportalAPI](https://bitbucket.org/geowerkstatt-hamburg/masterportalapi.git) to create maps inside the dashboard, that visualize data and allow for interaction between dashboard and map.
Vue Dashboard uses the MasterportalAPI fork from [CityScienceLab](https://bitbucket.org/dasc3290/masterportalapi-csl.git).
A full documentation of all MasterportalAPI features and their interaction with the vue dashboard can be found there.

### Charting

Since the LGV uses chartJS as well as D3, you can find implementations of both libraries in the components/charts folder.
For simple diagrams chartJ should provide sufficient functionality. If however a special diagram-type or customization is necessary, D3 should be the library of choice.
Currently all chartJS components are functional. Of the D3 components only the TreeMapChartD3 is working. The rest of the examples are included but not ready to use.


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
