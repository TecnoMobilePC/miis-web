/* ===== NORMALIZAR TEXTO (quita tildes y caracteres especiales) ===== */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

document.addEventListener("DOMContentLoaded", () => {

  const searchToggle = document.getElementById("search-toggle");
  const searchInput = document.querySelector(".search-input");
  const products = document.querySelectorAll(".product");

  /* ===== ABRIR / CERRAR BUSCADOR ===== */
  if (searchToggle && searchInput) {
    searchToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      searchInput.classList.toggle("active");

      if (searchInput.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }

  /* ===== CERRAR AL HACER CLICK FUERA ===== */
  document.addEventListener("click", (e) => {
    if (
      searchInput &&
      !searchInput.contains(e.target) &&
      !searchToggle.contains(e.target)
    ) {
      searchInput.classList.remove("active");
    }
  });

  /* ===== BUSCADOR REAL (NOMBRE + CATEGORÍA) ===== */
  if (searchInput && products.length > 0) {
    searchInput.addEventListener("input", () => {
      const value = normalizeText(searchInput.value);

      products.forEach(product => {
        const title = normalizeText(
          product.querySelector("h3").textContent
        );

        const category = normalizeText(
          product.dataset.category || ""
        );

        if (
          title.includes(value) ||
          category.includes(value)
        ) {
          product.style.display = "";
        } else {
          product.style.display = "none";
        }
      });
    });
  }

});
