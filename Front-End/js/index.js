let products = [];
let cart = [];
let usuarioId;

/* ZONA DE AVANCES DE XAVI */

document.addEventListener('DOMContentLoaded', () => {
  fetchCoffees();
  fetcCategories();
  fetchFavouriteCoffees(1);
});


// Guardar usuarioId en localStorage


// Obtener usuarioId desde localStorage al cargar la página
window.onload = function() {
  const usuarioId = localStorage.getItem('usuarioId');
  if (usuarioId) {
    console.log('Usuario ID:', usuarioId);
    // Realizar acciones adicionales ahora que tiene el usuarioId
  }
};




function getToken(){
  return localStorage.getItem('token');
}

async function enlaceClicado(event) {
  event.preventDefault(); // Prevent the default link behavior

  const token = getToken();
  if (!token) {
    return console.error('No se pudo obtener el token del usuario');
  }

  const enlace = event.target;
  const url = enlace.href;

  const headers = new Headers();
  headers.append('Authorization', `Bearer ${token}`);

  try {
    const response = await fetch(url, { headers });
    if (response.status === 200) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = url; // Redirect to the protected page
        } else {
          console.error('No se pudo obtener el token de la respuesta');
        }
      } else {
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        document.body.innerHTML = doc.body.innerHTML;

        // Opcionalmente, reemplazar también el head para incluir estilos específicos
        document.head.innerHTML = doc.head.innerHTML;
        window.scrollTo(0, 0);
      }
    } else {
      console.error('Error al acceder a la página protegida');
    }
  } catch (error) {
    console.error('Error al acceder a la página protegida', error);
  }
}

// Agregar un evento de clic al enlace para manejarlo con la función enlaceClicado
document.getElementById('employee').addEventListener('click', enlaceClicado);
document.getElementById('manager').addEventListener('click', enlaceClicado);






document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar la recarga de la página

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  try {
      const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
          throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();

      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: data.error === 'User not found' ? 'Esta cuenta no está registrada.' : data.error
        });

    } else {
        console.log(data); // Manejar la respuesta del servidor según lo necesario
        localStorage.setItem('token', data.token);
        Swal.fire({
          icon: 'success',
          title: '¡Sesión iniciada!',
          text: 'Sesión iniciada correctamente.'
        });
        usuarioId=data.usuarioId;
        console.log(usuarioId);
        localStorage.setItem('usuarioId', usuarioId);

        cerrar('.login');
    }


  } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'No se pudo iniciar sesión',
        text: 'Esta cuenta no está registrada, verifique las credenciales.'
      });
  }
});

// Manejo del formulario de registro
document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar la recarga de la página

  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  try {
      const response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
          throw new Error('Error al registrar usuario');
      }

      const data = await response.json();

      if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: data.error === 'User already exists' ? 'Esta cuenta ya está registrada. Por favor, ve a iniciar sesión.' : data.error
          });
      } else {
          console.log(data); // Manejar la respuesta del servidor según lo necesario
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Usuario registrado correctamente.'
          });
          cerrar('.register');
      }

  } catch (error) {
      console.error('Error al registrar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Esta cuenta ya está registrada. Por favor, ve a iniciar sesión.'
      });
  }
});






function fetchCoffees(){
  fetch('http://localhost:3000/coffee')
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
}

function fetcCategories(){
  fetch('http://localhost:3000/category')
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
}

function fetchCoffeesPerCategory(idCategory){
  fetch(`http://localhost:3000/coffee/${idCategory}`)
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
}

function fetchFavouriteCoffees(idUser){
  fetch(`http://localhost:3000/favourites/${idUser}`)
  .then(response => response.json())
  .then(data => {
      console.log(data);
  });
}


async function addFavouriteCoffee(idUser, idCoffee){
  const response = await fetch('http://localhost:3000/favourites', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({id_user: idUser, id_coffee: idCoffee})
  });
  const data = await response.json();
  console.log(data);
}


async function deleteFavouriteCoffee(idUser, idCoffee){
  const response = await fetch(`http://localhost:3000/favourites/${idUser}/${idCoffee}`, {
      method: 'DELETE',
  });
  const data = await response.json();
  console.log(data);
} 



/* ZONA DE AVANCES DE CRESPÁN */

//* selectors

const selectors = {
  /*products: document.querySelector(".products"), //* el único que habría que modificar*/
  cartBtn: document.querySelector(".cart-btn"),
  cartQty: document.querySelector(".cart-qty"),
  cartClose: document.querySelector(".cart-close"),
  cart: document.querySelector(".cart"),
  cartOverlay: document.querySelector(".cart-overlay"),
  cartClear: document.querySelector(".cart-clear"),
  cartBody: document.querySelector(".cart-body"),
  cartTotal: document.querySelector(".cart-total"),
};

//* event listeners

const setupListeners = () => {
  document.addEventListener("DOMContentLoaded", initStore);

  // product event
  /*selectors.products.addEventListener("click", addToCart);*/

  // cart events
  selectors.cartBtn.addEventListener("click", showCart);
  selectors.cartOverlay.addEventListener("click", hideCart);
  selectors.cartClose.addEventListener("click", hideCart);
  selectors.cartBody.addEventListener("click", updateCart);
  selectors.cartClear.addEventListener("click", clearCart);
};

//* event handlers

const initStore = () => {
  /*loadCart();
  
  loadProducts("https://fakestoreapi.com/products")
    .then(renderProducts)
    .finally(renderCart);*/
};

