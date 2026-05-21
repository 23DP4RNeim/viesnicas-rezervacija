// ===========================
// Viesnīcas Rezervācija - Countries and Cities Database (30+ valstis)
// ===========================
const countryCities = {
    "Latvija": ["Rīga", "Daugavpils", "Liepāja", "Jelgava", "Jūrmala"],
    "Lietuva": ["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys"],
    "Igaunija": ["Tallinn", "Tartu", "Narva", "Pärnu", "Rakvere"],
    "Polija": ["Varšava", "Krakovs", "Gdańsk", "Vrocļava", "Poznanjā"],
    "Vācija": ["Berlīne", "Minhene", "Hamburga", "Ķelne", "Frankfurte"],
    "Zviedrija": ["Stokholma", "Geteborg", "Malmē", "Norrköping", "Västerås"],
    "Norvēģija": ["Oslo", "Bergen", "Stavanger", "Trondheim", "Kristiansand"],
    "Dānija": ["Kopenhāgena", "Orhusa", "Ōdens", "Ālborgā", "Ēsbjergā"],
    "Čehija": ["Prāga", "Brno", "Ostrava", "Plzeņ", "Liberec"],
    "Slovākija": ["Bratislava", "Košice", "Prešov", "Nitra", "Žilina"],
    "Ungārija": ["Budapešta", "Debrecen", "Szeged", "Miskolc", "Pécs"],
    "Rumānija": ["Bukurete", "Klužņapoka", "Timișoara", "Jāši", "Konstanca"],
    "Bulgārija": ["Sofija", "Plovdiva", "Varna", "Burgas", "Ruse"],
    "Serbija": ["Beograd", "Novi Sad", "Niš", "Kragujevac", "Subotica"],
    "Horvātija": ["Zagreb", "Spalato", "Rijeka", "Osijek", "Zadar"],
    "Slovenija": ["Ljubljana", "Maribor", "Celje", "Kranj", "Novo Mesto"],
    "Austrija": ["Vīne", "Graca", "Salzburga", "Innsbruka", "Lineca"],
    "Šveice": ["Tsūrihe", "Berna", "Bazele", "Lausanna", "Ženēva"],
    "Francija": ["Parīze", "Marseļa", "Ļona", "Toulouse", "Nīca"],
    "Beļģija": ["Brisele", "Antverpene", "Genta", "Šarlerī", "Ljēža"],
    "Nīderlande": ["Amsterdama", "Roterdama", "Hāga", "Utrecht", "Eindhoven"],
    "Luksemburga": ["Luksemburga", "Esch-sur-Alzette", "Differdange", "Dudelange", "Bettembourg"],
    "Apvienotā Karaliste": ["Londona", "Mančestra", "Birmingema", "Līdsa", "Glazgo"],
    "Skotija": ["Edinburga", "Glāzga", "Aberdeen", "Dundija", "Pērtija"],
    "Īrija": ["Dublina", "Korks", "Limerick", "Drogeda", "Waterford"],
    "Ziemeļīrija": ["Belfasta", "Derry", "Armagh", "Newry", "Enniskillen"],
    "Spānija": ["Madride", "Barselona", "Valensija", "Seviļa", "Bilbao"],
    "Portugāle": ["Lisabona", "Porto", "Brāga", "Kovilhā", "Funchal"],
    "Itālija": ["Roma", "Milāna", "Neapole", "Tūrīna", "Palermo"],
    "Grieķija": ["Atēnas", "Saloniki", "Patrai", "Iraklija", "Lārisā"],
    "Kipra": ["Nikozija", "Limassol", "Larnaca", "Pafos", "Protaras"],
    "Malta": ["Valletta", "Sliema", "Mosta", "Mdina", "Mgarr"],
    "Īslande": ["Reikjavika", "Akranes", "Hafnarfjörður", "Kópavogur", "Garðabær"],
    "Belorusija": ["Minsk", "Brest", "Grodno", "Vitebsk", "Mogilev"],
    "Ukraina": ["Kijeva", "Harkova", "Odesa", "Dņepropetrovska", "Donecka"],
    "Moldovija": ["Kišiņev", "Beltsi", "Tiraspol", "Bender", "Ialoveni"],
    "Turcija": ["Stambula", "Ankara", "Smirna", "Antalija", "Izmits"],
    "Krievija (Eiropas daļa)": ["Maskava", "Sanktpēterburga", "Novosibírska", "Jekaterinburga", "Ļipeck"]
};

