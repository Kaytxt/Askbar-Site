// ========================================
// SMOOTH SCROLLING
// ========================================
function scrollToContact() {
    document.getElementById('contato').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Smooth scroll para todos os links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// MOBILE MENU
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Inicia contadores quando visíveis
const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
        }
    });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// ========================================
// AOS (ANIMATE ON SCROLL)
// ========================================
const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('[data-aos]').forEach(element => {
    const delay = element.getAttribute('data-delay') || 0;
    element.style.transitionDelay = `${delay}ms`;
    aosObserver.observe(element);
});

// ========================================
// PARTICLES EFFECT
// ========================================
function createParticles() {
    const particles = document.getElementById('particles');
    if (!particles) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(102, 126, 234, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particles.appendChild(particle);
    }
}

// CSS para animação das partículas
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(10px, -10px);
        }
        50% {
            transform: translate(-10px, 10px);
        }
        75% {
            transform: translate(10px, 10px);
        }
    }
`;
document.head.appendChild(style);

createParticles();

// ========================================
// SCROLL INDICATOR
// ========================================
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const productSection = document.getElementById('produto');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========================================
// DEMO VIDEO (PLACEHOLDER)
// ========================================
function playDemo() {
    Swal.fire({
        title: '🎬 Demonstração',
        html: `
            <div style="padding: 20px;">
                <p style="margin-bottom: 15px;">Em breve você verá aqui um vídeo completo de demonstração!</p>
                <p>Por enquanto, experimente agendar uma chamada com nosso time.</p>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Agendar Chamada',
        confirmButtonColor: '#667eea',
        showCancelButton: true,
        cancelButtonText: 'Fechar'
    }).then((result) => {
        if (result.isConfirmed) {
            scrollToContact();
        }
    });
}

// ========================================
// FORM HANDLING
// ========================================
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validação básica
        const formData = {
            nome: form.querySelector('input[name="nome"]').value,
            email: form.querySelector('input[name="email"]').value,
            numero: form.querySelector('input[name="numero"]').value,
            mensagem: form.querySelector('textarea[name="mensagem"]').value
        };

        // Mostra loading
        Swal.fire({
            title: 'Enviando...',
            html: 'Aguarde enquanto processamos sua mensagem',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Envia para o servidor
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
            Swal.fire({
                title: '✅ Sucesso!',
                html: `
                    <div style="padding: 20px;">
                        <p style="margin-bottom: 15px; font-size: 1.1rem;">
                            Recebemos sua mensagem, <strong>${formData.nome.split(' ')[0]}</strong>!
                        </p>
                        <p>Nossa equipe entrará em contato via WhatsApp em até 1 hora útil.</p>
                        <p style="margin-top: 15px; color: #25D366;">
                            <i class="fab fa-whatsapp"></i> ${formData.numero}
                        </p>
                    </div>
                `,
                icon: 'success',
                confirmButtonColor: '#25D366',
                confirmButtonText: 'Perfeito!'
            });
            form.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            Swal.fire({
                title: '❌ Ops!',
                html: `
                    <div style="padding: 20px;">
                        <p>Não foi possível enviar sua mensagem no momento.</p>
                        <p style="margin-top: 15px;">Tente novamente ou entre em contato via WhatsApp:</p>
                        <p style="margin-top: 10px; color: #25D366; font-size: 1.2rem;">
                            <i class="fab fa-whatsapp"></i> (11) 99999-9999
                        </p>
                    </div>
                `,
                icon: 'error',
                confirmButtonText: 'Entendi',
                confirmButtonColor: '#667eea'
            });
        });
    });
}

// ========================================
// INPUT MASKS
// ========================================
const phoneInput = document.querySelector('input[name="numero"]');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        
        if (value.length >= 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length >= 7) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }
        
        e.target.value = value;
    });
}

// ========================================
// PARALLAX EFFECT
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🚀 BotMaster - Site carregado com sucesso!');
