# Viesnīcas Rezervācijas Sistēma

Tīmekļa lietotne viesnīcas rezervāciju pārvaldībai, izstrādāta izmantojot Laravel (backend), Vue.js (frontend), Vuetify (lietotāja saskarne) un MySQL (datubāze).

---

## Projekta struktūra

VIESNICAS_REZERVACIJA  
│  
├── backend      (Laravel API)  
├── frontend     (Vue + Vuetify lietotāja saskarne)  
└── README.md  

---

## Prasības

- PHP 8.2 vai jaunāka versija  
- Composer  
- Node.js 18 vai jaunāka versija  
- MySQL  
- XAMPP vai cits lokālais serveris  

---

# Backend (Laravel)

## 1. Pāriet uz backend mapi
cd backend

## 2. Instalēt atkarības
composer install

## 3. Izveidot .env failu

Windows:
copy .env.example .env
macOS / Linux:
cp .env.example .env
## 4. Konfigurēt datubāzi .env failā

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=viesnicas_rezervacija
DB_USERNAME=root
DB_PASSWORD=

## 5. Ģenerēt aplikācijas atslēgu

php artisan key:generate

## 6. Izveidot datubāzes tabulas

php artisan migrate

## 7. Palaist backend serveri

php artisan serve

Backend būs pieejams adresē:
http://127.0.0.1:8000

---

# Frontend (Vue + Vuetify)

## 1. Pāriet uz frontend mapi

cd frontend

## 2. Instalēt atkarības

npm install

## 3. Palaist frontend serveri

npm run dev

Frontend būs pieejams adresē:
http://localhost:5173

---

# Datubāzes struktūra

Galvenās tabulas:

- users
- room_types
- rooms
- reservations
- payments
- sessions

Relācijas:

- Viens lietotājs var izveidot vairākas rezervācijas  
- Viens istabas tips var saturēt vairākas istabas  
- Vienai rezervācijai var būt vairāki maksājumi  

---

# Sistēmas funkcionalitāte

- Lietotāju reģistrācija un pieslēgšanās  
- Istabu apskate  
- Rezervācijas izveide  
- Maksājumu reģistrēšana  
- Administratora pārvaldības funkcijas  

---

# Izmantotās tehnoloģijas

Frontend: Vue.js  
UI komponenšu bibliotēka: Vuetify  
Backend: Laravel 12  
Datubāze: MySQL  
API arhitektūra: REST  

---

# Autors

Roberts Neimanis  
Mācību projekts – Viesnīcas rezervācijas sistēma
