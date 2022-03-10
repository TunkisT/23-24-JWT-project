const loginForm = document.forms.login;
const errorDiv = document.querySelector('.errors');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginData = {
    email: event.target.elements.email.value,
    password: event.target.elements.password.value,
  };
  loginUser(loginData);
});

const query = window.location.search;
if (query) {
  const emailFromQuery = query.split('=')[1];
  loginForm.elements.email.value = emailFromQuery;
}

async function loginUser(loginData) {
  const resp = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);

  if (respInJs.success === false) {
    respInJs.error.map((err) => {
      console.log(err.message);
      errorDiv.innerHTML = err.message;
    });
  }

  if (respInJs.success === true) {
    localStorage.setItem('login_token', respInJs.data);
    alert('YOU LOGGED IN');
    window.location.replace(`index.html`);
  }
}
