async function cargarProductos() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  try {
    // Leer el archivo JSON físico
    const response = await fetch("productos.json");
    const productos = await response.json();

    if (!productos || productos.length === 0) {
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
  } catch (error) {
    grid.innerHTML =
      "<p style='text-align:center; width:100%'>Error al cargar el catálogo.</p>";
    console.error("Error cargando JSON:", error);
  }
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
    }, 2000);

    if (clickCount === 4) {
      clickCount = 0;
      window.location.href = "admin.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", cargarProductos);
