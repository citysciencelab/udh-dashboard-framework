<template>
  <div class="md-layout md-gutter multi-select">
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
            &nbsp;<md-tooltip md-direction="top">
                    {{ item }}
                  </md-tooltip>
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

    /*
     * Communicates the new selection to the assigned method that implements this component
     */
    closed(force: boolean) {
        if (this.isOnceSelected || force) {
            this.$emit('new_selection', [this.identifier, this.selectedData]);
        }
    }

    /*
     * In case we want to trigger a recalculation from outside
     */
    forceUpdate() {
        this.$forceUpdate();
    }

    /*
     * Resets selected filter values
     */
    public resetSelection() {
      this.selectedData = [];
    }
}
</script>

<style scoped lang="scss">
.multi-select >>> .md-field {
    max-width: 300px;
    min-height: 40px;
    margin: 0 0 10px;
    padding-top: 0;

    label {
      top: 14px;
    }
    .md-select {
      .md-icon {
        margin-top: 10px;
      }
    }

}
</style>
