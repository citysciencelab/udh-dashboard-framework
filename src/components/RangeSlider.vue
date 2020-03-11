<template>
    <div style="width: 100%">
        <div v-if="!isShowMarks" class="range-display">
            {{currentValues[0]}} - {{currentValues[1]}}
        </div>
        <a-slider range
                  v-model="defaults"
                  :step="step"
                  :max="max"
                  :min="min"
                  :marks="isShowMarks ? marks : {}"
                  :tip-formatter="tipFormat"
                  @afterChange="onAfterChange" />
    </div>
</template>

<script lang="ts">
/*
*   Documentation found here:
*   https://www.antdv.com/components/slider/
*/
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class RangeSlider extends Vue {
    @Prop() options!: DateRangeSliderOptions;
    minYear!: number;
    minMonth!: number;
    maxYear!: number;
    maxMonth!: number;
    min = 0; // always zero
    max = 1; // difference between first and last year/month
    step = 1;
    defaults: number[] = [];
    currentValues: string[] = [];
    isShowMarks = true;
    marks: { [key: number]: string } = {};

    mounted() {
        this.onOptionsChanged();
    }

    @Watch('options') onOptionsChanged() {
        if (!this.options) {
            return;
        }

        // parse min/max currentValues
        switch (this.options.unit) {
            case 'year':
                // assume date format 'YYYY'
                this.minYear = parseInt(this.options.min, 10);
                this.maxYear = parseInt(this.options.max, 10);
                this.max = this.maxYear - this.minYear;
                break;
            case 'month': {
                // assume date format 'YYYY-MM'
                let [minY, minM] = this.options.min.split('-');
                let [maxY, maxM] = this.options.max.split('-');
                this.minYear = parseInt(minY, 10);
                this.minMonth = parseInt(minM, 10);
                this.maxYear = parseInt(maxY, 10);
                this.maxMonth = parseInt(maxM, 10);
                this.max = (this.maxYear - this.minYear) * 12 + this.maxMonth - this.minMonth;
            }
        }

        // adjust step size, build axis
        this.step = 1;
        let numberOfTicks = this.max + 1;
        while (numberOfTicks > 12) {
            this.step *= 2;
            numberOfTicks = Math.floor(this.max / this.step);
        }
        this.isShowMarks = this.options.isShowMarks;
        this.marks = {};

        for (let i = 0; i <= this.max; i += this.step) {
            switch (this.options.unit) {
                case 'year':
                    this.marks[i] = (this.minYear + i).toString();
                    break;
                case 'month': {
                    let year = this.minYear + Math.floor((this.minMonth - 1 + i) / 12);
                    let month = (this.minMonth + i - 1) % 12 + 1;
                    this.marks[i] = `${year}-${month < 10 ? '0' + month : month}`;
                }
            }
        }

        this.defaults = [this.min, this.max];
        this.currentValues = [this.tipFormat(this.min), this.tipFormat(this.max)]
    }

    private tipFormat(value: number) {
        return this.marks[value];
    }

    private onAfterChange(values: number[]) {
        this.currentValues = [this.tipFormat(values[0]), this.tipFormat(values[1])]
        // return string representations of the selected dates
        this.$emit('rangeChange', values.map(value => this.marks[value]));
    }
}
</script>

<style scoped lang="scss">
.ant-slider /deep/ {
    width: 100%;

    & .ant-slider-mark {
        font-size: 11px;
    }
}
</style>
