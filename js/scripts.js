const products = [
  {
    id : 1,
    name : "MacBook Air 13 (2022)",
    price : 399,
    specs : "16 GB RAM • 512GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 2,
    name : "MacBook Pro 14 (2021)",
    price : 649,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 3,
    name : "MacBook Pro 14 (2024)",
    price : 899,
    specs : "32 GB RAM • 512 GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 4,
    name : "MacBook Air 13 (2023)",
    price : 899,
    specs : "16 GB RAM • 1 TB GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 5,
    name : "MacBook Pro 16 (2021)",
    price : 1099,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 6,
    name : "MacBook Pro 14 (2021)",
    price : 1599,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 7,
    name : "MacBook Pro 16 (2023)",
    price : 1399,
    specs : "16 GB RAM • 1 TB SSD",
    image : "img/p.jpg"
  },
  {
    id : 8,
    name : "MacBook Air 13 (2024)",
    price : 549,
    specs : "16 GB RAM • 512 GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 9,
    name : "MacBook Pro 13 (2022)",
    price : 399,
    specs : "18 GB RAM • 512 GB SSD",
    image : "img/p.jpg"
  },
  {
    id : 10,
    name : "MacBook Pro 16 (2023)",
    price : 599,
    specs : "64 GB RAM • 2 TB GB SSD",
    image : "img/p.jpg"
  }
];

let cart = [];

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
        const index = cart.indexOf(p => p.id === id);
        cart.splice(index, 1);
      }
      updateCart();
      return;
    }
  }
}

function updateCart() {
  const showButtonDiv = document.getElementById("show-cart-div");
  const showCartBtn = showButtonDiv.querySelector(".show-cart-btn");
  const badge = showCartBtn.querySelector(".badge");
  const cartSection = document.getElementById("cart-section");
  const cartTotal = document.getElementById("cart-total");
  let totalQuantity = 0;
  let totalCartValue = 0;

  if (cart.length <= 0) {
    cartSection.classList.add("d-none");
    badge.textContent = "0";
    totalCartValue = 0;
  }

  for (const product of cart) {
    totalQuantity += Number(product.quantity);
    totalCartValue += product.price * product.quantity;
  }
  cartTotal.textContent = `€${totalCartValue}`;
  badge.textContent = totalQuantity;

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
        <img src="img/p.jpg" class="card-img-top">
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
document.querySelectorAll(".show-cart-btn").forEach(btn => {
  btn.addEventListener(
      "click", () => {
        const cartSection = document.getElementById("cart-section");
        if (cart.length > 0) {
          cartSection.classList.remove("d-none");
        } else {
          cartSection.classList.add("d-none");
          alert("Your cart is empty!");
        }
      });
});