// ===========================
// Room Data (Latvian)
// ===========================
const rooms = [
    {
        id: 1,
        name: "Standarta Dubultais",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23e8d4c4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d4b8a8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad1)' width='400' height='300'/%3E%3Crect x='50' y='80' width='300' height='40' fill='%23a0a0a0' opacity='0.7'/%3E%3Crect x='60' y='140' width='280' height='80' fill='%23666' opacity='0.3'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3EStandarta Dubultais%3C/text%3E%3C/svg%3E",
        price: 79,
        rating: 4.7,
        beds: "1 karaļa gulta",
        tag: "Labākā vērtība",
        category: "Pilsētas skats",
        description: "Komfortabla un ērta istaба ideāla pāru vai atsevišķu ceļotāju. Mūsdienu ērtības un lielisks pilsētas skats.",
        amenities: ["WiFi", "Gaisa kondicionēšana", "TV", "Mini bar", "Kafijas automāts"],
        reviews: 234
    },
    {
        id: 2,
        name: "Deluxe Dārzs",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d4e4d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b8d8b8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad2)' width='400' height='300'/%3E%3Ccircle cx='100' cy='80' r='30' fill='%2390c090' opacity='0.6'/%3E%3Ccircle cx='300' cy='120' r='35' fill='%2390c090' opacity='0.6'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3EDeluxe Dārzs%3C/text%3E%3C/svg%3E",
        price: 129,
        rating: 4.9,
        beds: "1 karaļa gulta",
        tag: "Populārs",
        category: "Dārzs",
        description: "Luksusīga svīta ar skatu uz privāto dārzu. Ideāla tiem, kas meklē mieru un eleganci.",
        amenities: ["WiFi", "Gaisa kondicionēšana", "Halāts", "Minibar", "Smart TV", "Balkons"],
        reviews: 456
    },
    {
        id: 3,
        name: "Ģimenes svīta",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23e4d4e0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d8b8d4;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad3)' width='400' height='300'/%3E%3Crect x='60' y='80' width='130' height='100' fill='%23b08ab8' opacity='0.4'/%3E%3Crect x='210' y='80' width='130' height='100' fill='%23b08ab8' opacity='0.4'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3EĢimenes svīta%3C/text%3E%3C/svg%3E",
        price: 169,
        rating: 4.8,
        beds: "2 karaļa gultas",
        tag: "Soļa 4",
        category: "Ģimene",
        description: "Paciešā svīta, ideāla ģimenēm ar bērniem. Atsevišķa dzīvojamā zona un mūsdienīgi ērtumi visā.",
        amenities: ["WiFi", "Gaisa kondicionēšana", "Virtuvnīca", "Smart TV", "Spēļu konsole", "Bērni laipni aicināti"],
        reviews: 189
    },
    {
        id: 4,
        name: "Pilsētas panorāmas pents",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f0e4d0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e0c8a8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad4)' width='400' height='300'/%3E%3Crect x='40' y='40' width='320' height='200' fill='%23d4c4b0' opacity='0.3' stroke='%23a8a89c' stroke-width='2'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3EPilsētas panorāmas pents%3C/text%3E%3C/svg%3E",
        price: 319,
        rating: 5.0,
        beds: "1 karaļa gulta + lounge",
        tag: "Premium",
        category: "Suites",
        description: "Mūsu viselektīgākais piedāvājums. Panorāmas pilsētas skats, privāts concierge serviss un pasaules klases ērtumi.",
        amenities: ["WiFi", "Gaisa kondicionēšana", "Džakuzi", "Sauna", "Premium minibar", "Personīgais concierge", "24h jaunums serviss"],
        reviews: 89
    },
    {
        id: 5,
        name: "Draudzīga mājdzīvniekiem patvare",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f0e8d0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23e8d8a8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad5)' width='400' height='300'/%3E%3Ccircle cx='100' cy='120' r='25' fill='%238b7355' opacity='0.5'/%3E%3Ccircle cx='300' cy='140' r='20' fill='%238b7355' opacity='0.5'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3EDraudzīga mājdzīvniekiem%3C/text%3E%3C/svg%3E",
        price: 99,
        rating: 4.6,
        beds: "1 karaļa gulta",
        tag: "Draudzīgi mājdzīvniekiem",
        category: "Draudzīgi mājdzīvniekiem",
        description: "Pieņemiet savus mājdzīvniekus! Aprīkots ar mājdzīvnieka ērtumiem un ērti atrodas tuvumā parki.",
        amenities: ["WiFi", "Mājdzīvnieka gulta", "Mājdzīvnieka bļoda", "TV", "Draugs telpa mājdzīvniekiem"],
        reviews: 156
    },
    {
        id: 6,
        name: "Darba brīvlaika studija",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23d4e8f0;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23b8d8e8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad6)' width='400' height='300'/%3E%3Crect x='80' y='100' width='120' height='80' fill='%23a0c0d0' opacity='0.4'/%3E%3Crect x='220' y='120' width='80' height='60' fill='%23a0c0d0' opacity='0.4'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3EDarba brīvlaika studija%3C/text%3E%3C/svg%3E",
        price: 109,
        rating: 4.7,
        beds: "1 karaļa gulta",
        tag: "Darba brīvlaiks",
        category: "Darba brīvlaiks",
        description: "Ideāli attālinātiem darbiniekiem. Ātrs internets, darbavieta un kafijas stacija iekļauta.",
        amenities: ["Ātrais WiFi", "Darba vieta", "Kafijas automāts", "TV", "Printera piekļuve"],
        reviews: 234
    },
    {
        id: 7,
        name: "Spa atspaude",
        img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='grad7' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23e4f0d4;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23c8e0a8;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23grad7)' width='400' height='300'/%3E%3Ccircle cx='200' cy='150' r='60' fill='%23a8d090' opacity='0.3'/%3E%3Ccircle cx='200' cy='150' r='40' fill='%2390b878' opacity='0.3'/%3E%3Ctext x='50%25' y='250' font-size='18' text-anchor='middle' fill='%23333' font-weight='bold'%3ESpa atspaude%3C/text%3E%3C/svg%3E",
        price: 179,
        rating: 4.9,
        beds: "1 karaļa gulta",
        tag: "Spa",
        category: "Spa",
        description: "Palauziet sevi mūsu spa aprīkotā istabā ar premium wellness ērtumiem un relaksācijas iekārtām.",
        amenities: ["WiFi", "Džakuzi", "Sauna piekļuve", "Spa produkti", "Joga paklājs", "Meditācijas telpa"],
        reviews: 178
    }
];

