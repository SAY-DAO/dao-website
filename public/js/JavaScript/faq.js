
$(document).ready(function () {
  for (var i = 0; i < faqCircle.length; i++) {
    addCircle(
      faqCircle[i].class,
      faqCircle[i].left,
      faqCircle[i].top,
      faqCircle[i].right,
      faqCircle[i].bottom,
      faqCircle[i].color,
      faqCircle[i].image
    );
  }

});

//--------------------------------- Small Circles ---------------------------------

// var svg = document.createElement('svg');
// document.querySelector('#addSvgCircle').append(svg);
// svg.setAttribute('class', 'svg') ;
d3.select("#addSvgCircleFaq").append("svg").attr("class", "svg");

for (var i = 0; i < smallFaqCircle.length; i++) {
  makecircle(
    smallFaqCircle[i].r,
    smallFaqCircle[i].left,
    smallFaqCircle[i].top,
    smallFaqCircle[i].color
  );
}
