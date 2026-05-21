// ===========================
// Viesnīcu rezervācija
// ===========================

let currentRoom = null;
let currentCategory = 'Viss';
let allRooms = [];

const countryCities = {
    'Latvija': ['Rīga', 'Jūrmala', 'Liepāja', 'Daugavpils', 'Ventspils'],
    'Lietuva': ['Viļņa', 'Kauņa', 'Klaipēda', 'Alīta', 'Panevēža'],
    'Igaunija': ['Tallina', 'Tartu', 'Narva', 'Pērnava', 'Rakvere'],
    'Polija': ['Varšava', 'Krakova', 'Vroclava', 'Poznaņa', 'Gdaņska'],
    'Vācija': ['Berlīne', 'Minhene', 'Hamburga', 'Frankfurte', 'Ķelne'],
    'Francija': ['Parīze', 'Marseļa', 'Liona', 'Tulūza', 'Nica'],
    'Itālija': ['Roma', 'Milāna', 'Venēcija', 'Florence', 'Neapole'],
    'Spānija': ['Madride', 'Barselona', 'Seviļa', 'Valensija', 'Bilbao'],
    'Beļģija': ['Brisele', 'Antverpene', 'Gente', 'Brige', 'Ljēža'],
    'Austrija': ['Vīne', 'Zalcburga', 'Insbruka', 'Grāca', 'Linca'],
    'Zviedrija': ['Stokholma', 'Gēteborga', 'Malme', 'Upsāla', 'Vesterosa'],
    'Norvēģija': ['Oslo', 'Bergena', 'Tronheima', 'Stavangera', 'Kristiansanna'],
    'Dānija': ['Kopenhāgena', 'Orhūsa', 'Olborga', 'Esbjerga', 'Randersa'],
    'Somija': ['Helsinki', 'Espo', 'Tampere', 'Turku', 'Oulu'],
    'Grieķija': ['Atēnas', 'Saloniki', 'Larisa', 'Hērakleja', 'Volosa'],
    'Portugāle': ['Lisabona', 'Porto', 'Braga', 'Koimbra', 'Kaskaiša'],
    'Čehija': ['Prāga', 'Brno', 'Ostrava', 'Plzeņa', 'Libereca'],
    'Slovākija': ['Bratislava', 'Košice', 'Prešova', 'Žilina', 'Banska Bistrica'],
    'Ungārija': ['Budapešta', 'Debrecena', 'Segeda', 'Miškolca', 'Pēča'],
    'Rumānija': ['Bukareste', 'Kluža-Napoka', 'Timišoara', 'Jasi', 'Konstanca']
};

const rooms = [
    {
        id: 1,
        name: 'Standarta divvietīgs numurs',
        price: 79,
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
        category: 'Skats uz pilsētu',
        beds: '1 divguļamā gulta un 1 dīvāns',
        description: 'Ērts numurs īsai atpūtai vai darba braucienam ar skatu uz pilsētu.',
        amenities: ['Bezmaksas Wi-Fi', 'Gaisa kondicionētājs', 'TV', 'Rakstāmgalds'],
        rating: 4.7,
        reviews: 234
    },
    {
        id: 2,
        name: 'Deluxe numurs ar dārzu',
        price: 129,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
        category: 'Dārzs',
        beds: '1 liela divguļamā gulta un terase',
        description: 'Plašs numurs ar mierīgu noskaņu, terasi un piekļuvi dārza zonai.',
        amenities: ['Terase', 'Bezmaksas Wi-Fi', 'Mini bārs', 'Kafijas automāts'],
        rating: 4.9,
        reviews: 456
    },
    {
        id: 3,
        name: 'Ģimenes numurs',
        price: 159,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
        category: 'Ģimene',
        beds: '2 vienvietīgas gultas un 1 divguļamā gulta',
        description: 'Ērts un praktisks numurs ģimenei ar pietiekami daudz vietas visiem viesiem.',
        amenities: ['Ģimenes zona', 'Bērnu gultiņa pēc pieprasījuma', 'Bezmaksas Wi-Fi', 'TV'],
        rating: 4.6,
        reviews: 178
    },
    {
        id: 4,
        name: 'Karaliskais luksusa numurs',
        price: 299,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
        category: 'Luksusa numuri',
        beds: 'Liela divguļamā gulta un atpūtas zona',
        description: 'Elegants luksusa numurs ar atsevišķu atpūtas zonu un īpaši komfortablu iekārtojumu.',
        amenities: ['Atpūtas zona', 'Mini bārs', 'Peldmētelis', 'Premium Wi-Fi'],
        rating: 4.9,
        reviews: 789
    },
    {
        id: 5,
        name: 'Mājdzīvniekiem draudzīgs numurs',
        price: 99,
        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
        category: 'Mājdzīvniekiem draudzīgs',
        beds: '1 divguļamā gulta un vieta mājdzīvniekam',
        description: 'Numurs viesiem, kuri ceļo kopā ar savu mājdzīvnieku.',
        amenities: ['Mājdzīvnieku zona', 'Bezmaksas Wi-Fi', 'Ūdens bļoda', 'Viegla piekļuve ārā'],
        rating: 4.5,
        reviews: 145
    },
    {
        id: 6,
        name: 'Numurs darba ceļojumiem',
        price: 119,
        image: 'https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=900&q=80',
        category: 'Darba ceļojumiem',
        beds: '1 divguļamā gulta un darba galds',
        description: 'Numurs ar ērtu darba vietu, stabilu internetu un mierīgu atmosfēru.',
        amenities: ['Darba galds', 'Ātrs Wi-Fi', 'Kafijas automāts', 'Gludināšanas piederumi'],
        rating: 4.8,
        reviews: 567
    },
    {
        id: 7,
        name: 'Premium spa numurs',
        price: 249,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=80',
        category: 'Spa',
        beds: 'Liela divguļamā gulta un spa vannasistaba',
        description: 'Relaksējošs numurs ar spa noskaņu, piemērots mierīgai atpūtai.',
        amenities: ['Spa vannasistaba', 'Peldmētelis', 'Aromterapija', 'Premium Wi-Fi'],
        rating: 5,
        reviews: 890
    }
];

