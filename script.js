document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Móvil ---
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarLinks = document.querySelectorAll('.navbar-link'); // Selecciona todos los enlaces

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            // Cambiar icono hamburguesa a X y viceversa
            const icon = navbarToggle.querySelector('i');
            if (navbarMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navbarToggle.setAttribute('aria-label', 'Cerrar menú'); // Accesibilidad
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                 navbarToggle.setAttribute('aria-label', 'Abrir menú'); // Accesibilidad
            }
        });

        // Cerrar menú al hacer clic en un enlace (para SPAs o navegación interna)
        navbarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    const icon = navbarToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navbarToggle.setAttribute('aria-label', 'Abrir menú');
                }
            });
        });

        // Cerrar menú si se hace clic fuera de él (en pantallas móviles)
        document.addEventListener('click', (event) => {
             const isClickInsideNav = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
             if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                    navbarMenu.classList.remove('active');
                    const icon = navbarToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navbarToggle.setAttribute('aria-label', 'Abrir menú');
             }
        });
    }

    // --- Año Actual en Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Opcional: Efecto suave al hacer scroll en enlaces internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Verifica si el enlace es solo un "#" (podría ser usado por otros scripts/componentes)
            // O si es el botón de toggle del menú
             if (this.getAttribute('href') === '#' || this.id === 'navbarToggle') {
                return; // No hagas scroll suave para estos casos
             }

            e.preventDefault(); // Previene el salto instantáneo

            const targetId = this.getAttribute('href');
             const targetElement = document.querySelector(targetId);

            if(targetElement) {
                 const headerOffset = document.querySelector('.main-header')?.offsetHeight || 70; // Ajusta por altura del header fijo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calcula posición final

                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth" // La magia del scroll suave
                });
            }
        });
    });

});