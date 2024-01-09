var currentDate = $("#currentDay");
var today = dayjs();
var container = $(".container");

currentDate.text(today.format("dddd, MMMM DD"));

for (var i = 0; i < 9; i++) {
  var section = $("<section>");
  section.attr("data-index", `${i + 1}`);
  container.append(section);
  container.children().addClass("row time-block");
  var hour = $("<div class=''>");
  section.append(hour);
}