function init() {
    allRooms = [...rooms];
    setupEventListeners();
    populateCountries();
    renderRooms(allRooms);
    registerServiceWorker();
}

function renderRooms(roomsToShow) {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;

    roomsGrid.innerHTML = roomsToShow.map(room => `
        <div class="room-card" onclick="openRoomModal(${room.id})">
            <div class="room-image">
                <img src="${room.image}" alt="${room.name}" loading="lazy">
                <div class="room-tag">${room.category}</div>
            </div>
            <div class="room-content">
                <h3 class="room-name">${room.name}</h3>
                <div class="room-rating">
                    <span class="stars">${generateStars(room.rating)}</span>
                    <span>${room.rating} (${room.reviews})</span>
                </div>
                <p class="room-info">${room.beds}</p>
                <p class="room-price">€${room.price} <span style="font-size: 14px; color: var(--text-muted);">par nakti</span></p>
            </div>
        </div>
    `).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
}

function openRoomModal(roomId) {
    currentRoom = allRooms.find(room => room.id === roomId);
    if (!currentRoom) return;

    setText('modalTitle', currentRoom.name);
    setText('modalPrice', currentRoom.price);
    setText('modalStars', generateStars(currentRoom.rating));
    setText('modalRating', `${currentRoom.rating} (${currentRoom.reviews} atsauksmes)`);
    setText('modalBeds', currentRoom.beds);
    setText('modalTag', currentRoom.category);
    setText('modalDescription', currentRoom.description);

    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = currentRoom.image;
        modalImage.alt = currentRoom.name;
    }

    const amenitiesList = document.getElementById('amenitiesList');
    if (amenitiesList) {
        amenitiesList.innerHTML = currentRoom.amenities
            .map(amenity => `<div class="amenity-item">✓ ${amenity}</div>`)
            .join('');
    }

    const roomModal = document.getElementById('roomModal');
    if (roomModal) {
        roomModal.classList.add('active');
        roomModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeRoomModal() {
    const roomModal = document.getElementById('roomModal');
    if (roomModal) {
        roomModal.classList.remove('active');
        roomModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function openBookingModal() {
    if (!currentRoom) {
        alert('Lūdzu, izvēlieties numuru.');
        return;
    }

    closeRoomModal();
    setText('selectedRoomName', currentRoom.name);
    setText('selectedRoomPrice', currentRoom.price);
    updateBookingSummary();

    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.classList.add('active');
        bookingModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.classList.remove('active');
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showSuccessModal(bookingId, savedOnline) {
    const bookingModal = document.getElementById('bookingModal');
    const successModal = document.getElementById('successModal');

    if (bookingModal) bookingModal.style.display = 'none';

    if (successModal) {
        successModal.classList.add('active');
        successModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setText('bookingId', bookingId);
        setText(
            'successMessage',
            savedOnline
                ? 'Rezervācija ir saglabāta datubāzē.'
                : 'Rezervācija ir saglabāta lokāli. Lūdzu, pārbaudiet Supabase tabulu un piekļuves politikas.'
        );
    }
}

function populateCountries() {
    const countrySelect = document.getElementById('searchCountry');
    if (!countrySelect) return;

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
    if (!countrySelect || !citySelect) return;

    citySelect.innerHTML = '<option value="">Izvēlieties pilsētu</option>';

    const cities = countryCities[countrySelect.value] || [];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
}

function handleSearch() {
    const country = document.getElementById('searchCountry')?.value;
    const city = document.getElementById('searchCity')?.value;
    const checkin = document.getElementById('searchCheckin')?.value;
    const checkout = document.getElementById('searchCheckout')?.value;
    const guests = document.getElementById('searchGuests')?.value;

    if (!country || !city || !checkin || !checkout || !guests) {
        alert('Lūdzu, aizpildiet visus meklēšanas laukus.');
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        alert('Izvākšanās dienai jābūt pēc ievākšanās dienas.');
        return;
    }

    renderRooms(allRooms);
    document.getElementById('stays')?.scrollIntoView({ behavior: 'smooth' });
}

function filterByCategory(category) {
    currentCategory = category;

    const filteredRooms = category === 'Viss'
        ? allRooms
        : allRooms.filter(room => room.category === category);

    renderRooms(filteredRooms);

    document.querySelectorAll('.category-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.category === category);
    });
}

async function submitBooking(event) {
    event.preventDefault();

    const name = document.getElementById('guestName')?.value.trim();
    const email = document.getElementById('guestEmail')?.value.trim();
    const phone = document.getElementById('guestPhone')?.value.trim();
    const checkin = document.getElementById('bookingCheckin')?.value;
    const checkout = document.getElementById('bookingCheckout')?.value;
    const guests = document.getElementById('bookingGuests')?.value;

    if (!name || !email || !phone || !checkin || !checkout || !guests) {
        alert('Lūdzu, aizpildiet visus rezervācijas laukus.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Lūdzu, ievadiet derīgu e-pasta adresi.');
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        alert('Izvākšanās dienai jābūt pēc ievākšanās dienas.');
        return;
    }

    if (!currentRoom) {
        alert('Lūdzu, izvēlieties numuru.');
        return;
    }

    const submitButton = event.submitter || document.querySelector('#bookingForm button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Saglabā...';
    }

    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    const booking = {
        id: 'VR' + Math.random().toString(36).slice(2, 11).toUpperCase(),
        name,
        email,
        phone,
        checkin,
        checkout,
        guests: parseInt(guests, 10),
        roomId: currentRoom.id,
        room: currentRoom.name,
        roomCategory: currentRoom.category,
        nightlyPrice: currentRoom.price,
        totalPrice: currentRoom.price * nights,
        date: new Date().toISOString()
    };

    saveBookingLocally(booking);

    let savedOnline = false;
    try {
        savedOnline = await saveBookingToSupabase(booking);
    } catch (error) {
        console.error('Neizdevās saglabāt rezervāciju Supabase:', error);
        alert('Rezervācija ir saglabāta lokāli, bet to neizdevās saglabāt Supabase datubāzē.');
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    showSuccessModal(booking.id, savedOnline);
    document.getElementById('bookingForm')?.reset();
    updateBookingSummary();
}

function saveBookingLocally(booking) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

async function saveBookingToSupabase(booking) {
    const client = window.supabaseClient;
    if (!client) return false;

    const { error } = await client
        .from('bookings')
        .insert([{
            id: booking.id,
            guest_name: booking.name,
            guest_email: booking.email,
            guest_phone: booking.phone,
            checkin: booking.checkin,
            checkout: booking.checkout,
            guests: booking.guests,
            room_id: booking.roomId,
            room_name: booking.room,
            room_category: booking.roomCategory,
            nightly_price: booking.nightlyPrice,
            total_price: booking.totalPrice,
            created_at: booking.date
        }]);

    if (error) throw error;
    return true;
}

function updateBookingSummary() {
    const summary = document.getElementById('bookingSummary');
    if (!summary || !currentRoom) return;

    summary.innerHTML = `
        <strong>${currentRoom.name}</strong><br>
        Cena: €${currentRoom.price} par nakti
    `;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function goHome(event) {
    if (event) event.preventDefault();

    closeRoomModal();
    closeBookingModal();

    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('active');
        successModal.style.display = 'none';
    }

    document.body.style.overflow = 'auto';
    currentCategory = 'Viss';
    renderRooms(allRooms);

    document.querySelectorAll('.category-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.category === 'Viss');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupEventListeners() {
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => filterByCategory(button.dataset.category));
    });

    document.getElementById('modalClose')?.addEventListener('click', closeRoomModal);
    document.getElementById('bookingModalClose')?.addEventListener('click', closeBookingModal);
    document.getElementById('searchBtn')?.addEventListener('click', handleSearch);
    document.getElementById('searchCountry')?.addEventListener('change', updateCities);
    document.getElementById('bookingBtn')?.addEventListener('click', openBookingModal);
    document.getElementById('bookingForm')?.addEventListener('submit', submitBooking);

    document.getElementById('roomModal')?.addEventListener('click', event => {
        if (event.target.id === 'roomModal') closeRoomModal();
    });

    document.getElementById('bookingModal')?.addEventListener('click', event => {
        if (event.target.id === 'bookingModal') closeBookingModal();
    });

    document.getElementById('successModal')?.addEventListener('click', event => {
        if (event.target.id === 'successModal') goHome();
    });

    document.getElementById('navToggle')?.addEventListener('click', () => {
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeRoomModal();
            closeBookingModal();
            const successModal = document.getElementById('successModal');
            if (successModal) successModal.style.display = 'none';
        }
    });
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

function registerServiceWorker() {
    if (window.location.protocol === 'file:') return;

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {
            console.log('Service Worker registration failed');
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
