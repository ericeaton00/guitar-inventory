const CATEGORY_LABELS = {
  guitar: "Guitar",
  amp: "Amp",
  part: "Part",
  equipment: "Equipment",
};

let allItems = [];
let activeCategory = "all";

async function loadInventory() {
  try {
    const res = await fetch("data/inventory.json");
    allItems = await res.json();
  } catch (err) {
    console.error("Could not load data/inventory.json", err);
    allItems = [];
  }
  render();
}

function formatCurrency(n) {
  if (n === null || n === undefined || n === "") return "—";
  return "$" + Number(n).toLocaleString();
}

function matchesSearch(item, query) {
  if (!query) return true;
  const haystack = [item.name, item.brand, item.model, item.notes, ...(item.tags || [])]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function sortItems(items, mode) {
  const copy = [...items];
  switch (mode) {
    case "value-desc":
      return copy.sort((a, b) => (b.current_value_estimate || 0) - (a.current_value_estimate || 0));
    case "value-asc":
      return copy.sort((a, b) => (a.current_value_estimate || 0) - (b.current_value_estimate || 0));
    case "year-desc":
      return copy.sort((a, b) => (b.year || 0) - (a.year || 0));
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function cardTemplate(item) {
  const catClass = item.category || "equipment";
  const catLabel = CATEGORY_LABELS[item.category] || item.category;
  const imageBlock = item.image
    ? `<img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.closest('.card-image').innerHTML='No image yet'">`
    : "No image yet";

  return `
    <article class="card">
      <div class="card-image">${imageBlock}</div>
      <div class="card-body">
        <span class="tag ${catClass}">${catLabel}</span>
        <h3 class="card-name">${item.name}</h3>
        <p class="card-meta">${[item.brand, item.model, item.year].filter(Boolean).join(" · ")}</p>
        <p class="card-condition">Condition: ${item.condition || "Unknown"}</p>
        <div class="card-prices">
          <div class="paid"><span>Paid</span>${formatCurrency(item.price_paid)}</div>
          <div class="value"><span>Est. value</span><strong>${formatCurrency(item.current_value_estimate)}</strong></div>
        </div>
        ${item.notes ? `<p class="card-notes">${item.notes}</p>` : ""}
        ${item.price_notes ? `<p class="card-notes"><em>${item.price_notes}</em></p>` : ""}
      </div>
    </article>
  `;
}

function renderTotals(items) {
  const strip = document.getElementById("totalsStrip");
  const totalValue = items.reduce((sum, i) => sum + (Number(i.current_value_estimate) || 0), 0);
  const totalPaid = items.reduce((sum, i) => sum + (Number(i.price_paid) || 0), 0);
  strip.innerHTML = `
    <span><strong>${items.length}</strong> item${items.length === 1 ? "" : "s"} shown</span>
    <span>Total paid: <strong>${formatCurrency(totalPaid)}</strong></span>
    <span>Est. total value: <strong>${formatCurrency(totalValue)}</strong></span>
  `;
}

function render() {
  const query = document.getElementById("searchInput").value.trim();
  const sortMode = document.getElementById("sortSelect").value;

  let filtered = allItems.filter((item) => {
    const catOk = activeCategory === "all" || item.category === activeCategory;
    return catOk && matchesSearch(item, query);
  });
  filtered = sortItems(filtered, sortMode);

  const grid = document.getElementById("cardGrid");
  const emptyState = document.getElementById("emptyState");

  grid.innerHTML = filtered.map(cardTemplate).join("");
  emptyState.hidden = filtered.length > 0;
  renderTotals(filtered);
}

function moveIndicator(button) {
  const switchEl = document.getElementById("categorySwitch");
  const indicator = document.getElementById("switchIndicator");
  const switchRect = switchEl.getBoundingClientRect();
  const btnRect = button.getBoundingClientRect();
  indicator.style.width = btnRect.width + "px";
  indicator.style.transform = `translateX(${btnRect.left - switchRect.left - 4}px)`;
}

function initSwitch() {
  const buttons = document.querySelectorAll(".switch-pos");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      activeCategory = btn.dataset.cat;
      moveIndicator(btn);
      render();
    });
  });
  // set initial indicator position once layout is ready
  window.requestAnimationFrame(() => moveIndicator(document.querySelector(".switch-pos.active")));
}

document.getElementById("searchInput").addEventListener("input", render);
document.getElementById("sortSelect").addEventListener("change", render);
window.addEventListener("resize", () => {
  moveIndicator(document.querySelector(".switch-pos.active"));
});

initSwitch();
loadInventory();
