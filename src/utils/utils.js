export default {
    install: function(Vue) {
        Vue.prototype.$utils = {
            chart: {
                initOrdinalScale: function(d3, ds, dim, width) {
                    let domainArr = [];
                    let rangeArr = [];

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

                initTimeScale: function(d3, ds, dim, width) {
                    const x = d3.scaleTime().range([0, width]);
                    x.domain(d3.extent(ds, function(d) { return d[dim]; }));
                    return x;
                },

                drawXAxis: function(svg, xAxis, xTransLate, yTransLate) {
                    svg.append('g')
                        .attr('transform', 'translate('+ xTransLate +',' + yTransLate + ')')
                        .call(xAxis)
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-20)");
                },

                drawYAxis: function(svg, yAxis, xTransLate, yTransLate) {
                    svg.append('g')
                        .attr('transform', 'translate('+ xTransLate +',' + yTransLate + ')')
                        .attr('class', 'yAxis')
                        .call(yAxis);
                },

                // TODO: delete when the linechart has been adjusted
                drawAxis: function(height, svg, xAxis, yAxis, offsetTop, offsetLeft, yAxisOffset) {
                    offsetTop = offsetTop || 0;
                    offsetLeft = offsetLeft || 0;

                    svg.append('g')
                        .attr('transform', 'translate(50,' + (yAxisOffset ? yAxisOffset : offsetTop) + ')')
                        .attr('class', 'yAxis')
                        .call(yAxis);

                    svg.append('g')
                        .attr('transform', 'translate('+ offsetLeft +',' + (height + offsetTop + 5) + ')')
                        .call(xAxis)
                        .selectAll("text")
                        .style("text-anchor", "end")
                        .attr("dx", "-.8em")
                        .attr("dy", ".15em")
                        .attr("transform", "rotate(-20)");
                },

                /**
                 * Calculates the extend of the axis to take it into account while drawing other chart components
                 * @param svg the D3 chart element
                 * @param axis the prepared axis to be drawn
                 * @param axisName has to be 'xAxis' or 'yAxis' to determine if to measure width or height
                 * @returns [number]
                 */
                drawAxisMeasureExtend(svg, axis, axisName) {
                    svg.append('g')
                        .attr('class', axisName)
                        .call(axis);

                    let maxDimension = 0;
                    svg.call(axis).selectAll(".tick").each(function() {
                        if (axisName === 'yAxis') {
                            maxDimension = this.getBBox().width > maxDimension ? this.getBBox().width : maxDimension;
                        } else {
                            maxDimension = this.getBBox().height > maxDimension ? this.getBBox().height : maxDimension;
                        }
                    });

                    return maxDimension;
                },

                addTooltip: function(d, svg, x, y, v) {
                    svg.append('text')
                        .attr('x', x || 0)
                        .attr('y', y || 0)
                        .attr('class', 'tt')
                        .text(d.name + ': ' + d[v]);
                },

                removeTooltip: function(svg) {
                    svg.selectAll('.tt').remove();
                },

                addTitle: function(t, svg, w) {
                    svg.selectAll('.chart-title').remove();

                    svg.append('text')
                        .attr('x', w / 2 || 0)
                        .attr('text-anchor', 'middle')
                        .attr('y', 20)
                        .attr('class', 'chart-title')
                        .text(t);
                },

                getYOffset(title) {
                    // Possible calculations here: measure title height, measure paddings
                    return title ? 35 : 0
                },

                getXOffset(svg, chartHolderClass) {
                    let holderElement = this.getHolderElement(svg, chartHolderClass);
                    return (parseInt(holderElement.css("padding-left")) + parseInt(holderElement.css("padding-right")))/2;
                },

                /**
                 * This returns the calculated width and height that the chart should adjust to
                 * @param svg the D3 chart element
                 * @param title the possible chart title
                 * @param chartHolderClass the element class that determines the height and width of the chart
                 * @returns [number]
                 */
                getDimensions(svg, title, chartHolderClass) {
                    let holderElement = this.getHolderElement(svg, chartHolderClass);
                    const width = holderElement.width();
                    const height = holderElement.height() - this.getYOffset(title);
                    return [width, height];
                },

                getHolderElement(svg, chartHolderClass) {
                    let holderElement = null;
                    let nextParent = svg.parent();

                    // To not let the loop get stuck in case of wrong information we have the exitInex
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
                    return  !holderElement ? svg.parent() : holderElement;
                }
            },
            date: {
                getDateStringFromDate(date) {
                    return date.getDate() + `.` + date.getMonth() + `.` + date.getFullYear();
                },
                getDateStringFromMillis(dateMillis) {
                    let date = new Date(dateMillis);
                    return this.getDateStringFromDate(date);
                }
            }
        }
    }
}

export function aggregateData(ds, descriptor, metric) {
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
    return Object.values(aggregated);
}
