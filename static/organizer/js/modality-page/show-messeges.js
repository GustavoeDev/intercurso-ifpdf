// Função para exibir mensagens do Django como alertas
function showMessages() {
    const messages = document.querySelectorAll('.messages li');
    messages.forEach(message => {
        alert(message.textContent);  // Exibe cada mensagem como um alerta
    });
}

// Executa a função quando a página carrega
window.onload = showMessages;