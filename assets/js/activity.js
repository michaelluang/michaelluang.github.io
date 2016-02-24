(function(d3) {
    'use strict';

    var colormap = ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", 
                    "#d62728", "#ff9896", "#9467bd", "#c5b0d5", "#8c564b"];

    d3.json('/data.json', function(error, dataset) {
        var activities = Object.keys(dataset);
        activities.forEach(function(d, i) {
            var id = '#' + d + '-svg';
            var color = colormap[i];
            report(dataset[d], id, color);
        });
    });
})(window.d3);

// activity report function
function report (dataset, id, color) {
    'use strict';

    var w = 360; // width
    var h = 300; // height
    var barPadding = 1; // space betweeen bars

    var daysPerMonth = [31, 28, 31, 30, 31, 30, 
                        31, 31, 30, 31, 30, 31]
    // scales
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.08);

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, h]);

    // create SVG element
    var svg = d3.select(id)
      .append('svg')
        .attr('width', w)
        .attr('height', h);

    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', function(d, i) { return xScale(i); })
        .attr('y', function(d) { return h - yScale(d); })
        .attr('width', xScale.rangeBand())
        .attr('height', function(d) { return yScale(d); })
        .attr('fill', color);

    // add labels
    svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d) {return d + 'h'; })
        .attr('text-anchor', 'middle')
        .attr('font-size', '10')
        .attr('x', function(d, i) { return xScale(i) + xScale.rangeBand() / 2; })
        .attr('y', function(d) { return h - yScale(d) + 16; })
        .attr('fill', 'white');

    // add x Axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickSize(0)
        .tickPadding(6)
        .tickFormat(function(d, i) { return i + 1 + "月"; })
        .orient('top');
    svg.append('g')
        .attr('transform', 'translate(0, ' + h  + ')')
        .attr('class', 'axis')
        .call(xAxis);

    // Click the svg to update with new data
    d3.select(id)
        .on('click', function() {
            //redefine the yScale
            var avgHours = [];
            for (var i = 0; i < dataset.length; i++) {
                avgHours.push(dataset[i] / daysPerMonth[i]);
            }
            var newYScale = d3.scale.linear()
                .domain([0, d3.max(avgHours)])
                .range([0, h]);
            // update all rects
            svg.selectAll('rect')
                .data(avgHours)
                .transition()
                .delay(function(d,i) { return i * 100; })
                .duration(500)
                .attr('y', function(d) { return h - newYScale(d); })
                .attr('height', function(d) { return newYScale(d); });

            // update all labels
            svg.selectAll('text')
                .data(avgHours)
                .transition()
                .delay(function(d, i) { return i * 100; })
                .duration(500)
                .text(function(d, i) { return d.toFixed(1) + 'h'; })
                .attr('font-size', '10')
                .attr('y', function(d) { return h - newYScale(d) + 14; });
        });
}