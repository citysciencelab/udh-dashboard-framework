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

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files

This projct uses ESLint with the [Vue Recommended ruleset](https://eslint.vuejs.org/rules/#priority-c-recommended-minimizing-arbitrary-choices-and-cognitive-overhead-for-vue-js-2-x).

```
npm run lint
```

### Creating a new dashboard

Try to reuse existing components as much as possible.
Create a new view in the views folder and add a path to the routing.js file.
Create a new vuex storage module in the store folder.
The storage module should handle your view specific data request and processing.
The storage module should be lazy loaded in the corresponding view - this way it will only be loaded when used.

### Including a Vue component in the Masterportal Backbone environment

The vue dashboard framework has been designed so that single components can be included in a backbone environment.
Further details for the integration process can also be found in the following tutorial:
[Vue based scale switcher](https://bitbucket.org/illD/masterportal-vue/src/dev/doc/03_tutorial_vue_module_scale_switcher.md).
The BackBoneVueRenderer should be used in the same way as shown in the example.

### MasterportalAPI

Uses the lightweight [MasterportalAPI](https://bitbucket.org/geowerkstatt-hamburg/masterportalapi.git) to create maps inside the dashboard, that visualize data and allow for interaction between dashboard and map.
Vue Dashboard uses the MasterportalAPI fork from [CityScienceLab](https://bitbucket.org/dasc3290/masterportalapi-csl.git).
A full documentation of all MasterportalAPI features and their interaction with the vue dashboard can be found there.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).