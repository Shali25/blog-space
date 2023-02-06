let postsArray = [];
const titleInput = document.getElementById("form-title");
const bodyInput = document.getElementById("form-body");
const form = document.getElementById("new-post");

function renderPosts() {
  let html = "";
  for (let post of postsArray) {
    html += `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <hr />
          `;
  }
  document.getElementById("blog-post").innerHTML = html;
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formTitle = titleInput.value;
  const formBody = bodyInput.value;
  const data = {
    title: formTitle,
    body: formBody,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();
      // titleInput.value = "";
      // bodyInput.value = "";
      // showing here 2 ways to clear input/textarea fields
      form.reset();
    });
});
