var baseCurrency = "NZD";
var currencySelected = "AUD";
var conversionSelected = "setLocal";
var currencyData;

function init() {
    getData();
    document.getElementById("currencyForm").addEventListener("click", function () {
        currencySelected = document.getElementById("selectTo").value;
        document.getElementById("statusText").innerHTML = "You have selected " + currencySelected + ".";
        setPlaceholderText();
    });
    document.getElementById("currencyForm").addEventListener("click", function () {
        setPlaceholderText();
    });
    document.getElementById("goButton").addEventListener("click", function () {
        calcAndDisplay();
    });
}

//Enter key function
function inputKeyUp(e) {
    e.which = e.which || e.keyCode;
    if (e.which == 13) {
        calcAndDisplay();
    }
}

// Calculation
function calcAndDisplay() {
    var inputString = document.getElementById("inputBox").value;
    var isNumber = /^[0-9.]+$/.test(inputString);
    if ((inputString === "") || (!isNumber)) {
        document.getElementById("output").innerHTML = "Please enter an amount";
    } else {
        var rate = 0;
        rate = currencyData[currencySelected];
        var outputAmount;
        if (conversionSelected === "setLocal") {
            outputAmount = (parseInt(inputString) * rate).toFixed(2);
            document.getElementById("output").innerHTML = "$" + inputString + " NZD will buy you " + "$" + outputAmount + " " + currencySelected + ".";
        } else if (conversionSelected === "setForeign") {
            outputAmount = (parseInt(inputString) / rate).toFixed(2);
            document.getElementById("output").innerHTML = "$" + inputString + " " + currencySelected + " will cost you " + "$" + outputAmount + " NZD.";
        } else {
            outputAmount = ((1 / rate) * parseInt(inputString)).toFixed(2);
            document.getElementById("output").innerHTML = "$" + inputString + " " + currencySelected + " will buy you " + "$" + outputAmount + " NZD.";
        }
    }
}

//api request
function getData() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var dataArray;
                dataArray = JSON.parse(xmlhttp.responseText);
                currencyData = dataArray.rates;
            } else if (xmlhttp.status == 400) {
                alert('There was an error 400');
            } else {
                alert('Something else other than 200 was returned');
            }
        }
    };
    xmlhttp.open("GET", "http://api.fixer.io/latest?base=" + baseCurrency);
    xmlhttp.send();
}
