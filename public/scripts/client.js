// const { renderTweets } = require('./helperFunctions');
const createTweets = (post) => {
  // Data from user:
  const uAvatar = post.user.avatars;
  const uName = post.user.name;
  const uHandle = post.user.handle;
  const cText = post.content.text;
  const timeCreated = timeago.format(post.created_at);

  // Creation of Footer
  const $flag = $('<i>').addClass('fas fa-flag');
  const $retweet = $('<i>').addClass('fas fa-retweet');
  const $heart = $('<i>').addClass('fas fa-heart');
  const $icons = $('<div>').addClass('icons');
  $icons.append($flag, $retweet, $heart);
  const $timeago = $('<span>').text(timeCreated);
  const $footer = $('<div>').addClass('tweet-footer');
  $footer.append($timeago, $icons);


  // Creation of Text Tweet
  const $tweetText = $('<p>').text(cText);
  const $tweetDiv = $('<div>').addClass('tweet-text');
  $tweetDiv.append($tweetText);

  // Creation of Text Header
  const $userAvatar = $('<img>').attr('src', uAvatar).attr('alt', 'user-avatar').addClass('tweet-text');
  const $userName = $('<span>').text(uName).addClass('name');
  const $leftDiv = $('<div>').append($userAvatar, $userName);
  const $userHandle = $('<span>').text(uHandle).addClass('user-handle');
  const $header = $('<div>').addClass('tweet-header');
  $header.append($leftDiv, $userHandle);

  const $post = $('<div>').addClass('tweet-container');
  $post.append($header, $tweetDiv, $('<hr>'), $footer);

  const $articleTweets = $('.display-tweets');
  $articleTweets.append($post);

  return $articleTweets;
};

const renderTweets = (posts) => {
  let $tweetContainer = $('.display-tweets');
  $tweetContainer.empty();
  for (const post of posts) {
    const $post = createTweets(post);
    $tweetContainer.prepend($post);
  }
};

$(document).ready(() => {
  const loadTweets = () => {
    $.get('/tweets', (posts) => {
      const $tweets = renderTweets(posts);
      $('.display-tweets').append($tweets);
    });
  };

  loadTweets();

  const $form = $('#new-tweet');
  $form.on('submit', function (event) {
    event.preventDefault();
    const textarea = $('#tweet-text');

    if (textarea.val().length === 0) {
      const errorMessage = 'Come on! Just write something! <img src="./images/error-icon.svg">';
      const $elementDiv = $('#error');

      return $('#new-tweet').slideDown("slow", () => {
        $elementDiv.html(errorMessage);
        setTimeout(() => {
          $elementDiv.html('');
        }, 2000);
      });
    }

    if (textarea.val().length > 140) {
      const errorMessage = 'Wow! Your tweets are limited to 140 characters <img src="./images/error-icon.svg">';
      const $elementDiv = $('#error');

      return $('#new-tweet').slideDown("slow", () => {
        $elementDiv.html(errorMessage);
        setTimeout(() => {
          $elementDiv.html('');
        }, 2000);
      });
    }

    const urlEncodedData = $(this).serialize();

    textarea.val('');

    $.post('/tweets', urlEncodedData)
      .then((response) => {
        loadTweets();
      });
  });
});