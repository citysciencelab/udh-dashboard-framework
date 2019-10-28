export default {
    install: function(Vue) {
        Vue.prototype.$helpers = {
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
                    let domainArr = [];
                    let rangeArr = [];

                    ds.forEach((t) => {
                        domainArr.push(t[dim])
                    });
                    ds.forEach((t, i) => {
                        rangeArr.push(width * i / ds.length)
                    });

                    return d3.scaleTime()
                        .domain(domainArr)
                        .range(rangeArr);
                },

                drawAxis: function(height, svg, xAxis, yAxis, offset) {
                    offset = offset || 0;
                    svg.append('g')
                        .attr('transform', 'translate(50,' + offset + ')')
                        .call(yAxis);

                    svg.append('g')
                        .attr('transform', 'translate(70,' + (height + offset + 5) + ')')
                        .call(xAxis);
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
                    svg.append('text')
                        .attr('x', w / 2)
                        .attr('text-anchor', 'middle')
                        .attr('y', 20)
                        .text(t);
                },

                getOffset(title) {
                    return title ? 35 : 0
                }
            }
        }
    }
}
