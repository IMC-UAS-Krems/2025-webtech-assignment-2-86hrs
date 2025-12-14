const products = [
  {
    id : 1,
    name : "MacBook Air 13 (2022)",
    price : 699,
    specs : "16 GB RAM • 512GB SSD",
    image : "img/1.jpg"
  },
  {
    id : 2,
    name : "MacBook Pro 14 (2021)",
    price : 1199,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/2.jpg"
  },
  {
    id : 3,
    name : "MacBook Pro 14 (2024)",
    price : 1899,
    specs : "32 GB RAM • 512 GB SSD",
    image : "img/3.jpg"
  },
  {
    id : 4,
    name : "MacBook Air 13 (2023)",
    price : 849,
    specs : "16 GB RAM • 1 TB SSD",
    image : "img/4.jpg"
  },
  {
    id : 5,
    name : "MacBook Pro 16 (2021)",
    price : 1599,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/5.jpg"
  },
  {
    id : 6,
    name : "MacBook Pro 14 (2021)",
    price : 1699,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/6.jpg"
  },
  {
    id : 7,
    name : "MacBook Pro 16 (2023)",
    price : 2299,
    specs : "16 GB RAM • 1 TB SSD",
    image : "img/7.jpg"
  },
  {
    id : 8,
    name : "MacBook Air 13 (2024)",
    price : 999,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/8.jpg"
  },
  {
    id : 9,
    name : "MacBook Pro 13 (2022)",
    price : 899,
    specs : "18 GB RAM • 512 GB SSD",
    image : "img/9.jpg"
  },
  {
    id : 10,
    name : "MacBook Pro 16 (2023)",
    price : 2899,
    specs : "64 GB RAM • 2 TB SSD",
    image : "img/10.jpg"
  }
];

let cart = [];
let cartTotal = 0;
let cartQuantity = 0;
let discount = 0;
let toBePaid = 0;


function addToCart(id) {
  for (const product of cart) {
    if (product.id === id) {
      product.quantity++;
      updateCart();
      return;
    }  
  }

  const product = products.find(p => p.id === id)
  cart.push({
    id : product.id,
    name : product.name,
    price : product.price,
    quantity : 1
  });
  updateCart();
}

function removeFromCart(id) {
  for (const product of cart) {
    if (product.id === id) {
      product.quantity--;
      if (product.quantity <= 0) {
        const index = cart.findIndex(p => p.id === id);
        cart.splice(index, 1);
      }
      updateCart();
      return;
    }
  }
}

function resetCart() {
  cart = [];
  const cartSection = document.getElementById("cart-section");
  cartSection.classList.add("d-none");
  const checkoutSection = document.getElementById("checkout-section");
  checkoutSection.classList.add("d-none");
  updateCart();
}

function resetSite() {
  cart = [];
  cartTotal = 0;
  cartQuantity = 0;
  discount = 0;
  toBePaid = 0;

  const confirmationSection = document.getElementById("confirmation-section");
  confirmationSection.classList.add("d-none");
  resetCart();
}

function updateCart() {
  const showButtonDiv = document.getElementById("show-cart-div");
  const showCartBtn = showButtonDiv.querySelector(".show-cart-btn");
  const badge = showCartBtn.querySelector(".badge");
  const cartSection = document.getElementById("cart-section");
  const cartTotalSection = document.getElementById("cart-total");
  cartTotal = 0;
  cartQuantity = 0;

  if (cart.length <= 0) {
    cartSection.classList.add("d-none");
    badge.textContent = "0";
    cartTotal = 0;
  }

  for (const product of cart) {
    cartQuantity += Number(product.quantity);
    cartTotal += product.price * product.quantity;
  }
  cartTotalSection.textContent = `€${cartTotal}`;
  badge.textContent = cartQuantity;

  const tbody = document.getElementById("cart-items");
  tbody.innerHTML = "";
  let total = 0;

  for (const item of cart) {
    const sub = item.quantity * item.price;
    total += sub;

    tbody.innerHTML += `
    <tr>
     <td> ${item.name} </td>
     <td class = "text-end">€${item.price} </td>
     <td class = "text-center"> ${item.quantity} </td>
     <td class = "text-end">€${sub} </td>
     <td class = "text-end">
     <button class = "btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">Remove</button>
      </td>
    </tr>
    `;
  }
}

function closeCart() {
  const cartSection = document.getElementById("cart-section");
  cartSection.classList.add("d-none");
}

function renderProducts() {
  const row = document.getElementById("products-row");
  row.innerHTML = "";

  for (let product of products) {
    row.innerHTML += `
    <div class ="col-md-4 mb-4 my-auto">
        <div class="card">
        <img src="${product.image}" class="card-img-top">
        <div class = "card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.specs}</p>
            <p class="fw-bold mb-3">€${product.price}</p>
            <button class = "btn btn-primary add-to-cart-btn" data-product-id = "${product.id}">Add to Cart</button>
        </div>
        </div>
    </div>
      `;
  }
}

renderProducts();

document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
  btn.addEventListener(
      "click", () => { addToCart(Number(btn.dataset.productId)); });
});
document.querySelectorAll(".checkout-btn").forEach(btn => {
  btn.addEventListener(
      "click", () => {
      closeCart();
      let total = 0;

      for (const product of cart) {
        total += product.price * product.quantity;
      }

      discount = 0;
      if (cartQuantity >= 3) {
        discount = total * 0.20; 
      }
      toBePaid = total - discount;

      const totalDiv = document.getElementById("totalCartValue");
      const discountDiv = document.getElementById("discout");
      const toBePaidDiv = document.getElementById("tobepaid");

      if (totalDiv) totalDiv.textContent = `Cart value: €${total.toFixed(2)}`;
      if (discountDiv) {
        discountDiv.textContent =
        discount > 0 ? `Discount: −€${discount.toFixed(2)}` : `Discount: No discount`;
      }
      if (toBePaidDiv) toBePaidDiv.textContent = `Total to be paid: €${toBePaid.toFixed(2)}`;

      const checkoutSection = document.getElementById("checkout-section");
      checkoutSection.classList.remove("d-none");
      const confirmationText = document.getElementById("confirmation-text");
      confirmationText.innerHTML = `Thank you! <b>${Math.floor(toBePaid * 0.4)}$</b> of your order has gone to charity. Your refurbished Macbook purchase helps support youth digital education.`
      });
});
document.querySelectorAll(".show-cart-btn").forEach(btn => {
  btn.addEventListener(
      "click", () => {
        const cartSection = document.getElementById("cart-section");
        const checkoutSection = document.getElementById("checkout-section");
        if (cart.length > 0) {
          cartSection.classList.remove("d-none");
          checkoutSection.classList.add("d-none");
        } else {
          const alert = document.getElementById('emptyCartAlert')
          alert.innerHTML = "";
          alert.innerHTML = `
          <div class="position-absolute top-50 start-50 w-30 translate-middle alert alert-warning alert-dismissible fade show border border-3 border-warning " role="alert">
          <strong>Your Cart is empty!</strong>
          <p>Try adding products to your cart</p>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
          cartSection.classList.add("d-none");
        }
      });
});

(function () {
  "use strict";

  const checkoutSection = document.getElementById("checkout-section");
  const confirmationSection = document.getElementById("confirmation-section");

  if (!checkoutSection || !confirmationSection) return;

  const form = checkoutSection.querySelector("form.needs-validation");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    form.classList.add("was-validated");

    if (!form.checkValidity()) return;

    checkoutSection.classList.add("d-none");
    confirmationSection.classList.remove("d-none");
  });
})();

