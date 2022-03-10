const cardsDiv = document.querySelector('.cards');

async function makeCards() {
  await fetch('http://localhost:3000/articles')
    .then((res) => res.json())
    .then((cards) => {
      cards.map((card) => {
        console.log(card);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card')
        cardsDiv.append(cardDiv)
        cardDiv.innerHTML = `
        <h2>Title: ${card.title}</h2>
        <p>${card.content}</p>
        <h4>${card.date}</h4>
        `;
      });
    });
}
makeCards();
