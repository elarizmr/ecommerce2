
const openMenu = document.getElementById('openMenu');
const mobileMenu = document.getElementById('mobileMenu');
if (openMenu) {
  openMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}


const togglePass = document.getElementById('togglePass');
const password = document.getElementById('password');
if (togglePass && password) {
  togglePass.addEventListener('click', () => {
    const isPwd = password.type === 'password';
    password.type = isPwd ? 'text' : 'password';
    togglePass.innerHTML = `<i class="ri-${isPwd ? 'eye-line' : 'eye-off-line'} text-lg"></i>`;
  });
}

const form = document.getElementById('loginForm');
const email = document.getElementById('email');
const remember = document.getElementById('remember');
const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const errorBox = document.getElementById('errorBox');

if (form) {
  
  const savedEmail = localStorage.getItem('saved_email');
  if (savedEmail) email.value = savedEmail;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.classList.add('hidden');
    submitBtn.disabled = true;
    spinner.classList.remove('hidden');

    try {
    
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email.value.trim(),   
          password: password.value.trim()
        })
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.message || 'Giriş alınmadı');
      }
      const data = await res.json();

    
      if (remember.checked) {
        localStorage.setItem('saved_email', email.value.trim());
      } else {
        localStorage.removeItem('saved_email');
      }

    
      localStorage.setItem('token', data.token);
      
      window.location.href = '/';
    } catch (err) {
      errorBox.textContent = err.message || 'Xəta baş verdi';
      errorBox.classList.remove('hidden');
    } finally {
      spinner.classList.add('hidden');
      submitBtn.disabled = false;
    }
  });
}
