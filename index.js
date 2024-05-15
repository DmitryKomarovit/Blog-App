const posts = [];
const TITLE_VALIDATION_LIMIT = 10;
const TEXT_VALIDATION_LIMIT = 20;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postsNode = document.querySelector(".js-posts");
const validationMessage = document.querySelector(".js-validationMessage");

newPostBtnNode.addEventListener("click", function () {
  if (!postTextInputNode.value || !postTitleInputNode.value) {
    return;
  }

  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPosts();

  postTitleInputNode.value = "";
  postTextInputNode.value = "";
});

postTitleInputNode.addEventListener("input", validation);

postTextInputNode.addEventListener("input", validation);

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;
  const currentDate = new Date();
  const date = currentDate.toLocaleString().slice(0, -3);

  return {
    date: date,
    title: title,
    text: text,
  };
}

function addPost({ date, title, text }) {
  posts.unshift({
    date: date,
    title: title,
    text: text,
  });
}

function getPosts() {
  return posts;
}

function renderPosts() {
  const posts = getPosts();

  let postsHTML = "";

  posts.forEach((post) => {
    postsHTML += `
    <div class='post'>
      <p class='post__data'>${post.date}</p>
      <p class='post__title'>${post.title}</p>
      <p class='post__text'>${post.text}</p>
    </div>
  `;
  });
  console.log(posts);

  postsNode.innerHTML = postsHTML;
}

function validation() {
  const titleLen = postTitleInputNode.value.length;
  const textLen = postTextInputNode.value.length;

  if (titleLen > TITLE_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длинна заголовка привыщает ${TITLE_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    newPostBtnNode.setAttribute("disabled", "");
    return;
  } else {
    newPostBtnNode.removeAttribute("disabled");
  }

  if (textLen > TEXT_VALIDATION_LIMIT) {
    validationMessage.innerText = `Длинна текста привыщает ${TEXT_VALIDATION_LIMIT} символов`;
    validationMessage.classList.remove("validationMessage_hidden");
    newPostBtnNode.setAttribute("disabled", "");
    return;
  } else {
    newPostBtnNode.removeAttribute("disabled");
  }

  validationMessage.classList.add("validationMessage_hidden");
}
