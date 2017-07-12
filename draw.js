//global variables
var canvas = document.getElementById('canvas'); //gets canvas
var context = canvas.getContext('2d'); //gets context of the canvas
var height = canvas.height; //height
var width = canvas.width; //width
var default_point_size = 3;
var points = [];
var point_size_scale = 10;
//var horizontal_rescale = .4;
//var vertical_rescale = .4;

//event handler for click
$("#canvas").click(function(e) {
    getPosition(e);
});

//draws board
function drawBoard() {

    //context.scale(horizontal_rescale,vertical_rescale);

    //y-axis
    context.beginPath();
    context.moveTo(width - width / 2, 0);
    context.lineTo(width - width / 2, height);


    //x-axis
    context.moveTo(0, height - height / 2);
    context.lineTo(width, height - height / 2);

    var tick = height / 100; //size of tick marks

    //x-axis ticks
    for (var x = 0; x <= width; x += width / 40) {
        context.moveTo(x, height - height / 2 - tick);
        context.lineTo(x, height - height / 2 + tick);
    }

    //y-axis ticks
    for (var y = 0; y <= height; y += height / 40) {
        context.moveTo(width - width / 2 - tick, y);
        context.lineTo(width - width / 2 + tick, y);
    }

    var p_w = width / 40; //width padding
    var p_h = height / 50; //heigh padding
    context.font = "16px Arial";
    context.fillStyle = "black";


    //going to need to add specific text alignment!!!!!

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("What I like", width / 2 + p_w * 3, 0 + p_h);
    context.fillText("What I'm good at", width - p_w * 4, height / 2 - p_h);
    context.stroke();


}

drawBoard();




var pointSize = default_point_size; //size of points, use later with experience
var exp = 0; //years of experience
function promptExperience() {
    var is_valid = false;

    do {
        exp = prompt("How many years experience do you have with this task?");

        if (exp > 75) {
            is_valid = false;
            alert("please insert an actual value");
        } else if (exp <= 0) {
            is_valid = false;
            alert("please insert an actual value");
        } else if (isNaN(exp)) {
            alert("Please type a numeric value.");
            is_valid = false;
        } else {
            is_valid = true;
        }

    } while (!is_valid);
    //  console.log(exp);

}







var point_count = 0; //count of points


//gets position of click
function getPosition(event) {
    var rect = canvas.getBoundingClientRect(); //bounded rectangle
    var cx = event.clientX - rect.left; //x-value
    var cy = event.clientY - rect.top; //y-value
    console.log("getPosition x: " + cx + " y :" + cy); //prints canvas x/y

    var point_clicked = false;

    for (var i = 0; i < points.length; i++) {
        point_clicked = intersect(cx, cy, points[i]);
        points[i].update_click();
        if (point_clicked) {
            console.log("point was clicked");
            //only updates description if the task hasn't already been described

            points[i].update();
            UpdatePointsList();
            //redrawAll();
            break;
            // console.log("PAST THE BREAK!!!!!!!!!!!!!!!!!");
        }
    }


    if (!point_clicked) {
        createPoint(cx, cy);
    }
}

function intersect(cx, cy, point) {
    // point.print();
    var dist = Math.sqrt(Math.pow((cx - point.x), 2) + Math.pow((cy - point.y), 2));

    var radius = point.yrs * point_size_scale;

    if (dist <= radius) {
        console.log("is intersecting");
        return true;
    } else {
        return false;
    }
}



function createPoint(cx, cy) {


    triggerModal(cx, cy);


    //drawPoint(this);
    // showCoordinates(pretty_x, pretty_y);

}


