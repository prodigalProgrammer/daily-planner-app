var dateEl = $("#currentDay");
dateEl.css({
  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
  fontSize: "2.5em",
});
var container = $(".container");

function time() {
  var today = dayjs().format("dddd, MMMM DD [at] HH:mm:ss");
  dateEl.text(today);
}

for (var i = 0; i < 9; i++) {
  var section = $("<section>");
  section.attr("data-index", `${i + 1}`);
  container.append(section);
  container.children().addClass("time-block");
  var row = $("<div class='row'>");
  var hour = $("<div class='hour'>");
  hour.css({ width: "100px", lineHeight: "80px" });
  hour.text(`${i + 9}:00`);
  var text = $("<textarea>");
  text.attr("class", `text-area${i + 1}`);
  text.css({ width: "1120px" });
  var save = $("<button class='saveBtn'>");
  save.css({ width: "100px" });
  section.append(row);
  row.append(hour);
  row.append(text);
  row.append(save);

  var icon = $(
    '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>'
  );
  save.append(icon);

  if (parseInt(section.text()) === parseInt(dayjs().format("HH"))) {
    section.addClass("present");
  } else if (parseInt(section.text()) > parseInt(dayjs().format("HH"))) {
    section.addClass("future");
  } else {
    section.addClass("past");
  }
}

function getEvents() {
  for (
    var x = 1;
    x <= document.querySelector(".container").childElementCount;
    ++x
  ) {
    $(`.text-area${x}`).val(localStorage.getItem(`eventItem${x}`));
  }
}
getEvents();

document
  .querySelector(".container")
  .addEventListener("click", function (event) {
    var element = event.target;
    var saveMsg = document.createElement("h2");
    saveMsg.classList.add("saveMsg");
    document.querySelector(".container").prepend(saveMsg);
    console.log(element);
    var textarea = element.previousElementSibling;
    if (element.matches("button") || element.matches("svg")) {
      if (!textarea.value.trim()) {
        saveMsg.textContent = "Cannot save empty events ❌";
      } else {
        saveMsg.textContent =
          `${parseInt(element.closest("section").dataset.index) + 8}` +
          ":00 Event Saved! ✅";
        localStorage.setItem(
          `eventItem${element.closest("section").dataset.index}`,
          textarea.value.trim()
        );
      }
      document.querySelector(".container");
      setTimeout(() => (saveMsg.textContent = ""), 2000);
      console.log(textarea.value.trim());
      getEvents();
    }
  });

setInterval(time, 0);
