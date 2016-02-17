(function(d3) {
  'use strict';

  var w = 300; // width
  var h = 300; // height
  var radius = Math.min(w,h) / 2;
  var donutWidth = 45;
  var legendRectSize = 13;
  var legendSpacing = 3;
  var color = d3.scale.category20b();
  // create SVG element
  var svg = d3.select('#chart')
                .append('svg')
                .attr('width', w)
                .attr('height', h)
                .append('g')
                .attr('transform', 'translate(' + w/2 +
                  ',' + h/2 + ')');
  // set up radius
  var arcs = d3.svg.arc()
                   .innerRadius(radius - donutWidth)
                   .outerRadius(radius);

  var pie = d3.layout.pie()
                     .value(function(d) { return d.time});
                     //.sort(null);

  // load the data file and draw the donut
  d3.csv('/report.csv', function(error, dataset) {
    dataset.forEach(function(d) {
      d.time = +d.time;
    });
    // draw arc paths
    var path = svg.selectAll('path')
                    .data(pie(dataset))
                    .enter()
                    .append('path')
                    .attr('d', arcs)
                    .attr('fill', function(d, i) { 
                      return color(d.data.activities);
                    });
    // legend
    var legend = svg.selectAll('.legend')
                      .data(color.domain())
                      .enter()
                      .append('g')
                      .attr('class', 'legend')
                      .attr('transform', function(d, i) {
                        var height = legendRectSize + legendSpacing;
                        var offset = height * color.domain().length / 2;
                        var horz = -3 * legendRectSize;
                        var vert = i * height - offset;
                        return 'translate(' + horz + ',' + vert + ')';
                      });
    legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', color)
            .style('stroke', color);
    legend.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .attr('font-size', 12)
            .text(function(d) { return d});
    // tooltip
    var tooltip = d3.select('#chart')
                      .append('div')
                      .attr('class', 'tooltip');
    tooltip.append('div')
              .attr('class', 'label');
    tooltip.append('div')
              .attr('class', 'time');
    tooltip.append('div')
              .attr('class', 'percent');

    path.on('mouseover', function(d) {
      var total = d3.sum(dataset.map(function(d) {
        return d.time;
      }));
      var percent = Math.round(1000 * d.data.time / total) / 10;
      tooltip.select('.label').html(d.data.activities);
      tooltip.select('.time').html(d.data.time + 'h');
      tooltip.select('.percent').html(percent + '%');
      tooltip.style('display', 'block');
    });
    path.on('mouseout', function() {
      tooltip.style('display', 'none');
    });
    path.on('mousemove', function(d) {
      tooltip.style('top', (d3.event.layerY + 10) + 'px')
             .style('left', (d3.event.layerX + 10) + 'px');
    });
  });
})(window.d3);