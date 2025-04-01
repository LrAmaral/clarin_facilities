document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const closeMenuBtn = document.querySelector(".close-menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const header = document.querySelector(".header");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  let lastScroll = 0;

  const sections = document.querySelectorAll("section[id]"); // Seleciona todas as seções com ID
  const navLinks = document.querySelectorAll(".nav-link");

  // Função para abrir o menu
  function openMenu() {
    mobileMenu.style.right = "0";
    document.body.style.overflow = "hidden";
  }

  // Função para fechar o menu
  function closeMenu() {
    mobileMenu.style.right = "-100%";
    document.body.style.overflow = "";
  }

  // Event listeners
  mobileMenuBtn.addEventListener("click", openMenu);
  closeMenuBtn.addEventListener("click", closeMenu);

  // Fechar menu ao clicar nos links
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Efeito de scroll no header
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Mostra/esconde header baseado na direção do scroll
    if (currentScroll > lastScroll && currentScroll > 80) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastScroll = currentScroll;

    // Função para atualizar link ativo
    function updateActiveLink() {
      const scrollPosition = window.scrollY + 100; // Offset para melhor detecção

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          // Remove a classe active de todos os links
          navLinks.forEach((link) => link.classList.remove("active"));

          // Adiciona a classe active ao link correspondente à seção atual
          const correspondingLink = document.querySelector(
            `.nav-link[href="#${sectionId}"]`
          );
          if (correspondingLink) {
            correspondingLink.classList.add("active");
          }
        }
      });
    }

    // Atualiza no scroll
    updateActiveLink();
  });

  // Scroll suave para as âncoras
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      const offsetTop = document.querySelector(href).offsetTop - 80;

      scroll({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });

  // Atualiza na carga inicial da página
  updateActiveLink();
});
