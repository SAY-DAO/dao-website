//--------------------------------- top Circle ---------------------------------
$(document).ready(function () {
  for (var i = 0; i < rightCircle.length; i++) {
    addCircle(
      rightCircle[i].class,
      rightCircle[i].left,
      rightCircle[i].top,
      rightCircle[i].right,
      rightCircle[i].bottom,
      rightCircle[i].color,
      rightCircle[i].image
    );
  }
});

// var svg = document.createElement('svg');
// document.querySelector('#addSvgCircle').append(svg);
// svg.setAttribute('class', 'svg') ;
d3.select("#addSvgRightCircle").append("svg").attr("class", "svg");

for (var i = 0; i < smallrightCircle.length; i++) {
  makecircle(
    smallrightCircle[i].r,
    smallrightCircle[i].left,
    smallrightCircle[i].top,
    smallrightCircle[i].color,
    smallrightCircle[i].opacity,
    console.log(smallrightCircle[i].opacity)
  );
}

//--------------------------------- Change Content---------------------------------

load_page("first");
// Set links up to load new pages.
document.querySelectorAll(".circle").forEach(function (button) {
  button.onclick = function () {
    resetColor(button);
    this.style.backgroundColor = "#FFD590";
    $("#rightstxt").empty();
    load_page(button.dataset.page);
  };
});

function bullets(name, i) {
  for (var k = 0; k < contents[i][name].length; k++) {
    const li = document.createElement("li");
    li.className = "buls";
    li.innerHTML = contents[i][name][k];
    document.querySelector("#rightstxt").append(li);
  }
}
// Renders contents of new page in main view.
function load_page(name) {
  if (name === "first") {
    var i = 0;
  } else if (name === "second") {
    var i = 1;
  } else if (name === "third") {
    var i = 2;
  } else if (name === "fourth") {
    var i = 3;
  } else if (name === "fifth") {
    var i = 4;
  } else if (name === "sixth") {
    var i = 5;
  }
  bullets(name, i);
}

//--------------------------------- Click Circle ---------------------------------

function resetColor() {
  document
    .querySelectorAll(".circle")
    .forEach((e) => (e.style.backgroundColor = "white"));
}
