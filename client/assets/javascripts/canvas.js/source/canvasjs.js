﻿/**
* @preserve CanvasJS HTML5 & JavaScript Charts - v1.4.1 GA - http://canvasjs.com/ 
* Copyright 2013 fenopix
*/

/*
* CanvasJS Charts follows Dual Licensing Model as mentioned below. 
* 
* ---------------------Free for Non-Commercial Use--------------------
* 
* For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
*     http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
* 
* ---------------------Commercial License--------------------
* Commercial use of CanvasJS requires you to purchase a license. Without a commercial license you can use it for evaluation purposes only. Please refer to the following link for further details.
*     http://canvasjs.com/
* 
*/


/* jshint -W099 */ //Ignore warning "Mixed Spaces and Tabs"

(function () {

    var isDebugMode = false;

    var isCanvasSupported = !!document.createElement("canvas").getContext;
    //isCanvasSupported = false;

    //Default values for all Chart Elements that can be set by the user. CanvasJSObject.setOptions looks into this while setting the default/user-defined values.
    var defaultOptions = {
        Chart: {
            width: 500,
            height: 400,
            zoomEnabled: false,
            backgroundColor: "white",
            theme: "theme1",
            animationEnabled: isCanvasSupported ? true : false,
            colorSet: "colorSet1",
            culture: "en",
            creditHref: "http://canvasjs.com/",
            creditText: "CanvasJS.com",
            interactivityEnabled: true
        },

        Title: {
            padding: 0,
            text: null,
            verticalAlign: "top",//top, center, bottom
            horizontalAlign: "center",//left, center, right
            fontSize: 20,//in pixels
            fontFamily: "Calibri",
            fontWeight: "normal", //normal, bold, bolder, lighter,
            fontColor: "black",
            fontStyle: "normal", // normal, italic, oblique

            borderThickness: 0,
            borderColor: "black",
            cornerRadius: 0,
            backgroundColor: null,
            margin: 5
            //toolTipContent: null//string - To be implemented (TBI)
        },

        Legend: {
            name: null,
            verticalAlign: "center",
            horizontalAlign: "right",

            fontSize: 14,//in pixels
            fontFamily: "calibri",
            fontWeight: "normal", //normal, bold, bolder, lighter,
            fontColor: "black",
            fontStyle: "normal", // normal, italic, oblique

            cursor: null,
            itemmouseover: null,
            itemmouseout: null,
            itemmousemove: null,
            itemclick: null
        },

        ToolTip: {
            enabled: true,
            borderColor: null,
            shared: false,
            animationEnabled: true,
            content: null
        },

        Axis: {
            minimum: null, //Minimum value to be shown on the Axis
            maximum: null, //Minimum value to be shown on the Axis
            interval: null, // Interval for tick marks and grid lines
            intervalType: null, //number, millisecond, second, minute, hour, day, month, year

            title: null, // string
            titleFontColor: "black",
            titleFontSize: 20,
            titleFontFamily: "arial",
            titleFontWeight: "normal",
            titleFontStyle: "normal",

            labelAngle: 0,
            labelFontFamily: "arial",
            labelFontColor: "black",
            labelFontSize: 12,
            labelFontWeight: "normal",
            labelFontStyle: "normal",
            labelAutoFit: false,
            labelWrap: true,
            labelMaxWidth: null,//null for auto

            prefix: "",
            suffix: "",

            includeZero: true, //Applies only for axisY. Ignored in axisX.

            tickLength: 5,
            tickColor: "black",
            tickThickness: 1,

            lineColor: "black",
            lineThickness: 1,

            gridColor: "A0A0A0",
            gridThickness: 0,

            interlacedColor: null,

            valueFormatString: null,

            margin: 2,

            stripLines: [] // Just a placeholder. Does not have any effect on the actual number of striplines
        },

        StripLine: {
            value: null,
            startValue: null,
            endValue: null,

            color: "orange",
            thickness: 2,
            label: "",
            labelBackgroundColor: "#EEEEEE",
            labelFontFamily: "arial",
            labelFontColor: "orange",
            labelFontSize: 12,
            labelFontWeight: "normal",
            labelFontStyle: "normal"
        },

        DataSeries: {
            name: null,
            dataPoints: null,
            label: "",
            bevelEnabled: false,

            cursor: null,

            indexLabel: "",
            indexLabelPlacement: "outside",  //inside, outside       
            indexLabelOrientation: "horizontal",
            indexLabelFontColor: "black",
            indexLabelFontSize: 12,
            indexLabelFontStyle: "normal", //   italic ,oblique, normal 
            indexLabelFontFamily: "Arial", 	// fx: Arial Verdana "Courier New" Serif 
            indexLabelFontWeight: "normal", 	// bold ,bolder, lighter, normal 
            indexLabelBackgroundColor: null,
            indexLabelLineColor: null,
            indexLabelLineThickness: 1,
            indexLabelMaxWidth: null,
            indexLabelWrap: true,

            lineThickness: 2,

            color: null,

            startAngle: 0,

            type: "column", //line, column, bar, area, scatter stackedColumn, stackedBar, stackedArea, stackedColumn100, stackedBar100, stackedArea100, pie, doughnut
            xValueType: "number", //number, dateTime
            axisYType: "primary",

            xValueFormatString: null,
            yValueFormatString: null,

            showInLegend: null,
            legendMarkerType: null,
            legendMarkerColor: null,
            legendText: null,

            markerType: "circle", //none, circle, square, cross, triangle, line
            markerColor: null,
            markerSize: null,
            markerBorderColor: null,
            markerBorderThickness: null,
            //animationEnabled: true,
            mouseover: null,
            mouseout: null,
            mousemove: null,
            click: null,
            toolTipContent: null,

            visible: true
        },

        CultureInfo: {
            decimalSeparator: ".",
            digitGroupSeparator: ",",
            zoomText: "Zoom",
            panText: "Pan",
            resetText: "Reset",
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },


        //Private
        TextBlock: {
            x: 0,
            y: 0,
            width: null,//read only
            height: null,//read only
            maxWidth: null,
            maxHeight: null,
            padding: 0,
            angle: 0,
            text: "",
            horizontalAlign: "center",//left, center, right
            fontSize: 12,//in pixels
            fontFamily: "calibri",
            fontWeight: "normal", //normal, bold, bolder, lighter,
            fontColor: "black",
            fontStyle: "normal", // normal, italic, oblique

            borderThickness: 0,
            borderColor: "black",
            cornerRadius: 0,
            backgroundColor: null,
            textBaseline: "top"
        }
    };

    //#region Cultures

    var cultures = {
        "en": {
            //Derives from the default options
        }//,
        //"es": {
        //    decimalSeparator: ",",
        //    digitGroupSeparator: ".",
        //    zoomText: "zoom",
        //    panText: "pan",
        //    resetText: "reset",
        //    days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
        //}
    };

    //#endregion Cultures

    //#region Themes

    var colorSets = {

        "colorSet1": [
			"#369EAD",
			"#C24642",
			"#7F6084",
			//"#96C412",
			"#86B402",
			"#A2D1CF",
			//"#D8C641",
			"#C8B631",
			"#6DBCEB",
			//"#4A4946",
			"#52514E",
			"#4F81BC",
			"#A064A1",
			"#F79647"
        ],
        "colorSet2": [
			"#4F81BC",
			"#C0504E",
			"#9BBB58",
			"#23BFAA",
			//"#FAA586",
			"#8064A1",
			"#4AACC5",
			"#F79647",
			//"#77AA33",
			//"#7F6084"
			"#33558B"
        ],
        "colorSet3": [
			"#8CA1BC",
			"#36845C",
			"#017E82",
			"#8CB9D0",
			"#708C98",
			"#94838D",
			"#F08891",
			"#0366A7",
			"#008276",
			"#EE7757",
			"#E5BA3A",
			"#F2990B",
			"#03557B",
			"#782970"
        ]//,
        //"colorSet4": [
        //    "#3698C5",
        //    "#009B8D",
        //    "#F1D691",
        //    "#F8B90C",
        //    "#0081B8",
        //    "#5B5A96",
        //    "#ACBDD1",
        //    "#88A891",
        //    "#39969D",
        //    "#AECEDD",
        //    "#A0B2BC",
        //    "#BBAEB7",
        //    "#A0C65F",
        //    "#EEA6AA",
        //    "#3798C5"
        //],
        //"colorSet5": [
        //    "#88ADBF",
        //    "#84C336",
        //    "#7B91C3",
        //    "#4661EE",
        //    "#EC5657",
        //    "#1BCDD1",
        //    "#8FAABB",
        //    "#B08BEB",
        //    "#3EA0DD",
        //    "#F5A52A",
        //    "#23BFAA",
        //    "#FAA586",
        //    "#EB8CC6"
        //]

    };

    var themes =
		{
		    "theme1": {
		        Chart:
					{
					    colorSet: "colorSet1"
					},
		        Title: {
		            fontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            fontSize: 33,
		            fontColor: "#3A3A3A",
		            fontWeight: "bold",
		            verticalAlign: "top",
		            margin: 10
		        },
		        Axis: {
		            titleFontSize: 26,
		            //titleFontColor: "rgb(98,98,98)",
		            titleFontColor: "#666666",
		            //titleFontFamily: "arial black",
		            //titleFontFamily: "Verdana, Geneva, Calibri, sans-serif",
		            titleFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //titleFontWeight: "bold",

		            //labelFontFamily: "Times New Roman, Times, serif",
		            labelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //labelFontFamily: "Helvetica Neue, Helvetica",
		            labelFontSize: 18,
		            labelFontColor: "grey",
		            //labelFontWeight: "bold",
		            tickColor: "#BBBBBB",
		            tickThickness: 2,
		            gridThickness: 2,
		            gridColor: "#BBBBBB",
		            lineThickness: 2,
		            lineColor: "#BBBBBB"
		        },
		        Legend: {
		            verticalAlign: "bottom",
		            horizontalAlign: "center",
		            fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "calibri"
		        },
		        DataSeries: {
		            //bevelEnabled: true,
		            indexLabelFontColor: "grey",
		            //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
		            indexLabelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //indexLabelFontWeight: "bold",
		            indexLabelFontSize: 18,
		            //indexLabelLineColor: "lightgrey",
		            indexLabelLineThickness: 1
		        }
		    },

		    "theme2": {
		        Chart:
					{
					    colorSet: "colorSet2"
					},
		        Title: {
		            fontFamily: "impact, charcoal, arial black, sans-serif",
		            fontSize: 32,//fontColor: "rgb(58,58,58)",
		            fontColor: "#333333",
		            //fontFamily: "arial black", fontSize: 30,//fontColor: "rgb(58,58,58)",
		            //fontFamily: "arial black",
		            //fontFamily: "Helvetica Neue, Helvetica", fontSize: 35,// fontColor: "rgb(58,58,58)",
		            //fontWeight: "bold",
		            verticalAlign: "top",
		            margin: 10
		        },
		        Axis: {
		            titleFontSize: 22,
		            titleFontColor: "rgb(98,98,98)",
		            //titleFontFamily: "arial black",
		            titleFontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "arial",
		            titleFontWeight: "bold",


		            labelFontFamily: isCanvasSupported ? "monospace, Courier New, Courier" : "arial",
		            //labelFontFamily: "Helvetica Neue, Helvetica",
		            labelFontSize: 16,
		            labelFontColor: "grey",
		            labelFontWeight: "bold",
		            tickColor: "grey",
		            tickThickness: 2,
		            gridThickness: 2,
		            gridColor: "grey",
		            lineThickness: 0
		        },
		        Legend: {
		            verticalAlign: "bottom",
		            horizontalAlign: "center",
		            fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "arial"
		        },
		        DataSeries: {
		            indexLabelFontColor: "grey",
		            //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
		            indexLabelFontFamily: isCanvasSupported ? "Courier New, Courier, monospace" : "arial",
		            indexLabelFontWeight: "bold",
		            indexLabelFontSize: 18,
		            //indexLabelLineColor: "lightgrey",
		            indexLabelLineThickness: 1
		        }
		    },

		    "theme3": {
		        Chart:
					{
					    colorSet: "colorSet1"
					},
		        Title: {
		            //fontFamily: "impact, charcoal, arial black, sans-serif", fontSize: 30,//fontColor: "rgb(58,58,58)",
		            //fontFamily: "arial black", fontSize: 30,//fontColor: "rgb(58,58,58)",
		            //fontFamily: "arial black",
		            fontFamily: isCanvasSupported ? "Candara, Optima, Trebuchet MS, Helvetica Neue, Helvetica, Trebuchet MS, serif" : "calibri",
		            fontSize: 32,
		            //fontFamily: "Palatino Linotype, Book Antiqua, Palatino, serif", fontSize: 30,
		            //fontFamily: "Lucida Sans Unicode, Lucida Grande, Trebuchet MS, sans-serif", fontSize: 30,
		            //fontColor: "rgb(68,78,58)",
		            fontColor: "#3A3A3A",
		            fontWeight: "bold",
		            verticalAlign: "top",
		            margin: 10
		        },
		        Axis: {
		            titleFontSize: 22,
		            titleFontColor: "rgb(98,98,98)",
		            //titleFontFamily: "arial black",
		            titleFontFamily: isCanvasSupported ? "Verdana, Geneva, Calibri, sans-serif" : "calibri",
		            //titleFontWeight: "bold",

		            //labelFontFamily: "Times New Roman, Times, serif",
		            labelFontFamily: isCanvasSupported ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
		            //labelFontFamily: "Helvetica Neue, Helvetica",
		            labelFontSize: 18,
		            labelFontColor: "grey",
		            //labelFontWeight: "bold",
		            tickColor: "grey",
		            tickThickness: 2,
		            gridThickness: 2,
		            gridColor: "grey",
		            lineThickness: 2,
		            lineColor: "grey"
		        },
		        Legend: {
		            verticalAlign: "bottom",
		            horizontalAlign: "center",
		            fontFamily: isCanvasSupported ? "monospace, sans-serif,arial black" : "calibri"
		        },
		        DataSeries: {
		            bevelEnabled: true,
		            indexLabelFontColor: "grey",
		            //indexLabelFontFamily: "Trebuchet MS, monospace, Courier New, Courier",
		            indexLabelFontFamily: isCanvasSupported ? "Candara, Optima, Calibri, Verdana, Geneva, sans-serif" : "calibri",
		            //indexLabelFontWeight: "bold",
		            indexLabelFontSize: 18,
		            indexLabelLineColor: "lightgrey",
		            indexLabelLineThickness: 2
		        }
		    }
		};

    //#endregion Themes

    var constants = {
        numberDuration: 1,
        yearDuration: 1000 * 60 * 60 * 24 * 364,
        monthDuration: 1000 * 60 * 60 * 24 * 30,
        weekDuration: 1000 * 60 * 60 * 24 * 7,
        dayDuration: 1000 * 60 * 60 * 24,
        hourDuration: 1000 * 60 * 60,
        minuteDuration: 1000 * 60,
        secondDuration: 1000,
        millisecondDuration: 1,

        dayOfWeekFromInt: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    };

    //#region Static Methods

    function extend(Child, Parent) {
        Child.prototype = inherit(Parent.prototype);
        Child.prototype.constructor = Child;
        Child.parent = Parent.prototype;
    }

    function inherit(proto) {
        function F() { }
        F.prototype = proto;
        return new F();
    }

    function addToDateTime(dateTime, num, type) {

        if (type === "millisecond")
            dateTime.setMilliseconds(dateTime.getMilliseconds() + 1 * num);
        else if (type === "second")
            dateTime.setSeconds(dateTime.getSeconds() + 1 * num);
        else if (type === "minute")
            dateTime.setMinutes(dateTime.getMinutes() + 1 * num);
        else if (type === "hour")
            dateTime.setHours(dateTime.getHours() + 1 * num);
        else if (type === "day")
            dateTime.setDate(dateTime.getDate() + 1 * num);
        else if (type === "week")
            dateTime.setDate(dateTime.getDate() + 7 * num);
        else if (type === "month")
            dateTime.setMonth(dateTime.getMonth() + 1 * num);
        else if (type === "year")
            dateTime.setFullYear(dateTime.getFullYear() + 1 * num);

        return dateTime;
    }

    function convertToNumber(num, type) {
        return constants[type + "Duration"] * num;
    }

    function pad(value, length) {
        var isNegative = false;
        if (value < 0) {
            isNegative = true;
            value *= -1;
        }

        value = "" + value;
        length = !length ? 1 : length;

        while (value.length < length) value = "0" + value;

        return isNegative ? "-" + value : value;
    }

    function trimString(str) {
        if (!str)
            return str;

        str = str.replace(/^\s\s*/, '');
        var ws = /\s/;
        var i = str.length;
        while (ws.test(str.charAt(--i))) { }
        return str.slice(0, i + 1);
    }

    function extendCtx(context) {
        context.roundRect = function (x, y, width, height, radius, borderThickness, backgroundColor, borderColor) {
            ///<signature>
            ///<summary>Creates a rounded rectangle with given fill/stroke parameters</summary>
            ///<param name="x" type="number">x value</param>
            ///<param name="y" type="number">y value</param>
            ///<param name="width" type="number">Border Width</param>
            ///<param name="height" type="number">Border Height</param>
            ///<param name="radius" type="number">Border CornerRadius</param>
            ///<param name="borderThickness" type="number">Border Thickess</param>
            ///<param name="backgroundColor" type="number">Background Color</param>
            ///<param name="borderColor" type="number">Border Color</param>
            ///</signature>

            if (backgroundColor) {
                this.fillStyle = backgroundColor;
            }

            if (borderColor) {
                this.strokeStyle = borderColor;
            }

            //if (typeof stroke == "undefined") {
            //	stroke = true;
            //}

            if (typeof radius === "undefined") {
                radius = 5;
            }

            this.lineWidth = borderThickness;

            this.beginPath();
            this.moveTo(x + radius, y);
            this.lineTo(x + width - radius, y);
            this.quadraticCurveTo(x + width, y, x + width, y + radius);
            this.lineTo(x + width, y + height - radius);
            this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            this.lineTo(x + radius, y + height);
            this.quadraticCurveTo(x, y + height, x, y + height - radius);
            this.lineTo(x, y + radius);
            this.quadraticCurveTo(x, y, x + radius, y);
            this.closePath();

            if (backgroundColor) {
                this.fill();
            }

            if (borderColor && borderThickness > 0) {
                this.stroke();
            }
        };
    }

    function compareNumbers(a, b) {
        return a - b;
    }

    function compareDataPointX(dataPoint1, dataPoint2) {
        return dataPoint1.x - dataPoint2.x;
    }

    function intToHexColorString(num) {
        var r = ((num & 0xFF0000) >> 16).toString(16);
        var g = ((num & 0x00FF00) >> 8).toString(16);
        var b = ((num & 0x0000FF) >> 0).toString(16);

        r = r.length < 2 ? "0" + r : r;
        g = g.length < 2 ? "0" + g : g;
        b = b.length < 2 ? "0" + b : b;

        return "#" + r + g + b;
    }

    function RGBToInt(r, g, b) {
        var num = (r << 16) | (g << 8) | (b);

        return num;
    }

    function intToRGB(num) {
        var rgb = [];
        var r = ((num & 0xFF0000) >> 16);
        var g = ((num & 0x00FF00) >> 8);
        var b = ((num & 0x0000FF) >> 0);

        //r = r.length < 2 ? "0" + r : r;
        //g = g.length < 2 ? "0" + g : g;
        //b = b.length < 2 ? "0" + b : b;

        rgb[0] = r;
        rgb[1] = g;
        rgb[2] = b;

        return rgb;
    }

    var fontHeightInPixels = {};
    var textMeasureEl = null;
    function getFontHeightInPixels(fontFamily, fontSize, fontWeight) {

        //return fontSize;

        fontWeight = fontWeight || "normal";

        var entry = fontFamily + "_" + fontSize + "_" + fontWeight;
        var height = fontHeightInPixels[entry];

        if (isNaN(height)) {
            try {
                var style = "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;" + "font-family:" + fontFamily + "; " + "font-size:" + fontSize + "px; font-weight:" + fontWeight + ";";
                //console.log(style);
                if (!textMeasureEl) {
                    var body = document.body;
                    textMeasureEl = document.createElement("span");
                    textMeasureEl.innerHTML = "";
                    var textNode = document.createTextNode("Mpgyi");
                    textMeasureEl.appendChild(textNode);
                    body.appendChild(textMeasureEl);
                }

                textMeasureEl.style.display = "";
                textMeasureEl.setAttribute("style", style);

                height = Math.round(textMeasureEl.offsetHeight);
                textMeasureEl.style.display = "none";
                //body.removeChild(tempDiv);

                //if (window.console)
                //	window.console.log(fontSize + ": " + height);
            }
            catch (e) {
                height = Math.ceil(fontSize * 1.1);
            }

            height = Math.max(height, fontSize);

            fontHeightInPixels[entry] = height;
        }

        return height;
    }

    //userCapture is optional. Defaults to false
    function addEvent(obj, eventType, fn, useCapture) {
        if (obj.addEventListener) {
            obj.addEventListener(eventType, fn, useCapture || false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent("on" + eventType, function (e) {
                e = e || window.event;
                e.preventDefault = e.preventDefault || function () { e.returnValue = false; };
                e.stopPropagation = e.stopPropagation || function () { e.cancelBubble = true; };
                fn.call(obj, e);
            });
        } else
            return false;
    }

    //#region formatting functions/methods
    var dateFormat = function () {
        var reg = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g;

        var defDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var defShortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        var defMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var defShortMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
        var timezoneClip = /[^-+\dA-Z]/g;

        return function (dt, formatString, cultureInfo) {

            var days = cultureInfo ? cultureInfo.days : defDays;
            var months = cultureInfo ? cultureInfo.months : defMonths;

            var shortDays = cultureInfo ? cultureInfo.shortDays : defShortDays;
            var shortMonths = cultureInfo ? cultureInfo.shortMonths : defShortMonths;

            var result = "";
            var utc = false;

            dt = dt && dt.getTime ? dt : dt ? new Date(dt) : new Date;
            if (isNaN(dt)) throw SyntaxError("invalid date");

            if (formatString.slice(0, 4) === "UTC:") {
                formatString = formatString.slice(4);
                utc = true;
            }

            var pre = utc ? "getUTC" : "get";
            var date = dt[pre + "Date"]();
            var day = dt[pre + "Day"]();
            var month = dt[pre + "Month"]();
            var year = dt[pre + "FullYear"]();
            var hours = dt[pre + "Hours"]();
            var minutes = dt[pre + "Minutes"]();
            var seconds = dt[pre + "Seconds"]();
            var milliseconds = dt[pre + "Milliseconds"]();
            var offset = utc ? 0 : dt.getTimezoneOffset();

            result = formatString.replace(reg, function (key) {

                switch (key) {

                    case "D":
                        return date;
                    case "DD":
                        return pad(date, 2);
                    case "DDD":
                        return shortDays[day];
                    case "DDDD":
                        return days[day];


                    case "M":
                        return month + 1;
                    case "MM":
                        return pad(month + 1, 2);
                    case "MMM":
                        return shortMonths[month];
                    case "MMMM":
                        return months[month];


                    case "Y":
                        return parseInt(String(year).slice(-2));
                    case "YY":
                        return pad(String(year).slice(-2), 2);
                    case "YYY":
                        return pad(String(year).slice(-3), 3);
                    case "YYYY":
                        return pad(year, 4);


                    case "h":
                        return hours % 12 || 12;
                    case "hh":
                        return pad(hours % 12 || 12, 2);


                    case "H":
                        return hours;
                    case "HH":
                        return pad(hours, 2);

                    case "m":
                        return minutes;
                    case "mm":
                        return pad(minutes, 2);


                    case "s":
                        return seconds;
                    case "ss":
                        return pad(seconds, 2);

                    case "f":
                        return String(milliseconds).slice(0, 1);
                    case "ff":
                        return pad(String(milliseconds).slice(0, 2), 2);
                    case "fff":
                        return pad(String(milliseconds).slice(0, 3), 3);


                    case "t":
                        return hours < 12 ? "a" : "p";
                    case "tt":
                        return hours < 12 ? "am" : "pm";
                    case "T":
                        return hours < 12 ? "A" : "P";
                    case "TT":
                        return hours < 12 ? "AM" : "PM";


                    case "K":
                        return utc ? "UTC" : (String(dt).match(timezone) || [""]).pop().replace(timezoneClip, ""); // Time Zone;
                    case "z":
                        return (offset > 0 ? "-" : "+") + Math.floor(Math.abs(offset) / 60); // Hour Offset from UTC without padding
                    case "zz":
                        return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2); // Hour Offset from UTC with padding
                    case "zzz":
                        return (offset > 0 ? "-" : "+") + pad(Math.floor(Math.abs(offset) / 60), 2) + pad(Math.abs(offset) % 60, 2); // Hour and Minute Offset from UTC with padding

                    default:
                        return key.slice(1, key.length - 1);

                }
            });

            return result;
        };
    }();


    var numberFormat = function (v, fs, cultureInfo) {
        if (v === null)
            return "";

        v = Number(v);
        var isNegative = v < 0 ? true : false;
        if (isNegative) v *= -1;

        var decimalSeparator = cultureInfo ? cultureInfo.decimalSeparator : ".";
        var digitGroupSeparator = cultureInfo ? cultureInfo.digitGroupSeparator : ",";

        var vString = "";
        fs = String(fs);
        var multiplier = 1;
        var temp;
        var result = "";

        var matches = "";
        var decimalPosition = -1;
        var fsBeforeDecimal = [];
        var fsAfterDecimal = [];
        var noPhBeforeDecimal = 0; // Number of Placeholders before Decimal
        var noPhAfterDecimal = 0; // Number of Placeholders after Decimal
        var noComma = 0;
        var isScientificNotation = false;
        var exponent = 0;

        matches = fs.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|‰|./g);
        //window.console.log(matches + " = " + matches.length);
        var match = null;

        for (var i = 0; matches && i < matches.length; i++) {
            match = matches[i];

            if (match === "." && decimalPosition < 0) {
                decimalPosition = i;
                continue;
            } else if (match === "%") {
                multiplier *= 100;
            } else if (match === "‰") {
                multiplier *= 1000;
                continue;
            } else if (match[0] === "," && match[match.length - 1] === ".") {
                multiplier /= Math.pow(1000, match.length - 1);
                decimalPosition = i + match.length - 1;
                continue;
            } else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0") {
                isScientificNotation = true;
            }

            if (decimalPosition < 0) {
                fsBeforeDecimal.push(match);
                if (match === "#" || match === "0")
                    noPhBeforeDecimal++;
                else if (match === ",")
                    noComma++;
            }
            else {
                fsAfterDecimal.push(match);
                if (match === "#" || match === "0")
                    noPhAfterDecimal++;
            }
        }

        if (isScientificNotation) {
            var integer = Math.floor(v);
            exponent = (integer === 0 ? "" : String(integer)).length - noPhBeforeDecimal;
            multiplier /= Math.pow(10, exponent);
        }

        v *= multiplier;

        if (decimalPosition < 0)
            decimalPosition = i;

        vString = v.toFixed(noPhAfterDecimal);
        var split = vString.split(".");
        //window.console.log(split);
        var vStringBeforeDecimal = (split[0] + "").split("");
        var vStringAfterDecimal = (split[1] + "").split("");

        if (vStringBeforeDecimal && vStringBeforeDecimal[0] === "0")
            vStringBeforeDecimal.shift();

        //window.console.log(fsBeforeDecimal + "<---------->" + fsAfterDecimal + " &        " + vStringBeforeDecimal + "<---------->" + vStringAfterDecimal);

        var noPhProcessed = 0;
        var noDigitsAdded = 0;
        var noCommaAdded = 0;
        var commaDistance = 0;
        var distanceFromLastComma = 0;

        while (fsBeforeDecimal.length > 0) {
            match = fsBeforeDecimal.pop();

            if (match === "#" || match === "0") {
                noPhProcessed++;

                if (noPhProcessed === noPhBeforeDecimal) {
                    var digits = vStringBeforeDecimal;
                    vStringBeforeDecimal = [];

                    if (match === "0") {
                        //var totalDigits = result.match(/[0-9]/g).length;
                        var toPad = noPhBeforeDecimal - noDigitsAdded - (digits ? digits.length : 0);

                        while (toPad > 0) {
                            digits.unshift("0");
                            toPad--;
                        }
                    }

                    while (digits.length > 0) {
                        result = digits.pop() + result;
                        distanceFromLastComma++;

                        if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && digits.length > 0)
                            result = digitGroupSeparator + result;
                    }

                    if (isNegative)
                        result = "-" + result;

                } else {
                    if (vStringBeforeDecimal.length > 0) {
                        result = vStringBeforeDecimal.pop() + result;
                        noDigitsAdded++;
                        distanceFromLastComma++;
                    }
                    else if (match === "0") {
                        result = "0" + result;
                        noDigitsAdded++;
                        distanceFromLastComma++;
                    }

                    if (distanceFromLastComma % commaDistance === 0 && noCommaAdded === noComma && vStringBeforeDecimal.length > 0)
                        result = digitGroupSeparator + result;
                }


            } else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)) {
                if (exponent < 0)
                    match = match.replace("+", "").replace("-", "");
                else
                    match = match.replace("-", "");

                result += match.replace(/[0]+/, function ($0) {
                    return pad(exponent, $0.length);
                });


            } else {
                if (match === ",") {
                    noCommaAdded++;
                    commaDistance = distanceFromLastComma;
                    distanceFromLastComma = 0;

                    if (vStringBeforeDecimal.length > 0)
                        result = digitGroupSeparator + result;
                } else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))) {
                    result = match.slice(1, match.length - 1) + result;
                }
                else
                    result = match + result;
            }
        }

        var charCount = 0;
        var resultAfterDecimal = "";
        var addDecimalSeparator = false;

        while (fsAfterDecimal.length > 0) {
            match = fsAfterDecimal.shift();

            if (match === "#" || match === "0") {
                if (vStringAfterDecimal.length > 0 && Number(vStringAfterDecimal.join("")) !== 0) {
                    resultAfterDecimal += vStringAfterDecimal.shift();
                    addDecimalSeparator = true;
                }
                else if (match === "0") {
                    resultAfterDecimal += "0";
                    addDecimalSeparator = true;
                }
            } else if (match.length > 1 && ((match[0] === "\"" && match[match.length - 1] === "\"") || (match[0] === "'" && match[match.length - 1] === "'"))) {
                resultAfterDecimal += match.slice(1, match.length - 1);
                //addDecimalSeparator = true;
            } else if ((match[0] === "E" || match[0] === "e") && match[match.length - 1] === "0" && /[eE][+-]*[0]+/.test(match)) {
                if (exponent < 0)
                    match = match.replace("+", "").replace("-", "");
                else
                    match = match.replace("-", "");
                resultAfterDecimal += match.replace(/[0]+/, function ($0) {
                    return pad(exponent, $0.length);
                });
            } else {
                resultAfterDecimal += match;
                //addDecimalSeparator = true;
            }
        }

        result += (addDecimalSeparator ? decimalSeparator : "") + resultAfterDecimal;
        //window.console.log(result);
        return result;
    };

    //#endregion formatting functions/methods

    function getObjectId(x, y, ctx) {
        x *= devicePixelBackingStoreRatio;
        y *= devicePixelBackingStoreRatio;
        var pixels = ctx.getImageData(x, y, 2, 2).data;
        var isObject = true;

        for (var i = 0; i < 4; i++) {

            if (pixels[i] !== pixels[i + 4] | pixels[i] !== pixels[i + 8] | pixels[i] !== pixels[i + 12]) {
                isObject = false;
                break;
            }
        }

        if (isObject) {
            return RGBToInt(pixels[0], pixels[1], pixels[2]);
        } else {
            return 0;
        }

        //window.console.log(pixels);
    }

    //extracts mouse coordinates from the event parameters
    var getMouseCoordinates = function (ev) {
        var x = 0;
        var y = 0;

        ev = ev || window.event;

        if (ev.offsetX || ev.offsetX === 0) {
            x = ev.offsetX;
            y = ev.offsetY;
        } else if (ev.layerX || ev.layerX == 0) { // Firefox
            x = ev.layerX;
            y = ev.layerY;
        }
        else {
            x = ev.pageX - ev.target.offsetLeft;
            y = ev.pageY - ev.target.offsetTop;
        }

        return { x: x, y: y };
    };

    function getFontString(prefix, object, fallbackObject) {
        var fontString = "";

        var fontStyleString = prefix ? prefix + "FontStyle" : "fontStyle";
        var fontWeightString = prefix ? prefix + "FontWeight" : "fontWeight";
        var fontSizeString = prefix ? prefix + "FontSize" : "fontSize";
        var fontFamilyString = prefix ? prefix + "FontFamily" : "fontFamily";



        fontString += object[fontStyleString] ? object[fontStyleString] + " " : (fallbackObject && fallbackObject[fontStyleString]) ? (fallbackObject[fontStyleString] + " ") : "";
        fontString += object[fontWeightString] ? object[fontWeightString] + " " : (fallbackObject && fallbackObject[fontWeightString]) ? (fallbackObject[fontWeightString] + " ") : "";
        fontString += object[fontSizeString] ? object[fontSizeString] + "px " : (fallbackObject && fallbackObject[fontSizeString]) ? (fallbackObject[fontSizeString] + "px ") : "";


        var fontFamily = object[fontFamilyString] ? object[fontFamilyString] + "" : (fallbackObject && fallbackObject[fontFamilyString]) ? (fallbackObject[fontFamilyString] + "") : "";

        if (!isCanvasSupported && fontFamily) {
            var firstFontFamily = fontFamily.split(",")[0];

            if (firstFontFamily[0] !== "'" && firstFontFamily[0] !== "\"")
                firstFontFamily = "'" + firstFontFamily + "'";

            fontString += firstFontFamily;
        } else
            fontString += fontFamily;

        return fontString;
    }

    function getProperty(propertyName, object, fallbackObject) {

        var value = propertyName in object ? object[propertyName] : fallbackObject[propertyName];

        return value;
    }

    var optimizeForHiDPI = true;
    //optimizeForHiDPI = false;

    var devicePixelRatio = window.devicePixelRatio || 1;
    var backingStoreRatio = 1;
    var devicePixelBackingStoreRatio = optimizeForHiDPI ? devicePixelRatio / backingStoreRatio : 1;



    function setCanvasSize(canvas, width, height) {

        if (isCanvasSupported && !!optimizeForHiDPI) {
            var ctx = canvas.getContext("2d");
            backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
								ctx.mozBackingStorePixelRatio ||
								ctx.msBackingStorePixelRatio ||
								ctx.oBackingStorePixelRatio ||
								ctx.backingStorePixelRatio || 1;


            devicePixelBackingStoreRatio = devicePixelRatio / backingStoreRatio;

            canvas.width = width * devicePixelBackingStoreRatio;
            canvas.height = height * devicePixelBackingStoreRatio;

            if (devicePixelRatio !== backingStoreRatio) {

                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';

                ctx.scale(devicePixelBackingStoreRatio, devicePixelBackingStoreRatio);

            }

            //window.alert(backingStoreRatio);
            //window.alert(devicePixelRatio);

        } else {
            canvas.width = width;
            canvas.height = height;
        }

    }


    function createCanvas(width, height) {
        var canvas = document.createElement("canvas");
        canvas.setAttribute("class", "canvasjs-chart-canvas");

        setCanvasSize(canvas, width, height);

        if (!isCanvasSupported && typeof (G_vmlCanvasManager) !== "undefined") {
            G_vmlCanvasManager.initElement(canvas);
        }

        return canvas;
    }
    //#endregion Static Methods

    //#region Class Definitions

    //#region Class CanvasJSObject
    function CanvasJSObject(defaultsKey, options, theme) {
        this._defaultsKey = defaultsKey;

        var currentThemeOptions = {};

        if (theme && themes[theme] && themes[theme][defaultsKey])
            currentThemeOptions = themes[theme][defaultsKey];

        this._options = options ? options : {};
        this.setOptions(this._options, currentThemeOptions);
    }
    CanvasJSObject.prototype.setOptions = function (options, currentThemeOptions) {

        if (!defaultOptions[this._defaultsKey]) {
            if (isDebugMode && window.console)
                console.log("defaults not set");
        }
        else {
            var defaults = defaultOptions[this._defaultsKey];

            for (var prop in defaults) {
                if (options && prop in options)
                    this[prop] = options[prop];
                else if (currentThemeOptions && prop in currentThemeOptions)
                    this[prop] = currentThemeOptions[prop];
                else this[prop] = defaults[prop];

                //if (typeof this[prop] === "function") {
                //    alert("function");
                //    this[prop] = this[prop]();
                //}
            }
        }
    };

    // Update options. Returns true if changed or else false
    CanvasJSObject.prototype.updateOption = function (prop) {

        if (!defaultOptions[this._defaultsKey] && isDebugMode && window.console)
            console.log("defaults not set");

        var defaults = defaultOptions[this._defaultsKey];
        var theme = this._options.theme ? this._options.theme : (this.chart && this.chart._options.theme) ? this.chart._options.theme : "theme1";

        var currentThemeOptions = {};
        var newValue = this[prop];

        if (theme && themes[theme] && themes[theme][this._defaultsKey])
            currentThemeOptions = themes[theme][this._defaultsKey];

        if (prop in defaults) {
            if (prop in this._options)
                newValue = this._options[prop];
            else if (currentThemeOptions && prop in currentThemeOptions)
                newValue = currentThemeOptions[prop];
            else newValue = defaults[prop];
        }

        if (newValue === this[prop])
            return false;

        this[prop] = newValue;
        return true;
    }

    //Stores values in _oldOptions so that it can be tracked for any changes
    CanvasJSObject.prototype.trackChanges = function (option) {
        if (!this._options._oldOptions)
            this._options._oldOptions = {};

        this._options._oldOptions[option] = this._options[option];
    };

    CanvasJSObject.prototype.isBeingTracked = function (option) {
        if (!this._options._oldOptions)
            this._options._oldOptions = {};

        if (this._options._oldOptions[option])
            return true;
        else
            return false;
    };

    CanvasJSObject.prototype.hasOptionChanged = function (option) {
        if (!this._options._oldOptions)
            this._options._oldOptions = {};

        //if (!this._options._oldOptions[option])
        //    this._options._oldOptions[option] = null;

        var hasChanged = !(this._options._oldOptions[option] === this._options[option]);

        return hasChanged;
    };
    //#endregion Class CanvasJSObject

    //#region Class Chart
    function Chart(containerId, options) {
        options = options || {};

        Chart.parent.constructor.call(this, "Chart", options, options.theme ? options.theme : "theme1");

        var _this = this;


        this._containerId = containerId;
        this._objectsInitialized = false;
        this.ctx = null;
        this.overlaidCanvasCtx = null;
        this._indexLabels = [];
        this._panTimerId = 0;
        this._lastTouchEventType = "";
        this._lastTouchData = null;

        this.panEnabled = false;
        this._defaultCursor = "default";
        this.plotArea = { canvas: null, ctx: null, x1: 0, y1: 0, x2: 0, y2: 0, width: 0, height: 0 };
        this._dataInRenderedOrder = [];

        this._container = document.getElementById(this._containerId);

        if (!this._container) {
            if (window.console)
                window.console.log("CanvasJS Error: Chart Container with id \"" + this._containerId + "\" was not found");
            return;
        }

        this._container.innerHTML = "";

        var width = 0;
        var height = 0;

        if (this._options.width)
            width = this.width;
        else
            width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

        if (this._options.height)
            height = this.height;
        else
            height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

        this.width = width;
        this.height = height;

        this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];

        this._canvasJSContainer = document.createElement("div");
        this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container");

        this._canvasJSContainer.style.position = "relative";
        this._canvasJSContainer.style.textAlign = "left";
        this._canvasJSContainer.style.cursor = "auto";
        if (!isCanvasSupported) {
            this._canvasJSContainer.style.height = "0px";//In IE6 toolTip doesn't show at proper position if not set.
        }
        this._container.appendChild(this._canvasJSContainer);


        this.canvas = createCanvas(width, height);

        this.canvas.style.position = "absolute";
        if (this.canvas.getContext) {
            try {
                this.canvas.style.background = this.backgroundColor;
            } catch (e) { }
            this._canvasJSContainer.appendChild(this.canvas);
            this.ctx = this.canvas.getContext("2d");
            this.ctx.textBaseline = "top";
            extendCtx(this.ctx);
        } else
            return;

        //this.canvas.style.cursor = "pointer";

        if (!isCanvasSupported) {
            this.plotArea.canvas = createCanvas(width, height);
            this.plotArea.canvas.style.position = "absolute";
            this.plotArea.canvas.setAttribute("class", "plotAreaCanvas");
            this._canvasJSContainer.appendChild(this.plotArea.canvas);

            this.plotArea.ctx = this.plotArea.canvas.getContext("2d");
        } else {
            this.plotArea.ctx = this.ctx;
        }

        this.overlaidCanvas = createCanvas(width, height);
        this.overlaidCanvas.style.position = "absolute";
        this._canvasJSContainer.appendChild(this.overlaidCanvas);
        this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d");
        this.overlaidCanvasCtx.textBaseline = "top";

        this._eventManager = new EventManager(this);

        addEvent(window, "resize", function () {
            //this._container.addEventListener("DOMSubtreeModified", function () {

            if (_this._updateSize())
                _this.render();
        });


        this._toolBar = document.createElement("div");
        this._toolBar.setAttribute("class", "canvasjs-chart-toolbar");
        this._toolBar.style.position = "absolute";
        this._toolBar.style.top = "0px";
        this._toolBar.style.right = "0px";
        this._canvasJSContainer.appendChild(this._toolBar);
        this._toolBar.style.display = "none";


        this.bounds = { x1: 0, y1: 0, x2: this.width, y2: this.height };

        addEvent(this.overlaidCanvas, 'click', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mousemove', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mouseup', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mousedown', function (e) {
            _this._mouseEventHandler(e);
        });

        addEvent(this.overlaidCanvas, 'mouseout', function (e) {
            _this._mouseEventHandler(e);
        });


        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function (e) {
            _this._touchEventHandler(e);
        });

        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : 'touchmove', function (e) {
            _this._touchEventHandler(e);
        });

        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : 'touchend', function (e) {
            _this._touchEventHandler(e);
        });

        addEvent(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : 'touchcancel', function (e) {
            _this._touchEventHandler(e);
        });

        if (!this._creditLink) {
            this._creditLink = document.createElement("a");
            this._creditLink.setAttribute("class", "canvasjs-chart-credit");
            this._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:3px;top:" + (this.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:10px;font-family:Lucida Grande, Lucida Sans Unicode, Arial, sans-serif");

            this._creditLink.setAttribute("tabIndex", -1);

            this._creditLink.setAttribute("target", "_blank");
        }

        this._toolTip = new ToolTip(this, this._options.toolTip, this.theme);

        this.layoutManager = new LayoutManager(this);
        this.data = null;
        this.axisX = null;
        this.axisY = null;
        this.axisY2 = null;
        this.renderCount = 0;


        this.sessionVariables = {
            axisX: {
                internalMinimum: null,
                internalMaximum: null
            },
            axisY: {
                internalMinimum: null,
                internalMaximum: null
            },
            axisY2: {
                internalMinimum: null,
                internalMaximum: null
            }
        };
    }

    extend(Chart, CanvasJSObject);

    //Update Chart Properties
    Chart.prototype._updateOptions = function () {
        var _this = this;

        this.updateOption("width");
        this.updateOption("height");


        this.updateOption("theme");

        if (this.updateOption("colorSet"))
            this._selectedColorSet = typeof (colorSets[this.colorSet]) !== "undefined" ? colorSets[this.colorSet] : colorSets["colorSet1"];


        if (this.updateOption("backgroundColor")) {
            try {
                if (this.canvas.style.background !== this.backgroundColor)
                    this.canvas.style.background = this.backgroundColor;
            } catch (e) { }
        }


        this.updateOption("animationEnabled");

        //Need to check this._options.zoomEnabled because this.zoomEnabled is used internally to keep track of state - and hence changes.
        if (this._options.zoomEnabled) {

            if (!this._zoomButton) {

                this._zoomButton = document.createElement("button");
                this._zoomButton.className = "btn btn-default";
                this._zoomButton.appendChild(document.createTextNode("Pan"));
                this._toolBar.appendChild(this._zoomButton);
                addEvent(this._zoomButton, "click", function () {
                    if (_this.zoomEnabled) {
                        _this.zoomEnabled = false;
                        _this.panEnabled = true;

                        _this._zoomButton.innerHTML = _this._cultureInfo.zoomText;

                    } else {
                        _this.zoomEnabled = true;
                        _this.panEnabled = false;

                        _this._zoomButton.innerHTML = _this._cultureInfo.panText;
                    }

                    _this.render();
                });
            }


            if (!this._resetButton) {
                this._resetButton = document.createElement("button");
                this._resetButton.className = 'btn btn-default';
                this._resetButton.appendChild(document.createTextNode("Reset"));
                this._toolBar.appendChild(this._resetButton);

                addEvent(this._resetButton, "click", function () {

                    _this._toolTip.hide();

                    if (_this.zoomEnabled || _this.panEnabled) {
                        _this.zoomEnabled = true;
                        _this.panEnabled = false;
                        _this._zoomButton.innerHTML = _this._cultureInfo.panText;

                        _this._defaultCursor = "default";
                        _this.overlaidCanvas.style.cursor = _this._defaultCursor;
                    } else {
                        _this.zoomEnabled = false;
                        _this.panEnabled = false;
                    }

                    if (_this._options.axisX && _this._options.axisX.minimum)
                        _this.sessionVariables.axisX.internalMinimum = _this._options.axisX.minimum;
                    else
                        _this.sessionVariables.axisX.internalMinimum = null;

                    if (_this._options.axisX && _this._options.axisX.maximum)
                        _this.sessionVariables.axisX.internalMaximum = _this._options.axisX.maximum;
                    else
                        _this.sessionVariables.axisX.internalMaximum = null;

                    _this.resetOverlayedCanvas();

                    _this._toolBar.style.display = "none";

                    _this.render();
                });

                this.overlaidCanvas.style.cursor = _this._defaultCursor;
            }

            if (!this.zoomEnabled && !this.panEnabled) {
                if (!this._zoomButton) {
                    this.zoomEnabled = true;
                    this.panEnabled = false;
                } else {

                    if (_this._zoomButton.innerHTML === _this._cultureInfo.zoomText) {
                        this.panEnabled = true;
                        this.zoomEnabled = false;
                    }
                    else {
                        this.zoomEnabled = true;
                        this.panEnabled = false;
                    }

                    _this._toolBar.style.display = "inline";
                }
            }



        } else {
            this.zoomEnabled = false;
            this.panEnabled = false;
        }

        this.updateOption("culture");
        this._cultureInfo = new CultureInfo(this, this._options.culture);

        if (this._toolBar.style.display !== "none") {

            var zoomButtonText = this.panEnabled ? _this._cultureInfo.zoomText : _this._cultureInfo.panText;

            if (_this._zoomButton.innerHTML !== zoomButtonText)
                _this._zoomButton.innerHTML = zoomButtonText;

            if (_this._resetButton.innerHTML !== _this._cultureInfo.resetText)
                _this._resetButton.innerHTML = _this._cultureInfo.resetText;

        }

        var creditTextChanged = this.updateOption("creditText");
        var creditHrefChanged = this.updateOption("creditHref");

        if (this.renderCount === 0 || (creditTextChanged || creditHrefChanged)) {
            this._creditLink.setAttribute("href", this.creditHref);
            this._creditLink.innerHTML = this.creditText;
        }

        if (this.creditHref && this.creditText) {
            if (!this._creditLink.parentElement)
                this._canvasJSContainer.appendChild(this._creditLink);
        }
        else if (this._creditLink.parentElement)
            this._canvasJSContainer.removeChild(this._creditLink);

        if (this._options.toolTip && this._toolTip._options !== this._options.toolTip)
            this._toolTip._options = this._options.toolTip

        this._toolTip.updateOption("enabled");
        this._toolTip.updateOption("shared");
        this._toolTip.updateOption("animationEnabled");
        this._toolTip.updateOption("borderColor");
        this._toolTip.updateOption("content");

    }

    Chart.prototype._updateSize = function () {
        var width = 0;
        var height = 0;

        if (this._options.width)
            width = this.width;
        else
            this.width = width = this._container.clientWidth > 0 ? this._container.clientWidth : this.width;

        if (this._options.height)
            height = this.height;
        else
            this.height = height = this._container.clientHeight > 0 ? this._container.clientHeight : this.height;

        if (this.canvas.width !== width * devicePixelBackingStoreRatio || this.canvas.height !== height * devicePixelBackingStoreRatio) {
            setCanvasSize(this.canvas, width, height);

            setCanvasSize(this.overlaidCanvas, width, height);
            setCanvasSize(this._eventManager.ghostCanvas, width, height);

            return true;
        }

        return false;
    }

    // initialize chart objects
    Chart.prototype._initialize = function () {
        ///<signature>
        ///<summary>Initializes Chart objects/state. Creates DataSeries class instance for each DataSeries provided by ther user. Sets the Axis Type based on the user data</summary>
        ///</signature>
        //this.width = this.width;

        this.pieDoughnutClickHandler = null;
        //this._touchCurrentCoordinates = null;

        if (this.animationRequestId)
            this.cancelRequestAnimFrame.call(window, this.animationRequestId);

        this._updateOptions();

        this._updateSize();

        //this._selectedColorSet = colorSets["colorSet2"];

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();

        this.axisX = null;
        this.axisY = null;
        this.axisY2 = null;
        this._indexLabels = [];
        this._dataInRenderedOrder = [];

        this._events = [];
        if (this._eventManager)
            this._eventManager.reset();

        this.plotInfo = {
            axisPlacement: null,
            axisXValueType: null,
            plotTypes: []//array of plotType: {type:"", axisYType: "primary", dataSeriesIndexes:[]}
        };

        this.layoutManager.reset();


        this.data = [];
        var dataSeriesIndex = 0;

        for (var series = 0; series < this._options.data.length; series++) {
            //for (series in this._options.data) {

            dataSeriesIndex++;

            if (!(!this._options.data[series].type || Chart._supportedChartTypes.indexOf(this._options.data[series].type) >= 0))
                continue;

            var dataSeries = new DataSeries(this, this._options.data[series], this.theme, dataSeriesIndex - 1, ++this._eventManager.lastObjectId);
            if (dataSeries.name === null)
                dataSeries.name = "DataSeries " + (dataSeriesIndex);

            if (dataSeries.color === null) {
                if (this._options.data.length > 1) {
                    dataSeries._colorSet = [this._selectedColorSet[dataSeries.index % this._selectedColorSet.length]];
                    dataSeries.color = this._selectedColorSet[dataSeries.index % this._selectedColorSet.length];
                } else {
                    if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                        dataSeries._colorSet = [this._selectedColorSet[0]];
                    }
                    else
                        dataSeries._colorSet = this._selectedColorSet;
                }
            } else {
                dataSeries._colorSet = [dataSeries.color];
            }

            if (dataSeries.markerSize === null) {
                if (((dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline") && dataSeries.dataPoints && dataSeries.dataPoints.length < this.width / 16) || dataSeries.type === "scatter") {
                    //if (dataSeries.type === "line") {
                    dataSeries.markerSize = 8;
                }
            }

            if ((dataSeries.type === "bubble" || dataSeries.type === "scatter") && dataSeries.dataPoints) {
                dataSeries.dataPoints.sort(compareDataPointX)
            }

            //if (dataSeries.markerBorderThickness === null && dataSeries.type === "scatter") {
            //    dataSeries.markerBorderThickness = 2;
            //}

            //if (dataSeries.markerType === null) {
            //    if (dataSeries.type === "line" & dataSeries.dataPoints.length < 500) {
            //        dataSeries.markerType = "circle";
            //    }
            //}

            this.data.push(dataSeries);

            var seriesAxisPlacement = dataSeries.axisPlacement;

            //if (isDebugMode && window.console)
            //    window.console.log(dataSeries.type);

            var errorMessage;

            if (seriesAxisPlacement === "normal") {

                if (this.plotInfo.axisPlacement === "xySwapped") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
                } else if (this.plotInfo.axisPlacement === "none") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
                } else if (this.plotInfo.axisPlacement === null)
                    this.plotInfo.axisPlacement = "normal";
            }
            else if (seriesAxisPlacement === "xySwapped") {

                if (this.plotInfo.axisPlacement === "normal") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or pie chart";
                } else if (this.plotInfo.axisPlacement === "none") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with pie chart";
                } else if (this.plotInfo.axisPlacement === null)
                    this.plotInfo.axisPlacement = "xySwapped";
            }
            else if (seriesAxisPlacement == "none") {

                if (this.plotInfo.axisPlacement === "normal") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with line, area, column or bar chart";
                } else if (this.plotInfo.axisPlacement === "xySwapped") {
                    errorMessage = "You cannot combine \"" + dataSeries.type + "\" with bar chart";
                } else if (this.plotInfo.axisPlacement === null)
                    this.plotInfo.axisPlacement = "none";
            }

            if (errorMessage && window.console) {
                window.console.log(errorMessage);
                return;
            }
        }

        //if (isDebugMode && window.console) {
        //    window.console.log("xMin: " + this.plotInfo.viewPortXMin + "; xMax: " + this.plotInfo.viewPortXMax + "; yMin: " + this.plotInfo.yMin + "; yMax: " + this.plotInfo.yMax);
        //}

        this._objectsInitialized = true;
    }

    Chart._supportedChartTypes = ["line", "stepLine", "spline", "column", "area", "stepArea", "splineArea", "bar", "bubble", "scatter",
		"stackedColumn", "stackedColumn100", "stackedBar", "stackedBar100",
		"stackedArea", "stackedArea100",
		"pie", "doughnut"
    ];

    //indexOf is not supported in IE8-
    if (!Chart._supportedChartTypes.indexOf) {
        Chart._supportedChartTypes.indexOf = function (elt /*, from*/) {
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0)
				 ? Math.ceil(from)
				 : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++) {
                if (from in this &&
					this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    Chart.prototype.render = function (options) {
        //var dt = Date.now();
        if (options)
            this._options = options;

        //var fontHeight = getFontHeightInPixels("'Nato Sans'", 18, false);

        //console.log(fontHeight);

        this._initialize();

        //Create Primary and Secondary axis and assign them to the series
        for (var i = 0; i < this.data.length; i++) {

            if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
                if (!this.data[i].axisYType || this.data[i].axisYType === "primary") {
                    if (!this.axisY) {

                        if (this.plotInfo.axisPlacement === "normal") {
                            this.axisY = new Axis(this, this._options.axisY, "axisY", "left");
                        }
                        else if (this.plotInfo.axisPlacement === "xySwapped") {
                            this.axisY = new Axis(this, this._options.axisY, "axisY", "bottom");
                        }
                    }
                    this.data[i].axisY = this.axisY;
                }
                else if (this.data[i].axisYType === "secondary") {
                    if (!this.axisY2) {
                        if (this.plotInfo.axisPlacement === "normal") {
                            this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "right");
                        }
                        else if (this.plotInfo.axisPlacement === "xySwapped") {
                            this.axisY2 = new Axis(this, this._options.axisY2, "axisY", "top");
                        }
                    }
                    this.data[i].axisY = this.axisY2;
                }

                if (!this.axisX) {
                    if (this.plotInfo.axisPlacement === "normal") {
                        this.axisX = new Axis(this, this._options.axisX, "axisX", "bottom");
                    } else if (this.plotInfo.axisPlacement === "xySwapped") {
                        this.axisX = new Axis(this, this._options.axisX, "axisX", "left");
                    }
                }

                this.data[i].axisX = this.axisX;
            }
        }

        this._processData();// Categorises the dataSeries and calculates min, max and other values

        if (this._options.title) {
            this._title = new Title(this, this._options.title);
            this._title.render();
        }

        this.legend = new Legend(this, this._options.legend, this.theme);
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].showInLegend)
                this.legend.dataSeries.push(this.data[i]);
        }
        this.legend.render();

        //TBI: Revisit and check if the functionality is enough.
        if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
            var freeSpace = this.layoutManager.getFreeSpace();

            //window.alert(freeSpace.width + "; " + freeSpace.height);
            //window.alert(this.width + "; " + this.height);
            //window.alert(this._canvasJSContainer.clientWidth + "; " + this._canvasJSContainer.clientHeight);


            Axis.setLayoutAndRender(this.axisX, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
        } else if (this.plotInfo.axisPlacement === "none") {
            //In case of charts with axis this method is called inside setLayoutAndRender
            this.preparePlotArea();
        }
        else {
            return;
        }

        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];

            for (var j = 0; j < plotType.plotUnits.length; j++) {

                var plotUnit = plotType.plotUnits[j];

                if (plotUnit.type === "line")
                    this.renderLine(plotUnit);
                else if (plotUnit.type === "stepLine")
                    this.renderStepLine(plotUnit);
                else if (plotUnit.type === "spline")
                    this.renderSpline(plotUnit);
                else if (plotUnit.type === "column")
                    this.renderColumn(plotUnit);
                else if (plotUnit.type === "bar")
                    this.renderBar(plotUnit);
                else if (plotUnit.type === "area")
                    this.renderArea(plotUnit);
                else if (plotUnit.type === "stepArea")
                    this.renderStepArea(plotUnit);
                else if (plotUnit.type === "splineArea")
                    this.renderSplineArea(plotUnit);
                else if (plotUnit.type === "stackedColumn")
                    this.renderStackedColumn(plotUnit);
                else if (plotUnit.type === "stackedColumn100")
                    this.renderStackedColumn100(plotUnit);
                else if (plotUnit.type === "stackedBar")
                    this.renderStackedBar(plotUnit);
                else if (plotUnit.type === "stackedBar100")
                    this.renderStackedBar100(plotUnit);
                else if (plotUnit.type === "stackedArea")
                    this.renderStackedArea(plotUnit);
                else if (plotUnit.type === "stackedArea100")
                    this.renderStackedArea100(plotUnit);
                else if (plotUnit.type === "bubble")
                    this.renderBubble(plotUnit);
                else if (plotUnit.type === "scatter")
                    this.renderScatter(plotUnit);
                else if (plotUnit.type === "pie")
                    this.renderPie(plotUnit);
                else if (plotUnit.type === "doughnut")
                    this.renderPie(plotUnit);

                for (var k = 0; k < plotUnit.dataSeriesIndexes.length; k++) {
                    this._dataInRenderedOrder.push(this.data[plotUnit.dataSeriesIndexes[k]]);
                }
            }
        }

        if (this._indexLabels.length > 0)
            this.renderIndexLabels();

        this.attachPlotAreaEventHandlers();

        if (!this.zoomEnabled && !this.panEnabled && this._toolBar.style.display !== "none") {
            this._toolBar.style.display = "none";
        }

        this._toolTip._updateToolTip();

        this.renderCount++;

        //if (window.console) {
        //    window.console.log(new Date().getTime() - dt);
        //}

        if (isDebugMode) {

            var _this = this;
            setTimeout(function () {
                var ghostCanvasCopy = document.getElementById("ghostCanvasCopy");

                if (ghostCanvasCopy) {
                    //console.log(ghostCanvasCopy.clientWidth);
                    setCanvasSize(ghostCanvasCopy, _this.width, _this.height);
                    var ghostCanvasCopyCtx = ghostCanvasCopy.getContext("2d");

                    //ghostCanvasCopyCtx.scale(1, 1);
                    //var imageData = this._eventManager.ghostCtx.getImageData(0, 0, this._container.clientWidth, this._container.clientHeight);
                    //this._eventManager.ghostCtx.drawImage(this._eventManager.ghostCanvas, 0, 0);
                    //this.ctx.drawImage(this._eventManager.ghostCanvas, 0, 0);

                    ghostCanvasCopyCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
                    //_this._canvasJSContainer.appendChild(_this._eventManager.ghostCanvas);
                    //_this.overlaidCanvasCtx.drawImage(_this._eventManager.ghostCanvas, 0, 0);
                }
            }, 2000);
        }
    }

    Chart.prototype.attachPlotAreaEventHandlers = function () {

        //this._toolBar.style.display = "inline";

        this.attachEvent({
            context: this,
            chart: this,
            mousedown: this._plotAreaMouseDown,
            mouseup: this._plotAreaMouseUp,
            mousemove: this._plotAreaMouseMove,
            cursor: this.zoomEnabled ? "col-resize" : "move",
            cursor: this.panEnabled ? "move" : "default",
            capture: true,
            bounds: this.plotArea
        });

    }

    Chart.prototype.categoriseDataSeries = function () {
        var dataSeries = "";

        for (var i = 0; i < this.data.length; i++) {
            dataSeries = this.data[i]
            if (!dataSeries.dataPoints || dataSeries.dataPoints.length === 0 || !dataSeries.visible)
                continue;

            if (Chart._supportedChartTypes.indexOf(dataSeries.type) >= 0) {

                var plotType = null;
                var plotTypeExists = false;

                var plotUnit = null;
                var plotUnitExists = false;

                for (var j = 0; j < this.plotInfo.plotTypes.length; j++) {
                    if (this.plotInfo.plotTypes[j].type === dataSeries.type) {
                        plotTypeExists = true;
                        var plotType = this.plotInfo.plotTypes[j];
                        break;
                    }
                }

                if (!plotTypeExists) {
                    plotType = {
                        type: dataSeries.type,
                        totalDataSeries: 0,
                        plotUnits: []
                    };
                    this.plotInfo.plotTypes.push(plotType)
                }

                for (var j = 0; j < plotType.plotUnits.length; j++) {
                    if (plotType.plotUnits[j].axisYType === dataSeries.axisYType) {
                        plotUnitExists = true;
                        var plotUnit = plotType.plotUnits[j];
                        break;
                    }
                }

                if (!plotUnitExists) {
                    plotUnit = {
                        type: dataSeries.type,
                        previousDataSeriesCount: 0, //to be set next
                        index: plotType.plotUnits.length,
                        plotType: plotType,
                        axisYType: dataSeries.axisYType,
                        axisY: dataSeries.axisYType === "primary" ? this.axisY : this.axisY2,
                        axisX: this.axisX,
                        dataSeriesIndexes: [] //index of dataSeries
                    }
                    plotType.plotUnits.push(plotUnit);
                }

                plotType.totalDataSeries++;

                plotUnit.dataSeriesIndexes.push(i);
            }
        }

        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];
            var previousDataSeriesCount = 0;

            for (var j = 0; j < plotType.plotUnits.length; j++) {

                plotType.plotUnits[j].previousDataSeriesCount = previousDataSeriesCount;

                previousDataSeriesCount += plotType.plotUnits[j].dataSeriesIndexes.length;
            }
        }
    }

    Chart.prototype.assignIdToDataPoints = function () {

        for (var i = 0; i < this.data.length; i++) {
            var dataSeries = this.data[i];

            if (!dataSeries.dataPoints)
                continue;

            var length = dataSeries.dataPoints.length;

            for (var j = 0; j < length; j++) {
                dataSeries.dataPointIds[j] = ++this._eventManager.lastObjectId;
            }
        }
    }

    Chart.prototype._processData = function () {
        this.assignIdToDataPoints();
        this.categoriseDataSeries();

        for (var i = 0; i < this.plotInfo.plotTypes.length; i++) {
            var plotType = this.plotInfo.plotTypes[i];

            for (var j = 0; j < plotType.plotUnits.length; j++) {

                var plotUnit = plotType.plotUnits[j];

                if (plotUnit.type === "line" || plotUnit.type === "stepLine" || plotUnit.type === "spline" || plotUnit.type === "column" || plotUnit.type === "area" || plotUnit.type === "stepArea" || plotUnit.type === "splineArea" || plotUnit.type === "bar" || plotUnit.type === "bubble" || plotUnit.type === "scatter")
                    this._processMultiseriesPlotUnit(plotUnit);
                else if (plotUnit.type === "stackedColumn" || plotUnit.type === "stackedBar" || plotUnit.type === "stackedArea")
                    this._processStackedPlotUnit(plotUnit);
                else if (plotUnit.type === "stackedColumn100" || plotUnit.type === "stackedBar100" || plotUnit.type === "stackedArea100")
                    this._processStacked100PlotUnit(plotUnit);
            }
        }

    }

    Chart.prototype._processMultiseriesPlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;
        var dataPointX, dataPointY;
        var isDateTime = false;


        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;


                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (dataPointY < axisYDataInfo.min)
                    axisYDataInfo.min = dataPointY;

                if (dataPointY > axisYDataInfo.max)
                    axisYDataInfo.max = dataPointY;


                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }

                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;


                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                if (dataPointY < axisYDataInfo.viewPortMin)
                    axisYDataInfo.viewPortMin = dataPointY;
                if (dataPointY > axisYDataInfo.viewPortMax)
                    axisYDataInfo.viewPortMax = dataPointY;
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }

        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });
    }

    Chart.prototype._processStackedPlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;

        var dataPointX, dataPointY;
        var isDateTime = false;

        var dataPointYPositiveSums = [];
        var dataPointYNegativeSums = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                // Requird when no x values are provided 
                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;



                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }


                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                if (dataPointY >= 0) {
                    if (dataPointYPositiveSums[dataPointX])
                        dataPointYPositiveSums[dataPointX] += dataPointY;
                    else
                        dataPointYPositiveSums[dataPointX] = dataPointY;
                } else {
                    if (dataPointYNegativeSums[dataPointX])
                        dataPointYNegativeSums[dataPointX] += dataPointY;
                    else
                        dataPointYNegativeSums[dataPointX] = dataPointY;
                }
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }

        for (i in dataPointYPositiveSums) {

            if (isNaN(i)) {
                continue;
            }
            var ySum = dataPointYPositiveSums[i];

            if (ySum < axisYDataInfo.min)
                axisYDataInfo.min = ySum;

            if (ySum > axisYDataInfo.max)
                axisYDataInfo.max = ySum;

            if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
                continue;

            if (ySum < axisYDataInfo.viewPortMin)
                axisYDataInfo.viewPortMin = ySum;
            if (ySum > axisYDataInfo.viewPortMax)
                axisYDataInfo.viewPortMax = ySum;
        }

        for (i in dataPointYNegativeSums) {

            if (isNaN(i)) {
                continue;
            }

            var ySum = dataPointYNegativeSums[i];

            if (ySum < axisYDataInfo.min)
                axisYDataInfo.min = ySum;

            if (ySum > axisYDataInfo.max)
                axisYDataInfo.max = ySum;

            if (i < axisXDataInfo.viewPortMin || i > axisXDataInfo.viewPortMax)
                continue;

            if (ySum < axisYDataInfo.viewPortMin)
                axisYDataInfo.viewPortMin = ySum;
            if (ySum > axisYDataInfo.viewPortMax)
                axisYDataInfo.viewPortMax = ySum;
        }


        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

        //window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
    }

    Chart.prototype._processStacked100PlotUnit = function (plotUnit) {
        if (!plotUnit.dataSeriesIndexes || plotUnit.dataSeriesIndexes.length < 1)
            return;

        var axisYDataInfo = plotUnit.axisY.dataInfo;
        var axisXDataInfo = plotUnit.axisX.dataInfo;

        var dataPointX, dataPointY;
        var isDateTime = false;
        var containsPositiveY = false;
        var containsNegativeY = false;

        var dataPointYSums = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {
            var dataSeries = this.data[plotUnit.dataSeriesIndexes[j]];
            var i = 0;
            var isFirstDPInViewPort = false;
            var isLastDPInViewPort = false;

            if (dataSeries.axisPlacement === "normal" || dataSeries.axisPlacement === "xySwapped") {

                var plotAreaXMin = this.sessionVariables.axisX.internalMinimum ? this.sessionVariables.axisX.internalMinimum : (this._options.axisX && this._options.axisX.minimum) ? this._options.axisX.minimum : -Infinity;
                var plotAreaXMax = this.sessionVariables.axisX.internalMaximum ? this.sessionVariables.axisX.internalMaximum : (this._options.axisX && this._options.axisX.maximum) ? this._options.axisX.maximum : Infinity;
            }


            if (dataSeries.dataPoints[i].x && dataSeries.dataPoints[i].x.getTime || dataSeries.xValueType === "dateTime") {
                isDateTime = true;
            }

            for (i = 0; i < dataSeries.dataPoints.length; i++) {

                // Requird when no x values are provided 
                if (typeof dataSeries.dataPoints[i].x === "undefined") {
                    dataSeries.dataPoints[i].x = i;
                }

                if (dataSeries.dataPoints[i].x.getTime) {
                    isDateTime = true;
                    dataPointX = dataSeries.dataPoints[i].x.getTime();//dataPointX is used so that getTime is called only once in case of dateTime values
                }
                else
                    dataPointX = dataSeries.dataPoints[i].x;

                dataPointY = dataSeries.dataPoints[i].y;



                if (dataPointX < axisXDataInfo.min)
                    axisXDataInfo.min = dataPointX;
                if (dataPointX > axisXDataInfo.max)
                    axisXDataInfo.max = dataPointX;

                if (i > 0) {
                    var xDiff = dataPointX - dataSeries.dataPoints[i - 1].x;
                    xDiff < 0 && (xDiff = xDiff * -1); //If Condition shortcut

                    if (axisXDataInfo.minDiff > xDiff && xDiff !== 0) {
                        axisXDataInfo.minDiff = xDiff;
                    }
                }

                // This section makes sure that partially visible dataPoints are included in the begining
                if (dataPointX < plotAreaXMin && !isFirstDPInViewPort) {
                    continue;
                } else if (!isFirstDPInViewPort) {
                    isFirstDPInViewPort = true;

                    if (i > 0) {
                        i -= 2;
                        continue;
                    }
                }

                // This section makes sure that partially visible dataPoints are included at the end
                if (dataPointX > plotAreaXMax && !isLastDPInViewPort) {
                    isLastDPInViewPort = true;
                } else if (dataPointX > plotAreaXMax && isLastDPInViewPort) {
                    continue;
                }

                if (dataSeries.dataPoints[i].label)
                    plotUnit.axisX.labels[dataPointX] = dataSeries.dataPoints[i].label;

                if (dataPointX < axisXDataInfo.viewPortMin)
                    axisXDataInfo.viewPortMin = dataPointX;
                if (dataPointX > axisXDataInfo.viewPortMax)
                    axisXDataInfo.viewPortMax = dataPointX;

                if (dataPointY === null)
                    continue;

                if (dataPointY >= 0) {
                    containsPositiveY = true;
                } else {
                    containsNegativeY = true;
                }

                if (dataPointYSums[dataPointX])
                    dataPointYSums[dataPointX] += Math.abs(dataPointY);
                else
                    dataPointYSums[dataPointX] = Math.abs(dataPointY);
            }

            this.plotInfo.axisXValueType = dataSeries.xValueType = isDateTime ? "dateTime" : "number";
        }


        if (containsPositiveY && !containsNegativeY) {
            axisYDataInfo.max = 99;
            axisYDataInfo.min = 1;
        } else if (containsPositiveY && containsNegativeY) {
            axisYDataInfo.max = 99;
            axisYDataInfo.min = -99;
        } else if (!containsPositiveY && containsNegativeY) {
            axisYDataInfo.max = -1;
            axisYDataInfo.min = -99;
        }

        axisYDataInfo.viewPortMin = axisYDataInfo.min;
        axisYDataInfo.viewPortMax = axisYDataInfo.max;

        plotUnit.dataPointYSums = dataPointYSums;

        //this.dataPoints.sort(compareDataPointX);
        //this.dataPoints.sort(function (dataPoint1, dataPoint2) { return dataPoint1.x - dataPoint2.x; });

        //window.console.log("viewPortYMin: " + plotInfo.viewPortYMin + "; viewPortYMax: " + plotInfo.viewPortYMax);
    }

    //getClosest returns objects nearby and hence shouldn't be used for events like click, mouseover, mousemove, etc which require object that is exactly under the mouse.
    Chart.prototype.getDataPointAtXY = function (mouseX, mouseY, getClosest) {

        getClosest = getClosest || false;
        var results = [];

        for (var i = this._dataInRenderedOrder.length - 1; i >= 0; i--) {
            var dataSeries = this._dataInRenderedOrder[i];

            var result = null;

            result = dataSeries.getDataPointAtXY(mouseX, mouseY, getClosest);
            if (result)
                results.push(result);
        }

        var closestResult = null;
        var onlyLineAreaTypes = false;

        for (var m = 0; m < results.length; m++) {

            if (results[m].dataSeries.type === "line" || results[m].dataSeries.type === "stepLine" || results[m].dataSeries.type === "area" || results[m].dataSeries.type === "stepArea") {
                var markerSize = getProperty("markerSize", results[m].dataPoint, results[m].dataSeries) || 8;
                if (results[m].distance <= markerSize / 2) {
                    onlyLineAreaTypes = true;
                    break;
                }
            }
        }

        for (m = 0; m < results.length; m++) {

            if (onlyLineAreaTypes && results[m].dataSeries.type !== "line" && results[m].dataSeries.type !== "stepLine" && results[m].dataSeries.type !== "area" && results[m].dataSeries.type !== "stepArea")
                continue;

            if (!closestResult) {
                closestResult = results[m];
            } else if (results[m].distance <= closestResult.distance) {
                closestResult = results[m];
            }
        }

        return closestResult;
    }

    Chart.prototype.getObjectAtXY = function (mouseX, mouseY, getClosest) {
        getClosest = getClosest || false;

        var id = null;

        var dataPointInfo = this.getDataPointAtXY(mouseX, mouseY, getClosest);

        if (dataPointInfo) {
            id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
        } else if (isCanvasSupported) {//IE9+
            id = getObjectId(mouseX, mouseY, this._eventManager.ghostCtx);
        }
        else {
            for (var i = 0; i < this.legend.items.length; i++) {
                var item = this.legend.items[i];

                if (mouseX >= item.x1 && mouseX <= item.x2 && mouseY >= item.y1 && mouseY <= item.y2) {
                    id = item.id;
                }
            }
        }

        return id;
    }

    /// <summary>Calculates Font Size based on standardSize and Chart Size</summary>
    /// <param name="standardSize" type="Number">Standard font size for a Chart with min(width,height) = 400px</param>
    /// <returns type="Number">The area.</returns>	
    Chart.prototype.getAutoFontSize = function (standardSize, width, height) {

        width = width || this.width;
        height = height || this.height;

        var fontSizeScaleFactor = standardSize / 400;

        return Math.round(Math.min(this.width, this.height) * fontSizeScaleFactor);
    }

    //#region Events

    Chart.prototype.resetOverlayedCanvas = function () {
        //var width = this.overlaidCanvas.width;
        //this.overlaidCanvas.width = 0;
        //this.overlaidCanvas.width = width;
        this.overlaidCanvasCtx.clearRect(0, 0, this.width, this.height);
    }

    Chart.prototype.attachEvent = function (param) {
        this._events.push(param);
    }

    Chart.prototype._touchEventHandler = function (ev) {
        if (!ev.changedTouches || !this.interactivityEnabled)
            return;

        var mouseEvents = [];
        var touches = ev.changedTouches;
        var first = touches ? touches[0] : ev;
        var touchCurrentCoordinates = null;

        //window.console.log(touches.length);

        switch (ev.type) {
            case "touchstart": case "MSPointerDown":
                mouseEvents = ["mousemove", "mousedown"];
                this._lastTouchData = getMouseCoordinates(first);
                this._lastTouchData.time = new Date();
                break;
            case "touchmove": case "MSPointerMove": mouseEvents = ["mousemove"]; break;
            case "touchend": case "MSPointerUp": mouseEvents = (this._lastTouchEventType === "touchstart" || this._lastTouchEventType === "MSPointerDown") ? ["mouseup", "click"] : ["mouseup"];
                break;
            default: return;
        }

        if (touches && touches.length > 1) return;


        touchCurrentCoordinates = getMouseCoordinates(first);
        touchCurrentCoordinates.time = new Date();
        try {
            var dy = touchCurrentCoordinates.y - this._lastTouchData.y;
            var dx = touchCurrentCoordinates.x - this._lastTouchData.x;
            var dt = touchCurrentCoordinates.time - this._lastTouchData.time;

            if (Math.abs(dy) > 15 && (!!this._lastTouchData.scroll || dt < 200)) {
                //this._lastTouchData.y = touchCurrentCoordinates.y;
                this._lastTouchData.scroll = true;

                var win = window.parent || window;
                if (win && win.scrollBy)
                    win.scrollBy(0, -dy);
            }
        } catch (e) { };

        this._lastTouchEventType = ev.type;

        if (!!this._lastTouchData.scroll && this.zoomEnabled) {
            if (this.isDrag)
                this.resetOverlayedCanvas();

            this.isDrag = false;
            return;
        }

        for (var i = 0; i < mouseEvents.length; i++) {

            var type = mouseEvents[i];
            var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent(type, true, true, window, 1,
									  first.screenX, first.screenY,
									  first.clientX, first.clientY, false,
									  false, false, false, 0, null);

            first.target.dispatchEvent(simulatedEvent);

            if (ev.preventManipulation) {
                //alert("preventManipulation");
                ev.preventManipulation();
            }

            if (ev.preventDefault) {
                //alert("preventDefault");
                ev.preventDefault();
            }
        }
    }

    Chart.prototype._mouseEventHandler = function (ev) {

        if (!this.interactivityEnabled)
            return;

        // stop panning and zooming so we can draw
        if (ev.preventManipulation) {
            //alert("preventManipulation");
            ev.preventManipulation();
        }

        // we are handling this event
        if (ev.preventDefault) {
            //alert("preventDefault");
            ev.preventDefault();
        }

        //IE8- uses srcElement instead of target. So instead of checking this condition everytime, its better to create a reference called target.
        if (typeof (ev.target) === "undefined" && ev.srcElement)
            ev.target = ev.srcElement;

        //console.log(ev.type);

        var xy = getMouseCoordinates(ev);
        var type = ev.type;
        var eventParam;
        var rightclick;

        if (!ev) var e = window.event;
        if (ev.which) rightclick = (ev.which == 3);
        else if (ev.button) rightclick = (ev.button == 2);

        //window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);

        //if (type === "mouseout") {
        //    this._toolTip.hide();
        //}

        if (isDebugMode && window.console) {
            window.console.log(type + " --> x: " + xy.x + "; y:" + xy.y);
            if (rightclick)
                window.console.log(ev.which);

            if (type === "mouseup")
                window.console.log("mouseup");
        }

        if (rightclick)
            return;

        //if (this.plotInfo.axisPlacement === "xySwapped") {
        //    //var temp = xy.x;
        //    //xy.x = xy.y;
        //    //xy.y = temp;
        //    xy = {x: xy.y, y: xy.x};
        //}

        if (Chart.capturedEventParam) {
            eventParam = Chart.capturedEventParam;

            if (type === "mouseup") {
                Chart.capturedEventParam = null;

                if (eventParam.chart.overlaidCanvas.releaseCapture)
                    eventParam.chart.overlaidCanvas.releaseCapture();
                else
                    document.body.removeEventListener("mouseup", eventParam.chart._mouseEventHandler, false);

            }

            if (eventParam.hasOwnProperty(type))
                eventParam[type].call(eventParam.context, xy.x, xy.y);



        }
        else if (this._events) {

            for (var i = 0; i < this._events.length; i++) {
                if (!this._events[i].hasOwnProperty(type))
                    continue;

                eventParam = this._events[i];
                var bounds = eventParam.bounds;

                if (xy.x >= bounds.x1 && xy.x <= bounds.x2 && xy.y >= bounds.y1 && xy.y <= bounds.y2) {
                    eventParam[type].call(eventParam.context, xy.x, xy.y);

                    if (type === "mousedown" && eventParam.capture === true) {
                        Chart.capturedEventParam = eventParam;

                        if (this.overlaidCanvas.setCapture)
                            this.overlaidCanvas.setCapture();
                        else {
                            document.body.addEventListener("mouseup", this._mouseEventHandler, false);
                            //addEvent(document.body, "mouseup", this._mouseEventHandler);
                        }
                    } else if (type === "mouseup") {
                        if (eventParam.chart.overlaidCanvas.releaseCapture)
                            eventParam.chart.overlaidCanvas.releaseCapture();
                        else
                            document.body.removeEventListener("mouseup", this._mouseEventHandler, false);
                    }

                    break;
                }
                else
                    eventParam = null;
            }

            if (eventParam && eventParam.cursor) {
                ev.target.style.cursor = eventParam.cursor;
            }
            else
                ev.target.style.cursor = this._defaultCursor;

            //eventParam = 
        }

        if (this._toolTip && this._toolTip.enabled) {

            var plotArea = this.plotArea;

            if (xy.x < plotArea.x1 || xy.x > plotArea.x2 || xy.y < plotArea.y1 || xy.y > plotArea.y2)
                this._toolTip.hide();
        }


        if ((!this.isDrag || !this.zoomEnabled) && this._eventManager) {
            this._eventManager.mouseEventHandler(ev);
            //this._updateToolTip(ev.x, ev.y);            
        }

        //if (this._toolTip.enabled)
        //    this._toolTip.mouseMoveHandler(ev.x, ev.y);
    }

    Chart.prototype._plotAreaMouseDown = function (x, y) {
        this.isDrag = true;

        if (this.plotInfo.axisPlacement !== "none") {
            this.dragStartPoint = { x: x, y: y, xMinimum: this.axisX.minimum, xMaximum: this.axisX.maximum };
        } else {
            this.dragStartPoint = { x: x, y: y };
        }

    }

    Chart.prototype._plotAreaMouseUp = function (x, y) {

        if (this.plotInfo.axisPlacement === "normal" || this.plotInfo.axisPlacement === "xySwapped") {
            if (this.isDrag) {

                var dragDelta = 0;
                var dragValue = 0;
                var axisXProps = this.axisX.lineCoordinates;

                if (this.plotInfo.axisPlacement === "xySwapped") {
                    dragDelta = y - this.dragStartPoint.y;
                    dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
                }
                else {
                    dragDelta = this.dragStartPoint.x - x;
                    dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
                }

                if (Math.abs(dragDelta) > 2) {
                    if (this.panEnabled) {

                        var reRender = false;
                        var overFlow = 0;

                        //If the user has panned beyond the minimum/maximum value of axisX, then take it back to minimum/maximum.
                        if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum) {

                            overFlow = this.axisX._absoluteMinimum - this.axisX.sessionVariables.internalMinimum;

                            this.axisX.sessionVariables.internalMinimum += overFlow;
                            this.axisX.sessionVariables.internalMaximum += overFlow;
                            reRender = true;
                        } else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum) {

                            overFlow = this.axisX.sessionVariables.internalMaximum - this.axisX._absoluteMaximum;
                            this.axisX.sessionVariables.internalMaximum -= overFlow;
                            this.axisX.sessionVariables.internalMinimum -= overFlow;

                            reRender = true;
                        }
                        //}


                        //this.overlaidCanvas.style.cursor = this._defaultCursor;


                        if (reRender)
                            this.render();

                    } else if (this.zoomEnabled) {

                        this.resetOverlayedCanvas();

                        //alert("mouse UP");
                        if (!this.dragStartPoint)
                            return;

                        if (this.plotInfo.axisPlacement === "xySwapped") {
                            //In Pixels
                            var selectedRegion = { y1: Math.min(this.dragStartPoint.y, y), y2: Math.max(this.dragStartPoint.y, y) };

                            if (Math.abs(selectedRegion.y1 - selectedRegion.y2) > 1) {
                                var axisXProps = this.axisX.lineCoordinates;

                                var minX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y2 - axisXProps.y1);
                                var maxX = this.axisX.maximum - (this.axisX.maximum - this.axisX.minimum) / axisXProps.height * (selectedRegion.y1 - axisXProps.y1);

                                minX = Math.max(minX, this.axisX.dataInfo.min);
                                maxX = Math.min(maxX, this.axisX.dataInfo.max);

                                if (Math.abs((maxX - minX) / this.axisX.dataInfo.minDiff) >= 4 / 500 * this.height) {

                                    this.axisX.sessionVariables.internalMinimum = minX;
                                    this.axisX.sessionVariables.internalMaximum = maxX;

                                    this.render();
                                }
                            }
                        } else if (this.plotInfo.axisPlacement === "normal") {
                            var selectedRegion = { x1: Math.min(this.dragStartPoint.x, x), x2: Math.max(this.dragStartPoint.x, x) };

                            if (Math.abs(selectedRegion.x1 - selectedRegion.x2) > 1) {
                                var axisXProps = this.axisX.lineCoordinates;

                                var minX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x1 - axisXProps.x1) + this.axisX.minimum;
                                var maxX = (this.axisX.maximum - this.axisX.minimum) / axisXProps.width * (selectedRegion.x2 - axisXProps.x1) + this.axisX.minimum;

                                minX = Math.max(minX, this.axisX.dataInfo.min);
                                maxX = Math.min(maxX, this.axisX.dataInfo.max);

                                if (Math.abs((maxX - minX) / this.axisX.dataInfo.minDiff) >= 5 / 500 * this.width) {

                                    this.axisX.sessionVariables.internalMinimum = minX;
                                    this.axisX.sessionVariables.internalMaximum = maxX;

                                    this.render();
                                }
                            }
                        }
                    }

                    if (this.zoomEnabled && this._toolBar.style.display === "none") {
                        this._toolBar.style.display = "inline";
                        this._zoomButton.innerHTML = this._cultureInfo.panText;
                        this._resetButton.innerHTML = this._cultureInfo.resetText;
                    }
                }
            }

        }

        this.isDrag = false;

        //this.dragStartPoint = null;
    }

    Chart.prototype._plotAreaMouseMove = function (x, y) {
        if (this.isDrag && this.plotInfo.axisPlacement !== "none") {

            var dragDelta = 0;
            var dragValue = 0;
            var axisXProps = this.axisX.lineCoordinates;

            if (this.plotInfo.axisPlacement === "xySwapped") {
                dragDelta = y - this.dragStartPoint.y;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.height * dragDelta;
            }
            else {
                dragDelta = this.dragStartPoint.x - x;
                dragValue = Math.abs(this.axisX.maximum - this.axisX.minimum) / axisXProps.width * dragDelta;
            }

            if (Math.abs(dragDelta) > 2 && Math.abs(dragDelta) < 8 && (this.panEnabled || this.zoomEnabled)) {
                this._toolTip.hide();
            } else if (this._toolTip.enabled && !this.panEnabled && !this.zoomEnabled) {
                this._toolTip.mouseMoveHandler(x, y);
            }

            if (Math.abs(dragDelta) > 2 && (this.panEnabled || this.zoomEnabled)) {
                if (this.panEnabled) {

                    this.axisX.sessionVariables.internalMinimum = this.dragStartPoint.xMinimum + dragValue;
                    this.axisX.sessionVariables.internalMaximum = this.dragStartPoint.xMaximum + dragValue;

                    var overFlow = 0;

                    // This is to stop the user from dragging chart beyond some limit (this.axisX._absoluteMinimum - this.axisX.interval)
                    if (this.axisX.sessionVariables.internalMinimum < this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)) {

                        overFlow = (this.axisX._absoluteMinimum - convertToNumber(this.axisX.interval, this.axisX.intervalType)) - this.axisX.sessionVariables.internalMinimum;
                        this.axisX.sessionVariables.internalMinimum += overFlow;
                        this.axisX.sessionVariables.internalMaximum += overFlow;
                    } else if (this.axisX.sessionVariables.internalMaximum > this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType)) {
                        overFlow = this.axisX.sessionVariables.internalMaximum - (this.axisX._absoluteMaximum + convertToNumber(this.axisX.interval, this.axisX.intervalType));
                        this.axisX.sessionVariables.internalMaximum -= overFlow;
                        this.axisX.sessionVariables.internalMinimum -= overFlow;
                    }

                    //this.dragStartPoint.x = x;

                    //this.render();
                    var _this = this;

                    clearTimeout(this._panTimerId);
                    this._panTimerId = setTimeout(function () {
                        _this.render();
                    }, 0);

                } else if (this.zoomEnabled) {
                    var plotAreaBounds = this.plotArea;

                    this.resetOverlayedCanvas();

                    var alpha = this.overlaidCanvasCtx.globalAlpha;

                    this.overlaidCanvasCtx.globalAlpha = .7;
                    this.overlaidCanvasCtx.fillStyle = "#A0ABB8";

                    if (this.plotInfo.axisPlacement === "xySwapped") {
                        this.overlaidCanvasCtx.fillRect(plotAreaBounds.x1, this.dragStartPoint.y, plotAreaBounds.x2 - plotAreaBounds.x1, y - this.dragStartPoint.y);
                    }
                    else if (this.plotInfo.axisPlacement === "normal") {
                        this.overlaidCanvasCtx.fillRect(this.dragStartPoint.x, plotAreaBounds.y1, x - this.dragStartPoint.x, plotAreaBounds.y2 - plotAreaBounds.y1);
                    }

                    this.overlaidCanvasCtx.globalAlpha = alpha;
                }
            }

            //if (dragDelta > 5) {
            //    this._toolTip.hide();
            //    return;
            //} else if (this._toolTip.enabled)
            //    this._toolTip.mouseMoveHandler(x, y);

        } else if (this._toolTip.enabled)
            this._toolTip.mouseMoveHandler(x, y);
    }

    //#endregion Events

    Chart.prototype.preparePlotArea = function () {

        var plotArea = this.plotArea;

        var yAxis = this.axisY ? this.axisY : this.axisY2;

        if (!isCanvasSupported && (plotArea.x1 > 0 || plotArea.y1 > 0)) {
            plotArea.ctx.translate(plotArea.x1, plotArea.y1);
        }

        if (this.axisX && yAxis) {
            plotArea.x1 = this.axisX.lineCoordinates.x1 < this.axisX.lineCoordinates.x2 ? this.axisX.lineCoordinates.x1 : yAxis.lineCoordinates.x1;
            plotArea.y1 = (this.axisX.lineCoordinates.y1 < yAxis.lineCoordinates.y1 ? this.axisX.lineCoordinates.y1 : yAxis.lineCoordinates.y1);

            plotArea.x2 = (this.axisX.lineCoordinates.x2 > yAxis.lineCoordinates.x2 ? this.axisX.lineCoordinates.x2 : yAxis.lineCoordinates.x2);
            plotArea.y2 = this.axisX.lineCoordinates.y2 > this.axisX.lineCoordinates.y1 ? this.axisX.lineCoordinates.y2 : yAxis.lineCoordinates.y2;

            plotArea.width = plotArea.x2 - plotArea.x1;
            plotArea.height = plotArea.y2 - plotArea.y1;
            //plotArea = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
        } else {
            //ToDo: @sunil
            var freeSpace = this.layoutManager.getFreeSpace();
            plotArea.x1 = freeSpace.x1;
            plotArea.x2 = freeSpace.x2;
            plotArea.y1 = freeSpace.y1;
            plotArea.y2 = freeSpace.y2;

            plotArea.width = freeSpace.width;
            plotArea.height = freeSpace.height;
        }

        if (!isCanvasSupported) {

            plotArea.canvas.width = plotArea.width;
            plotArea.canvas.height = plotArea.height;

            plotArea.canvas.style.left = plotArea.x1 + "px";
            plotArea.canvas.style.top = plotArea.y1 + "px";

            if (plotArea.x1 > 0 || plotArea.y1 > 0) {
                plotArea.ctx.translate(-plotArea.x1, -plotArea.y1);
            }
        }
    }

    Chart.prototype.getPixelCoordinatesOnPlotArea = function (x, y) {
        return { x: this.axisX.getPixelCoordinatesOnAxis(x).x, y: this.axisY.getPixelCoordinatesOnAxis(y).y }
        //return { x: 5, y: 10 };
    }

    //#region Render Methods

    Chart.prototype.renderIndexLabels = function () {
        var ctx = this.plotArea.ctx;

        ctx.textBaseline = "middle";
        var plotArea = this.plotArea;

        for (var i = 0; i < this._indexLabels.length; i++) {

            var indexLabel = this._indexLabels[i];

            var x, y, angle;

            ctx.fillStyle = getProperty("indexLabelFontColor", indexLabel.dataPoint, indexLabel.dataSeries);
            ctx.font = getFontString("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries);
            var indexLabelText = this.replaceKeywordsWithValue(getProperty("indexLabel", indexLabel.dataPoint, indexLabel.dataSeries), indexLabel.dataPoint, indexLabel.dataSeries);
            var textSize = { width: ctx.measureText(indexLabelText).width, height: getProperty("indexLabelFontSize", indexLabel.dataPoint, indexLabel.dataSeries) };
            var placement = getProperty("indexLabelPlacement", indexLabel.dataPoint, indexLabel.dataSeries);
            var orientation = getProperty("indexLabelOrientation", indexLabel.dataPoint, indexLabel.dataSeries);
            var angle = 0;

            var yMinLimit = 0;
            var yMaxLimit = 0;
            var xMinLimit = 0;
            var xMaxLimit = 0;

            //So that indexLabel is skipped once the point is outside of plotArea
            if (indexLabel.point.x < plotArea.x1 || indexLabel.point.x > plotArea.x2 || indexLabel.point.y < plotArea.y1 || indexLabel.point.y > plotArea.y2)
                continue;

            if (indexLabel.chartType === "column" || indexLabel.chartType === "stackedColumn" || indexLabel.chartType === "stackedColumn100"
				|| indexLabel.chartType === "bar" || indexLabel.chartType === "stackedBar" || indexLabel.chartType === "stackedBar100") {

                var width = Math.abs(indexLabel.bounds.x1, indexLabel.bounds.x2)
                var height = Math.abs(indexLabel.bounds.y1, indexLabel.bounds.y2)

                if (this.plotInfo.axisPlacement === "normal") {

                    if (placement === "outside") {

                        yMinLimit = plotArea.y1;
                        yMaxLimit = plotArea.y2;

                    } else if (placement === "inside") {

                        yMinLimit = indexLabel.bounds.y1;
                        yMaxLimit = indexLabel.bounds.y2;

                    }

                    if (orientation === "horizontal") {
                        x = indexLabel.point.x - textSize.width / 2;

                        if (indexLabel.dataPoint.y >= 0)
                            y = Math.min((Math.max(indexLabel.point.y - textSize.height / 2 - 5, yMinLimit + textSize.height / 2 + 5)), yMaxLimit - textSize.height / 2 - 5);
                        else
                            y = Math.max((Math.min(indexLabel.point.y + textSize.height / 2 + 5, yMaxLimit - textSize.height / 2)), yMinLimit + textSize.height / 2 + 5);
                    }
                    else if (orientation === "vertical") {
                        x = indexLabel.point.x;
                        if (indexLabel.dataPoint.y >= 0)
                            y = Math.min(Math.max(indexLabel.point.y - 5, yMinLimit + textSize.width + 5), yMaxLimit);
                        else
                            y = Math.max(Math.min(indexLabel.point.y + textSize.width + 5, yMaxLimit - 5), yMinLimit);

                        angle = -90;
                    }

                } else if (this.plotInfo.axisPlacement === "xySwapped") {

                    if (placement === "outside") {

                        xMinLimit = plotArea.x1;
                        xMaxLimit = plotArea.x2;

                    } else if (placement === "inside") {

                        xMinLimit = indexLabel.bounds.x1;
                        xMaxLimit = indexLabel.bounds.x2;

                    }

                    if (orientation === "horizontal") {
                        y = indexLabel.point.y;

                        if (indexLabel.dataPoint.y >= 0)
                            x = Math.max((Math.min(indexLabel.point.x + 5, xMaxLimit - textSize.width)), xMinLimit);
                        else
                            x = Math.min((Math.max(indexLabel.point.x - textSize.width - 5, xMinLimit)), xMaxLimit);
                    }
                    else if (orientation === "vertical") {
                        y = indexLabel.point.y + textSize.width / 2;

                        if (indexLabel.dataPoint.y >= 0)
                            x = Math.max(Math.min(indexLabel.point.x + textSize.height / 2 + 5, xMaxLimit - textSize.height / 2), xMinLimit);
                        else
                            x = Math.min(Math.max(indexLabel.point.x - textSize.height / 2 - 5, xMinLimit + textSize.height / 2), xMaxLimit + textSize.height / 2);

                        angle = -90;
                    }

                }

            } else {

                if (orientation === "horizontal") {

                    x = indexLabel.point.x - textSize.width / 2;

                    if (indexLabel.dataPoint.y >= 0)
                        y = Math.max(indexLabel.point.y - textSize.height / 2 - 5, plotArea.y1 + textSize.height / 2);
                    else
                        y = Math.min(indexLabel.point.y + textSize.height / 2 + 5, plotArea.y2 - textSize.height / 2);

                } else if (orientation === "vertical") {

                    x = indexLabel.point.x;

                    if (indexLabel.dataPoint.y >= 0)
                        y = Math.max(indexLabel.point.y - 5, plotArea.y1 + textSize.width);
                    else
                        y = Math.min(indexLabel.point.y + textSize.width + 5, plotArea.y2);

                    angle = -90;
                }

            }

            ctx.save();

            ctx.translate(x, y);
            ctx.rotate(Math.PI / 180 * angle);

            ctx.fillText(indexLabelText, 0, 0);

            ctx.restore();
        }
    }

    Chart.prototype.renderLine = function (plotUnit) {

        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;
        //var ghostCtx = this.overlaidCanvasCtx;

        ctx.save();

        var plotArea = this.plotArea;

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        var markers = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            //if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
            //    dataSeries.markerSize = 8;
            ctx.beginPath();
            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                //dataSeries.noDataPointsInPlotArea = 0
                var prevDataNull = false;
                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
                        continue;

                    //if (!isFinite(dataPoints[i].y))
                    //    continue;

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {// if first dataPoint is null then no need to call stroke method
                            ctx.stroke();

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                            }
                        }


                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


                    //dataSeries.noDataPointsInPlotArea++;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);


                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 500 == 0) {
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                        }
                    }

                    //Render Marker
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);

                        if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                        }

                        var markerColor = intToHexColorString(id);

                        //window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);

                        if (isCanvasSupported) {
                            markers.push({
                                x: x, y: y, ctx: ghostCtx,
                                type: markerProps.type,
                                size: markerProps.size,
                                color: markerColor,
                                borderColor: markerColor,
                                borderThickness: markerProps.borderThickness
                            });
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "line",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }

                }

                ctx.stroke();

                if (isCanvasSupported)
                    ghostCtx.stroke();
            }

        }


        RenderHelper.drawMarkers(markers);
        ctx.restore();

        ctx.beginPath();

        if (isCanvasSupported)
            ghostCtx.beginPath();
    }

    Chart.prototype.renderStepLine = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;
        //var ghostCtx = this.overlaidCanvasCtx;

        ctx.save();

        var plotArea = this.plotArea;

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        var markers = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            //if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
            //    dataSeries.markerSize = 8;
            ctx.beginPath();
            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                //dataSeries.noDataPointsInPlotArea = 0
                var prevDataNull = false;
                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
                        continue;

                    //if (!isFinite(dataPoints[i].y))
                    //    continue;

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {// if first dataPoint is null then no need to call stroke method
                            ctx.stroke();

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                            }
                        }

                        prevDataNull = true;
                        continue;
                    }

                    var prevY = y;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


                    //dataSeries.noDataPointsInPlotArea++;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    } else {

                        ctx.lineTo(x, prevY);
                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, prevY);

                        ctx.lineTo(x, y);
                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 500 == 0) {
                            ctx.stroke();
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.stroke();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }
                        }
                    }

                    //Render Marker
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);

                        if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                        }

                        var markerColor = intToHexColorString(id);

                        //window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
                        if (isCanvasSupported) {
                            markers.push({
                                x: x, y: y, ctx: ghostCtx,
                                type: markerProps.type,
                                size: markerProps.size,
                                color: markerColor,
                                borderColor: markerColor,
                                borderThickness: markerProps.borderThickness
                            });
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stepLine",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }

                }

                ctx.stroke();
                if (isCanvasSupported)
                    ghostCtx.stroke();
            }
        }


        RenderHelper.drawMarkers(markers);
        ctx.restore();

        ctx.beginPath();

        if (isCanvasSupported)
            ghostCtx.beginPath();
    }

    function getBezierPoints(points, tension) {
        var bezierPoints = [];

        for (var i = 0; i < points.length; i++) {

            if (i == 0) {
                bezierPoints.push(points[0]);
                continue;
            }

            var i1, i2, pointIndex;

            pointIndex = i - 1;
            i1 = pointIndex === 0 ? 0 : pointIndex - 1;
            i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

            var drv1 = { x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension }
            var cp1 = { x: points[pointIndex].x + drv1.x / 3, y: points[pointIndex].y + drv1.y / 3 }
            bezierPoints[bezierPoints.length] = cp1;


            pointIndex = i;
            i1 = pointIndex === 0 ? 0 : pointIndex - 1;
            i2 = pointIndex === points.length - 1 ? pointIndex : pointIndex + 1;

            var drv2 = { x: (points[i2].x - points[i1].x) / tension, y: (points[i2].y - points[i1].y) / tension }
            var cp2 = { x: points[pointIndex].x - drv2.x / 3, y: points[pointIndex].y - drv2.y / 3 }
            bezierPoints[bezierPoints.length] = cp2;

            bezierPoints[bezierPoints.length] = points[i];
        }

        return bezierPoints;
    }

    Chart.prototype.renderSpline = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;
        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        ctx.save();

        var plotArea = this.plotArea;

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        var markers = [];

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            ctx.lineWidth = dataSeries.lineThickness;
            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.strokeStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            ghostCtx.lineWidth = dataSeries.lineThickness > 0 ? Math.max(dataSeries.lineThickness, 4) : 0;

            var colorSet = dataSeries._colorSet;
            var color = colorSet[0];
            ctx.strokeStyle = color;

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            //if (!dataSeries._options.markerSize && dataSeries.dataPoints.length < 1000)
            //    dataSeries.markerSize = 8;

            var pixels = [];

            ctx.beginPath();
            if (dataPoints.length > 0) {

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax)
                        continue;

                    //if (!isFinite(dataPoints[i].y))
                    //    continue;

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {// if first dataPoint is null then no need to call stroke method
                            renderBezier(pixels);
                            pixels = [];
                        }

                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };


                    pixels[pixels.length] = { x: x, y: y };


                    //Add Markers
                    if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {

                        var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                        markers.push(markerProps);

                        if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                            dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                        }

                        var markerColor = intToHexColorString(id);

                        //window.console.log("index: " + i + "; id: " + id + "; hex: " + markerColor);
                        if (isCanvasSupported) {
                            markers.push({
                                x: x, y: y, ctx: ghostCtx,
                                type: markerProps.type,
                                size: markerProps.size,
                                color: markerColor,
                                borderColor: markerColor,
                                borderThickness: markerProps.borderThickness
                            });
                        }
                    }

                    //Add Labels
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "spline",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }

                }
            }

            renderBezier(pixels);

        }

        RenderHelper.drawMarkers(markers);
        ctx.restore();

        ctx.beginPath();

        if (isCanvasSupported)
            ghostCtx.beginPath();

        function renderBezier(pixels) {

            var bp = getBezierPoints(pixels, 2);

            if (bp.length > 0) {
                ctx.beginPath();
                if (isCanvasSupported)
                    ghostCtx.beginPath();

                ctx.moveTo(bp[0].x, bp[0].y);
                if (isCanvasSupported)
                    ghostCtx.moveTo(bp[0].x, bp[0].y);

                for (var i = 0; i < bp.length - 3; i += 3) {

                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (isCanvasSupported)
                        ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (i > 0 && i % 3000 === 0) {
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(bp[i + 3].x, bp[i + 3].y);

                        if (isCanvasSupported) {
                            ghostCtx.stroke();
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(bp[i + 3].x, bp[i + 3].y);
                        }
                    }
                }

                ctx.stroke();

                if (isCanvasSupported)
                    ghostCtx.stroke();
            }
        }
    }

    var drawRect = function (ctx, x1, y1, x2, y2, color, top, bottom, left, right) {
        //alert("top"+ top + "bottom" + bottom + " lt" + left+ "rt" + right )
        var a1 = x1, a2 = x2, b1 = y1, b2 = y2, edgeY, edgeX;
        if (x2 - x1 > 15 && y2 - y1 > 15)
            var bevelDepth = 8;
        else
            var bevelDepth = 0.35 * Math.min((x2 - x1), (y2 - y1));
        //alert(a1 + "" + a2);
        var color2 = "rgba(255, 255, 255, .4)";
        var color3 = "rgba(255, 255, 255, 0.1)";
        //color1 = "rgba(" + r + "," + g + ", " + b + ",1)";
        var color1 = color;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.save();
        ctx.fillStyle = color1;
        //  ctx.moveTo(x1, y1);
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1)
        ctx.restore();
        //   ctx.beginPath();
        if (top === true) {
            // alert(x1 + "" + x2 + " " + bevelDepth);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2, y1);
            ctx.closePath();
            var grd = ctx.createLinearGradient((x2 + x1) / 2, b1 + bevelDepth, (x2 + x1) / 2, b1);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
            ctx.fill();
            //              ctx.stroke();
            ctx.restore();
        }


        if (bottom === true) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y2);
            ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            var grd = ctx.createLinearGradient((x2 + x1) / 2, b2 - bevelDepth, (x2 + x1) / 2, b2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color2);
            ctx.fillStyle = grd;
            //       ctx.stroke();
            ctx.fill();
            ctx.restore();
        }

        if (left === true) {
            //   alert(x1)
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1)
            ctx.lineTo(x1 + bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x1 + bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x1, y2);
            ctx.closePath();
            var grd = ctx.createLinearGradient(a1 + bevelDepth, (y2 + y1) / 2, a1, (y2 + y1) / 2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            ctx.fill();
            //     ctx.stroke();
            ctx.restore();
        }


        if (right === true) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x2, y1)
            ctx.lineTo(x2 - bevelDepth, y1 + bevelDepth);
            ctx.lineTo(x2 - bevelDepth, y2 - bevelDepth);
            ctx.lineTo(x2, y2);
            var grd = ctx.createLinearGradient(a2 - bevelDepth, (y2 + y1) / 2, a2, (y2 + y1) / 2);
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            grd.addColorStop(0, color1);
            grd.addColorStop(1, color3);
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.closePath();
            //          ctx.stroke();
            ctx.restore();
        }
        //	

    }

    Chart.prototype.renderColumn = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = Math.min((this.width * .15), this.plotArea.width / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }
        //ctx.beginPath();

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            // Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
            dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            //var offsetX = barWidth * plotUnit.index << 0;


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var x1 = x - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;

                    if (dataPoints[i].y >= 0) {
                        y1 = y;

                        y2 = yZeroToPixel;

                        if (y1 > y2) {
                            var temp = y1;
                            y1 = y2;
                            y2 = y1;
                        }

                    } else {
                        y2 = y;

                        y1 = yZeroToPixel;

                        if (y1 > y2) {
                            var temp = y1;
                            y1 = y2;
                            y2 = y1;
                        }
                    }

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false);

                    //if (dataSeries.markerType && dataSeries.markerSize > 0) {
                    //    RenderHelper.drawMarker(x1 + (x2 - x1) / 2, y, ctx, dataSeries.markerType, dataSeries.markerSize, color, dataSeries.markerBorderColor, dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1);
                    //}

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };

                    color = intToHexColorString(id);
                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, false, false, false, false);

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "column",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x1 + (x2 - x1) / 2, y: dataPoints[i].y >= 0 ? y1 : y2 },
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderStackedColumn = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;



        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            // Reducing pixelPerUnit by 1 just to overcome any problems due to rounding off of pixels.
            dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;


                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        y1 = y - offset;
                        y2 = yZeroToPixel - offset;

                        offsetPositiveY[dataPointX] = offset + (y2 - y1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        y2 = y + offset;
                        y1 = yZeroToPixel + offset;

                        offsetNegativeY[dataPointX] = offset + (y2 - y1);
                    }

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                    drawRect(ctx, x1, y1, x2, y2, color, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false);

                    //if (dataSeries.markerType && dataSeries.markerSize > 0) {
                    //    RenderHelper.drawMarker(x1 + (x2 - x1)/2, y1, ctx, dataSeries.markerType, dataSeries.markerSize, color, dataSeries.markerBorderColor, dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : 1);
                    //}

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, false, false, false, false);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedColumn",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: dataPoints[i].y >= 0 ? y1 : y2 },
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderStackedColumn100 = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                //ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

                    var yPercent;
                    if (plotUnit.dataPointYSums[dataPointX] !== 0)
                        yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
                    else
                        yPercent = 0;

                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var x2 = x1 + barWidth << 0;
                    var y1;
                    var y2;


                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        y1 = y - offset;
                        y2 = yZeroToPixel - offset;

                        offsetPositiveY[dataPointX] = offset + (y2 - y1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        y2 = y + offset;
                        y1 = yZeroToPixel + offset;

                        offsetNegativeY[dataPointX] = offset + (y2 - y1);
                    }


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, bevelEnabled && (dataPoints[i].y >= 0), (dataPoints[i].y < 0) && bevelEnabled, false, false);

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, false, false, false, false);


                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedColumn100",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: dataPoints[i].y >= 0 ? y1 : y2 },
                            bounds: { x1: x1, y1: Math.min(y1, y2), x2: x2, y2: Math.max(y1, y2) },
                            color: color
                        });

                    }
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderBar = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        //In case of Bar Chart, yZeroToPixel is x co-ordinate!
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        //var maxBarWidth = this.height * .15;
        var maxBarWidth = Math.min((this.height * .15), this.plotArea.height / plotUnit.plotType.totalDataSeries * .9) << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        //var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;

        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.totalDataSeries * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);


            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    //x and y are pixel co-ordinates of point and should not be confused with X and Y values
                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;


                    var y1 = (y - (plotUnit.plotType.totalDataSeries * barWidth / 2) + ((plotUnit.previousDataSeriesCount + j) * barWidth)) << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;

                    if (dataPoints[i].y >= 0) {
                        x1 = yZeroToPixel;
                        x2 = x;
                    } else {
                        x1 = x;
                        x2 = yZeroToPixel;
                    }

                    //drawRect(ctx, x1, y1, plotArea.x2, y2, "#EEEEEE", false, false, false, false);
                    //drawRect(ctx, x1, y1, plotArea.x2, y2, "#BDCED3", false, false, false, false);

                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    //color = "#1B4962";
                    drawRect(ctx, x1, y1, x2, y2, color, bevelEnabled, false, false, false);


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, false, false, false, false);


                    this._indexLabels.push({
                        chartType: "bar",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: { x: dataPoints[i].y >= 0 ? x2 : x1, y: y1 + (y2 - y1) / 2 },
                        bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                        color: color
                    });
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderStackedBar = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    //var x1 = x - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;

                    var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;

                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        x1 = yZeroToPixel + offset;
                        x2 = x + offset;

                        offsetPositiveY[dataPointX] = offset + (x2 - x1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        x1 = x - offset;
                        x2 = yZeroToPixel - offset;

                        offsetNegativeY[dataPointX] = offset + (x2 - x1);
                    }


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, bevelEnabled, false, false, false);

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, false, false, false, false);


                    this._indexLabels.push({
                        chartType: "stackedBar",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: { x: dataPoints[i].y >= 0 ? x2 : x1, y: y },
                        bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                        color: color
                    });
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderStackedBar100 = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var offsetPositiveY = [];
        var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.height / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / plotUnit.plotType.plotUnits.length * .9) << 0;

        if (barWidth > maxBarWidth)
            barWidth = maxBarWidth;
        else if (xMinDiff === Infinity) {
            barWidth = maxBarWidth;
        } else if (barWidth < 1)
            barWidth = 1;

        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            dataSeries.maxWidthInX = barWidth / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);

            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);

                var bevelEnabled = (barWidth > 5) && dataSeries.bevelEnabled ? true : false;

                ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;


                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    y = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;

                    var yPercent;
                    if (plotUnit.dataPointYSums[dataPointX] !== 0)
                        yPercent = dataPoints[i].y / plotUnit.dataPointYSums[dataPointX] * 100;
                    else
                        yPercent = 0;

                    x = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var y1 = y - (plotUnit.plotType.plotUnits.length * barWidth / 2) + (plotUnit.index * barWidth) << 0;
                    var y2 = y1 + barWidth << 0;
                    var x1;
                    var x2;


                    if (dataPoints[i].y >= 0) {
                        var offset = offsetPositiveY[dataPointX] ? offsetPositiveY[dataPointX] : 0;

                        x1 = yZeroToPixel + offset;
                        x2 = x + offset;

                        offsetPositiveY[dataPointX] = offset + (x2 - x1);

                    } else {
                        var offset = offsetNegativeY[dataPointX] ? offsetNegativeY[dataPointX] : 0;

                        x1 = x - offset;
                        x2 = yZeroToPixel - offset;

                        offsetNegativeY[dataPointX] = offset + (x2 - x1);
                    }


                    color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    drawRect(ctx, x1, y1, x2, y2, color, bevelEnabled, false, false, false);

                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x1, y1: y1, x2: x2, y2: y2 };
                    color = intToHexColorString(id);

                    if (isCanvasSupported)
                        drawRect(this._eventManager.ghostCtx, x1, y1, x2, y2, color, false, false, false, false);


                    this._indexLabels.push({
                        chartType: "stackedBar100",
                        dataPoint: dataPoints[i],
                        dataSeries: dataSeries,
                        point: { x: dataPoints[i].y >= 0 ? x2 : x1, y: y },
                        bounds: { x1: Math.min(x1, x2), y1: y1, x2: Math.max(x1, x2), y2: y2 },
                        color: color
                    });
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderArea = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;

                var prevDataNull = true;
                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number") {
                        closeArea();

                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        startPoint = { x: x, y: y };

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    }
                    else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {
                            closeArea();
                        }
                    }


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                                dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            }

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "area",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }
                }

                closeArea();

                //startPoint = { x: x, y: y };
                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function closeArea() {

            if (!startPoint)
                return;

            if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                baseY = yZeroToPixel;
            }
            else if (plotUnit.axisY.maximum < 0)
                baseY = axisYProps.y1;
            else if (plotUnit.axisY.minimum > 0)
                baseY = axisXProps.y2;

            ctx.lineTo(x, baseY);
            ctx.lineTo(startPoint.x, baseY);
            ctx.closePath();
            ctx.fill();

            if (isCanvasSupported) {
                ghostCtx.lineTo(x, baseY);
                ghostCtx.lineTo(startPoint.x, baseY);
                ghostCtx.closePath();
                ghostCtx.fill();
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y);

            startPoint = { x: x, y: y };
        }
    }

    Chart.prototype.renderSplineArea = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            var pixels = [];

            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;

                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number") {
                        if (i > 0) {
                            renderBezierArea();
                            pixels = [];
                        }
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

                    pixels[pixels.length] = { x: x, y: y };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                                dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            }

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }


                    //Render Index Labels
                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "splineArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }
                }

                renderBezierArea();

                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function renderBezierArea() {
            var bp = getBezierPoints(pixels, 2);

            if (bp.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp[0].x, bp[0].y);

                if (isCanvasSupported) {
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(bp[0].x, bp[0].y);
                }


                for (var i = 0; i < bp.length - 3; i += 3) {

                    ctx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                    if (isCanvasSupported)
                        ghostCtx.bezierCurveTo(bp[i + 1].x, bp[i + 1].y, bp[i + 2].x, bp[i + 2].y, bp[i + 3].x, bp[i + 3].y);

                }

                if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                    baseY = yZeroToPixel;
                }
                else if (plotUnit.axisY.maximum < 0)
                    baseY = axisYProps.y1;
                else if (plotUnit.axisY.minimum > 0)
                    baseY = axisXProps.y2;

                startPoint = { x: bp[0].x, y: bp[0].y };

                ctx.lineTo(bp[bp.length - 1].x, baseY);
                ctx.lineTo(startPoint.x, baseY);
                ctx.closePath();
                ctx.fill();

                if (isCanvasSupported) {
                    ghostCtx.lineTo(bp[bp.length - 1].x, baseY);
                    ghostCtx.lineTo(startPoint.x, baseY);
                    ghostCtx.closePath();
                    ghostCtx.fill();
                }
            }
        }
    }

    Chart.prototype.renderStepArea = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var ghostCtx = this._eventManager.ghostCtx;

        var axisXProps = plotUnit.axisX.lineCoordinates;
        var axisYProps = plotUnit.axisY.lineCoordinates;
        var markers = [];

        var plotArea = this.plotArea;
        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];

            var dataPoints = dataSeries.dataPoints;

            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };

            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;
            //ghostCtx.lineWidth = dataSeries.lineThickness;
            //ghostCtx.lineWidth = 20;

            markers = [];

            var isFirstDataPointInPlotArea = true;
            var i = 0, x, y;
            var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number back and forth.

            var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;
            var baseY;

            var startPoint = null;

            var prevDataNull = false;
            if (dataPoints.length > 0) {
                //ctx.strokeStyle = "#4572A7 ";                
                var color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;

                for (; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    var prevY = y;

                    if (typeof (dataPoints[i].y) !== "number") {
                        closeArea();

                        prevDataNull = true;
                        continue;
                    }

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;



                    if (isFirstDataPointInPlotArea || prevDataNull) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        startPoint = { x: x, y: y };

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                        prevDataNull = false;
                    }
                    else {

                        ctx.lineTo(x, prevY);
                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, prevY);

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {

                            if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                                baseY = yZeroToPixel;
                            }
                            else if (plotUnit.axisY.maximum < 0)
                                baseY = axisYProps.y1;
                            else if (plotUnit.axisY.minimum > 0)
                                baseY = axisXProps.y2;

                            ctx.lineTo(x, baseY);
                            ctx.lineTo(startPoint.x, baseY);
                            ctx.closePath();
                            ctx.fill();
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.lineTo(x, baseY);
                                ghostCtx.lineTo(startPoint.x, baseY);
                                ghostCtx.closePath();
                                ghostCtx.fill();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }

                            startPoint = { x: x, y: y };
                        }
                    }


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };

                    //Render Marker
                    if (dataPoints[i].markerSize !== 0) {
                        if (dataPoints[i].markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                                dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            }

                            var markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoints[i].indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stepArea",
                            dataPoint: dataPoints[i],
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }
                }

                closeArea();

                RenderHelper.drawMarkers(markers);
            }
        }

        ctx.restore();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();

        function closeArea() {

            if (!startPoint)
                return;

            if (plotUnit.axisY.minimum <= 0 && plotUnit.axisY.maximum >= 0) {
                baseY = yZeroToPixel;
            }
            else if (plotUnit.axisY.maximum < 0)
                baseY = axisYProps.y1;
            else if (plotUnit.axisY.minimum > 0)
                baseY = axisXProps.y2;

            ctx.lineTo(x, baseY);
            ctx.lineTo(startPoint.x, baseY);
            ctx.closePath();
            ctx.fill();

            if (isCanvasSupported) {
                ghostCtx.lineTo(x, baseY);
                ghostCtx.lineTo(startPoint.x, baseY);
                ghostCtx.closePath();
                ghostCtx.fill();
            }

            ctx.beginPath();
            ctx.moveTo(x, y);
            ghostCtx.beginPath();
            ghostCtx.moveTo(x, y);

            startPoint = { x: x, y: y };
        }
    }

    Chart.prototype.renderStackedArea = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;
        var markers = [];

        var plotArea = this.plotArea;

        var offsetY = [];

        var allXValues = [];
        //var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.

        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;

        var ghostCtx = this._eventManager.ghostCtx;

        if (isCanvasSupported)
            ghostCtx.beginPath();

        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        xValuePresent = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var xValue;

            dataSeries.dataPointIndexes = [];

            for (i = 0; i < dataPoints.length; i++) {
                xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                dataSeries.dataPointIndexes[xValue] = i;

                if (!xValuePresent[xValue]) {
                    allXValues.push(xValue);
                    xValuePresent[xValue] = true;
                }
            }

            allXValues.sort(compareNumbers);
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            var currentBaseValues = [];


            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;



            if (allXValues.length > 0) {

                color = dataSeries._colorSet[0];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;

                for (i = 0; i < allXValues.length; i++) {

                    dataPointX = allXValues[i];
                    var dataPoint = null;

                    if (dataSeries.dataPointIndexes[dataPointX] >= 0)
                        dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
                    else
                        dataPoint = { x: dataPointX, y: 0 };

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoint.y) !== "number")
                        continue;

                    var x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoint.y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

                    y = y - offset;
                    currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                    offsetY[dataPointX] = yZeroToPixel - y;

                    if (isFirstDataPointInPlotArea) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                    }
                    else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {

                            while (currentBaseValues.length > 0) {
                                var point = currentBaseValues.pop();
                                ctx.lineTo(point.x, point.y);

                                if (isCanvasSupported)
                                    ghostCtx.lineTo(point.x, point.y);

                            }

                            ctx.closePath();
                            ctx.fill();

                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.closePath();
                                ghostCtx.fill();

                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }

                            currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                        }

                    }

                    if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
                        var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
                        this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y };
                    }

                    //Render Marker
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
                        if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {

                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                                dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            }

                            markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoint.indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedArea",
                            dataPoint: dataPoint,
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }
                }

                while (currentBaseValues.length > 0) {
                    var point = currentBaseValues.pop();
                    ctx.lineTo(point.x, point.y);

                    if (isCanvasSupported)
                        ghostCtx.lineTo(point.x, point.y);
                }

                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(x, y);

                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(x, y);
                }
            }

            delete (dataSeries.dataPointIndexes);
        }

        RenderHelper.drawMarkers(markers);


        ctx.restore();

        if (isCanvasSupported)
            ghostCtx.restore();
    }

    Chart.prototype.renderStackedArea100 = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;
        var markers = [];

        var offsetY = [];

        var allXValues = [];
        //var offsetNegativeY = [];

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number everytime it is accessed.


        //var yZeroToPixel = (axisYProps.y2 - axisYProps.height / rangeY * Math.abs(0 - plotUnit.axisY.minimum) + .5) << 0;
        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) * .9) << 0;

        var ghostCtx = this._eventManager.ghostCtx;

        ctx.save();

        if (isCanvasSupported)
            ghostCtx.save();


        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            ghostCtx.beginPath();
            ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            ghostCtx.clip();
        }

        xValuePresent = [];
        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var xValue;

            dataSeries.dataPointIndexes = [];

            for (i = 0; i < dataPoints.length; i++) {
                xValue = dataPoints[i].x.getTime ? dataPoints[i].x.getTime() : dataPoints[i].x;
                dataSeries.dataPointIndexes[xValue] = i;

                if (!xValuePresent[xValue]) {
                    allXValues.push(xValue);
                    xValuePresent[xValue] = true;
                }
            }

            allXValues.sort(compareNumbers);
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;


            var seriesId = dataSeries.id;
            this._eventManager.objectMap[seriesId] = { objectType: "dataSeries", dataSeriesIndex: dataSeriesIndex };
            var hexColor = intToHexColorString(seriesId);
            ghostCtx.fillStyle = hexColor;

            if (dataPoints.length == 1)
                barWidth = maxBarWidth;

            if (barWidth < 1)
                barWidth = 1;
            else if (barWidth > maxBarWidth)
                barWidth = maxBarWidth;

            var currentBaseValues = [];

            if (allXValues.length > 0) {

                color = dataSeries._colorSet[i % dataSeries._colorSet.length];
                //ctx.strokeStyle = "red";
                ctx.fillStyle = color;

                var bevelEnabled = (barWidth > 5) ? false : false;

                //ctx.strokeStyle = "#4572A7 ";

                for (i = 0; i < allXValues.length; i++) {

                    dataPointX = allXValues[i];
                    var dataPoint = null;

                    if (dataSeries.dataPointIndexes[dataPointX] >= 0)
                        dataPoint = dataPoints[dataSeries.dataPointIndexes[dataPointX]];
                    else
                        dataPoint = { x: dataPointX, y: 0 };

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoint.y) !== "number")
                        continue;

                    var yPercent;
                    if (plotUnit.dataPointYSums[dataPointX] !== 0)
                        yPercent = dataPoint.y / plotUnit.dataPointYSums[dataPointX] * 100;
                    else
                        yPercent = 0;

                    var x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    var y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (yPercent - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var offset = offsetY[dataPointX] ? offsetY[dataPointX] : 0;

                    y = y - offset;
                    currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                    offsetY[dataPointX] = yZeroToPixel - y;

                    if (isFirstDataPointInPlotArea) {
                        ctx.beginPath();
                        ctx.moveTo(x, y);

                        if (isCanvasSupported) {
                            ghostCtx.beginPath();
                            ghostCtx.moveTo(x, y);
                        }

                        isFirstDataPointInPlotArea = false;
                    }
                    else {

                        ctx.lineTo(x, y);

                        if (isCanvasSupported)
                            ghostCtx.lineTo(x, y);

                        if (i % 250 == 0) {

                            while (currentBaseValues.length > 0) {
                                var point = currentBaseValues.pop();
                                ctx.lineTo(point.x, point.y);

                                if (isCanvasSupported)
                                    ghostCtx.lineTo(point.x, point.y);
                            }

                            ctx.closePath();
                            ctx.fill();
                            ctx.beginPath();
                            ctx.moveTo(x, y);

                            if (isCanvasSupported) {
                                ghostCtx.closePath();
                                ghostCtx.fill();
                                ghostCtx.beginPath();
                                ghostCtx.moveTo(x, y);
                            }

                            currentBaseValues.push({ x: x, y: yZeroToPixel - offset });
                        }
                    }


                    if (dataSeries.dataPointIndexes[dataPointX] >= 0) {
                        var id = dataSeries.dataPointIds[dataSeries.dataPointIndexes[dataPointX]];
                        this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: dataSeries.dataPointIndexes[dataPointX], x1: x, y1: y };
                    }

                    //Render Marker
                    if (dataSeries.dataPointIndexes[dataPointX] >= 0 && dataPoint.markerSize !== 0) {
                        if (dataPoint.markerSize > 0 || dataSeries.markerSize > 0) {
                            var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                            markers.push(markerProps);

                            if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                                dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                            }

                            markerColor = intToHexColorString(id);

                            if (isCanvasSupported) {
                                markers.push({
                                    x: x, y: y, ctx: ghostCtx,
                                    type: markerProps.type,
                                    size: markerProps.size,
                                    color: markerColor,
                                    borderColor: markerColor,
                                    borderThickness: markerProps.borderThickness
                                });
                            }
                        }
                    }

                    if (dataPoint.indexLabel || dataSeries.indexLabel) {

                        this._indexLabels.push({
                            chartType: "stackedArea100",
                            dataPoint: dataPoint,
                            dataSeries: dataSeries,
                            point: { x: x, y: y },
                            color: color
                        });

                    }
                }

                while (currentBaseValues.length > 0) {
                    var point = currentBaseValues.pop();
                    ctx.lineTo(point.x, point.y);

                    if (isCanvasSupported)
                        ghostCtx.lineTo(point.x, point.y);
                }

                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(x, y);

                if (isCanvasSupported) {
                    ghostCtx.closePath();
                    ghostCtx.fill();
                    ghostCtx.beginPath();
                    ghostCtx.moveTo(x, y);
                }
            }

            delete (dataSeries.dataPointIndexes);
        }

        RenderHelper.drawMarkers(markers);

        ctx.restore();

        if (isCanvasSupported)
            ghostCtx.restore();
    }

    Chart.prototype.renderBubble = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;


        ctx.save();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        var maxZ = -Infinity;
        var minZ = Infinity;

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];
            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var z = 0;

            for (var i = 0; i < dataPoints.length; i++) {

                dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                    continue;
                }

                if (typeof (dataPoints[i].z) !== "undefined") {

                    z = dataPoints[i].z;

                    if (z > maxZ)
                        maxZ = z;

                    if (z < minZ)
                        minZ = z;
                }
            }
        }

        var minArea = Math.PI * 5 * 5;
        var maxArea = Math.max(Math.pow(Math.min(plotArea.height, plotArea.width) * .25 / 2, 2) * Math.PI, minArea);

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            if (dataPoints.length == 1)
                barWidth = maxBarWidth;

            if (barWidth < 1)
                barWidth = 1;
            else if (barWidth > maxBarWidth)
                barWidth = maxBarWidth;

            if (dataPoints.length > 0) {
                //var xy = this.getPixelCoordinatesOnPlotArea(dataPoints[0].x, dataPoints[0].y);
                //var bevelEnabled = (barWidth > 5) ? false : false;

                ctx.strokeStyle = "#4572A7 ";



                for (var i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var z = dataPoints[i].z;

                    var area = (maxZ === minZ) ? maxArea / 2 : minArea + (maxArea - minArea) / (maxZ - minZ) * (z - minZ);
                    var radius = Math.max(Math.sqrt(area / Math.PI) << 0, 1);

                    var markerSize = radius * 2;
                    var markerProps = dataSeries.getMarkerProperties(i, ctx);
                    markerProps.size = markerSize;
                    //markers.push(markerProps);

                    //color = dataSeries._colorSet[i % dataSeries._colorSet.length];

                    //var markerType = dataSeries.markerType ? dataSeries.markerType : "circle";


                    RenderHelper.drawMarker(x, y, ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.borderColor, markerProps.borderThickness);
                    //RenderHelper.drawMarker(x, y, ctx, "square", radius * 2, color);
                    //RenderHelper.drawMarker(x, y, ctx, "triangle", radius * 2, color, "#000000", 0);
                    //RenderHelper.drawMarker(x, y, ctx, "cross", radius * 2, color, "#000000", 2);

                    //ctx.moveTo(x, y);
                    //ctx.beginPath();
                    //ctx.arc(x, y, radius, 0, 360, false);
                    //ctx.fill();

                    if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                        dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                    }


                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y, size: markerSize };
                    var markerColor = intToHexColorString(id);
                    //RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerType, markerSize, markerColor, markerColor, dataSeries.markerBorderThickness);
                    if (isCanvasSupported)
                        RenderHelper.drawMarker(x, y, this._eventManager.ghostCtx, markerProps.type, markerProps.size, markerColor, markerColor, markerProps.borderThickness);

                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    Chart.prototype.renderScatter = function (plotUnit) {
        var ctx = this.plotArea.ctx;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var color = null;

        var plotArea = this.plotArea;

        var i = 0, x, y;
        var dataPointX; //Used so that when dataPoint.x is a DateTime value, it doesn't get converted to number from dataTime everytime it is used.

        var yZeroToPixel = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (0 - plotUnit.axisY.conversionParameters.minimum)) << 0;

        var maxBarWidth = this.width * .15 << 0;
        var xMinDiff = plotUnit.axisX.dataInfo.minDiff;
        var barWidth = (((plotArea.width / Math.abs(plotUnit.axisX.maximum - plotUnit.axisX.minimum)) * Math.abs(xMinDiff)) / totalDataSeries * .9) << 0;


        ctx.save();
        if (isCanvasSupported)
            this._eventManager.ghostCtx.save();

        ctx.beginPath();
        ctx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        ctx.clip();

        if (isCanvasSupported) {
            this._eventManager.ghostCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
            this._eventManager.ghostCtx.clip();
        }

        for (var j = 0; j < plotUnit.dataSeriesIndexes.length; j++) {

            var dataSeriesIndex = plotUnit.dataSeriesIndexes[j];

            var dataSeries = this.data[dataSeriesIndex];
            var dataPoints = dataSeries.dataPoints;
            var isFirstDataPointInPlotArea = true;

            if (dataPoints.length == 1)
                barWidth = maxBarWidth;

            if (barWidth < 1)
                barWidth = 1;
            else if (barWidth > maxBarWidth)
                barWidth = maxBarWidth;

            if (dataPoints.length > 0) {
                //var bevelEnabled = (barWidth > 5) ? false : false;

                ctx.strokeStyle = "#4572A7 ";

                var maxArea = Math.pow(Math.min(plotArea.height, plotArea.width) * .3 / 2, 2) * Math.PI;

                var prevDataPointX = 0;
                var prevDataPointY = 0;

                for (var i = 0; i < dataPoints.length; i++) {

                    dataPointX = dataPoints[i].getTime ? dataPointX = dataPoints[i].x.getTime() : dataPointX = dataPoints[i].x;

                    if (dataPointX < plotUnit.axisX.dataInfo.viewPortMin || dataPointX > plotUnit.axisX.dataInfo.viewPortMax) {
                        continue;
                    }

                    if (typeof (dataPoints[i].y) !== "number")
                        continue;

                    x = (plotUnit.axisX.conversionParameters.reference + plotUnit.axisX.conversionParameters.pixelPerUnit * (dataPointX - plotUnit.axisX.conversionParameters.minimum) + .5) << 0;
                    y = (plotUnit.axisY.conversionParameters.reference + plotUnit.axisY.conversionParameters.pixelPerUnit * (dataPoints[i].y - plotUnit.axisY.conversionParameters.minimum) + .5) << 0;

                    var markerProps = dataSeries.getMarkerProperties(i, x, y, ctx);
                    RenderHelper.drawMarker(markerProps.x, markerProps.y, markerProps.ctx, markerProps.type, markerProps.size, markerProps.color, markerProps.color, markerProps.thickness);

                    //if (Math.abs(prevDataPointX - x) < markerProps.size / 2 && Math.abs(prevDataPointY - y) < markerProps.size / 2) {
                    //    continue;
                    //}

                    if (!dataSeries.maxWidthInX || markerProps.size > dataSeries.maxWidthInX) {
                        dataSeries.maxWidthInX = markerProps.size / (plotUnit.axisX.conversionParameters.pixelPerUnit > 1 ? plotUnit.axisX.conversionParameters.pixelPerUnit - 1 : plotUnit.axisX.conversionParameters.pixelPerUnit);
                    }

                    if (Math.sqrt((prevDataPointX - x) * (prevDataPointX - x) + (prevDataPointY - y) * (prevDataPointY - y)) < Math.min(markerProps.size, 5)) {
                        continue;
                    }

                    //Render ID on Ghost Canvas - for event handling
                    var id = dataSeries.dataPointIds[i];
                    this._eventManager.objectMap[id] = { id: id, objectType: "dataPoint", dataSeriesIndex: dataSeriesIndex, dataPointIndex: i, x1: x, y1: y };
                    var markerColor = intToHexColorString(id);

                    if (isCanvasSupported) {
                        RenderHelper.drawMarker(
								markerProps.x, markerProps.y, this._eventManager.ghostCtx,
								markerProps.type,
								markerProps.size,
								markerColor,
								markerColor,
								markerProps.borderThickness
							);
                    }
                    //markers.push();

                    prevDataPointX = x;
                    prevDataPointY = y;
                }
            }
        }

        ctx.restore();

        if (isCanvasSupported)
            this._eventManager.ghostCtx.restore();
    }

    //#region pieChart

    var drawSegment = function (ctx, center, radius, color, type, theta1, theta2) {


        ctx.save();

        if (type === "pie") {
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.arc(center.x, center.y, radius, theta1, theta2, false);
            ctx.fillStyle = color;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            //    ctx.shadowOffsetX = 2;
            //    ctx.shadowOffsetY = 1;
            //     ctx.shadowBlur = 2;
            //    ctx.shadowColor = '#BFBFBF';
            ctx.closePath();
            //ctx.stroke();
            ctx.fill();
        }
        else if (type === "doughnut") {
            var widthPercentage = 0.60;
            ctx.beginPath();
            ctx.arc(center.x, center.y, radius, theta1, theta2, false);
            ctx.arc(center.x, center.y, widthPercentage * radius, theta2, theta1, true);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            // shadow properties
            //     ctx.shadowOffsetX = 1;
            //    ctx.shadowOffsetY = 1;
            //     ctx.shadowBlur = 1;
            //    ctx.shadowColor = '#BFBFBF';  //grey shadow
            //ctx.stroke();
            ctx.fill();
        }

        ctx.restore();
    };

    Chart.prototype.renderPie = function (plotUnit) {

        var _this = this;
        var totalDataSeries = plotUnit.dataSeriesIndexes.length;

        if (totalDataSeries <= 0)
            return;

        var dataSeriesIndex = plotUnit.dataSeriesIndexes[0];
        var dataSeries = this.data[dataSeriesIndex];
        var dataPoints = dataSeries.dataPoints;
        var indexLabelLineEdgeLength = 10;

        var plotArea = this.plotArea;

        //var maxFrame = isCanvasSupported ? 300 : 4;
        var totalRecursions = 0;
        var animationParameter = { frame: 0, maxFrames: 1 };
        var dataPointEOs = []; //dataPoint Extension Objects Behaves like a storage place for all additional data relating to dataPoints. Requred because actual dataPoints should not be modified.


        var minDistanceBetweenLabels = 2;
        var indexLabelRadiusToRadiusRatio = 1.3;
        var poleAnglularDistance = (20 / 180) * Math.PI; //Anglular Distance from 90 & 270 to be considered pole
        var precision = 6;

        var center = { x: (plotArea.x2 + plotArea.x1) / 2, y: (plotArea.y2 + plotArea.y1) / 2 };
        var outerRadius = dataSeries.indexLabelPlacement === "inside" ? (Math.min(plotArea.width, plotArea.height) * 0.95) / 2 : (Math.min(plotArea.width, plotArea.height) * 0.8) / 2;
        var innerRadius = outerRadius * .6;

        var indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;
        var newPieRadius = outerRadius;

        function resetAnimationFrame(maxFrames) {
            maxFrames = maxFrames || 1;

            animationParameter.frame = 0;
            animationParameter.maxFrames = maxFrames;
        }

        function initLabels() {

            if (!dataSeries || !dataPoints)
                return;

            var sum = 0;
            for (var j = 0; j < dataPoints.length; j++) {
                sum += Math.abs(dataPoints[j].y);
            }

            var noDPNearSouthPole = 0;
            var noDPNearNorthPole = 0;
            var firstDPCloseToSouth = 0;
            var firstDPCloseToNorth = 0;

            for (j = 0; j < dataPoints.length; j++) {

                var dataPoint = dataPoints[j];
                var id = dataSeries.dataPointIds[j];

                var dataPointEO = { id: id, objectType: "dataPoint", dataPointIndex: j, dataSeriesIndex: 0 };
                dataPointEOs.push(dataPointEO);
                var indexLabelText = dataPoint.indexLabel ? dataPoint.indexLabel : dataSeries.indexLabel ? dataSeries.indexLabel : dataPoint.label ? dataPoint.label : dataSeries.label ? dataSeries.label : '';


                _this._eventManager.objectMap[id] = dataPointEO;

                //dataPointEO.indexLabelText = j.toString() + " " + "kingfisher: " + dataPoint.y.toString();;
                dataPointEO.center = { x: center.x, y: center.y };
                dataPointEO.y = dataPoint.y;
                dataPointEO.radius = outerRadius;
                dataPointEO.indexLabelText = _this.replaceKeywordsWithValue(indexLabelText, dataPoint, dataSeries, j)
                dataPointEO.indexLabelPlacement = dataSeries.indexLabelPlacement;
                dataPointEO.indexLabelLineColor = dataPoint.indexLabelLineColor ? dataPoint.indexLabelLineColor : dataSeries.indexLabelLineColor ? dataSeries.indexLabelLineColor : dataPoint.color ? dataPoint.color : dataSeries._colorSet[j % dataSeries._colorSet.length];
                dataPointEO.indexLabelLineThickness = dataPoint.indexLabelLineThickness ? dataPoint.indexLabelLineThickness : dataSeries.indexLabelLineThickness;
                dataPointEO.indexLabelFontColor = dataPoint.indexLabelFontColor ? dataPoint.indexLabelFontColor : dataSeries.indexLabelFontColor;
                dataPointEO.indexLabelFontStyle = dataPoint.indexLabelFontStyle ? dataPoint.indexLabelFontStyle : dataSeries.indexLabelFontStyle;
                dataPointEO.indexLabelFontWeight = dataPoint.indexLabelFontWeight ? dataPoint.indexLabelFontWeight : dataSeries.indexLabelFontWeight;
                dataPointEO.indexLabelFontSize = dataPoint.indexLabelFontSize ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
                dataPointEO.indexLabelFontFamily = dataPoint.indexLabelFontFamily ? dataPoint.indexLabelFontFamily : dataSeries.indexLabelFontFamily;
                dataPointEO.indexLabelBackgroundColor = dataPoint.indexLabelBackgroundColor ? dataPoint.indexLabelBackgroundColor : dataSeries.indexLabelBackgroundColor ? dataSeries.indexLabelBackgroundColor : null;
                dataPointEO.indexLabelMaxWidth = dataPoint.indexLabelMaxWidth ? dataPoint.indexLabelMaxWidth : dataSeries.indexLabelMaxWidth ? dataSeries.indexLabelMaxWidth : plotArea.width * .33;
                dataPointEO.indexLabelWrap = dataPoint.indexLabelWrap ? dataPoint.indexLabelWrap : dataSeries.indexLabelWrap;

                dataPointEO.startAngle = j === 0 ? dataSeries.startAngle ? (dataSeries.startAngle / 180) * Math.PI : 0 : dataPointEOs[j - 1].endAngle;

                dataPointEO.startAngle = (dataPointEO.startAngle + (2 * Math.PI)) % (2 * Math.PI);

                dataPointEO.endAngle = dataPointEO.startAngle + ((2 * Math.PI / sum) * Math.abs(dataPoint.y));

                //var midAngle = dataPointEO.startAngle + Math.abs(dataPointEO.endAngle - dataPointEO.startAngle) / 2;
                var midAngle = (dataPointEO.endAngle + dataPointEO.startAngle) / 2;

                //var midAngle = (180 / Math.PI * midAngle);

                midAngle = (midAngle + (2 * Math.PI)) % (2 * Math.PI);

                dataPointEO.midAngle = midAngle;

                if (dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {
                    if (noDPNearSouthPole === 0 || dataPointEOs[firstDPCloseToSouth].midAngle > dataPointEO.midAngle)
                        firstDPCloseToSouth = j;

                    noDPNearSouthPole++;
                }
                else if (dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {
                    if (noDPNearNorthPole === 0 || dataPointEOs[firstDPCloseToNorth].midAngle > dataPointEO.midAngle)
                        firstDPCloseToNorth = j;

                    noDPNearNorthPole++;
                }


                if (midAngle > (Math.PI / 2) && midAngle <= (3 * Math.PI / 2))
                    dataPointEO.hemisphere = "left";
                else
                    dataPointEO.hemisphere = "right";

                //dataPointEO.indexLabelText = j.toString() + "; " + dataPoint.y.toString() + "; " + midAngle.toString() + "; junk";				
                dataPointEO.indexLabelTextBlock = new TextBlock(_this.plotArea.ctx, {
                    fontSize: dataPointEO.indexLabelFontSize, fontFamily: dataPointEO.indexLabelFontFamily, fontColor: dataPointEO.indexLabelFontColor,
                    fontStyle: dataPointEO.indexLabelFontStyle, fontWeight: dataPointEO.indexLabelFontWeight,
                    horizontalAlign: "left",
                    backgroundColor: dataPointEO.indexLabelBackgroundColor,
                    maxWidth: dataPointEO.indexLabelMaxWidth, maxHeight: dataPointEO.indexLabelWrap ? dataPointEO.indexLabelFontSize * 5 : dataPointEO.indexLabelFontSize * 1.5,
                    text: dataPointEO.indexLabelText,
                    padding: 0,
                    //textBaseline: dataPointEO.indexLabelBackgroundColor ? "middle" : "top"
                    textBaseline: "top"
                });

                dataPointEO.indexLabelTextBlock.measureText();

                //dataPoint.labelWidth = ctx.measureText(j.toString() + "; " + dataPoint.label).width;

                //console.log(dataPoint.label);
            }

            var noOfDPToRightOfSouthPole = 0;
            var noOfDPToLeftOfNorthPole = 0;
            var keepSameDirection = false; // once a dataPoint's hemisphere is changed, others should follow the same so that there are no labes near pole pointing in opposite direction.

            for (j = 0; j < dataPoints.length; j++) {

                var dataPointEO = dataPointEOs[(firstDPCloseToSouth + j) % dataPoints.length];

                if (noDPNearSouthPole > 1 && dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {

                    if (noOfDPToRightOfSouthPole <= noDPNearSouthPole / 2 && !keepSameDirection) {
                        dataPointEO.hemisphere = "right";
                        noOfDPToRightOfSouthPole++;
                    }
                    else {
                        dataPointEO.hemisphere = "left";
                        keepSameDirection = true;
                    }
                }
            }

            keepSameDirection = false;
            for (j = 0; j < dataPoints.length; j++) {

                var dataPointEO = dataPointEOs[(firstDPCloseToNorth + j) % dataPoints.length];

                //if (dataPoint.hemisphere = "right")
                //	break;

                if (noDPNearNorthPole > 1 && dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {

                    if (noOfDPToLeftOfNorthPole <= noDPNearNorthPole / 2 && !keepSameDirection) {
                        dataPointEO.hemisphere = "left";
                        noOfDPToLeftOfNorthPole++;
                    }
                    else {
                        dataPointEO.hemisphere = "right";
                        keepSameDirection = true;
                    }
                }
            }
        }//End of initLabels()

        function renderLabels() {

            var ctx = _this.plotArea.ctx;
            ctx.fillStyle = "black";
            ctx.strokeStyle = "grey";
            var fontSize = 16;
            //ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            ctx.lineJoin = "round";
            var i = 0, j = 0;

            for (i = 0; i < dataPoints.length; i++) {
                var dataPointEO = dataPointEOs[i];

                if (!dataPointEO.indexLabelText)
                    continue;

                dataPointEO.indexLabelTextBlock.y -= dataPointEO.indexLabelTextBlock.height / 2;

                var xOffset = 0;

                if (dataPointEO.hemisphere === "left") {
                    var xOffset = dataSeries.indexLabelPlacement === "outside" ? -(dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength) : -dataPointEO.indexLabelTextBlock.width / 2;
                }
                else {
                    var xOffset = dataSeries.indexLabelPlacement === "outside" ? indexLabelLineEdgeLength : -dataPointEO.indexLabelTextBlock.width / 2;
                }

                dataPointEO.indexLabelTextBlock.x += xOffset;
                dataPointEO.indexLabelTextBlock.render(true);
                dataPointEO.indexLabelTextBlock.x -= xOffset;

                //if (i < 4)
                //	customPrompt(i + "; " + center.y + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));

                dataPointEO.indexLabelTextBlock.y += dataPointEO.indexLabelTextBlock.height / 2;

                if (dataPointEO.indexLabelPlacement === "outside") {
                    var indexLabelLineStartX = dataPointEO.center.x + outerRadius * Math.cos(dataPointEO.midAngle);
                    var indexLabelLineStartY = dataPointEO.center.y + outerRadius * Math.sin(dataPointEO.midAngle);

                    //ctx.strokeStyle = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];
                    ctx.strokeStyle = dataPointEO.indexLabelLineColor;
                    ctx.lineWidth = dataPointEO.indexLabelLineThickness;
                    //ctx.lineWidth = 4;
                    ctx.beginPath();
                    ctx.moveTo(indexLabelLineStartX, indexLabelLineStartY);
                    ctx.lineTo(dataPointEO.indexLabelTextBlock.x, dataPointEO.indexLabelTextBlock.y);
                    ctx.lineTo(dataPointEO.indexLabelTextBlock.x + (dataPointEO.hemisphere === "left" ? -indexLabelLineEdgeLength : indexLabelLineEdgeLength), dataPointEO.indexLabelTextBlock.y);
                    ctx.stroke();
                    //ctx.closePath();
                    //window.alert("contine??");
                    //animate();
                }

                ctx.lineJoin = "miter";
            }
        }

        function animate() {

            var ctx = _this.plotArea.ctx;

            if (animationParameter !== null && animationParameter.frame < animationParameter.maxFrames) {
                if (animationParameter.frame === 0)
                    animationParameter.prevMaxAngle = dataPointEOs[0].startAngle;

                ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

                var maxAngle = animationParameter.prevMaxAngle + (2 * Math.PI / animationParameter.maxFrames);

                for (var i = 0; i < dataPoints.length; i++) {

                    var startAngle = i === 0 ? dataPointEOs[i].startAngle : endAngle;
                    var endAngle = startAngle + (dataPointEOs[i].endAngle - dataPointEOs[i].startAngle);

                    var shouldBreak = false;

                    if (endAngle > maxAngle) {
                        endAngle = maxAngle;
                        shouldBreak = true;
                    }

                    var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                    if (endAngle > startAngle)
                        drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle);

                    if (shouldBreak)
                        break;
                }

                animationParameter.frame++;
                animationParameter.prevMaxAngle = maxAngle;

                if (animationParameter.frame < animationParameter.maxFrames) {
                    _this.animationRequestId = _this.requestAnimFrame.call(window, animate);
                } else {
                    //renderLabels();
                    resetAnimationFrame(isCanvasSupported ? 15 : 4);
                    explodeToggle();
                }

                //console.log(animationParameter.frame);

            }
        }

        function explodeToggle() {

            var ctx = _this.plotArea.ctx;
            var prevEndAngle = 0;

            if (animationParameter !== null && animationParameter.frame < animationParameter.maxFrames) {

                ctx.clearRect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);

                //var maxAngle = animationParameter.prevMaxAngle + (2 * Math.PI / animationParameter.maxFrames);

                for (var i = 0; i < dataPoints.length; i++) {

                    var startAngle = dataPointEOs[i].startAngle;
                    var endAngle = dataPointEOs[i].endAngle;

                    if (endAngle > startAngle) {


                        var offsetX = (outerRadius * .07 * Math.cos(dataPointEOs[i].midAngle));
                        var offsetY = (outerRadius * .07 * Math.sin(dataPointEOs[i].midAngle));
                        var isInTransition = false;

                        if (dataPoints[i].exploded) {
                            if (Math.abs(dataPointEOs[i].center.x - (center.x + offsetX)) > Math.abs(.5 * offsetX / animationParameter.maxFrames) || Math.abs(dataPointEOs[i].center.y - (center.y + offsetY)) > Math.abs(.5 * offsetY / animationParameter.maxFrames)) {
                                dataPointEOs[i].center.x += (offsetX / animationParameter.maxFrames);
                                dataPointEOs[i].center.y += (offsetY / animationParameter.maxFrames);

                                isInTransition = true;
                            }
                        } else if (Math.abs(dataPointEOs[i].center.x - center.x) > Math.abs(.5 * offsetX / animationParameter.maxFrames) || Math.abs(dataPointEOs[i].center.y - center.y) > Math.abs(.5 * offsetY / animationParameter.maxFrames)) {
                            dataPointEOs[i].center.x -= (offsetX / animationParameter.maxFrames);
                            dataPointEOs[i].center.y -= (offsetY / animationParameter.maxFrames);
                            isInTransition = true;
                        }

                        if (isInTransition) {
                            var entry = {};
                            entry.dataSeries = dataSeries;
                            entry.dataPoint = dataSeries.dataPoints[i];
                            entry.index = i;
                            _this._toolTip.highlightObjects([entry]);
                        }

                        var color = dataPoints[i].color ? dataPoints[i].color : dataSeries._colorSet[i % dataSeries._colorSet.length];

                        drawSegment(_this.plotArea.ctx, dataPointEOs[i].center, dataPointEOs[i].radius, color, dataSeries.type, startAngle, endAngle);
                    }
                }

                animationParameter.frame++;

                //window.alert("next??");
                renderLabels();

                //ctx.lineWidth = 4;

                if (animationParameter.frame < animationParameter.maxFrames) {
                    _this.animationRequestId = _this.requestAnimFrame.call(window, explodeToggle);
                }


                //console.log(animationParameter.frame);

            }
        }

        function areDataPointsTooClose(first, second) {

            var label1 = { x1: first.indexLabelTextBlock.x, y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2, x2: first.indexLabelTextBlock.x + first.indexLabelTextBlock.width, y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2 };
            var label2 = { x1: second.indexLabelTextBlock.x, y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2, x2: second.indexLabelTextBlock.x + second.indexLabelTextBlock.width, y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2 };

            if (label1.x2 < label2.x1 - indexLabelLineEdgeLength || label1.x1 > label2.x2 + indexLabelLineEdgeLength || label1.y1 > label2.y2 + indexLabelLineEdgeLength || label1.y2 < label2.y1 - indexLabelLineEdgeLength)
                return false;

            return true;
        }

        function getVerticalDistanceBetweenLabels(first, second) {

            var distance = 0;
            var label1 = { y: first.indexLabelTextBlock.y, y1: first.indexLabelTextBlock.y - first.indexLabelTextBlock.height / 2, y2: first.indexLabelTextBlock.y + first.indexLabelTextBlock.height / 2 };
            var label2 = { y: second.indexLabelTextBlock.y, y1: second.indexLabelTextBlock.y - second.indexLabelTextBlock.height / 2, y2: second.indexLabelTextBlock.y + second.indexLabelTextBlock.height / 2 };

            if (label2.y > label1.y) {
                distance = label2.y1 - label1.y2;
            }
            else {
                distance = label1.y1 - label2.y2;
            }

            return distance;
        }

        function getNextLabelIndex(currentLabelIndex) {
            var nextLabelIndex = null;

            for (var i = 1; i < dataPoints.length; i++) {

                nextLabelIndex = (currentLabelIndex + i + dataPointEOs.length) % dataPointEOs.length;

                if (dataPointEOs[nextLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
                    nextLabelIndex = null;
                    break;
                }
                else if ((dataPointEOs[nextLabelIndex].indexLabelText) && (nextLabelIndex !== currentLabelIndex)
					&& ((getVerticalDistanceBetweenLabels(dataPointEOs[nextLabelIndex], dataPointEOs[currentLabelIndex]) < 0) || (dataPointEOs[currentLabelIndex].hemisphere === "right" ? dataPointEOs[nextLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[nextLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y)))
                    break;
                else {
                    nextLabelIndex = null;
                }
            }

            return nextLabelIndex;
        }

        function getPreviousLabelIndex(currentLabelIndex) {
            var prevLabelIndex = null;

            for (var i = 1; i < dataPoints.length; i++) {

                prevLabelIndex = (currentLabelIndex - i + dataPointEOs.length) % dataPointEOs.length;

                if (dataPointEOs[prevLabelIndex].hemisphere !== dataPointEOs[currentLabelIndex].hemisphere) {
                    prevLabelIndex = null;
                    break;
                }
                else if ((dataPointEOs[prevLabelIndex].indexLabelText) && (dataPointEOs[prevLabelIndex].hemisphere === dataPointEOs[currentLabelIndex].hemisphere) && (prevLabelIndex !== currentLabelIndex)
					&& ((getVerticalDistanceBetweenLabels(dataPointEOs[prevLabelIndex], dataPointEOs[currentLabelIndex]) < 0) || (dataPointEOs[currentLabelIndex].hemisphere === "right" ? dataPointEOs[prevLabelIndex].indexLabelTextBlock.y <= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y : dataPointEOs[prevLabelIndex].indexLabelTextBlock.y >= dataPointEOs[currentLabelIndex].indexLabelTextBlock.y)))
                    break;
                else {
                    prevLabelIndex = null;
                }

            }

            return prevLabelIndex;
        }

        function rePositionLabels(dataPointIndex, offset) {

            offset = offset || 0;

            var actualOffset = 0;

            //var labelYMin = 2;
            //var labelYMax = ctx.canvas.height - 2;
            //var labelYMin = _this.plotArea.ctx.canvas.height / 2 - indexLabelRadius * 1;
            //var labelYMax = _this.plotArea.ctx.canvas.height / 2 + indexLabelRadius * 1;

            var labelYMin = center.y - indexLabelRadius * 1;
            var labelYMax = center.y + indexLabelRadius * 1;

            //console.log(totalRecursions);

            if (dataPointIndex >= 0 && dataPointIndex < dataPoints.length) {

                var dataPointEO = dataPointEOs[dataPointIndex];

                //if (dataPointIndex === 0)
                //	customPrompt(labelYMin.toFixed(2) + "; " + labelYMax.toFixed(2) + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));

                // If label is already outside the bounds, return
                if ((offset < 0 && dataPointEO.indexLabelTextBlock.y < labelYMin) || (offset > 0 && dataPointEO.indexLabelTextBlock.y > labelYMax))
                    return 0;


                var validOffset = offset;


                //Check if the offset falls within the bounds (labelYMin, labelYMax, tangential bounds) without considering overlap. Else use the closest offset that is possible - validOffset.
                {
                    var distFromIndexLineStart = 0;
                    var indexLabelLineStartX = 0;
                    var indexLabelLineStartY = 0;
                    var indexLabelAngle = 0;
                    var indexLabelAngleWhenTangent = 0;

                    if (validOffset < 0) {
                        if (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 > labelYMin && dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset < labelYMin)
                            validOffset = -(labelYMin - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 + validOffset));
                    } else {
                        if (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMin && dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset > labelYMax)
                            validOffset = (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + validOffset) - labelYMax;
                    }

                    var newlabelY = dataPointEO.indexLabelTextBlock.y + validOffset;
                    var newlabelX = 0;

                    if (dataPointEO.hemisphere === "right") {
                        newlabelX = center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));
                    }
                    else
                        newlabelX = center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newlabelY - center.y, 2));


                    indexLabelLineStartX = center.x + outerRadius * Math.cos(dataPointEO.midAngle);
                    indexLabelLineStartY = center.y + outerRadius * Math.sin(dataPointEO.midAngle);

                    distFromIndexLineStart = Math.sqrt(Math.pow(newlabelX - indexLabelLineStartX, 2) + Math.pow(newlabelY - indexLabelLineStartY, 2));

                    indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius);

                    //indexLabelAngle = Math.acos((outerRadius * outerRadius + distFromIndexLineStart * distFromIndexLineStart - indexLabelRadius * indexLabelRadius) / (2 * outerRadius * distFromIndexLineStart));
                    indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));

                    if (indexLabelAngle < indexLabelAngleWhenTangent) {
                        validOffset = newlabelY - dataPointEO.indexLabelTextBlock.y;
                        //dataPointEO.indexLabelTextBlock.x = newlabelX;
                    }
                    else {

                        validOffset = 0;

                        //dataPointEO.indexLabelTextBlock.x = newlabelX;

                        //Index Line is overlapping the pie. So lets find out the point where indexline becomes a tangent.

                        //distFromIndexLineStart = Math.sqrt(indexLabelRadius * indexLabelRadius - outerRadius * outerRadius);
                        ////distFromIndexLineStart *= offset < 0 ? -1 : 1;
                        ////indexLabelAngle = Math.acos((indexLabelRadius * indexLabelRadius + outerRadius * outerRadius - distFromIndexLineStart * distFromIndexLineStart) / (2 * outerRadius * indexLabelRadius));
                        //indexLabelAngle = Math.atan2(distFromIndexLineStart, outerRadius);

                        //newlabelX = center.x + indexLabelRadius * Math.cos(indexLabelAngle);
                        //newlabelY = center.y + indexLabelRadius * Math.sin(indexLabelAngle);

                        //actualOffset = newlabelY - dataPointEO.indexLabelTextBlock.y;

                        //dataPointEO.indexLabelTextBlock.y = newlabelY;
                        //dataPointEO.indexLabelTextBlock.x = newlabelX;

                    }
                }

                //var tempIndex = (dataPointIndex + dataPointEOs.length - 1) % dataPointEOs.length;

                //var prevDataPointIndex = dataPointEOs[tempIndex].hemisphere === dataPointEO.hemisphere ? tempIndex : null;

                var prevDataPointIndex = getPreviousLabelIndex(dataPointIndex);

                //tempIndex = (dataPointIndex + dataPointEOs.length + 1) % dataPointEOs.length;

                //var nextDataPointIndex = dataPointEOs[tempIndex].hemisphere === dataPointEO.hemisphere ? tempIndex : null;

                var nextDataPointIndex = getNextLabelIndex(dataPointIndex);

                var otherdataPointEO, otherDataPointIndex, distanceFromOtherLabel;
                var otherDataPointOffset = 0;
                var otherDataPointActualOffset = 0;


                if (validOffset < 0) {

                    otherDataPointIndex = dataPointEO.hemisphere === "right" ? prevDataPointIndex : nextDataPointIndex;

                    actualOffset = validOffset;

                    if (otherDataPointIndex !== null) {

                        //if (dataPointIndex < 4)
                        //	customPrompt("valid: " + validOffset);

                        var tempOffset = -validOffset;

                        var distanceFromOtherLabel = (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2) - (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y + dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2);

                        if (distanceFromOtherLabel - tempOffset < minDistanceBetweenLabels) {
                            otherDataPointOffset = -tempOffset;
                            totalRecursions++;
                            otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset);

                            //if (dataPointIndex < 4)
                            //	customPrompt(dataPointIndex + "; " + "offset: " + otherDataPointOffset);


                            if (+otherDataPointActualOffset.toFixed(precision) > +otherDataPointOffset.toFixed(precision)) {

                                if (distanceFromOtherLabel > minDistanceBetweenLabels)
                                    actualOffset = -(distanceFromOtherLabel - minDistanceBetweenLabels);
                                    //else
                                    //	actualOffset = 0;
                                else
                                    actualOffset = -(tempOffset - (otherDataPointActualOffset - otherDataPointOffset));
                            }

                            //if (dataPointIndex < 4)
                            //	customPrompt("actual: " + actualOffset);
                        }

                    }

                } else if (validOffset > 0) {

                    otherDataPointIndex = dataPointEO.hemisphere === "right" ? nextDataPointIndex : prevDataPointIndex;

                    actualOffset = validOffset;

                    if (otherDataPointIndex !== null) {

                        var tempOffset = validOffset;

                        var distanceFromOtherLabel = (dataPointEOs[otherDataPointIndex].indexLabelTextBlock.y - dataPointEOs[otherDataPointIndex].indexLabelTextBlock.height / 2) - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);

                        if (distanceFromOtherLabel - tempOffset < minDistanceBetweenLabels) {
                            otherDataPointOffset = tempOffset;
                            totalRecursions++;
                            otherDataPointActualOffset = rePositionLabels(otherDataPointIndex, otherDataPointOffset);

                            if (+otherDataPointActualOffset.toFixed(precision) < +otherDataPointOffset.toFixed(precision)) {

                                if (distanceFromOtherLabel > minDistanceBetweenLabels)
                                    actualOffset = distanceFromOtherLabel - minDistanceBetweenLabels;
                                    //else
                                    //	actualOffset = 0;
                                else
                                    actualOffset = tempOffset - (otherDataPointOffset - otherDataPointActualOffset);
                            }
                        }

                    }

                    //if (!(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + actualOffset < labelYMax)) {
                    //	if (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 < labelYMax) {
                    //		actualOffset = labelYMax - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2);
                    //	}
                    //	else {
                    //		actualOffset = 0;
                    //	}
                    //}

                }

                if (actualOffset) {

                    var newLabelY = dataPointEO.indexLabelTextBlock.y + actualOffset;




                    var newLabelX = 0;

                    if (dataPointEO.hemisphere === "right") {
                        newLabelX = center.x + Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));
                    }
                    else
                        newLabelX = center.x - Math.sqrt(Math.pow(indexLabelRadius, 2) - Math.pow(newLabelY - center.y, 2));

                    if (dataPointEO.midAngle > (Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (Math.PI / 2) + poleAnglularDistance) {

                        var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
                        var prevDP = dataPointEOs[prevDPIndex];
                        var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];

                        if (dataPointEO.hemisphere === "left" && prevDP.hemisphere === "right" && newLabelX > prevDP.indexLabelTextBlock.x) {
                            newLabelX = prevDP.indexLabelTextBlock.x - 15;
                        } else if (dataPointEO.hemisphere === "right" && nextDP.hemisphere === "left" && newLabelX < nextDP.indexLabelTextBlock.x) {
                            newLabelX = nextDP.indexLabelTextBlock.x + 15;
                        }
                    } else if (dataPointEO.midAngle > (3 * Math.PI / 2) - poleAnglularDistance && dataPointEO.midAngle < (3 * Math.PI / 2) + poleAnglularDistance) {

                        var prevDPIndex = (dataPointIndex - 1 + dataPointEOs.length) % dataPointEOs.length;
                        var prevDP = dataPointEOs[prevDPIndex];
                        var nextDP = dataPointEOs[(dataPointIndex + 1 + dataPointEOs.length) % dataPointEOs.length];

                        if (dataPointEO.hemisphere === "right" && prevDP.hemisphere === "left" && newLabelX < prevDP.indexLabelTextBlock.x) {
                            newLabelX = prevDP.indexLabelTextBlock.x + 15;
                        } else if (dataPointEO.hemisphere === "left" && nextDP.hemisphere === "right" && newLabelX > nextDP.indexLabelTextBlock.x) {
                            newLabelX = nextDP.indexLabelTextBlock.x - 15;
                        }
                    }

                    //if (actualOffset < 0 && dataPointIndex < 4)
                    //	customPrompt(actualOffset.toFixed(2) + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2) + "; " + newLabelY.toFixed(2));

                    dataPointEO.indexLabelTextBlock.y = newLabelY;

                    dataPointEO.indexLabelTextBlock.x = newLabelX;

                    dataPointEO.indexLabelAngle = Math.atan2((dataPointEO.indexLabelTextBlock.y - center.y), (dataPointEO.indexLabelTextBlock.x - center.x));

                }


            }

            return actualOffset;
        }


        function positionLabels() {
            var ctx = _this.plotArea.ctx;

            ctx.fillStyle = "grey";
            ctx.strokeStyle = "grey";
            var fontSize = 16;
            ctx.font = fontSize + "px Arial";
            ctx.textBaseline = "middle";
            var i = 0, j = 0;
            var deltaR = 0;

            for (j = 0; j < 10 && (j < 1 || deltaR > 0) ; j++) {

                //console.log(j);
                outerRadius -= deltaR;
                //indexLabelRadius -= deltaR + deltaR;

                deltaR = 0;

                if (dataSeries.indexLabelPlacement === "outside") {

                    indexLabelRadius = outerRadius * indexLabelRadiusToRadiusRatio;

                    for (i = 0; i < dataPoints.length; i++) {
                        var dataPointEO = dataPointEOs[i];

                        dataPointEO.indexLabelTextBlock.x = center.x + indexLabelRadius * Math.cos(dataPointEO.midAngle);
                        dataPointEO.indexLabelTextBlock.y = center.y + indexLabelRadius * Math.sin(dataPointEO.midAngle);

                        dataPointEO.indexLabelAngle = dataPointEO.midAngle;
                        dataPointEO.radius = outerRadius;
                        //dataPointEO.indexLabelFontSize = dataPoint.indexLabelFontSize ? dataPoint.indexLabelFontSize : dataSeries.indexLabelFontSize;
                    }

                    var currentDataPoint, nextDataPoint;
                    for (i = 0; i < dataPoints.length; i++) {

                        var dataPointEO = dataPointEOs[i];
                        //dataPointEO.lab
                        //resetAnimationFrame();
                        //animate();
                        //renderLabels();

                        //var prevDataPointIndex = (i - 1 + dataPointEOs.length) % dataPointEOs.length;

                        //var nextDataPointIndex = (i + 1 + dataPointEOs.length) % dataPointEOs.length;
                        //nextDataPointIndex = dataPointEOs[nextDataPointIndex].hemisphere === dataPointEO.hemisphere && nextDataPointIndex !== i ? nextDataPointIndex : null;

                        var nextDataPointIndex = getNextLabelIndex(i);

                        if (nextDataPointIndex === null)
                            continue;

                        currentDataPoint = dataPointEOs[i];
                        nextDataPoint = dataPointEOs[nextDataPointIndex];


                        var distanceFromNextLabel = 0;

                        //if (dataPointEO.hemisphere === "right")
                        //	distanceFromNextLabel = (nextDataPoint.indexLabelTextBlock.y - nextDataPoint.indexLabelTextBlock.height / 2) - (currentDataPoint.indexLabelTextBlock.y + currentDataPoint.indexLabelTextBlock.height / 2) - minDistanceBetweenLabels;
                        //else
                        //	distanceFromNextLabel = (currentDataPoint.indexLabelTextBlock.y - currentDataPoint.indexLabelTextBlock.height / 2) - (nextDataPoint.indexLabelTextBlock.y + nextDataPoint.indexLabelTextBlock.height / 2) - minDistanceBetweenLabels;

                        distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint) - minDistanceBetweenLabels;


                        if (distanceFromNextLabel < 0) {

                            var dataPointsAbove = 0;
                            var dataPointsBelow = 0;
                            //var indexLabelAngleWhenTangent = Math.acos(outerRadius / indexLabelRadius) / Math.PI * 180;


                            for (var k = 0; k < dataPoints.length; k++) {

                                if (k === i)
                                    continue;

                                //if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].midAngle - dataPointEO.midAngle) > 30)
                                //	continue;
                                //if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].labelAngle - dataPointEO.indexLabelAngle) > 30)
                                //	continue;
                                //if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere || Math.abs(dataPointEOs[k].midAngle - dataPointEO.midAngle) > indexLabelAngleWhenTangent)
                                //	continue;
                                if (dataPointEOs[k].hemisphere !== dataPointEO.hemisphere)
                                    continue;

                                if (dataPointEOs[k].indexLabelTextBlock.y < dataPointEO.indexLabelTextBlock.y)
                                    dataPointsAbove++;
                                else
                                    dataPointsBelow++;
                            }

                            //var upWardsOffset = (distanceFromNextLabel) / dataPoints.length * (dataPointsBelow);
                            var upWardsOffset = (distanceFromNextLabel) / (dataPointsAbove + dataPointsBelow || 1) * (dataPointsBelow);
                            var downWardsOffset = -1 * (distanceFromNextLabel - upWardsOffset);

                            var actualUpwardOffset = 0;
                            var actualDownwardOffset = 0;

                            if (dataPointEO.hemisphere === "right") {
                                actualUpwardOffset = rePositionLabels(i, upWardsOffset);

                                //if (i < 4 && actualDownwardOffset !== upWardsOffset)
                                //	customPrompt(i + "; " + upWardsOffset.toFixed(2) + "; " + actualUpwardOffset.toFixed(2));


                                downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);

                                actualDownwardOffset = rePositionLabels(nextDataPointIndex, downWardsOffset);

                                //window.alert(typeof +downWardsOffset.toFixed(precision));
                                //Setting precision to make sure that they don't become not equal become of minor differences - like a difference of .000001
                                if (+actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision))
                                    rePositionLabels(i, -(downWardsOffset - actualDownwardOffset));

                            } else {
                                actualUpwardOffset = rePositionLabels(nextDataPointIndex, upWardsOffset);

                                downWardsOffset = -1 * (distanceFromNextLabel - actualUpwardOffset);

                                actualDownwardOffset = rePositionLabels(i, downWardsOffset);

                                //Setting precision to make sure that they don't become not equal become of minor differences - like a difference of .000001
                                if (+actualDownwardOffset.toFixed(precision) < +downWardsOffset.toFixed(precision) && +actualUpwardOffset.toFixed(precision) <= +upWardsOffset.toFixed(precision))
                                    rePositionLabels(nextDataPointIndex, -(downWardsOffset - actualDownwardOffset));
                            }
                        }


                        //resetAnimationFrame();
                        //animate();
                        //renderLabels();
                        //window.alert("next??");
                    }
                } else {
                    for (i = 0; i < dataPoints.length; i++) {

                        var dataPointEO = dataPointEOs[i];
                        indexLabelRadius = dataSeries.type === "pie" ? outerRadius * .7 : outerRadius * .8;


                        var dx = center.x + indexLabelRadius * (Math.cos((dataPointEO.midAngle)));
                        var dy = center.y + indexLabelRadius * (Math.sin((dataPointEO.midAngle)));

                        dataPointEO.indexLabelTextBlock.x = dx;
                        dataPointEO.indexLabelTextBlock.y = dy;
                    }
                }

                // Resize Pie based on the label length.
                for (i = 0; i < dataPoints.length; i++) {

                    dataPointEO = dataPointEOs[i];

                    var size = dataPointEO.indexLabelTextBlock.measureText();

                    // To make sure that null text or empty strings don't affect the radius. Required when user is not showing any labels
                    if (size.height === 0 || size.width === 0)
                        continue;

                    var xOverFlow = 0;
                    var xdr = 0;

                    if (dataPointEO.hemisphere === "right") {
                        xOverFlow = plotArea.x2 - (dataPointEO.indexLabelTextBlock.x + dataPointEO.indexLabelTextBlock.width + indexLabelLineEdgeLength);
                        xOverFlow *= -1;
                    } else {
                        xOverFlow = plotArea.x1 - (dataPointEO.indexLabelTextBlock.x - dataPointEO.indexLabelTextBlock.width - indexLabelLineEdgeLength);
                    }

                    if (xOverFlow > 0) {
                        if (Math.abs(dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius
							|| Math.abs(dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 - center.y) < outerRadius) {

                            xdr = xOverFlow / Math.abs(Math.cos(dataPointEO.indexLabelAngle));

                            if (xdr > 9)
                                xdr = xdr * .3;

                            if (xdr > deltaR)
                                deltaR = xdr;

                        } else {

                        }
                    }

                    var yOverFlow = 0;
                    var ydr = 0;

                    if (dataPointEO.indexLabelAngle > 0 && dataPointEO.indexLabelAngle < Math.PI) {
                        yOverFlow = plotArea.y2 - (dataPointEO.indexLabelTextBlock.y + dataPointEO.indexLabelTextBlock.height / 2 + 5);
                        yOverFlow *= -1;
                    } else {
                        yOverFlow = plotArea.y1 - (dataPointEO.indexLabelTextBlock.y - dataPointEO.indexLabelTextBlock.height / 2 - 5);
                    }

                    if (yOverFlow > 0) {
                        if (Math.abs(dataPointEO.indexLabelTextBlock.x - center.x) < outerRadius) {

                            ydr = yOverFlow / Math.abs(Math.sin(dataPointEO.indexLabelAngle));

                            if (ydr > 9)
                                ydr = ydr * .3;

                            if (ydr > deltaR)
                                deltaR = ydr;

                        } else {

                        }
                    } else {
                        //if (i < 4)
                        //	customPrompt(i + "; " + center.y + "; " + dataPointEO.indexLabelTextBlock.y.toFixed(2));
                    }

                }

                function removeLabelsForSmallSegments(totalOverlap, startIndex, endIndex) {

                    //return;

                    var dpEOs = [];
                    var totalRemovedLabelHeight = 0;

                    for (var i = startIndex; true; i = (i + 1 + dataPoints.length) % dataPoints.length) {
                        dpEOs.push(dataPointEOs[i]);

                        if (i === endIndex)
                            break;
                    }

                    dpEOs.sort(function (entry1, entry2) {
                        return entry1.y - entry2.y;
                    });

                    for (i = 0; i < dpEOs.length; i++) {
                        var dpEO = dpEOs[i];

                        if (totalRemovedLabelHeight < totalOverlap) {
                            totalRemovedLabelHeight += dpEO.indexLabelTextBlock.height;
                            dpEO.indexLabelTextBlock.text = "";
                            dpEO.indexLabelText = "";
                            dpEO.indexLabelTextBlock.measureText();
                        } else
                            break;
                    }

                }

                //resetAnimationFrame(1);
                //animate();
                //window.alert("next??");

                var overlapStartIndex = -1;
                var overlapEndIndex = -1;
                var totalOverlap = 0;

                for (var k = 0; k < dataPoints.length; k++) {
                    currentDataPoint = dataPointEOs[k];

                    if (!currentDataPoint.indexLabelText)
                        continue;

                    var nextLabelIndex = getNextLabelIndex(k);
                    if (nextLabelIndex === null)
                        continue;

                    var nextDataPoint = dataPointEOs[nextLabelIndex];

                    distanceFromNextLabel = 0;

                    //if (nextDataPoint.indexLabelTextBlock.y > currentDataPoint.indexLabelTextBlock.y)
                    //	distanceFromNextLabel = (nextDataPoint.indexLabelTextBlock.y - (nextDataPoint.indexLabelTextBlock.height / 2)) - (currentDataPoint.indexLabelTextBlock.y + (currentDataPoint.indexLabelTextBlock.height / 2));
                    //else
                    //	distanceFromNextLabel = (currentDataPoint.indexLabelTextBlock.y - (currentDataPoint.indexLabelTextBlock.height / 2)) - (nextDataPoint.indexLabelTextBlock.y + (nextDataPoint.indexLabelTextBlock.height / 2));

                    distanceFromNextLabel = getVerticalDistanceBetweenLabels(currentDataPoint, nextDataPoint);

                    if (distanceFromNextLabel < 0 && areDataPointsTooClose(currentDataPoint, nextDataPoint)) {

                        if (overlapStartIndex < 0)
                            overlapStartIndex = k;

                        if (nextLabelIndex !== overlapStartIndex)
                            overlapEndIndex = nextLabelIndex;

                        totalOverlap += -distanceFromNextLabel;

                        //nextDataPoint.indexLabelText = "";
                        //nextDataPoint.indexLabelTextBlock.text = "";
                        //nextDataPoint.indexLabelTextBlock.measureText();
                    } else {

                        if (totalOverlap > 0) {
                            removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);

                            overlapStartIndex = -1;
                            overlapEndIndex = -1;
                            totalOverlap = 0;
                        }
                    }

                }

                if (totalOverlap > 0)
                    removeLabelsForSmallSegments(totalOverlap, overlapStartIndex, overlapEndIndex);

            }
            //window.alert("next??");

            //maxFrame = 50;
            resetAnimationFrame(_this.animationEnabled && _this.renderCount === 0 ? isCanvasSupported ? 60 : 30 : 1);
            //resetAnimationFrame(1);
            animate();
            //window.alert("next?");
            //renderLabels();

            //console.log("totalRecursions: " + totalRecursions);
        }

        this.pieDoughnutClickHandler = function (e) {

            if (animationParameter.frame !== animationParameter.maxFrames) {
                return;
            }

            var i = e.dataPointIndex;
            var dataPoint = e.dataPoint;
            var dataSeries = this;


            var id = dataSeries.dataPointIds[i];

            //dataPointEO = _this._eventManager.objectMap[id];

            if (dataPoint.exploded)
                dataPoint.exploded = false;
            else
                dataPoint.exploded = true;

            //resetAnimationFrame(_this.animationEnabled ? isCanvasSupported ? 15 : 4 : 1);
            resetAnimationFrame(isCanvasSupported ? 15 : 4);

            // So that it doesn't try to explode when there is only one segment
            if (dataSeries.dataPoints.length > 1)
                explodeToggle();

            return;
        }

        initLabels();

        //resetAnimationFrame();
        positionLabels();

        //this.ctx.strokeRect(plotArea.x1 + 1, plotArea.y1, plotArea.width - 2, plotArea.height);
    }

    //var continuePrompt = true;
    //function customPrompt(msg) {
    //	if (!continuePrompt)
    //		return;

    //	var result = prompt("Custom Prompt", msg);

    //	if (result !== null)
    //		continuePrompt = true;
    //	else
    //		continuePrompt = false;
    //}

    //#endregion pieChart

    //#endregion Render Methods
    Chart.prototype.animationRequestId = null;

    Chart.prototype.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
				    window.setTimeout(callback, 1000 / 60);
				};
    })();

    Chart.prototype.cancelRequestAnimFrame = (function () {
        return window.cancelAnimationFrame ||
			window.webkitCancelRequestAnimationFrame ||
			window.mozCancelRequestAnimationFrame ||
			window.oCancelRequestAnimationFrame ||
			window.msCancelRequestAnimationFrame ||
			clearTimeout
    })();

    //#endregion Class Chart

    //#region Class LayoutManager
    function LayoutManager(chart) {

        this._topOccupied = 0;
        this._bottomOccupied = 0;
        this._leftOccupied = 0;
        this._rightOccupied = 0;
        this.chart = chart;
    }

    LayoutManager.prototype.registerSpace = function (position, size) {
        if (position === "top") {
            this._topOccupied += size.height;
        }
        else if (position === "bottom") {
            this._bottomOccupied += size.height;
        } else if (position === "left") {
            this._leftOccupied += size.width; // this is width when seen upright/vertically
        } else if (position === "right") {
            this._rightOccupied += size.width;// this is width when seen upright/vertically
        }
    }

    LayoutManager.prototype.unRegisterSpace = function (position, size) {
        if (position === "top") {
            this._topOccupied -= size.height;
        }
        else if (position === "bottom") {
            this._bottomOccupied -= size.height;
        } else if (position === "left") {
            this._leftOccupied -= size.width;// this is width when seen upright/vertically
        } else if (position === "right") {
            this._rightOccupied -= size.width;// this is width when seen upright/vertically
        }
    }

    LayoutManager.prototype.getFreeSpace = function () {
        ///<signature>
        ///<summary>Returns available free space {x1:number, y1:number, x2:number, y2:number}</summary>
        ///</signature>

        return {
            x1: this._leftOccupied,
            y1: this._topOccupied,
            x2: this.chart.width - this._rightOccupied,
            y2: this.chart.height - this._bottomOccupied,
            width: (this.chart.width - this._rightOccupied) - this._leftOccupied,
            height: (this.chart.height - this._bottomOccupied) - this._topOccupied
        };
    }

    LayoutManager.prototype.reset = function () {
        this._topOccupied = 0;
        this._bottomOccupied = 3;//so that there is enough padding in the bottom.
        this._leftOccupied = 0;
        this._rightOccupied = 0;
    }
    //#endregion Class LayoutManager

    //#region Class TextBlock
    function TextBlock(ctx, options) {
        TextBlock.parent.constructor.call(this, "TextBlock", options);

        this.ctx = ctx;
        this._isDirty = true;
        this._wrappedText = null;
        this._lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
    }
    extend(TextBlock, CanvasJSObject);
    TextBlock.prototype.render = function (preserveContext) {
        if (preserveContext)
            this.ctx.save();

        var font = this.ctx.font;
        this.ctx.textBaseline = this.textBaseline;

        var offsetY = 0;

        if (this._isDirty)
            this.measureText(this.ctx);

        this.ctx.translate(this.x, this.y + offsetY);

        if (this.textBaseline === "middle") {
            offsetY = -this._lineHeight / 2;
        }

        this.ctx.font = this._getFontString();

        this.ctx.rotate(Math.PI / 180 * this.angle);

        var textLeft = 0;
        var textTop = this.padding;
        //var textTop = this.padding;
        var line = null;

        if ((this.borderThickness > 0 && this.borderColor) || this.backgroundColor) {
            this.ctx.roundRect(0, offsetY, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);

            //if (this.textBaseline === "middle") {
            //	//textTop += this.fontSize / 2;
            //	textTop += this._lineHeight / 2;
            //}
        }

        this.ctx.fillStyle = this.fontColor;

        for (var i = 0; i < this._wrappedText.lines.length; i++) {

            line = this._wrappedText.lines[i];
            if (this.horizontalAlign === "right")
                textLeft = this.width - line.width - this.padding;
            else if (this.horizontalAlign === "left")
                textLeft = this.padding;
            else if (this.horizontalAlign === "center")
                textLeft = (this.width - this.padding * 2) / 2 - line.width / 2 + this.padding;

            this.ctx.fillText(line.text, textLeft, textTop);

            textTop += line.height;
        }

        this.ctx.font = font;

        if (preserveContext)
            this.ctx.restore();
    }

    TextBlock.prototype.setText = function (text) {
        this.text = text;
        this._isDirty = true;
        this._wrappedText = null;
    }

    TextBlock.prototype.measureText = function () {
        if (this.maxWidth === null) {
            throw ("Please set maxWidth and height for TextBlock");
        }

        this._wrapText(this.ctx);
        this._isDirty = false;

        return { width: this.width, height: this.height }
    }

    TextBlock.prototype._getLineWithWidth = function (text, width, clipWord) {
        text = String(text);
        clipWord = clipWord || false;

        if (!text)
            return { text: "", width: 0 };

        var textWidth = 0,
			min = 0,
			max = text.length - 1,
			mid = Infinity;

        this.ctx.font = this._getFontString();

        while (min <= max) {
            mid = Math.floor((min + max) / 2);
            var tempText = text.substr(0, mid + 1);

            textWidth = this.ctx.measureText(tempText).width;

            if (textWidth < width) {
                min = mid + 1;
            } else if (textWidth > width) {
                max = mid - 1;
            } else {
                break;
            }
        }

        //edge cases
        if (textWidth > width && tempText.length > 1) {
            tempText = tempText.substr(0, tempText.length - 1);
            textWidth = this.ctx.measureText(tempText).width;
        }

        var isClipped = true;

        if (tempText.length === text.length || text[tempText.length] === " ")
            isClipped = false;

        if (isClipped) {
            var resultWords = tempText.split(" ");
            if (resultWords.length > 1)
                resultWords.pop();

            tempText = resultWords.join(" ");
            textWidth = this.ctx.measureText(tempText).width;
        }

        return { text: tempText, width: textWidth };
    }

    TextBlock.prototype._wrapText = function wrapText() {
        //this.ctx.save();
        var text = new String(trimString(this.text));
        var lines = [];
        var font = this.ctx.font; // Save the current Font
        var height = 0;
        var width = 0;

        this.ctx.font = this._getFontString();

        while (text.length > 0) {

            var maxWidth = this.maxWidth - this.padding * 2;
            var maxHeight = this.maxHeight - this.padding * 2;

            var line = this._getLineWithWidth(text, maxWidth, false);
            line.height = this._lineHeight;

            lines.push(line);

            width = Math.max(width, line.width);
            height += line.height;
            text = trimString(text.slice(line.text.length, text.length));

            if (maxHeight && height > maxHeight) {
                var line = lines.pop();
                height -= line.height;
            }
        }

        this._wrappedText = { lines: lines, width: width, height: height };
        this.width = width + this.padding * 2;
        this.height = height + this.padding * 2;

        this.ctx.font = font; // Restore the font
    }

    TextBlock.prototype._getFontString = function () {
        //return this.fontStyle + " " + this.fontWeight + " " + this.fontSize + "px " + this.fontFamily
        return getFontString("", this, null);
    }

    //#endregion Class TextBlock

    //#region Class Title

    function Title(chart, options) {
        Title.parent.constructor.call(this, "Title", options, chart.theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;


        if (typeof (this._options.fontSize) === "undefined") {

            this.fontSize = this.chart.getAutoFontSize(this.fontSize);

            //window.console.log("Chart Title fontSize: " + this.fontSize);
        }

        this.width = null,//read only
		this.height = null//read only
        this.bounds = { x1: null, y1: null, x2: null, y2: null };
    }

    extend(Title, CanvasJSObject);
    Title.prototype.render = function () {

        if (!this.text)
            return;

        var freespace = this.chart.layoutManager.getFreeSpace();
        var left = 0;
        var top = 0;
        var angle = 0;
        var maxWidth = 0;
        var maxHeight = 0;

        var textBlockHorizontalAlign;
        var position;

        if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
            maxWidth = freespace.width - this.margin * 2;
            maxHeight = freespace.height * .5 - this.margin * 2;
            angle = 0;
        }
        else if (this.verticalAlign === "center") {

            if (this.horizontalAlign === "left" || this.horizontalAlign === "right") {
                maxWidth = freespace.height - this.margin * 2;
                maxHeight = freespace.width * .5 - this.margin * 2;
            } else if (this.horizontalAlign === "center") {
                maxWidth = freespace.width - this.margin * 2;
                maxHeight = freespace.height * .5 - this.margin * 2;
            }
        }

        var textBlock = new TextBlock(this.ctx, {
            fontSize: this.fontSize, fontFamily: this.fontFamily, fontColor: this.fontColor,
            fontStyle: this.fontStyle, fontWeight: this.fontWeight,
            horizontalAlign: this.horizontalAlign, verticalAlign: this.verticalAlign,
            borderColor: this.borderColor, borderThickness: this.borderThickness,
            backgroundColor: this.backgroundColor,
            maxWidth: maxWidth, maxHeight: maxHeight,
            cornerRadius: this.cornerRadius,
            text: this.text,
            padding: this.padding,
            textBaseline: "top"
        });

        var textBlockSize = textBlock.measureText();

        if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {

            if (this.verticalAlign === "top") {
                top = this.margin;
                position = "top";
            }
            else if (this.verticalAlign === "bottom") {
                top = freespace.y2 - this.margin - textBlockSize.height;
                position = "bottom";
            }

            if (this.horizontalAlign === "left") {
                left = freespace.x1 + this.margin;
            }
            else if (this.horizontalAlign === "center") {
                left = freespace.x1 + (maxWidth / 2 - textBlockSize.width / 2) + this.margin;
            }
            else if (this.horizontalAlign === "right") {
                left = freespace.x2 - this.margin - textBlockSize.width;
            }

            textBlockHorizontalAlign = this.horizontalAlign;

            this.width = textBlockSize.width;
            this.height = textBlockSize.height;
        }
        else if (this.verticalAlign === "center") {

            if (this.horizontalAlign === "left") {

                left = freespace.x1 + this.margin;
                top = freespace.y2 - this.margin - (maxWidth / 2 - textBlockSize.width / 2);
                angle = -90;

                position = "left";
                this.width = textBlockSize.height;
                this.height = textBlockSize.width;
            }
            else if (this.horizontalAlign === "right") {
                left = freespace.x2 - this.margin;
                top = freespace.y1 + this.margin + (maxWidth / 2 - textBlockSize.width / 2);
                angle = 90;

                position = "right";
                this.width = textBlockSize.height;
                this.height = textBlockSize.width;
            }
            else if (this.horizontalAlign === "center") {
                top = freespace.y1 + (freespace.height / 2 - textBlockSize.height / 2);
                left = freespace.x1 + (freespace.width / 2 - textBlockSize.width / 2);

                position = "center";
                this.width = textBlockSize.width;
                this.height = textBlockSize.height;
            }

            textBlockHorizontalAlign = "center";
        }

        textBlock.x = left;
        textBlock.y = top;
        textBlock.angle = angle;
        textBlock.horizontalAlign = textBlockHorizontalAlign;
        textBlock.render(true);

        this.chart.layoutManager.registerSpace(position, { width: this.width + this.margin * 2, height: this.height + this.margin * 2 });

        this.bounds = { x1: left, y1: top, x2: left + this.width, y2: top + this.height };

        this.ctx.textBaseline = "top";
    }


    //#endregion Class Title

    //#region Legend

    //TBI: Implement Markes for Legend
    function Legend(chart, options, theme) {
        Legend.parent.constructor.call(this, "Legend", options, theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        this.ghostCtx = this.chart._eventManager.ghostCtx;
        this.items = [];

        this.width = 0,
        //this.fontSize = 12,
		this.height = 0,
		this.orientation = null,
		this.horizontalSpacing = 10;
        this.dataSeries = [];
        this.bounds = { x1: null, y1: null, x2: null, y2: null };

        if (typeof (this._options.fontSize) === "undefined") {
            this.fontSize = this.chart.getAutoFontSize(this.fontSize);
            //window.console.log("fontSize: " + this.fontSize);
        }

        this.lineHeight = getFontHeightInPixels(this.fontFamily, this.fontSize, this.fontWeight);
    }
    extend(Legend, CanvasJSObject);

    Legend.prototype.render = function () {
        var freeSpace = this.chart.layoutManager.getFreeSpace();
        var position = null;
        var top = 0;
        var left = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        var itemMargin = 5;

        var items = [];
        var rows = [];



        //this.ctx.font = getFontString("", this, null);
        //this.ctx.fontColor = this.fontColor;

        if (this.verticalAlign === "top" || this.verticalAlign === "bottom") {
            this.orientation = "horizontal";
            position = this.verticalAlign;
            maxWidth = freeSpace.width * .9;
            maxHeight = freeSpace.height * .5;
        }
        else if (this.verticalAlign === "center") {
            this.orientation = "vertical";
            position = this.horizontalAlign;

            maxWidth = freeSpace.width * .5;
            maxHeight = freeSpace.height * .9;
        }

        for (var i = 0; i < this.dataSeries.length; i++) {
            var dataSeries = this.dataSeries[i];

            var markerType = dataSeries.legendMarkerType ? dataSeries.legendMarkerType : (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter" || dataSeries.type === "bubble") && dataSeries.markerType ? dataSeries.markerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
            var legendText = dataSeries.legendText ? dataSeries.legendText : dataSeries.name;
            var markerColor = dataSeries.legendMarkerColor ? dataSeries.legendMarkerColor : dataSeries.markerColor ? dataSeries.markerColor : dataSeries._colorSet[0];
            var markerSize = (!dataSeries.markerSize && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.lineHeight * .6;
            var lineColor = dataSeries._colorSet[0];

            if (dataSeries.type !== "pie" && dataSeries.type !== "doughnut") {
                var item = {
                    markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize, lineColor: dataSeries._colorSet[0],
                    dataSeriesIndex: i, dataPointIndex: null
                };

                items.push(item);
            } else {
                for (var dataPointIndex = 0; dataPointIndex < dataSeries.dataPoints.length; dataPointIndex++) {

                    var dataPoint = dataSeries.dataPoints[dataPointIndex];

                    markerType = dataPoint.legendMarkerType ? dataPoint.legendMarkerType : dataSeries.legendMarkerType ? dataSeries.legendMarkerType : DataSeries.getDefaultLegendMarker(dataSeries.type);
                    var legendText = dataPoint.legendText ? dataPoint.legendText : dataSeries.legendText ? dataSeries.legendText : dataPoint.name ? dataPoint.name : "DataPoint: " + (dataPointIndex + 1);
                    var markerColor = dataPoint.markerColor ? dataPoint.markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[dataPointIndex % dataSeries._colorSet.length];
                    var markerSize = ((dataPoint.markerSize === 0 || (dataSeries.markerSize === 0 && !dataPoint.markerSize)) && (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline")) ? 0 : this.lineHeight * .6;

                    var item = {
                        markerType: markerType, markerColor: markerColor, text: legendText, textBlock: null, chartType: dataSeries.type, markerSize: markerSize,
                        dataSeriesIndex: i, dataPointIndex: dataPointIndex
                    };

                    items.push(item);
                }
            }

            item = null;
        }


        // Find out the required width and height of Legend and position the items relative to the container
        if (items.length > 0) {
            var row = null;
            var rowIndex = 0; // required for vertical orientation
            for (var i = 0; i < items.length; i++) {
                var item = items[i];

                if (this.orientation === "horizontal") {
                    item.textBlock = new TextBlock(this.ctx, {
                        x: 0,
                        y: 0,//TBI
                        maxWidth: maxWidth,
                        maxHeight: this.lineHeight, //TBI: FontSize
                        angle: 0,
                        text: item.text,
                        horizontalAlign: "left",//left, center, right
                        fontSize: this.fontSize,//in pixels
                        fontFamily: this.fontFamily,
                        fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
                        fontColor: this.fontColor,
                        fontStyle: this.fontStyle, // normal, italic, oblique
                        textBaseline: "top"
                    });
                    item.textBlock.measureText();


                    if (!row || row.width + item.textBlock.width + (row.width === 0 ? 0 : this.horizontalSpacing) > maxWidth) {
                        row = { items: [], width: 0 };
                        rows.push(row);
                        this.height = rows.length * (item.textBlock.height + 5);
                    }

                    item.textBlock.x = row.width;
                    item.textBlock.y = 0;

                    row.width += Math.round(item.textBlock.width + item.textBlock._lineHeight + (row.width === 0 ? 0 : item.textBlock._lineHeight * .5));
                    row.items.push(item);

                    this.width = Math.max(row.width, this.width);

                } else {
                    if (this.height + this.lineHeight < maxHeight) {
                        row = { items: [], width: 0 };
                        rows.push(row);
                        this.height = rows.length * (this.lineHeight);
                    } else {
                        row = rows[rowIndex];
                        rowIndex = (rowIndex + 1) % rows.length
                    }

                    item.textBlock = new TextBlock(this.ctx, {
                        x: 0,
                        y: 0,//TBI
                        maxWidth: maxWidth,
                        maxHeight: this.fontSize * 1.5, //TBI: FontSize
                        angle: 0,
                        text: item.text,
                        horizontalAlign: "left",//left, center, right
                        fontSize: this.fontSize,//in pixels
                        fontFamily: this.fontFamily,
                        fontWeight: this.fontWeight, //normal, bold, bolder, lighter,
                        fontColor: this.fontColor,
                        fontStyle: this.fontStyle, // normal, italic, oblique
                        textBaseline: "top"
                    });

                    item.textBlock.measureText();

                    item.textBlock.x = row.width; // relative to the row
                    item.textBlock.y = 0; // relative to the row

                    row.width += item.textBlock.width + item.textBlock._lineHeight + (row.width === 0 ? 0 : item.textBlock._lineHeight * .5);
                    row.items.push(item);

                    this.width = Math.max(row.width, this.width);
                }
            }

            this.height = rows.length * (this.lineHeight);

        }

        if (this.verticalAlign === "top") {
            if (this.horizontalAlign === "left")
                left = freeSpace.x1 + 2;
            else if (this.horizontalAlign === "right")
                left = freeSpace.x2 - this.width - 2;
            else
                left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

            top = freeSpace.y1;
        } else if (this.verticalAlign === "center") {
            if (this.horizontalAlign === "left")
                left = freeSpace.x1 + 2;
            else if (this.horizontalAlign === "right")
                left = freeSpace.x2 - this.width - 2;
            else
                left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;

            top = freeSpace.y1 + freeSpace.height / 2 - this.height / 2;
        } else if (this.verticalAlign === "bottom") {
            if (this.horizontalAlign === "left")
                left = freeSpace.x1 + 2;
            else if (this.horizontalAlign === "right")
                left = freeSpace.x2 - this.width - 2;
            else
                left = freeSpace.x1 + freeSpace.width / 2 - this.width / 2;


            top = freeSpace.y2 - this.height - 5;
        }

        this.items = items;

        //Assign ids to all legendItems
        for (var i = 0; i < this.items.length; i++) {

            var item = items[i];

            item.id = ++this.chart._eventManager.lastObjectId;
            this.chart._eventManager.objectMap[item.id] = {
                id: item.id, objectType: "legendItem", legendItemIndex: i, dataSeriesIndex: item.dataSeriesIndex, dataPointIndex: item.dataPointIndex
            };
            //delete item.textBlock;// Not Required anymore
        }

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            for (var itemIndex = 0; itemIndex < row.items.length; itemIndex++) {
                var item = row.items[itemIndex];

                var legendX = item.textBlock.x + left + (itemIndex === 0 ? markerSize * .2 : (this.lineHeight * .4) + (markerSize * .2));
                var legendY = top + (i * this.lineHeight);

                var ghostX = legendX;

                if (!this.chart.data[item.dataSeriesIndex].visible)
                    this.ctx.globalAlpha = .5;

                if (item.chartType === "line" || item.chartType === "stepLine" || item.chartType === "spline") {
                    this.ctx.strokeStyle = item.lineColor;
                    this.ctx.lineWidth = Math.ceil(this.lineHeight / 8);
                    this.ctx.beginPath();
                    this.ctx.moveTo(legendX - this.lineHeight * .1, legendY + this.lineHeight / 2);
                    this.ctx.lineTo(legendX + this.lineHeight * .7, legendY + this.lineHeight / 2);
                    this.ctx.stroke();

                    ghostX -= this.lineHeight * .1;
                }

                RenderHelper.drawMarker(legendX + markerSize / 2, legendY + (this.lineHeight / 2), this.ctx, item.markerType, markerSize, item.markerColor, null, 0);

                item.textBlock.x = legendX + Math.round(this.lineHeight * .9);
                item.textBlock.y = legendY;
                item.textBlock.render(true);

                if (!this.chart.data[item.dataSeriesIndex].visible)
                    this.ctx.globalAlpha = 1;

                var hexColor = intToHexColorString(item.id);
                this.ghostCtx.fillStyle = hexColor;
                this.ghostCtx.beginPath();
                this.ghostCtx.fillRect(ghostX, item.textBlock.y, item.textBlock.x + item.textBlock.width - ghostX, item.textBlock.height);

                item.x1 = this.chart._eventManager.objectMap[item.id].x1 = ghostX;
                item.y1 = this.chart._eventManager.objectMap[item.id].y1 = item.textBlock.y;
                item.x2 = this.chart._eventManager.objectMap[item.id].x2 = item.textBlock.x + item.textBlock.width;
                item.y2 = this.chart._eventManager.objectMap[item.id].y2 = item.textBlock.y + item.textBlock.height;
            }
        }


        //this.ctx.beginPath();
        //this.ctx.lineWidth = 2;
        //this.ctx.strokeStyle = "red";
        //this.ctx.rect(left, top, this.width, this.height);
        //this.ctx.stroke();


        this.chart.layoutManager.registerSpace(position, { width: this.width + 2 + 2, height: this.height + 5 + 5 });

        this.bounds = { x1: left, y1: top, x2: left + this.width, y2: top + this.height };
    }

    //#endregion Legend

    //#region Class PlotArea
    function PlotArea(chart, options) {
        PlotArea.parent.constructor.call(this, options);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
    }
    extend(PlotArea, CanvasJSObject);

    PlotArea.prototype.render = function () {
        var freeSpace = this.chart.layoutManager.getFreeSpace();

        this.ctx.fillStyle = "red";
        this.ctx.fillRect(freeSpace.x1, freeSpace.y1, freeSpace.x2, freeSpace.y2);
    }
    //#endregion Class PlotArea

    //#region DataSeries

    function DataSeries(chart, options, theme, index, id) {
        DataSeries.parent.constructor.call(this, "DataSeries", options, theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this._ctx = chart.canvas.ctx;
        this.index = index;
        this.noDataPointsInPlotArea = 0;
        this.maxWidthInX = 0;
        this.id = id;
        this.chart._eventManager.objectMap[id] = { id: id, objectType: "dataSeries", dataSeriesIndex: index }
        this.dataPointIds = [];

        this.axisX = null;
        this.axisY = null;

        this.axisPlacement = this.getDefaultAxisPlacement();

        if (typeof (this._options.indexLabelFontSize) === "undefined") {

            this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize);
        }
    }
    extend(DataSeries, CanvasJSObject);

    //Static Method that returns the axisPlacement for a given ChartType. Returns one of "normal", "xySwapped", "none"
    DataSeries.prototype.getDefaultAxisPlacement = function () {

        //if (!this.visible)
        //	return "none";

        //type = this.type.toLowerCase();
        var type = this.type;

        if (type === "column" || type === "line" || type === "stepLine" || type === "spline" || type === "area" || type === "stepArea" || type === "splineArea" || type === "stackedColumn" || type === "stackedLine" || type === "bubble" || type === "scatter"
			|| type === "stackedArea" || type === "stackedColumn100" || type === "stackedLine100" || type === "stackedArea100") {
            return "normal";
        }
        else if (type === "bar" || type === "stackedBar" || type === "stackedBar100") {

            return "xySwapped";
        }
        else if (type === "pie" || type === "doughnut") {
            return "none";
        } else {
            window.console.log("Unknown Chart Type: " + type);
            return null;
        }
    }

    DataSeries.getDefaultLegendMarker = function (type) {

        //type = type.toLowerCase();

        if (type === "column" || type === "stackedColumn" || type === "stackedLine" || type === "bar" || type === "stackedBar" || type === "stackedBar100"
			|| type === "bubble" || type === "scatter"
			|| type === "stackedColumn100" || type === "stackedLine100" || type === "stepArea") {
            return "square";
        }
        else if (type === "line" || type === "stepLine" || type === "spline" || type === "pie" || type === "doughnut") {
            return "circle";
        } else if (type === "area" || type === "splineArea" || type === "stackedArea" || type === "stackedArea100") {
            return "triangle"
        } else {
            window.console.log("Unknown Chart Type: " + type);
            return null;
        }
    }

    //Finds dataPoint with the given x value. If findClosest is set, finds dataPoint with closest x value. 
    //Returns searchResult object if found, else returns null
    DataSeries.prototype.getDataPointAtX = function (x, findClosest) {

        if (!this.dataPoints || this.dataPoints.length === 0) return null;

        var searchResult = { dataPoint: null, distance: Infinity, index: NaN };
        var dataPoint = null;

        var j = 0;
        var i = 0;
        var direction = 1; // +1 for foward and -1 for backward.

        var minimumXDistance = Infinity;
        var forwardMissCount = 0, backwardMissCount = 0;
        var maxMissCount = 1000;
        var searchStartIndex = 0;

        if (this.chart.plotInfo.axisPlacement !== "none") {
            var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

            if (xRange > 0)
                searchStartIndex = ((this.dataPoints.length - 1) / xRange * (x - this.dataPoints[0].x)) >> 0;
            else
                searchStartIndex = 0;

            //searchStartIndex = ((this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x) / this.dataPoints.length * (x - this.dataPoints[0].x)) >> 0;
        }

        while (true) {

            i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

            if (i >= 0 && i < this.dataPoints.length) {

                dataPoint = this.dataPoints[i];

                var distance = Math.abs(dataPoint.x - x);

                if (distance < searchResult.distance) {
                    searchResult.dataPoint = dataPoint;
                    searchResult.distance = distance;
                    searchResult.index = i;
                }

                var xDistance = Math.abs(dataPoint.x - x);
                if (xDistance <= minimumXDistance)
                    minimumXDistance = xDistance;
                else {
                    if (direction > 0)
                        forwardMissCount++;
                    else
                        backwardMissCount++;
                }

                if (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount)
                    break;


            } else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
                break;

            if (direction === -1) {
                j++;
                direction = 1;
            } else
                direction = -1;
        }


        if (!findClosest && searchResult.dataPoint.x === x)
            return searchResult;
        else if (findClosest && searchResult.dataPoint !== null)
            return searchResult;
        else
            return null;
    }

    // x & y should be in pixels. Can be used only after rendering the chart.
    DataSeries.prototype.getDataPointAtXY = function (x, y, getClosest) {

        if (!this.dataPoints || this.dataPoints.length === 0) return null;

        getClosest = getClosest || false;
        var results = [];
        var j = 0, i = 0;
        var direction = 1; // +1 for foward and -1 for backward.
        var foundDataPoint = false;
        var minimumXDistance = Infinity;
        var forwardMissCount = 0, backwardMissCount = 0;
        var maxMissCount = 1000;
        var searchStartIndex = 0;

        if (this.chart.plotInfo.axisPlacement !== "none") {
            var xval = this.chart.axisX.getXValueAt({ x: x, y: y });
            var xRange = (this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x);

            if (xRange > 0)
                searchStartIndex = ((this.dataPoints.length - 1) / xRange * (xval - this.dataPoints[0].x)) >> 0;
            else
                searchStartIndex = 0;
        }

        while (true) {

            //i = searchStartIndex + (j * direction);
            i = (direction > 0) ? searchStartIndex + j : searchStartIndex - j;

            if (i >= 0 && i < this.dataPoints.length) {

                var id = this.dataPointIds[i];
                var visualInfo = this.chart._eventManager.objectMap[id];
                var dataPoint = this.dataPoints[i];

                if (visualInfo) {

                    switch (this.type) {

                        case "column":
                        case "stackedColumn":
                        case "stackedColumn100":
                        case "bar":
                        case "stackedBar":
                        case "stackedBar100":
                            if (x >= visualInfo.x1 && x <= visualInfo.x2 && y >= visualInfo.y1 && y <= visualInfo.y2) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: Math.min(Math.abs(visualInfo.x1 - x), Math.abs(visualInfo.x2 - x), Math.abs(visualInfo.y1 - y), Math.abs(visualInfo.y2 - y))
                                    //distance:0
                                });

                                foundDataPoint = true;
                            }
                            break;

                        case "line":
                        case "stepLine":
                        case "spline":
                        case "area":
                        case "stepArea":
                        case "stackedArea":
                        case "stackedArea100":
                        case "splineArea":
                        case "scatter":
                            var markerSize = getProperty("markerSize", dataPoint, this) || 4;
                            var snapDistance = getClosest ? 20 : markerSize;

                            var distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
                            if (distance <= snapDistance) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: distance
                                });
                            }

                            var xDistance = Math.abs(visualInfo.x1 - x);
                            if (xDistance <= minimumXDistance)
                                minimumXDistance = xDistance;
                            else {
                                if (direction > 0)
                                    forwardMissCount++;
                                else
                                    backwardMissCount++;
                            }

                            if (distance <= markerSize / 2) {
                                foundDataPoint = true;
                            }

                            break;

                        case "bubble":
                            var markerSize = visualInfo.size;
                            var distance = Math.sqrt(Math.pow(visualInfo.x1 - x, 2) + Math.pow(visualInfo.y1 - y, 2));
                            if (distance <= markerSize / 2) {
                                results.push({
                                    dataPoint: dataPoint,
                                    dataPointIndex: i,
                                    dataSeries: this,
                                    distance: distance
                                });

                                foundDataPoint = true;
                            }
                            break;

                        case "pie":
                        case "doughnut":
                            var center = visualInfo.center;
                            var innerRadius = this.type === "doughnut" ? .6 * visualInfo.radius : 0;

                            var distance = Math.sqrt(Math.pow(center.x - x, 2) + Math.pow(center.y - y, 2));
                            if (distance < visualInfo.radius && distance > innerRadius) {

                                var deltaY = y - center.y;
                                var deltaX = x - center.x;
                                var angle = Math.atan2(deltaY, deltaX);

                                if (angle < 0)
                                    angle += Math.PI * 2;

                                angle = ((angle / Math.PI * 180 % 360) + 360) % 360;
                                var startAngle = ((visualInfo.startAngle / Math.PI * 180 % 360) + 360) % 360;
                                var endAngle = ((visualInfo.endAngle / Math.PI * 180 % 360) + 360) % 360;

                                //So that data point is detected when there is only one dataPoint
                                if (endAngle === 0 && visualInfo.endAngle > 1) {
                                    endAngle = 360;
                                }

                                if (startAngle > endAngle) {
                                    endAngle += 360;

                                    if (angle < startAngle)
                                        angle += 360;
                                }

                                if (angle > startAngle && angle < endAngle) {
                                    results.push({
                                        dataPoint: dataPoint,
                                        dataPointIndex: i,
                                        dataSeries: this,
                                        distance: 0
                                    });

                                    foundDataPoint = true;
                                }

                            }

                            break;

                    }

                    if (foundDataPoint || (forwardMissCount > maxMissCount && backwardMissCount > maxMissCount))
                        break;
                }

            } else if (searchStartIndex - j < 0 && searchStartIndex + j >= this.dataPoints.length)
                break;

            if (direction === -1) {
                j++;
                direction = 1;
            } else
                direction = -1;

        }



        var closestResult = null;

        for (var m = 0; m < results.length; m++) {
            if (!closestResult) {
                closestResult = results[m];
            } else if (results[m].distance <= closestResult.distance) {
                closestResult = results[m];
            }
        }

        //if (window.console && closestResult)
        //    window.console.log(j + ": distance = " + closestResult.distance);

        return closestResult;
    }

    DataSeries.prototype.getMarkerProperties = function (index, x, y, ctx) {
        var dataPoints = this.dataPoints;
        var dataSeries = this;

        var markerColor = dataPoints[index].markerColor ? dataPoints[index].markerColor : dataSeries.markerColor ? dataSeries.markerColor : dataPoints[index].color ? dataPoints[index].color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];
        var markerBorderColor = dataPoints[index].markerBorderColor ? dataPoints[index].markerBorderColor : dataSeries.markerBorderColor ? dataSeries.markerBorderColor : null;
        var markerBorderThickness = dataPoints[index].markerBorderThickness ? dataPoints[index].markerBorderThickness : dataSeries.markerBorderThickness ? dataSeries.markerBorderThickness : null;
        var markerType = dataPoints[index].markerType ? dataPoints[index].markerType : dataSeries.markerType;
        var markerSize = dataPoints[index].markerSize ? dataPoints[index].markerSize : dataSeries.markerSize;


        return {
            x: x, y: y, ctx: ctx,
            type: markerType,
            size: markerSize,
            color: markerColor,
            borderColor: markerBorderColor,
            borderThickness: markerBorderThickness
        }
    }
    //#endregion DataSeries

    //#region Axis

    function Axis(chart, options, type, position) {
        Axis.parent.constructor.call(this, "Axis", options, chart.theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = chart.ctx;
        this.maxWidth = 0;
        this.maxHeight = 0;
        this.intervalStartPosition = 0;
        this.labels = [];
        this._labels = null;

        //Processed information about the data that gets plotted against this axis
        this.dataInfo = {
            min: Infinity,
            max: -Infinity,
            viewPortMin: Infinity,
            viewPortMax: -Infinity,
            minDiff: Infinity // Used only in case of axisX
        };

        if (type === "axisX") {
            this.sessionVariables = this.chart.sessionVariables[type];

            if (!this._options.interval)
                this.intervalType = null;
        } else {
            if (position === "left" || position === "top")
                this.sessionVariables = this.chart.sessionVariables["axisY"];
            else {
                this.sessionVariables = this.chart.sessionVariables["axisY2"];
            }
        }



        if (typeof (this._options.titleFontSize) === "undefined") {

            this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize);

            //window.console.log("titleFontSize: " + this.titleFontSize);
        }

        if (typeof (this._options.labelFontSize) === "undefined") {

            this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize);

            //window.console.log("labelFontSize: " + this.labelFontSize);

        }

        //Axis Type : axisX, axisY
        this.type = type;
        if (type === "axisX" && (!options || typeof (options.gridThickness) === "undefined"))
            this.gridThickness = 0;

        this._position = position;

        this.lineCoordinates = { x1: null, y1: null, x2: null, y2: null, width: null };//{x1:, y1:, x2:, y2:, width:}
        //
        {
            this.labelAngle = ((this.labelAngle % 360) + 360) % 360;

            if (this.labelAngle > 90 && this.labelAngle <= 270)
                this.labelAngle -= 180;
            else if (this.labelAngle > 180 && this.labelAngle <= 270)
                this.labelAngle -= 180
            else if (this.labelAngle > 270 && this.labelAngle <= 360)
                this.labelAngle -= 360
        }

        if (this._options.stripLines && this._options.stripLines.length > 0) {

            this.stripLines = [];

            for (var i = 0; i < this._options.stripLines.length; i++) {
                this.stripLines.push(new StripLine(this.chart, this._options.stripLines[i], chart.theme, ++this.chart._eventManager.lastObjectId));
            }
        }

        this._titleTextBlock = null;
        this._absoluteMinimum = null;// Used to determine boundaries while Zooming/Panning
        this._absoluteMaximum = null;// Used to determine boundaries while Zooming/Panning

        if (this.hasOptionChanged("minimum"))
            this.sessionVariables.internalMinimum = this.minimum;

        if (this.hasOptionChanged("maximum"))
            this.sessionVariables.internalMaximum = this.maximum;

        this.trackChanges("minimum");
        this.trackChanges("maximum");
    }
    extend(Axis, CanvasJSObject);

    Axis.prototype.createLabels = function () {
        var textBlock;
        var i = 0;
        var endPoint;

        var labelMaxWidth = 0;
        var labelMaxHeight = 0;
        var intervalInPixels = 0;

        //var intervalInPixels = this.conversionParameters.pixelPerUnit * this.interval;


        if (this._position === "bottom" || this._position === "top") {
            intervalInPixels = this.lineCoordinates.width / Math.abs(this.maximum - this.minimum) * this.interval;

            if (this.labelAutoFit) {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? intervalInPixels * .9 >> 0 : this.labelMaxWidth;
            }
            else {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? this.chart.width * .7 >> 0 : this.labelMaxWidth;
            }

            labelMaxHeight = typeof (this._options.labelWrap) === "undefined" || this.labelWrap ? this.chart.height * .5 >> 0 : this.labelFontSize * 1.5;
        }
        else if (this._position === "left" || this._position === "right") {

            intervalInPixels = this.lineCoordinates.height / Math.abs(this.maximum - this.minimum) * this.interval;


            if (this.labelAutoFit) {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? this.chart.width * .3 >> 0 : this.labelMaxWidth;
            }
            else {
                labelMaxWidth = typeof (this._options.labelMaxWidth) === "undefined" ? this.chart.width * .5 >> 0 : this.labelMaxWidth;
            }

            labelMaxHeight = typeof (this._options.labelWrap) === "undefined" || this.labelWrap ? intervalInPixels * 2 >> 0 : this.labelFontSize * 1.5;
        }

        if (this.type === "axisX" && this.chart.plotInfo.axisXValueType === "dateTime") {
            endPoint = addToDateTime(new Date(this.maximum), this.interval, this.intervalType)
            //endPoint = this.maximum;

            for (i = this.intervalStartPosition; i < endPoint; addToDateTime(i, this.interval, this.intervalType)) {

                //var text = dateFormat(i, this.valueFormatString);
                var text = this.type === "axisX" && this.labels[i] ? this.labels[i] : dateFormat(i, this.valueFormatString, this.chart._cultureInfo);

                textBlock = new TextBlock(this.ctx, {
                    x: 0,
                    y: 0,
                    //maxWidth: this.maxHeight,
                    //maxHeight: this.labelFontSize,
                    maxWidth: labelMaxWidth,
                    maxHeight: labelMaxHeight,
                    angle: this.labelAngle,
                    text: this.prefix + text + this.suffix,
                    horizontalAlign: "left",//left, center, right
                    fontSize: this.labelFontSize,//in pixels
                    fontFamily: this.labelFontFamily,
                    fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.labelFontColor,
                    fontStyle: this.labelFontStyle, // normal, italic, oblique
                    textBaseline: "middle"
                });

                this._labels.push({ position: i.getTime(), textBlock: textBlock, effectiveHeight: null });
            }

        }
        else {
            endPoint = this.maximum;

            //if ((Math.floor(this.interval) < this.interval && !this._options.interval) || true) {

            //Check if it should be rendered as a category axis. If yes, then ceil the interval
            if (this.labels && this.labels.length) {
                var tempInterval = Math.ceil(this.interval);
                var tempStartPoint = Math.ceil(this.intervalStartPosition);
                var hasAllLabels = false;
                for (i = tempStartPoint; i < this.maximum; i += tempInterval) {
                    if (this.labels[i]) {
                        hasAllLabels = true;
                    } else {
                        hasAllLabels = false;
                        break;
                    }
                }

                if (hasAllLabels) {
                    this.interval = tempInterval;
                    this.intervalStartPosition = tempStartPoint;
                }
            }

            for (i = this.intervalStartPosition; i <= endPoint; i += this.interval) {

                var text = this.type === "axisX" && this.labels[i] ? this.labels[i] : numberFormat(i, this.valueFormatString, this.chart._cultureInfo);

                textBlock = new TextBlock(this.ctx, {
                    x: 0,
                    y: 0,
                    //maxWidth: this.maxHeight,
                    //maxHeight: this.labelFontSize,
                    maxWidth: labelMaxWidth,
                    maxHeight: labelMaxHeight,
                    angle: this.labelAngle,
                    text: this.prefix + text + this.suffix,
                    horizontalAlign: "left",//left, center, right
                    fontSize: this.labelFontSize,//in pixels
                    fontFamily: this.labelFontFamily,
                    fontWeight: this.labelFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.labelFontColor,
                    fontStyle: this.labelFontStyle, // normal, italic, oblique
                    textBaseline: "middle",
                    borderThickness: 0
                });

                this._labels.push({ position: i, textBlock: textBlock, effectiveHeight: null });
            }
        }

        for (var i = 0; i < this.stripLines.length; i++) {

            var stripLine = this.stripLines[i];

            textBlock = new TextBlock(this.ctx, {
                x: 0,
                y: 0,
                //maxWidth: this.maxHeight,
                //maxHeight: this.labelFontSize,
                backgroundColor: stripLine.labelBackgroundColor,
                maxWidth: labelMaxWidth,
                maxHeight: labelMaxHeight,
                angle: this.labelAngle,
                text: stripLine.label,
                horizontalAlign: "left",//left, center, right
                fontSize: stripLine.labelFontSize,//in pixels
                fontFamily: stripLine.labelFontFamily,
                fontWeight: stripLine.labelFontWeight, //normal, bold, bolder, lighter,
                fontColor: stripLine.labelFontColor,
                fontStyle: stripLine.labelFontStyle, // normal, italic, oblique
                textBaseline: "middle",
                borderThickness: 0
            });

            this._labels.push({ position: stripLine.value, textBlock: textBlock, effectiveHeight: null, stripLine: stripLine });
        }

    }

    Axis.prototype.createLabelsAndCalculateWidth = function () {

        var maxLabelEffectiveWidth = 0;
        this._labels = [];

        if (this._position === "left" || this._position === "right") {

            this.createLabels();

            for (i = 0; i < this._labels.length; i++) {

                var textBlock = this._labels[i].textBlock;

                var size = textBlock.measureText();

                //var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
                //labelEffectiveWidth = hypotenuse * Math.cos(Math.abs(Math.PI / 180 * this.labelAngle) - Math.abs(Math.acos(size.width / hypotenuse)));

                var labelEffectiveWidth = 0;

                if (this.labelAngle === 0)
                    labelEffectiveWidth = size.width;
                else
                    labelEffectiveWidth = (size.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) + (size.height / 2 * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)));


                if (maxLabelEffectiveWidth < labelEffectiveWidth)
                    maxLabelEffectiveWidth = labelEffectiveWidth;

                this._labels[i].effectiveWidth = labelEffectiveWidth;
            }
        }

        //if (isDebugMode && window.console) {
        //    window.console.log(this.type + " --- axisWidth : " + (maxLabelEffectiveWidth + this.tickLength));
        //}

        var titleHeight = this.title ? getFontHeightInPixels(this.titleFontFamily, this.titleFontSize, this.titleFontWeight) + 2 : 0;

        return titleHeight + maxLabelEffectiveWidth + this.tickLength + 5;
    }

    Axis.prototype.createLabelsAndCalculateHeight = function () {
        var maxLabelEffectiveHeight = 0;
        this._labels = [];
        var textBlock;
        var i = 0;

        this.createLabels();

        if (this._position === "bottom" || this._position === "top") {

            for (i = 0; i < this._labels.length; i++) {

                textBlock = this._labels[i].textBlock;

                var size = textBlock.measureText();
                //var diagonal = Math.sqrt(Math.pow(size.height, 2) + Math.pow(size.width, 2));

                //var hypotenuse = Math.sqrt(Math.pow(size.height / 2, 2) + Math.pow(size.width, 2));
                //var labelEffectiveHeight = hypotenuse * Math.cos(Math.PI / 2 - (Math.abs(Math.PI / 180 * this.labelAngle) + Math.abs(Math.acos(size.width / hypotenuse))));

                var labelEffectiveHeight = 0;

                if (this.labelAngle === 0)
                    labelEffectiveHeight = size.height;
                else
                    labelEffectiveHeight = (size.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) + (size.height / 2 * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)));

                if (maxLabelEffectiveHeight < labelEffectiveHeight)
                    maxLabelEffectiveHeight = labelEffectiveHeight;

                this._labels[i].effectiveHeight = labelEffectiveHeight;
            }
        }

        //var titleHeight = this.title ? this.titleFontSize + 5 : 0;
        var titleHeight = this.title ? getFontHeightInPixels(this.titleFontFamily, this.titleFontSize, this.titleFontWeight) + 2 : 0;

        return titleHeight + maxLabelEffectiveHeight + this.tickLength + 5;
    }

    //Static Method that co-ordinates between axisX, axisY and renders them
    Axis.setLayoutAndRender = function (axisX, axisY, axisY2, axisPlacement, freeSpace) {
        var x1, y1, x2, y2;
        var chart = axisX.chart;
        var ctx = chart.ctx;

        axisX.calculateAxisParameters();

        if (axisY)
            axisY.calculateAxisParameters();

        if (axisY2)
            axisY2.calculateAxisParameters();

        if (axisY && axisY2 && typeof (axisY._options.maximum) === "undefined" && typeof (axisY._options.minimum) === "undefined" && typeof (axisY._options.interval) === "undefined"
				&& typeof (axisY2._options.maximum) === "undefined" && typeof (axisY2._options.minimum) === "undefined" && typeof (axisY2._options.interval) === "undefined") {

            var noTicksY = (axisY.maximum - axisY.minimum) / axisY.interval;

            var noTicksY2 = (axisY2.maximum - axisY2.minimum) / axisY2.interval;

            if (noTicksY > noTicksY2) {
                axisY2.maximum = axisY2.interval * noTicksY + axisY2.minimum;
            } else if (noTicksY2 > noTicksY) {
                axisY.maximum = axisY.interval * noTicksY2 + axisY.minimum;
            }
        }

        var axisYlineThickness = axisY ? axisY.lineThickness ? axisY.lineThickness : 0 : 0;
        var axisY2lineThickness = axisY2 ? axisY2.lineThickness ? axisY2.lineThickness : 0 : 0;

        var axisYGridThickness = axisY ? axisY.gridThickness ? axisY.gridThickness : 0 : 0;
        var axisY2GridThickness = axisY2 ? axisY2.gridThickness ? axisY2.gridThickness : 0 : 0;

        var axisYMargin = axisY ? axisY.margin : 0;
        var axisY2Margin = axisY ? axisY.margin : 0;

        if (axisPlacement === "normal") {

            axisX.lineCoordinates = {};

            var axisYWidth = Math.ceil(axisY ? axisY.createLabelsAndCalculateWidth() : 0);
            x1 = Math.round(freeSpace.x1 + axisYWidth + axisYMargin);
            axisX.lineCoordinates.x1 = x1;

            var axisY2Width = Math.ceil(axisY2 ? axisY2.createLabelsAndCalculateWidth() : 0);
            x2 = Math.round(freeSpace.x2 - axisY2Width > axisX.chart.width - 10 ? axisX.chart.width - 10 : freeSpace.x2 - axisY2Width);
            axisX.lineCoordinates.x2 = x2;

            axisX.lineCoordinates.width = Math.abs(x2 - x1); // required early on inside createLabels of axisX

            var axisXHeight = Math.ceil(axisX.createLabelsAndCalculateHeight());

            // Position axisX based on the available free space, Margin and its height
            //x1 = freeSpace.x1 + axisYWidth + axisYMargin + axisYlineThickness / 2;
            y1 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);
            y2 = Math.round(freeSpace.y2 - axisX.margin);

            //axisX.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
            axisX.lineCoordinates.y1 = y1;
            axisX.lineCoordinates.y2 = y1;

            axisX.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };

            //axisX.ctx.rect(axisX.boundingRect.x1, axisX.boundingRect.y1, axisX.boundingRect.width, axisX.boundingRect.height);
            //axisX.ctx.stroke();

            // Position axisY based on the available free space, Margin and its height
            if (axisY) {
                x1 = Math.round(freeSpace.x1 + axisY.margin);
                y1 = Math.round(freeSpace.y1 < 10 ? 10 : freeSpace.y1);
                x2 = Math.round(freeSpace.x1 + axisYWidth + axisY.margin);
                //y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
                y2 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);

                axisY.lineCoordinates = { x1: x2, y1: y1, x2: x2, y2: y2, height: Math.abs(y2 - y1) }

                axisY.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
            }

            //axisY.ctx.rect(axisY.boundingRect.x1, axisY.boundingRect.y1, axisY.boundingRect.width, axisY.boundingRect.height);
            //axisY.ctx.stroke();

            // Position axisY2 based on the available free space, Margin and its height
            if (axisY2) {
                x1 = Math.round(axisX.lineCoordinates.x2);
                y1 = Math.round(freeSpace.y1 < 10 ? 10 : freeSpace.y1);
                x2 = Math.round(x1 + axisY2Width + axisY2.margin);
                //y2 = freeSpace.y2 - axisXHeight - axisX.margin - axisX.lineThickness / 2;
                y2 = Math.round(freeSpace.y2 - axisXHeight - axisX.margin);

                axisY2.lineCoordinates = { x1: x1, y1: y1, x2: x1, y2: y2, height: Math.abs(y2 - y1) }

                axisY2.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };
            }


            axisX.calculateValueToPixelconversionParameters();

            if (axisY)
                axisY.calculateValueToPixelconversionParameters();

            if (axisY2)
                axisY2.calculateValueToPixelconversionParameters();


            ctx.save();
            ctx.rect(axisX.boundingRect.x1 - 40, axisX.boundingRect.y1, axisX.boundingRect.width + 80, axisX.boundingRect.height);
            ctx.clip();

            axisX.renderLabelsTicksAndTitle();
            ctx.restore();

            if (axisY)
                axisY.renderLabelsTicksAndTitle();

            if (axisY2)
                axisY2.renderLabelsTicksAndTitle();


            chart.preparePlotArea();
            var plotArea = axisX.chart.plotArea;

            ctx.save();

            ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));

            ctx.clip();

            axisX.renderStripLinesOfThicknessType("value");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("value");

            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("value");


            axisX.renderInterlacedColors();

            if (axisY)
                axisY.renderInterlacedColors();

            if (axisY2)
                axisY2.renderInterlacedColors();

            ctx.restore();


            axisX.renderGrid();

            if (axisY)
                axisY.renderGrid();

            if (axisY2)
                axisY2.renderGrid();


            axisX.renderAxisLine();

            if (axisY)
                axisY.renderAxisLine();

            if (axisY2)
                axisY2.renderAxisLine();


            //No need to clip to plotArea because stripLines need to render on top of gridlines
            axisX.renderStripLinesOfThicknessType("pixel");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("pixel");

            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("pixel");
        }
        else {
            var axisXWidth = Math.ceil(axisX.createLabelsAndCalculateWidth());

            if (axisY) {
                axisY.lineCoordinates = {};

                x1 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
                x2 = Math.round(freeSpace.x2 > axisY.chart.width - 10 ? axisY.chart.width - 10 : freeSpace.x2);

                axisY.lineCoordinates.x1 = x1;
                axisY.lineCoordinates.x2 = x2;
                axisY.lineCoordinates.width = Math.abs(x2 - x1);
            }

            if (axisY2) {
                axisY2.lineCoordinates = {};
                x1 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
                x2 = Math.round(freeSpace.x2 > axisY2.chart.width - 10 ? axisY2.chart.width - 10 : freeSpace.x2);

                axisY2.lineCoordinates.x1 = x1;
                axisY2.lineCoordinates.x2 = x2;
                axisY2.lineCoordinates.width = Math.abs(x2 - x1);
            }



            var axisYHeight = Math.ceil(axisY ? axisY.createLabelsAndCalculateHeight() : 0);
            var axisY2Height = Math.ceil(axisY2 ? axisY2.createLabelsAndCalculateHeight() : 0);


            // Position axisY based on the available free space, Margin and its height
            if (axisY) {
                //x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
                //x2 = freeSpace.x2 > axisY.chart.width - 10 ? axisY.chart.width - 10 : freeSpace.x2;

                y1 = Math.round(freeSpace.y2 - axisYHeight - axisY.margin);
                y2 = Math.round(freeSpace.y2 - axisYMargin > axisY.chart.height - 10 ? axisY.chart.height - 10 : freeSpace.y2 - axisYMargin);

                //axisY.lineCoordinates = { x1: x1, y1: y1, x2: x2, y2: y1, width: Math.abs(x2 - x1) }
                axisY.lineCoordinates.y1 = y1;
                axisY.lineCoordinates.y2 = y1;

                axisY.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: axisYHeight };
            }

            // Position axisY based on the available free space, Margin and its height
            if (axisY2) {
                //x1 = freeSpace.x1 + axisXWidth + axisX.margin + axisX.lineThickness / 2;
                //x2 = freeSpace.x2 > axisY2.chart.width - 10 ? axisY2.chart.width - 10 : freeSpace.x2;

                y1 = Math.round(freeSpace.y1 + axisY2.margin);
                y2 = (freeSpace.y1 + axisY2.margin + axisY2Height);

                //axisY2.lineCoordinates = { x1: x1, y1: y2, x2: x2, y2: y2, width: Math.abs(x2 - x1) }
                axisY2.lineCoordinates.y1 = y2;
                axisY2.lineCoordinates.y2 = y2;

                axisY2.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: axisY2Height };
            }

            //axisY.ctx.rect(axisY.boundingRect.x1, axisY.boundingRect.y1, axisY.boundingRect.width, axisY.boundingRect.height);
            //axisY.ctx.stroke();

            // Position axisX based on the available free space, Margin and its height
            x1 = Math.round(freeSpace.x1 + axisX.margin);
            y1 = Math.round(axisY2 ? axisY2.lineCoordinates.y2 : (freeSpace.y1 < 10 ? 10 : freeSpace.y1));
            x2 = Math.round(freeSpace.x1 + axisXWidth + axisX.margin);
            y2 = Math.round(axisY ? axisY.lineCoordinates.y1 : (freeSpace.y2 - axisYMargin > axisX.chart.height - 10 ? axisX.chart.height - 10 : freeSpace.y2 - axisYMargin));


            axisX.lineCoordinates = { x1: x2, y1: y1, x2: x2, y2: y2, height: Math.abs(y2 - y1) };

            axisX.boundingRect = { x1: x1, y1: y1, x2: x2, y2: y2, width: x2 - x1, height: y2 - y1 };

            //axisX.ctx.rect(axisX.boundingRect.x1, axisX.boundingRect.y1, axisX.boundingRect.width, axisX.boundingRect.height);
            //axisX.ctx.stroke();

            axisX.calculateValueToPixelconversionParameters();

            if (axisY)
                axisY.calculateValueToPixelconversionParameters();
            if (axisY2)
                axisY2.calculateValueToPixelconversionParameters();


            //ctx.save();
            //ctx.rect(axisY.boundingRect.x1 - 30, axisY.boundingRect.y1, axisY.boundingRect.width + 60, axisY.boundingRect.height);
            //ctx.clip();

            if (axisY)
                axisY.renderLabelsTicksAndTitle();

            if (axisY2)
                axisY2.renderLabelsTicksAndTitle();

            //ctx.restore();

            axisX.renderLabelsTicksAndTitle();

            chart.preparePlotArea();
            var plotArea = axisX.chart.plotArea;

            ctx.save();
            ctx.rect(plotArea.x1, plotArea.y1, Math.abs(plotArea.x2 - plotArea.x1), Math.abs(plotArea.y2 - plotArea.y1));

            ctx.clip();


            //No need to clip to plotArea because stripLines need to render on top of gridlines
            axisX.renderStripLinesOfThicknessType("value");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("value");
            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("value");

            axisX.renderInterlacedColors();

            if (axisY)
                axisY.renderInterlacedColors();
            if (axisY2)
                axisY2.renderInterlacedColors();

            ctx.restore();


            axisX.renderGrid();


            if (axisY)
                axisY.renderGrid();

            if (axisY2)
                axisY2.renderGrid();


            axisX.renderAxisLine();

            if (axisY)
                axisY.renderAxisLine();

            if (axisY2)
                axisY2.renderAxisLine();


            axisX.renderStripLinesOfThicknessType("pixel");

            if (axisY)
                axisY.renderStripLinesOfThicknessType("pixel");
            if (axisY2)
                axisY2.renderStripLinesOfThicknessType("pixel");
        }

    }

    Axis.prototype.renderLabelsTicksAndTitle = function () {

        var skipLabels = false;
        var totalLabelWidth = 0;
        var thresholdRatio = 1;
        var labelCount = 0;

        var intervalInPixels = this.conversionParameters.pixelPerUnit * this.interval;

        if (this.labelAngle !== 0 && this.labelAngle !== 360)
            thresholdRatio = 1.2;

        //Don't skip labels when interval is explicitely set
        if (typeof (this._options.interval) === "undefined") {
            if (this._position === "bottom" || this._position === "top") {

                //thresholdRatio = .9;// More space is preferred between labels when axis is horizontally aligned

                for (i = 0; i < this._labels.length; i++) {
                    label = this._labels[i];
                    if (label.position < this.minimum || label.stripLine)// don't consider stripLine's lable
                        continue;

                    var width = label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.height * Math.sin(Math.PI / 180 * this.labelAngle);

                    totalLabelWidth += width;
                }

                if (totalLabelWidth > this.lineCoordinates.width * thresholdRatio) {
                    skipLabels = true;
                }
            } if (this._position === "left" || this._position === "right") {
                for (i = 0; i < this._labels.length; i++) {
                    label = this._labels[i];
                    if (label.position < this.minimum || label.stripLine)// don't consider stripLine's lable
                        continue;

                    var width = label.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle);

                    totalLabelWidth += width;
                }

                if (totalLabelWidth > this.lineCoordinates.height * thresholdRatio) {
                    skipLabels = true;
                }
            }
        }

        if (this._position === "bottom") {
            var i = 0;

            var label;
            var xy;

            for (i = 0; i < this._labels.length; i++) {

                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {

                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;
                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;

                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }


                    var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(tickX, xy.y << 0);
                    this.ctx.lineTo(tickX, (xy.y + this.tickLength) << 0);
                    this.ctx.stroke();
                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                if (label.textBlock.angle === 0) {
                    xy.x -= label.textBlock.width / 2;
                    //xy.y += this.tickLength + label.textBlock.height / 2;
                    xy.y += this.tickLength + label.textBlock.fontSize / 2;

                } else {
                    xy.x -= (this.labelAngle < 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
                    xy.y += this.tickLength + Math.abs((this.labelAngle < 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5));
                }
                label.textBlock.x = xy.x;
                label.textBlock.y = xy.y;

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.lineCoordinates.x1,// This is recalculated again
                    y: this.boundingRect.y2 - this.titleFontSize - 5,
                    maxWidth: this.lineCoordinates.width,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: 0,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
                this._titleTextBlock.y = this.boundingRect.y2 - this._titleTextBlock.height - 2;
                this._titleTextBlock.render(true);
            }
        }
        else if (this._position === "top") {
            var i = 0;

            var label;
            var xy;
            var stripLine;

            for (i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {


                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;

                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;

                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }

                    var tickX = (this.ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(tickX, xy.y << 0);
                    this.ctx.lineTo(tickX, (xy.y - this.tickLength) << 0);
                    this.ctx.stroke();

                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                if (label.textBlock.angle === 0) {
                    xy.x -= label.textBlock.width / 2;
                    xy.y -= this.tickLength + label.textBlock.height / 2;
                } else {
                    xy.x -= (this.labelAngle > 0 ? (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) : 0);
                    xy.y -= this.tickLength + Math.abs((this.labelAngle > 0 ? label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5 : 5));
                }
                label.textBlock.x = xy.x;
                label.textBlock.y = xy.y;

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.lineCoordinates.x1,// This is recalculated again
                    y: this.boundingRect.y1,
                    maxWidth: this.lineCoordinates.width,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: 0,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2;
                this._titleTextBlock.render(true);
            }
        }
        else if (this._position === "left") {


            var label;
            var xy;
            for (var i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {

                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;

                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }

                    var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(xy.x << 0, tickY);
                    this.ctx.lineTo((xy.x - this.tickLength) << 0, tickY);
                    this.ctx.stroke();
                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                label.textBlock.x = xy.x - (label.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle)) - this.tickLength - 5;

                if (this.labelAngle === 0) {
                    label.textBlock.y = xy.y - label.textBlock.height / 2 + this.labelFontSize / 2;
                } else
                    label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.boundingRect.x1 + 5,
                    y: this.lineCoordinates.y2,
                    maxWidth: this.lineCoordinates.height,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: -90,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.y = (this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
                this._titleTextBlock.render(true);

            }
        }
        else if (this._position === "right") {


            var label;
            var xy;

            for (var i = 0; i < this._labels.length; i++) {
                label = this._labels[i];
                if (label.position < this.minimum || label.position > this.maximum)
                    continue;

                xy = this.getPixelCoordinatesOnAxis(label.position);

                if ((this.tickThickness && !this._labels[i].stripLine) || (this._labels[i].stripLine && this._labels[i].stripLine._thicknessType === "pixel")) {

                    if (this._labels[i].stripLine) {
                        stripLine = this._labels[i].stripLine;

                        this.ctx.lineWidth = stripLine.thickness;
                        this.ctx.strokeStyle = stripLine.color;
                    } else {
                        this.ctx.lineWidth = this.tickThickness;
                        this.ctx.strokeStyle = this.tickColor;
                    }

                    var tickY = (this.ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);
                    this.ctx.beginPath();
                    this.ctx.moveTo(xy.x << 0, tickY);
                    this.ctx.lineTo((xy.x + this.tickLength) << 0, tickY);
                    this.ctx.stroke();

                }

                //Don't skip stripLine's labels
                if (skipLabels && labelCount++ % 2 !== 0 && !this._labels[i].stripLine)
                    continue;

                label.textBlock.x = xy.x + this.tickLength + 5;
                //label.textBlock.y = xy.y - (label.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle));
                if (this.labelAngle === 0) {
                    label.textBlock.y = xy.y - label.textBlock.height / 2 + this.labelFontSize / 2;
                }
                else
                    label.textBlock.y = xy.y;

                label.textBlock.render(true);
            }

            if (this.title) {

                this._titleTextBlock = new TextBlock(this.ctx, {
                    x: this.boundingRect.x2 - 5,
                    y: this.lineCoordinates.y2,
                    maxWidth: this.lineCoordinates.height,
                    maxHeight: this.titleFontSize * 1.5,
                    angle: 90,
                    text: this.title,
                    horizontalAlign: "center",//left, center, right
                    fontSize: this.titleFontSize,//in pixels
                    fontFamily: this.titleFontFamily,
                    fontWeight: this.titleFontWeight, //normal, bold, bolder, lighter,
                    fontColor: this.titleFontColor,
                    fontStyle: this.titleFontStyle, // normal, italic, oblique
                    textBaseline: "top"
                });

                this._titleTextBlock.measureText();
                this._titleTextBlock.y = (this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1);
                this._titleTextBlock.render(true);

            }
        }
    }

    Axis.prototype.renderInterlacedColors = function () {
        var ctx = this.chart.plotArea.ctx;
        //return;

        var interlacedGridStartPoint;
        var interlacedGridEndPoint;
        var plotAreaCoordinates = this.chart.plotArea;
        var i = 0, renderInterlacedGrid = true;

        if ((this._position === "bottom" || this._position === "top") && this.interlacedColor) {

            ctx.fillStyle = this.interlacedColor;

            for (i = 0; i < this._labels.length; i++) {

                if (this._labels[i].stripLine)
                    continue;

                if (renderInterlacedGrid) {//So that the interlaced color alternates
                    interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                    if (i + 1 >= this._labels.length)
                        interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this.maximum);
                    else
                        interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

                    ctx.fillRect(interlacedGridStartPoint.x, plotAreaCoordinates.y1, Math.abs(interlacedGridEndPoint.x - interlacedGridStartPoint.x), Math.abs(plotAreaCoordinates.y1 - plotAreaCoordinates.y2));
                    renderInterlacedGrid = false;
                } else
                    renderInterlacedGrid = true;

            }

        } else if ((this._position === "left" || this._position === "right") && this.interlacedColor) {

            ctx.fillStyle = this.interlacedColor;

            for (i = 0; i < this._labels.length; i++) {
                if (this._labels[i].stripLine)
                    continue;

                if (renderInterlacedGrid) {//So that the interlaced color alternates

                    interlacedGridEndPoint = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                    if (i + 1 >= this._labels.length)
                        interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this.maximum);
                    else
                        interlacedGridStartPoint = this.getPixelCoordinatesOnAxis(this._labels[i + 1].position);

                    ctx.fillRect(plotAreaCoordinates.x1, interlacedGridStartPoint.y, Math.abs(plotAreaCoordinates.x1 - plotAreaCoordinates.x2), Math.abs(interlacedGridStartPoint.y - interlacedGridEndPoint.y));
                    renderInterlacedGrid = false;
                } else
                    renderInterlacedGrid = true;
            }
            //throw "123";
        }

        ctx.beginPath();
    }

    //Renders stripLines of given thickness type.
    Axis.prototype.renderStripLinesOfThicknessType = function (thicknessType) {

        if (!(this.stripLines && this.stripLines.length > 0) || !thicknessType)
            return;

        var ctx = this.chart.plotArea.ctx;
        var ghostCtx = this.chart._eventManager.ghostCtx;


        var i = 0;
        for (i = 0; i < this.stripLines.length; i++) {

            var stripLine = this.stripLines[i];

            if (stripLine._thicknessType !== thicknessType)
                continue;


            //Should be skipped only if thicknessType is "pixel". If it is "value" then clipping is automatically applied before calling.
            if (thicknessType === "pixel" && (stripLine.value < this.minimum || stripLine.value > this.maximum))
                continue;

            var xy = this.getPixelCoordinatesOnAxis(stripLine.value);

            var lineWidth = Math.abs(thicknessType === "pixel" ? stripLine.thickness : this.conversionParameters.pixelPerUnit * stripLine.thickness);

            if (lineWidth <= 0)
                continue;

            ctx.strokeStyle = stripLine.color;
            ctx.beginPath();

            var hexColor = intToHexColorString(stripLine.id);
            //ghostCtx.strokeStyle = hexColor;
            //ghostCtx.beginPath();
            var x1, x2, y1, y2;

            //ghostCtx.lineWidth = ctx.lineWidth = Math.abs(thicknessType === "pixel" ? stripLine.thickness : this.conversionParameters.pixelPerUnit * stripLine.thickness);
            

            ctx.lineWidth = lineWidth

            if (this._position === "bottom" || this._position === "top") {

                var stripX = (ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

                x1 = x2 = stripX;
                y1 = this.chart.plotArea.y1;
                y2 = this.chart.plotArea.y2;
            }
            else if (this._position === "left" || this._position === "right") {
                var stripY = (ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

                y1 = y2 = stripY;
                x1 = this.chart.plotArea.x1;
                x2 = this.chart.plotArea.x2;
            }

            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();


            //ghostCtx.moveTo(x1, y1);
            //ghostCtx.lineTo(x2, y2);
            //ghostCtx.stroke();

            //this.chart._eventManager.objectMap[stripLine.id] = {
            //	objectType: "stripLine", stripLine: stripLine, stripLineIndex: i, axis: this,
            //	x1: x1, y1: y1, x2: x2, y2: y2
            //};

            //{ objectType: "dat/aSeries", dataSeriesIndex: dataSeriesIndex };
        }

    }

    Axis.prototype.renderGrid = function () {

        if (!(this.gridThickness && this.gridThickness > 0))
            return;

        //var ctx = this.chart.plotArea.ctx;
        var ctx = this.chart.ctx;

        var xy;
        var plotAreaCoordinates = this.chart.plotArea;
        var stripLine;
        var tempLineWidth, tempStrokeStyle;
        //return;

        ctx.lineWidth = this.gridThickness;
        ctx.strokeStyle = this.gridColor;


        if (this._position === "bottom" || this._position === "top") {

            for (i = 0; i < this._labels.length && !this._labels[i].stripLine; i++) {

                if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum)
                    continue;

                ctx.beginPath();

                xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                var gridX = (ctx.lineWidth % 2 === 1) ? (xy.x << 0) + .5 : (xy.x << 0);

                ctx.moveTo(gridX, plotAreaCoordinates.y1 << 0);
                ctx.lineTo(gridX, plotAreaCoordinates.y2 << 0);

                ctx.stroke();
            }

        }
        else if (this._position === "left" || this._position === "right") {

            for (var i = 0; i < this._labels.length && !this._labels[i].stripLine; i++) {

                if (this._labels[i].position < this.minimum || this._labels[i].position > this.maximum)
                    continue;

                ctx.beginPath();

                xy = this.getPixelCoordinatesOnAxis(this._labels[i].position);

                var gridY = (ctx.lineWidth % 2 === 1) ? (xy.y << 0) + .5 : (xy.y << 0);

                ctx.moveTo(plotAreaCoordinates.x1 << 0, gridY);
                ctx.lineTo(plotAreaCoordinates.x2 << 0, gridY);

                ctx.stroke();
            }

        }
    }

    Axis.prototype.renderAxisLine = function () {
        //var ctx = this.chart.plotArea.ctx;
        var ctx = this.chart.ctx;

        if (this._position === "bottom" || this._position === "top") {
            if (this.lineThickness) {
                ctx.lineWidth = this.lineThickness;
                ctx.strokeStyle = this.lineColor ? this.lineColor : "black";

                var lineY = (this.lineThickness % 2 === 1) ? (this.lineCoordinates.y1 << 0) + .5 : (this.lineCoordinates.y1 << 0);

                ctx.beginPath();
                ctx.moveTo(this.lineCoordinates.x1, lineY);
                ctx.lineTo(this.lineCoordinates.x2, lineY);
                ctx.stroke();
            }

        } else if (this._position === "left" || this._position === "right") {
            if (this.lineThickness) {
                ctx.lineWidth = this.lineThickness;
                ctx.strokeStyle = this.lineColor;

                var lineX = (this.lineThickness % 2 === 1) ? (this.lineCoordinates.x1 << 0) + .5 : (this.lineCoordinates.x1 << 0);

                ctx.beginPath();
                ctx.moveTo(lineX, this.lineCoordinates.y1);
                ctx.lineTo(lineX, this.lineCoordinates.y2);
                ctx.stroke();
            }

        }
    }

    Axis.prototype.getPixelCoordinatesOnAxis = function (value) {
        var xy = {};
        var width = this.lineCoordinates.width;
        var height = this.lineCoordinates.height;

        if (this._position === "bottom" || this._position === "top") {
            var pixelPerUnit = width / Math.abs(this.maximum - this.minimum);

            xy.x = this.lineCoordinates.x1 + (pixelPerUnit * (value - this.minimum));
            xy.y = this.lineCoordinates.y1;
        }
        if (this._position === "left" || this._position === "right") {
            var pixelPerUnit = height / Math.abs(this.maximum - this.minimum);

            xy.y = this.lineCoordinates.y2 - (pixelPerUnit * (value - this.minimum));
            xy.x = this.lineCoordinates.x2;
        }

        return xy;
    }

    Axis.prototype.getXValueAt = function (pixel) {
        if (!pixel)
            return null;

        var xval = null;

        if (this._position === "left") {
            xval = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * ((this.chart.axisX.lineCoordinates.y2 - pixel.y)) + this.chart.axisX.minimum;
        }
        else if (this._position === "bottom") {
            xval = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (pixel.x - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum;
        }

        return xval;
    }

    Axis.prototype.calculateValueToPixelconversionParameters = function (value) {
        var xy = {};
        var conversionParameters = { pixelPerUnit: null, minimum: null, reference: null };

        var width = this.lineCoordinates.width;
        var height = this.lineCoordinates.height;

        conversionParameters.minimum = this.minimum;

        if (this._position === "bottom" || this._position === "top") {
            conversionParameters.pixelPerUnit = width / Math.abs(this.maximum - this.minimum);
            conversionParameters.reference = this.lineCoordinates.x1;

            //xy.x = this.lineCoordinates.x1 + (pixelPerUnit * (value - this.minimum));
            //xy.y = this.lineCoordinates.y1;
        }
        if (this._position === "left" || this._position === "right") {
            conversionParameters.pixelPerUnit = -1 * height / Math.abs(this.maximum - this.minimum);
            conversionParameters.reference = this.lineCoordinates.y2;

            //xy.y = this.lineCoordinates.y2 + (pixelPerUnit * (value - this.minimum));
            //xy.x = this.lineCoordinates.x2;
        }


        this.conversionParameters = conversionParameters;
    }

    Axis.prototype.calculateAxisParameters = function () {

        var freeSpace = this.chart.layoutManager.getFreeSpace();
        var availableWidth = 0;
        var availableHeight = 0;

        if (this._position === "bottom" || this._position === "top") {
            this.maxWidth = freeSpace.width;
            this.maxHeight = freeSpace.height;
        } else {
            this.maxWidth = freeSpace.height;
            this.maxHeight = freeSpace.width;
        }

        var noTicks = this.type === "axisX" ? (this.maxWidth < 500 ? 8 : Math.max(6, Math.floor(this.maxWidth / 62))) : Math.floor(this.maxWidth / 40);
        //var noTicks = 8;
        var min, max;
        var minDiff;
        var range;

        if (this.type === "axisX") {
            min = (this.sessionVariables.internalMinimum !== null) ? this.sessionVariables.internalMinimum : this.dataInfo.viewPortMin;
            max = (this.sessionVariables.internalMaximum !== null) ? this.sessionVariables.internalMaximum : this.dataInfo.viewPortMax;

            if (max - min === 0) {
                //max += 1;
                max += .4;
                min -= .4;
            }

            if (this.dataInfo.minDiff !== Infinity)
                minDiff = this.dataInfo.minDiff;
            else
                minDiff = 1;

        } else if (this.type === "axisY") {

            min = typeof (this._options.minimum) === "undefined" ? this.dataInfo.viewPortMin : this._options.minimum;
            max = typeof (this._options.maximum) === "undefined" ? this.dataInfo.viewPortMax : this._options.maximum;

            // When there is only a single dataPoint or when all dapoints have same Y Value
            if (max - min === 0) {
                max += 5;
                min -= 5;
            }
            else {
                //var scaleFactor = Math.abs(max - min) * .01;
                if (max !== 0)
                    max += Math.abs(.05);
                if (min !== 0)
                    min -= Math.abs(.05);
            }


            //Apply includeZero
            if (this.includeZero && typeof (this._options.minimum) === "undefined") {
                if (min > 0)
                    min = 0;
            }
            if (this.includeZero && typeof (this._options.maximum) === "undefined") {
                if (max < 0)
                    max = 0;
            }
        }

        if (this.type === "axisX" && this.chart.plotInfo.axisXValueType === "dateTime") {

            range = max - min;

            if (!this.intervalType) {

                if (range / (1 * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 5) <= noTicks) {
                    this.interval = 5;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 10) <= noTicks) {
                    this.interval = 10;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 20) <= noTicks) {
                    this.interval = 20;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 50) <= noTicks) {
                    this.interval = 50;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 100) <= noTicks) {
                    this.interval = 100;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 200) <= noTicks) {
                    this.interval = 200;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 250) <= noTicks) {
                    this.interval = 250;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 300) <= noTicks) {
                    this.interval = 300;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 400) <= noTicks) {
                    this.interval = 400;
                    this.intervalType = "millisecond";
                } else if (range / (1 * 500) <= noTicks) {
                    this.interval = 500;
                    this.intervalType = "millisecond";
                } else if (range / (constants.secondDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 5) <= noTicks) {
                    this.interval = 5;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 10) <= noTicks) {
                    this.interval = 10;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 15) <= noTicks) {
                    this.interval = 15;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 20) <= noTicks) {
                    this.interval = 20;
                    this.intervalType = "second";
                } else if (range / (constants.secondDuration * 30) <= noTicks) {
                    this.interval = 30;
                    this.intervalType = "second";
                } else if (range / (constants.minuteDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 5) <= noTicks) {
                    this.interval = 5;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 10) <= noTicks) {
                    this.interval = 10;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 15) <= noTicks) {
                    this.interval = 15;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 20) <= noTicks) {
                    this.interval = 20;
                    this.intervalType = "minute";
                } else if (range / (constants.minuteDuration * 30) <= noTicks) {
                    this.interval = 30;
                    this.intervalType = "minute";
                } else if (range / (constants.hourDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "hour";
                } else if (range / (constants.hourDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "hour";
                } else if (range / (constants.hourDuration * 3) <= noTicks) {
                    this.interval = 3;
                    this.intervalType = "hour";
                } else if (range / (constants.hourDuration * 6) <= noTicks) {
                    this.interval = 6;
                    this.intervalType = "hour";
                } else if (range / (constants.dayDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "day";
                } else if (range / (constants.dayDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "day";
                } else if (range / (constants.dayDuration * 4) <= noTicks) {
                    this.interval = 4;
                    this.intervalType = "day";
                } else if (range / (constants.weekDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "week";
                } else if (range / (constants.weekDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "week";
                } else if (range / (constants.weekDuration * 3) <= noTicks) {
                    this.interval = 3;
                    this.intervalType = "week";
                } else if (range / (constants.monthDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "month";
                } else if (range / (constants.monthDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "month";
                } else if (range / (constants.monthDuration * 3) <= noTicks) {
                    this.interval = 3;
                    this.intervalType = "month";
                } else if (range / (constants.monthDuration * 6) <= noTicks) {
                    this.interval = 6;
                    this.intervalType = "month";
                } else if (range / (constants.yearDuration * 1) <= noTicks) {
                    this.interval = 1;
                    this.intervalType = "year";
                } else if (range / (constants.yearDuration * 2) <= noTicks) {
                    this.interval = 2;
                    this.intervalType = "year";
                } else if (range / (constants.yearDuration * 4) <= noTicks) {
                    this.interval = 4;
                    this.intervalType = "year";
                } else {
                    this.interval = Math.floor(Axis.getNiceNumber(range / (noTicks - 1), true) / constants.yearDuration);
                    this.intervalType = "year";
                }

            }

            if (this.sessionVariables.internalMinimum !== null)
                this.minimum = this.sessionVariables.internalMinimum;
            else {
                this.minimum = min - minDiff / 2;
            }

            if (this.sessionVariables.internalMaximum)
                this.maximum = this.sessionVariables.internalMaximum;
            else
                this.maximum = max + minDiff / 2;

            if (!this.valueFormatString) {
                if (this.intervalType === "year") {
                    this.valueFormatString = "YYYY";
                } else if (this.intervalType === "month") {
                    this.valueFormatString = "MMM YYYY";
                } else if (this.intervalType === "week") {
                    this.valueFormatString = "MMM DD YYYY";
                } else if (this.intervalType === "day") {
                    this.valueFormatString = "MMM DD YYYY";
                } else if (this.intervalType === "hour") {
                    this.valueFormatString = "hh:mm TT";
                } else if (this.intervalType === "minute") {
                    this.valueFormatString = "hh:mm TT";
                } else if (this.intervalType === "second") {
                    this.valueFormatString = "hh:mm:ss TT";
                } else if (this.intervalType === "millisecond") {
                    this.valueFormatString = "fff'ms'";
                }
            }

            this.intervalStartPosition = this.getLabelStartPoint(new Date(this.minimum), this.intervalType, this.interval);

        } else {

            this.intervalType = "number";

            range = Axis.getNiceNumber(max - min, false);

            if (this._options && this._options.interval)
                this.interval = this._options.interval;
            else {
                this.interval = Axis.getNiceNumber(range / (noTicks - 1), true);
            }

            if (this.sessionVariables.internalMinimum !== null)
                this.minimum = this.sessionVariables.internalMinimum;
            else
                this.minimum = Math.floor(min / this.interval) * this.interval;

            if (this.sessionVariables.internalMaximum !== null)
                this.maximum = this.sessionVariables.internalMaximum;
            else
                this.maximum = Math.ceil(max / this.interval) * this.interval;

            //var nfrac = Math.max(-Math.floor(Math.log(d)/Math.LN10), 0); //number of fractional digits to show

            if (this.type === "axisX") {
                if (!(this.sessionVariables.internalMinimum !== null)) {
                    this.minimum = min - minDiff / 2;
                }
                if (!this.sessionVariables.internalMaximum) {

                    this.maximum = max + minDiff / 2;
                }

                this.intervalStartPosition = Math.floor((this.minimum + (this.interval * .2)) / this.interval) * this.interval;
            } else if (this.type === "axisY") {
                this.intervalStartPosition = this.minimum;
                //Apply includeZero
                //if (!(this._options && this._options.minimum) && this.includeZero) {
                //if (this.includeZero) {
                //    if (this.minimum > 0)
                //        this.minimum = 0;
                //}

                ////if (!(this._options && this._options.maximum) && this.includeZero) {
                //if (this.includeZero) {
                //    if (this.maximum < 0)
                //        this.maximum = 0;
                //}
            }


        }

        if (this.type === "axisX") {
            this._absoluteMinimum = this._options && typeof (this._options.minimum) !== "undefined" ? this._options.minimum : this.dataInfo.min - minDiff / 2;
            this._absoluteMaximum = this._options && typeof (this._options.maximum) !== "undefined" ? this._options.maximum : this.dataInfo.max + minDiff / 2;
        }

        //Set valueFormatString
        if (!this.valueFormatString) {
            this.valueFormatString = "#,##0.##";

            range = Math.abs(this.maximum - this.minimum);

            if (range < 1) {
                var numberOfDecimals = Math.floor(Math.abs(Math.log(range) / Math.LN10)) + 2;

                if (numberOfDecimals > 2) {
                    for (var i = 0; i < numberOfDecimals - 2; i++)
                        this.valueFormatString += "#";
                }
            }

        }

        //if (isDebugMode && window.console) {
        //    window.console.log(this.type + ": Min = " + this.minimum);
        //    window.console.log(this.type + ": Max = " + this.maximum);
        //    window.console.log(this.type + ": Interval = " + this.interval);
        //}
    }

    Axis.getNiceNumber = function (x, round) {

        var exp = Math.floor(Math.log(x) / Math.LN10);
        var f = x / Math.pow(10, exp);
        var nf;

        if (round) {
            if (f < 1.5)
                nf = 1;
            else if (f < 3)
                nf = 2;
            else if (f < 7)
                nf = 5;
            else
                nf = 10;
        }
        else {
            if (f <= 1)
                nf = 1;
            else if (f <= 2)
                nf = 2;
            else if (f <= 5)
                nf = 5;
            else nf = 10;
        }

        return nf * Math.pow(10, exp);
    }

    Axis.prototype.getLabelStartPoint = function () {

        var intervalInMilliseconds = convertToNumber(this.interval, this.intervalType);
        var minimum = Math.floor((this.minimum) / intervalInMilliseconds) * intervalInMilliseconds;
        var dateTime = new Date(minimum);

        if (this.intervalType === "millisecond") {
            //millisecond = dateTime.getMilliSecond();
            //millisecond = Math.floor((millisecond + this.interval) / this.interval) * this.interval;
        }
        else if (this.intervalType === "second") {
            if (dateTime.getMilliseconds() > 0) {
                dateTime.setSeconds(dateTime.getSeconds() + 1);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "minute") {
            if (dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setMinutes(dateTime.getMinutes() + 1);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "hour") {
            if (dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setHours(dateTime.getHours() + 1);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "day") {
            if (dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setDate(dateTime.getDate() + 1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "week") {
            if (dateTime.getDay() > 0 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setDate(dateTime.getDate() + (7 - dateTime.getDay()));
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "month") {
            if (dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setMonth(dateTime.getMonth() + 1);
                dateTime.setDate(1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }
        else if (this.intervalType === "year") {
            if (dateTime.getMonth() > 0 || dateTime.getDate() > 1 || dateTime.getHours() > 0 || dateTime.getMinutes() > 0 || dateTime.getSeconds() > 0 || dateTime.getMilliseconds() > 0) {
                dateTime.setFullYear(dateTime.getFullYear() + 1);
                dateTime.setMonth(0);
                dateTime.setDate(1);
                dateTime.setHours(0);
                dateTime.setMinutes(0);
                dateTime.setSeconds(0);
                dateTime.setMilliseconds(0);
            }
        }

        return dateTime;
    }

    //#endregion Axis

    //#region StripLine

    function StripLine(chart, options, theme, id) {
        StripLine.parent.constructor.call(this, "StripLine", options, theme);

        this._thicknessType = "pixel";

        this.id = id;

        if (this.startValue !== null && this.endValue !== null) {

            this.value = ((this.startValue.getTime ? this.startValue.getTime() : this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2;
            this.thickness = Math.max(this.endValue - this.startValue);
            this._thicknessType = "value";
        }
    }
    extend(StripLine, CanvasJSObject);

    //#endregion StripLine

    //#region ToolTip

    function ToolTip(chart, options, theme) {
        ToolTip.parent.constructor.call(this, "ToolTip", options, theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
        this.currentSeriesIndex = -1;
        this.currentDataPointIndex = -1;
        this._timerId = 0;
        this._prevX = NaN;
        this._prevY = NaN;

        this._initialize();
    }
    extend(ToolTip, CanvasJSObject);

    ToolTip.prototype._initialize = function () {

        if (this.enabled) {
            this.container = document.createElement("div");
            this.container.setAttribute("class", "canvasjs-chart-tooltip");
            this.container.style.position = "absolute";
            this.container.style.height = "auto";
            this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
            this.container.style.zIndex = "1000";
            //this.container.style.pointerEvents = "none";
            this.container.style.display = "none";
            //this.container.style.whiteSpace = "no-wrap";

            var toolTipHtml = "<div style=\" width: auto;";
            toolTipHtml += "height: auto;";
            toolTipHtml += "min-width: 50px;";
            toolTipHtml += "line-height: 20px;";
            toolTipHtml += "padding: 5px;";
            toolTipHtml += "font-family: Calibri, Arial, Georgia, serif;";
            toolTipHtml += "font-weight: 400;";
            toolTipHtml += "font-style: " + (isCanvasSupported ? "italic;" : "normal;");
            toolTipHtml += "font-size: 14px;";
            toolTipHtml += "color: #000000;";
            toolTipHtml += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
            toolTipHtml += "text-align: left;";
            toolTipHtml += "border: 2px solid gray;";

            //Older browsers like IE8- don't support alpha values
            toolTipHtml += isCanvasSupported ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";

            toolTipHtml += "text-indent: 0px;";
            toolTipHtml += "white-space: nowrap;";
            //toolTipHtml += "pointer-events:none;";
            toolTipHtml += "border-radius: 10px;";
            //toolTipHtml += "opacity: 0;";
            //toolTipHtml += "filter: progid: DXImageTransform.Microsoft.gradient(GradientType = 0, startColorstr = '#4cffffff', endColorstr = '#4cffffff');";

            if (!isCanvasSupported) {
                //toolTipHtml += "-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=90)'";
                //-ms-filter: "progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000')";
                /* For IE 5.5 - 7 */
                toolTipHtml += "filter: alpha(opacity = 90);";
                toolTipHtml += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');";
            }

            toolTipHtml += "} \"> Sample Tooltip</div>";

            this.container.innerHTML = toolTipHtml;
            this.contentDiv = this.container.firstChild;


            this.container.style.borderRadius = this.contentDiv.style.borderRadius;
            this.chart._canvasJSContainer.appendChild(this.container);
        }
    }

    ToolTip.prototype.mouseMoveHandler = function (x, y) {

        if (!(this._lastUpdated && (new Date().getTime() - this._lastUpdated) < 40)) {
            this._lastUpdated = new Date().getTime();
            this._updateToolTip(x, y);
        }
    }

    ToolTip.prototype._updateToolTip = function (mouseX, mouseY) {
        //return;

        if (!this.enabled)
            return;

        if (typeof (mouseX) === "undefined" || typeof (mouseY) === "undefined") {
            if (isNaN(this._prevX) || isNaN(this._prevY))
                return;
            else {
                mouseX = this._prevX;
                mouseY = this._prevY;
            }
        } else {
            this._prevX = mouseX;
            this._prevY = mouseY;
        }


        var dataPoint = null;
        var dataSeries = null;
        var toolTipContent = "";
        var entries = [];
        var toolTipRight;
        var toolTipBottom;
        var x = 0;

        if (this.shared && this.chart.plotInfo.axisPlacement !== "none") {
            // && this.chart.plotInfo.axisPlacement !== "none"
            if (this.chart.plotInfo.axisPlacement === "xySwapped") {
                x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.height * ((this.chart.axisX.lineCoordinates.y2 - mouseY)) + this.chart.axisX.minimum;
            }
            else {
                x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum;
            }

            var nearbyEntries = [];

            for (var i = 0; i < this.chart.data.length; i++) {
                var entry = this.chart.data[i].getDataPointAtX(x, true);

                if (entry && entry.index >= 0) {
                    entry.dataSeries = this.chart.data[i];

                    if (entry.dataPoint.y !== null)
                        nearbyEntries.push(entry);
                }
            }

            if (nearbyEntries.length === 0)
                return;

            nearbyEntries.sort(function (entry1, entry2) {
                return entry1.distance - entry2.distance;
            });

            var closest = nearbyEntries[0];

            for (i = 0; i < nearbyEntries.length; i++) {

                if (nearbyEntries[i].dataPoint.x.valueOf() === closest.dataPoint.x.valueOf())
                    entries.push(nearbyEntries[i]);
            }

            nearbyEntries = null;

        } else {

            var dataPointInfo = this.chart.getDataPointAtXY(mouseX, mouseY, true);
            //dataPointInfo = null;

            if (dataPointInfo) {
                this.currentDataPointIndex = dataPointInfo.dataPointIndex;
                this.currentSeriesIndex = dataPointInfo.dataSeries.index;
            } else if (isCanvasSupported) {

                var id = getObjectId(mouseX, mouseY, this.chart._eventManager.ghostCtx);
                if (id > 0 && typeof this.chart._eventManager.objectMap[id] !== "undefined") {//DataPoint/DataSeries event
                    eventObject = this.chart._eventManager.objectMap[id];

                    //if (this.currentSeriesIndex === eventObject.dataSeriesIndex && this.currentDataPointIndex === eventObject.dataPointIndex)
                    //  return;
                    //else {
                    this.currentSeriesIndex = eventObject.dataSeriesIndex;
                    this.currentDataPointIndex = eventObject.dataPointIndex >= 0 ? eventObject.dataPointIndex : -1;
                    //}

                    //window.console.log("id: " + id + "; hex: " + intToHexColorString(id));
                } else
                    this.currentDataPointIndex = -1;

            } else
                this.currentDataPointIndex = -1;


            if (this.currentSeriesIndex >= 0) {

                dataSeries = this.chart.data[this.currentSeriesIndex];

                var entry = {};

                if (this.currentDataPointIndex >= 0) {
                    dataPoint = dataSeries.dataPoints[this.currentDataPointIndex];

                    entry.dataSeries = dataSeries;
                    entry.dataPoint = dataPoint;
                    entry.index = this.currentDataPointIndex;
                    entry.distance = Math.abs(dataPoint.x - x);
                } else if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                    var x = (this.chart.axisX.maximum - this.chart.axisX.minimum) / this.chart.axisX.lineCoordinates.width * (mouseX - this.chart.axisX.lineCoordinates.x1) + this.chart.axisX.minimum.valueOf();

                    entry = dataSeries.getDataPointAtX(x, true);
                    entry.dataSeries = dataSeries;
                    this.currentDataPointIndex = entry.index;
                    dataPoint = entry.dataPoint;
                } else {
                    //this.hide();
                    return;
                }

                if (entry.dataPoint.y !== null)
                    entries.push(entry);
            }
        }


        if (entries.length > 0) {

            this.highlightObjects(entries);


            var toolTipInnerHtml = "";

            toolTipInnerHtml = this.getToolTipInnerHTML({ entries: entries });

            this.contentDiv.innerHTML = toolTipInnerHtml;

            this.contentDiv.innerHTML = toolTipInnerHtml;

            var previouslyHidden = false;
            if (this.container.style.display === "none") {
                previouslyHidden = true;
                this.container.style.display = "block";
            }

            try {
                this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.borderColor ? this.borderColor : entries[0].dataPoint.color ? entries[0].dataPoint.color : entries[0].dataSeries.color ? entries[0].dataSeries.color : entries[0].dataSeries._colorSet[entries[0].index % entries[0].dataSeries._colorSet.length];
            } catch (e) { }

            //var toolTipContent = dataSeries.toolTipContent ? dataSeries.toolTipContent : dataPoint.toolTipContent ? dataPoint.toolTipContent : "<strong>{x}</strong><br/><strong style='\"'color:{color};'\"'>{name}</strong>,&nbsp;&nbsp;<strong>y</strong>:{y}";

            //var toolTipInnerHtml = " x: " + (this.chart.plotInfo.axisXValueType === "dateTime" ? dateFormat(searchResult.dataPoint.x, this.chart.axisX.valueFormatString) : numberFormat(searchResult.dataPoint.x, this.chart.axisX.valueFormatString)) + ", y: " + numberFormat(searchResult.dataPoint.y, "#,###0.##");
            if (entries[0].dataSeries.type === "pie" || entries[0].dataSeries.type === "doughnut" || entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
                //toolTipRight = mouseX - 10;
                toolTipLeft = mouseX - 10 - this.container.clientWidth;
            } else {
                //toolTipRight = (((this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.maximum - this.chart.axisX.minimum)) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.minimum)) + this.chart.axisX.lineCoordinates.x1 + .5) << 0;
                toolTipLeft = (((this.chart.axisX.lineCoordinates.width / Math.abs(this.chart.axisX.maximum - this.chart.axisX.minimum)) * Math.abs(entries[0].dataPoint.x - this.chart.axisX.minimum)) + this.chart.axisX.lineCoordinates.x1 + .5) - this.container.clientWidth << 0;
                toolTipLeft -= 10;
            }

            //toolTipRight = (toolTipRight - 10 - this.container.clientWidth) > 0 ? (this.chart.width - toolTipRight + 10) + "px" : (this.chart.width - toolTipRight + (toolTipRight - 10 - this.container.clientWidth)) + "px";
            //toolTipRight = (toolTipRight - 10 - this.container.clientWidth) > 0 ? (this.chart.width - toolTipRight + 10) + "px" : (this.chart.width - toolTipRight + (toolTipRight - 10 - this.container.clientWidth)) + "px";
            toolTipLeft = toolTipLeft > 0 ? toolTipLeft + "px" : toolTipLeft + this.container.clientWidth + 20 + "px";


            if (entries.length === 1 && !this.shared && (entries[0].dataSeries.type === "line" || entries[0].dataSeries.type === "stepLine" || entries[0].dataSeries.type === "spline" || entries[0].dataSeries.type === "area" || entries[0].dataSeries.type === "stepArea" || entries[0].dataSeries.type === "splineArea" || entries[0].dataSeries.type === "stackedArea" || entries[0].dataSeries.type === "stackedArea100")) {
                toolTipBottom = (entries[0].dataSeries.axisY.lineCoordinates.y2 - entries[0].dataSeries.axisY.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisY.maximum - entries[0].dataSeries.axisY.minimum) * Math.abs(entries[0].dataPoint.y - entries[0].dataSeries.axisY.minimum) + .5) << 0;
            } else if (entries[0].dataSeries.type === "bar" || entries[0].dataSeries.type === "stackedBar" || entries[0].dataSeries.type === "stackedBar100") {
                toolTipBottom = (entries[0].dataSeries.axisX.lineCoordinates.y2 - entries[0].dataSeries.axisX.lineCoordinates.height / Math.abs(entries[0].dataSeries.axisX.maximum - entries[0].dataSeries.axisX.minimum) * Math.abs(entries[0].dataPoint.x - entries[0].dataSeries.axisX.minimum) + .5) << 0;
            }
            else {
                toolTipBottom = mouseY;
            }

            toolTipBottom = (-toolTipBottom + 10);

            if (toolTipBottom + this.container.clientHeight + 5 > 0) {
                toolTipBottom -= toolTipBottom + this.container.clientHeight + 5 - 0
            }

            toolTipBottom += "px";

            //this.container.style.right = toolTipRight;
            this.container.style.left = toolTipLeft;
            this.container.style.bottom = toolTipBottom;

            if (!this.animationEnabled || previouslyHidden) {
                this.disableAnimation();
            }
            else
                this.enableAnimation();

            //if (isDebugMode)
            //  console.log("searchX: " + x + " x: " + searchResult.dataPoint.x + "; y: " + searchResult.dataPoint.y + "; distance: " + searchResult.distance + "; steps: " + steps);
        }
    }


    ToolTip.prototype.highlightObjects = function (entries) {

        if (!this.enabled)
            return;

        //this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
        var overlaidCanvasCtx = this.chart.overlaidCanvasCtx;
        this.chart.resetOverlayedCanvas();

        overlaidCanvasCtx.save();


        var plotArea = this.chart.plotArea;
        overlaidCanvasCtx.rect(plotArea.x1, plotArea.y1, plotArea.width, plotArea.height);
        overlaidCanvasCtx.clip();
        overlaidCanvasCtx.beginPath();


        for (var i = 0; i < entries.length; i++) {

            var entry = entries[i];

            var eventObject = this.chart._eventManager.objectMap[entry.dataSeries.dataPointIds[entry.index]];

            if (!eventObject || !eventObject.objectType || eventObject.objectType !== "dataPoint")
                continue;

            var dataSeries = this.chart.data[eventObject.dataSeriesIndex];
            var dataPoint = this.chart.data[eventObject.dataPointIndex];
            var index = eventObject.dataPointIndex;

            if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "scatter"
				|| dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
                markerProps.size = Math.max(markerProps.size * 1.5 << 0, 10);

                markerProps.borderColor = markerProps.borderColor || "#FFFFFF";
                markerProps.borderThickness = markerProps.borderThickness || Math.ceil(markerProps.size * .1);

                //overlaidCanvasCtx.globalAlpha = .8;
                RenderHelper.drawMarkers([markerProps]);
                //overlaidCanvasCtx.globalAlpha = .8;
            } else if (dataSeries.type === "bubble") {
                var markerProps = dataSeries.getMarkerProperties(index, eventObject.x1, eventObject.y1, this.chart.overlaidCanvasCtx);
                markerProps.size = eventObject.size;
                markerProps.color = "white";
                markerProps.borderColor = "white";
                //markerProps.borderThickness = 2;
                overlaidCanvasCtx.globalAlpha = .3;
                RenderHelper.drawMarkers([markerProps]);
                overlaidCanvasCtx.globalAlpha = 1;
            } else if (dataSeries.type === "column" || dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100"
				|| dataSeries.type === "bar" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100") {
                overlaidCanvasCtx.globalAlpha = .3;
                drawRect(overlaidCanvasCtx, eventObject.x1, eventObject.y1, eventObject.x2, eventObject.y2, "white", false, false, false, false);
                overlaidCanvasCtx.globalAlpha = 1;
            }
            else if (dataSeries.type === "pie" || dataSeries.type === "doughnut") {
                overlaidCanvasCtx.globalAlpha = .3;
                drawSegment(overlaidCanvasCtx, eventObject.center, eventObject.radius, "white", dataSeries.type, eventObject.startAngle, eventObject.endAngle);
                overlaidCanvasCtx.globalAlpha = 1;
            }
            continue;
        }

        overlaidCanvasCtx.globalAlpha = 1;

        overlaidCanvasCtx.restore();
        return;
    }

    ToolTip.prototype.getToolTipInnerHTML = function (e) {
        var entries = e.entries;
        var toolTipInnerHtml = "";
        var dataSeries = null;
        var dataPoint = null;
        var index = 0;
        var color = null;
        var toolTipContent = "";

        var isToolTipDefinedInData = true;
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].dataSeries.toolTipContent || entries[i].dataPoint.toolTipContent) {
                isToolTipDefinedInData = false;
                break;
            }
        }

        if (isToolTipDefinedInData && this.content && typeof (this.content) === "function") {

            toolTipInnerHtml = this.content({ entries: entries });

        } else {

            if (entries.length > 1) {

                for (var i = 0; i < entries.length; i++) {
                    dataSeries = entries[i].dataSeries;
                    dataPoint = entries[i].dataPoint;
                    index = entries[i].index;

                    toolTipContent = "";

                    if (i === 0 && isToolTipDefinedInData && !this.content) {
                        toolTipContent += typeof (this.chart.axisX.labels[dataPoint.x]) !== "undefined" ? this.chart.axisX.labels[dataPoint.x] : "{x}";
                        toolTipContent += "</br>";
                    }

                    if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
					|| dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
					|| dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}";
                    } else if (dataSeries.type === "bubble") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
                    } else if (dataSeries.type === "pie" || dataSeries.type === "doughnut") {
                        toolTipContent += dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "&nbsp;&nbsp;{y}";
                    }

                    toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);

                    if (i < entries.length - 1)
                        toolTipInnerHtml += "</br>";
                }
            } else {

                dataSeries = entries[0].dataSeries;
                dataPoint = entries[0].dataPoint;
                index = entries[0].index;

                //color = dataPoint.color ? dataPoint.color : dataSeries.color ? dataSeries.color : dataSeries._colorSet[index % dataSeries._colorSet.length];

                if (dataSeries.type === "line" || dataSeries.type === "stepLine" || dataSeries.type === "spline" || dataSeries.type === "area" || dataSeries.type === "stepArea" || dataSeries.type === "splineArea" || dataSeries.type === "column" || dataSeries.type === "bar" || dataSeries.type === "scatter"
					|| dataSeries.type === "stackedColumn" || dataSeries.type === "stackedColumn100" || dataSeries.type === "stackedBar" || dataSeries.type === "stackedBar100"
					|| dataSeries.type === "stackedArea" || dataSeries.type === "stackedArea100") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y}";
                } else if (dataSeries.type === "bubble") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : "<span style='\"'color:{color};'\"'>" + (dataPoint.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}";
                } else if (dataSeries.type === "pie" || dataSeries.type === "doughnut") {
                    toolTipContent = dataPoint.toolTipContent ? dataPoint.toolTipContent : dataSeries.toolTipContent ? dataSeries.toolTipContent : this.content && typeof (this.content) !== "function" ? this.content : (dataPoint.name ? "{name}:&nbsp;&nbsp;" : dataPoint.label ? "{label}:&nbsp;&nbsp;" : "") + "{y}";
                }

                toolTipInnerHtml += this.chart.replaceKeywordsWithValue(toolTipContent, dataPoint, dataSeries, index);
            }
        }

        return toolTipInnerHtml;
    }

    ToolTip.prototype.enableAnimation = function () {
        if (this.container.style.WebkitTransition)
            return;

        //this.container.style.WebkitTransition = "right .2s ease-out, bottom .2s ease-out";
        //this.container.style.MozTransition = "right .2s ease-out, bottom .2s ease-out";
        //this.container.style.MsTransition = "right .2s ease-out, bottom .2s ease-out";
        //this.container.style.transition = "right .2s ease-out, bottom .2s ease-out";
        this.container.style.WebkitTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.MozTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.MsTransition = "left .2s ease-out, bottom .2s ease-out";
        this.container.style.transition = "left .2s ease-out, bottom .2s ease-out";
    }

    ToolTip.prototype.disableAnimation = function () {
        if (!this.container.style.WebkitTransition)
            return;

        this.container.style.WebkitTransition = "";
        this.container.style.MozTransition = "";
        this.container.style.MsTransition = "";
        this.container.style.transition = "";
    }

    ToolTip.prototype.hide = function () {
        if (!this.enabled)
            return;

        this.container.style.display = "none";
        this.currentSeriesIndex = -1;
        this._prevX = NaN;
        this._prevY = NaN;
        //this.chart.overlaidCanvasCtx.clearRect(0, 0, this.chart.overlaidCanvas.width, this.chart.overlaidCanvas.height);
        this.chart.resetOverlayedCanvas();
    }

    Chart.prototype.replaceKeywordsWithValue = function (str, dp, ds, index) {
        var regex = /\{\s*[a-zA-Z]+\s*\}|"[^"]*"|'[^']*'/g;
        var chart = this;

        var fcn = function ($0) {
            if (($0[0] === "\"" && $0[$0.length - 1] === "\"") || ($0[0] === "\'" && $0[$0.length - 1] === "\'"))
                return $0.slice(1, $0.length - 1);

            var key = trimString($0.slice(1, $0.length - 1));
            var obj = null;

            if (key === "color") {
                return dp.color ? dp.color : ds.color ? ds.color : ds._colorSet[index % ds._colorSet.length];
            }

            if (dp.hasOwnProperty(key))
                obj = dp;
            else if (ds.hasOwnProperty(key))
                obj = ds;
            else return "";

            if (key === "x") {
                if (chart.axisX && chart.plotInfo.axisXValueType === "dateTime")
                    return dateFormat(obj[key], dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : chart.axisX && chart.axisX.valueFormatString ? chart.axisX.valueFormatString : "DD MMM YY", chart._cultureInfo);
                else
                    return numberFormat(obj[key], dp.xValueFormatString ? dp.xValueFormatString : ds.xValueFormatString ? ds.xValueFormatString : "#,##0.########", chart._cultureInfo);
            } else if (key === "y")
                return numberFormat(obj[key], dp.yValueFormatString ? dp.yValueFormatString : ds.yValueFormatString ? ds.yValueFormatString : "#,##0.########", chart._cultureInfo);
            else
                return obj[key];
        }

        return str.replace(regex, fcn);
    }


    //#endregion ToolTip

    //#region Event Manager

    function EventManager(chart) {
        this.chart = chart;
        this.lastObjectId = 0;
        var _this = this;
        this.objectMap = [];
        this.rectangularRegionEventSubscriptions = [];
        this.previousDataPointEventObject = null;
        //this.previousDataSeriesEventObject = null;

        this.ghostCanvas = createCanvas(this.chart.width, this.chart.height);
        //this.ghostCanvas.width = this.chart.width;
        //this.ghostCanvas.height = this.chart.height;

        this.ghostCtx = this.ghostCanvas.getContext("2d");

        var eventHandler = function (ev) {
            _this.mouseEventHandler.call(_this, ev);
        };

        this.mouseoveredObjectMaps = [];
        //this.chart.canvas.addEventListener("mouseover", eventHandler);
        //this.chart.canvas.addEventListener("mousemove", eventHandler);
        //this.chart.canvas.addEventListener("mouseout", eventHandler);
        //this.chart.canvas.addEventListener("click", eventHandler);
    }

    EventManager.prototype.reset = function () {
        this.lastObjectId = 0;
        this.objectMap = [];
        this.rectangularRegionEventSubscriptions = [];
        this.previousDataPointEventObject = null;

        this.eventObjects = [];
        //this.ghostCanvas.width = this.chart.width;
        //this.ghostCanvas.height = this.chart.height;

        if (isCanvasSupported) {
            this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height);
            this.ghostCtx.beginPath();
        }
    }

    EventManager.prototype.getNewObjectTrackingId = function () {
        return ++this.lastObjectId;
    }

    EventManager.prototype.mouseEventHandler = function (ev) {

        if (ev.type !== "mousemove" && ev.type !== "click")
            return;

        var eventObjectMaps = [];
        var xy = getMouseCoordinates(ev);
        var id = null;

        //var dataPointInfo = this.chart.getDataPointAtXY(xy.x, xy.y, false);

        //if (dataPointInfo) {
        //	id = dataPointInfo.dataSeries.dataPointIds[dataPointInfo.dataPointIndex];
        //} else if (isCanvasSupported) {//IE9+
        //	id = getObjectId(xy.x, xy.y, this.ghostCtx);
        //}
        id = this.chart.getObjectAtXY(xy.x, xy.y, false);

        if (id && typeof (this.objectMap[id]) !== "undefined") {

            var eventObjectMap = this.objectMap[id];

            if (eventObjectMap.objectType === "dataPoint") {
                var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
                var dataPoint = dataSeries.dataPoints[eventObjectMap.dataPointIndex];
                var dataPointIndex = eventObjectMap.dataPointIndex;

                //Event Parameter should not contain reference to dataSeries directly. But to its options.
                eventObjectMap.eventParameter = { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries._options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index };
                eventObjectMap.eventContext = { context: dataPoint, userContext: dataPoint, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };
                eventObjectMaps.push(eventObjectMap);

                //Add Dataseries too because mouse event on dataPoint also means there is an event on dataSeries. DataSeries is not present on ghost canvas
                eventObjectMap = this.objectMap[dataSeries.id];

                //Event Parameter should not contain reference to dataSeries directly. But to its options.
                eventObjectMap.eventParameter = { x: xy.x, y: xy.y, dataPoint: dataPoint, dataSeries: dataSeries._options, dataPointIndex: dataPointIndex, dataSeriesIndex: dataSeries.index };
                eventObjectMap.eventContext = { context: dataSeries, userContext: dataSeries._options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };
                eventObjectMaps.push(this.objectMap[dataSeries.id]);
            }
                //else if (eventObjectMap.objectType === "stripLine") {

                //	//Event Parameter should not contain reference to stripLine directly. But to its options.
                //	eventObjectMap.eventParameter = { x: xy.x, y: xy.y, stripLine: eventObjectMap.stripLine._options, axis: eventObjectMap.axis._options, stripLineIndex: eventObjectMap.stripLineIndex };
                //	eventObjectMap.eventContext = { context: eventObjectMap.stripLine, userContext: eventObjectMap.stripLine._options, mouseover: "mouseover", mousemove: "mousemove", mouseout: "mouseout", click: "click" };

                //	eventObjectMaps.push(eventObjectMap);
                //}
            else if (eventObjectMap.objectType === "legendItem") {

                var dataSeries = this.chart.data[eventObjectMap.dataSeriesIndex];
                var dataPoint = dataSeries.dataPoints[eventObjectMap.dataPointIndex];

                //Event Parameter should not contain reference to DataSeries directly. But to its options.
                eventObjectMap.eventParameter = { x: xy.x, y: xy.y, dataSeries: dataSeries._options, dataPoint: dataPoint, dataPointIndex: eventObjectMap.dataPointIndex, dataSeriesIndex: eventObjectMap.dataSeriesIndex };
                eventObjectMap.eventContext = { context: this.chart.legend, userContext: this.chart.legend._options, mouseover: "itemmouseover", mousemove: "itemmousemove", mouseout: "itemmouseout", click: "itemclick" };
                eventObjectMaps.push(eventObjectMap);
            }
        }

        //Fire mouseout if existing mouseovered objects are not present in the objectmap.
        var mouseOutObjectMapsExcluded = [];
        for (var i = 0; i < this.mouseoveredObjectMaps.length; i++) {
            var mouseOut = true;

            for (var j = 0; j < eventObjectMaps.length; j++) {
                if (eventObjectMaps[j].id === this.mouseoveredObjectMaps[i].id) {
                    mouseOut = false;
                    break;
                }
            }

            if (mouseOut) {
                this.fireEvent(this.mouseoveredObjectMaps[i], "mouseout", ev);
            } else {
                mouseOutObjectMapsExcluded.push(this.mouseoveredObjectMaps[i]);
            }
        }

        this.mouseoveredObjectMaps = mouseOutObjectMapsExcluded;

        //Process new eventObectMaps
        //If they already don't exist, add them and fire mouseover
        //If ev.type is mousemove, then just fire mousemove
        //If ev.type is click, then fire two events - click followed by mousemove
        for (var i = 0; i < eventObjectMaps.length; i++) {

            var existing = false;

            for (var j = 0; j < this.mouseoveredObjectMaps.length; j++) {
                if (eventObjectMaps[i].id === this.mouseoveredObjectMaps[j].id) {
                    existing = true;
                    break;
                }
            }

            if (!existing) {
                this.fireEvent(eventObjectMaps[i], "mouseover", ev);
                this.mouseoveredObjectMaps.push(eventObjectMaps[i]);
            }

            if (ev.type === "click") {
                this.fireEvent(eventObjectMaps[i], "click", ev);
            } else if (ev.type === "mousemove") {
                this.fireEvent(eventObjectMaps[i], "mousemove", ev);
            }
        }
    }

    EventManager.prototype.fireEvent = function (eventObjectMap, eventType, ev) {

        if (!eventObjectMap || !eventType)
            return;

        var eventParameter = eventObjectMap.eventParameter;
        var eventContext = eventObjectMap.eventContext;
        //var context = eventObjectMap.eventContext.context;
        var userContext = eventObjectMap.eventContext.userContext

        if (userContext && eventContext && userContext[eventContext[eventType]])
            userContext[eventContext[eventType]].call(userContext, eventParameter);

        if (eventType !== "mouseout") {
            if (userContext.cursor && userContext.cursor !== ev.target.style.cursor) {
                ev.target.style.cursor = userContext.cursor;
            }
        } else {
            ev.target.style.cursor = this.chart._defaultCursor;
            delete eventObjectMap.eventParameter; // reference no longer required.
            delete eventObjectMap.eventContext; // reference no longer required.
        }

        //This is just a quick fix. Need to find a better way of doing it.
        if (eventType === "click" && eventObjectMap.objectType === "dataPoint" && this.chart.pieDoughnutClickHandler) {
            this.chart.pieDoughnutClickHandler.call(this.chart.data[eventObjectMap.dataSeriesIndex], eventParameter);
        }
    }

    //#endregion Event Manager

    //#region Class CultureInfo

    function CultureInfo(chart, culture) {

        var cultureInfo;

        if (culture && cultures[culture])
            cultureInfo = cultures[culture];


        Title.parent.constructor.call(this, "CultureInfo", cultureInfo, chart.theme);

        this.chart = chart;
        this.canvas = chart.canvas;
        this.ctx = this.chart.ctx;
    }

    extend(CultureInfo, CanvasJSObject);

    //#endregion Class CultureInfo

    //#region Render Helper

    var RenderHelper = {
        drawMarker: function (x, y, ctx, markerType, markerSize, markerColor, markerBorderColor, markerBorderThickness) {

            if (!ctx)
                return;

            var alpha = 1;

            ctx.fillStyle = markerColor ? markerColor : "#000000";
            ctx.strokeStyle = markerBorderColor ? markerBorderColor : "#000000";
            ctx.lineWidth = markerBorderThickness ? markerBorderThickness : 0;


            if (markerType === "circle") {

                ctx.moveTo(x, y);
                ctx.beginPath();
                //return;

                ctx.arc(x, y, markerSize / 2, 0, Math.PI * 2, false);

                if (markerColor)
                    ctx.fill();

                if (markerBorderThickness) {

                    if (!markerBorderColor) {
                        alpha = ctx.globalAlpha;
                        ctx.globalAlpha = .15;
                        ctx.strokeStyle = "black";
                        ctx.stroke();
                        ctx.globalAlpha = alpha;
                    } else
                        ctx.stroke();

                }
            }
            else if (markerType === "square") {

                //ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
                ctx.beginPath();
                ctx.rect(x - markerSize / 2, y - markerSize / 2, markerSize, markerSize);

                if (markerColor)
                    ctx.fill();

                if (markerBorderThickness) {

                    if (!markerBorderColor) {
                        alpha = ctx.globalAlpha;
                        ctx.globalAlpha = .15;
                        ctx.strokeStyle = "black";
                        ctx.stroke();
                        ctx.globalAlpha = alpha;
                    } else
                        ctx.stroke();

                }
            } else if (markerType === "triangle") {

                ctx.beginPath();
                ctx.moveTo(x - markerSize / 2, y + markerSize / 2);
                ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
                ctx.lineTo(x, y - markerSize / 2);
                ctx.closePath();

                if (markerColor)
                    ctx.fill();

                if (markerBorderThickness) {

                    if (!markerBorderColor) {
                        alpha = ctx.globalAlpha;
                        ctx.globalAlpha = .15;
                        ctx.strokeStyle = "black";
                        ctx.stroke();
                        ctx.globalAlpha = alpha;
                    } else
                        ctx.stroke();

                }
                ctx.beginPath();
            } else if (markerType === "cross") {

                ctx.strokeStyle = markerColor;
                markerBorderThickness = markerSize / 4;
                ctx.lineWidth = markerBorderThickness;

                ctx.beginPath();
                ctx.moveTo(x - markerSize / 2, y - markerSize / 2);
                ctx.lineTo(x + markerSize / 2, y + markerSize / 2);
                ctx.stroke();

                ctx.moveTo(x + markerSize / 2, y - markerSize / 2);
                ctx.lineTo(x - markerSize / 2, y + markerSize / 2);
                ctx.stroke();

            }


        },
        drawMarkers: function (markers) {
            for (var i = 0; i < markers.length; i++) {
                var marker = markers[i];

                RenderHelper.drawMarker(marker.x, marker.y, marker.ctx, marker.type, marker.size, marker.color, marker.borderColor, marker.borderThickness);
            }
        }
        //,
        //draw1pxLine: function (x1, y1, x2, y2, color, ctx) {
        //	ctx.beginPath();
        //	ctx.drawRect(x1, y1, x2 - x1, y2 - y1);
        //	ctx.stroke();
        //}
    }

    //#endregion Render Helper

    //#endregion Class Definitions

    //#region Public API
    var CanvasJS = {

        Chart: function (containerId, options) {
            var _chart = new Chart(containerId, options, this);

            this.render = function () { _chart.render(this.options) };
            //console.log(_chart);
            this.options = _chart._options;
        },
        addColorSet: function (name, colorSet) {
            colorSets[name] = colorSet;
        },
        addCultureInfo: function (name, cultureInfo) {
            cultures[name] = cultureInfo;
        }
    }

    CanvasJS.Chart.version = "v1.4.1 GA";
    window.CanvasJS = CanvasJS;
    //#endregion Public API

})();