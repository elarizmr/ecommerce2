// ===== Cart State (localStorage) =====
    const MONEY = n => `${(n || 0).toFixed(2)} ₼`;
    function readCart() {
      try { return JSON.parse(localStorage.getItem('cart') || '[]'); }
      catch { return []; }
    }
    function writeCart(c) { localStorage.setItem('cart', JSON.stringify(c)); }

    let cart = readCart();

    // ===== Render =====
    const itemsEl = document.getElementById('cartItems');
    const emptyBox = document.getElementById('emptyBox');
    const cartWrap = document.getElementById('cartWrap');
    const subtotalEl = document.getElementById('subtotal');
    const discountEl = document.getElementById('discount');
    const grandEl = document.getElementById('grandTotal');

    function render() {
      if (!cart.length) {
        emptyBox.classList.remove('hidden');
        cartWrap.classList.add('hidden');
        subtotalEl.textContent = discountEl.textContent = grandEl.textContent = MONEY(0);
        return;
      }
      emptyBox.classList.add('hidden');
      cartWrap.classList.remove('hidden');

      itemsEl.innerHTML = cart.map(item => `
        <div class="p-4 flex items-center gap-4">
          <img src="${item.image || 'https://via.placeholder.com/80x80'}" alt="${item.title}" class="w-20 h-20 object-cover rounded">
          <div class="flex-1">
            <h4 class="font-semibold">${item.title || 'Məhsul'}</h4>
            <div class="text-sm text-gray-500">${MONEY(item.price)}</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="px-2 py-1 bg-gray-100 rounded" data-dec="${item.id}">-</button>
            <span class="min-w-6 text-center">${item.qty || 1}</span>
            <button class="px-2 py-1 bg-gray-100 rounded" data-inc="${item.id}">+</button>
          </div>
          <div class="w-24 text-right font-semibold">${MONEY((item.price || 0) * (item.qty || 1))}</div>
          <button class="ml-3 text-red-500 hover:text-red-600" title="Sil" data-del="${item.id}">
            <i class="ri-delete-bin-6-line text-xl"></i>
          </button>
        </div>
      `).join('');

      const subtotal = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
      const discount = 0; // istəsən hesablayarsan
      const grand = subtotal - discount;

      subtotalEl.textContent = MONEY(subtotal);
      discountEl.textContent = MONEY(discount);
      grandEl.textContent = MONEY(grand);

      writeCart(cart);
    }

    // ===== Interactions =====
    itemsEl.addEventListener('click', (e) => {
      const idInc = e.target.closest('[data-inc]')?.dataset.inc;
      const idDec = e.target.closest('[data-dec]')?.dataset.dec;
      const idDel = e.target.closest('[data-del]')?.dataset.del;

      if (idInc) {
        const it = cart.find(x => String(x.id) === String(idInc));
        if (it) it.qty = (it.qty || 1) + 1;
        render();
      }
      if (idDec) {
        const it = cart.find(x => String(x.id) === String(idDec));
        if (it) {
          it.qty = (it.qty || 1) - 1;
          if (it.qty <= 0) cart = cart.filter(x => String(x.id) !== String(idDec));
        }
        render();
      }
      if (idDel) {
        cart = cart.filter(x => String(x.id) !== String(idDel));
        render();
      }
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
      alert('Demo: sifariş təsdiqləndi (mock).');
      
    });

    
    document.getElementById('darkToggle')?.addEventListener('click', () => {
      document.body.classList.toggle('dark');
    });

    
    render();
