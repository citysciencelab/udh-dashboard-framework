<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item">
      <md-field>
        <label :for="identifier">{{ label }}</label>
        <md-select :id="identifier"
                   v-model="selectedData"
                   multiple
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

    setSelected() {
        this.$emit('new_selection', [this.identifier, this.selectedData]);
    }
}
</script>

<style scoped lang="scss">
.md-field {
    max-width: 300px;
}
</style>
