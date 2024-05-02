const posts = [];
const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.querySelector(".js-validationMessage");

newPostBtnNode.addEventListener("click", function () {
  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  redernPosts();

  postTitleInputNode.value = "";
  postTextInputNode.value = "";
  newPostBtnNode.setAttribute("disabled", true);
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

  if (
    titleLen === 0 ||
    textLen === 0 ||
    titleLen > TITLE_VALIDATION_LIMIT ||
    textLen > TEXT_VALIDATION_LIMIT
  ) {
    newPostBtnNode.setAttribute("disabled", true);
  } else {
    newPostBtnNode.removeAttribute("disabled");
  }

  validationMessage.classList.add("validationMessage_hidden");
}

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  return {
    title: title,
    text: text,
  };
}

function addPost({ title, text }) {
  let date = new Date();

  posts.unshift({
    date: date,
    title: title,
    text: text,
  });
}

function getPosts() {
  return posts;
}

function redernPosts() {
  const posts = getPosts();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
    <div class= 'post'>
      <p class='post__data'>${post.date.toLocaleString().slice(0, -3)}</p>
      <p class='post__title'>${post.title}</p>
      <p class='post__text'>${post.text}</p>
    </div>
  `;
  });

  postsNode.innerHTML = postsHTML;
}
