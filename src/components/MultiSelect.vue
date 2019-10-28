<template>
    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <md-field>
                <label for="movies">{{label}}</label>
                <md-select v-model="selectedData" name="movies" id="movies" multiple @md-closed="closed">
                    <md-option v-for="item in selectData"  v-bind:value="item"  >
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
            identity: String,
            selectData: Array,
            label: String
        },
        data: () => ({
            selectedData: []
        }),
        methods: {
            closed() {
                this.$store.commit('SET_FILTER_VALUES', {ident: this.identity, values: this.selectedData});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-field {
        max-width: 300px;
    }
</style>
