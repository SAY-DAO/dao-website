$(document).ready(function () {
  for (var i = 0; i < singleCircle.length; i++) {
    addCircle(
      singleCircle[i].class,
      singleCircle[i].left,
      singleCircle[i].top,
      singleCircle[i].right,
      singleCircle[i].bottom,
      singleCircle[i].color,
      singleCircle[i].image
    );
  }
});
