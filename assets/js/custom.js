/*==================== HELPERS ====================*/

function hasId(elem, match) {
  return elem.id.split(" ").indexOf(match) > -1;
}
function hasClass(elem, match) {
  return elem.className.split(" ").indexOf(match) > -1;
}

/*==================== ISOTOPE VANILLA JS ====================*/
// verifico si existe la funcion porque por ejemplo en algunas paginas no lo necesito y no lo cargo
if (typeof Isotope === "function") {
  // iniciar Isotope
  var iso = new Isotope(".listado", {
    itemSelector: ".element-item",
    layoutMode: "fitRows",
  });

  // filter functions
  var filterFns = {
    // muestra si el número es mayor que 50
    numberGreaterThan50: function (itemElem) {
      var number = itemElem.querySelector(".number").textContent;
      return parseInt(number, 10) > 50;
    },
    // muestra si el nombre termina con -ium
    ium: function (itemElem) {
      var name = itemElem.querySelector(".name").textContent;
      return name.match(/ium$/);
    },
  };
  // bind filter button click
  var filtersElem = document.querySelector(".filters-group");

  if (filtersElem) {
    filtersElem.addEventListener("click", function (event) {
      event.preventDefault();
      // only work with buttons
      //if (!matches(event.target.className, "filter-btn")) {
      if (!hasClass(event.target, "filter-btn")) {
        return;
      }
      const element = event.target;
      const buttons = document.querySelectorAll(".filter-btn");

      if (buttons) {
        buttons.forEach((el) => {
          el.classList.remove("active");
          el.classList.remove("shadow");
        });
      }
      element.classList.add("active");
      element.classList.add("shadow");

      var filterValue = event.target.getAttribute("data-filter");
      // use matching filter function
      //filterValue = filterFns[filterValue] || filterValue;
      iso.arrange({ filter: filterValue });
    });
  }
}
/*==================== Alternate dark ====================*

function handle(isDark) {
  var addRemove = isDark ? "add" : "remove";
  console.log(addRemove);
  document.body.classList[addRemove]("bg-dark", "text-light");
}

const btnDarkMode = document.getElementById("darkmode");

btnDarkMode.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("activando");
  let skin = localStorage.getItem("skin");
  console.log("skin actual: " + skin);
  if (skin == "light" || skin == "") {
    document.body.setAttribute("data-skin", "dark");
    //document.querySelector("#darkmode>i").className = "bx bxs-sun";
    localStorage.setItem("skin", "dark");
  } else {
    document.body.removeAttribute("data-skin");
    //document.querySelector("#darkmode>i").className = "bx bxs-moon";
    localStorage.setItem("skin", "light");
  }
  console.log("skin ahora: " + localStorage.getItem("skin"));
  //handle(true);
  //handle(event.target.checked);
});


/*
    //Get the button:
    goTop = document.getElementById("goTop");
    if (goTop) {

      // When the user scrolls down 20px from the top of the document, show the button
      window.onscroll = function() { scrollFunction() };

      function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
          setTimeout(() => {
            //goTop.style.display = "block";
          }, 300)
          goTop.classList.add('show')
        } else {
          setTimeout(() => {
           //goTop.style.display = "none";
          }, 300)
          goTop.classList.remove('show')
        }
      }

      // When the user clicks on the button, scroll to the top of the document
      function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      }
*/
