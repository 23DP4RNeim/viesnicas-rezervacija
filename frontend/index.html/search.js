// ================== KARTĪŠU MEKLĒŠANA ==================

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cardsContainer = document.getElementById("offers");
  let searchTimeout;

  if (searchInput && cardsContainer) {
      // Funkcija, kas filtrē kartītes pēc ievades lauka vērtības
      const filterCards = () => {
          const searchValue = searchInput.value.trim().toLowerCase();
          // Iegūst VISAS pašlaik esošās kartītes no DOM
          const cards = cardsContainer.querySelectorAll(".card"); 
          let hasVisible = false;

          cards.forEach(card => {
              // Iegūst tekstu no kartītes virsraksta un apraksta
              const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
              const description = card.querySelector('p')?.textContent.toLowerCase() || '';
              
              const matches = title.includes(searchValue) || description.includes(searchValue);
              
              // Pārslēdz kartītes redzamību
              card.style.display = matches ? "block" : "none";
              if (matches) hasVisible = true;
          });

          // Pārvalda ziņojumu "Nav atrastu rezultātu"
          let noResultMsg = document.getElementById("noResultsMessage");

          if (!hasVisible) {
              if (!noResultMsg) {
                  noResultMsg = document.createElement("p");
                  noResultMsg.id = "noResultsMessage";
                  noResultMsg.textContent = "❌ Nav atrastu rezultātu.";
                  cardsContainer.appendChild(noResultMsg);
              }
          } else if (noResultMsg) {
              noResultMsg.remove();
          }
      };


      searchInput.addEventListener("keyup", () => {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(filterCards, 200); // 200ms aizkave
      });
  }
});