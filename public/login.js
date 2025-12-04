// login.js (Netlify / production)

// Use Render backend
const API_BASE_URL = 'https://metaulagam-backend.onrender.com';

const form = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');
const loginBtn = document.getElementById('loginBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  messageDiv.textContent = '';
  loginBtn.disabled = true;
  loginBtn.textContent = 'Logging in...';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      messageDiv.textContent = data.message || 'Login failed';
      loginBtn.disabled = false;
      loginBtn.textContent = 'Login';
      return;
    }

    // Save token + user in Netlify origin's localStorage
    localStorage.setItem('metaulagam_token', data.token);
    localStorage.setItem('metaulagam_user', JSON.stringify(data.user));

    // Go to admin page
    window.location.href = 'admin.html';
  } catch (error) {
    console.error('Login error:', error);
    messageDiv.textContent = 'Something went wrong. Please try again.';
    loginBtn.disabled = false;
    loginBtn.textContent = 'Login';
  }
});
