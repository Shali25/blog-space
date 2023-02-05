let postsArray = [];

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

document.getElementById("new-post").addEventListener("submit", function (e) {
  e.preventDefault();
  const formTitle = document.getElementById("form-title").value;
  const formBody = document.getElementById("form-body").value;
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
    });
});
