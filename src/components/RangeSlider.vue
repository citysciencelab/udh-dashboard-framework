<template>
    <a-slider
            range
            :step="step"
            :max="max"
            :min="min"
            :marks="marks"
            v-model="defaults"
            :tipFormatter="tipFormat"
            @change="onChange"
            @afterChange="onAfterChange"
    />
</template>

<script>

    /*
    *   Documentation found here:
    *   https://www.antdv.com/components/slider/
    */

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
            marks: Object,
            isDateRange: Boolean,
            identity: String
        },
        mounted: function () {
            if (this.defaultValue) {
                this.$data.defaults = this.defaultValue;
            }
        },
        watch: {
            defaultValue: function(newVal) {
                this.$data.defaults = newVal;
            }
        },
        methods: {
            tipFormat(value) {
                if (this.isDateRange) {
                    let date = new Date(value);
                    if (this.identity === 'day') {
                        return this.$utils.date.getDateStringFromDate(date);
                    } else if (this.identity === 'month') {
                        return  date.getMonth() + `.` + date.getFullYear();
                    } else if (this.identity === 'year') {
                        return  date.getFullYear();
                    }
                } else {
                    return `${value}`;
                }
            },
            onChange() {
                //Or global: this.$root.$emit()
            },
            onAfterChange(value) {
                this.$emit('rangeChange', value);
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

    .ant-slider-mark {
        font-size: 11px !important;
    }
</style>