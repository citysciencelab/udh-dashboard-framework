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
        drawAxis: (height: number, svg: SVG, xAxis: d3.Axis<any>, yAxis: d3.Axis<any>, offsetTop: number, offsetLeft: number, yAxisOffset: number) => void,
        addTooltip: (d: any, svg: SVG, x: number, y: number, v: number) => void,
        removeTooltip: (svg: SVG) => void,
        addTitle: (t: string, svg: SVG, w: number) => void,
        getOffset: (title: string) => number,
        getDimensions: (svg: SVG, title: string) => number[]
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

        drawAxis(height: number, svg: SVG, xAxis: d3.Axis<Datum>, yAxis: d3.Axis<Datum>, offsetTop: number, offsetLeft: number, yAxisOffset: number) {
            if (offsetTop === Infinity || offsetLeft === Infinity || yAxisOffset === Infinity) {
                return;
            }
            offsetTop = offsetTop || 0;
            offsetLeft = offsetLeft || 0;

            svg.append('g')
                .attr('transform', 'translate(50,' + (yAxisOffset ? yAxisOffset : offsetTop) + ')')
                .call(yAxis);

            svg.append('g')
                .attr('transform', 'translate('+ offsetLeft + ',' + (height + offsetTop + 5) + ')')
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-20)");
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

        getOffset(title: string) {
            return title ? 35 : 0;
        },

        getDimensions(svg: SVG, title: string) {
            const node = svg.node();
            if (!node) {
                return [0, 0];
            }
            const parent = $(node).parent();
            const parentWidth = parent.width();
            const parentHeight = parent.height();
            if (!parentWidth || !parentHeight) {
                return [0, 0];
            }
            const width = (parentWidth - parseInt(parent.css('padding-left')) - parseInt(parent.css('padding-right')));
            const height = (parentHeight - this.getOffset(title)) * 0.85;
            return [width, height];
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
