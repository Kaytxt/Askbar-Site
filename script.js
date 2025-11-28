// Função para rolagem suave (Hero Section)
function scrollToContact() {
    document.getElementById('contato').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Manipulação do Formulário
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o recarregamento da página

        // Captura os dados dos inputs
        // Certifique-se que no HTML os inputs têm name="nome", name="numero", etc.
        const formData = {
            nome: form.querySelector('input[name="nome"]').value,
            email: form.querySelector('input[name="email"]').value,
            numero: form.querySelector('input[name="numero"]').value, // Novo Campo
            mensagem: form.querySelector('textarea[name="mensagem"]').value
        };

        // Envia para o nosso servidor Node.js
        fetch('http://localhost:3000/api/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro na resposta do servidor');
        })
        .then(data => {
            // Sucesso (SweetAlert2)
            Swal.fire({
                title: 'Sucesso!',
                text: 'Recebemos seus dados. Entraremos em contato no WhatsApp!',
                icon: 'success',
                confirmButtonColor: '#25D366'
            });
            form.reset(); // Limpa o formulário
        })
        .catch(error => {
            console.error('Erro:', error);
            // Erro (SweetAlert2)
            Swal.fire({
                title: 'Erro de conexão',
                text: 'Não foi possível conectar ao servidor.',
                icon: 'error',
                confirmButtonText: 'Tentar novamente'
            });
        });
    });
}

// Efeito simples de Navbar mudando de cor ao rolar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = "#000"; 
        } else {
            header.style.background = "rgba(0,0,0,0.8)"; 
        }
    }
});