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
let currentLanguage = localStorage.getItem('site_language') || 'lv';
let currentTheme = localStorage.getItem('site_theme') || 'light';

const MS_PER_DAY = 1000 * 60 * 60 * 24;
const LOCAL_AVAILABILITY_KEY = 'room_unavailability_seed';
const LANGUAGE_STORAGE_KEY = 'site_language';
const THEME_STORAGE_KEY = 'site_theme';

const translations = {
    lv: {
        brand: 'Viesnīcu rezervācija',
        navRooms: 'Numuri',
        navFeatures: 'Priekšrocības',
        navAbout: 'Par mums',
        login: 'Pieslēgties',
        logout: 'Izrakstīties',
        profileOverview: 'Profila pārskats',
        reservationsOverview: 'Rezervāciju pārskats',
        language: 'LV',
        themeLight: 'Balts',
        themeDark: 'Melns',
        heroTitle: 'Viesnīcas numuri,<br>vienkārši rezervēti',
        heroSubtitle: 'Atrodiet piemērotu numuru Latvijā un Eiropā ar skaidrām cenām un ātru rezervācijas apstiprinājumu.',
        searchButton: 'Meklēt',
        sectionRooms: 'Ieteiktie numuri',
        sectionFeatures: 'Kāpēc izvēlēties mūs?',
        sectionAbout: 'Par viesnīcu rezervāciju',
        adminTitle: 'Admin panelis rezervācijām',
        adminSubtitle: 'Skatiet visas rezervācijas, meklējumus un datumus, kad numuri nav pieejami.',
        adminOnly: 'Tikai administratoriem',
        adminLogin: 'Admin pieslēgšanās',
        adminLoginBtn: 'Pieslēgties kā admin',
        adminOverview: 'Admin pārskats',
        adminSignedIn: 'Pieslēgtais admins:',
        adminRefresh: 'Atjaunot datus',
        overviewReservationsEmpty: 'Šim profilam vēl nav rezervāciju.',
        loading: 'Ielādē...',
        loadingReservations: 'Ielādē rezervācijas...',
        memberSince: 'Konts izveidots:',
        bookingDates: 'Datumi:',
        bookingGuests: 'Viesi:',
        bookedAt: 'Rezervēts:',
        roomLabel: 'Numurs',
        profileLabel: 'Profils',
        themeLabel: 'Tēma',
        languageLabel: 'Valoda'
    },
    en: {
        brand: 'Hotel Booking',
        navRooms: 'Rooms',
        navFeatures: 'Benefits',
        navAbout: 'About us',
        login: 'Sign in',
        logout: 'Sign out',
        profileOverview: 'Profile overview',
        reservationsOverview: 'Reservations overview',
        language: 'ENG',
        themeLight: 'White',
        themeDark: 'Black',
        heroTitle: 'Hotel rooms,<br>booked simply',
        heroSubtitle: 'Find the right room in Latvia and across Europe with clear prices and fast confirmation.',
        searchButton: 'Search',
        sectionRooms: 'Recommended rooms',
        sectionFeatures: 'Why choose us?',
        sectionAbout: 'About hotel booking',
        adminTitle: 'Admin panel for reservations',
        adminSubtitle: 'View all reservations, searches, and dates when rooms are unavailable.',
        adminOnly: 'Administrators only',
        adminLogin: 'Admin sign in',
        adminLoginBtn: 'Sign in as admin',
        adminOverview: 'Admin overview',
        adminSignedIn: 'Signed in admin:',
        adminRefresh: 'Refresh data',
        overviewReservationsEmpty: 'There are no reservations on this profile yet.',
        loading: 'Loading...',
        loadingReservations: 'Loading reservations...',
        memberSince: 'Member since:',
        bookingDates: 'Dates:',
        bookingGuests: 'Guests:',
        bookedAt: 'Booked:',
        roomLabel: 'Room',
        profileLabel: 'Profile',
        themeLabel: 'Theme',
        languageLabel: 'Language'
    }
};

