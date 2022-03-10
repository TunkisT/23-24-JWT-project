const cardsDiv = document.querySelector('.cards');

async function makeCards() {
  await fetch('http://localhost:3000/articles')
    .then((res) => res.json())
    .then((cards) => {
      cards.map((card) => {
        console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardsDiv.append(cardDiv);
        cardDiv.innerHTML = `
        <h2>Title: ${card.title}</h2>
        <p>${card.content}</p>
        <h4>${card.date}</h4>
        `;
      });
    });
}

function allowShowArticles() {
  const token = localStorage.getItem('login_token');
  console.log('token ===', token);
  if (token === null) throw new Error('Please login');
  makeCards();
}

allowShowArticles();

async function validateTokenFront() {
  fetch('http://localhost:3000/validate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
