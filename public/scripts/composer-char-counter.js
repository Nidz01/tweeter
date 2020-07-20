

$(document).ready(function() {
  $(".new-tweet").on( "keyup keypress", "textarea" , function(event) {

    //get the value of 'this', that mean, the text that user entered in a textarea
    let text = $(this).val();


    //get the length of the text and subtract this value from 140.
    let charsLeft = 140 - text.length;

    //go to parent element (form) and find the respective counter

    let counter = $(this).closest("form").find(".counter");

    //set the text to be equal the value calculated above
    counter.text(charsLeft);

    //if the text exceed the 140 limit, that mean the variable charsLeft < 0,
    
    if (charsLeft < 0) {
      counter.addClass("fontRed"); //add a class to the counter that change the font color to red
    } else {
      counter.removeClass("fontRed"); //otherwise, remove that class to let the font color as original
    }
  });
});