const localeContent = {
    lv: {
        locale: 'lv-LV',
        searchLabels: ['Vieta', 'Pilsēta', 'Ievākšanās diena', 'Izvākšanās diena', 'Viesi'],
        searchPlaceholders: {
            country: 'Izvēlieties valsti',
            city: 'Izvēlieties pilsētu',
            guests: 'Izvēlieties viesu skaitu'
        },
        guestOptions: ['1 viesis', '2 viesi', '3 viesi', '4 viesi', '5+ viesi'],
        categoryLabels: ['Viss', 'Skats uz pilsētu', 'Dārzs', 'Ģimene', 'Luksusa numuri', 'Mājdzīvniekiem draudzīgs', 'Darba ceļojumiem', 'Spa'],
        features: [
            ['Pārbaudītas viesnīcas', 'Katrs piedāvājums tiek izvērtēts, lai viesiem būtu droša un patīkama uzturēšanās.'],
            ['Skaidras cenas', 'Jūs redzat numura cenu pirms rezervācijas, bez mulsinošām slēptām izmaksām.'],
            ['Viesu atsauksmes', 'Izvēlieties numuru, balstoties uz reāliem vērtējumiem un pieredzi.'],
            ['Ātra rezervācija', 'Aizpildiet īsu formu un uzreiz saņemiet rezervācijas apstiprinājumu.'],
            ['Atbalsts jebkurā laikā', 'Ja rodas jautājumi, mūsu atbalsta komanda ir gatava palīdzēt.'],
            ['Plašs galamērķu klāsts', 'Atrodiet piemērotu naktsmītni dažādās Eiropas pilsētās un kūrortos.']
        ],
        aboutText: 'Mūsu mērķis ir padarīt viesnīcu rezervēšanu vienkāršu, saprotamu un patīkamu. Mēs palīdzam atrast piemērotu numuru, salīdzināt iespējas un droši pabeigt rezervāciju.',
        aboutStats: ['Atlasīti piedāvājumi', 'Apmierināti viesi', 'Vidējais vērtējums', 'Klientu atbalsts'],
        roomModal: {
            beds: 'Gultas:',
            category: 'Kategorija:',
            amenities: 'Ērtības',
            perNight: 'par nakti',
            bookNow: 'Rezervēt tagad'
        },
        booking: {
            title: 'Pabeigt rezervāciju',
            selectedRoom: 'Izvēlētais numurs:',
            fullName: 'Pilns vārds',
            fullNamePlaceholder: 'Jūsu vārds un uzvārds',
            email: 'E-pasts',
            emailPlaceholder: 'jusuepasts@example.com',
            phone: 'Tālrunis',
            phonePlaceholder: '+371 XXXXXXXX',
            checkin: 'Ievākšanās diena',
            checkout: 'Izvākšanās diena',
            guests: 'Viesu skaits',
            terms: 'Piekrītu noteikumiem un nosacījumiem',
            confirm: 'Apstiprināt rezervāciju'
        },
        success: {
            title: 'Rezervācija apstiprināta!',
            message: 'Paldies par jūsu rezervāciju!',
            bookingId: 'Rezervācijas ID:',
            backHome: 'Atgriezties uz sākumu'
        },
        footer: {
            tagline: 'Vienkārša uzturēšanās, vienkārši rezervēta.',
            quickLinks: 'Ātrās saites',
            browseRooms: 'Pārlūkot numurus',
            about: 'Par mums',
            contact: 'Kontakti',
            legal: 'Juridiskā informācija',
            privacy: 'Privātuma politika',
            terms: 'Pakalpojuma noteikumi',
            follow: 'Seko mums',
            copyright: '© 2026 Viesnīcu rezervācija. Visas tiesības aizsargātas.',
            simpleCopyright: '© 2026 Viesnīcu rezervācija.'
        },
        auth: {
            firstName: 'Vārds',
            firstNamePlaceholder: 'Jūsu vārds',
            email: 'E-pasts',
            emailPlaceholder: 'jusu@epasts.lv',
            password: 'Parole',
            magicLink: 'Sūtīt pieslēgšanas saiti (bez paroles)',
            loginNote: 'Pieslēgšanās ar e-pasta saiti ir izslēgta, lai neuzskrietu Supabase e-pastu limitam. Lietojiet e-pastu un paroli.',
            openAdmin: 'Atvērt admin paneli'
        },
        admin: {
            email: 'Admin e-pasts',
            emailPlaceholder: 'admin@piemers.lv',
            password: 'Parole',
            helper: 'Šeit drīkst ienākt tikai konti, kuru e-pasts ir pievienots `admin_users` tabulai Supabase.',
            signOut: 'Iziet',
            reservations: 'Rezervācijas',
            searches: 'Meklējumi',
            blocked: 'Bloķētie datumi',
            revenue: 'Kopējie ieņēmumi',
            allReservations: 'Visas rezervācijas',
            allSearches: 'Visi meklējumi',
            availability: 'Numuru nepieejamība',
            tableHeaders: [
                ['ID', 'Vārds', 'E-pasts', 'Numurs', 'Ievākšanās', 'Izvākšanās', 'Viesi', 'Summa'],
                ['Valsts', 'Pilsēta', 'Ievākšanās', 'Izvākšanās', 'Viesi', 'Izveidots'],
                ['Numurs', 'No', 'Līdz', 'Piezīme']
            ]
        }
    },
    en: {
        locale: 'en-GB',
        searchLabels: ['Location', 'City', 'Check-in date', 'Check-out date', 'Guests'],
        searchPlaceholders: {
            country: 'Choose a country',
            city: 'Choose a city',
            guests: 'Choose guest count'
        },
        guestOptions: ['1 guest', '2 guests', '3 guests', '4 guests', '5+ guests'],
        categoryLabels: ['All', 'City view', 'Garden', 'Family', 'Luxury rooms', 'Pet friendly', 'Business travel', 'Spa'],
        features: [
            ['Verified hotels', 'Every offer is reviewed so guests can enjoy a safe and pleasant stay.'],
            ['Clear prices', 'You see the room price before booking, without confusing hidden costs.'],
            ['Guest reviews', 'Choose a room based on real ratings and guest experiences.'],
            ['Fast reservation', 'Fill in a short form and receive your reservation confirmation right away.'],
            ['Support anytime', 'If you have questions, our support team is ready to help.'],
            ['Wide destination choice', 'Find the right stay across a variety of European cities and resorts.']
        ],
        aboutText: 'Our goal is to make hotel booking simple, clear, and enjoyable. We help you find the right room, compare options, and complete your reservation with confidence.',
        aboutStats: ['Curated offers', 'Happy guests', 'Average rating', 'Customer support'],
        roomModal: {
            beds: 'Beds:',
            category: 'Category:',
            amenities: 'Amenities',
            perNight: 'per night',
            bookNow: 'Book now'
        },
        booking: {
            title: 'Complete reservation',
            selectedRoom: 'Selected room:',
            fullName: 'Full name',
            fullNamePlaceholder: 'Your full name',
            email: 'Email',
            emailPlaceholder: 'your@email.com',
            phone: 'Phone',
            phonePlaceholder: '+371 XXXXXXXX',
            checkin: 'Check-in date',
            checkout: 'Check-out date',
            guests: 'Guest count',
            terms: 'I agree to the terms and conditions',
            confirm: 'Confirm reservation'
        },
        success: {
            title: 'Reservation confirmed!',
            message: 'Thank you for your reservation!',
            bookingId: 'Reservation ID:',
            backHome: 'Back to home'
        },
        footer: {
            tagline: 'Simple stays, simply booked.',
            quickLinks: 'Quick links',
            browseRooms: 'Browse rooms',
            about: 'About us',
            contact: 'Contact',
            legal: 'Legal',
            privacy: 'Privacy policy',
            terms: 'Terms of service',
            follow: 'Follow us',
            copyright: '© 2026 Hotel Booking. All rights reserved.',
            simpleCopyright: '© 2026 Hotel Booking.'
        },
        auth: {
            firstName: 'First name',
            firstNamePlaceholder: 'Your first name',
            email: 'Email',
            emailPlaceholder: 'your@email.com',
            password: 'Password',
            magicLink: 'Send sign-in link (without password)',
            loginNote: 'Email link sign-in is disabled to avoid hitting the Supabase email limit. Use your email and password instead.',
            openAdmin: 'Open admin panel'
        },
        admin: {
            email: 'Admin email',
            emailPlaceholder: 'admin@example.com',
            password: 'Password',
            helper: 'Only accounts whose email is listed in the `admin_users` table in Supabase are allowed here.',
            signOut: 'Sign out',
            reservations: 'Reservations',
            searches: 'Searches',
            blocked: 'Blocked dates',
            revenue: 'Total revenue',
            allReservations: 'All reservations',
            allSearches: 'All searches',
            availability: 'Room availability blocks',
            tableHeaders: [
                ['ID', 'Name', 'Email', 'Room', 'Check-in', 'Check-out', 'Guests', 'Amount'],
                ['Country', 'City', 'Check-in', 'Check-out', 'Guests', 'Created'],
                ['Room', 'From', 'To', 'Note']
            ]
        }
    }
};

const roomTranslations = {
    1: {
        en: {
            name: 'Standard double room',
            category: 'City view',
            beds: '1 double bed and 1 sofa',
            description: 'A comfortable room for a short break or work trip with a city view.'
        }
    },
    2: {
        en: {
            name: 'Deluxe room with garden',
            category: 'Garden',
            beds: '1 large double bed and terrace',
            description: 'A spacious room with a calm atmosphere, terrace, and garden access.'
        }
    },
    3: {
        en: {
            name: 'Family room',
            category: 'Family',
            beds: '2 single beds and 1 double bed',
            description: 'A comfortable and practical room for families with enough space for everyone.'
        }
    },
    4: {
        en: {
            name: 'Royal luxury room',
            category: 'Luxury rooms',
            beds: 'Large double bed and lounge area',
            description: 'An elegant luxury room with a separate lounge area and premium comfort.'
        }
    },
    5: {
        en: {
            name: 'Pet-friendly room',
            category: 'Pet friendly',
            beds: '1 double bed and space for a pet',
            description: 'A room for guests travelling together with their pet.'
        }
    },
    6: {
        en: {
            name: 'Business travel room',
            category: 'Business travel',
            beds: '1 double bed and work desk',
            description: 'A room with a comfortable workspace, reliable internet, and calm atmosphere.'
        }
    },
    7: {
        en: {
            name: 'Premium spa room',
            category: 'Spa',
            beds: 'Large double bed and spa bathroom',
            description: 'A relaxing spa-inspired room designed for a peaceful stay.'
        }
    }
};

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
    applyTheme(currentTheme);
    applyLanguage(currentLanguage);
    resetBodyScroll();
    allRooms = [...rooms];
    ensureAuthEnhancements();
    ensureMobileNavToggle();
    ensureHeaderControls();
    setupEventListeners();
    populateCountries();
    renderCurrentCategoryRooms();
    registerServiceWorker();
    initializeDateInputs();
    initializeAuth();
    hydratePageSectionFromHash();
    initializeAvailability();
    initializeAdminPage();
    updateHeaderControlLabels();
    translateStaticPage();
}

