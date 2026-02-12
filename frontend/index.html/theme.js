// ================== TĒMAS PĀRSLĒGŠANA UN NAVIGĀCIJA ==================
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const body = document.body;

  // --- Tēmas pārslēgšana ---

  // Ielādē saglabāto tēmu
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light-mode') {
    body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; 
  }

  // Poga
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');

      if (isLight) {
        localStorage.setItem('theme', 'light-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        localStorage.setItem('theme', 'dark-mode');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
  }

  // --- Hamburgera izvēlne loģika ---
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      // Pievieno/noņem .active klasi, kas kontrolē izvēlnes parādīšanu CSS failā
      navLinks.classList.toggle('active');
    });
    
    // Aizver izvēlni pēc linka nospiešanas
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
  }
});