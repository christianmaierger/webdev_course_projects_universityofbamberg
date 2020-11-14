document.querySelector(".navbar-toggler").addEventListener("click", function(e) { document.querySelector("#navbarNavAltMarkup").classList.toggle("show"); });
displayLoadingAndDiagram(plot_entwicklung);
displayLoadingAndDiagram(plotFaelle);


async function plot_entwicklung() {
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var width_all = width + margin.left + margin.right
    var height_all = height + margin.top + margin.bottom

    var svg = d3.select("#entwicklung")
        .append("svg")
        .attr("viewBox", `0 0 ` + width_all + ` ` + height_all)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // get selected country code, get data for that country and create plot
    var e = document.getElementById("countries");
    var strCountry = e.options[e.selectedIndex].value;

    // Fetch data
    const data = await fetchCountryData(strCountry, 1);
    console.l
    if (data == 0) {
        // define x axis
        var x = d3.scaleLinear()
            .range([0, width - 20])

        // define y axis
        var y = d3.scaleLinear()
            .range([height, 0]);

        // append axis to svg
        svg.append("g")
            .attr("transform", "translate(" + 20 + "," + (height - 20) + ")")
            .call(d3.axisBottom(x)).selectAll("text").remove();
        svg.append("g")
            .attr("transform", "translate(" + 20 + "," + -20 + ")")
            .call(d3.axisLeft(y)).selectAll("text").remove();

        // add labels to axis
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "0.9vw")
            .attr("font-weight", "bold")
            .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
            .text("Datum");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .style("text-anchor", "middle")
            .attr("font-size", "0.9vw")
            .attr("font-weight", "bold")
            .text("Neue tägliche Fälle");
    }

    //create datums array for all dates in data
    var datums = Object.keys(data.timelineitems[0]);

    //create array with values for new daily cases
    var new_daily_cases_array = [];
    for (var i in [...Array(Object.values(data.timelineitems[0]).length).keys()]) {
        new_daily_cases_array.push(Object.values(data.timelineitems[0])[i].new_daily_cases);
    }

    // define the dates of interest
    var selected_dates = new Array("3/15/20", "3/29/20", "4/12/20", "4/26/20", "5/03/20", "5/11/20", "5/18/20", "5/25/20")
        // save indices of dates of interest
    var indices = new Array
        // save number of daily cases of dates of interest in extra array
    var new_daily_cases_array_dates = new Array
    for (var i in selected_dates) {
        // get index of selected date
        var index = datums.indexOf(selected_dates[i])
        indices.push(index)
            // get corresponding number of new daily cases
        new_daily_cases_array_dates.push(new_daily_cases_array[indices[i]])
    }

    // define x axis
    var x = d3.scaleBand()
        .range([0, width - 20])
        .domain(selected_dates);
    // define y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(new_daily_cases_array_dates)])
        .range([height, 0]);

    // append axis to svg
    svg.append("g")
        .attr("transform", "translate(" + 20 + "," + (height - 20) + ")")
        .call(d3.axisBottom(x));
    svg.append("g")
        .attr("transform", "translate(" + 20 + "," + -20 + ")")
        .call(d3.axisLeft(y));

    // norm the height of the rects on the height of the svg plot
    var anpass = height / d3.max(new_daily_cases_array_dates)
        // plot each bar of the plot at specific place
    for (i in selected_dates) {
        svg.append("g")
            .selectAll("mop")
            .data(new_daily_cases_array_dates)
            .enter()
            .append("rect")
            .attr('class', 'bar')
            .attr("x", x(selected_dates[i]) + 40)
            .attr("y", (height - new_daily_cases_array_dates[i] * anpass - 20))
            .attr("height", new_daily_cases_array_dates[i] * anpass)
            .attr("width", 50)
            .style("fill", "#69b3a2")
            .style("opacity", 0.5)
    }
    // fill table row with respective number of new daily cases
    d3.select("#table")
        .selectAll("td")
        .data(new_daily_cases_array_dates)
        .text(function(d) { return d })

    // add labels to axis
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "0.9vw")
        .attr("font-weight", "bold")
        .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
        .text("Datum");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .style("text-anchor", "middle")
        .attr("font-size", "0.9vw")
        .attr("font-weight", "bold")
        .text("Neue tägliche Fälle");
}

