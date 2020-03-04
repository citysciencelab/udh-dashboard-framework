<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-field>
                <label v-bind:for="identifier">{{label}}</label>
                <md-select v-model="selectedData" name="multiselect" v-bind:id="identifier" multiple @md-closed="closed" @md-selected="setSelected">
                    <md-option v-for="(item, index) in selectData" v-bind:key="index" v-bind:value="item">
                        {{ item }}
                    </md-option>
                </md-select>
            </md-field>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch} from 'vue-property-decorator';

@Component({})
export default class MultiSelect extends Vue {
    @Prop() identifier!: string;
    @Prop() selectData!: Dataset;
    @Prop() label!: string;
    selectedData = [];
    isOnceSelected: boolean = false;

    /*
    *   Closed vent fires on init with empty selectData. Need to make sure that value emit is on purpose.
    */
    setSelected() {
        this.isOnceSelected = true;
    }

    closed() {
        if (this.isOnceSelected) {
            this.$store.commit('SET_FILTERS', [this.identifier, this.selectedData]);
            this.$emit('new_selection', this.selectedData);
        }
    }

    public resetComponent() {
        this.selectedData = [];
        this.$forceUpdate();
    }

    @Watch('selectData') onDataChanged() {
        this.$forceUpdate();
    }
}
</script>

<style scoped lang="scss">
.md-field {
    max-width: 300px;
}
</style>
