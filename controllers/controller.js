"use strict";
var car;
var wheelsBrands = [];
var wheelsDmt = [];
var cars = new Array;
function createCar(plate, brand, color) {
    var plate = document.getElementById("plate").value.toUpperCase();
    var brand = document.getElementById("brand").value.toUpperCase();
    var color = document.getElementById("carColor").value.toUpperCase();
    if (!validarPlate(plate)) {
        errorInputs();
    }
    else {
        car = new Car(plate, color, brand);
        var plateDisplay = document.getElementById("carPlateInfo");
        plateDisplay.textContent = car.plate;
        var brandDisplay = document.getElementById("carBrandInfo");
        brandDisplay.textContent = car.brand;
        var colorDisplay = document.getElementById("carColorInfo");
        colorDisplay.textContent = car.color;
        noErrors();
        changeForm();
    }
}
function validarPlate(plate) {
    var regexPlate = /^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}/igm;
    return regexPlate.test(plate) ? true : false;
}
function errorInputs() {
    var error = document.getElementById("errorPlate");
    error.style.visibility = "visible";
    var plateEl = document.getElementById("plate");
    plateEl.classList.add("validateInputError");
}
function noErrors() {
    var error = document.getElementById("errorPlate");
    error.style.visibility = "hidden";
    var plateEl = document.getElementById("plate");
    plateEl.classList.remove("validateInputError");
}
function changeForm() {
    var form = document.getElementById("form");
    var wheelsForm = document.getElementById("hidden");
    form.style.display = "none";
    wheelsForm.classList.add("visible");
}
function success() {
    var lastDiv = document.getElementById("hidden2");
    var wheelsForm = document.getElementById("hidden");
    wheelsForm.style.display = "none";
    lastDiv.style.display = "block";
}
function saveCars() {
    cars.push(car);
    console.log(cars);
}
function addWheels(brand, diameter) {
    var brands = new Array;
    var dmts = new Array;
    var dataCount = 0;
    for (var i_1 = 0; i_1 < 4; i_1++) {
        var wheelNumber = i_1 + 1;
        var wheelCustBrand = (document.getElementById("brandwheel" + wheelNumber).value);
        brands.push(wheelCustBrand);
        dataCount++;
    }
    for (var i_2 = 0; i_2 < 4; i_2++) {
        var wheelNumber = (i_2 + 1);
        var wheelcustDmt = parseFloat((document.getElementById("dmtwheel" + wheelNumber).value));
        dmts.push(wheelcustDmt);
        if (dmts[i_2] >= 0.4 && dmts[i_2] <= 2) {
            dataCount++;
        }
        else {
            (document.getElementById("dmtwheel" + wheelNumber).value) = "";
            var error = document.getElementById("errorDmt" + wheelNumber);
            error.style.visibility = "visible";
            error.textContent = ("El diámetro de la rueda " + (i_2 + 1) + " no es correcto");
            var dmtEl = document.getElementById("dmtwheel" + wheelNumber);
            dmtEl.classList.add("validateInputError");
        }
        if (dataCount === 8) {
            success();
        }
    }
    for (var i = 0; i < 4; i++)
        car.addWheel((new Wheel(dmts[i], brands[i])));
    console.log(car);
    for (var i = 0; i < 4; i++) {
        var wheelNumber = i + 1;
        var dmtDisplay = document.getElementById("wheelDmt" + wheelNumber);
        dmtDisplay.textContent = car.wheels[i]["diameter"];
    }
    for (var i = 0; i < 4; i++) {
        var wheelNumber = i + 1;
        var brandDisplay = document.getElementById("wheelBrand" + wheelNumber);
        brandDisplay.textContent = car.wheels[i]["brand"];
    }
}
