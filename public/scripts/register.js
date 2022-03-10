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
    errorDiv.innerHTML = respInJs.error;
  }

  if (respInJs.success === true) {
    alert(respInJs.data);
    // window.location.replace(`index.html?username=${registerData.username}`);
    // window.location.replace(`index.html`);
  }
}