function triggerModal(cx, cy) {
    var pretty_x = cx * ((200) / width) + -100;
    var pretty_y = cy * ((200) / height) + -100;

    // promptExperience();
    // var num = document.getElementById("yearsExperienceInput").innerHTML.text();
    // console.log(num);

    point_count++; //increments points
    //creates a point object

    var point = {

        x: cx,
        y: cy,
        display_x: Math.floor(pretty_x),
        display_y: Math.floor(-pretty_y),
        yrs: 0,
        number: point_count,
        skill: "",
        description: "",
        print: function() {
            console.log("x: " + this.x + " y :" + this.y);

        },

        //print function

        been_described: false,

        is_described: function() {
            if (this.been_described) {
                return true;
            } else {
                return false;
            }
        },

        update_click: function() {
            this.been_clicked = true;
            this.been_described = false;
        },
        message_displayed: false,


        displayed: function() {
            if (this.message_displayed) {
                return true;
            } else {
                return false;
            }
        },
        updateDisplay: function() {
            if (this.message_displayed) {
                this.message_displayed = false;
            } else {
                this.message_displayed = true;
            }
        },
        visible: true,
        isVisible: function() {
            if (this.visible) {
                return true;
            } else {
                return false;
            }
        },
        update: function() {
            var skill_input = prompt("What is this skill");


            var is_number = false;
            do {
                var yearsExperienceInput = prompt("How many years have you done this task?");
                if (isNaN(parseFloat(yearsExperienceInput))) {
                    console.log("was not a number");
                    alert("please enter a valid number")
                } else {
                    console.log("was a number");
                    is_number = true
                }
            } while (!is_number);
            //var update = prompt("Add a description for this task");
            var descriptionInput = prompt("Add a description for this task");




            this.skill = skill_input;
            this.yrs = yearsExperienceInput;
            this.description = descriptionInput;
            //need to return
            /* function cb(point) {
                 console.log("in cb")
                 console.log("after triggerModal");
                 console.log(point_data);
                 point.been_described = true;

                 // lastNewPointDisplay(this);

                 //point.skill = point_data.skill;
                 //point.yrs = point_data.years;
                 //point.description = point_data.description;
                 // redrawAll();
              drawPoint(point);
             }*/
        },
    };

    point.update();

    /*
        document.getElementById("myForm").reset();

        console.log("inside triggerModal");
        $('#myModal').modal({
            keyboard: false,
            backdrop: 'static'
        })


        if (($("#myModal").data('bs.modal') || {}).isShown) {
            console.log("modal is shown");
        }


        var skill_input;
        $('#skills').on('click', function() {
            skill_input = $(this).val();
            alert($(this).val());
            console.log($(this).val());
        });
        //  console.log(skill_input);
        //return skill_input;

       

        // var curr_point = this;

        $('#myModal').on('click', '#submit', point, function(e) {
            e.preventDefault();
            console.log("Form has been submitted!!");


            //alert(skill_input.text());
            var year_input = $('#yearsExperienceInput').val();
            var description_input = $("#descriptionInput").val();

            point.yrs = year_input;
            point.skill = skill_input;
            point.description = description_input;

            /* var point_data = {
                 skill: skill_input,
                 years: year_input,
                 description: description_input
             };
            console.log("point in triggerModal below");
            console.log(point);
            console.log("end of triggerModal");
            //  console.log(point_data);
            $('#myModal').modal('hide');



            $('#myModal').on('hidden.bs.modal', function() {
                $(this).find('form')[0].reset();

            });

            // return;
            //cb(point);
            //  return point_data;

            // console.log("exp inside getPosition" + exp);
            //fills point display
        });*/
    drawPoint(point);

    lastNewPointDisplay(point);


    points.push(point);
    UpdatePointsList();
    console.log("return statement didn't do shit");
}

function lastNewPointDisplay(point) {
    document.getElementById('point_display').innerHTML = "Point Number: " + point.number + "  X: " + Math.floor(point.display_x) + "  Y: " +
        Math.floor(point.display_y) + " Skill: " + point.skill + " Years of Experience: " + point.yrs + " Description: " + point.description;
}

