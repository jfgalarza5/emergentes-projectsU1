/**
 * SCRIPT COMPLETO - ESPE SANTO DOMINGO
 * Maneja: Navegación, Menú Móvil, Animaciones y Pestañas de Carreras
 */

// 1. Lógica de las Pestañas (Tabs) de Carreras
// La definimos fuera del DOMContentLoaded para que sea accesible globalmente por los botones
window.showTab = function(tabId) {
    // Obtener todos los contenidos de las carreras
    const contents = document.querySelectorAll('.tab-content');
    // Obtener todos los botones de las pestañas
    const buttons = document.querySelectorAll('.tab-btn');

    // Ocultar todos los contenidos y quitar clase activa
    contents.forEach(content => {
        content.classList.remove('active-content');
        content.style.display = 'none'; // Asegura que no ocupen espacio
    });

    // Quitar la clase activa de todos los botones
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar el contenido de la carrera seleccionada
    const target = document.getElementById(tabId);
    if (target) {
        target.style.display = 'block';
        // Usamos un pequeño timeout para que la animación de CSS (fadeIn) se active
        setTimeout(() => {
            target.classList.add('active-content');
        }, 10);
    }

    // Marcar el botón actual como activo
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    
    // 2. Control del Menú Móvil (Hamburguesa)
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
    }

    // 3. Efecto de Scroll en el Header
    const mainNav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.style.padding = "5px 10%";
            mainNav.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
            mainNav.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        } else {
            mainNav.style.padding = "10px 10%";
            mainNav.style.backgroundColor = "#fff";
            mainNav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }
    });

    // 4. Scroll Suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Animación de "Aparición" (Intersection Observer)
    // Esto hace que las cards y stats aparezcan suavemente al bajar el scroll
    const observerOptions = {
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    // Aplicar a cards de estudiantes y de estadísticas
    document.querySelectorAll('.student-card, .stat-card, .info-main').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        revealObserver.observe(el);
    });

});