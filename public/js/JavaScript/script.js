function addCircle(classname, left, top, right, bottom, bgcolor, image) {
  var query =
    '<div data-depth="8.6" class="' +
    classname +
    '" style=" left:' +
    left +
    "; right :" +
    right +
    "; top :" +
    top +
    "; bottom:" +
    bottom +
    "; background-color:" +
    bgcolor +
    "; background-image:url(" +
    image +
    '); background-size: contain; background-position: 175px center;" ></div>';
  $("body").append(query);
}

function makecircle(r, left, top, color) {
  const svg = d3.selectAll(".svg");
  const circ = svg.append("circle");
  circ.attr("r", r);
  circ.attr("cx", left);
  circ.attr("cy", top);
  circ.style("fill", color);
}

function makecircle2(r, left, top, color) {
  const svg = d3.selectAll(".svg2");
  const circ = svg.append("circle");
  circ.attr("r", r);
  circ.attr("cx", left);
  circ.attr("cy", top);
  circ.style("fill", color);
}

// #testimonial .testi-link.active, #testimonial .testi-link:hover {
//     filter: grayscale(0);
//     opacity: 1
//

// const svg = d3.select('.svg');
// const c = svg.append('circle')
//     .attr('cx', left)
//     .attr('cy', top)
//     .attr('r', 20)
//     .attr('bottom', 0)
//     .attr('right', 0)
//     .attr('image', image)
//     .style('fill', color);

// function makeCircle( left , top , right , bottom , color , image) {
//     const svg = d3.select('.svg');
//     const c = svg.append('circle')
//                 .attr('cx', left)
//                 .attr('cy', top)
//                 .attr('r', 20)
//                 .attr('bottom', 0)
//                 .attr('right', 0)
//                 .attr('image', image)
//                 .style('fill', color)
// //

//     // Create new svg tag

// makeCircle()

// function makeCircle() {

// }
