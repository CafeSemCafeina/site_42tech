// Array para armazenar as respostas do formulário
let formulariosRespostas = [];

// Carregar respostas existentes do arquivo JSON
fetch('formularios.json')
    .then(response => response.json())
    .then(data => {
        formulariosRespostas = data;
    })
    .catch(error => {
        console.error('Erro ao carregar respostas:', error);
    });

// Função para processar o envio do formulário
function handleSubmit(event) {
    event.preventDefault();
    
    const formData = {
        id: Date.now(), // Identificador único baseado no timestamp
        data: new Date().toISOString(), // Data e hora do envio
        dados: {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            telefone: document.getElementById('telefone').value,
            empresa: document.getElementById('empresa').value,
            mensagem: document.getElementById('mensagem').value
        }
    };
    
    // Adiciona a nova resposta ao array
    formulariosRespostas.push(formData);
    
    // Salva o array atualizado em localStorage
    localStorage.setItem('formulariosRespostas', JSON.stringify(formulariosRespostas));
    
    // Salva o array atualizado no arquivo JSON
    fetch('formularios.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulariosRespostas)
    }).catch(error => {
        console.error('Erro ao salvar respostas:', error);
    });
    
    // Limpar o formulário após o envio
    event.target.reset();
    
    alert('Formulário enviado com sucesso!');
}

document.addEventListener("DOMContentLoaded", function () {
    // Menu responsivo
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Animação ao rolar a página
    const elementosParaAnimar = document.querySelectorAll(".animar");

    function verificarRolagem() {
        const alturaJanela = window.innerHeight;

        elementosParaAnimar.forEach(elemento => {
            const posicao = elemento.getBoundingClientRect().top;
            if (posicao < alturaJanela - 100) {
                elemento.classList.add("visivel");
            }
        });
    }

    window.addEventListener("scroll", verificarRolagem);
    verificarRolagem();
});