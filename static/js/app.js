// from data.js
var ufoData = data;

// Reference to table body location in index.html
var tbody = d3.select("tbody");

// Console.log the alien table data from data.js
// console.log(tableData);

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
        })
    });
}


// Reference to filter button
var filter = d3.select("#filter-btn");

// Function to filter data
function filterButton() {

    d3.event.preventDefault();

    var queryDate = d3.select("#datetime").property("value");

    var filteredData = data;
    if (queryDate != "") {
        filteredData = filteredData.filter(d => d.datetime == queryDate);
    }
    tbody.html('');
    renderTable(filteredData);
}

renderTable(ufoData);
filter.on("click", filterButton);