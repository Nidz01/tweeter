/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//function to convert ms from 1970 to time in the past from today
const msToOther = ms => {
  const diff = Date.now() - ms;
  if (diff < 1000) {
    return "Moments";
  } else if (diff < 60000) {
    return Math.floor(diff / 1000) + " second(s)";
  } else if (diff < 360000) {
    return Math.floor(diff / 60000) + " minute(s)";
  } else if (diff < 86400000) {
    return Math.floor(diff / 360000) + " hour(s)";
  } else if (diff < 31536000000) {
    return Math.floor(diff / 86400000) + " day(s)";
  } else {
    return Math.floor(diff / 31536000000) + " year(s)";
  }
};

const createTweetElement = function (tweetData) {
  //clear the container before to read all tweets
  //$("#tweets-container").empty();
  // markup
  let tweet = `
  <article id="tweet-article">
  <header id="tweet-header">
    <img class="logo" src=${tweetData.user.avatars} />
    <h2 class="name">${tweetData.user.name}</h2>
    <span class="style-name">${tweetData.user.handle}</span>
  </header>
  <div>${tweetData.content.text}</div>
  </div><footer><span class="time">${msToOther(tweetData.created_at)} ago</span>
  <div class="options">
  <span><i class="fa fa-flag" aria-hidden="true"></i></span>
  <span><i class="fa fa-retweet" aria-hidden="true"></i></span>
  <span<i class="fa fa-heart" aria-hidden="true"></i></span>
  </div>
  </footer>
  </article>
 `;
  return tweet;
};

const renderTweets = function (tweets) {

  //clear the container before to read all tweets
  $("#tweets-container").empty();

  // loops through tweets
  for (let i = (tweets.length - 1); i >= 0 ; i--) {

    // calls createTweetElement for each tweet
    let tweet = createTweetElement(tweets[i]);

    // takes return value and appends it to the tweets container
    $('#tweets-container').append(tweet);
  }
};

$(document).ready(function () {
  //click event on textarea which will empty text area and remove error message
  $("#tweet-text").on("click", function (event) {
    $('#error-message').text("");
  });

  //event listener to submit button
  $("#form").on("submit", function (event) {

    //prevent to change the page
    event.preventDefault();

    //const textArea = $(this).find('#tweet-text');

    //prepare data for Ajax calling
    const data = $(this).serialize();

    //data validation before sending it to server
    //slice method to remove unwanted strings in start of input
    const validationData = data.slice(5);

    if (validationData.length > 140) {
      $('#error-message').text("Your message is too long!");

    } else if (validationData === "" || validationData === null) {
      $('#error-message').text("Your message is empty!");
    
    } else {

      //ajax post request to send data to server
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: data,
        success: function (data) {
          loadTweets(data);
          $('#error-message').text("");
          $('#tweet-text').val("");
          $('#counter').val('140');
        },
        error: function () { }
      });
    }
  });
  //function that load tweets from db, and show on screen (call renderTweets function)
  const loadTweets = function () {

    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (data) {
        renderTweets(data);
      },
      error: function () { }
    });
  };
    //start the app showing the tweets
    loadTweets();
});
