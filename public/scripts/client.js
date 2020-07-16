/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweetData) {
  //clear the container before to read all tweets
  //$("#tweets-container").empty();
  // markup
  let tweet = `
  <article>
  <header id="tweet-header">
    <img class="logo" src=${tweetData.user.avatars} />
    <h2 class="name">${tweetData.user.name}</h2>
    <span class="style-name">${tweetData.user.handle}</span>
  </header>
  <div>${tweetData.content.text}</div>
  <footer>X days ago</footer>
  </article>
 `;
  return tweet;
};

const renderTweets = function (tweets) {
  
  //clear the container before to read all tweets
  $("#tweets-container").empty();

  // loops through tweets
  for (let i = 0; i < tweets.length; i++) {

    // calls createTweetElement for each tweet
    let tweet = createTweetElement(tweets[i]);

    // takes return value and appends it to the tweets container
    $('#tweets-container').append(tweet);
  }
};

$(document).ready(function () {
  //click event on textarea
  $("#tweet-text").on("click", function (event) {
    $('#error-message').text("");
    $(this).val('');
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
        },
        error: function () { }
      });

      $('#error-message').text("");
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
