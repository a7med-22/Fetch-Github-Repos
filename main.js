let theInput = document.querySelector(".input");
let button = document.querySelector(".button");
let results = document.querySelector(".results");

button.addEventListener("click", (el) => {
  getRepos();
});

function getRepos() {
  if (theInput.value === "") {
    results.innerHTML = `<span>Please Enter Your Username</span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => res.json())
      .then((repos) => {
        results.innerHTML = "";
        repos.forEach((repo) => {
          let repoElement = createRepoElement(repo);
          results.appendChild(repoElement);
        });
      });
  }
}

function createRepoElement(repo) {
  let mainDiv = document.createElement("div");
  let repoName = document.createTextNode(repo.name);
  mainDiv.appendChild(repoName);

  let url = document.createElement("a");
  url.href = `https://www.github.com/${theInput.value}/${repo.name}`;
  url.setAttribute("target", "_blank");
  let visit = document.createTextNode("visit");
  url.appendChild(visit);

  let details = document.createElement("span");
  details.appendChild(url);

  let starsText = document.createTextNode(`stars ${repo.stargazers_count}`);
  let starsCount = document.createElement("span");
  starsCount.appendChild(starsText);
  details.appendChild(starsCount);

  mainDiv.appendChild(details);
  mainDiv.className = "repo-box";
  return mainDiv;
}


