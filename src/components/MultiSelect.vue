<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label :for="identifier">{{ label }}</label>
        <md-select :id="identifier"
                   v-model="selectedData"
                   multiple
                   @md-closed="closed"
                   @md-selected="setSelected">
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
    selectedData: string[] = [];
    isOnceSelected: boolean = false;

    /*
     * Closed event fires on init with empty selectData. Need to make sure that value emit is on purpose.
     */
    setSelected() {
        this.isOnceSelected = true;
    }

    closed(force: boolean) {
        if (this.isOnceSelected || force) {
            this.$emit('new_selection', [this.identifier, this.selectedData]);
        }
    }
}
</script>

<style scoped lang="scss">
.md-field {
    max-width: 300px;
}
</style>
