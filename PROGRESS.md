# Programmrisinājuma plānošana un progress

## 1. Plānotais risinājums atbilstoši Uzdevuma nostādnei

### a. Funkcionālās prasības (kas sistēmai jādara)

1. **Lietotāju reģistrācija** — jauni lietotāji var izveidot kontu ar vārdu, e-pastu un paroli.
2. **Lietotāju pieslēgšanās (autentifikācija)** — reģistrēti lietotāji var pieslēgties sistēmai ar e-pastu un paroli.
3. **Istabu apskate (Read)** — lietotāji var apskatīt pieejamo viesnīcas numuriņu sarakstu ar attēliem, aprakstiem un cenām.
4. **Istabu meklēšana un filtrēšana** — lietotāji var meklēt numuriņus pēc nosaukuma vai apraksta, kā arī filtrēt pēc tipa.
5. **Rezervācijas izveide (Create)** — lietotāji var rezervēt numuriņu, norādot ierašanās un izrakstīšanās datumu.
6. **Rezervāciju apskate (Read)** — lietotāji var apskatīt savas esošās un iepriekšējās rezervācijas.
7. **Rezervācijas rediģēšana (Update)** — lietotāji var mainīt rezervācijas datumus vai numuriņu.
8. **Rezervācijas dzēšana/atcelšana (Delete)** — lietotāji var atcelt savu rezervāciju.
9. **Istabu pārvaldība (CRUD)** — administrators var pievienot, rediģēt un dzēst viesnīcas numuriņus.
10. **Maksājumu reģistrēšana** — sistēma reģistrē maksājumu informāciju par katru rezervāciju.
11. **Kontaktforma** — lietotāji var nosūtīt ziņojumu viesnīcai, izmantojot kontaktformu ar validāciju.
12. **Administratora pārvaldība** — administrators var pārvaldīt lietotājus, numuriņus, rezervācijas un maksājumus.

### b. Nefunkcionālās prasības (kā sistēma strādā)

1. **Paroles drošība** — lietotāju paroles tiek šifrētas (hash), izmantojot Laravel iebūvēto `bcrypt` algoritmu.
2. **Piekļuves tiesības (autorizācija)** — sistēma nodrošina lomu pārvaldību (lietotājs / administrators), lai ierobežotu piekļuvi administratīvajām funkcijām.
3. **Responsivitāte (mobilais/desktop)** — lietotāja saskarne ir pilnībā responsīva — darbojas gan datora, gan mobilā pārlūka skatā. Navigācijā ir hamburger izvēlne mobilajām ierīcēm.
4. **Dizaina konsekvence** — izmantota Vuetify (Material Design) komponenšu bibliotēka vienotam un profesionālam izskatam. Vecajā frontend daļā — pielāgots CSS dizains ar kartīšu, navigācijas un kontaktu stilu.
5. **Tumšā/gaišā tēma** — lietotāji var pārslēgt starp tumšo un gaišo tēmu.
6. **Pārlūka saderība** — sistēma darbojas visos mūsdienu pārlūkos (Chrome, Firefox, Edge, Safari).
7. **Formu validācija** — kontaktforma un rezervācijas forma veic klienta puses validāciju (obligātie lauki, e-pasta formāta pārbaude).
8. **REST API arhitektūra** — backend nodrošina RESTful API ar JSON atbildēm, kas ir neatkarīga no frontend.
9. **Datu bāzes integritāte** — izmantoti ierobežojumi (UNIQUE, NOT NULL, FOREIGN KEY) datu korektuma nodrošināšanai.

---

## 2. Atskaites daļa: kas jau ir izdarīts

### a. Front-end progress

#### Kas jau izveidots:

**Vecais (Vanilla HTML/CSS/JS) frontend** (`/frontend/index.html/`):
- **Galvenā lapa (index.html)** — pilnībā izveidota galvenā lapa ar navigāciju, hero sekciju, istabu kartītēm, kontaktformu un kājeni. Lapa satur visu nepieciešamo struktūru.
- **Navigācijas josla (nav.css, index.html)** — logo "ManasViesnīcas", navigācijas saites (Sākums, Pakalpojumi ar dropdown, Par mums, Sazinies), meklēšanas lauks, tēmas pārslēgs un hamburger izvēlne mobilajām ierīcēm.
- **Istabu kartītes (cards.css, cars-crud.js)** — dinamiski ģenerētas kartītes ar attēlu, virsrakstu, aprakstu un pogām "Rezervēt", "Labot", "Dzēst". Pilns CRUD ar localStorage.
- **Rezervācijas modālais logs (popup.js)** — modālais logs ar formu (vārds/uzvārds, ierašanās datums, izrakstīšanās datums) un apstiprināšanas pogu.
- **Kartītes redaktora modālais logs (cars-crud.js)** — modālais logs jaunu numuriņu izveidošanai un esošo rediģēšanai (virsraksts, apraksts, attēla URL).
- **Kontaktforma (contact.js, contact.css)** — forma ar vārda, e-pasta un ziņojuma laukiem. Validācija klienta pusē (obligātie lauki, e-pasta regex pārbaude). Veiksmīga iesniegšana tiek vizuāli apstiprināta.
- **Meklēšana un filtrēšana (search.js)** — reāllaika meklēšana pēc numuriņa nosaukuma vai apraksta ar 200ms aizkavi (debounce). Parāda ziņojumu "Nav atrastu rezultātu", ja nekas neatbilst.
- **Tumšā/gaišā tēma (theme.js, theme.css)** — tēmas pārslēgšanas poga ar pilnu CSS atbalstu tumšajam režīmam.
- **Responsīvs dizains** — CSS media queries navigācijai, kartītēm un kontaktformai. Hamburger izvēlne mobilajās ierīcēs.
- **Kājene (footer.css)** — autortiesību teksts un sociālo tīklu saites (Facebook, Instagram, Twitter).

**Jaunais (Vue.js + Vuetify) frontend** (`/frontend/vue-project/`):
- **App.vue** — pamata Vue 3 komponents ar Vuetify kartīti, kas parāda "Viesnīcas rezervēšanas sistēma" un pogu "Rezervēt numuru".
- **Vue Router** — inicializēts, bet maršruti vēl nav definēti (tukšs maršrutu masīvs).
- **Vuetify spraudnis** — konfigurēts ar gaišo tēmu un Material Design ikonām.
- **Vite** — konfigurēts kā būvēšanas rīks ar Vue spraudņiem.

#### Lapu saraksts un apraksts:

| Lapa / Komponents | Apraksts |
|---|---|
| Galvenā lapa (index.html) | Sākumlapa ar hero sekciju, viesnīcas attēlu un aicinājumu rezervēt numuriņu. Satur navigāciju, sānjoslu ar saistītajiem pakalpojumiem. |
| Istabu kartīšu sekcija | Dinamiski renderētas kartītes ar viesnīcas numuriņiem — katrai kartītei ir attēls, nosaukums, apraksts un darbību pogas (Rezervēt, Labot, Dzēst). |
| Rezervācijas modālais logs | Uznirstošais logs ar formu, kurā lietotājs ievada vārdu, ierašanās un izrakstīšanās datumu, lai rezervētu numuriņu. |
| Kartītes redaktors | Uznirstošais logs administratīvām darbībām — jauna numuriņa izveidošana vai esoša rediģēšana (virsraksts, apraksts, attēla URL). |
| Kontaktforma sekcija | Sadaļa ar formu saziņai — vārds, e-pasts, ziņojums. Validācija ar kļūdu paziņojumiem un veiksmīgas iesniegšanas apstiprinājumu. |
| Meklēšanas sekcija | Filtrs virs kartītēm, kas ļauj reāllaikā meklēt numuriņus pēc nosaukuma vai apraksta. |

### b. Back-end progress

#### Kas jau izveidots:

