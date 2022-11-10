/** ------------- Productos ------------- */

const items = [
  {
    id: 1,
    name: "Hoodies",
    price: 14.0,
    image: "assets/img/featured1.png",
    category: "hoodies",
    quantity: 10,
  },
  {
    id: 2,
    name: "Shirts",
    price: 24.0,
    image: "assets/img/featured2.png",
    category: "shirts",
    quantity: 15,
  },
  {
    id: 3,
    name: "Sweatshirts",
    price: 24.0,
    image: "assets/img/featured3.png",
    category: "sweatshirts",
    quantity: 20,
  },
];
const cartShopping = [];

/** ------------- Loading ------------- */

const loadingAcademlo = () => {
  const containerLoading = document.querySelector(".loading");
  window.addEventListener("load", () => {
    setTimeout(() => {
      containerLoading.style.display = "none";
    }, 2000);
  });
};

/** ------------- Cambios persistentes en la pagina ------------- */

const refreshPage = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    if (localStorage.getItem("cart") !== null) {
      const carLocalStorage = JSON.parse(localStorage.getItem("cart"));
      cartShopping.push(...carLocalStorage);
      addingProductsCartDom();
      countItemsCartDom();
      totalSum();
    }
    if (localStorage.getItem("darkmode") === "true") {
      body.classList.add("darkmode");
      iconDarkMode.classList.remove("bx-moon");
      iconDarkMode.classList.add(`${localStorage.getItem("icon")}`);
    }
    addingProductsCartDom();
  });
};

/** ------------- DarkMode ------------- */

const darkMode = () => {
  iconDarkMode.addEventListener("click", (e) => {
    e.preventDefault();

    const active = body.classList.toggle("darkmode");
    swtichIcons(body, "darkmode", iconDarkMode, "bx-moon", "bx-sun");
    localStorage.setItem("icon", `${iconDarkMode.classList[1]}`);
    localStorage.setItem("darkmode", `${active}`);
  });
};

/** ------------- Sticky Menu ------------- */

const stickyMenu = () => {
  window.addEventListener("scroll", (event) => {
    let scrollY = this.scrollY;
    scrollY !== 0
      ? navbar.classList.add("stickyMenu")
      : navbar.classList.remove("stickyMenu");
  });
};

/** ------------- Menu lateral ------------- */

const dropdownMenu = () => {
  iconMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.classList.toggle("active");
    iconMenu.style.position = "relative";
    shoppingcartIcon.style.position = "relative";
    swtichIcons(menu, "active", iconMenu, "bx-grid-alt", "bx-x");
  });
};

/** ------------- Menu del carrito ------------- */

const dropdownCart = () => {
  shoppingcartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingcart.classList.toggle("active");
  });
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingcart.classList.toggle("active");
  });
  cart__count.addEventListener("click", (e) => {
    e.preventDefault();
    shoppingcart.classList.toggle("active");
  });
};

/** -------------Ingreso de productos ------------- */

const addingProductsDom = () => {
  addingProducts(items);

  main__filter.addEventListener("click", ({ target }) => {
    if (
      target.className.includes("filter__showAll") ||
      target.parentElement.className.includes("filter__showAll")
    )
      addingProducts(items);
    if (
      target.className.includes("filter__hoodie") ||
      target.parentElement.className.includes("filter__hoodie")
    )
      addingProducts(items.filter((item) => item.name === "Hoodies"));
    if (
      target.className.includes("filter__shirt") ||
      target.parentElement.className.includes("filter__shirt")
    )
      addingProducts(items.filter((item) => item.name === "Shirts"));
    if (
      target.className.includes("filter__sweatshirts") ||
      target.parentElement.className.includes("filter__sweatshirts")
    )
      addingProducts(items.filter((item) => item.name === "Sweatshirts"));
  });
};

/** ------------- Manejo de eventos de los clicks ------------- */

const addingProductsToCartShopping = () => {
  const buttons = document.querySelectorAll(".icon__product");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      addToCartAlgorithm(e);
      addingProductsCartDom();
      countItemsCartDom();
      totalSum();
    });
  });
};

/** ------------- Agregar, eliminar y quitar elementos en el array -------------*/
/** ------------- Incluye validaciones ------------- */

const cartActionsButton = () => {
  shoppingcart.addEventListener("click", (e) => {
    const buttonClicked = e.target.getAttribute("data-id");
    const validar = cartShopping.filter((item) => item.id == buttonClicked);
    if (e.target.classList.contains("bx-plus"))
      if (validar[0].quantity > validar[0].addCount)
        validar[0].addCount = validar[0].addCount + 1;
    if (e.target.classList.contains("bx-minus"))
      validar[0].addCount = validar[0].addCount - 1;
    if (e.target.classList.contains("bx-trash")) validar[0].addCount = 0;
    addingProductsCartDom();
    countItemsCartDom();
    totalSum();
    localStorage.setItem("cart", JSON.stringify(cartShopping));
  });
};

/** Agregar articulos al dom */

