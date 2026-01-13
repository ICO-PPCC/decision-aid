// This file serves as the entry point for the JavaScript functionality. 
// It initializes the application, handles page navigation, and manages the overall state of the SPA.

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initApp();
});

function initApp() {
    // Show the initial page
    if (typeof navigateTo === 'function') {
        navigateTo('inicio');
    }

    // Set up event listeners for navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            if (typeof navigateTo === 'function') {
                navigateTo(page);
            }
        });
    });
}



let currentStep = 0;

function updateStepIndicators() {
    const dots = document.querySelectorAll('.step-dot');
    const progressBar = document.getElementById('stepProgress');

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentStep);
    });

    // Actualizar barra de progreso
    const progress = ((currentStep + 1) / dots.length) * 100;
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
}

function showNextStep() {
    const cards = document.querySelectorAll('#screening-steps .info-card');
    currentStep = (currentStep + 1) % cards.length;

    cards[currentStep].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });

    updateButtonText();
    updateStepIndicators();
}

function showPreviousStep() {
    const cards = document.querySelectorAll('#screening-steps .info-card');
    currentStep = currentStep === 0 ? cards.length - 1 : currentStep - 1;

    cards[currentStep].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
    });

    updateButtonText();
    updateStepIndicators();
}

function updateButtonText() {
    const button = document.querySelector('button[onclick="showNextStep()"]');
    const cards = document.querySelectorAll('#screening-steps .info-card');

    if (currentStep === cards.length - 1) {
        button.textContent = 'Volver al paso 1';
    } else {
        button.textContent = `Siguiente paso (${currentStep + 2}/${cards.length})`;
    }
}

// Opcional: Función para ir a un paso específico
function goToStep(stepIndex) {
    const cards = document.querySelectorAll('#screening-steps .info-card');
    if (stepIndex >= 0 && stepIndex < cards.length) {
        currentStep = stepIndex;
        cards[currentStep].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        });
        updateButtonText();
    }
}