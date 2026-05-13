/**
 * EduConnect CTP - Lógica de Navegación SPA
 * Maneja el cambio de secciones sin recargar la página.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.page-section');

    /**
     * Cambia la sección activa basándose en el ID proporcionado.
     * @param {string} sectionId - El ID de la sección a mostrar.
     */
    const switchSection = (sectionId) => {
        // 1. Ocultar todas las secciones
        sections.forEach(section => {
            section.classList.add('hidden');
            section.classList.remove('active');
        });

        // 2. Mostrar la sección seleccionada
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            // Añadimos un pequeño delay para que la animación CSS se dispare correctamente
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 10);
        }

        // 3. Actualizar estado visual de los botones de navegación
        navItems.forEach(item => {
            if (item.getAttribute('data-section') === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Opcional: Feedback hápitco (si el dispositivo lo soporta)
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    };

    // Lógica de Modo Oscuro
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // Agregar manejadores de eventos a cada botón de la navegación inferior
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Solo cambiar si no estamos ya en esa sección
            if (!item.classList.contains('active')) {
                switchSection(sectionId);
                
                // Desplazar al inicio de la página al cambiar de sección
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accesos rápidos desde el Dashboard
    const shortcutCarnet = document.getElementById('shortcut-carnet');
    const shortcutAsistencia = document.getElementById('shortcut-asistencia');
    const shortcutComedor = document.getElementById('shortcut-comedor');

    if (shortcutCarnet) {
        shortcutCarnet.addEventListener('click', () => switchSection('carnet'));
    }

    if (shortcutAsistencia) {
        shortcutAsistencia.addEventListener('click', () => switchSection('expediente'));
    }

    if (shortcutComedor) {
        shortcutComedor.addEventListener('click', () => {
            alert('El servicio de Comedor estará disponible próximamente.');
        });
    }

    // Lógica del Carrusel de Noticias
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    const nextSlide = () => {
        if (slides.length === 0) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    // Cambio automático cada 30 segundos (30000ms)
    if (slides.length > 0) {
        setInterval(nextSlide, 10000);
    }

    // Lógica para el QR (Simulación de animación o datos dinámicos)
    const qrPixels = document.querySelectorAll('.qr-pixel');
    if (qrPixels.length > 0) {
        setInterval(() => {
            qrPixels.forEach(pixel => {
                pixel.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
            });
        }, 1000);
    }

    console.log('EduConnect CTP: Sistema SPA inicializado correctamente.');
});