function renderRooms(roomsToShow) {
    const roomsGrid = document.getElementById('roomsGrid');
    if (!roomsGrid) return;

    roomsGrid.innerHTML = roomsToShow.map(room => {
        const localizedRoom = getLocalizedRoom(room);
        const unavailableLabel = getNextBlockedRangeLabel(room.id);

        return `
            <div class="room-card" onclick="openRoomModal(${room.id})">
                <div class="room-image">
                    <img src="${room.image}" alt="${localizedRoom.name}" loading="lazy">
                    <div class="room-tag">${localizedRoom.category}</div>
                </div>
                <div class="room-content">
                    <h3 class="room-name">${localizedRoom.name}</h3>
                    <div class="room-rating">
                        <span class="stars">${generateStars(room.rating)}</span>
                        <span>${room.rating} (${room.reviews})</span>
                    </div>
                    <p class="room-info">${localizedRoom.beds}</p>
                    ${unavailableLabel ? `<p class="availability-chip">${unavailableLabel}</p>` : ''}
                    <p class="room-price">EUR ${room.price} <span style="font-size: 14px; color: var(--text-muted);">${currentLanguage === 'en' ? 'per night' : 'par nakti'}</span></p>
                </div>
            </div>
        `;
    }).join('');
}

function ensureHeaderControls() {
    const navbarContent = document.querySelector('.navbar-content');
    if (!navbarContent || document.getElementById('headerControls')) return;

    const controls = document.createElement('div');
    controls.className = 'header-controls';
    controls.id = 'headerControls';
    controls.innerHTML = `
        <button type="button" class="header-control-btn" id="languageToggleBtn">
            <span class="header-control-label">${t('languageLabel')}</span>
            <span id="languageToggleValue">${t('language')}</span>
        </button>
        <button type="button" class="header-control-btn" id="themeToggleBtn">
            <span class="header-control-label">${t('themeLabel')}</span>
            <span id="themeToggleValue">${currentTheme === 'dark' ? t('themeDark') : t('themeLight')}</span>
        </button>
    `;

    const navToggle = document.getElementById('navToggle');
    if (navToggle) {
        navbarContent.insertBefore(controls, navToggle);
    } else {
        navbarContent.appendChild(controls);
    }
}

function ensureMobileNavToggle() {
    const navbarContent = document.querySelector('.navbar-content');
    if (!navbarContent || document.getElementById('navToggle')) return;

    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.id = 'navToggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', langText('Atvērt izvēlni', 'Open menu'));
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    navbarContent.appendChild(toggle);
}

function updateHeaderControlLabels() {
    setText('languageToggleValue', t('language'));
    setText('themeToggleValue', currentTheme === 'dark' ? t('themeDark') : t('themeLight'));

    const labels = document.querySelectorAll('.header-control-label');
    if (labels[0]) labels[0].textContent = t('languageLabel');
    if (labels[1]) labels[1].textContent = t('themeLabel');
}

function t(key) {
    return translations[currentLanguage]?.[key] || translations.lv[key] || key;
}

function content() {
    return localeContent[currentLanguage] || localeContent.lv;
}

function langText(lvText, enText) {
    return currentLanguage === 'en' ? enText : lvText;
}

function setSelectorText(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.textContent = value;
    }
}

function setSelectorHtml(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = value;
    }
}

function setInputPlaceholder(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.placeholder = value;
    }
}

function updateGuestSelect(selectId, placeholder, options) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const currentValue = select.value;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    options.forEach((label, index) => {
        const option = document.createElement('option');
        option.value = String(index + 1);
        option.textContent = label;
        select.appendChild(option);
    });

    if ([...select.options].some(option => option.value === currentValue)) {
        select.value = currentValue;
    }
}

function renderCurrentCategoryRooms() {
    const filteredRooms = currentCategory === 'Viss'
        ? allRooms
        : allRooms.filter(room => room.category === currentCategory);

    renderRooms(filteredRooms);

    document.querySelectorAll('.category-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.category === currentCategory);
    });
}

function applyLanguage(language) {
    currentLanguage = language === 'en' ? 'en' : 'lv';
    localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    document.documentElement.lang = currentLanguage;
}

function applyTheme(theme) {
    currentTheme = theme === 'dark' ? 'dark' : 'light';
    localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    document.body.dataset.theme = currentTheme;
}

function toggleLanguage() {
    const isRoomModalOpen = document.getElementById('roomModal')?.classList.contains('active');
    applyLanguage(currentLanguage === 'lv' ? 'en' : 'lv');
    updateHeaderControlLabels();
    populateCountries();
    updateCities();
    translateStaticPage();
    renderCurrentCategoryRooms();
    if (currentRoom && isRoomModalOpen) {
        openRoomModal(currentRoom.id);
    }
}

function toggleTheme() {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    updateHeaderControlLabels();
}

