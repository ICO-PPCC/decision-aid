/*
 * NAVEGACIÓN ENTRE SECCIONES DESDE DESKTOP
 *
*/
function navigateTo(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // Show the selected page
    const selectedPage = document.getElementById(page);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update active navigation button
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-page') === page) {
            btn.classList.add('active');
        }
    });

    // Desplazamiento suave al principio de la página
    globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        const page = button.getAttribute('data-page');
        navigateTo(page);        
    });
});

/*
 * Control de visibilidad de Header y Footer en Mobile
 *
*/

// Detectar si estamos en móvil
const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

// Referencias al DOM
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Estado
let previousScrollY = 0;
let headerFooterVisible = true; // Estado: ¿están visibles?
let wasMobile = isMobile(); // Guardar el breakpoint anterior
const SCROLL_THRESHOLD = 10; // Píxeles antes de cambiar estado

const handleScroll = () => {
    // Si no estamos en móvil, no hagas nada
    if (!isMobile()) {
        return;
    }

    const currentScrollY = window.scrollY;
    const scrollDifference = currentScrollY - previousScrollY;

    // Detectar dirección y aplicar threshold
    if (scrollDifference > SCROLL_THRESHOLD && headerFooterVisible) {
        // Scrolleando hacia abajo MÁS de 10px
        hideHeaderFooter();
        headerFooterVisible = false;
    } else if (scrollDifference < -SCROLL_THRESHOLD && !headerFooterVisible) {
        // Scrolleando hacia arriba MÁS de 10px
        showHeaderFooter();
        headerFooterVisible = true;
    }

    // Actualizar posición anterior
    previousScrollY = currentScrollY;
};

const hideHeaderFooter = () => {
    header.classList.add('hidden');
    footer.classList.add('hidden');
};

const showHeaderFooter = () => {
    header.classList.remove('hidden');
    footer.classList.remove('hidden');
};

// Event listener con throttling manual
let isThrottled = false;
window.addEventListener('scroll', () => {
    if (!isThrottled) {
        handleScroll();
        isThrottled = true;
        requestAnimationFrame(() => {
            isThrottled = false;
        });
    }
});

// Listener para cambios de breakpoint
window.addEventListener('resize', () => {
    const isCurrentlyMobile = isMobile();

    // Solo actuar si cambió el breakpoint
    if (isCurrentlyMobile !== wasMobile) {
        wasMobile = isCurrentlyMobile;

        // Si pasamos a desktop, mostrar header/footer
        if (!isCurrentlyMobile) {
            showHeaderFooter();
            headerFooterVisible = true;
        }
    }
});


/* 
 * Menú desplegable del logo
 *
*/ 

document.addEventListener('DOMContentLoaded', function() {
    const logoButton = document.getElementById('logoButton');
    const logoDropdown = document.getElementById('logoDropdown');
    
    if (logoButton && logoDropdown) {
        // Toggle del menú al hacer clic en el botón
        logoButton.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que el clic se propague
            
            const isExpanded = logoButton.getAttribute('aria-expanded') === 'true';
            
            // Cambiar estado
            logoButton.setAttribute('aria-expanded', !isExpanded);
            logoDropdown.classList.toggle('open');
        });
        
        // Cerrar el menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!logoButton.contains(e.target) && !logoDropdown.contains(e.target)) {
                logoButton.setAttribute('aria-expanded', 'false');
                logoDropdown.classList.remove('open');
            }
        });
        
        // Cerrar con la tecla Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                logoButton.setAttribute('aria-expanded', 'false');
                logoDropdown.classList.remove('open');
            }
        });
    }
});