document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("search-toggle");
  const searchInput = document.querySelector(".search-input");
  const products = document.querySelectorAll(".product");

  // Normalizar texto (quita tildes, diéresis, etc.)
  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Mostrar / ocultar buscador
  if (searchToggle && searchInput) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      searchInput.classList.toggle("active");
      searchInput.focus();
    });
  }

  // Cerrar al hacer click fuera
  document.addEventListener("click", () => {
    if (searchInput) searchInput.classList.remove("active");
  });

  if (searchInput) {
    searchInput.addEventListener("click", (e) => e.stopPropagation());
  }

  // BUSCADOR REAL
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = normalize(searchInput.value);

      // 🔁 REDIRECCIONES POR CATEGORÍA
      if (value === "bolsos") {
        window.location.href = "bolsos.html";
        return;
      }

      if (value === "cinturones") {
        window.location.href = "cinturones.html";
        return;
      }

      if (value === "accesorios") {
        window.location.href = "accesorios.html";
        return;
      }

      // 🔍 FILTRADO LOCAL
      products.forEach((product) => {
        const title = normalize(
          product.querySelector("h3").textContent
        );

        product.style.display = title.includes(value) ? "" : "none";
      });
    });
  }
});
