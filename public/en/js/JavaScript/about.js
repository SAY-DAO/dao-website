//he find() method returns descendant elements of the selected element. $(selector).find(filter)
//remove active flags
function resetAllFlag() {
  var ch = $(".map").find(".flag");
  for (var i = 0; i < ch.length; i++) {
    $(ch[i]).removeClass("active");
  }
}

function resetResponsiveAllFlag() {
  var ch = $(".branchFlag").find(".flagHolder");
  for (var i = 0; i < ch.length; i++) {
    $(ch[i]).removeClass("active");
  }
}

function resetTeamType() {
  var ch = $(".teamMemberType").find(".teamType");
  for (var i = 0; i < ch.length; i++) {
    $(ch[i]).removeClass("active");
  }
}

// ----------------------------------------- view team's info ---------------------------------------
function baseMemberInitIran(index) {
  $(".memberPic")
    .css("background-image", 'url("' + teamIran[index].avatar + '")')
    .attr("data-index", index);
  $(".memberName").text(teamIran[index].name);
  $(".memberPosition").text(teamIran[index].position);
  $(".memberBioDesc").text(teamIran[index].bio);
  if (teamIran[index].linkedin != "0") {
    $(".linkedin")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].linkedin);
  } else {
    $(".linkedin").addClass("hide");
  }
  if (teamIran[index].facebook != "0") {
    $(".facebook")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].facebook);
  } else {
    $(".facebook").addClass("hide");
  }
  if (teamIran[index].instagram != "0") {
    $(".instagram")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].instagram);
  } else {
    $(".instagram").addClass("hide");
  }
  if (teamIran[index].instagram != "0") {
    $(".github")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].github);
  } else {
    $(".github").addClass("hide");
  }
  if (teamIran[index].dribble != "0") {
    $(".dribble")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].dribble);
  } else {
    $(".dribble").addClass("hide");
  }
  if (teamIran[index].behance != "0") {
    $(".behance")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].behance);
  } else {
    $(".behance").addClass("hide");
  }
  if (teamIran[index].twitter != "0") {
    $(".twitter")
      .removeClass("hide")
      .find("a")
      .attr("href", teamIran[index].twitter);
  } else {
    $(".twitter").addClass("hide");
  }
}

function baseMemberInitCroatia(index) {
  $(".memberPic")
    .css("background-image", 'url("' + teamCroatia[index].avatar + '")')
    .attr("data-index", index);
  $(".memberName").text(teamCroatia[index].name);
  $(".memberPosition").text(teamCroatia[index].position);
  $(".memberBioDesc").text(teamCroatia[index].bio);
  if (teamCroatia[index].linkedin != "0") {
    $(".linkedin")
      .removeClass("hide")
      .find("a")
      .attr("href", teamCroatia[index].linkedin);
  } else {
    $(".linkedin").addClass("hide");
  }
  if (teamCroatia[index].facebook != "0") {
    $(".facebook")
      .removeClass("hide")
      .find("a")
      .attr("href", teamCroatia[index].facebook);
  } else {
    $(".facebook").addClass("hide");
  }
  if (teamCroatia[index].instagram != "0") {
    $(".instagram")
      .removeClass("hide")
      .find("a")
      .attr("href", teamCroatia[index].instagram);
  } else {
    $(".instagram").addClass("hide");
  }
  if (teamCroatia[index].dribble != "0") {
    $(".dribble")
      .removeClass("hide")
      .find("a")
      .attr("href", teamCroatia[index].dribble);
  } else {
    $(".dribble").addClass("hide");
  }
  if (teamCroatia[index].behance != "0") {
    $(".behance")
      .removeClass("hide")
      .find("a")
      .attr("href", teamCroatia[index].behance);
  } else {
    $(".behance").addClass("hide");
  }
  if (teamCroatia[index].twitter != "0") {
    $(".twitter")
      .removeClass("hide")
      .find("a")
      .attr("href", teamCroatia[index].twitter);
  } else {
    $(".twitter").addClass("hide");
  }
}

function resetAllTeamMember() {
  var ch = $(".teamRoller").find(".teamMember");
  for (var i = 0; i < ch.length; i++) {
    $(ch).addClass("hide");
  }
}
// ----------------------------------------- view team's info ---------------------------------------

// ----------------------------------------- Place Teams pic in circles ---------------------------------------
function teamMemberloading(from, country) {
  var slot = 1;
  if (country == 1) {
    resetAllTeamMember();
    for (var i = from; i < from + 11 && i < teamIran.length; i++, slot++) {
      $(".slot" + slot + "")
        .css("background-image", 'url("' + teamIran[i].avatar + '")')
        .removeClass("hide")
        .attr("data-index", i);
    }
  } else if (country == 2) {
    resetAllTeamMember();
    for (var i = from; i < from + 11 && i < teamCroatia.length; i++, slot++) {
      $(".slot" + slot + "")
        .css("background-image", 'url("' + teamCroatia[i].avatar + '")')
        .removeClass("hide")
        .attr("data-index", i);
    }
  }
}
// ----------------------------------------- Place Teams pic in circles ---------------------------------------

