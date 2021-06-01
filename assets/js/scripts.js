/*==================== HELPERS ====================*/

//funcion para comprobar si el elemento coontiene una clase, es para no usar jquery
function hasClass(elem, match) {
  return elem.className.split(" ").indexOf(match) > -1;
}

/*==================== ISOTOPE VANILLA JS ====================*/
// verifico si existe la funcion porque por ejemplo en algunas paginas no lo necesito y no lo cargo
if (typeof Isotope === "function") {
  // inicio Isotope
  let iso = new Isotope(".listado", {
    itemSelector: ".element-item",
    layoutMode: "fitRows",
  });
  // elemento que contiene los botons de filtrado
  let filtersElem = document.querySelector(".filters-group");
  if (filtersElem) {
    filtersElem.addEventListener("click", function (event) {
      event.preventDefault();
      // compruebo si se hace click en un boton sino no hago nada
      // probe comprobar con match pero no funciono
      //if (!matches(event.target.className, "filter-btn")) {
      if (!hasClass(event.target, "filter-btn")) {
        return;
      }
      const element = event.target;
      const buttons = document.querySelectorAll(".filter-btn");
      // desactivo todos los botones
      if (buttons) {
        buttons.forEach((el) => {
          el.classList.remove("active");
          el.classList.remove("shadow");
        });
      }
      // activo el boton actual
      element.classList.add("active");
      element.classList.add("shadow");
      // guardo el nombre del filtro que esta en el atributto data-filter
      let filterValue = event.target.getAttribute("data-filter");
      // paso el nombre a isotope apra filtrar
      iso.arrange({ filter: filterValue });
    });
  }
}

/*==================== DARK MODE ====================*/
const btnDarkMode = document.getElementById("dark-mode");
const darkMode = "dark-mode";
// Modo previamente seleccionado (si el usuario lo seleccionó)
const selectedMode = localStorage.getItem("selected-mode");
// Verifico si el usuario eligió previamente un modo
if (selectedMode) {
  //Si se cumple la validación, reviso cuál fue el modo seleccionado
  // para saber si se activa o desactiva el modo dark
  document.body.classList[selectedMode === "dark" ? "add" : "remove"](darkMode);
}
// Obtengo el modo que tiene la web validando la clase dark-mode
const getCurrentTheme = () =>
  document.body.classList.contains(darkMode) ? "dark" : "light";
// activo / desactivo el modo con el boton
btnDarkMode.addEventListener("click", () => {
  // agrego / remuevo la clase dark-mode
  document.body.classList.toggle(darkMode);
  // Guardo el modo actual que eligió el usuario
  localStorage.setItem("selected-mode", getCurrentTheme());
});

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const btnTop = document.getElementById("goTop");
  // verifico si el boton existe
  if (btnTop) {
    btnTop.addEventListener("click", function () {
      // si se hace click traslado el scroll hacia arriba
      document.body.scrollTop = 0; // para Safari
      document.documentElement.scrollTop = 0; // para Chrome/Firefox/IE/Opera
    });
    // aqui verifico en que momento se va a mostrar el boton, coloque 460px desde el top
    if (this.scrollY >= 460) btnTop.classList.add("show-scroll");
    else btnTop.classList.remove("show-scroll");
  }
}
// llamo a la funcion cuando hago scroll en la web
window.addEventListener("scroll", scrollTop);
