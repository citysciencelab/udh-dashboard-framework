<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-field>
                <label v-bind:for="identifier">{{label}}</label>
                <md-select v-model="selectedData" name="multiselect" v-bind:id="identifier" multiple @md-closed="closed">
                    <md-option v-for="(item, index) in selectData" v-bind:key="index" v-bind:value="item">
                        {{ item }}
                    </md-option>
                </md-select>
            </md-field>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'multi-select',
        props: {
            identifier: String,
            selectData: Array,
            label: String
        },
        data: () => ({
            selectedData: []
        }),
        mounted: function () {

        },
        methods: {
            closed() {
                this.$store.commit('SET_FILTER_VALUES', {ident: this.identifier, values: this.selectedData});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
</style>