// ----------------------------------------- Remove the team structure to make responsive ---------------------------------------
function responsiveTeamReset() {
  var ch = $(".teamMemberList").find(".teamMemberAva");
  for (var i = 0; i < ch.length; i++) {
    $(ch).remove();
  }
  ch = $(".teamMemberList").find("span");
  for (var i = 0; i < ch.length; i++) {
    $(ch).remove();
  }
  ch = $(".teamMemberList").find("br");
  for (var i = 0; i < ch.length; i++) {
    $(ch).remove();
  }
}
// ----------------------------------------- Remove the team structure to make responsive ---------------------------------------

// -----------------------------Responsive Team info------------ Team or Advisor? ---------------------------------------
function responsiveTeamInit(country, type) {
  if (country === 1) {
    for (var i = 0; i < teamIran.length; i++) {
      if (teamIran[i].type != type) {
        continue;
      }
      var lin = "";
      var fac = "";
      var ins = "";
      var beh = "";
      var dri = "";
      var twi = "";
      if (teamIran[i].linkedin === "0") {
        lin = "hide";
      } else {
        lin = "left";
      }
      if (teamIran[i].facebook === "0") {
        fac = "hide";
      } else {
        fac = "right";
      }
      if (teamIran[i].instagram === "0") {
        ins = "hide";
      } else {
        ins = "center";
      }
      if (teamIran[i].behance === "0") {
        beh = "hide";
      } else {
        beh = "center";
      }
      if (teamIran[i].dribble === "0") {
        dri = "hide";
      } else {
        dri = "right";
      }
      if (teamIran[i].twitter === "0") {
        twi = "hide";
      } else {
        twi = "center";
      }

      $(".teamMemberList").append(
        "<div class='teamMemberAva'>" +
          "<img src=" +
          teamIran[i].avatar +
          " alt=''>" +
          "<a href=" +
          teamIran[i].linkedin +
          " class='social linkedin  " +
          lin +
          "' ></a>" +
          "<a href=" +
          teamIran[i].facebook +
          " class='social facebook  " +
          fac +
          "'></a>" +
          "<a href=" +
          teamIran[i].instagram +
          " class='social instagram  " +
          ins +
          "'></a>" +
          "<a href=" +
          teamIran[i].dribble +
          " class='social dribble  " +
          dri +
          "'></a>" +
          "<a href=" +
          teamIran[i].behance +
          " class='social behance  " +
          beh +
          "'></a>" +
          "<a href=" +
          teamIran[i].twitter +
          " class='social twitter  " +
          twi +
          "'></a></div>" +
          "<span class='memberName'>" +
          teamIran[i].name +
          "</span> <br/>" +
          "<span class='memberPosition'>" +
          teamIran[i].position +
          "</span>"
      );
    }
  }

  if (country === 2) {
    for (var i = 0; i < teamCroatia.length; i++) {
      if (teamCroatia[i].type != type) {
        continue;
      }
      var lin = "";
      var fac = "";
      var ins = "";
      var beh = "";
      var dri = "";
      var twi = "";
      if (teamCroatia[i].linkedin === "0") {
        lin = "hide";
      } else {
        lin = "left";
      }
      if (teamCroatia[i].facebook === "0") {
        fac = "hide";
      } else {
        fac = "right";
      }
      if (teamCroatia[i].instagram === "0") {
        ins = "hide";
      } else {
        ins = "center";
      }
      if (teamCroatia[i].behance === "0") {
        beh = "hide";
      } else {
        beh = "center";
      }
      if (teamCroatia[i].dribble === "0") {
        dri = "hide";
      } else {
        dri = "right";
      }
      if (teamCroatia[i].twitter === "0") {
        twi = "hide";
      } else {
        twi = "center";
      }

      $(".teamMemberList").append(
        "<div class='teamMemberAva'>" +
          "<img src=" +
          teamCroatia[i].avatar +
          " alt=''>" +
          "<a href=" +
          teamCroatia[i].linkedin +
          " class='social linkedin  " +
          lin +
          "' ></a>" +
          "<a href=" +
          teamCroatia[i].facebook +
          " class='social facebook  " +
          fac +
          "'></a>" +
          "<a href=" +
          teamCroatia[i].instagram +
          " class='social instagram  " +
          ins +
          "'></a>" +
          "<a href=" +
          teamCroatia[i].dribble +
          " class='social dribble  " +
          dri +
          "'></a>" +
          "<a href=" +
          teamCroatia[i].behance +
          " class='social behance  " +
          beh +
          "'></a>" +
          "<a href=" +
          teamCroatia[i].twitter +
          " class='social twitter  " +
          twi +
          "'></a></div>" +
          "<span class='memberName'>" +
          teamCroatia[i].name +
          "</span> <br/>" +
          "<span class='memberPosition'>" +
          teamCroatia[i].position +
          "</span>"
      );
    }
  }
}
// -----------------------------Responsive Team info------------ Team or Advisor? ---------------------------------------

