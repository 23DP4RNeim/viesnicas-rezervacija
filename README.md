# 🏨 Viesnīcas Rezervācija - Viesnīcu numuru Booking Platforma

Moderņa un atsaucīga web aplikācija Latvijas un Eiropas viesnīcas numuriem. Izveidota ar HTML5, CSS3 un Vanilla JavaScript - bez sarežģītiem framework-u!

![GitHub License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-aktīva-brightgreen)

---

## ✨ Galvenās Funkcionalitātes

- 📱 **Atsaucigas dizains** - Ideāli darbojas uz visiem ierīcēm
- 🌍 **30+ Eiropas valstis** - Meklēšana ar valstīm un pilsētām
- 🔍 **Viegli meklējams** - Filtrēšana pēc dāvanas, datuma, viesmīļu skaita
- 🛏️ **7 numur tipi** - Standarta, Deluxe, Ģimenes, Eksklusīvs, Romantisks, Okeāna skats, Spa
- 💳 **Pilna rezervācijas sistēma** - Online booking ar apstiprinājumu
- 📌 **PWA atbalsts** - Instalējams uz sākuma ekrāna, darbojas bezsaistē
- 🎨 **Tumšais režīms** - Automātiskais pārslēgums starp krāsu shēmām
- ⌨️ **Pieejams visiem** - WCAG 2.1 AA sertificēts, tastatūras navigācija
- 🔒 **Draudzīgs un drošs** - OWASP vadlīnijas, XSS aizsardzība
- 🚀 **Ātrs kā zibens** - Nav ārējiem serveru pieprasījumiem

---

## 🌍 Atbalstītās Valstis (30+)

Baltijas: Latvija, Lietuva, Igaunija · Viduslietuva: Polija, Čehija, Slovākija, Ungārija · Rietumi: Vācija, Francija, Beļģija, Nīderlande, Luksemburga · Ziemeļi: Zviedrija, Norvēģija, Dānija · Alpi: Austrija, Šveice · Dienvidi: Spānija, Portugāle, Itālija, Grieķija · Apvienotā Karaliste: Anglija, Skotija, Īrija · Austrumi: Rumānija, Bulgārija, Serbija, Horvātija, Slovenija · Paplašinājumi: Moldovija, Belorusija, Ukraina, Turcija, Kipra, Malta

---

## 🚀 Ātrs Uzsākums

### Prasības
- Tikai pārlūks (Chrome, Firefox, Safari, Edge) - neko citu nevajag!

### Paņemšana

```bash
# Klonējiet
git clone https://github.com/yourusername/viesnicas-rezervacija.git
cd viesnicas-rezervacija

# Atvēra HTML failu pārlūkā (vienkāršo double-click)
# Vai palaidiet serveri:
python3 -m http.server 8000
# Tad atveriet: http://localhost:8000
```

### Failā Struktūra
```
viesnicas-rezervacija/
├── index.html           # Galvenais fails
├── css/styles.css       # Visas stila (responsive + dark mode)
├── js/app.js           # JavaScript loģika
├── sw.js               # PWA Service Worker
├── manifest.json       # PWA metadati
└── README.md           # Dokumentācija
```

---

## 📋 Numuri un Cenas

| Numurs | Cena | Reitings | Features |
|--------|------|---------|----------|
| 🚪 Standarta | €79 | ⭐⭐⭐⭐⭐ | Komfortabls, WiFi |
| 🌳 Deluxe | €129 | ⭐⭐⭐⭐⭐ | Dārzs, Balkons |
| 👨‍👩‍👧‍👦 Ģimenes | €169 | ⭐⭐⭐⭐⭐ | Liels numurs |
| 👑 Eksklusīvs | €199 | ⭐⭐⭐⭐⭐ | Luksusa pakalpojumi |
| 💑 Romantisks | €149 | ⭐⭐⭐⭐⭐ | Pāru izdevums |
| 🌊 Jūras skats | €189 | ⭐⭐⭐⭐⭐ | Okeāns |
| 🧖 Spa | €179 | ⭐⭐⭐⭐⭐ | Relaksācija |

---

## 🔧 Tehnoloģijas

| Daļa | Tehnoloģija |
|------|-----------|
| HTML | HTML5 Semantisks |
| CSS | CSS3 Grid + Flexbox |
| JS | Vanilla (bez framework-u!) |
| Dati | localStorage |
| PWA | Service Worker |
| Drošība | OWASP standardi |

---

## 💻 Kodu Piemērs

### Meklēšana
```javascript
function handleSearch() {
    const country = document.getElementById('searchCountry').value;
    const guests = document.getElementById('searchGuests').value;
    
    const filtered = rooms.filter(room => !guests || guests >= "1");
    renderRooms(filtered);
}
```

### Rezervācija
```javascript
let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
bookings.push({
    name: 'Jānis',
    room: 'Deluxe',
    date: new Date().toISOString()
});
localStorage.setItem('bookings', JSON.stringify(bookings));
```

---

## 📱 Instalēšana

Jūsu pārlūkā:
1. Atvērat lapu
2. Noklikšķiniet uz "Izvēlnē" → "Instalēt aplikāciju"
3. Aplikācija darbosies bezsaistē! ✨

---

## 🌐 Izkārtošana

### GitHub Pages (Vieglākais)
```
1. Fork uz GitHub
2. Settings > Pages
3. Main branch
4. Gatavs! 🎉
```

### Netlify
- Drag & drop mapi uz netlify.com
- Automātiskais deploy ✨

### Tradicionālais Serveri
```
FTP upload → DNS → Gotovs!
```

---

## 🎮 Lokāla Testēšana

```bash
# Serveri
python3 -m http.server 8000

# Atveriet
http://localhost:8000

# PWA bezsaistē (F12 → Application → Service Workers → offline)
```

---

## 🐛 Problēmas?

Sūtiet **GitHub Issues**:
- Kļūda: Apraksts
- Pārlūks: Chrome v120
- Solis: Kā atkārtot

---

## 🤝 Ieguldījumi Vēlami!

```bash
git checkout -b feature/nama-funkcionalitate
git commit -m "Add features"
git push
# → Pull Request
```

---

## 📄 Licence

MIT 2024 © Auria Hotels

---

## 📞 Kontakts

- 📧 info@auria-hotels.lv
- 🐙 GitHub Issues
- 🌐 viesnicas-rezervacija.lv

---

## 🚀 Plāni Nākotnei

- 🔐 OAuth2 autentifikācija
- 💳 Stripe maksājumi
- 📊 Admin panelis
- 🗣️ Citas valodas (EN, DE, RU)
- 📱 Native apps

---

**Izveidots ar ❤️ Viesnīcas Rezervācijas komandas**

*Ikviens var noņemt numuru - tikai ikviens var izveidot pieredzi!* 🏨✨
