// Configuration file for Navicolon
// This file allows non-technical administrators to update content without touching the core code.

window.appConfig = {
    // Enable debug mode to see logs in console
    debug: true,
    
    // Configurable Quiz Questions
    quizQuestions: [
        {
            question: "¿Cuál es tu edad?",
            options: ["Menos de 50", "Entre 50 y 69", "80 o más"],
            answer: null
        },
        {
            question: "¿Tienes antecedentes familiares de cáncer colorrectal?",
            options: ["Sí, directos (padres/hermanos)", "No", "Otros"],
            answer: null
        },
        {
            question: "¿Te has realizado un test de sangre oculta en heces recientemente?",
            options: ["Sí, en los últimos 2 años", "No / No lo sé"],
            answer: null
        }
    ]
};
