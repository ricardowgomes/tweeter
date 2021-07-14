const createPost = (post) => {
  const $articleTweets = $('.display-tweets');

  const $post = $('<div>').html(`
    <div class="tweet-header">
      <div>
        <img src=${post.user.avatars} alt="user-avatar">
          <span class="name">${post.user.name}</span>
    </div>
        <span class="user-handle">${post.user.handle}</span>
      </div>

      <div class="tweet-text">
        <p>
          ${post.content.text}
        </p>
      </div>
      <hr>
        <div class="tweet-footer">
          <span>${timeago.format(post.created_at)}</span>
          <div class="icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </div>
</div>
      `).addClass('tweet-container');

  $articleTweets.append($post);

  return $articleTweets;
};

const renderPosts = (posts) => {
  $('.display-tweets').empty();
  for (const post of posts) {
    const $post = createPost(post);
    $('.display-tweets').prepend($post);
  }
};

module.exports = { renderPosts };