function translateStaticPage() {
    const copy = content();
    const brandText = document.querySelector('.brand-text');
    if (brandText) brandText.textContent = t('brand');

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(#authBtn)');
    if (navLinks[0]) navLinks[0].textContent = t('navRooms');
    if (navLinks[1]) navLinks[1].textContent = t('navFeatures');
    if (navLinks[2]) navLinks[2].textContent = t('navAbout');

    if (!authUser) {
        const authBtn = document.getElementById('authBtn');
        if (authBtn) authBtn.textContent = t('login');
    }

    const profileReservationsBtn = document.getElementById('profileReservationsBtn');
    const profileOverviewBtn = document.getElementById('profileOverviewBtn');
    const profileSignOutBtn = document.getElementById('profileSignOutBtn');
    if (profileReservationsBtn) profileReservationsBtn.textContent = t('reservationsOverview');
    if (profileOverviewBtn) profileOverviewBtn.textContent = t('profileOverview');
    if (profileSignOutBtn) profileSignOutBtn.textContent = t('logout');

    const profileOverviewModalTitle = document.querySelector('#profileOverviewModal h2');
    const reservationsOverviewModalTitle = document.querySelector('#reservationsOverviewModal h2');
    if (profileOverviewModalTitle) profileOverviewModalTitle.textContent = t('profileOverview');
    if (reservationsOverviewModalTitle) reservationsOverviewModalTitle.textContent = t('reservationsOverview');

    const authFirstNameLabel = document.querySelector('#authFirstNameGroup label');
    const authFirstNameInput = document.getElementById('authFirstName');
    if (authFirstNameLabel) authFirstNameLabel.textContent = copy.auth.firstName;
    if (authFirstNameInput) authFirstNameInput.placeholder = copy.auth.firstNamePlaceholder;

    const searchLabels = document.querySelectorAll('.search-field label');
    searchLabels.forEach((label, index) => {
        if (copy.searchLabels[index]) {
            label.textContent = copy.searchLabels[index];
        }
    });

    updateGuestSelect('searchGuests', copy.searchPlaceholders.guests, copy.guestOptions);
    updateGuestSelect('bookingGuests', copy.searchPlaceholders.guests, copy.guestOptions);

    const categories = document.querySelectorAll('.category-btn');
    categories.forEach((button, index) => {
        if (copy.categoryLabels[index]) {
            button.textContent = copy.categoryLabels[index];
        }
    });

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        const cardContent = copy.features[index];
        if (!cardContent) return;

        const [title, description] = cardContent;
        const heading = card.querySelector('h3');
        const paragraph = card.querySelector('p');
        if (heading) heading.textContent = title;
        if (paragraph) paragraph.textContent = description;
    });

    const aboutParagraph = document.querySelector('.about-content > p');
    if (aboutParagraph) {
        aboutParagraph.textContent = copy.aboutText;
    }

    const stats = document.querySelectorAll('.stat p');
    stats.forEach((stat, index) => {
        if (copy.aboutStats[index]) {
            stat.textContent = copy.aboutStats[index];
        }
    });

    const modalInfoLabels = document.querySelectorAll('.modal-info strong');
    if (modalInfoLabels[0]) modalInfoLabels[0].textContent = copy.roomModal.beds;
    if (modalInfoLabels[1]) modalInfoLabels[1].textContent = copy.roomModal.category;
    setSelectorText('#modalAmenities h3', copy.roomModal.amenities);
    setSelectorText('#bookingBtn', copy.roomModal.bookNow);

    const modalPrice = document.getElementById('modalPrice');
    if (modalPrice?.parentElement) {
        modalPrice.parentElement.innerHTML = `€<span id="modalPrice">${modalPrice.textContent}</span> ${copy.roomModal.perNight}`;
    }

    setSelectorText('#bookingModal h2', copy.booking.title);

    const selectedRoomName = document.getElementById('selectedRoomName');
    const selectedRoomPrice = document.getElementById('selectedRoomPrice');
    const selectedRoomInfo = document.querySelector('.room-selection-info p');
    if (selectedRoomInfo) {
        selectedRoomInfo.innerHTML = `${copy.booking.selectedRoom} <strong id="selectedRoomName">${selectedRoomName?.textContent || ''}</strong> — <strong style="color: var(--primary);">€<span id="selectedRoomPrice">${selectedRoomPrice?.textContent || ''}</span>/${copy.roomModal.perNight}</strong>`;
    }

    const bookingLabels = document.querySelectorAll('#bookingForm label');
    if (bookingLabels[0]) bookingLabels[0].textContent = copy.booking.fullName;
    if (bookingLabels[1]) bookingLabels[1].textContent = copy.booking.email;
    if (bookingLabels[2]) bookingLabels[2].textContent = copy.booking.phone;
    if (bookingLabels[3]) bookingLabels[3].textContent = copy.booking.checkin;
    if (bookingLabels[4]) bookingLabels[4].textContent = copy.booking.checkout;
    if (bookingLabels[5]) bookingLabels[5].textContent = copy.booking.guests;
    if (bookingLabels[6]) bookingLabels[6].textContent = copy.booking.terms;
    setInputPlaceholder('guestName', copy.booking.fullNamePlaceholder);
    setInputPlaceholder('guestEmail', copy.booking.emailPlaceholder);
    setInputPlaceholder('guestPhone', copy.booking.phonePlaceholder);
    setSelectorText('#bookingForm button[type="submit"]', copy.booking.confirm);

    setSelectorText('#successModal h2', copy.success.title);
    setText('successMessage', copy.success.message);
    const bookingIdLabel = document.querySelector('.booking-id');
    if (bookingIdLabel) {
        const bookingId = document.getElementById('bookingId')?.textContent || '';
        bookingIdLabel.innerHTML = `${copy.success.bookingId} <span id="bookingId">${bookingId}</span>`;
    }
    setSelectorText('#successModal .btn-primary', copy.success.backHome);

    document.querySelectorAll('label[for="authEmail"]').forEach(label => {
        label.textContent = copy.auth.email;
    });
    document.querySelectorAll('label[for="authPassword"]').forEach(label => {
        label.textContent = copy.auth.password;
    });
    setInputPlaceholder('authEmail', copy.auth.emailPlaceholder);
    setInputPlaceholder('authPassword', copy.auth.password);
    setSelectorText('#magicLinkBtn', copy.auth.magicLink);
    setSelectorText('.auth-helper-note', copy.auth.loginNote);
    setSelectorText('#authAdminLink .btn-secondary', copy.auth.openAdmin);

    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections[0]) {
        const title = footerSections[0].querySelector('h3');
        const tagline = footerSections[0].querySelector('p');
        if (title) title.textContent = t('brand');
        if (tagline) tagline.textContent = copy.footer.tagline;
    }
    if (footerSections[1]) {
        const heading = footerSections[1].querySelector('h4');
        const links = footerSections[1].querySelectorAll('a');
        if (heading) heading.textContent = copy.footer.quickLinks;
        if (links[0]) links[0].textContent = copy.footer.browseRooms;
        if (links[1]) links[1].textContent = copy.footer.about;
        if (links[2]) links[2].textContent = copy.footer.contact;
    }
    if (footerSections[2]) {
        const heading = footerSections[2].querySelector('h4');
        const links = footerSections[2].querySelectorAll('a');
        if (heading) heading.textContent = copy.footer.legal;
        if (links[0]) links[0].textContent = copy.footer.privacy;
        if (links[1]) links[1].textContent = copy.footer.terms;
    }
    if (footerSections[3]) {
        const heading = footerSections[3].querySelector('h4');
        if (heading) heading.textContent = copy.footer.follow;
    }

    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        footerBottom.textContent = copy.footer.copyright;
    }

    const simpleFooter = document.querySelector('.footer > .container > p');
    if (simpleFooter) {
        simpleFooter.textContent = copy.footer.simpleCopyright;
    }

    const page = getCurrentPage();

    if (page === 'home' || page === 'hero') {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const sectionTitles = document.querySelectorAll('.section-title');
        const searchBtn = document.getElementById('searchBtn');

        if (heroTitle) heroTitle.innerHTML = t('heroTitle');
        if (heroSubtitle) heroSubtitle.textContent = t('heroSubtitle');
        if (searchBtn) searchBtn.textContent = t('searchButton');
        if (sectionTitles[0]) sectionTitles[0].textContent = t('sectionRooms');
        if (sectionTitles[1]) sectionTitles[1].textContent = t('sectionFeatures');
        if (sectionTitles[2]) sectionTitles[2].textContent = t('sectionAbout');
    }

    if (page === 'stays') {
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) sectionTitle.textContent = t('sectionRooms');
    }

    if (page === 'features') {
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) sectionTitle.textContent = t('sectionFeatures');
    }

    if (page === 'about') {
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) sectionTitle.textContent = t('sectionAbout');
    }

    if (page === 'auth') {
        const authHeading = document.querySelector('.auth-container h2');
        const signupBtn = document.getElementById('showSignup');
        const loginBtn = document.getElementById('showLogin');
        const submitBtn = document.getElementById('loginSubmit');

        if (authHeading && authMode !== 'signup') authHeading.textContent = t('login');
        if (signupBtn) signupBtn.textContent = langText('Reģistrēties', 'Register');
        if (loginBtn) loginBtn.textContent = langText('Atpakaļ uz pieslēgšanos', 'Back to sign in');
        if (submitBtn && authMode !== 'signup') submitBtn.textContent = t('login');
    }

    if (page === 'booking') {
        const bookingHeading = document.querySelector('main h2');
        if (bookingHeading) {
            bookingHeading.textContent = copy.booking.title;
        }
    }

    if (page === 'admin') {
        const sectionTitle = document.querySelector('.admin-title');
        const adminKicker = document.querySelector('.admin-kicker');
        const adminSubtitle = document.querySelector('.admin-subtitle');
        const adminLoginHeading = document.querySelector('#adminLoginPanel h2');
        const adminOverviewHeading = document.querySelector('.admin-toolbar h2');
        const adminSignedIn = document.querySelector('.admin-toolbar .auth-helper');
        const refreshBtn = document.getElementById('adminRefreshBtn');
        const loginBtn = document.getElementById('adminLoginSubmit');
        const adminLabels = document.querySelectorAll('#adminLoginPanel label');
        const adminHelper = document.querySelector('#adminLoginPanel .auth-helper');
        const stats = document.querySelectorAll('.admin-stat-card span');
        const sectionHeadings = document.querySelectorAll('.admin-section h3');

        if (sectionTitle) sectionTitle.textContent = t('adminTitle');
        if (adminKicker) adminKicker.textContent = t('adminOnly');
        if (adminSubtitle) adminSubtitle.textContent = t('adminSubtitle');
        if (adminLoginHeading) adminLoginHeading.textContent = t('adminLogin');
        if (adminOverviewHeading) adminOverviewHeading.textContent = t('adminOverview');
        if (adminSignedIn && document.getElementById('adminUserLabel')) {
            adminSignedIn.innerHTML = `${t('adminSignedIn')} <strong id="adminUserLabel">${escapeHtml(document.getElementById('adminUserLabel').textContent)}</strong>`;
        }
        if (refreshBtn) refreshBtn.textContent = t('adminRefresh');
        if (loginBtn) loginBtn.textContent = t('adminLoginBtn');
        if (adminLabels[0]) adminLabels[0].textContent = copy.admin.email;
        if (adminLabels[1]) adminLabels[1].textContent = copy.admin.password;
        if (adminHelper) adminHelper.textContent = copy.admin.helper;
        setInputPlaceholder('adminEmail', copy.admin.emailPlaceholder);
        setInputPlaceholder('adminPassword', copy.auth.password);
        setSelectorText('#adminSignOutBtn', copy.admin.signOut);
        if (stats[0]) stats[0].textContent = copy.admin.reservations;
        if (stats[1]) stats[1].textContent = copy.admin.searches;
        if (stats[2]) stats[2].textContent = copy.admin.blocked;
        if (stats[3]) stats[3].textContent = copy.admin.revenue;
        if (sectionHeadings[0]) sectionHeadings[0].textContent = copy.admin.allReservations;
        if (sectionHeadings[1]) sectionHeadings[1].textContent = copy.admin.allSearches;
        if (sectionHeadings[2]) sectionHeadings[2].textContent = copy.admin.availability;

        const tableHeads = document.querySelectorAll('.admin-table thead');
        tableHeads.forEach((thead, index) => {
            const headers = copy.admin.tableHeaders[index];
            if (!headers) return;

            thead.querySelectorAll('th').forEach((th, cellIndex) => {
                if (headers[cellIndex]) {
                    th.textContent = headers[cellIndex];
                }
            });
        });
    }
}

