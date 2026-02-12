// ================== POPUP (Rezervācija un Redaktors) ==================

const popup = document.getElementById("popup");
const cardEditorPopup = document.getElementById("cardEditorPopup"); 
const popupTitle = document.getElementById("popup-room-title");

// Slēdz pogas: izmanto data-target, lai aizvērtu pareizo logu
document.querySelectorAll(".close").forEach(closeBtn => {
  closeBtn.addEventListener("click", (e) => {
    // Iegūst ID no data-target atribūta
    const targetId = e.target.getAttribute('data-target');
    const targetPopup = document.getElementById(targetId);
    if (targetPopup) {
      targetPopup.style.display = "none";
    }
  });
});

// Aizvēršana, klikšķinot ārpus loga
window.addEventListener("click", (e) => {
  // Pārbauda, vai klikšķinātais elements ir pats modālais logs (ar klasi .modal)
  if (e.target.classList.contains('modal')) {
    e.target.style.display = "none";
  }
});


// Atver rezervācijas logu (šī daļa atkārtojas cards-crud.js, lai strādātu ar dinamiski pievienotām kartītēm)
document.querySelectorAll(".reserve-btn").forEach(button => {
  button.addEventListener("click", () => {
    const roomName = button.getAttribute("data-room");
    if (popupTitle) popupTitle.textContent = `Rezervācija: ${roomName}`;
    if (popup) popup.style.display = "flex"; 
  });
});