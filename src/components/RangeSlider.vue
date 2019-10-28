<template>
    <a-slider
            range
            v-model:step="step"
            :max="max"
            :min="min"
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
            min: Number
        },
        mounted: function () {
            if (this.defaultValue) {
                this.$data.defaults = this.defaultValue;
            }
        },
        methods: {
            tipFormat(value) {
                return `${value} §$%`;
            },
            onChange(value) {
                // console.log('change: ', value);
            },
            onAfterChange(value) {
                // console.log('afterChange: ', value);
            },
        }
    }
</script>

<style scoped>

</style>