function getLocalizedRoom(room) {
    const localized = roomTranslations[room.id]?.[currentLanguage];
    return localized ? { ...room, ...localized } : room;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
}

function openRoomModal(roomId) {
    currentRoom = allRooms.find(room => room.id === roomId);
    if (!currentRoom) return;
    const localizedRoom = getLocalizedRoom(currentRoom);

    setText('modalTitle', localizedRoom.name);
    setText('modalPrice', currentRoom.price);
    setText('modalStars', generateStars(currentRoom.rating));
    setText('modalRating', `${currentRoom.rating} (${currentRoom.reviews} ${currentLanguage === 'en' ? 'reviews' : 'atsauksmes'})`);
    setText('modalBeds', localizedRoom.beds);
    setText('modalTag', localizedRoom.category);
    setText('modalDescription', localizedRoom.description);
    setText('selectedRoomName', localizedRoom.name);
    setText('selectedRoomPrice', currentRoom.price);

    const modalImage = document.getElementById('modalImage');
    if (modalImage) {
        modalImage.src = currentRoom.image;
        modalImage.alt = localizedRoom.name;
    }

    const amenitiesList = document.getElementById('amenitiesList');
    if (amenitiesList) {
        amenitiesList.innerHTML = localizedRoom.amenities
            .map(amenity => `<div class="amenity-item">✓ ${amenity}</div>`)
            .join('');
    }

    const roomAvailability = document.getElementById('roomAvailability');
    if (roomAvailability) {
        roomAvailability.textContent = getNextBlockedRangeLabel(roomId) || langText('Šis numurs pašlaik ir pieejams.', 'This room is currently available.');
    }

    showModal('roomModal');
}

function closeRoomModal() {
    hideModal('roomModal');
}

function openBookingModal() {
    if (!currentRoom) {
        alert(langText('Lūdzu, izvēlieties numuru.', 'Please choose a room.'));
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
            ? langText('Rezervācija ir saglabāta Supabase datubāzē.', 'The reservation was saved to the Supabase database.')
            : langText('Rezervācija ir saglabāta lokāli. Lai saglabātu to arī online, palaidiet Supabase tabulas no shēmas faila.', 'The reservation was saved locally. To save it online too, run the Supabase tables from the schema file.')
    );
}

function populateCountries() {
    const countrySelect = document.getElementById('searchCountry');
    if (!countrySelect) return;

    const currentValue = countrySelect.value;
    countrySelect.innerHTML = `<option value="">${content().searchPlaceholders.country}</option>`;
    Object.keys(countryCities).forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });

    if ([...countrySelect.options].some(option => option.value === currentValue)) {
        countrySelect.value = currentValue;
    }
}

function updateCities() {
    const countrySelect = document.getElementById('searchCountry');
    const citySelect = document.getElementById('searchCity');
    if (!countrySelect || !citySelect) return;

    const currentValue = citySelect.value;
    citySelect.innerHTML = `<option value="">${content().searchPlaceholders.city}</option>`;

    (countryCities[countrySelect.value] || []).forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    if ([...citySelect.options].some(option => option.value === currentValue)) {
        citySelect.value = currentValue;
    }
}