//updates points[] in a visible <p> element
//this needs to be changed so that it displayes every element in the points array every time it is called
function UpdatePointsList() {

    var display = document.getElementById('points_display');

    display.innerHTML = "";
    for (var i = 0; i < points.length; i++) {
        display.innerHTML += "Point Number: " + points[i].number + "  X: " + Math.floor(points[i].display_x) +
            "  Y: " + Math.floor(points[i].display_y) + " Skill: " + points[i].skill +
            " Years of Experience: " + points[i].yrs + " Description: " + points[i].description + "<br />";
    }
}

//draws points
function drawPoint(point) {
    //var ctx = document.getElementById("canvas").getContext("2d");

    context.fillStyle = "#ee3124"; // Red color

    context.beginPath();
    context.arc(point.x, point.y, point.yrs * point_size_scale, 0, Math.PI * 2, true);
    // context.shadowBlur=10;
    //context.shadowColor="black";
    context.fill();
    var pad = point.yrs * 2;
    context.beginPath();
    context.font = "16px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(point.number, point.x, point.y);
    context.fill();
}


//need to feed function proper x & y coordinates from mouse event handler
canvas.onmousemove = function mouseMove(e) {
    var rect = canvas.getBoundingClientRect(); //bounded rectangle
    var x = event.clientX - rect.left; //x-value
    var y = event.clientY - rect.top; //y-value
    var pretty_x = x * ((200) / width) + -100;
    var pretty_y = y * ((200) / height) + -100;

    checkHover(e);
    // console.log("inside showCoordinates");
    document.getElementById('coordinates').innerHTML = "Coordinates: (" + Math.round(pretty_x) + "," + Math.round(-pretty_y) + ")";
}


//this function checks to see if the mouse is hovering over a point
function checkHover(e) {
    var rect = canvas.getBoundingClientRect(); //bounded rectangle
    var x = event.clientX - rect.left; //x-value
    var y = event.clientY - rect.top; //y-value

    for (var i = 0; i < points.length; i++) {
        var hover = intersect(x, y, points[i]); //checks to see if mouse is intersecting the point
        if (hover && !points[i].displayed()) {
            displayDescription(x, y, points[i]); //if mouse is hovering over the point, displays the description
            points[i].updateDisplay(); //updates that the description of the point is being displayed
            lastNewPointDisplay(points[i]); //updates last point displayed
            // points[i].updateDisplay()
            //redrawAll();
            break;
        }
        if (points[i].displayed() && !hover) {
            redrawAll();
            points[i].updateDisplay();
            turnOffDescription();
        }
    }
}


function turnOffDescription() {
    document.getElementById("description").style.display = "none";
}

function displayDescription(x, y, point) {
    var description = document.getElementById("description");
    var view_threshold
    document.getElementById("description_title").innerHTML = point.number + ": " + point.skill;
    document.getElementById("description_exp").innerHTML = "Years Experience: " + point.yrs;
    document.getElementById("description_text").innerHTML = "Description: " + point.description;
    description.style.display = "block";

    if (point.y < height * 1 / 4) {
        description.style.top = (point.y + 2 * point.yrs * point_size_scale) + 'px';
        description.style.left = (point.x + 2 * point.yrs * point_size_scale) + 'px';
    } else {

        description.style.top = (point.y - point.yrs * point_size_scale) + 'px';
        description.style.left = (point.x + point.yrs * point_size_scale) + 'px';
    }
}



function redrawAll() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    for (var i = 0; i < points.length; i++) {
        if (points[i].isVisible()) {
            drawPoint(points[i]);
        }
    }

}



//clears the board, points array, and displays
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log("supposedly clear...");
    drawBoard();
    point_count = 0;
    points = [];
    console.log(points.toString());
    document.getElementById('points_display').innerHTML = "";
    document.getElementById('point_display').innerHTML = "Point Number: 0" + " X: 0" + " Y: 0";

}
/*
//space bar pressed
$(window).keypress(function(e) {
    if (e.keyCode === 0 || e.keyCode === 32) {
        e.preventDefault()
        console.log('Space pressed')
        clear();
    }
})
*/