const showCart = () => {
  selectors.cart.classList.add("show");
  selectors.cartOverlay.classList.add("show");
};

const hideCart = () => {
  selectors.cart.classList.remove("show");
  selectors.cartOverlay.classList.remove("show");
};

const clearCart = () => {
  cart = [];
  saveCart();
  renderCart();
  renderProducts();
  setTimeout(hideCart, 500);
};

/*
const addToCart = (e) => {
  if (e.target.hasAttribute("data-id")) {
    const id = parseInt(e.target.dataset.id);
    const inCart = cart.find((x) => x.id === id);

    if (inCart) {
      alert("Item is already in cart.");
      return;
    }

    cart.push({ id, qty: 1 });
    saveCart();
    renderProducts();
    renderCart();
    showCart();
  }
};

const removeFromCart = (id) => {
  cart = cart.filter((x) => x.id !== id);

  // if the last item is remove, close the cart
  cart.length === 0 && setTimeout(hideCart, 500);

  renderProducts();
};

const increaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty++;
};

const decreaseQty = (id) => {
  const item = cart.find((x) => x.id === id);
  if (!item) return;

  item.qty--;

  if (item.qty === 0) removeFromCart(id);
};

const updateCart = (e) => {
  if (e.target.hasAttribute("data-btn")) {
    const cartItem = e.target.closest(".cart-item");
    const id = parseInt(cartItem.dataset.id);
    const btn = e.target.dataset.btn;

    btn === "incr" && increaseQty(id);
    btn === "decr" && decreaseQty(id);

    saveCart();
    renderCart();
  }
};

const saveCart = () => {
  localStorage.setItem("online-store", JSON.stringify(cart));
};

const loadCart = () => {
  cart = JSON.parse(localStorage.getItem("online-store")) || [];
};

//* render functions

const renderCart = () => {
  // show cart qty in navbar
  const cartQty = cart.reduce((sum, item) => {
    return sum + item.qty;
  }, 0);

  selectors.cartQty.textContent = cartQty;
  selectors.cartQty.classList.toggle("visible", cartQty);

  // show cart total
  selectors.cartTotal.textContent = calculateTotal().format();

  // show empty cart
  if (cart.length === 0) {
    selectors.cartBody.innerHTML =
      '<div class="cart-empty">Your cart is empty.</div>';
    return;
  }

  // show cart items
  selectors.cartBody.innerHTML = cart
    .map(({ id, qty }) => {
      // get product info of each cart item
      const product = products.find((x) => x.id === id);

      const { title, image, price } = product;

      const amount = price * qty;

      return `
        <div class="cart-item" data-id="${id}">
          <img src="${image}" alt="${title}" />
          <div class="cart-item-detail">
            <h3>${title}</h3>
            <h5>${price.format()}</h5>
            <div class="cart-item-amount">
              <i class="bi bi-dash-lg" data-btn="decr"></i>
              <span class="qty">${qty}</span>
              <i class="bi bi-plus-lg" data-btn="incr"></i>

              <span class="cart-item-price">
                ${amount.format()}
              </span>
            </div>
          </div>
        </div>`;
    })
    .join("");
};

const renderProducts = () => {
  selectors.products.innerHTML = products
    .map((product) => {
      const { id, title, image, price } = product;

      // check if product is already in cart
      const inCart = cart.find((x) => x.id === id);

      // make the add to cart button disabled if already in cart
      const disabled = inCart ? "disabled" : "";

      // change the text if already in cart
      const text = inCart ? "Added in Cart" : "Add to Cart";

      return `
    <div class="product">
      <img src="${image}" alt="${title}" />
      <h3>${title}</h3>
      <h5>${price.format()}</h5>
      <button ${disabled} data-id=${id}>${text}</button>
    </div>
    `;
    })
    .join("");
};

//* api functions

const loadProducts = async (apiURL) => {
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`http error! status=${response.status}`);
    }
    products = await response.json();
    console.log(products);
  } catch (error) {
    console.error("fetch error:", error);
  }
};

//* helper functions

const calculateTotal = () => {
  return cart
    .map(({ id, qty }) => {
      const { price } = products.find((x) => x.id === id);

      return qty * price;
    })
    .reduce((sum, number) => {
      return sum + number;
    }, 0);
};

Number.prototype.format = function () {
  return this.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};
*/


// Función para cerrar las cartas de login y registro
function cerrar(selector) {
  // Verificar si el argumento pasado es un selector válido
  if (typeof selector === 'string') {
    // Buscar el elemento correspondiente al selector
    const elemento = document.querySelector(selector);
    if (elemento) {
      elemento.style.zIndex = '-1';
    } else {
      console.error(`No se encontró ningún elemento con el selector ${selector}.`);
    }
  } else {
    console.error('El argumento pasado no es un selector válido.');
  }
}

// Función para abrir la carta de login
function abrir() {
  const loginElement = document.querySelector('.login');
  if (loginElement) {
    loginElement.style.zIndex = '1';
  } else {
    console.error('No se encontró ningún elemento con la clase .login.');
  }
}

// Función para abrir la carta de registro
function abrirRegistro() {
  const registerElement = document.querySelector('.register');
  const loginElement = document.querySelector('.login');
  if (registerElement) {
    loginElement.style.zIndex = '-1';  // Cerrar la carta de login
    registerElement.style.zIndex = '1';  // Abrir la carta de registro
  } else {
    console.error('No se encontró ningún elemento con la clase .register.');
  }
}


//* initialize

setupListeners();
