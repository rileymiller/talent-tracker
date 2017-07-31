(function() {

    //this is the event loop for the application
    window.main = function() {
        var points = [];
        //need to define the drag behavior of existing points
        var drag_index;
        //need to define hover state of nodes

        /***************************************************************
        // need to define the creation of new points on click,
        // upon creation of new point--modal launched prompting for 
        // information concerning point. Encapsulated in a data structure
        //*************************************************************/
        var vis = d3.select('svg');
        var background;
        background = vis.append('rect').attr('class', 'background').attr('width', vis.attr('width')).attr('height', vis.attr('height'));


        var drag = d3.behavior.drag()
            .on("drag", function(d, i) {
                d.x += d3.event.dx
                d.y += d3.event.dy
                d3.select(this).attr("transform", function(d, i) {
                    return "translate(" + [d.x, d.y] + ")"
                })
            });





        function drawPoints(point) {

            //var coord = [point.x, point.y]l
            var node = vis.append('svg:g')
                .data(point)
                .enter()
                .attr('class', 'node')
                .attr('transform', 'translate(' + point.x + ',' + point.y + ')')
                .call(drag);


            var circle = node.selectAll('circle')
                .data(point)
                .enter()
                .attr('class', 'circle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.radius; })
                .style('fill', function(d) { return d.color; })
        }


        function intersect(p) {
            var count = 0;
            var intersects = false;
            for (var point in points) {

                if (p[0] == point.x && p[1] == point.y) {
                    return true;
                }

                count++;
            }

            return false;
        }

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
            drawPoints(point);




        });
    };


}).call(this);