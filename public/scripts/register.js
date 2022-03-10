const registerForm = document.forms.register;
const errorDiv = document.querySelector('.errors');

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const registrationData = {
    email: event.target.elements.email.value,
    password: event.target.elements.password.value,
  };
  console.log(registrationData);
  registerUser(registrationData);
});

async function registerUser(registrationData) {
  const resp = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(registrationData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);

  if (respInJs.success === false) {
    errorDiv.innerHTML = '';
    respInJs.error.map((err) => {
      console.log(err.message);
      errorDiv.innerHTML += `<h5>${err.message}</h5>`;
    });
  }

  if (respInJs.success === true) {
    alert(respInJs.data);
    window.location.replace(`login.html?email=${registrationData.email}`);
  }
}
