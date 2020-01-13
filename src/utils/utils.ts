import Vue from 'vue';
import * as d3 from 'd3';
import $ from 'jquery';

// Augmenting module so TypeScript knows about the new property on Vue
declare module 'vue/types/vue' {
    interface Vue {
        $utils: IUtils
    }
}

// Definition for our Utils class
interface IUtils {
    chart: {
        initOrdinalScale: (ds: Dataset, dim: string, width: number) => d3.ScaleOrdinal<string, any>,
        initTimeScale: (ds: Dataset, dim: string, width: number) => d3.ScaleTime<number, number>,
        drawXAxis: (svg: SVG, xAxis: d3.Axis<any>, xTranslate: number, yTranslate: number) => void,
        drawYAxis: (svg: SVG, yAxis: d3.Axis<any>, xTranslate: number, yTranslate: number) => void,
        drawAxis: (height: number, svg: SVG, xAxis: d3.Axis<any>, yAxis: d3.Axis<any>, offsetTop: number, offsetLeft: number, yAxisOffset: number) => void,
        drawAxisMeasureExtent: (svg: SVG, axis: d3.Axis<any>, axisName: string) => number,
        addTooltip: (d: any, svg: SVG, x: number, y: number, v: number) => void,
        removeTooltip: (svg: SVG) => void,
        addTitle: (t: string, svg: SVG, w: number) => void,
        getXOffset: (svg: SVGSVGElement, chartHolderClass: string) => number,
        getYOffset: (title: string) => number,
        getDimensions: (svg: SVGSVGElement, title: string, chartHolderClass: string) => number[],
        getHolderElement: (svg: JQuery<SVGSVGElement>, chartHolderClass: string) => JQuery<SVGSVGElement>
    },
    date: {
        getDateStringFromDate: (date: Date) => string,
        getDateStringFromMillis: (dateMillis: number) => string
    }
}

export default class Utils implements IUtils {
    chart = {
        initOrdinalScale(ds: Dataset, dim: string, width: number) {
            let domainArr: any[] = [];
            let rangeArr: any[] = [];

            ds.forEach((t) => {
                domainArr.push(t[dim])
            });
            ds.forEach((t, i) => {
                rangeArr.push(width * i / ds.length)
            });

            return d3.scaleOrdinal()
                .domain(domainArr)
                .range(rangeArr);
        },

        initTimeScale(ds: Dataset, dim: string, width: number) {
            const x = d3.scaleTime().range([0, width]);
            x.domain(<number[]>d3.extent(ds, d => d[dim]));
            return x;
        },

        drawXAxis(svg: SVG, xAxis: d3.Axis<any>, xTranslate: number, yTranslate: number) {
            svg.append('g')
                .attr('transform', 'translate(' + xTranslate + ',' + yTranslate + ')')
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-20)");
        },

        drawYAxis(svg: SVG, yAxis: d3.Axis<any>, xTranslate: number, yTranslate: number) {
            svg.append('g')
                .attr('transform', 'translate(' + xTranslate + ',' + yTranslate + ')')
                .attr('class', 'yAxis')
                .call(yAxis);
        },