- **Laravel 12 projekts** — inicializēts ar `composer create-project`, iekļauti visi nepieciešamie Laravel pamata faili (artisan, konfigurācija, maršruti, testi).
- **Lietotāja modelis (User.php)** — Laravel noklusējuma `User` Eloquent modelis ar `HasFactory` un `Notifiable` iezīmēm (traits).
- **Kontrolieri (Controllers/Api/)** — izveidoti divi kontrolieru faili:
  - `ReservationController.php` — rezervāciju kontrolieris (tukšs, bez metodēm).
  - `RezervationController.php` — dublikāts ar drukas kļūdu (tukšs).
- **Maršruti (routes/web.php)** — definēts viens maršruts: `GET /` atgriež Laravel sveiciena lapu (`welcome` skatu).
- **Konfigurācija** — `.env.example` fails ar datubāzes savienojuma iestatījumiem (MySQL), aplikācijas atslēga, sesiju un kešatmiņas konfigurācija.
- **Testēšanas ietvars** — PHPUnit konfigurēts (`phpunit.xml`) ar Feature un Unit testu mapēm.

#### CRUD elementi:

| Darbība | Frontend (localStorage) | Backend (API) |
|---|---|---|
| **Create** | ✅ Darbojas — jauna numuriņa izveidošana ar modālo logu | ❌ Nav implementēts |
| **Read** | ✅ Darbojas — numuriņu ielāde un attēlošana no localStorage | ❌ Nav implementēts |
| **Update** | ✅ Darbojas — esoša numuriņa rediģēšana ar redaktora formu | ❌ Nav implementēts |
| **Delete** | ✅ Darbojas — numuriņa dzēšana ar apstiprināšanas dialogu | ❌ Nav implementēts |

**Kas vēl nav izdarīts backend daļā:**
- API maršruti (RESTful endpoints) nav definēti.
- Kontrolieru metodes nav implementētas (index, store, show, update, destroy).
- Autentifikācija un autorizācija nav ieviesta.
- Datu validācija servera pusē nav ieviesta.
- Kļūdu apstrāde un atbilžu formatēšana nav konfigurēta.
- Frontend–backend integrācija (API izsaukumi) nav ieviesta.

### c. Datu bāze

#### Esošās migrācijas:

Pašlaik datu bāzē ir tikai Laravel noklusējuma tabulas:

1. **users** — lietotāju tabula (id, name, email, email_verified_at, password, remember_token, timestamps).
2. **password_reset_tokens** — paroles atjaunošanas žetoni (email, token, created_at).
3. **sessions** — sesiju tabula (id, user_id, ip_address, user_agent, payload, last_activity).
4. **cache / cache_locks** — kešatmiņas tabulas (key, value, expiration).
5. **jobs / job_batches / failed_jobs** — darbu rindas tabulas.

#### Uzlabojumi un precizējumi:

Pašreizējā stadijā nav veikti specifiski uzlabojumi datu bāzes struktūrā, jo pielāgotās tabulas (room_types, rooms, reservations, payments) vēl nav izveidotas. README failā ir aprakstīta plānotā struktūra ar 6 tabulām un relācijām, bet migrācijas vēl nav ģenerētas.

#### Normalizācijas pārbaude (3NF):

Plānotā datu bāzes struktūra (no README) ir analizēta:
- **1NF** — katrs lauks satur tikai vienu vērtību (atomāri dati). ✅ Atbilst.
- **2NF** — visi ne-atslēgas atribūti ir pilnīgi atkarīgi no primārās atslēgas (nav daļēju atkarību). ✅ Atbilst, jo katra tabula izmanto vienu `id` primāro atslēgu.
- **3NF** — nav tranzitīvu atkarību. Plānotā struktūra (`room_types` atsevišķi no `rooms`, `payments` atsevišķi no `reservations`) ievēro 3NF principus.

