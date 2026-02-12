// ================== FORMAS VALIDĀCIJA ==================
const form = document.getElementById("contactForm");
let formMessage = document.getElementById("formMessage");

if (form) {
  // Ja nav <p id="formMessage"> HTMLā, izveidojam automātiski
  if (!formMessage) {
    formMessage = document.createElement("p");
    formMessage.id = "formMessage";
    form.appendChild(formMessage);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
      setMessage("❌ Lūdzu aizpildiet visus laukus!", "red");
      return;
    }

    if (!emailRegex.test(email)) {
      setMessage("❌ Lūdzu ievadiet derīgu e-pasta adresi!", "red");
      return;
    }

    setMessage("✅ Forma veiksmīgi iesniegta!", "limegreen");
    form.reset();
  });
}

function setMessage(text, color) {
  if (!formMessage) return;

  formMessage.textContent = text;
  formMessage.style.color = color;
  formMessage.style.fontWeight = "bold";
  formMessage.style.marginTop = "10px";
  formMessage.style.textAlign = "center";
  formMessage.style.animation = "shake 0.3s";

  // Noņem animāciju pēc 300ms, un ziņu pēc 3 sekundēm, ja veiksmīgi
  setTimeout(() => (formMessage.style.animation = ""), 300);

  if (color === "limegreen") {
    setTimeout(() => {
      formMessage.textContent = "";
    }, 3000);
  }
}
