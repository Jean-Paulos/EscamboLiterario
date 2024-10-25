async function loadIframe() {
    try {
        // Faz uma requisição para o backend para obter a key do Copilot AI
        const response = await fetch('http://localhost:3000/api/copilot-key');
        const data = await response.json();
        const copilotKey = data.key;
    
        // Verifica se o iframe já foi criado
        const iframeContainer = document.getElementById('iframe-container');
        if (!iframeContainer.querySelector('iframe')) { // Só adiciona se não houver iframe
            const iframe = document.createElement('iframe');
            iframe.src = `https://copilotstudio.microsoft.com/environments/${copilotKey}/bots/cra42_bibliotecarioIa/webchat?__version__=2`;
            iframe.frameBorder = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframeContainer.appendChild(iframe);
        }
    } catch (error) {
        console.error('Erro ao carregar o iframe do Copilot AI:', error);
    }
}

// Carrega o iframe ao carregar a página
window.addEventListener('DOMContentLoaded', loadIframe);
