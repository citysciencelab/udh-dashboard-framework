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

                drawAxis: function(height, svg, xAxis, yAxis, offsetTop, offsetLeft) {
                    offsetTop = offsetTop || 0;
                    svg.append('g')
                        .attr('transform', 'translate(50,' + offsetTop + ')')
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

                addTooltip: function(d, svg, x, y, v) {
                    svg.append('text')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('class', 'tt')
                        .text(d.name + ': ' + d[v]);
                },

                removeTooltip: function(svg) {
                    svg.selectAll('.tt').remove();
                },

                addTitle: function(t, svg, w) {
                    svg.selectAll('.chart-title').remove();

                    svg.append('text')
                        .attr('x', w / 2)
                        .attr('text-anchor', 'middle')
                        .attr('y', 20)
                        .attr('class', 'chart-title')
                        .text(t);
                },

                getOffset(title) {
                    return title ? 35 : 0
                },

                getDimensions(svg, title) {
                    const width = (svg.parent().width() - parseInt(svg.parent().css("padding-left")) - parseInt(svg.parent().css("padding-right"))) * 0.95;
                    const height = (svg.parent().height() - this.getOffset(title)) * 0.85;
                    return [width, height];
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
