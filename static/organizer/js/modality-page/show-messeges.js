// Função para exibir mensagens do Django como alertas
function showMessages() {
    const messages = document.querySelectorAll('.messages li');
        alert(messages[0].textContent);  // Exibe cada mensagem como um alerta
}

// Executa a função quando a página carrega
window.onload = showMessages;