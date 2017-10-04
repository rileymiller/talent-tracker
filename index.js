var points = [];
var point_count = 0;
var p;
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
        
        var drag = d3.behavior.drag()
            .origin(function(d) { return d; })
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended);

        function dragstarted(d) {
            d3.select(this).classed("spot", false);
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
            d3.select(this).classed("spot", true);
            updatePoints(this);
        }
        /* --- Circle creation ---
         */
        /* create a rectangle to serve as background
         */
        background = vis.append('rect').attr('class', 'background').attr('width', vis.attr('width')).attr('height', vis.attr('height'));
        /* when the user clicks the background
         */

        background.on('click', null);
        background.on('click', function() {
            /* retrieve mouse coordinates
             */
            
            p = d3.mouse(this);
            console.log('background clicked')
            console.log('these are the coordinates of p at this point in the function');
            console.log(p);
            /* create a new circle at point p
             */
            $('#prompt').modal({ show: false });
            $('#prompt').modal('show');



            d3.event.stopPropagation();
           
        });
        $('#submit').click(function(e) {
                // console.log('#submit clicked');
                //need to capture this data
                //console.log('submit handled');
                e.preventDefault();
                var yrs = $('#number-input').val();
                //  console.log(yrs);
                var skills = $('#skillSelect').val();
                //  console.log(skills);
                var description = $('#exampleTextarea').val();
                //console.log(description);
                var color = $('#colorSelect').val();
                // console.log(color)
                if (point_count === points.length) {
                    console.log('POINT COUNT = POINTS.LENGTH');

                     point_count++;
                     console.log('point count after increment: ' + point_count);
                    newPoint(p, yrs, skills, description, color);
                }

               
            });
        function newPoint(p, years, skills, description, color) {
           
            var point = {
                x: p[0],
                y: p[1],
                radius: years,
                color: color,
                count: point_count,
                id: 'node' + point_count,
                yrs: years,
                skills: skills,
                description: description

            };
            // console.log(p);
            points.push(point);
            
            //console.log(points);
            var node = vis.selectAll('g')
                .data(points)
                .enter().append('g')
                .attr('class', function(d) { return 'spot'; })
                .attr('id', function(d, i) { return 'node-' + i }).call(drag);


            //console.log(node.data());



            node.append('circle')
                .attr('class', function(d) { return 'circle-' + d.count; })
                .attr('r', function(d) { return d.radius * 10; })
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('fill', function(d) { return d.color; });

            var text = node.append("text")
                .attr('class', 'start')
                .attr("x", function(d) { return d.x + d.radius / 2; })
                .attr("y", function(d) { return d.y + d.radius / 2; })
                .attr("text-anchor", "start")
                .style("fill", "black")
                .text(function(d) { return d.id; });

            // console.log(text.data());
        }

    };

}).call(this);

