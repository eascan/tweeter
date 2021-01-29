//working with the new tweet submissions

$(document).ready(function() {

  // function to change the counter value

  $("#tweet-text").on("keyup", function (event) {
    const userInput = $(this).val().length;
    
    const counter = $(this).closest("#writeTweet").find(".counter");

    const decreasingVal = 140 - userInput;

    const maxChar = 140;
    
  
    // if input over limit, counter turns red
    if (userInput <= maxChar) {
      counter.removeClass("red");
      counter.text(decreasingVal)

    } else if (userInput > maxChar) {
      counter.addClass("red").text(decreasingVal);
    };
  });
});