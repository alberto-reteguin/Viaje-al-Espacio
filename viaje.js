
/*
 * +----------------------------------------------------------------------------+
 * | Viaje al Espacio v1.0.0
 * +----------------------------------------------------------------------------+
 * | Copyright (c) 2023 - José Alberto Reteguín 
 * | José Alberto Reteguín Arcadia <alberto@reteguin.com>
 * | Released under the MIT license
 * +----------------------------------------------------------------------------+
 * | Author.......: José Alberto Reteguín Arcadia <alberto@reteguin.com>
 * | First release: September 25th, 2023
 * | Last update..: October 29th, 2023
 * | WhatIs.......: viaje.js - JavaScript
 * +----------------------------------------------------------------------------+
 */

const cw = 2300;
const ch = 1200;
var speed = 2;
var earthDays = 0;
var marsDays = 0;

var rocketFlying = false;
var initialDate = "2023-Nov-30";
var initialX = 140;
var initialY = 339;

var endDate = "2025-Jan-15";
var endX = -262;
var endY = 547;

var rocketX = initialX;

var minimumDistance = 0;
var minimumDistanceDate = "";

var currentDay = "";

var m = 0;
var b = 0;


// Función para calcular "m" y "b"
function calculateRocketParameters(x1, y1, x2, y2) {
    m = (y2 - y1) / (x2 - x1);
    b = y2 - (m * x2);
}

function getRocketCorY(x) {
    let y = (m * x) + b;

    return y;
}

function getRocketCorX() {
    if (rocketX >= (endX - 1)) {
        rocketX = rocketX - 1;
    }

    return rocketX;
}
// Trayectoria completa
function trajectory(planet, ctx) {
    if (planet == "Earth") {
        for (let i = 0; i <= 365; i++) {
            let x = EarthData[i]["x2"];
            let y = EarthData[i]["y2"];

            drawPlanet(ctx, x, y, "white", 1);
        }
    }
    else if (planet == "Mars") {
        for (let i = 0; i <= 687; i++) {
            let x = MarsData[i]["x2"];
            let y = MarsData[i]["y2"];

            drawPlanet(ctx, x, y, "white", 1);
        }
    }

}
// Distancia entre 2 planetas
function distance(Earth_X_and_Y, Mars_X_and_Y, date) {
    let d;
    d = Math.sqrt(Math.pow(Earth_X_and_Y[0] - Mars_X_and_Y[0], 2) + (Math.pow(Earth_X_and_Y[1] - Mars_X_and_Y[1], 2)));
    if (minimumDistance == 0) {
        minimumDistance = d;
        minimumDistanceDate = date;
    }
    else {
        if (d < minimumDistance) {
            minimumDistance = d;
            minimumDistanceDate = date;
        }
    }

    console.log(minimumDistance);
    console.log(minimumDistanceDate);

    return d;
}


//Funcion para sacar coordenadas
function getCor(planet) {
    if (planet == "Earth") {
        if (earthDays, earthDays < 365) {
            earthDays = earthDays + 1;
        }
        else {
            earthDays = 0;
        }
        let xcor = EarthData[earthDays]["x2"];
        let ycor = EarthData[earthDays]["y2"];

        let date = EarthData[earthDays]["date"];

        let coordinates = [xcor, ycor, date];
        return coordinates;
    }

    else if (planet == "Mars") {
        if (marsDays, marsDays < 687) {
            marsDays = marsDays + 1;
        }
        else {
            marsDays = 0;
        }
        let xcor = MarsData[marsDays]["x2"];
        let ycor = MarsData[marsDays]["y2"];

        let date = MarsData[marsDays]["date"];
        currentDay = date;
        var coordinates = [xcor, ycor, date];

        return coordinates;
    }

}


// Función de dibujo para el Sol.
function drawSun(context) {
    let sunX = cw / 2;
    let sunY = ch / 2;
    let sunRadius = 30;
    context.fillStyle = "yellow";

    context.beginPath();
    context.arc(sunX, sunY, sunRadius, 0, Math.PI * 2, true);
    context.fill();
}

// Función de dibujo para los planetas
function drawPlanet(context, Xcor, Ycor, color, Radius) {
    context.fillStyle = color;

    Xcor = Xcor + (cw / 2);
    Ycor = ((-1) * (Ycor)) + (ch / 2);

    context.beginPath();
    context.arc(Xcor, Ycor, Radius, 0, Math.PI * 2, true);
    context.fill();
}

//Función para dibujo del cohete
function drawSpaceShip(ctx, x, y, color, size) {
    ctx.fillStyle = color;

    x = x + (cw / 2);
    y = ((-1) * (y)) + (ch / 2);

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2, true);
    ctx.fill();
}

//Función principal.

calculateRocketParameters(initialX, initialY, endX, endY);
console.log(m);
console.log(b);
let ys = getRocketCorY(initialX);

console.log("__________________________________________");

console.log(initialX);
console.log(initialY);
console.log(ys);

console.log("__________________________________________");

function draw() {

    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, cw, ch)

        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0, 0, cw, ch);

        drawSun(ctx);

        // Tierra
        let earthCoordinates = getCor("Earth");

        let xE = earthCoordinates[0];
        let yE = earthCoordinates[1];
        let Earth_X_and_Y = [xE, yE]

        //var Earth_date = earthCoordinates[2];

        trajectory("Earth", ctx);
        drawPlanet(ctx, xE, yE, "blue", 15);

        // Marte
        let marsCoordinates = getCor("Mars");
        let xM = marsCoordinates[0];
        let yM = marsCoordinates[1];

        let Mars_X_and_Y = [xM, yM]
        let mars_date = marsCoordinates[2];

        trajectory("Mars", ctx);
        drawPlanet(ctx, xM, yM, "red", 15);

        let total_distance = distance(Earth_X_and_Y, Mars_X_and_Y, mars_date);

        if (currentDay == initialDate) {
            rocketFlying = true;
        }



        if (rocketFlying == true) {
            let xs = getRocketCorX();
            let ys = getRocketCorY(xs);

            drawSpaceShip(ctx, xs, ys, "white", 5);
        }

        /*
        if (currentDay == endDate) {
            rocketFlying = false
        }
        */
        if (minimumDistanceDate != "2025-Jan-15") {
            //if (marsDays <= 686) {
            requestAnimationFrame(draw);
        }
        else {
            console.log(minimumDistance);
            console.log(minimumDistanceDate);
        }

    }
}

