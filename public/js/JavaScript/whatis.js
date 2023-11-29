//--------------------------------- top Circle ---------------------------------
$(document).ready(function () {
  for (var i = 0; i < whatCircle.length; i++) {
    addCircle(
      whatCircle[i].class,
      whatCircle[i].left,
      whatCircle[i].top,
      whatCircle[i].right,
      whatCircle[i].bottom,
      whatCircle[i].color,
      whatCircle[i].image
    );
  }
});

//--------------------------------- Small Circles ---------------------------------
d3.selectAll(".whatFlow").append("svg").attr("class", "svg2");

for (var i = 0; i < smallFlowCircle.length; i++) {
  makecircle2(
    smallFlowCircle[i].r,
    smallFlowCircle[i].left,
    smallFlowCircle[i].top,
    smallFlowCircle[i].color
  );
}

// var svg = document.createElement('svg');
// document.querySelector('#addSvgCircle').append(svg);
// svg.setAttribute('class', 'svg') ;
d3.select("#addSvgWhatCircle").append("svg").attr("class", "svg");

for (var i = 0; i < smallWhatCircle.length; i++) {
  makecircle(
    smallWhatCircle[i].r,
    smallWhatCircle[i].left,
    smallWhatCircle[i].top,
    smallWhatCircle[i].color
  );
}

//--------------------------------- Popover  ---------------------------------

$(document).ready(function () {
  $('[data-toggle="popover"]').popover();
});