// ===========================
// DOM Elements
// ===========================
const roomsGrid = document.getElementById('roomsGrid');
const categoriesContainer = document.getElementById('categoriesContainer');
const searchBtn = document.getElementById('searchBtn');
const roomModal = document.getElementById('roomModal');
const bookingModal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');
const bookingModalClose = document.getElementById('bookingModalClose');
const navToggle = document.getElementById('navToggle');
const bookingForm = document.getElementById('bookingForm');
const searchBtn2 = document.getElementById('searchBtn');

let currentCategory = 'Viss';
let currentRoom = null;

// ===========================
// Home Button Function (Fixed)
// ===========================
function goHome(event) {
    if (event) event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    roomModal.classList.remove('active');
    roomModal.style.display = 'none';
    bookingModal.classList.remove('active');
    bookingModal.style.display = 'none';
    successModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    renderRooms(rooms);
    currentCategory = 'Viss';
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === 'Viss');
    });
}

// ===========================
// Initialize App
// ===========================
function init() {
    renderRooms(rooms);
    setupEventListeners();
    populateCountries();
    registerServiceWorker();
}

// ===========================
// Render Functions
// ===========================
function renderRooms(roomsToRender) {
    roomsGrid.innerHTML = roomsToRender.map(room => `
        <div class="room-card" onclick="openRoomModal(${room.id})">
            <div class="room-image">
                <img src="${room.img}" alt="${room.name}">
                <div class="room-tag">${room.tag}</div>
            </div>
            <div class="room-content">
                <h3 class="room-name">${room.name}</h3>
                <div class="room-rating">
                    <span class="stars">${generateStars(room.rating)}</span>
                    <span>${room.rating} (${room.reviews})</span>
                </div>
                <p class="room-info">${room.beds}</p>
                <p class="room-price">$${room.price} <span style="font-size: 14px; color: var(--text-muted);">per night</span></p>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '☆';
    else if (fullStars < 5) stars += '☆'.repeat(5 - fullStars);
    return stars;
}

// ===========================
// Modal Functions
// ===========================
function openRoomModal(roomId) {
    currentRoom = rooms.find(r => r.id === roomId);
    if (!currentRoom) return;

    document.getElementById('modalImage').src = currentRoom.img;
    document.getElementById('modalTitle').textContent = currentRoom.name;
    document.getElementById('modalStars').textContent = generateStars(currentRoom.rating);
    document.getElementById('modalRating').textContent = `${currentRoom.rating} (${currentRoom.reviews} reviews)`;
    document.getElementById('modalBeds').textContent = currentRoom.beds;
    document.getElementById('modalTag').textContent = currentRoom.tag;
    document.getElementById('modalPrice').textContent = currentRoom.price;
    document.getElementById('modalDescription').textContent = currentRoom.description;
    
    const amenitiesList = document.getElementById('amenitiesList');
    amenitiesList.innerHTML = currentRoom.amenities.map(amenity => `
        <div class="amenity-item">
            <span>✓</span>
            <span>${amenity}</span>
        </div>
    `).join('');

    roomModal.classList.add('active');
    roomModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeRoomModal() {
    roomModal.classList.remove('active');
    roomModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function openBookingModal() {
    closeRoomModal();
    bookingModal.classList.add('active');
    bookingModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Pre-fill room info (for confirmation)
    const bookingSummary = document.getElementById('bookingSummary');
    bookingSummary.innerHTML = `
        <h3 style="margin-bottom: 16px;">${currentRoom.name}</h3>
        <p style="margin-bottom: 8px;"><strong>Cena:</strong> €${currentRoom.price} par nakti</p>
    `;
}

function closeBookingModal() {
    bookingModal.classList.remove('active');
    bookingModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showSuccessModal() {
    bookingModal.style.display = 'none';
    successModal.classList.add('active');
    successModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    const bookingId = 'AURIA' + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('bookingId').textContent = bookingId;
    document.getElementById('successMessage').textContent = 
        `Paldies par ${currentRoom.name} rezervāciju! Potvrdinājuma e-pasts ir nosūtīts uz jūsu e-pasta adresi.`;
}

// ===========================
// Category Filtering
// ===========================
function filterByCategory(category) {
    currentCategory = category;
    const filtered = category === 'Viss' 
        ? rooms 
        : rooms.filter(r => r.category === category);
    renderRooms(filtered);
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

// ===========================
// Location Functions
// ===========================
function populateCountries() {
    const countrySelect = document.getElementById('searchCountry');
    countrySelect.innerHTML = '<option value="">Izvēlieties valsti</option>';
    
    Object.keys(countryCities).forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

function updateCities() {
    const countrySelect = document.getElementById('searchCountry');
    const citySelect = document.getElementById('searchCity');
    const selectedCountry = countrySelect.value;
    
    citySelect.innerHTML = '<option value="">Izvēlieties pilsētu</option>';
    
    if (selectedCountry && countryCities[selectedCountry]) {
        countryCities[selectedCountry].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// ===========================
// Search Functionality
// ===========================
function handleSearch() {
    const country = document.getElementById('searchCountry').value;
    const city = document.getElementById('searchCity').value;
    const guests = document.getElementById('searchGuests').value;
    const checkin = document.getElementById('searchCheckin').value;
    const checkout = document.getElementById('searchCheckout').value;
    
    if (!country && !city && !guests && !checkin && !checkout) {
        renderRooms(rooms);
        return;
    }
    
    // Filter rooms based on search criteria
    const filtered = rooms.filter(room => {
        const guestMatch = !guests || 
                          (guests == "1" && room.amenities.length >= 3) || 
                          (guests == "2-3" && room.amenities.length >= 4) ||
                          (guests >= "4");
        return guestMatch;
    });
    
    renderRooms(filtered);
}

// ===========================
// Event Listeners
// ===========================
function setupEventListeners() {
    // Category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => filterByCategory(btn.dataset.category));
    });

    // Modal closing
    if (modalClose) {
        modalClose.addEventListener('click', closeRoomModal);
    }
    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', closeBookingModal);
    }
    
    // Close modal when clicking outside
    roomModal.addEventListener('click', (e) => {
        if (e.target === roomModal) closeRoomModal();
    });
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) closeBookingModal();
    });
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            goHome();
        }
    });

    // Search
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    // Country/City selection
    if (document.getElementById('searchCountry')) {
        document.getElementById('searchCountry').addEventListener('change', updateCities);
    }
    
    // Enter key for search
    const searchInputs = [document.getElementById('searchCountry'), document.getElementById('searchCity')];
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSearch();
            });
        }
    });

    // Booking button
    const bookingBtn = document.getElementById('bookingBtn');
    if (bookingBtn) {
        bookingBtn.addEventListener('click', openBookingModal);
    }

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('guestName').value,
                email: document.getElementById('guestEmail').value,
                phone: document.getElementById('guestPhone').value,
                checkin: document.getElementById('bookingCheckin').value,
                checkout: document.getElementById('bookingCheckout').value,
                guests: document.getElementById('bookingGuests').value,
                room: currentRoom.name
            };

            // Validate form
            if (!formData.name || !formData.email || !formData.checkin || !formData.checkout) {
                alert('Lūdzu, aizpildiet visus nepieciešamos laukus');
                return;
            }

            // Validate email
            if (!validateEmail(formData.email)) {
                alert('Lūdzu, ievadiet derīgu e-pasta adresi');
                return;
            }

            // Validate dates
            if (new Date(formData.checkout) <= new Date(formData.checkin)) {
                alert('Izpakošanas datumam jābūt pēc iepakošanas datuma');
                return;
            }

            console.log('Rezevācija iesūtīta:', formData);
            
            // Save to localStorage
            let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
            bookings.push({
                ...formData,
                date: new Date().toISOString()
            });
            localStorage.setItem('bookings', JSON.stringify(bookings));

            // Clear form
            bookingForm.reset();
            
            // Show success message
            showSuccessModal();
        });
    }

    // Mobile nav toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const navbar = document.querySelector('.navbar-nav');
            if (navbar) {
                navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }
}

// ===========================
// Service Worker Registration (PWA)
// ===========================
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {
            // Service worker registration failed, app still works without it
        });
    }
}

// ===========================
// Utility Functions
// ===========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// ===========================
// Initialize on Load
// ===========================
document.addEventListener('DOMContentLoaded', init);

// Accessibility: Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (roomModal.style.display === 'flex') closeRoomModal();
        if (bookingModal.style.display === 'flex') closeBookingModal();
        if (successModal.style.display === 'flex') successModal.style.display = 'none';
    }
});
