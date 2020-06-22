import Vue from 'vue';
import * as d3 from 'd3';
import $ from 'jquery';

export default class Utils implements IUtils {
    chart = {
        ordinalScale(ds: Dataset, dim: string, width: number) {
            let domainArr = ds.map(d => d[dim]);
            let rangeArr = ds.map((d, i) => width * i / ds.length);

            return d3.scaleOrdinal()
                .domain(domainArr)
                .range(rangeArr);
        },

        timeScale(ds: Dataset, dim: string, width: number) {
            const x = d3.scaleTime().range([0, width]);
            x.domain(<number[]>d3.extent(ds, d => d[dim]));
            return x;
        },

        /*
         * Draw x axis
         * Returns: height of the axis including labels
         */
        drawXAxis(svg: SVG, xAxis: d3.Axis<any>, xTranslate?: number, yTranslate?: number) {
            let g = svg.append('g')
            if (xTranslate || yTranslate) {
                g = g.attr('transform', `translate(${xTranslate}, ${yTranslate})`)
            }
            const created = g.attr('class', 'xAxis')
                .call(xAxis)
                .selectAll<SVGGElement, any>('text')
                .style('text-anchor', 'end')
                .attr('dx', '-.8em')
                .attr('dy', '.15em')
                .attr('transform', 'rotate(-30)');

            const ticks = created.nodes();
            return Math.max(...ticks.map(n => n.getBoundingClientRect().height)) + 5;
        },

        /*
         * Draw y axis
         * Returns: width of the axis including labels
         */
        drawYAxis(svg: SVG, yAxis: d3.Axis<any>, xTranslate?: number, yTranslate?: number) {
            let g = svg.append('g')
            if (xTranslate || yTranslate) {
                g = g.attr('transform', `translate(${xTranslate}, ${yTranslate})`)
            }
            const created = g.attr('class', 'yAxis')
                .call(yAxis);

            const ticks = created.nodes();
            return Math.max(...ticks.map(n => n.getBoundingClientRect().width));
        },

        /**
         * Calculates the extent of the axis to take it into account while drawing other chart components
         * @param svg the D3 chart element
         * @param axis the prepared axis to be drawn
         * @param axisName has to be 'xAxis' or 'yAxis' to determine if to measure width or height
         * @returns [number]
         */
        drawAxisMeasureExtent(svg: SVG, axis: d3.Axis<Datum>, axisName: string) {
            svg.append('g')
                .attr('class', axisName)
                .call(axis);

            const nodes = svg.call(axis).selectAll<SVGGElement, any>('.tick').nodes();
            return Math.max(...nodes.map(n => axisName === 'yAxis' ? n.getBBox().width : n.getBBox().height));
        },

        addTooltip(d: Datum, svg: SVG, x: number, y: number, v: string) {
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

        cleanSVGTag(svg: SVG) {
            svg.attr("fill", null);
            svg.attr("font-size", null);
            svg.attr("font-family", null);
            svg.attr("text-anchor", null);
        },

        getYOffset(title: string) {
            // Possible calculations here: measure title height, measure paddings
            return title ? 35 : 0;
        },

        getXOffset(svg: SVGSVGElement, chartHolderClass: string) {
            let holderElement = this.getHolderElement($(svg), chartHolderClass);
            return (parseInt(holderElement.css("padding-left")) + parseInt(holderElement.css("padding-right"))) / 2;
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
        },
        getLastMonth(): string {
            const today = new Date();
            return `${today.getFullYear()}-${today.getMonth() < 10 ? '0' : ''}${today.getMonth()}`;
        },
        getCurrentMonth(): string {
            const today = new Date();
            return `${today.getFullYear()}-${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}`;
        }
    };

    number = {
        getDecimalSeparatedNumber(value: string) {
            return new Intl.NumberFormat('de-DE', { style: 'decimal', useGrouping: true }).format(Number.parseInt(value));
        },
        getAbbreviatedNumber(num: number) {
            let value = num.toLocaleString().replace(/\./g,'');
            const addedNum = value[1] !== '0' ? ',' + value[1] : '';
            if (value.length > 6 && value.length < 10) {
                const abbreviated = value.substr(0, value.length-6);
                return (abbreviated.length === 1 ? abbreviated + addedNum : abbreviated) + " Mio.";
            } else if (value.length > 3 && value.length < 7) {
                const abbreviated = value.substr(0, value.length-3);
                return  (abbreviated.length === 1 ? abbreviated + addedNum : abbreviated) + " Tsd.";
            } else {
                return value;
            }
        }
    };

    string = {
        parseLinkFromString (str: string) {
            let res = str;
            const regex = new RegExp("(https|http)://", "g"),
                matches = str.matchAll(regex);

            for (const match of matches) {
                const start = match.index as number,
                    matchEnd = /\/(\s|$)/ig.exec(str.substr(match.index as number)),
                    end = matchEnd ? matchEnd.index as number + 1 : undefined;

                res = res.replace(str.substr(start, end), `<a href="${str.substr(start, end)}" target="_blank">${str.substr(start, end)}</a>`);
            }

            return res;
        }
    };

    request = {
        sanitizeRangefulParams(params: { min: string, max: string, unit: string }) {
            // API requires 'YYYY-MM' format
            if (params.unit === 'year') {
                if (params.min.length === 4) {
                    params.min += '-01';
                }
                if (params.max.length === 4) {
                    params.max += '-12';
                }
            }
        }
    };

    install() {
        Vue.prototype.$utils = this;
    }
}

export function aggregateData(ds: Dataset, descriptor: string, metric: string): Dataset {
    const aggregated = ds.reduce((results, item) => {
        const key = item[descriptor];
        if (Object.prototype.hasOwnProperty.call(results, key)) {
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

export function countData(ds: Dataset, descriptor: string): Dataset {
    return ds.reduce((countData: Dataset, datum: Datum) => {
        const match: any = countData.find((item: Datum) => item[descriptor] === datum[descriptor]);
        if (match) {
            match.count += 1;
            return countData;
        }
        return [...countData,  {[descriptor]: datum[descriptor], count: 1}];
    }, [])
}
