
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      console.log("Axtarılan məhsul:", searchInput.value);
      alert("Axtarılan: " + searchInput.value);
    }
  });
}


const favBtn = document.getElementById("favBtn");
if (favBtn) {
  favBtn.addEventListener("click", () => {
    const icon = favBtn.querySelector("i");
    icon.classList.toggle("ri-heart-line");
    icon.classList.toggle("ri-heart-fill");
    icon.classList.toggle("text-red-500");
  });
}


const darkToggle = document.getElementById("darkToggle");
const body = document.body;
let dark = false;

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    dark = !dark;
    if (dark) {
      body.classList.add("dark");
      darkToggle.innerHTML = '<i class="ri-moon-line text-xl"></i>';
    } else {
      body.classList.remove("dark");
      darkToggle.innerHTML = '<i class="ri-sun-line text-xl"></i>';
    }
  });
}


const slider = document.getElementById("slider");
if (slider) {
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  let index = 0;
  const slides = slider.children;
  const total = slides.length;

  function showSlide(i) {
    slider.style.transform = `translateX(-${i * 100}%)`;
    slider.style.transition = "transform 0.5s ease-in-out";
  }

  next.addEventListener("click", () => {
    index = (index + 1) % total;
    showSlide(index);
  });

  prev.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    showSlide(index);
  });

  setInterval(() => {
    index = (index + 1) % total;
    showSlide(index);
  }, 5000);
}


const products = [
  {
    id: 1,
    title: "Smartfon Xiaomi Redmi Note 13",
    variant: "8GB/256GB MIDNIGHT BLACK NFC",
    discount: 50,
    image:
      "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2FinventImages%2FinventImages%2FinventImages%2Fiphone-13-mini-128gb-starlight-white-baku-electr_rIy2mFM.webp&w=750&q=75",
    oldPrice: 499.99,
    price: 449.99,
    months: 6,
    perMonth: 75,
  },
  {
    id: 1,
    title: "Smartfon Xiaomi Redmi Note 13",
    variant: "8GB/256GB MIDNIGHT BLACK NFC",
    discount: 50,
    image:
      "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2FinventImages%2FinventImages%2FinventImages%2Fiphone-13-mini-128gb-starlight-white-baku-electr_rIy2mFM.webp&w=750&q=75",
    oldPrice: 499.99,
    price: 449.99,
    months: 6,
    perMonth: 75,
  },
  {
    id: 1,
    title: "Smartfon Xiaomi Redmi Note 13",
    variant: "8GB/256GB MIDNIGHT BLACK NFC",
    discount: 50,
    image:
      "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2FinventImages%2FinventImages%2FinventImages%2Fiphone-13-mini-128gb-starlight-white-baku-electr_rIy2mFM.webp&w=750&q=75",
    oldPrice: 499.99,
    price: 449.99,
    months: 6,
    perMonth: 75,
  },
  {
    id: 1,
    title: "Smartfon Xiaomi Redmi Note 13",
    variant: "8GB/256GB MIDNIGHT BLACK NFC",
    discount: 50,
    image:
      "https://new.bakuelectronics.az/_next/image?url=https%3A%2F%2Fimg.b-e.az%2Fmedia%2FinventImages%2FinventImages%2FinventImages%2Fiphone-13-mini-128gb-starlight-white-baku-electr_rIy2mFM.webp&w=750&q=75",
    oldPrice: 499.99,
    price: 449.99,
    months: 6,
    perMonth: 75,
  },
];

const fmtMoney = (n) => `${n.toFixed(2)} ₼`;


const iconHeart = (outline = true) =>
  outline
    ? `<i class="ri-heart-line text-lg"></i>`
    : `<i class="ri-heart-fill text-lg text-red-500"></i>`;

const iconCart = () =>
  `<i class="ri-shopping-cart-line"></i>`;

const iconScale = () =>
  `<i class="ri-scales-3-line"></i>`;

const iconStar =
  () =>
    `<i class="ri-star-fill text-amber-400 text-sm"></i>`;

// ---- Render Products ----
const grid = document.getElementById("grid");