async function plotFaelle() {
    //Read data
    var countriesData = await getJsonWithCountriesAndTotalCases(2);
    console.log(countriesData);

    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var width_all = width + margin.left + margin.right
    var height_all = height + margin.top + margin.bottom

    // append the svg object to the body of the page
    var svg = d3.select("#containerFaelle")
        .append("svg")
        .attr("viewBox", `0 0 ` + width_all + ` ` + height_all)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 100000000])
        .range([10, width]);
    svg.append("g")
        .attr("transform", "translate(0," + (height - 20) + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 400000])
        .range([height - 20, 0]);
    svg.append("g")
        .attr("transform", "translate(" + (10) + ", 0)")
        .call(d3.axisLeft(y));

    // Add a scale for bubble size
    var z = d3.scaleLinear()
        .domain([5000, 350000])
        .range([1, 125]);

    // Add bubbles
    svg.append('g')
        .selectAll("dot")
        .data(countriesData)
        .enter()
        .append("circle")
        .attr("cx", function(d) { return x(d.inhabitants); })
        .attr("cy", function(d) { return y(d.totalCases); })
        .attr("r", function(d) { return z(d.totalCases); })
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")

    // Add text for bubbles       
    svg.selectAll("nodes")
        .data(countriesData)
        .enter()
        .append('text')
        .attr("x", function(d) { return x(d.inhabitants); })
        .attr("text-anchor", "middle")
        .attr("y", function(d) {
            if (d.country == 'Belgium') {
                return y(d.totalCases - 6000);
            }
            return y(d.totalCases);
        })
        .text(function(d) { return d.country })
        .attr("pointer-events", "none")
        .attr("font-family", "sans-serif")
        .attr("font-size", "1vw")
        .attr("fill", "black");

    // Add x axis label
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "0.9 vw")
        .attr("font-weight", "bold")
        .attr("transform", "translate(" + (width / 2) + "," + (height + margin.bottom) + ")")
        .text("Einwohnerzahl");

    // Add y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .style("text-anchor", "middle")
        .attr("font-size", "0.9 vw")
        .attr("font-weight", "bold")
        .text("Anzahl bestätigter Fälle");
}

// fetch data from local json
async function makeCountriesObject() {
    const response = await fetch('../data/einwohner.json');
    const json = await response.json();
    return json;
}

// fetch data for one country from virustracker
async function fetchCountryData(countryCode, imageNumber) {
    try {
        if (countryCode == "none") {
            return 0;
        }
        var urlEnd = "countryTimeline=";
        if (imageNumber == 2) {
            urlEnd = "countryTotal="
        }
        const response = await fetch('https://api.thevirustracker.com/free-api?' + urlEnd + countryCode);
        const json = await response.json();
        return json;
    } catch (exception) {
        document.getElementById("loading" + imageNumber).src = "../img/error.jpg";
        document.getElementById("loading" + imageNumber).style.display = "inline";
        document.getElementById("loading" + imageNumber).style.margin = "0";
        if (imageNumber == 1) {
            document.getElementById("countries").style.display = "none";
            document.getElementById("label").style.display = "none";
            d3.select("svg").remove();
        }
        alert("Oh oh, an error occurred while loading the data.\nError message: " + exception);
    }
}

// asnychronous for each loop
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// create json from our local json and add total cases per country
async function getJsonWithCountriesAndTotalCases(imageNumber) {
    countriesJson = await makeCountriesObject();
    var countryCodes = ["DE", "IT", "ES", "FR", "GB", "DK", "BE", "SE"];
    await asyncForEach(countryCodes, async(element) => {
        var countryData = await fetchCountryData(element, imageNumber);
        var cases = countryData.countrydata[0].total_cases;
        await asyncForEach(countriesJson, async(element) => {
            if (element.country == countryData.countrydata[0].info.title) {
                element["totalCases"] = cases;
            }
        })
    })
    return countriesJson;
}

// create json from our local json and add total cases per country
async function getJsonWithSelectedDatesAndNewDailyCases(imageNumber) {
    var countryCodes = ["DE", "IT", "ES", "FR", "GB", "DK", "BE", "SE"];
    await asyncForEach(countryCodes, async(element) => {
        var countryData = await fetchCountryData(element, imageNumber);
        var cases = countryData.countrydata[0].total_cases;
        await asyncForEach(countriesJson, async(element) => {
            if (element.country == countryData.countrydata[0].info.title) {
                element["totalCases"] = cases;
            }
        })
    })
    return countriesJson;
}

// loading gif and display plots after random timeout
function displayLoadingAndDiagram(diagramFunction) {
    setTimeout(() => {
        document.getElementById("loading1").style.display = "none";
        document.getElementById("loading2").style.display = "none";
        diagramFunction();
    }, Math.floor(Math.random() * 2000) + 1000)
}

// adapt plot after new country gets selected
function new_select() {
    d3.select("svg").remove();
    document.getElementById("loading1").style.display = "inline";
    displayLoadingAndDiagram(plot_entwicklung);
}