const seedCards = [
  { q: "What does HTML stand for?", a: "HyperText Markup Language" },
  { q: "What does CSS control?", a: "The visual style and layout of a web page." },
  { q: "What is JavaScript used for?", a: "Adding behavior and interactivity to web pages." }
];

const stored = JSON.parse(localStorage.getItem("learnloop-cards") || "null");
let cards = stored?.length ? stored : seedCards;
let current = 0;
let reviewed = Number(localStorage.getItem("learnloop-reviewed") || 0);
let streak = Number(localStorage.getItem("learnloop-streak") || 0);

const $ = (id) => document.getElementById(id);

function save() {
  localStorage.setItem("learnloop-cards", JSON.stringify(cards));
  localStorage.setItem("learnloop-reviewed", reviewed);
  localStorage.setItem("learnloop-streak", streak);
}

function render() {
  const card = cards[current];
  $("question").textContent = card.q;
  $("answer").textContent = "";
  $("show").textContent = "Reveal answer";
  $("position").textContent = `${current + 1} / ${cards.length}`;
  $("reviewed").textContent = reviewed;
  $("streak").textContent = streak;
  $("progress").style.width = `${Math.round(((current + 1) / cards.length) * 100)}%`;

  $("list").innerHTML = cards.map((item, i) => `
    <div class="deck-item">
      <span>${i + 1}. ${escapeHtml(item.q)}</span>
      <button class="delete" data-delete="${i}" aria-label="Delete card">×</button>
    </div>`).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;" }[ch]));
}

$("show").addEventListener("click", () => {
  const answer = $("answer");
  const hidden = !answer.textContent;
  answer.textContent = hidden ? cards[current].a : "";
  $("show").textContent = hidden ? "Hide answer" : "Reveal answer";
});

document.querySelector(".actions").addEventListener("click", (event) => {
  const button = event.target.closest("[data-next]");
  if (!button) return;
  reviewed++;
  if (button.dataset.next === "Easy") streak++;
  else if (button.dataset.next === "Again") streak = 0;
  current = (current + 1) % cards.length;
  save();
  render();
});

$("form").addEventListener("submit", (event) => {
  event.preventDefault();
  const q = $("q").value.trim();
  const a = $("a").value.trim();
  if (!q || !a) return;
  cards.push({ q, a });
  $("q").value = "";
  $("a").value = "";
  current = cards.length - 1;
  save();
  render();
});

$("list").addEventListener("click", (event) => {
  const button = event.target.closest("[data-delete]");
  if (!button || cards.length === 1) return;
  cards.splice(Number(button.dataset.delete), 1);
  current = Math.min(current, cards.length - 1);
  save();
  render();
});

$("next").addEventListener("click", () => {
  current = (current + 1) % cards.length;
  render();
});

render();
