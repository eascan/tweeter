/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


$(document).ready(function() {

// render each tweet form database

  const createTweetElement = function (tweetObj) {
    const tweetEL = `
    
    <article class="tweetArticle">

        <header class=allTweets>
          <div class="posterName">
            <img src="${tweetObj.user.avatars}" class="male">
            <p class=user>${tweetObj.user.name}</p>
          </div>
          <div class="username">
            <p>${tweetObj.user.handle}</p>
          </div>
        </header>
        <div class="tweetContent">
          <p class="userTweet">${tweetObj.content.text}</p>
          <p class="empty"></p>
        </div>
        <footer>
          <div class="datePosted">
          ${tweetObj.created_at}
          </div>
          <div>
            <img src="/images/shareIcons.png" class="share">
          </div>
        </footer>

      </article>
      `;

      return tweetEL;

  }

  const renderTweets = function(tweets) {
    // loops through tweets

    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const newTweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $("#tweets").append(newTweet);
    }
  }

  // function to make a GET requests and load the tweet
  const loadTweets = function () {

    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .done((result) => {
        renderTweets(result);
      })
      .fail(() => {
        console.log("There was an error getting tweets")
      })

  }


  $("#writeTweet").on("submit", function (event) {
    // preventing browser from default submitting
    event.preventDefault();

    
    // read data from input text, target the textarea
    const textArea = $(this).find("#tweet-text");
    
    // the actual characters user types
    // const userInput = textArea.val();

    const userInput = textArea.serialize();

    
    // Ajax submission GET method
    $.ajax({
      url: "/tweets",
      method: 'POST',
      data: userInput
    })
      .done(() => {
        console.log(`Successful submission`)
      })
      .fail(() => {
        console.log("There was an error submitting the tweet!")
      })
      .always(() => {
        console.log("Request submitted")
      })

    //empty the tweets section
    $("#tweets").empty();

    // make AJAX GET request upon submit to update tweets

    loadTweets();

    //empty user input area after submission:
    textArea.val("");

  })
})
