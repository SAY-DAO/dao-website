function resetFlags() {
  var ch = $(".map").find(".flag");
  for (var i = 0; i < ch.length; i++) {
    $(ch[i]).removeClass("active");
  }
}

function loadContactInfo(country) {
  var data;
  if (country == 1) data = infoIran;
  else if (country == 2) data = infoCroatia;

  $(".email").text(data[0].email);
  $(".phone").text(data[0].phone);
  $(".address").text(data[0].address);

  if (data[0].linkedin != "0") {
    $(".linkedin").removeClass("hide").find("a").attr("href", data[0].linkedin);
  }

  if (data[0].facebook != "0") {
    $(".facebook").removeClass("hide").find("a").attr("href", data[0].facebook);
  }

  if (data[0].instagram != "0") {
    $(".instagram")
      .removeClass("hide")
      .find("a")
      .attr("href", data[0].instagram);
  }
  if (data[0].github != "0") {
    $(".github")
      .removeClass("hide")
      .find("a")
      .attr("href", data[0].github);
  }

  if (data[0].twitter != "0") {
    $(".twitter").removeClass("hide").find("a").attr("href", data[0].twitter);
  }
}

$(document).ready(function () {
  for (var i = 0; i < contactCircle.length; i++) {
    addCircle(
      contactCircle[i].class,
      contactCircle[i].left,
      contactCircle[i].top,
      contactCircle[i].right,
      contactCircle[i].bottom,
      contactCircle[i].color,
      contactCircle[i].image
    );
  }

  loadContactInfo(1);
  $(".map .flag").on("click", function (e) {
    e.preventDefault();
    resetFlags();
    $(this).addClass("active");
    $(".map").css(
      "background-image",
      'url("' + $(this).attr("data-map") + '")'
    );
    if ($(this).attr("id") == "Iran") {
      loadContactInfo(1);
    } else if ($(this).attr("id") == "Croatia") {
      loadContactInfo(2);
    }
  });
});

//--------------------------------- Small Circles ---------------------------------

// var svg = document.createElement('svg');
// document.querySelector('#addSvgCircle').append(svg);
// svg.setAttribute('class', 'svg') ;
d3.select("#addSvgCircleContact").append("svg").attr("class", "svg");

for (var i = 0; i < smallContactCircle.length; i++) {
  makecircle(
    smallContactCircle[i].r,
    smallContactCircle[i].left,
    smallContactCircle[i].top,
    smallContactCircle[i].color
  );
}
