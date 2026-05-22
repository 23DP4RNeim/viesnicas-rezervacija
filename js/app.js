// ===========================
// Viesnicu rezervacija
// ===========================

let currentRoom = null;
let currentCategory = 'Viss';
let allRooms = [];
let blockedDates = [];
let authMode = 'login';
let authUser = null;
let authInitialized = false;

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const LOCAL_AVAILABILITY_KEY = 'room_unavailability_seed';

const countryCities = {
    Latvija: ['Rīga', 'Jūrmala', 'Liepāja', 'Daugavpils', 'Ventspils'],
    Lietuva: ['Viļņa', 'Kauņa', 'Klaipēda', 'Alīta', 'Panevēža'],
    Igaunija: ['Tallina', 'Tartu', 'Narva', 'Pērnava', 'Rakvere'],
    Polija: ['Varšava', 'Krakova', 'Vroclava', 'Poznaņa', 'Gdaņska'],
    Vācija: ['Berlīne', 'Minhene', 'Hamburga', 'Frankfurte', 'Ķelne'],
    Francija: ['Parīze', 'Marseļa', 'Liona', 'Tulūza', 'Nica'],
    Itālija: ['Roma', 'Milāna', 'Venēcija', 'Florence', 'Neapole'],
    Spānija: ['Madride', 'Barselona', 'Seviļa', 'Valensija', 'Bilbao'],
    Beļģija: ['Brisele', 'Antverpene', 'Gente', 'Brige', 'Ljēža'],
    Austrija: ['Vīne', 'Zalcburga', 'Insbruka', 'Grāca', 'Linca'],
    Zviedrija: ['Stokholma', 'Gēteborga', 'Malme', 'Upsāla', 'Vesterosa'],
    Norvēģija: ['Oslo', 'Bergena', 'Tronheima', 'Stavangera', 'Kristiansanna'],
    Dānija: ['Kopenhāgena', 'Orhūsa', 'Olborga', 'Esbjerga', 'Randersa'],
    Somija: ['Helsinki', 'Espo', 'Tampere', 'Turku', 'Oulu'],
    Grieķija: ['Atēnas', 'Saloniki', 'Larisa', 'Hērakleja', 'Volosa'],
    Portugāle: ['Lisabona', 'Porto', 'Braga', 'Koimbra', 'Kaskaiša'],
    Čehija: ['Prāga', 'Brno', 'Ostrava', 'Plzeņa', 'Libereca'],
    Slovākija: ['Bratislava', 'Košice', 'Prešova', 'Žilina', 'Banska Bistrica'],
    Ungārija: ['Budapešta', 'Debrecena', 'Segeda', 'Miškolca', 'Pēča'],
    Rumānija: ['Bukareste', 'Kluža-Napoka', 'Timišoara', 'Jasi', 'Konstanca']
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
    resetBodyScroll();
    allRooms = [...rooms];
    ensureAuthEnhancements();
    setupEventListeners();
    populateCountries();
    renderRooms(allRooms);
    registerServiceWorker();
    initializeDateInputs();
    initializeAuth();
    hydratePageSectionFromHash();
    initializeAvailability();
    initializeAdminPage();
}

function renderRooms(roomsToShow) {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;

    roomsGrid.innerHTML = roomsToShow.map(room => {
        const unavailableLabel = getNextBlockedRangeLabel(room.id);

        return `
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
                    ${unavailableLabel ? `<p class="availability-chip">${unavailableLabel}</p>` : ''}
                    <p class="room-price">EUR ${room.price} <span style="font-size: 14px; color: var(--text-muted);">par nakti</span></p>
                </div>
            </div>
        `;
    }).join('');
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
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
    setText('selectedRoomName', currentRoom.name);
    setText('selectedRoomPrice', currentRoom.price);

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

    const roomAvailability = document.getElementById('roomAvailability');
    if (roomAvailability) {
        roomAvailability.textContent = getNextBlockedRangeLabel(roomId) || 'Sis numurs paslaik ir pieejams.';
    }

    showModal('roomModal');
}

function closeRoomModal() {
    hideModal('roomModal');
}

function openBookingModal() {
    if (!currentRoom) {
        alert('Ludzu, izvelieties numuru.');
        return;
    }

    closeRoomModal();
    copySearchDatesToBookingForm();
    updateBookingSummary();
    updateBookingAvailabilityNotice();
    prefillBookingUserData();
    showModal('bookingModal');
}

function closeBookingModal() {
    hideModal('bookingModal');
}

