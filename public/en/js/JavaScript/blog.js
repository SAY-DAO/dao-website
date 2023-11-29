function intiTopMediaData() {
  $("#topMedia .mediaDataImage").css(
    "background-image",
    'url("' + mediaData[0].picture + '")'
  );
  $("#topMedia .upTitle").text(mediaData[0].uptitle);
  $("#topMedia .title").text(mediaData[0].title);
  $("#topMedia .summary").text(mediaData[0].summary);
  $("#topMedia .readMore a").attr("href", mediaData[0].link);
}

function fillTheBlogList(from) {
  var ind = 1;
  for (var i = from; i < mediaData.length; i++, ind++) {
    $("#blog" + ind + " .blogTitle").text(mediaData[i].title);
    $("#blog" + ind + " .blogSubTitle").text(mediaData[i].uptitle);
    $("#blog" + ind + " .blogDate").text(mediaData[i].date);
    $("#blog" + ind + " .blogSummary").text(mediaData[i].summary);
    $("#blog" + ind + " .blogItemReadMore a").attr("href", mediaData[i].link);
    $("#blog" + ind + " .blogImg").css(
      "background-image",
      'url("' + mediaData[i].picture + '")'
    );
  }
}

$(document).ready(function () {
  for (var i = 0; i < blogCircle.length; i++) {
    addCircle(
      blogCircle[i].class,
      blogCircle[i].left,
      blogCircle[i].top,
      blogCircle[i].right,
      blogCircle[i].bottom,
      blogCircle[i].color,
      blogCircle[i].image
    );
  }
  // alert(mediaData[0].uptitle);
  intiTopMediaData();
  fillTheBlogList(1);
});