**Iespējamā problēma:** ja istabas tips tiktu glabāts tieši `rooms` tabulā kā teksts (nevis kā ārējā atslēga uz `room_types`), tas pārkāptu 3NF. Plānotais risinājums ar atsevišķu `room_types` tabulu un `room_type_id` ārējo atslēgu novērš šo problēmu.

#### Plānotie ierobežojumi:

- **UNIQUE** — `users.email` (jau ieviests migrācijā), `rooms.room_number` (plānots).
- **NOT NULL** — visi obligātie lauki: `users.name`, `users.email`, `users.password`, `rooms.room_type_id`, `reservations.user_id`, `reservations.room_id`, `reservations.check_in`, `reservations.check_out`.
- **FOREIGN KEY** — `rooms.room_type_id → room_types.id`, `reservations.user_id → users.id`, `reservations.room_id → rooms.id`, `payments.reservation_id → reservations.id`.
- **CHECK** — `reservations.check_out > reservations.check_in` (izrakstīšanās datums nevar būt pirms ierašanās), `payments.amount > 0` (maksājuma summa nevar būt negatīva).
- **ON DELETE/UPDATE** — `ON DELETE CASCADE` rezervācijām (dzēšot lietotāju, tiek dzēstas viņa rezervācijas), `ON DELETE RESTRICT` istabām (nevar dzēst istabu tipu, ja tam ir piesaistītas istabas).

#### Kas pabeigts un kas vēl trūkst:

| Elements | Statuss |
|---|---|
| Users tabula | ✅ Izveidota (Laravel noklusējums) |
| Sessions tabula | ✅ Izveidota |
| Cache tabulas | ✅ Izveidotas |
| room_types tabula | ❌ Trūkst — nav migrācijas |
| rooms tabula | ❌ Trūkst — nav migrācijas |
| reservations tabula | ❌ Trūkst — nav migrācijas |
| payments tabula | ❌ Trūkst — nav migrācijas |
| Ārējās atslēgas (FK) | ❌ Trūkst — nav definētas |
| Indeksēšana | ❌ Trūkst — papildu indeksi nav pievienoti |
| Sēklas (seeders) | ❌ Trūkst — testa dati nav izveidoti |
| Eloquent relācijas | ❌ Trūkst — modeļu relācijas nav definētas |

---

## 3. Darbu plāns līdz 23. martam

### Posms 1: Līdz 14. martam
**Sasniedzamais rezultāts:** Izveidotas visas datu bāzes migrācijas (room_types, rooms, reservations, payments) ar pareiziem datu tipiem, ārējām atslēgām un ierobežojumiem. Izveidoti Eloquent modeļi ar relācijām (hasMany, belongsTo). Izveidoti sēklas (seeders) ar testa datiem.

### Posms 2: Līdz 17. martam
**Sasniedzamais rezultāts:** Darbojas backend API maršruti — pilns CRUD istabu tipiem un istabām (GET, POST, PUT, DELETE). Ieviesta servera puses validācija un kļūdu apstrāde. Darbojas lietotāju reģistrācija un pieslēgšanās ar Laravel Sanctum autentifikāciju un lietotāju lomām (admin/user).

### Posms 3: Līdz 20. martam
**Sasniedzamais rezultāts:** Darbojas rezervāciju CRUD ar datumu pārbaudi un istabu pieejamības validāciju. Darbojas maksājumu reģistrēšana. Vue.js frontend ir savienots ar backend API (axios izsaukumi) — istabu saraksts, rezervācijas forma un lietotāja autentifikācija strādā caur API.

### Posms 4: Līdz 23. martam
**Sasniedzamais rezultāts:** Pilnībā integrēts front-end ar back-end. Vue Router maršruti definēti visām lapām (sākums, pieslēgšanās, reģistrācija, istabas, rezervācijas, admin panelis). Pabeigti pamata testi (Feature testi API maršrutiem). Responsīvs dizains pārbaudīts. Sagatavota demonstrācija ar pilnu lietotāja ceļu: reģistrācija → pieslēgšanās → istabu apskate → rezervācijas izveide → maksājuma reģistrēšana.