function renderProducts() {
  grid.innerHTML = products
    .map(
      (p) => `
      <article class="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-4 relative flex flex-col">
        <span class="absolute -left-2 -top-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
          - ${p.discount} ₼
        </span>

        <button aria-label="Müqayisə et" data-id="${p.id}" class="compare-btn absolute right-3 top-3 p-2 rounded-full bg-white/80 hover:bg-white border text-neutral-600">
          ${iconScale()}
        </button>

        <div class="aspect-[4/3] bg-neutral-100 rounded-xl flex items-center justify-center overflow-hidden mb-4">
          <img src="${p.image}" alt="${p.title}" class="w-full h-full object-contain"/>
        </div>

        <div class="flex items-center gap-1 text-xs text-neutral-600">
          ${iconStar()} <span>0</span> <span class="mx-1">•</span> <span>0 rəy</span>
        </div>

        <h3 class="mt-1 font-semibold leading-snug">${p.title}</h3>
        ${p.variant ? `<p class='text-sm text-neutral-600'>${p.variant}</p>` : ""}

        <div class="mt-3 flex items-end justify-between gap-3">
          <div>
            <div class="text-neutral-400 line-through text-sm">${fmtMoney(p.oldPrice)}</div>
            <div class="text-2xl font-bold">${fmtMoney(p.price)}</div>
          </div>
          <div class="text-right">
            <div class="text-neutral-500 text-sm">${p.months} ay</div>
            <div class="text-xl font-semibold">${p.perMonth} ₼</div>
          </div>
        </div>

        <div class="mt-4 flex items-center gap-3">
          <button data-id="${p.id}" class="add-btn flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800">
            ${iconCart()} <span>Səbətə əlavə et</span>
          </button>
          <button aria-label="Favorit et" data-id="${p.id}" class="wish-btn p-2 rounded-xl border text-neutral-700 hover:bg-neutral-50" data-active="false">
            ${iconHeart(true)}
          </button>
        </div>
      </article>
    `
    )
    .join("");
}
if (grid) renderProducts();


let cart = [];
const wishlist = new Set();

function renderCart() {
  const cartContent = document.getElementById("cartContent");
  const cartTotal = document.getElementById("cartTotal");

  if (cart.length === 0) {
    cartContent.innerHTML = `<p class="text-gray-500">Səbət boşdur</p>`;
    cartTotal.textContent = "0 ₼";
    return;
  }

  cartContent.innerHTML = cart
    .map(
      (item) => `
    <div class="flex items-center justify-between border-b pb-2">
      <div class="flex items-center gap-3">
        <img src="${item.image}" class="w-12 h-12 object-cover rounded">
        <div>
          <p class="font-medium">${item.title}</p>
          <p class="text-sm text-gray-500">${item.price} ₼</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="decreaseQty(${item.id})" class="px-2 py-1 bg-gray-200 rounded">-</button>
        <span>${item.qty}</span>
        <button onclick="increaseQty(${item.id})" class="px-2 py-1 bg-gray-200 rounded">+</button>
      </div>
    </div>
  `
    )
    .join("");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartTotal.textContent = `${total.toFixed(2)} ₼`;
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  showToast("Səbətə əlavə edildi");
}

function increaseQty(id) {
  const item = cart.find((p) => p.id === id);
  if (item) item.qty++;
  renderCart();
}
function decreaseQty(id) {
  const item = cart.find((p) => p.id === id);
  if (item.qty > 1) item.qty--;
  else cart = cart.filter((p) => p.id !== id);
  renderCart();
}

function showToast(text) {
  const toast = document.getElementById("toast");
  document.getElementById("toast-text").textContent = text;
  toast.classList.remove("translate-y-6", "opacity-0", "pointer-events-none");
  setTimeout(() => {
    toast.classList.add("translate-y-6", "opacity-0", "pointer-events-none");
  }, 1800);
}


document.getElementById("grid")?.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add-btn");
  const wishBtn = e.target.closest(".wish-btn");
  const compareBtn = e.target.closest(".compare-btn");

  if (addBtn) {
    const id = +addBtn.dataset.id;
    addToCart(id);
  }

  if (wishBtn) {
    const id = +wishBtn.dataset.id;
    const isActive = wishlist.has(id);
    if (isActive) {
      wishlist.delete(id);
      wishBtn.innerHTML = iconHeart(true);
      wishBtn.setAttribute("data-active", "false");
      showToast("Favoritdən çıxarıldı");
    } else {
      wishlist.add(id);
      wishBtn.innerHTML = iconHeart(false);
      wishBtn.setAttribute("data-active", "true");
      showToast("Favoritlərə əlavə edildi");
    }
  }

  if (compareBtn) {
    compareBtn.classList.toggle("ring-2");
    compareBtn.classList.toggle("ring-rose-400");
    showToast("Müqayisə siyahısına əlavə olundu");
  }
});


const cartIcon = document.querySelector(".ri-shopping-cart-line");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");

if (cartIcon && cartDrawer && closeCart) {
  cartIcon.addEventListener("click", () => {
    cartDrawer.classList.remove("translate-x-full");
  });
  closeCart.addEventListener("click", () => {
    cartDrawer.classList.add("translate-x-full");
  });
}
