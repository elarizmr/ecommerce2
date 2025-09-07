
const state = {
  qty: 1,
  unitOld: 899.99,
  unitNew: 829.99
};


const qtyEl          = document.getElementById('qty');
const priceLabel     = document.getElementById('priceLabel');
const oldPriceLabel  = document.getElementById('oldPriceLabel');
const summaryQty     = document.getElementById('summaryQty');
const summaryOld     = document.getElementById('summaryOld');
const summaryPrice   = document.getElementById('summaryPrice');
const summaryDiscount= document.getElementById('summaryDiscount');
const summaryTotal   = document.getElementById('summaryTotal');
const cartItem       = document.getElementById('cartItem');
const emptyState     = document.getElementById('emptyState');
const checkoutBtn    = document.getElementById('checkoutBtn');
const toast          = document.getElementById('toast');


const removeItemBtn  = document.getElementById('removeItemBtn');

const fmt = n => n.toFixed(2) + ' ₼';


function render() {
  const lineOld = state.unitOld * state.qty;
  const lineNew = state.unitNew * state.qty;
  const discount = Math.max(lineOld - lineNew, 0);

  qtyEl.textContent        = state.qty;
  priceLabel.textContent   = fmt(lineNew);
  oldPriceLabel.textContent= fmt(lineOld);

  summaryQty.textContent   = (state.qty || 0) + ' ədəd';
  summaryOld.textContent   = fmt(lineOld);
  summaryPrice.textContent = fmt(lineNew);
  summaryDiscount.textContent = '− ' + discount.toFixed(2) + ' ₼';
  summaryTotal.textContent = fmt(lineNew);
}


function showToast(text) {
  toast.textContent = text;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');
  setTimeout(() => toast.classList.add('opacity-0'), 1200);
}


document.getElementById('incBtn').addEventListener('click', () => {
  state.qty++;
  render();
});

document.getElementById('decBtn').addEventListener('click', () => {
  if (state.qty > 1) {
    state.qty--;
    render();
  } else {
    showToast('Ən az 1 ədəd seçilə bilər');
  }
});


removeItemBtn.addEventListener('click', () => {
  cartItem.classList.add('hidden');
  emptyState.classList.remove('hidden');

  
  checkoutBtn.disabled = true;
  checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');

  
  state.qty = 0;
  render();

  
  summaryDiscount.textContent = '− 0.00 ₼';

  showToast('Məhsul səbətdən silindi');
});

checkoutBtn.addEventListener('click', () => {
  if (state.qty === 0) return;
  showToast('Sifarişə keçilir…');
});


render();
