var points = [];
var point_count = 0;
(function() {

    window.main = function() {
        /* obtain a reference to the SVG
         */
        var background, drag, vis;
        vis = d3.select('svg');
        /* --- Circle dragging ---
         */
        /* define a drag behavior
         */
        function updatePoints(point) {
            console.log('inside updatePoints');
            //console.log(point.getAttribute('id'));
            var id = point.getAttribute('id');
            console.log(d3.select(point).select('circle').attr('cx'))
            console.log(d3.select(point).select('circle').attr('cy'))

            for (var i = 0; i < points.length; i++) {
                if (points[i].id === id) {
                    points[i].x = d3.select(point).select('circle').attr('cx');
                    points[i].y = d3.select(point).select('circle').attr('cy');
                }
            }
        }
        /*
                drag = d3.behavior.drag().on('drag', function() {
                    /* move the circle
                     */
        /*
                    console.log(this);
                    //d3.select(this).attr('cx', d3.event.x).attr('cy', d3.event.y);
                    //d3.select(this).attr()
                    d3.select(this).select("text")
                        .attr("x", function(d){return d.x = d3.event.x; })
                        .attr("y", function(d) { return d.y = d3.event.y; });
                    d3.select(this).select("circle")
                        .attr("cx", function(d) {return d.x = d3.event.x;} )
                        .attr("cy", function(d) { return d.y = d3.event.y; });
                    updatePoints(this);
                });*/
        var drag = d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        function dragstarted(d) {
            d3.select(this).classed("active", true);
            
        }

        function dragged(d) {
            d3.select(this).select("text")
                .attr("x", function(d) { return d.x = d3.event.x; })
                .attr("y", function(d) { return d.y = d3.event.y; });
            d3.select(this).select("circle")
                .attr("cx", function(d) { return d.x = d3.event.x; })
                .attr("cy", function(d) { return d.y = d3.event.y; });
        }

        function dragended(d) {
            d3.select(this).classed("active", false);
            updatePoints(this);
        }
        /* --- Circle creation ---
         */
        /* create a rectangle to serve as background
         */
        background = vis.append('rect').attr('class', 'background').attr('width', vis.attr('width')).attr('height', vis.attr('height'));
        /* when the user clicks the background
         */
        return background.on('click', function() {
            /* retrieve mouse coordinates
             */
            var p;
            p = d3.mouse(this);
            /* create a new circle at point p
             */

            r = prompt('what is the radius of the circle? (px)');
            c = prompt('what color is the circle (word or hex)');
            var point = {
                x: p[0],
                y: p[1],
                radius: r,
                color: c,
                count: point_count,
                id: 'node' + point_count

            };
            point_count++;
            console.log(p);
            points.push(point);
            /*return vis.append('circle').data(points).enter()
            .attr('class', function(d,i) { return 'node' + i;})
            .attr('r', function(d) { return d.radius})
            .attr('cx', function(d) { return d.x;})
            .attr('cy', function(d){ return d.y;}).
            attr('fill', function(d) { return d.color}).call(drag);*/

            console.log(points);
            var node = vis.selectAll('g')
                .data(points)
                .enter().append('g')
                .attr('id', function(d, i) { return 'node' + i }).call(drag);


            console.log(node.data());



            node.append('circle')
                .attr('class', function(d) { return 'circle' + d.count; })
                .attr('r', function(d) { return d.radius; })
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('fill', function(d) { return d.color; });

            var text = node.append("text")
                .attr('class', 'start')
                .attr("x", function(d) { return d.x + d.radius / 2; })
                .attr("y", function(d) { return d.y + d.radius / 2; })
                .attr("text-anchor", "start")
                .style("fill", "black")
                .text("text-demo");

            console.log(text.data());
        });


    };

}).call(this);

/*
vis.on('click', function() {
    var point;
    p = d3.mouse(this);
    console.log(p);

    //  if (!intersect(p)) {
    r = prompt('what is the radius of the circle? (px)');
    c = prompt('what color is the circle (word or hex)');
    var point = {
        x: p[0],
        y: p[1],
        radius: r,
        color: c

    };
    console.log('clicked point: ' + p);
    console.log(point);
    points.push(point);
    console.log(points);
    //drawPoints(point);
});*/