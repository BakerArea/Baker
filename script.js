// Script para interatividade do site de Segurança no Trabalho

// Smooth scroll para links de navegação
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

// Animação ao fazer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.topic-card, .stat-card, .resource-card, .tip').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validação básica
        if (name.trim() === '' || email.trim() === '' || subject === '' || message.trim() === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }
        
        // Simular envio
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert(`Obrigado, ${name}! Sua mensagem foi recebida com sucesso.\n\nEntraremos em contato em breve.`);
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Checklist interativa
document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.6';
            this.parentElement.style.backgroundColor = '#d4f1d4';
        } else {
            label.style.textDecoration = 'none';
            label.style.opacity = '1';
            this.parentElement.style.backgroundColor = 'white';
        }
    });
});

// Efeito de hover nos botões
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Menu mobile responsivo (opcional)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Scroll indicator
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Contador de segurança (exemplo de estatística dinâmica)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animar estatísticas quando visíveis
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            
            // Animar valor de h3
            const value = entry.target.querySelector('h3').textContent;
            const numericValue = parseInt(value.replace(/\D/g, ''));
            
            if (!isNaN(numericValue)) {
                animateCounter(entry.target.querySelector('h3'), numericValue, 1500);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statsObserver.observe(card);
});

// Feedback visual para cliques
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('click', function(e) {
        // Ripple effect (opcional)
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
    });
});

// Adicionar animação de ripple ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Função de alerta customizado para denúncias
function reportHazard() {
    const message = "Você está prestes a reportar uma situação de risco.\n\nPreencha o formulário com os detalhes.";
    alert(message);
}

// Log de ações importantes para segurança
console.log('%c🛡️ Bem-vindo ao site de Segurança no Trabalho - Baker', 'color: #d4a574; font-size: 16px; font-weight: bold;');
console.log('%cLembre-se: Segurança é responsabilidade de TODOS!', 'color: #2c3e50; font-size: 14px;');

// Verificar suporte a recursos modernos
if ('serviceWorker' in navigator) {
    console.log('✓ Service Workers suportados');
}

// Dark mode toggle (opcional - para implementação futura)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Carregar preferência de dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Função para expandir/colapsar seções
function toggleSection(element) {
    element.classList.toggle('expanded');
}

// Monitorar inatividade (exemplo de segurança)
let inactivityTimer;
const inactivityLimit = 15 * 60 * 1000; // 15 minutos

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        console.log('Sessão inativa por muito tempo');
    }, inactivityLimit);
}

document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

resetInactivityTimer();

// Função para validar dados de segurança
function validateSafetyData(data) {
    if (!data || typeof data !== 'object') {
        console.error('Dados de segurança inválidos');
        return false;
    }
    return true;
}

// Print responsável
window.addEventListener('beforeprint', () => {
    console.log('Documento preparado para impressão');
});

// Carregar recursos externos com tratamento de erro
function loadResource(url, type = 'script') {
    return new Promise((resolve, reject) => {
        try {
            const element = type === 'script' 
                ? document.createElement('script')
                : document.createElement('link');
            
            if (type === 'script') {
                element.src = url;
                element.onload = resolve;
                element.onerror = reject;
            } else {
                element.rel = 'stylesheet';
                element.href = url;
            }
            
            document.head.appendChild(element);
        } catch (error) {
            reject(error);
        }
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Página de Segurança no Trabalho carregada com sucesso');
    
    // Executar animações iniciais
    document.querySelectorAll('section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
    });
});