function showSuccessModal(bookingId, savedOnline) {
    hideModal('bookingModal');
    showModal('successModal');
    setText('bookingId', bookingId);
    setText(
        'successMessage',
        savedOnline
            ? 'Rezervacija ir saglabata Supabase datubaze.'
            : 'Rezervacija ir saglabata lokali. Lai saglabatu online, palaidiet Supabase tabulas no schema faila.'
    );
}

function populateCountries() {
    const countrySelect = document.getElementById('searchCountry');
    if (!countrySelect) return;

    countrySelect.innerHTML = '<option value="">Izvelieties valsti</option>';
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

    citySelect.innerHTML = '<option value="">Izvelieties pilsetu</option>';

    (countryCities[countrySelect.value] || []).forEach(city => {
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
        alert('Ludzu, aizpildiet visus meklosanas laukus.');
        return;
    }

    if (!isValidStayRange(checkin, checkout)) {
        alert('Izvaksanas dienai jabut pec ievaksanas dienas.');
        return;
    }

    renderRooms(allRooms);
    scrollToSection('stays');

    const search = { country, city, checkin, checkout, guests, date: new Date().toISOString() };
    saveSearchToSupabase(search).catch(error => console.warn('Search was not saved online:', error));
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
        alert('Ludzu, aizpildiet visus rezervacijas laukus.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Ludzu, ievadiet derigu e-pasta adresi.');
        return;
    }

    if (!isValidStayRange(checkin, checkout)) {
        alert('Izvaksanas dienai jabut pec ievaksanas dienas.');
        return;
    }

    if (!currentRoom) {
        alert('Ludzu, izvelieties numuru.');
        return;
    }

    const conflictingRange = getConflictingBlockedRange(currentRoom.id, checkin, checkout);
    if (conflictingRange) {
        alert(`Sis numurs nav pieejams no ${formatDate(conflictingRange.start_date)} lidz ${formatDate(conflictingRange.end_date)}.`);
        updateBookingAvailabilityNotice();
        return;
    }

    const submitButton = event.submitter || document.querySelector('#bookingForm button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Saglabaju...';
    }

    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / MS_PER_DAY);
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
        console.error('Neizdevas saglabat rezervaciju Supabase:', error);
        alert('Rezervacija ir saglabata lokali, bet Supabase saglabasana neizdevas.');
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }

    showSuccessModal(booking.id, savedOnline);
    document.getElementById('bookingForm')?.reset();
    updateBookingSummary();
    updateBookingAvailabilityNotice();
}

function saveBookingLocally(booking) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

async function saveBookingToSupabase(booking) {
    const client = window.supabaseClient;
    if (!client) return false;

    const user = client.auth.getUser ? (await client.auth.getUser()).data?.user : null;
    const insertObj = {
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
    };

    if (user?.id) {
        insertObj.user_id = user.id;
    }

    const { error } = await client.from('bookings').insert([insertObj]);
    if (error) throw error;

    return true;
}

function updateBookingSummary() {
    const summary = document.getElementById('bookingSummary');
    if (!summary || !currentRoom) return;

    summary.innerHTML = `
        <strong>${currentRoom.name}</strong><br>
        Cena: EUR ${currentRoom.price} par nakti
    `;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function goHome(event) {
    if (event) event.preventDefault();

    closeAllModals();
    resetBodyScroll();
    currentCategory = 'Viss';

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        renderRooms(allRooms);
        document.querySelectorAll('.category-btn').forEach(button => {
            button.classList.toggle('active', button.dataset.category === 'Viss');
        });
        window.history.replaceState({}, '', 'index.html');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    window.location.href = 'index.html';
}

function setupEventListeners() {
    document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => filterByCategory(button.dataset.category));
    });

    document.getElementById('modalClose')?.addEventListener('click', closeRoomModal);
    document.getElementById('bookingModalClose')?.addEventListener('click', closeBookingModal);
    document.getElementById('authModalClose')?.addEventListener('click', hideAuthModal);
    document.getElementById('searchBtn')?.addEventListener('click', handleSearch);
    document.getElementById('searchCountry')?.addEventListener('change', updateCities);
    document.getElementById('bookingBtn')?.addEventListener('click', openBookingModal);
    document.getElementById('bookingForm')?.addEventListener('submit', submitBooking);
    document.getElementById('bookingCheckin')?.addEventListener('change', updateBookingAvailabilityNotice);
    document.getElementById('bookingCheckout')?.addEventListener('change', updateBookingAvailabilityNotice);
    document.getElementById('authBtn')?.addEventListener('click', handleAuthButtonClick);
    document.getElementById('profileOverviewBtn')?.addEventListener('click', event => {
        event.preventDefault();
        closeProfileMenu();
        showProfileOverviewModal();
    });
    document.getElementById('profileReservationsBtn')?.addEventListener('click', async event => {
        event.preventDefault();
        closeProfileMenu();
        await showReservationsOverviewModal();
    });
    document.getElementById('profileSignOutBtn')?.addEventListener('click', async event => {
        event.preventDefault();
        closeProfileMenu();
        await signOutUser();
    });

    document.querySelectorAll('.nav-link[href*="#"]').forEach(link => {
        link.addEventListener('click', event => {
            closeMobileNav();

            const href = link.getAttribute('href') || '';
            if (!href.startsWith('#')) return;

            event.preventDefault();
            scrollToSection(href.slice(1));
        });
    });

    document.getElementById('navToggle')?.addEventListener('click', () => {
        const nav = document.querySelector('.navbar-nav');
        if (!nav) return;

        nav.classList.toggle('open');
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target !== modal) return;
            if (modal.id === 'successModal') {
                goHome();
                return;
            }
            hideModal(modal.id);
        });
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeAllModals();
            closeProfileMenu();
        }
    });

    document.addEventListener('click', event => {
        const profileWrapper = document.getElementById('profileMenuWrapper');
        if (!profileWrapper || profileWrapper.contains(event.target)) return;
        closeProfileMenu();
    });

    window.addEventListener('hashchange', hydratePageSectionFromHash);
    window.addEventListener('pageshow', resetBodyScroll);
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function showModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.add('active');
    modal.style.display = 'flex';
    setBodyScrollLocked(true);
}

function hideModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    modal.classList.remove('active');
    modal.style.display = 'none';

    if (!document.querySelector('.modal.active')) {
        resetBodyScroll();
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
        modal.style.display = 'none';
    });
    resetBodyScroll();
}

function setBodyScrollLocked(isLocked) {
    document.body.classList.toggle('modal-open', isLocked);
    document.body.style.overflow = isLocked ? 'hidden' : '';
}

function resetBodyScroll() {
    setBodyScrollLocked(false);
}

function scrollToSection(id) {
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hydratePageSectionFromHash() {
    if (!window.location.hash) return;

    const targetId = window.location.hash.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function closeMobileNav() {
    document.querySelector('.navbar-nav')?.classList.remove('open');
}

function initializeDateInputs() {
    const today = new Date();
    const tomorrow = new Date(today.getTime() + MS_PER_DAY);
    const minDate = today.toISOString().split('T')[0];
    const defaultCheckout = tomorrow.toISOString().split('T')[0];

    ['searchCheckin', 'bookingCheckin'].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.min = minDate;
        if (!input.value) input.value = minDate;
    });

    ['searchCheckout', 'bookingCheckout'].forEach(id => {
        const input = document.getElementById(id);
        if (!input) return;
        input.min = minDate;
        if (!input.value) input.value = defaultCheckout;
    });
}

function copySearchDatesToBookingForm() {
    const searchCheckin = document.getElementById('searchCheckin')?.value;
    const searchCheckout = document.getElementById('searchCheckout')?.value;
    const searchGuests = document.getElementById('searchGuests')?.value;

    if (searchCheckin) document.getElementById('bookingCheckin').value = searchCheckin;
    if (searchCheckout) document.getElementById('bookingCheckout').value = searchCheckout;
    if (searchGuests) document.getElementById('bookingGuests').value = searchGuests;
}

function prefillBookingUserData() {
    if (!authUser) return;

    const emailInput = document.getElementById('guestEmail');
    if (emailInput && !emailInput.value) {
        emailInput.value = authUser.email || '';
    }
}

async function saveSearchToSupabase(search) {
    const client = window.supabaseClient;
    if (!client) return false;

    const user = client.auth.getUser ? (await client.auth.getUser()).data?.user : null;
    const insertObj = {
        country: search.country,
        city: search.city,
        checkin: search.checkin,
        checkout: search.checkout,
        guests: Number(search.guests),
        created_at: search.date
    };

    if (user?.id) {
        insertObj.user_id = user.id;
    }

    const { error } = await client.from('searches').insert([insertObj]);
    if (error) throw error;

    return true;
}

async function initializeAuth() {
    if (authInitialized) return;
    authInitialized = true;

    wireAuthForms();

    const client = window.supabaseClient;
    if (!client?.auth) {
        updateAuthButton(null);
        return;
    }

    client.auth.onAuthStateChange((_event, session) => {
        authUser = session?.user || null;
        updateAuthButton(authUser);
        prefillBookingUserData();
        syncAuthScreens();
    });

    try {
        const { data } = await client.auth.getUser();
        authUser = data?.user || null;
        updateAuthButton(authUser);
        prefillBookingUserData();
        syncAuthScreens();
    } catch (_error) {
        updateAuthButton(null);
    }
}

function wireAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    const magicLinkBtn = document.getElementById('magicLinkBtn');

    loginForm?.addEventListener('submit', submitAuthForm);
    showSignup?.addEventListener('click', () => setAuthMode('signup'));
    showLogin?.addEventListener('click', () => setAuthMode('login'));
    magicLinkBtn?.addEventListener('click', sendMagicLink);

    setAuthMode('login');
}

function handleAuthButtonClick(event) {
    if (authUser) {
        event.preventDefault();
        toggleProfileMenu();
        return;
    }

    showAuthModal('login');
}

function showAuthModal(mode = 'login') {
    setAuthMode(mode);

    const authModal = document.getElementById('authModal');
    if (authModal) {
        showModal('authModal');
        return;
    }

    if (!window.location.pathname.endsWith('auth.html')) {
        window.location.href = 'auth.html';
    }
}

function hideAuthModal() {
    hideModal('authModal');
}

function setAuthMode(mode) {
    authMode = mode;

    const title = document.getElementById('authTitle');
    const submitButton = document.getElementById('loginSubmit');
    const signupButton = document.getElementById('showSignup');
    const loginButton = document.getElementById('showLogin');
    const helper = document.getElementById('authHelper');
    const firstNameGroup = document.getElementById('authFirstNameGroup');

    if (title) {
        title.textContent = mode === 'signup' ? 'Registreties' : 'Pieslegties';
    }

    if (submitButton) {
        submitButton.textContent = mode === 'signup' ? 'Izveidot kontu' : 'Pieslegties';
    }

    if (signupButton) {
        signupButton.style.display = mode === 'signup' ? 'none' : 'inline-flex';
    }

    if (loginButton) {
        loginButton.style.display = mode === 'signup' ? 'inline-flex' : 'none';
    }

    if (firstNameGroup) {
        firstNameGroup.style.display = mode === 'signup' ? 'block' : 'none';
    }

    if (helper) {
        helper.textContent = mode === 'signup'
            ? 'Izveidojiet kontu, lai rezervacijas butu piesaistitas jusu profilam.'
            : 'Piesledzieties, lai redzetu savu e-pastu rezervacijas forma.';
    }

    setAuthStatus('');
}

async function submitAuthForm(event) {
    event.preventDefault();

    const client = window.supabaseClient;
    if (!client?.auth) {
        setAuthStatus('Supabase nav ieladets. Parbaudiet skriptu un konfiguraciju.', true);
        return;
    }

    const email = document.getElementById('authEmail')?.value.trim();
    const password = document.getElementById('authPassword')?.value.trim();
    const firstName = document.getElementById('authFirstName')?.value.trim();

    if (!email || !password) {
        setAuthStatus('Ievadiet e-pastu un paroli.', true);
        return;
    }

    if (authMode === 'signup' && !firstName) {
        setAuthStatus('Ievadiet savu vardu.', true);
        return;
    }

    const submitButton = document.getElementById('loginSubmit');
    const originalText = submitButton?.textContent;

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = authMode === 'signup' ? 'Veidoju kontu...' : 'Piesledzu...';
    }

    try {
        if (authMode === 'signup') {
            const { error } = await client.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        full_name: firstName
                    }
                }
            });
            if (error) throw error;
            setAuthStatus('Konts izveidots. Ja Supabase prasa apstiprinajumu, parbaudiet e-pastu.');
            setAuthMode('login');
        } else {
            const { error } = await client.auth.signInWithPassword({ email, password });
            if (error) throw error;
            setAuthStatus('Pieslegsanas izdevusies.');
            hideAuthModal();
            redirectAfterAuth();
        }
    } catch (error) {
        console.error('Auth error:', error);
        setAuthStatus(error.message || 'Autentifikacijas kluda.', true);
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
}