const addingProductsCartDom = (e) => {
  let cant = getCountItems();

  if (cartShopping.length === 0 || cant === 0) {
    localStorage.removeItem("cart");
    add__container.innerHTML = `<div class="added__elements--empty">
                                        <img src="assets/img/empty-cart.png" alt="empty cart">
                                        <h2>Your cart is empty</h2>
                                        <p>You can add items to your cart by clicking on the + button on the product page.</p>
                                    </div> `;
  } else {
    add__container.innerHTML = "";
    cartShopping.forEach((item) => {
      if (item.addCount !== 0) {
        let html = `<div class="added__element">
                            <div class="cart__image">
                                <img src="${item.image}" alt="">
                            </div>
                            <div class="cart__content">
                                <h4>${item.name}</h4>
                                <p>Stock: ${item.quantity} | <span>$${
          item.price
        }</span></p>
                                <h5><span>Subtotal: $${
                                  item.addCount * item.price
                                }</span></h5>
                                <div class="cart__buttons">
                                    <div class="cart__button--add">
                                        <div><i data-id=${
                                          item.id
                                        }  class='bx bx-minus'></i></div>
                                        <div><p class="text__color">${
                                          item.addCount
                                        } units</p></div>
                                        <div><i data-id=${
                                          item.id
                                        } class='bx bx-plus'></i></div>
                                    </div>
                                    <div class="cart__button--delete">
                                        <span><i data-id=${
                                          item.id
                                        } class='bx bx-trash' ></i></span>
                                    </div>
    
                                </div>
                            </div>
                        </div>`;
        add__container.innerHTML += html;
      }
    });
  }
};

/** Cantidad de productos agregados */
const countItemsCartDom = () => {
  cart__count.innerHTML = getCountItems();
};

/** Pintar articulos en el DOM */

const addingProducts = (products) => {
  container.innerHTML = "";
  products.forEach((element) => {
    let html = `<div class="main__product">
                        <img src="${element.image}" alt="">
                        <div class="product__description">
                            <h3>$${element.price}</h3>
                            <span>Stock: ${element.quantity}</span>
                            <p class="text__color">${element.name}</p>
                            <div class="icon__product"><i data-id=${element.id} class='bx bx-plus'></i></div>
                        </div>
                    </div> `;
    container.innerHTML += html;
  });
};

/** Sum total */

const totalSum = () => {
  const totalSum1 = document.querySelector(".total__sum");

  let cont = 0;
  if (cartShopping.length != 0) {
    cartShopping.forEach((item) => {
      cont += item.addCount * item.price;
    });
    totalSum1.innerHTML = `
    <p class="text__color total__sum--items">Items ${getCountItems()}</p>
    <p class="total__sum--price">$${cont}.00</p>
    `;
  } else {
    totalSum1.innerHTML = "";
  }
};

/** Calcular cantidad de elemtos agregados al carrito */

const getCountItems = () => {
  let totalItems = 0;
  cartShopping.forEach((item) => {
    totalItems += item.addCount;
  });
  return totalItems;
};

/** Agregar elementos al array y al localStorage */

const addToCartAlgorithm = (e) => {
  const product = items.filter(
    (item) => item.id === parseInt(e.target.getAttribute("data-id"))
  );
  if (cartShopping.length === 0) {
    cartShopping.push({
      id: product[0].id,
      name: product[0].name,
      price: product[0].price,
      image: product[0].image,
      category: product[0].category,
      quantity: product[0].quantity,
      addCount: 1,
    });
    localStorage.setItem("cart", JSON.stringify(cartShopping));
  } else {
    const validation = cartShopping.filter((item) => item.id === product[0].id);

    if (validation.length === 0) {
      cartShopping.push({
        id: product[0].id,
        name: product[0].name,
        price: product[0].price,
        image: product[0].image,
        category: product[0].category,
        quantity: product[0].quantity,
        addCount: 1,
      });
      localStorage.setItem("cart", JSON.stringify(cartShopping));
    } else {
      validation[0].addCount = validation[0].addCount + 1;
      localStorage.setItem("cart", JSON.stringify(cartShopping));
    }
  }
};

/** Cambiar icono */

const swtichIcons = (
  element,
  classToEvaluate,
  icon,
  iconClassOne,
  iconClassTwo
) => {
  if (element.classList.contains(`${classToEvaluate}`)) {
    icon.classList.remove(`${iconClassOne}`);
    icon.classList.add(`${iconClassTwo}`);
  } else {
    icon.classList.remove(`${iconClassTwo}`);
    icon.classList.add(`${iconClassOne}`);
  }
};

/** Saber posicion y ubicarla en el navBar */

const navPosition = () => {
  const entries = document.querySelectorAll(".observer");
  const home = document.querySelector(".nav__home");
  const products = document.querySelector(".nav__products");

  const ob = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0.5) {
      home.classList.toggle("focus");
    } else {
      home.classList.toggle("focus");
      products.classList.toggle("focus");
    }
  });
  entries.forEach((item) => ob.observe(item));
};

/** Aplico las funciones */

loadingAcademlo();
refreshPage();
stickyMenu();
darkMode();
dropdownMenu();
dropdownCart();
navPosition();
addingProductsDom();
addingProductsToCartShopping();
cartActionsButton();
