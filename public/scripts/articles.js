const cardsDiv = document.querySelector('.cards');
const token = localStorage.getItem('login_token');

async function validateTokenFront() {
  await fetch('http://localhost:3000/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

async function makeCards() {
  await fetch('http://localhost:3000/articles')
    .then((res) => res.json())
    .then((cards) => {
      cards.map((card) => {
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
  console.log('token ===', token);
  if (token === null) throw new Error('Please login');
  makeCards()
}
validateTokenFront();

allowShowArticles();

// makeCards();