const DB_NAME = "sin_control_db";

function cargarProductos() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const productos = JSON.parse(localStorage.getItem(DB_NAME)) || [];

  grid.innerHTML = "";

  if (productos.length === 0) {
    grid.innerHTML =
      "<p style='text-align:center; width:100%'>No hay productos publicados.</p>";
    return;
  }

  productos.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
            <h3>${p.nombre}</h3>
            <p class="price">${p.precio}</p>
            <br>
            <a href="https://wa.me/2241570002?text=Hola! Me interesa: ${p.nombre}" 
               target="_blank" class="btn-main">Consultar</a>
        `;
    grid.appendChild(card);
  });
}

// LÓGICA SECRETA: 4 Clics en el logo para ir al admin
let clickCount = 0;
let clickTimer;
const logo = document.getElementById("logo-admin");

if (logo) {
  logo.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 2000); // 2 segundos para completar clics

    if (clickCount === 4) {
      clickCount = 0;
      window.location.href = "admin.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
