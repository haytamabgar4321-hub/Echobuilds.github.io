async function loadProducts() {
  const res = await fetch('products.json');
  return res.json();
}

function createProductCard(p) {
  const priceHTML = (p.sale_price && p.sale_price < p.price)
    ? `<div class="price"><span class="old">${p.price} ${p.currency}</span> <span>${p.sale_price} ${p.currency}</span></div>`
    : `<div class="price">${p.price} ${p.currency}</div>`;

  const stockText = p.in_stock > 0 ? `<button onclick="orderNow('${p.title}')">Order Now</button>` : `<p style="color:gray;">Out of stock</p>`;

  return `
    <div class="product">
      <img src="${p.image}" alt="${p.title}">
      <h2>${p.title}</h2>
      ${priceHTML}
      <p>${p.description}</p>
      ${stockText}
    </div>
  `;
}

async function renderStore() {
  const products = await loadProducts();
  const store = document.getElementById('store');
  store.innerHTML = products.map(createProductCard).join('');
}

function orderNow(productName) {
  const msg = encodeURIComponent(`Hello! I want to order: ${productName}`);
  const phone =  212616104032"; // Example: 212600000000
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}

renderStore();
