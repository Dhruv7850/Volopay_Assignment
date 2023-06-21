const apiUrl = 'https://your-api-endpoint-url.com/cards'; // Replace with your actual API endpoint URL

let currentTab = 'your';
let currentFilter = 'all';

async function fetchCards() {
  try {
    const response = await fetch('data.json'); // Replace 'cards.json' with the path to your JSON file
    const data = await response.json();
    return data.data; // Assuming the cards data is under the 'data' property
  } catch (error) {
    console.error('Error fetching cards:', error);
    return [];
  }
}

function renderCards(cards) {
  const cardsContainer = document.getElementById('cards-container');
  cardsContainer.innerHTML = '';

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    const cardType = document.createElement('div');
    cardType.classList.add('card-type');
    cardType.innerText = card.card_type;
    cardElement.appendChild(cardType);

    const cardName = document.createElement('div');
    cardName.classList.add('card-name');
    cardName.innerText = card.name;
    cardElement.appendChild(cardName);

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('card-details');
    if (card.card_type === 'burner') {
      const expiry = document.createElement('span');
      expiry.innerText = `Expiry: ${card.expiry}`;
      cardDetails.appendChild(expiry);
    } else if (card.card_type === 'subscription') {
      const limit = document.createElement('span');
      limit.innerText = `Limit: ${card.limit}`;
      cardDetails.appendChild(limit);
    }
    cardElement.appendChild(cardDetails);

    const cardStatus = document.createElement('div');
    cardStatus.classList.add('card-status');
    cardStatus.innerText = `Status: ${card.status}`;
    cardElement.appendChild(cardStatus);

    cardsContainer.appendChild(cardElement);
  });
}


function filterCards(cards, filter) {
  if (filter === 'all') {
    return cards;
  } else {
    return cards.filter(card => card.card_type === filter);
  }
}

function handleTabClick(event) {
  const clickedTab = event.target.id;
  if (clickedTab !== currentTab) {
    document.getElementById(`tab-${currentTab}`).classList.remove('active');
    document.getElementById(`tab-${clickedTab}`).classList.add('active');
    currentTab = clickedTab.split('-')[1];
    renderFilteredCards();
  }
}

function handleFilterChange(event) {
  const selectedFilter = event.target.value;
  if (selectedFilter !== currentFilter) {
    currentFilter = selectedFilter;
    renderFilteredCards();
  }
}

async function renderFilteredCards() {
  const cards = await fetchCards();
  const filteredCards = filterCards(cards, currentFilter);
  renderCards(filteredCards);
}

document.addEventListener('DOMContentLoaded', async () => {
  const tabs = document.getElementById('tabs');
  tabs.addEventListener('click', handleTabClick);

  const filterType = document.getElementById('filter-type');
  filterType.addEventListener('change', handleFilterChange);

  renderFilteredCards();
});