        // TODO: delete when the linechart has been adjusted
        drawAxis(height: number, svg: SVG, xAxis: d3.Axis<Datum>, yAxis: d3.Axis<Datum>, offsetTop: number, offsetLeft: number, yAxisOffset: number) {
            if (offsetTop === Infinity || offsetLeft === Infinity || yAxisOffset === Infinity) {
                return;
            }
            offsetTop = offsetTop || 0;
            offsetLeft = offsetLeft || 0;

            svg.append('g')
                .attr('transform', 'translate(50,' + (yAxisOffset ? yAxisOffset : offsetTop) + ')')
                .attr('class', 'yAxis')
                .call(yAxis);

            svg.append('g')
                .attr('transform', 'translate(' + offsetLeft + ',' + (height + offsetTop + 5) + ')')
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-20)");
        },

        /**
         * Calculates the extent of the axis to take it into account while drawing other chart components
         * @param svg the D3 chart element
         * @param axis the prepared axis to be drawn
         * @param axisName has to be 'xAxis' or 'yAxis' to determine if to measure width or height
         * @returns [number]
         */
        drawAxisMeasureExtent(svg: SVG, axis: d3.Axis<any>, axisName: string) {
            svg.append('g')
                .attr('class', axisName)
                .call(axis);

            let maxDimension = 0;
            (svg.call(axis).selectAll('.tick')).each(function() {
                if (axisName === 'yAxis') {
                    maxDimension = (this as any).getBBox().width > maxDimension ? (this as any).getBBox().width : maxDimension;
                } else {
                    maxDimension = (this as any).getBBox().height > maxDimension ? (this as any).getBBox().height : maxDimension;
                }
            });

            return maxDimension;
        },

        addTooltip(d: any, svg: SVG, x: number, y: number, v: number) {
            svg.append('text')
                .attr('x', x || 0)
                .attr('y', y || 0)
                .attr('class', 'tt')
                .text(d.name + ': ' + d[v]);
        },

        removeTooltip(svg: SVG) {
            svg.selectAll('.tt').remove();
        },

        addTitle(t: string, svg: SVG, w: number) {
            svg.selectAll('.chart-title').remove();

            svg.append('text')
                .attr('x', w / 2 || 0)
                .attr('text-anchor', 'middle')
                .attr('y', 20)
                .attr('class', 'chart-title')
                .text(t);
        },

        getYOffset(title: string) {
            // Possible calculations here: measure title height, measure paddings
            return title ? 35 : 0;
        },

        getXOffset(svg: SVGSVGElement, chartHolderClass: string) {
            let holderElement = this.getHolderElement($(svg), chartHolderClass);
            return (parseInt(holderElement.css("padding-left")) + parseInt(holderElement.css("padding-right"))) / 2;
        },

        /**
         * This returns the calculated width and height that the chart should adjust to
         * @param svg the D3 chart element
         * @param title the possible chart title
         * @param chartHolderClass the element class that determines the height and width of the chart
         * @returns [number]
         */
        getDimensions(svg: SVGSVGElement, title: string, chartHolderClass: string) {
            let holderElement = this.getHolderElement($(svg), chartHolderClass);
            const width = holderElement.width() || 0;
            const height = (holderElement.height() || 0) - this.getYOffset(title) || 0;
            return [width, height];
        },

        getHolderElement(svg: JQuery<SVGSVGElement>, chartHolderClass: string) {
            let holderElement = null;
            let nextParent = svg.parent();

            // To not let the loop get stuck in case of wrong information we have the exitIndex
            let exitIndex = 0;
            while (!holderElement && exitIndex < 20) {
                if (nextParent[0].classList.contains(chartHolderClass)) {
                    holderElement = nextParent;
                } else {
                    nextParent = nextParent.parent();
                }
                exitIndex++;
            }
            // Possible fallback
            return !holderElement ? svg.parent() : holderElement;
        }
    };

    date = {
        getDateStringFromDate(date: Date) {
            return date.getDate() + `.` + date.getMonth() + `.` + date.getFullYear();
        },
        getDateStringFromMillis(dateMillis: number) {
            let date = new Date(dateMillis);
            return this.getDateStringFromDate(date);
        }
    };

    install() {
        Vue.prototype.$utils = this;
    }
}

export function aggregateData(ds: Dataset, descriptor: string, metric: string) {
    const aggregated = ds.reduce((results, item) => {
        const key = item[descriptor];
        if (results.hasOwnProperty(key)) {
            results[key][metric] += item[metric];
        } else {
            results[key] = {};
            results[key][descriptor] = key;
            results[key][metric] = item[metric];
        }
        return results;
    }, {});
    return <Dataset>Object.values(aggregated);
}