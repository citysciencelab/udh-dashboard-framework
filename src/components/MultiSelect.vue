<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label :for="identifier">{{ label }}</label>
        <md-select :id="identifier"
                   v-model="selectedData"
                   multiple>
          <md-option v-for="(item, index) in selectData"
                     :key="index"
                     :value="item">
            {{ item }}
          </md-option>
        </md-select>
      </md-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class MultiSelect extends Vue {
    @Prop() identifier!: string;
    @Prop() selectData!: Dataset;
    @Prop() label!: string;

    get selectedData() {
        /*
         * Uncommenting the following two lines will cause an infinite loop in the browser
         * as soon as an item is selected from the list. How to solve this? Somehow there
         * must be a way to set the filters from outside the component ...
         */
        // const filters = this.$store.getters.filters();
        // return filters[this.identifier] || [];
        return [];
    }

    set selectedData(data) {
        this.$emit('new_selection', [this.identifier, data]);
    }
}
</script>

<style scoped lang="scss">
.md-field {
    max-width: 300px;
}
</style>
