const tutorialForm = document.forms.tutorial;
const errorDiv = document.querySelector('.errors');

tutorialForm.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('veikia');
  const tutorialData = {
    user_id: '44',
    title: event.target.elements.title.value,
    content: event.target.elements.content.value,
    private: event.target.elements.show.value,
  };
  console.log(tutorialData);
  postTutorial(tutorialData);
});

async function postTutorial(tutorialData) {
  const resp = await fetch('http://localhost:3000/tutorials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tutorialData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);

  if (respInJs.success === true) {
    alert(respInJs.data);
    return;
  }

  alert('Please login');
}
