const posts = [];
const TITLE_VALIDATION_LIMIT = 50;
const TEXT_VALIDATION_LIMIT = 200;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.querySelector(".js-validationMessage");

newPostBtnNode.addEventListener("click", function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  redernPosts();
});

postTitleInputNode.addEventListener("input", validation);

postTextInputNode.addEventListener("input", validation);

function validation() {
  const titleLen = postTitleInputNode.value.length;
  const textLen = postTextInputNode.value.length;

  if (titleLen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длинна заголовка привыщает ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    return;
  }
  if (textLen > TEXT_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длинна текста привыщает ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    return;
  }

  validationMessage.classList.add("validationMessage_hidden");
}

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  if (!title || !text) {
    return null;
  }

  return {
    title: title,
    text: text,
  };
}

function addPost({ title, text }) {
  posts.push({
    title: title,
    text: text,
  });
}

function getPosts() {
  return posts;
}

function redernPosts() {
  const posts = getPosts();
  let date = new Date();
  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
    <div class= 'post'>
      <p class='post__data'>${date.toLocaleString().slice(0, -3)}</p>
      <p class='post__title'>${post.title}</p>
      <p class='post__text'>${post.text}</p>
    </div>
  `;
  });

  postsNode.innerHTML = postsHTML;
}
