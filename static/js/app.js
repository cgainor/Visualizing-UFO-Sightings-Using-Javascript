// from data.js
var ufoData = data;
var counter = 0;

// Reference to table body location in index.html
var tbody = d3.select("tbody");

// Initialize list to hold unique shape options
var shapeOptions = [];

// Reference to shape option location in index.html
var optionsList = d3.select("select");

// Function to render table
function renderTable(tableData) {

    // Loop Through `tableData`
    tableData.forEach((alienReport) => {
        // Console.log each alien report object
        //   console.log(alienReport);

        // Use d3 to append one table row `tr` for each alien report object
        var row = tbody.append("tr");

        // Use `Object.entries` to iterate through each report's values
        Object.entries(alienReport).forEach(([key, value]) => {
            // Console.log each weather report value
            // console.log(key, value)

            // Use d3 to append 1 cell per alien report value (datetime, city, state, country, shape, durationMinutes, comments)
            var cell = row.append("td");

            // Use d3 to update each cell's text with alien report values
            cell.text(value);

            // Append to list of unique shape options
            if (key === "shape") {
                if (!(shapeOptions.includes(value))) {
                    shapeOptions.push(value);
                    // Use d3 to append 1 cell per options for shape to dropdown list in filter
                    var option = optionsList.append("option")
                    // Use d3 to update each option's text with unique shape options
                    option.text(value)
                }
            }
        })

    });
}


// Reference to filter button
var filter = d3.select("#filter-btn");

// Function to filter data
function filterButton() {

    d3.event.preventDefault();

    var queryDate = d3.select("#datetime").property("value");
    var queryCity = d3.select("#city").property("value");
    var queryState = d3.select("#state").property("value");
    var queryCountry = d3.select("#country").property("value");
    var queryShape = d3.select("#shape").property("value");

    var filteredData = data;
    if (queryDate != "") {
        filteredData = filteredData.filter(d => d.datetime == queryDate);
    }
    if (queryCity != "") {
        filteredData = filteredData.filter(d => d.city.toLowerCase() == queryCity.toLowerCase());
    }
    if (queryState != "") {
        filteredData = filteredData.filter(d => d.state.toLowerCase() == queryState.toLowerCase());
    }
    if (queryCountry != "") {
        filteredData = filteredData.filter(d => d.country.toLowerCase() == queryCountry.toLowerCase());
    }
    if (queryShape != "Select Shape") {
        filteredData = filteredData.filter(d => d.shape.toLowerCase() == queryShape.toLowerCase());
    }
    tbody.html('');
    renderTable(filteredData);
}

// Reference to reset button
var reset = d3.select("#reset-btn");

// Function to reset data
function resetButton() {
    d3.event.preventDefault();
    tbody.html('');
    renderTable(ufoData)
}

renderTable(ufoData);
filter.on("click", filterButton);
reset.on("click", resetButton);