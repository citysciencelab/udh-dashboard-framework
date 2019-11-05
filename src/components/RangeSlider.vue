<template>
    <a-slider
            range
            :step="step"
            :max="max"
            :min="min"
            :marks="marks"
            v-model:defaultValue="defaults"
            :tipFormatter="tipFormat"
            @change="onChange"
            @afterChange="onAfterChange"
    />
</template>

<script>
    export default {
        name: "range-slider",
        data: () => ({
            range: Number,
            defaults: [],
        }),
        props: {
            defaultValue: Array,
            step: Number,
            max: Number,
            min: Number,
            marks: Object
        },
        mounted: function () {
            if (this.defaultValue) {
                this.$data.defaults = this.defaultValue;
            }
        },
        watch: {
            defaultValue: function(newVal, oldVal) {
                this.$data.defaults = newVal;
            }
        },
        methods: {
            tipFormat(value) {
                return `${value} §$%`;
            },
            onChange(value) {
                this.$emit('rangeChange', value);
                //Or global: this.$root.$emit()
            },
            onAfterChange(value) {
                // console.log('afterChange: ', value);
            },
        }
    }
</script>

<style>
    .ant-slider-dot {
        width: 0 !important;
        border-radius: 0 !important;
        border: 1px solid #e8e8e8 !important;
        margin-left: 0 !important;
    }

</style>