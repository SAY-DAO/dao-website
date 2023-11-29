//--------------------------------- Big Circles ---------------------------------
$(document).ready(function () {
  for (var i = 0; i < homeCircle.length; i++) {
    addCircle(
      homeCircle[i].class,
      homeCircle[i].left,
      homeCircle[i].top,
      homeCircle[i].right,
      homeCircle[i].bottom,
      homeCircle[i].color,
      homeCircle[i].image
    );
  }
});

//--------------------------------- Small Circles ---------------------------------

// var svg = document.createElement('svg');
// document.querySelector('#addSvgCircle').append(svg);
// svg.setAttribute('class', 'svg') ;
d3.select("#addSvgCircle").append("svg").attr("class", "svg");

for (var i = 0; i < smallHomeCircle.length; i++) {
  makecircle(
    smallHomeCircle[i].r,
    smallHomeCircle[i].left,
    smallHomeCircle[i].top,
    smallHomeCircle[i].color
  );
}

//--------------------------------- Testimoniails ---------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Start by loading first Testimonial.
  loadTesti("left1");
  document.querySelectorAll(".testi-link").forEach((link) => {
    link.onclick = () => {
      loadTesti(link.dataset.select);
      return false;
    };
  });
});

function loadTesti(x) {
  if (x === "left1") {
    resetTesti();
    document.getElementById(x).style.filter = "none";
    document.getElementById(x).style.opacity = "1";
    var i = 0;
  } else if (x === "left2") {
    resetTesti();
    document.getElementById(x).style.filter = "none";
    document.getElementById(x).style.opacity = "1";
    var i = 1;
  } else if (x === "right1") {
    resetTesti();
    document.getElementById(x).style.filter = "none";
    document.getElementById(x).style.opacity = "1";
    var i = 3;
  } else {
    resetTesti();
    document.getElementById(x).style.filter = "none";
    document.getElementById(x).style.opacity = "1";
    var i = 4;
  }

  var testiName = testis[i][x].name;
  var position = testis[i][x].position;
  var testimonial = testis[i][x].testiJs;

  document.querySelector("#testiName").innerHTML = testiName;
  document.querySelector("#testiPosition").innerHTML = position;
  document.querySelector("#testiBody").innerHTML = testimonial;
}
// Opacity does not reset
function resetTesti() {
  document
    .querySelectorAll(".testi-link")
    .forEach((e) => (e.style.filter = "grayscale(1)"));
}

//--------------------------------- Stop Scroll at the bottom ---------------------------------
//
// window.onscroll = () => {
//
//     if ($(window).scrollTop() >= 3360) {
//         $(window).scrollTop(3360);
//     }
// };
//
//
