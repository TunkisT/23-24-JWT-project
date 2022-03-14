const cardsDiv = document.querySelector('.cards');
const token = localStorage.getItem('login_token');

window.addEventListener('load', () => {
  cardsDiv.innerHTML = ' LOADING...';
});

async function makeCards() {
  await fetch('http://localhost:3000/tutorials', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((cards) => {
      if (cards.success === false) {
        cardsDiv.innerHTML = 'SESSION TIMEOUT';
        return;
      }
      console.log(cards);
      cardsDiv.innerHTML = '';
      
      cards.data.map((card) => {
        console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardsDiv.append(cardDiv);
        cardDiv.innerHTML = `
        <h2>Title: ${card.title}</h2>
        <p>${card.content}</p>
        `;
      });
    });
}

function allowShowArticles() {
  if (token === null) {
    cardsDiv.innerHTML = 'PLEASE LOGIN';
    throw new Error('Please login');
  }
  makeCards();
}

allowShowArticles();