function handleSearch() {
    const country = document.getElementById('searchCountry')?.value;
    const city = document.getElementById('searchCity')?.value;
    const checkin = document.getElementById('searchCheckin')?.value;
    const checkout = document.getElementById('searchCheckout')?.value;
    const guests = document.getElementById('searchGuests')?.value;

    if (!country || !city || !checkin || !checkout || !guests) {
        alert(langText('Lūdzu, aizpildiet visus meklēšanas laukus.', 'Please fill in all search fields.'));
        return;
    }

    if (!isValidStayRange(checkin, checkout)) {
        alert(langText('Izvākšanās dienai jābūt pēc ievākšanās dienas.', 'Check-out date must be after the check-in date.'));
        return;
    }

    renderRooms(allRooms);
    scrollToSection('stays');

    const search = { country, city, checkin, checkout, guests, date: new Date().toISOString() };
    saveSearchToSupabase(search).catch(error => console.warn('Search was not saved online:', error));
}

function filterByCategory(category) {
    currentCategory = category;
    renderCurrentCategoryRooms();
}

async function submitBooking(event) {
    event.preventDefault();

    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    const name = document.getElementById('guestName')?.value.trim();
    const email = document.getElementById('guestEmail')?.value.trim();
    const phone = document.getElementById('guestPhone')?.value.trim();
    const checkin = document.getElementById('bookingCheckin')?.value;
    const checkout = document.getElementById('bookingCheckout')?.value;
    const guests = document.getElementById('bookingGuests')?.value;

    if (!bookingForm.reportValidity()) {
        return;
    }

    if (!name || !email || !phone || !checkin || !checkout || !guests) {
        alert(langText('Lūdzu, aizpildiet visus rezervācijas laukus.', 'Please fill in all reservation fields.'));
        return;
    }

    if (!validateGuestName(name)) {
        alert(langText('Lūdzu, ievadiet pilnu vārdu un uzvārdu, izmantojot tikai burtus.', 'Please enter your full name using letters only.'));
        return;
    }

    if (!validateEmail(email)) {
        alert(langText('Lūdzu, ievadiet derīgu e-pasta adresi.', 'Please enter a valid email address.'));
        return;
    }

    if (!validatePhone(phone)) {
        alert(langText('Lūdzu, ievadiet derīgu tālruņa numuru.', 'Please enter a valid phone number.'));
        return;
    }

    if (!validateGuestCount(guests)) {
        alert(langText('Lūdzu, izvēlieties derīgu viesu skaitu.', 'Please choose a valid guest count.'));
        return;
    }

    if (!isValidStayRange(checkin, checkout)) {
        alert(langText('Izvākšanās dienai jābūt pēc ievākšanās dienas.', 'Check-out date must be after the check-in date.'));
        return;
    }

    if (!currentRoom) {
        alert(langText('Lūdzu, izvēlieties numuru.', 'Please choose a room.'));
        return;
    }

    const conflictingRange = getConflictingBlockedRange(currentRoom.id, checkin, checkout);
    if (conflictingRange) {
        alert(langText(
            `Šis numurs nav pieejams no ${formatDate(conflictingRange.start_date)} līdz ${formatDate(conflictingRange.end_date)}.`,
            `This room is unavailable from ${formatDate(conflictingRange.start_date)} to ${formatDate(conflictingRange.end_date)}.`
        ));
        updateBookingAvailabilityNotice();
        return;
    }

    const submitButton = event.submitter || document.querySelector('#bookingForm button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = langText('Saglabāju...', 'Saving...');
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
    const primaryInsert = {
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
        primaryInsert.user_id = user.id;
    }

    const { error: primaryError } = await client.from('bookings').insert([primaryInsert]);
    if (!primaryError) {
        return true;
    }

    if (!shouldRetryBookingInsert(primaryError)) {
        throw primaryError;
    }

    const legacyInsert = {
        checkin: booking.checkin,
        checkout: booking.checkout,
        guests: booking.guests,
        room_id: booking.roomId,
        total_price: booking.totalPrice,
        created_at: booking.date
    };

    if (user?.id) {
        legacyInsert.user_id = user.id;
    }

    const { error: legacyError } = await client.from('bookings').insert([legacyInsert]);
    if (legacyError) {
        throw legacyError;
    }

    return true;
}

function shouldRetryBookingInsert(error) {
    const code = String(error?.code || '');
    const message = String(error?.message || '').toLowerCase();

    return code === 'PGRST204'
        || code === '42703'
        || code === '22P02'
        || message.includes('schema cache')
        || message.includes('column bookings.')
        || message.includes('invalid input syntax for type uuid');
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

function validateGuestName(name) {
    return /^[A-Za-zĀ-ž' -]{3,80}$/.test(name) && name.trim().includes(' ');
}

function validatePhone(phone) {
    return /^\+?[0-9 ]{8,20}$/.test(phone);
}

function validateGuestCount(guests) {
    return ['1', '2', '3', '4', '5'].includes(String(guests));
}

function sanitizeGuestNameInput(event) {
    const input = event.target;
    input.value = input.value.replace(/[^A-Za-zĀ-ž' -]/g, '').replace(/\s{2,}/g, ' ');
}

function sanitizeGuestPhoneInput(event) {
    const input = event.target;
    let cleaned = input.value.replace(/[^0-9+ ]/g, '');
    cleaned = cleaned.replace(/(?!^)\+/g, '').replace(/\s{2,}/g, ' ');
    input.value = cleaned;
}

function goHome(event) {
    if (event) event.preventDefault();

    closeAllModals();
    resetBodyScroll();
    currentCategory = 'Viss';

    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        renderCurrentCategoryRooms();
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
    document.getElementById('guestName')?.addEventListener('input', sanitizeGuestNameInput);
    document.getElementById('guestPhone')?.addEventListener('input', sanitizeGuestPhoneInput);
    document.getElementById('authBtn')?.addEventListener('click', handleAuthButtonClick);
    document.getElementById('languageToggleBtn')?.addEventListener('click', toggleLanguage);
    document.getElementById('themeToggleBtn')?.addEventListener('click', toggleTheme);
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
        const navToggle = document.getElementById('navToggle');
        if (!nav) return;

        nav.classList.toggle('open');
        navToggle?.classList.toggle('active', nav.classList.contains('open'));
        navToggle?.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', event => {
            if (event.target !== modal) return;
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

    document.addEventListener('click', event => {
        const nav = document.querySelector('.navbar-nav');
        const navToggle = document.getElementById('navToggle');
        const navbarContent = document.querySelector('.navbar-content');
        if (!nav?.classList.contains('open') || !navbarContent) return;
        if (navbarContent.contains(event.target)) return;
        closeMobileNav();
        navToggle?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            closeMobileNav();
        }
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
    document.getElementById('navToggle')?.classList.remove('active');
    document.getElementById('navToggle')?.setAttribute('aria-expanded', 'false');
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
        syncAuthScreens().catch(error => {
            console.warn('Could not refresh auth screen state:', error);
        });
    });

    try {
        const { data } = await client.auth.getUser();
        authUser = data?.user || null;
        updateAuthButton(authUser);
        prefillBookingUserData();
        await syncAuthScreens();
    } catch (_error) {
        updateAuthButton(null);
    }
}

function wireAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');

    loginForm?.addEventListener('submit', submitAuthForm);
    showSignup?.addEventListener('click', () => setAuthMode('signup'));
    showLogin?.addEventListener('click', () => setAuthMode('login'));

    setAuthMode('login');
}

function handleAuthButtonClick(event) {
    if (authUser) {
        event.preventDefault();
        toggleProfileMenu();
        return;
    }

    if (getCurrentPage() === 'admin') {
        event.preventDefault();
        renderAdminAccess(false);
        document.getElementById('adminEmail')?.focus();
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
        title.textContent = mode === 'signup'
            ? (currentLanguage === 'en' ? 'Register' : 'Reģistrēties')
            : t('login');
    }

    if (submitButton) {
        submitButton.textContent = mode === 'signup'
            ? (currentLanguage === 'en' ? 'Create account' : 'Izveidot kontu')
            : t('login');
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
            ? langText(
                'Izveidojiet kontu ar e-pastu un paroli. Ja Supabase prasa e-pasta apstiprinājumu, tam vajag SMTP vai izslēgtu Confirm Email.',
                'Create your account with email and password. If Supabase asks for email confirmation, you need SMTP or disabled Confirm Email.'
            )
            : langText(
                'Pieslēdzieties, lai redzētu savu e-pastu rezervācijas formā.',
                'Sign in to see your email in the reservation form.'
            );
    }

    setAuthStatus('');
}

async function submitAuthForm(event) {
    event.preventDefault();

    const client = window.supabaseClient;
    if (!client?.auth) {
        setAuthStatus(langText('Supabase nav ielādēts. Pārbaudiet skriptu un konfigurāciju.', 'Supabase is not loaded. Check the script and configuration.'), true);
        return;
    }

    const email = document.getElementById('authEmail')?.value.trim();
    const password = document.getElementById('authPassword')?.value.trim();
    const firstName = document.getElementById('authFirstName')?.value.trim();

    if (!email || !password) {
        setAuthStatus(langText('Ievadiet e-pastu un paroli.', 'Enter your email and password.'), true);
        return;
    }

    if (authMode === 'signup' && !firstName) {
        setAuthStatus(langText('Ievadiet savu vārdu.', 'Enter your first name.'), true);
        return;
    }

    const submitButton = document.getElementById('loginSubmit');
    const originalText = submitButton?.textContent;

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = authMode === 'signup'
            ? langText('Veidoju kontu...', 'Creating account...')
            : langText('Pieslēdzu...', 'Signing in...');
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
            setAuthStatus(langText('Konts izveidots. Ja Supabase prasa apstiprinājumu, pārbaudiet e-pastu.', 'Account created. If Supabase asks for confirmation, check your email.'));
            setAuthMode('login');
        } else {
            const { error } = await client.auth.signInWithPassword({ email, password });
            if (error) throw error;
            setAuthStatus(langText('Pieslēgšanās izdevusies.', 'Sign-in successful.'));
            hideAuthModal();
            redirectAfterAuth();
        }
    } catch (error) {
        console.error('Auth error:', error);
        setAuthStatus(getReadableAuthError(error, authMode), true);
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    }
}

async function signOutUser() {
    const client = window.supabaseClient;
    if (!client?.auth) return;

    const { error } = await client.auth.signOut();
    if (error) {
        alert(error.message || langText('Neizdevās izrakstīties.', 'Could not sign out.'));
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
        authBtn.textContent = t('login');
        closeProfileMenu();
    }
}

async function syncAuthScreens() {
    const page = getCurrentPage();
    if (page === 'auth') {
        const adminEntry = document.getElementById('authAdminLink');
        if (adminEntry) {
            const canOpenAdmin = authUser ? await isAdminUser(authUser) : false;
            adminEntry.style.display = canOpenAdmin ? 'block' : 'none';
        }
    }
}

function getCurrentPage() {
    const explicitPage = document.body?.dataset?.page;
    if (explicitPage) return explicitPage;

    const fileName = window.location.pathname.split('/').pop() || 'index.html';
    const pageMap = {
        '': 'home',
        'index.html': 'home',
        'hero.html': 'hero',
        'categories.html': 'stays',
        'stays.html': 'stays',
        'features.html': 'features',
        'about.html': 'about',
        'booking.html': 'booking',
        'auth.html': 'auth',
        'admin.html': 'admin'
    };

    return pageMap[fileName] || '';
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
        <label for="authFirstName">${content().auth.firstName}</label>
        <input type="text" id="authFirstName" placeholder="${content().auth.firstNamePlaceholder}">
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
        <button type="button" class="profile-menu-item" id="profileReservationsBtn">Rezervāciju pārskats</button>
        <button type="button" class="profile-menu-item" id="profileOverviewBtn">Profila pārskats</button>
        <button type="button" class="profile-menu-item danger" id="profileSignOutBtn">Izrakstīties</button>
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
                        <h2>${t('profileOverview')}</h2>
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
                        <h2>${t('reservationsOverview')}</h2>
                        <div class="profile-reservations-list" id="profileReservationsList">
                            <p>${t('loading')}</p>
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

    const fromEmail = user?.email ? user.email.split('@')[0] : t('profileLabel');
    const cleaned = fromEmail.replace(/[._-]+/g, ' ').trim();
    return cleaned ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1).split(/\s+/)[0] : t('profileLabel');
}

