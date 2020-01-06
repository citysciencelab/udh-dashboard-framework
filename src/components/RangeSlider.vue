<template>
    <a-slider range
              :step="step"
              :max="max"
              :min="min"
              :marks="marks"
              v-model="defaults"
              :tipFormatter="tipFormat"
              @change="onChange"
              @afterChange="onAfterChange" />
</template>

<script lang="ts">
/*
*   Documentation found here:
*   https://www.antdv.com/components/slider/
*/
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class RangeSlider extends Vue {
    @Prop() defaultValue!: number[];
    @Prop() step!: number;
    @Prop() max!: number;
    @Prop() min!: number;
    @Prop() marks!: {};
    @Prop() isDateRange!: boolean;
    @Prop() identity!: string;
    range = 0;
    defaults: number[] = [];

    mounted() {
        if (this.defaultValue) {
            this.defaults = this.defaultValue;
        }
    }

    @Watch('defaultValue') onDefaultValueChanged(newVal: number[]) {
        this.defaults = newVal;
    }

    tipFormat(value: number) {
        if (this.isDateRange) {
            let date = new Date(value);
            if (this.identity === 'day') {
                return this.$utils.date.getDateStringFromDate(date);
            } else if (this.identity === 'month') {
                return date.getMonth() + `.` + date.getFullYear();
            } else if (this.identity === 'year') {
                return date.getFullYear();
            }
        } else {
            return `${value}`;
        }
    }

    onChange() {
        //Or global: this.$root.$emit()
    }

    onAfterChange(value: number) {
        this.$emit('rangeChange', value);
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