var index = 0;
var countryTeam = 1;
$(document).ready(function () {
  // Create the page circles
  for (var i = 0; i < aboutCircle.length; i++) {
    addCircle(
      aboutCircle[i].class,
      aboutCircle[i].left,
      aboutCircle[i].top,
      aboutCircle[i].right,
      aboutCircle[i].bottom,
      aboutCircle[i].color,
      aboutCircle[i].image
    );
  }
  $("body").css("max-height", "3000px").css("overflow-y", "auto");

  // Initializing First Team
  baseMemberInitIran(index);
  // Palce their pic in circle
  teamMemberloading(1, 1);
  // Initializing First Responsive Team
  responsiveTeamInit(1, "team");

  // Team Branch Selection - Remove the active class and activate the clicked flag + palce the proper team
  $(".flag").on("click", function () {
    resetAllFlag();
    $(this).addClass("active");

    //the html text --> Our team in Iran
    var cn = $(this).attr("id");
    if (cn === "Iran") $(".branchCountry").text("Iran");
    if (cn === "Croatia") $(".branchCountry").text("Croatia");
    $(".map").css(
      "background-image",
      'url("' + $(this).attr("data-map") + '")'
    );

    if ($(this).attr("id") == "Iran") {
      index = 0;
      countryTeam = 1;
      baseMemberInitIran(index);
      teamMemberloading(1, countryTeam);
    } else if ($(this).attr("id") == "Croatia") {
      index = 0;
      countryTeam = 2;
      baseMemberInitCroatia(index);
      teamMemberloading(1, countryTeam);
    }
  });

  // Team Branch Selection Responsive
  $(".flagHolder").on("click", function () {
    resetResponsiveAllFlag();
    $(this).addClass("active");

    if ($(this).hasClass("iran")) {
      countryTeam = 1;
      responsiveTeamReset();
      responsiveTeamInit(countryTeam, "team");
      resetTeamType();
      $(".members").addClass("active");
    } else if ($(this).hasClass("croatia")) {
      countryTeam = 2;
      responsiveTeamReset();
      responsiveTeamInit(countryTeam, "advisor");
      resetTeamType();
      $(".advisors").addClass("active");
    }
  });

  $(".teamType").on("click", function () {
    resetTeamType();
    $(this).addClass("active");

    if ($(this).hasClass("members")) {
      responsiveTeamReset();
      responsiveTeamInit(countryTeam, "team");
    } else if ($(this).hasClass("advisors")) {
      responsiveTeamReset();
      responsiveTeamInit(countryTeam, "advisor");
    }
  });

  $(".teamMember").on("mouseover", function () {
    $(this).animate({ height: "74px", width: "74px" }, 200);
  });
  $(".teamMember").on("mouseout", function () {
    $(this).animate({ height: "70px", width: "70px" }, 200);
  });

  $(".teamMember").on("click", function () {
    var slotNum = $(this).attr("data-index");
    var baseMemeberNum = $(".memberPic").attr("data-index");
    baseMemberInitIran(slotNum);
    $(this)
      .css("background-image", 'url("' + teamIran[baseMemeberNum].avatar + '")')
      .attr("data-index", baseMemeberNum);
  });

  // startupLive go throw
  $("#startupLive").on("click", function () {
    window.open(
      "https://www.startuplive.org/event/zagreb-2018-10#audience",
      "_blank"
    );
  });

  $("#fi").on("click", function () {
    window.open("https://fi.co/overview", "_blank");
  });

  $("#ae").on("click", function () {
    window.open(
      "https://link.medium.com/pAr4ZjYP9U?fbclid=IwAR0n4lNMZAhzAA3TbjDP0ZuzOP56PF3Ae2uyaR10cwIU71T3-Ap2aovjP9A",
      "_blank"
    );
  });

  // $('.nav-item button').on('click' , function(e){
  //     e.preventDefault();

  //     window.location.replace('http://say.company/index.html#subscribe');

  // })

  if (window.innerWidth <= 540) {
    $("#right-arrow").attr("src", "img/right-arrow.png");
    $("#left-arrow").attr("src", "img/left-arrow.png");
  } else {
    $("#right-arrow").attr("src", "img/right.png");
    $("#left-arrow").attr("src", "img/left.png");
  }
});

//--------------------------------- Small Circles ---------------------------------

// var svg = document.createElement('svg');
// document.querySelector('#addSvgCircle').append(svg);
// svg.setAttribute('class', 'svg') ;
d3.select("#addSvgCircleAbout").append("svg").attr("class", "svg");

for (var i = 0; i < smallAboutCircle.length; i++) {
  makecircle(
    smallAboutCircle[i].r,
    smallAboutCircle[i].left,
    smallAboutCircle[i].top,
    smallAboutCircle[i].color
  );
}

//Stop Scroll at the bottom
// window.onscroll = () => {
//
//     if ($(window).scrollTop() >= 2160) {
//         $(window).scrollTop(2160);
//     }
// };