function showProfileOverviewModal() {
    if (!authUser) return;

    setText('profileOverviewName', getUserFirstName(authUser));
    setText('profileOverviewEmail', authUser.email || '-');
    setText(
        'profileOverviewMemberSince',
        authUser.created_at
            ? `${t('memberSince')} ${formatDateTime(authUser.created_at)}`
            : `${t('memberSince')} -`
    );
    showModal('profileOverviewModal');
}

async function showReservationsOverviewModal() {
    if (!authUser) return;

    const list = document.getElementById('profileReservationsList');
    if (list) {
        list.innerHTML = `<p>${t('loadingReservations')}</p>`;
    }

    showModal('reservationsOverviewModal');

    const reservations = await loadUserReservations();
    renderUserReservations(reservations);
}

async function loadUserReservations() {
    const client = window.supabaseClient;
    const local = JSON.parse(localStorage.getItem('bookings') || '[]');
    const localReservations = local.filter(booking => booking.email === authUser?.email);
    let remoteReservations = [];

    if (client && authUser?.id) {
        try {
            const { data, error } = await client
                .from('bookings')
                .select('*')
                .eq('user_id', authUser.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            remoteReservations = data || [];
        } catch (error) {
            console.warn('Could not load reservations from Supabase:', error);
        }
    }

    return dedupeReservations([...remoteReservations, ...localReservations]);
}

function renderUserReservations(reservations) {
    const list = document.getElementById('profileReservationsList');
    if (!list) return;

    if (!reservations.length) {
        list.innerHTML = `<p>${t('overviewReservationsEmpty')}</p>`;
        return;
    }

    list.innerHTML = reservations.map(booking => `
        <article class="reservation-card">
            <div class="reservation-card-head">
                <h3>${escapeHtml(getReservationRoomLabel(booking))}</h3>
                <span class="reservation-total">EUR ${Number(booking.total_price || booking.totalPrice || 0).toFixed(2)}</span>
            </div>
            <p><strong>ID:</strong> ${escapeHtml(booking.id || booking.local_id || '-')}</p>
            <p><strong>${t('bookingDates')}</strong> ${formatDate(booking.checkin)} - ${formatDate(booking.checkout)}</p>
            <p><strong>${t('bookingGuests')}</strong> ${escapeHtml(String(booking.guests || '-'))}</p>
            <p><strong>${t('bookedAt')}</strong> ${formatDateTime(booking.created_at || booking.date || new Date().toISOString())}</p>
        </article>
    `).join('');
}

function getReservationRoomLabel(booking) {
    if (booking.room_name) return booking.room_name;
    if (booking.room) return booking.room;

    const matchedRoom = rooms.find(room => Number(room.id) === Number(booking.room_id || booking.roomId));
    return matchedRoom ? getLocalizedRoom(matchedRoom).name : t('roomLabel');
}

function dedupeReservations(reservations) {
    const seen = new Set();

    return reservations
        .filter(Boolean)
        .sort((a, b) => new Date(b.created_at || b.date || 0) - new Date(a.created_at || a.date || 0))
        .filter(reservation => {
            const key = [
                reservation.room_id || reservation.roomId || reservation.room_name || reservation.room || '',
                reservation.checkin || '',
                reservation.checkout || '',
                reservation.guests || '',
                reservation.total_price || reservation.totalPrice || '',
                reservation.created_at || reservation.date || ''
            ].join('|');

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);
            return true;
        });
}

