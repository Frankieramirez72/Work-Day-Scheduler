$(function () {
  // Display the current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Function to apply the past, present, or future class to each time block
  function updateHourBlocks() {
    // Get the current hour in 24-hour format
    var currentHour = dayjs().hour();

    // Iterate over each time block
    $(".time-block").each(function () {
      var hourBlock = parseInt($(this).attr("id").split("-")[1]) + 9;

      // Apply the appropriate class based on the comparison with the current hour
      if (hourBlock < currentHour) {
        $(this).addClass("past");
      } else if (hourBlock === currentHour) {
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("past present");
        $(this).addClass("future");
      }
    });
  }

  // Update the hour blocks on page load
  updateHourBlocks();

  // Get any saved events from local storage and display them
  $(".time-block").each(function () {
    var hourBlock = $(this).attr("id");
    var savedEvent = localStorage.getItem(hourBlock);

    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });

  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();

    localStorage.setItem(timeBlockId, userInput);
  });
});
