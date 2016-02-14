(function(d3) {
  'use strict';

  var w = 360; // width
  var h = 360; // height
  var radius = Math.min(w,h) / 2;
  var donutWidth = 75;
  var legendRectSize = 18;
  var legendSpacing = 4;
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

  // unsort the items in dataset
  var pie = d3.layout.pie()
                     .value(function(d) { return d.time})
                     .sort(null);

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
  });
})(window.d3);