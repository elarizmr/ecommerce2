
const form       = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passInput  = document.getElementById('password');
const remember   = document.getElementById('remember');
const togglePass = document.getElementById('togglePass');
const submitBtn  = document.getElementById('submitBtn');
const spinner    = document.getElementById('spinner');
const errorBox   = document.getElementById('errorBox');


const DEMO_EMAIL = 'elariz@gmail.az';
const DEMO_PASS  = '1234';

const ALLOW_ANY  = false;

const savedEmail = localStorage.getItem('rememberEmail');
if (savedEmail) {
  emailInput.value = savedEmail;
  remember.checked = true;
}


togglePass?.addEventListener('click', () => {
  const isPwd = passInput.type === 'password';
  passInput.type = isPwd ? 'text' : 'password';
  togglePass.innerHTML = isPwd
    ? '<i class="ri-eye-line text-lg"></i>'
    : '<i class="ri-eye-off-line text-lg"></i>';
});


const showError = (msg) => {
  errorBox.textContent = msg;
  errorBox.classList.remove('hidden');
};
const clearError = () => errorBox.classList.add('hidden');

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearError();

  const email = emailInput.value.trim();
  const pass  = passInput.value;

  
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return showError('Düzgün e-poçt daxil edin.');
  }
  if (!pass || pass.length < 4) {
    return showError('Şifrə ən az 4 simvol olmalıdır.');
  }

  
  submitBtn.disabled = true;
  spinner.classList.remove('hidden');

  
  await new Promise(r => setTimeout(r, 500)); // kiçik gecikmə (vizual)
  const ok = ALLOW_ANY || (email === DEMO_EMAIL && pass === DEMO_PASS);

  spinner.classList.add('hidden');
  submitBtn.disabled = false;

  if (!ok) {
    return showError('E-poçt və ya şifrə yanlışdır.');
  }

  
  localStorage.setItem('auth', JSON.stringify({
    email,
    token: 'demo-token'
  }));

  
  if (remember.checked) localStorage.setItem('rememberEmail', email);
  else localStorage.removeItem('rememberEmail');


  window.location.href = '/index.html';
});