async function sendMagicLink() {
    const client = window.supabaseClient;
    if (!client?.auth) {
        setAuthStatus('Supabase nav ieladets.', true);
        return;
    }

    const email = document.getElementById('authEmail')?.value.trim();
    if (!email) {
        setAuthStatus('Ievadiet e-pastu, lai nosutitu pieslegsanas saiti.', true);
        return;
    }

    const { error } = await client.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${window.location.origin}${window.location.pathname.replace(/[^/]+$/, 'index.html')}`
        }
    });

    if (error) {
        setAuthStatus(error.message || 'Neizdevas nosutit saiti.', true);
        return;
    }

    setAuthStatus('Pieslegsanas saite ir nosutita uz jusu e-pastu.');
}

async function signOutUser() {
    const client = window.supabaseClient;
    if (!client?.auth) return;

    const { error } = await client.auth.signOut();
    if (error) {
        alert(error.message || 'Neizdevas atslegties.');
        return;
    }

    authUser = null;
    updateAuthButton(null);
}

function updateAuthButton(user) {
    const authBtn = document.getElementById('authBtn');
    if (!authBtn) return;

    if (user) {
        authBtn.classList.add('profile-trigger');
        authBtn.classList.remove('btn-link');
        authBtn.innerHTML = `
            <span class="profile-trigger-icon" aria-hidden="true">👤</span>
            <span class="profile-trigger-name">${escapeHtml(getUserFirstName(user))}</span>
            <span class="profile-trigger-caret" aria-hidden="true">▾</span>
        `;
    } else {
        authBtn.classList.remove('profile-trigger');
        authBtn.classList.add('btn-link');
        authBtn.textContent = 'Pieslegties';
        closeProfileMenu();
    }
}

function syncAuthScreens() {
    const page = getCurrentPage();
    if (page === 'auth') {
        const adminEntry = document.getElementById('authAdminLink');
        if (adminEntry) {
            adminEntry.style.display = authUser ? 'block' : 'none';
        }
    }
}

function getCurrentPage() {
    return document.body?.dataset?.page || '';
}

function getPostAuthRedirect() {
    const params = new URLSearchParams(window.location.search);
    const next = params.get('next');

    if (next) return next;
    if (getCurrentPage() === 'auth') return 'index.html';
    return '';
}

function redirectAfterAuth() {
    const destination = getPostAuthRedirect();
    if (destination) {
        window.location.href = destination;
    }
}

function ensureAuthEnhancements() {
    ensureAuthFirstNameField();
    ensureProfileMenuMarkup();
    ensureProfileModals();
}

function ensureAuthFirstNameField() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm || document.getElementById('authFirstNameGroup')) return;

    const firstGroup = document.createElement('div');
    firstGroup.className = 'form-group';
    firstGroup.id = 'authFirstNameGroup';
    firstGroup.style.display = 'none';
    firstGroup.innerHTML = `
        <label for="authFirstName">Vards</label>
        <input type="text" id="authFirstName" placeholder="Jusu vards">
    `;

    const emailGroup = document.getElementById('authEmail')?.closest('.form-group');
    if (emailGroup) {
        loginForm.insertBefore(firstGroup, emailGroup);
    } else {
        loginForm.prepend(firstGroup);
    }
}

function ensureProfileMenuMarkup() {
    const authBtn = document.getElementById('authBtn');
    if (!authBtn || document.getElementById('profileMenuWrapper')) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'profile-menu-wrapper';
    wrapper.id = 'profileMenuWrapper';

    authBtn.parentNode.insertBefore(wrapper, authBtn);
    wrapper.appendChild(authBtn);

    const menu = document.createElement('div');
    menu.className = 'profile-menu';
    menu.id = 'profileMenu';
    menu.innerHTML = `
        <button type="button" class="profile-menu-item" id="profileReservationsBtn">Overview reservations</button>
        <button type="button" class="profile-menu-item" id="profileOverviewBtn">Profile overview</button>
        <button type="button" class="profile-menu-item danger" id="profileSignOutBtn">Sign out</button>
    `;

    wrapper.appendChild(menu);
}

function ensureProfileModals() {
    if (!document.getElementById('profileOverviewModal')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal" id="profileOverviewModal">
                <div class="modal-content modal-sm">
                    <button class="modal-close" type="button" onclick="hideModal('profileOverviewModal')">&times;</button>
                    <div class="modal-body">
                        <h2>Profile overview</h2>
                        <div class="profile-card">
                            <div class="profile-avatar-large">👤</div>
                            <div class="profile-card-content">
                                <h3 id="profileOverviewName">-</h3>
                                <p id="profileOverviewEmail">-</p>
                                <p id="profileOverviewMemberSince">-</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }

    if (!document.getElementById('reservationsOverviewModal')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal" id="reservationsOverviewModal">
                <div class="modal-content modal-large">
                    <button class="modal-close" type="button" onclick="hideModal('reservationsOverviewModal')">&times;</button>
                    <div class="modal-body">
                        <h2>Overview reservations</h2>
                        <div class="profile-reservations-list" id="profileReservationsList">
                            <p>Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    }
}

function toggleProfileMenu() {
    const wrapper = document.getElementById('profileMenuWrapper');
    if (!wrapper || !authUser) return;

    wrapper.classList.toggle('open');
}

function closeProfileMenu() {
    document.getElementById('profileMenuWrapper')?.classList.remove('open');
}

function getUserFirstName(user) {
    const fromMeta = user?.user_metadata?.first_name || user?.user_metadata?.full_name;
    if (fromMeta) {
        return String(fromMeta).trim().split(/\s+/)[0];
    }

    const fromEmail = user?.email ? user.email.split('@')[0] : 'Profils';
    const cleaned = fromEmail.replace(/[._-]+/g, ' ').trim();
    return cleaned ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1).split(/\s+/)[0] : 'Profils';
}

function showProfileOverviewModal() {
    if (!authUser) return;

    setText('profileOverviewName', getUserFirstName(authUser));
    setText('profileOverviewEmail', authUser.email || '-');
    setText(
        'profileOverviewMemberSince',
        authUser.created_at
            ? `Member since ${formatDateTime(authUser.created_at)}`
            : 'Member since -'
    );
    showModal('profileOverviewModal');
}

async function showReservationsOverviewModal() {
    if (!authUser) return;

    const list = document.getElementById('profileReservationsList');
    if (list) {
        list.innerHTML = '<p>Loading reservations...</p>';
    }

    showModal('reservationsOverviewModal');

    const reservations = await loadUserReservations();
    renderUserReservations(reservations);
}

async function loadUserReservations() {
    const client = window.supabaseClient;

    if (client && authUser?.id) {
        try {
            const { data, error } = await client
                .from('bookings')
                .select('*')
                .eq('user_id', authUser.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.warn('Could not load reservations from Supabase:', error);
        }
    }

    const local = JSON.parse(localStorage.getItem('bookings') || '[]');
    return local.filter(booking => booking.email === authUser?.email);
}

function renderUserReservations(reservations) {
    const list = document.getElementById('profileReservationsList');
    if (!list) return;

    if (!reservations.length) {
        list.innerHTML = '<p>There are no reservations on this profile yet.</p>';
        return;
    }

    list.innerHTML = reservations.map(booking => `
        <article class="reservation-card">
            <div class="reservation-card-head">
                <h3>${escapeHtml(booking.room_name || booking.room || 'Numurs')}</h3>
                <span class="reservation-total">EUR ${Number(booking.total_price || 0).toFixed(2)}</span>
            </div>
            <p><strong>ID:</strong> ${escapeHtml(booking.id || '-')}</p>
            <p><strong>Dates:</strong> ${formatDate(booking.checkin)} - ${formatDate(booking.checkout)}</p>
            <p><strong>Guests:</strong> ${escapeHtml(String(booking.guests || '-'))}</p>
        </article>
    `).join('');
}

async function initializeAdminPage() {
    if (getCurrentPage() !== 'admin') return;

    const client = window.supabaseClient;
    const loginForm = document.getElementById('adminLoginForm');
    const refreshBtn = document.getElementById('adminRefreshBtn');
    const signOutBtn = document.getElementById('adminSignOutBtn');

    loginForm?.addEventListener('submit', submitAdminLogin);
    refreshBtn?.addEventListener('click', loadAdminDashboard);
    signOutBtn?.addEventListener('click', async () => {
        await signOutUser();
        renderAdminAccess(false);
        setAdminStatus('Jus esat atslegts.');
    });

    if (!client?.auth) {
        setAdminStatus('Supabase nav ieladets. Admin pieslegsanas nav pieejama.', true);
        renderAdminAccess(false);
        return;
    }

    const { data } = await client.auth.getUser();
    authUser = data?.user || null;
    updateAuthButton(authUser);

    if (!authUser) {
        renderAdminAccess(false);
        return;
    }

    const isAdmin = await isAdminUser(authUser);
    if (!isAdmin) {
        await signOutUser();
        renderAdminAccess(false);
        setAdminStatus('Sis konts nav admin konts.', true);
        return;
    }

    renderAdminAccess(true, authUser);
    await loadAdminDashboard();
}

async function submitAdminLogin(event) {
    event.preventDefault();

    const client = window.supabaseClient;
    if (!client?.auth) {
        setAdminStatus('Supabase nav ieladets.', true);
        return;
    }

    const email = document.getElementById('adminEmail')?.value.trim();
    const password = document.getElementById('adminPassword')?.value.trim();
    const submitButton = document.getElementById('adminLoginSubmit');
    const originalText = submitButton?.textContent;

    if (!email || !password) {
        setAdminStatus('Ievadiet admin e-pastu un paroli.', true);
        return;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Parbaudu...';
    }

    try {
        const { error } = await client.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const { data } = await client.auth.getUser();
        authUser = data?.user || null;

        const isAdmin = await isAdminUser(authUser);
        if (!isAdmin) {
            await signOutUser();
            renderAdminAccess(false);
            setAdminStatus('Pieslegsanas izdevusies, bet sis lietotajs nav admins.', true);
            return;
        }

        renderAdminAccess(true, authUser);
        setAdminStatus('');
        await loadAdminDashboard();
    } catch (error) {
        console.error('Admin login error:', error);
        setAdminStatus(error.message || 'Admin pieslegsanas kluda.', true);
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
}

async function isAdminUser(user) {
    if (!user || !window.supabaseClient) return false;

    const { data, error } = await window.supabaseClient
        .from('admin_users')
        .select('email')
        .eq('email', user.email)
        .maybeSingle();

    if (error) {
        console.error('Admin check error:', error);
        return false;
    }

    return Boolean(data?.email);
}

function renderAdminAccess(isAllowed, user = null) {
    const loginPanel = document.getElementById('adminLoginPanel');
    const dashboard = document.getElementById('adminDashboard');
    const label = document.getElementById('adminUserLabel');

    if (loginPanel) {
        loginPanel.style.display = isAllowed ? 'none' : 'block';
    }

    if (dashboard) {
        dashboard.style.display = isAllowed ? 'block' : 'none';
    }

    if (label) {
        label.textContent = user?.email || '';
    }
}

async function loadAdminDashboard() {
    if (getCurrentPage() !== 'admin' || !authUser) return;

    const client = window.supabaseClient;
    if (!client) return;

    setAdminStatus('Ieladeju rezervacijas...');

    try {
        const [{ data: bookings, error: bookingsError }, { data: searches, error: searchesError }, { data: blocked, error: blockedError }] = await Promise.all([
            client.from('bookings').select('*').order('created_at', { ascending: false }),
            client.from('searches').select('*').order('created_at', { ascending: false }),
            client.from('room_unavailability').select('*').order('start_date', { ascending: true })
        ]);

        if (bookingsError) throw bookingsError;
        if (searchesError) throw searchesError;
        if (blockedError) throw blockedError;

        renderAdminStats(bookings || [], searches || [], blocked || []);
        renderAdminTable('adminBookingsTable', bookings || [], createBookingRow, 8);
        renderAdminTable('adminSearchesTable', searches || [], createSearchRow, 6);
        renderAdminTable('adminBlockedTable', blocked || [], createBlockedRow, 4);
        setAdminStatus(`Ieladiti dati: ${bookings?.length || 0} rezervacijas.`);
    } catch (error) {
        console.error('Admin dashboard error:', error);
        setAdminStatus(error.message || 'Neizdevas ieladet admin datus.', true);
    }
}

function renderAdminStats(bookings, searches, blocked) {
    setText('adminBookingsCount', String(bookings.length));
    setText('adminSearchesCount', String(searches.length));
    setText('adminBlockedCount', String(blocked.length));

    const revenue = bookings.reduce((sum, booking) => sum + Number(booking.total_price || 0), 0);
    setText('adminRevenue', `EUR ${revenue.toFixed(2)}`);
}

function renderAdminTable(tableBodyId, rows, rowRenderer, columnCount) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) return;

    if (!rows.length) {
        tableBody.innerHTML = `<tr><td colspan="${columnCount}">Nav datu.</td></tr>`;
        return;
    }

    tableBody.innerHTML = rows.map(rowRenderer).join('');
}

function createBookingRow(booking) {
    return `
        <tr>
            <td>${escapeHtml(booking.id)}</td>
            <td>${escapeHtml(booking.guest_name)}</td>
            <td>${escapeHtml(booking.guest_email)}</td>
            <td>${escapeHtml(booking.room_name)}</td>
            <td>${formatDate(booking.checkin)}</td>
            <td>${formatDate(booking.checkout)}</td>
            <td>${escapeHtml(String(booking.guests))}</td>
            <td>EUR ${Number(booking.total_price || 0).toFixed(2)}</td>
        </tr>
    `;
}

function createSearchRow(search) {
    return `
        <tr>
            <td>${escapeHtml(search.country)}</td>
            <td>${escapeHtml(search.city)}</td>
            <td>${formatDate(search.checkin)}</td>
            <td>${formatDate(search.checkout)}</td>
            <td>${escapeHtml(String(search.guests))}</td>
            <td>${formatDateTime(search.created_at)}</td>
        </tr>
    `;
}

function createBlockedRow(entry) {
    return `
        <tr>
            <td>${escapeHtml(String(entry.room_id))}</td>
            <td>${formatDate(entry.start_date)}</td>
            <td>${formatDate(entry.end_date)}</td>
            <td>${escapeHtml(entry.note || '')}</td>
        </tr>
    `;
}

function setAdminStatus(message, isError = false) {
    ['adminStatus', 'adminDashboardStatus'].forEach(id => {
        const status = document.getElementById(id);
        if (!status) return;

        status.textContent = message;
        status.classList.toggle('error', Boolean(message) && isError);
        status.classList.toggle('success', Boolean(message) && !isError);
    });
}

function formatDateTime(value) {
    return new Date(value).toLocaleString('lv-LV', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function setAuthStatus(message, isError = false) {
    const status = document.getElementById('authStatus');
    if (!status) return;

    status.textContent = message;
    status.classList.toggle('error', Boolean(message) && isError);
    status.classList.toggle('success', Boolean(message) && !isError);
}

async function initializeAvailability() {
    blockedDates = await loadBlockedDates();
    renderRooms(allRooms);
    updateBookingAvailabilityNotice();
}

async function loadBlockedDates() {
    const localSeed = getLocalAvailabilitySeed();
    const client = window.supabaseClient;

    if (!client) {
        return localSeed;
    }

    try {
        const { data, error } = await client
            .from('room_unavailability')
            .select('room_id,start_date,end_date,note')
            .order('start_date', { ascending: true });

        if (error) throw error;

        if (!data || data.length === 0) {
            const seed = buildSeedAvailability();
            const { error: insertError } = await client.from('room_unavailability').insert(seed);
            if (insertError) throw insertError;
            localStorage.setItem(LOCAL_AVAILABILITY_KEY, JSON.stringify(seed));
            return seed;
        }

        localStorage.setItem(LOCAL_AVAILABILITY_KEY, JSON.stringify(data));
        return data;
    } catch (error) {
        console.warn('Could not load room availability from Supabase:', error);
        return localSeed;
    }
}

function getLocalAvailabilitySeed() {
    const local = localStorage.getItem(LOCAL_AVAILABILITY_KEY);
    if (local) {
        return JSON.parse(local);
    }

    const seed = buildSeedAvailability();
    localStorage.setItem(LOCAL_AVAILABILITY_KEY, JSON.stringify(seed));
    return seed;
}

function buildSeedAvailability() {
    const today = new Date();
    const base = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const offsets = [
        [1, 4, 7],
        [2, 9, 12],
        [3, 14, 17],
        [4, 21, 25],
        [5, 6, 8],
        [6, 18, 20],
        [7, 27, 30]
    ];

    return offsets.map(([roomId, startOffset, endOffset]) => ({
        room_id: roomId,
        start_date: toDateString(new Date(base.getTime() + startOffset * MS_PER_DAY)),
        end_date: toDateString(new Date(base.getTime() + endOffset * MS_PER_DAY)),
        note: 'Pilns numurs'
    }));
}

function updateBookingAvailabilityNotice() {
    const notice = document.getElementById('bookingAvailabilityNotice');
    const submitButton = document.querySelector('#bookingForm button[type="submit"]');
    const checkin = document.getElementById('bookingCheckin')?.value;
    const checkout = document.getElementById('bookingCheckout')?.value;

    if (!notice || !currentRoom || !checkin || !checkout) return;

    if (!isValidStayRange(checkin, checkout)) {
        notice.textContent = 'Izvelieties derigu datumdiapazonu.';
        notice.className = 'availability-note error';
        if (submitButton) submitButton.disabled = true;
        return;
    }

    const conflict = getConflictingBlockedRange(currentRoom.id, checkin, checkout);
    if (conflict) {
        notice.textContent = `Sis numurs nav pieejams no ${formatDate(conflict.start_date)} lidz ${formatDate(conflict.end_date)}.`;
        notice.className = 'availability-note error';
        if (submitButton) submitButton.disabled = true;
        return;
    }

    notice.textContent = 'Izveletie datumi ir pieejami rezervacijai.';
    notice.className = 'availability-note success';
    if (submitButton) submitButton.disabled = false;
}

function getConflictingBlockedRange(roomId, checkin, checkout) {
    return blockedDates.find(range => {
        if (Number(range.room_id) !== Number(roomId)) return false;
        return datesOverlap(checkin, checkout, range.start_date, range.end_date);
    }) || null;
}

function getNextBlockedRangeLabel(roomId) {
    const upcoming = blockedDates.find(range => Number(range.room_id) === Number(roomId));
    if (!upcoming) return '';

    return `Nav pieejams ${formatDate(upcoming.start_date)} - ${formatDate(upcoming.end_date)}`;
}

function datesOverlap(checkin, checkout, blockedStart, blockedEnd) {
    const startA = new Date(checkin);
    const endA = new Date(checkout);
    const startB = new Date(blockedStart);
    const endB = new Date(blockedEnd);

    return startA < endB && endA > startB;
}

function isValidStayRange(checkin, checkout) {
    return Boolean(checkin && checkout && new Date(checkout) > new Date(checkin));
}

function formatDate(value) {
    return new Date(value).toLocaleDateString('lv-LV', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function toDateString(date) {
    return date.toISOString().split('T')[0];
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
