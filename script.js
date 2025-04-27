document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    // --- Menú Móvil y Dropdowns ---
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Función para cerrar todos los dropdowns abiertos
    const closeAllDropdowns = (exceptToggle = null) => {
        document.querySelectorAll('.nav-item.dropdown.show').forEach(openDropdown => {
            const toggle = openDropdown.querySelector('.dropdown-toggle');
            if (toggle !== exceptToggle) {
                openDropdown.classList.remove('show');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    };

    // Toggle Menú Móvil
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
            navbarMenu.classList.toggle('active');
            navbarToggle.setAttribute('aria-expanded', !isExpanded);
            // Cambiar icono hamburguesa a X y viceversa
            const icon = navbarToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            navbarToggle.setAttribute('aria-label', !isExpanded ? 'Cerrar menú' : 'Abrir menú');

            if (!navbarMenu.classList.contains('active')) {
                closeAllDropdowns(); // Cierra dropdowns si se cierra el menú principal
            }
        });
    }

    // Manejo de Dropdowns (Click)
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la navegación si es un enlace '#'
            const parentNavItem = toggle.closest('.nav-item.dropdown');
            const isCurrentlyShown = parentNavItem.classList.contains('show');

            // Si estamos en vista móvil y el menú principal no está activo, no hacemos nada
            // (esto evita abrir dropdowns invisibles si el menú principal está cerrado)
            const isMobileView = window.innerWidth <= 768; // o tu breakpoint
            if (isMobileView && !navbarMenu.classList.contains('active') && !parentNavItem.closest('.navbar-menu.active')) {
                 // Si el menú principal está cerrado en móvil, primero ábrelo con el toggle
                 // Opcionalmente: Ignorar el click al dropdown si el menu movil esta cerrado?
                 // return;
            }


            closeAllDropdowns(toggle); // Cierra otros dropdowns primero

            if (!isCurrentlyShown) {
                parentNavItem.classList.add('show');
                toggle.setAttribute('aria-expanded', 'true');
            } else {
                 parentNavItem.classList.remove('show');
                 toggle.setAttribute('aria-expanded', 'false');
            }
             // Detener la propagación para evitar que el listener del documento cierre el dropdown inmediatamente
            e.stopPropagation();
        });
    });

    // Cerrar Menú Móvil y Dropdowns al hacer clic fuera
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
        const isNavbarActive = navbarMenu.classList.contains('active');

        // Cierra menú móvil si se hace clic fuera (y no en el toggle)
         const isMobileView = window.innerWidth <= 768; // o tu breakpoint
        if (isMobileView && isNavbarActive && !isClickInsideNav && !navbarToggle.contains(event.target)) {
            navbarMenu.classList.remove('active');
            navbarToggle.setAttribute('aria-expanded', 'false');
            const icon = navbarToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            navbarToggle.setAttribute('aria-label', 'Abrir menú');
            closeAllDropdowns(); // Asegura que los dropdowns también se cierren
        }

        // Cierra dropdowns si se hace clic fuera del área del dropdown
        const isDropdownClick = event.target.closest('.nav-item.dropdown');
         if (!isDropdownClick) {
             closeAllDropdowns();
         }
    });

     // Cerrar menú móvil al hacer clic en un enlace que no sea dropdown ni botón de modal
    navbarMenu.querySelectorAll('.navbar-link:not(.dropdown-toggle), .dropdown-item, .btn:not([id^="openDemoModal"])').forEach(link => {
         link.addEventListener('click', () => {
             const isMobileView = window.innerWidth <= 768; // o tu breakpoint
             if (isMobileView && navbarMenu.classList.contains('active')) {
                 // Solo cierra si no es un toggle de dropdown
                 if (!link.classList.contains('dropdown-toggle')) {
                     navbarMenu.classList.remove('active');
                     navbarToggle.setAttribute('aria-expanded', 'false');
                     const icon = navbarToggle.querySelector('i');
                     icon.classList.remove('fa-times');
                     icon.classList.add('fa-bars');
                      navbarToggle.setAttribute('aria-label', 'Abrir menú');
                      closeAllDropdowns();
                 }
             }
         });
     });


    // --- Modal "Solicitar Demo" ---
    const demoModal = document.getElementById('demoModal');
    const openModalButtons = document.querySelectorAll('[id^="openDemoModal"]'); // Captura todos los botones que abren el modal
    const closeModalButton = document.getElementById('closeDemoModal');
    const demoForm = document.getElementById('demoForm');

    const openModal = () => {
        if (demoModal) {
            demoModal.classList.add('active');
            demoModal.setAttribute('aria-hidden', 'false');
            body.style.overflow = 'hidden'; // Evita scroll del fondo
             // Intenta poner foco en el primer input visible y habilitado
             const firstInput = demoModal.querySelector('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])');
             if(firstInput) {
                 firstInput.focus();
             }
        }
    };

    const closeModal = () => {
        if (demoModal) {
            demoModal.classList.remove('active');
            demoModal.setAttribute('aria-hidden', 'true');
            body.style.overflow = ''; // Restaura scroll
        }
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', openModal);
    });

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Cerrar modal haciendo clic en el overlay
    if (demoModal) {
        demoModal.addEventListener('click', (event) => {
            if (event.target === demoModal) { // Si el clic es directamente en el overlay
                closeModal();
            }
        });
    }

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && demoModal && demoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Manejo del envío del formulario (ejemplo básico)
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene el envío real por ahora
            // Aquí iría la lógica para enviar los datos (e.g., usando fetch a tu backend)
            console.log('Formulario enviado (simulado)');
            // Podrías mostrar un mensaje de éxito aquí
            alert('¡Gracias por tu solicitud! Nos pondremos en contacto pronto.');
            closeModal(); // Cierra el modal después de enviar
            demoForm.reset(); // Limpia el formulario
        });
    }


    // --- Año Actual en Footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Efecto suave al hacer scroll en enlaces internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
             const href = this.getAttribute('href');
             // Evita el scroll suave para enlaces que solo son '#' o disparadores de dropdown/modal
             if (href === '#' || this.classList.contains('dropdown-toggle') || this.closest('.modal-content') || this.closest('[id^="openDemoModal"]')) {
                return;
             }

             const targetId = href;
             try {
                 const targetElement = document.querySelector(targetId);
                 if (targetElement) {
                     e.preventDefault();
                     // Usa el header que esté actualmente (puede cambiar en móvil)
                     const headerOffset = document.querySelector('.main-header-light')?.offsetHeight || 70;
                     const elementPosition = targetElement.getBoundingClientRect().top;
                     const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                     window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                     });

                     // Cierra menú móvil si está abierto después del scroll (solo si estamos en vista móvil)
                     const isMobileView = window.innerWidth <= 768;
                     if (isMobileView && navbarMenu.classList.contains('active')) {
                         navbarMenu.classList.remove('active');
                         navbarToggle.setAttribute('aria-expanded', 'false');
                         const icon = navbarToggle.querySelector('i');
                         icon.classList.remove('fa-times');
                         icon.classList.add('fa-bars');
                         navbarToggle.setAttribute('aria-label', 'Abrir menú');
                         closeAllDropdowns();
                     }
                 }
             } catch (error) {
                 // Ignora errores si el selector es inválido (p.ej. href="#")
                 // console.warn(`Elemento no encontrado para el selector: ${targetId}`, error);
             }
        });
    });

});