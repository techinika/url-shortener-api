const inputUrl = document.getElementById("inputUrl");
const submitBtn = document.getElementById("submitBtn");
const feedback = document.getElementById("feedback");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUrl.value == "") {
    console.log("Please add a link!");
    inputUrl.style.border = "3px solid red";
    feedback.innerHTML = "Please add a link!";

    setTimeout(() => {
      inputUrl.style.border = "0px";
      feedback.innerHTML = "";
    }, 3000);
  } else {
    fetch(`https://api.shrtco.de/v2/shorten?url=${inputUrl.value}`)
      .then((res) => res.json())
      .then((data) =>
        display(inputUrl.value, `https://${data.result.short_link2}`)
      )
      .catch((err) => console.log(err));
  }
});

function display(orign, shortned) {
  const container = document.querySelector(".shortenedLinks");

  const div = document.createElement("div");
  div.classList = "link";
  const original = document.createElement("p");
  original.textContent = orign;
  const shortened = document.createElement("p");
  shortened.textContent = shortned;
  shortened.style.color = "hsl(180, 66%, 49%)";
  const copy = document.createElement("button");
  copy.textContent = "Copy";

  copy.addEventListener("click", () => {
    navigator.clipboard.writeText(shortned).then(() => {
      copy.style.backgroundColor = "hsl(257, 27%, 26%)";
      copy.textContent = "Copied!";
    });
  });

  div.appendChild(original);
  div.appendChild(shortened);
  div.appendChild(copy);

  container.appendChild(div);
}
