$(document).ready(() => {
  // Variables of input
  let $nodeNumMax = $("#counter");
  const $numMax = $("#counter").text();
  const $textarea = $("#tweet-text");
  let $numInput = 0;

  // Grab typing
  $textarea.on('input', () => {
    $('#error').html('');
    const $textareaValue = $textarea.val();
    $numInput = $textareaValue.length;

    // clears the counter
    $nodeNumMax.empty();

    const $count = $numMax - $numInput;
    $nodeNumMax.append($count);

    // Add red color to the counter when get to zero and disable the button
    if ($count <= 0) {
      $('output.counter').addClass('overcount');
      // $('.tweet-btn').attr('disabled', 'disabled');

    } else {
      $('output.counter').removeClass('overcount');
      // $('.tweet-btn').removeAttr('disabled');
    }
  });
});


