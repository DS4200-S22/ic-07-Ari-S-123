/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file

// Set dimensions and margins for plots
const width2 = 900;
const height2 = 450;
const margin2 = {left: 50, right: 50, bottom: 50, top: 50};
const yTooltipOffset2 = 15;

// Appends 'svg' to the id of the div, sets the height and width
// appropriately, so that it can fit inside the viewbox properly, and sets
// it as the svg constant.
const svg = d3
.select("#csv-scatter")
.append("svg")
.attr("width", width2 - margin2.left - margin2.right)
.attr("height", height2 - margin2.top - margin2.bottom)
.attr("viewBox", [0, 0, width2, height2]);

// csv data
d3.csv("data/scatter.csv").then((csvData) => {
  console.log(csvData);

  /*

  Axes

  */

  // Finds the maximum y-value in csvData.
  let maxY = d3.max(csvData, function (d) {
    return d.score;
  });

  // Finds the maximum x-value in csvData.
  let maxX = d3.max(csvData, function (d) {
    return d.day;
  });

  // Creates a vertical visual linear scale with a range from 0 to the maximum y
  // value.
  let yScale = d3.scaleLinear()
  .domain([0, maxY])
  .range([height2 - margin2.bottom, margin2.top]);

  // Creates a horizontal visual linear scale with a domain from 0 to the
  // maximum x value.
  let xScale = d3.scaleLinear() // set scale of data
  .domain([0, maxX])
  .range([margin2.left, width2 - margin2.right])

  // Appends 'g' to svg1 and applies a transformation to it, then creates a
  // vertical left axis and sets the font size to 20px.
  svg.append("g")
  .attr("transform", `translate(${margin2.left}, 0)`)
  .call(d3.axisLeft(yScale))
  .attr("font-size", '20px');

  // Appends 'g' to svg1 and applies a transformation to it, then creates a
  // horizontal axis at the bottom and sets the font size to 20px.
  svg.append("g")
  .attr("transform", `translate(0,${height2 - margin2.bottom})`)
  .call(d3.axisBottom(xScale))
  .attr("font-size", '20px');

  /*
    Tooltip Set-up
  */

  // Adds a tooltip to the scatter plot that is initially invisible.
  const tooltip = d3.select("#csv-scatter")
  .append("div")
  .attr('id', "tooltip")
  .style("opacity", 0)
  .attr("class", "tooltip");

  // Edits the tooltip with the name and score of a datapoint that becomes
  // visible when the cursor hovers over it.
  const mouseover = function (event, d) {
    tooltip.html("Day: " + d.day + "<br> Score: " + d.score + "<br>")
    .style("opacity", 1);
  }

  // Listener function for mouse movements that moves the tooltip with the mouse.
  const mousemove = function (event) {
    //change the location data of the cursor
    tooltip.style("left", (event.pageX) + "px")
    .style("top", (event.pageY + yTooltipOffset2) + "px");
  }

  // Makes the tooltip invisible when the mouse leaves the region.
  const mouseleave = function () {
    tooltip.style("opacity", 0);
  }

  /*
    Scatter-plot
  */

  // Enters the data into the scatter plot, scales and it appropriately, and
  // then adds the mouse listener functions.
  svg.selectAll("circle")
  .data(csvData)
  .enter()
  .append("circle")
  .attr("cx", (d) => xScale(d.day))
  .attr("cy", (d) => yScale(d.score))
  .attr("r", 10)
  .attr('fill', 'orange')
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);

});