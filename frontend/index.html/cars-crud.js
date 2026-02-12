// ================== KARTĪŠU PĀRVALDĪBA (CRUD un localStorage) ==================

const CARDS_STORAGE_KEY = 'viesnica_cards';
const cardsContainer = document.getElementById('offers');
const createCardBtn = document.getElementById('createCardBtn');
const editorPopup = document.getElementById('cardEditorPopup'); 
const editorForm = document.getElementById('cardEditorForm');
const cardIdInput = document.getElementById('cardId');
const cardTitleInput = document.getElementById('cardTitle');
const cardDescInput = document.getElementById('cardDesc');
const cardImgInput = document.getElementById('cardImg');
const editorTitle = document.getElementById('editor-title');

let cards = [];

// --- FUNKCIJAS ---

// Ielādē kartītes no localStorage vai izmanto noklusējumu
function loadCards() {
    const storedCards = localStorage.getItem(CARDS_STORAGE_KEY);
    if (storedCards) {
        cards = JSON.parse(storedCards);
    } else {
        // Sākotnējās kartītes izmanto JŪSU augšupielādētos attēlus
        cards = [
            { 
                id: 1, 
                title: 'Standarta numurs', 
                description: 'Ērts un izdevīgs risinājums ikdienai ar gultu un dušu.', 
                img: '/img/Standard_room (10).webp' 
            },
            { 
                id: 2, 
                title: 'Luksusa numurs', 
                description: 'Augsta līmeņa komforts, greznība, balkons un skats uz jūru.', 
                img: '/img/16256-116579-f73465912_3XL.avif' 
            },
            { 
                id: 3, 
                title: 'Ģimenes numurs', 
                description: 'Piemērots atpūtai kopā ar ģimeni, divas istabas un lielas gultas.', 
                img: '/img/16256-116580-m31587641.jpg' 
            }
        ];
        saveCards(); 
    }
    renderCards();
}

// Saglabā kartītes localStorage
function saveCards() {
    localStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(cards));
}

// Ģenerē kartītes HTML ar Labošanas/Dzēšanas pogām
function createCardHTML(card) {
    return `
        <div class="card" data-id="${card.id}">
            <img src="${card.img}" alt="${card.title}">
            <h3>${card.title}</h3>
            <p>${card.description}</p>
            <button class="reserve-btn" data-room="${card.title}">Rezervēt</button>
            <div class="card-actions">
                <button class="edit-btn" data-id="${card.id}"><i class="fas fa-edit"></i> Labot</button>
                <button class="delete-btn" data-id="${card.id}"><i class="fas fa-trash-alt"></i> Dzēst</button>
            </div>
        </div>
    `;
}

// Parāda kartītes uz lapas un pievieno notikumu klausītājus
function renderCards() {
    if (!cardsContainer) return;

    cardsContainer.innerHTML = cards.map(createCardHTML).join('');

    // Pievieno klausītājus Labošanas un Dzēšanas pogām
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', (e) => openEditor(e.currentTarget.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => deleteCard(e.currentTarget.dataset.id));
    });
    // Atkārtoti pievieno klausītājus "Rezervēt" pogām
    document.querySelectorAll(".reserve-btn").forEach(button => {
        button.addEventListener("click", () => {
            const popup = document.getElementById("popup");
            const popupTitle = document.getElementById("popup-room-title");
            const roomName = button.getAttribute("data-room");
            if(popupTitle) popupTitle.textContent = `Rezervācija: ${roomName}`;
            if(popup) popup.style.display = "flex"; // Izmanto flex saskaņā ar CSS
        });
    });
    
    // Aktivizē meklēšanas filtru, ja tas ir ievadīts (lai atsvaidzinātu rezultātus pēc CRUD darbībām)
    const searchInput = document.getElementById("searchInput");
    if (searchInput && searchInput.value.trim() !== '') {
        // Izsauc keyup notikumu, ko uztver search.js
        searchInput.dispatchEvent(new Event('keyup')); 
    }
}

// Atver kartītes redaktoru (Izveidot/Labot)
function openEditor(id = null) {
    if(!editorPopup || !editorForm) return;

    editorForm.reset(); 
    if (id) {
        // Labošanas režīms
        const cardToEdit = cards.find(card => card.id == id);
        if (cardToEdit) {
            editorTitle.textContent = 'Labot kartīti';
            cardIdInput.value = cardToEdit.id;
            cardTitleInput.value = cardToEdit.title;
            cardDescInput.value = cardToEdit.description;
            cardImgInput.value = cardToEdit.img;
        }
    } else {
        // Izveides režīms
        editorTitle.textContent = 'Izveidot jaunu kartīti';
        cardIdInput.value = '';
    }
    editorPopup.style.display = 'flex'; // Izmanto flex saskaņā ar CSS
}

// Izdzēš kartīti
function deleteCard(id) {
    if (confirm("Vai tiešām vēlaties dzēst šo numuriņu?")) {
        cards = cards.filter(card => card.id != id);
        saveCards();
        renderCards();
    }
}

// --- NOTIKUMU KLAUSĪTĀJI ---

// "Izveidot jaunu" poga navigācijā
if (createCardBtn) {
    createCardBtn.addEventListener('click', () => openEditor());
}

// Pārvalda kartītes iesniegšanu (Izveidot/Labot)
if (editorForm) {
    editorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = cardIdInput.value;
        const newCard = {
            title: cardTitleInput.value.trim(),
            description: cardDescInput.value.trim(),
            // Ja lietotājs ievada tukšu URL, izmanto noklusējuma attēlu
            img: cardImgInput.value.trim() || '/img/Standard_room (10).webp', 
        };

        if (id) {
            // Labošana
            const index = cards.findIndex(card => card.id == id);
            if (index !== -1) {
                cards[index] = { ...cards[index], ...newCard, id: parseInt(id) };
            }
        } else {
            // Izveide
            newCard.id = Date.now();
            cards.push(newCard);
        }

        saveCards();
        renderCards();
        editorPopup.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', loadCards);