function getReadableAuthError(error, mode) {
    const message = String(error?.message || '').toLowerCase();

    if (message.includes('email rate limit exceeded') || message.includes('over_email_send_rate_limit')) {
        return mode === 'signup'
            ? langText(
                'Supabase e-pastu limits ir sasniegts. Pieslēgšanās ar paroli turpinās strādāt, bet jaunām reģistrācijām vajag SMTP vai izslēgtu Confirm Email Supabase panelī.',
                'The Supabase email limit has been reached. Password sign-in still works, but new signups need SMTP or Confirm Email disabled in Supabase.'
            )
            : langText(
                'Supabase e-pastu limits ir sasniegts. Lūdzu izmantojiet pieslēgšanos ar paroli un nelietojiet e-pasta saites.',
                'The Supabase email limit has been reached. Please use password sign-in and avoid email links.'
            );
    }

    if (message.includes('email not confirmed')) {
        return langText(
            'Šis konts vēl nav apstiprināts ar e-pastu. Lai reģistrācija darbotos bez e-pastiem, Supabase panelī vajadzēs izslēgt Confirm Email vai pieslēgt SMTP.',
            'This account has not been confirmed by email yet. To make signup work without emails, disable Confirm Email in Supabase or connect SMTP.'
        );
    }

    return error?.message || langText('Autentifikācijas kļūda.', 'Authentication error.');
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
        setAdminStatus(langText('Jūs esat izrakstīts.', 'You have been signed out.'));
    });

    if (!client?.auth) {
        setAdminStatus(langText('Supabase nav ielādēts. Admin pieslēgšanās nav pieejama.', 'Supabase is not loaded. Admin sign-in is unavailable.'), true);
        renderAdminAccess(false);
        return;
    }

    const { data } = await client.auth.getUser();
    authUser = data?.user || null;
    updateAuthButton(authUser);

    if (!authUser) {
        renderAdminAccess(false);
        setAdminStatus(langText('Ievadiet admin e-pastu un paroli.', 'Enter the admin email and password.'));
        return;
    }

    const isAdmin = await isAdminUser(authUser);
    if (!isAdmin) {
        await signOutUser();
        renderAdminAccess(false);
        setAdminStatus(langText('Šis konts nav admin konts.', 'This account is not an admin account.'), true);
        return;
    }

    renderAdminAccess(true, authUser);
    await loadAdminDashboard();
}

async function submitAdminLogin(event) {
    event.preventDefault();

    const client = window.supabaseClient;
    if (!client?.auth) {
        setAdminStatus(langText('Supabase nav ielādēts.', 'Supabase is not loaded.'), true);
        return;
    }

    const email = document.getElementById('adminEmail')?.value.trim();
    const password = document.getElementById('adminPassword')?.value.trim();
    const submitButton = document.getElementById('adminLoginSubmit');
    const originalText = submitButton?.textContent;

    if (!email || !password) {
        setAdminStatus(langText('Ievadiet admin e-pastu un paroli.', 'Enter the admin email and password.'), true);
        return;
    }

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = langText('Pārbaudu...', 'Checking...');
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
            setAdminStatus(langText('Pieslēgšanās izdevusies, bet šis lietotājs nav admins.', 'Sign-in succeeded, but this user is not an admin.'), true);
            return;
        }

        renderAdminAccess(true, authUser);
        setAdminStatus('');
        await loadAdminDashboard();
    } catch (error) {
        console.error('Admin login error:', error);
        setAdminStatus(getReadableAuthError(error, 'login'), true);
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

    setAdminStatus(langText('Ielādēju rezervācijas...', 'Loading reservations...'));

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
        setAdminStatus(langText(
            `Ielādīti dati: ${bookings?.length || 0} rezervācijas.`,
            `Loaded data: ${bookings?.length || 0} reservations.`
        ));
    } catch (error) {
        console.error('Admin dashboard error:', error);
        setAdminStatus(error.message || langText('Neizdevās ielādēt admin datus.', 'Could not load admin data.'), true);
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
        tableBody.innerHTML = `<tr><td colspan="${columnCount}">${langText('Nav datu.', 'No data.')}</td></tr>`;
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
    const localizedNote = entry.note === 'Pilns numurs'
        ? langText('Pilns numurs', 'Fully booked')
        : entry.note;

    return `
        <tr>
            <td>${escapeHtml(String(entry.room_id))}</td>
            <td>${formatDate(entry.start_date)}</td>
            <td>${formatDate(entry.end_date)}</td>
            <td>${escapeHtml(localizedNote || '')}</td>
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
    return new Date(value).toLocaleString(content().locale, {
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
        notice.textContent = langText('Izvēlieties derīgu datumu diapazonu.', 'Choose a valid date range.');
        notice.className = 'availability-note error';
        if (submitButton) submitButton.disabled = true;
        return;
    }

    const conflict = getConflictingBlockedRange(currentRoom.id, checkin, checkout);
    if (conflict) {
        notice.textContent = langText(
            `Šis numurs nav pieejams no ${formatDate(conflict.start_date)} līdz ${formatDate(conflict.end_date)}.`,
            `This room is unavailable from ${formatDate(conflict.start_date)} to ${formatDate(conflict.end_date)}.`
        );
        notice.className = 'availability-note error';
        if (submitButton) submitButton.disabled = true;
        return;
    }

    notice.textContent = langText('Izvēlētie datumi ir pieejami rezervācijai.', 'The selected dates are available for booking.');
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

    return currentLanguage === 'en'
        ? `Unavailable ${formatDate(upcoming.start_date)} - ${formatDate(upcoming.end_date)}`
        : `Nav pieejams ${formatDate(upcoming.start_date)} - ${formatDate(upcoming.end_date)}`;
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
    return new Date(value).toLocaleDateString(content().locale, {
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
