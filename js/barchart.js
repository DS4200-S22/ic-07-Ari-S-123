/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 

// Set dimensions and margins for plots
const width = 900;
const height = 450;
const margin = {left: 50, right: 50, bottom: 50, top: 50};
const yTooltipOffset = 15;

// Appends 'svg' to the id of the div, sets the height and width
// appropriately, so that it can fit inside the viewbox properly, and sets
// it as the svg1 constant.
const svg1 = d3
.select("#hard-coded-bar")
.append("svg")
.attr("width", width - margin.left - margin.right)
.attr("height", height - margin.top - margin.bottom)
.attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [{name: 'A', score: 92}, {name: 'B', score: 15},
  {name: 'C', score: 67}, {name: 'D', score: 89}, {name: 'E', score: 53},
  {name: 'F', score: 91}, {name: 'G', score: 18}];

/*

  Axes

*/

// Finds the maximum score in data1.
let maxY1 = d3.max(data1, function (d) {
  return d.score;
});

// Creates a visual linear scale with a domain from 0 to the maximum score
// in the data, and with a range from the bottom of the margin to the top.
let yScale1 = d3.scaleLinear()
.domain([0, maxY1])
.range([height - margin.bottom, margin.top]);

// Creates a band scale with a domain stretching the length of the data, a
// range that stretches the wind of the margin, and 0.1 units of padding.
let xScale1 = d3.scaleBand()
.domain(d3.range(data1.length))
.range([margin.left, width - margin.right])
.padding(0.1);

// Appends 'g' to svg1 and applies a transformation to it, then creates a
// vertical left axis and sets the font size to 20px.
svg1.append("g")
.attr("transform", `translate(${margin.left}, 0)`)
.call(d3.axisLeft(yScale1))
.attr("font-size", '20px');

// Appends 'g' to svg1 and applies a transformation to it, then creates a
// horizontal axis at the bottom and sets the font size to 20px.
svg1.append("g")
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(xScale1)
.tickFormat(i => data1[i].name))
.attr("font-size", '20px');

/* 

  Tooltip Set-up  

*/

// Adds a tooltip to the bar graph that is initially invisible.
const tooltip1 = d3.select("#hard-coded-bar")
.append("div")
.attr('id', "tooltip1")
.style("opacity", 0)
.attr("class", "tooltip");

// Edits the tooltip with the name and score of a datapoint that becomes
// visible when the cursor hovers over it.
const mouseover1 = function (event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>")
  .style("opacity", 1);
}

// Listener function for mouse movements that moves the tooltip with the mouse.
const mousemove1 = function (event, d) {
  tooltip1.style("left", (event.x) + "px")
  .style("top", (event.y + yTooltipOffset) + "px");
}

// Makes the tooltip invisible when the mouse leaves the region.
const mouseleave1 = function (event, d) {
  tooltip1.style("opacity", 0);
}

/* 

  Bars 

*/

// Enters the data into the bar chart, scales and it appropriately, and then
// adds the mouse listener functions.
svg1.selectAll(".bar")
.data(data1)
.enter()
.append("rect")
.attr("class", "bar")
.attr("x", (d, i) => xScale1(i))
.attr("y", (d) => yScale1(d.score))
.attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
.attr("width", xScale1.bandwidth())
.on("mouseover", mouseover1)
.on("mousemove", mousemove1)
.on("mouseleave", mouseleave1);