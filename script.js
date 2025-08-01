// Configuração do WhatsApp
const whatsappNumber = "5511951966608";

// Função para abrir WhatsApp
function openWhatsApp(message = "Olá! Gostaria de saber mais sobre os produtos da farmácia.") {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Animações de scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .product-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Smooth scroll para links internos
function setupSmoothScroll() {
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
}

// Efeito de hover nos cards de produtos
function setupProductCardEffects() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Efeito de loading nos botões
function setupButtonEffects() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Efeito de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Header scroll effect
function setupHeaderEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'white';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Contador animado (se necessário no futuro)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy loading para imagens (se houver)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes para mobile
function setupMobileOptimizations() {
    if (isMobile()) {
        // Ajustar tamanho de fonte para mobile
        document.documentElement.style.fontSize = '14px';
        
        // Otimizar animações para mobile
        const cards = document.querySelectorAll('.feature-card, .product-card');
        cards.forEach(card => {
            card.style.transition = 'transform 0.2s ease';
        });
    }
}

// Adicionar CSS para efeito ripple
function addRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        button {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    animateOnScroll();
    setupSmoothScroll();
    setupProductCardEffects();
    setupButtonEffects();
    setupHeaderEffect();
    setupLazyLoading();
    setupMobileOptimizations();
    addRippleCSS();
    
    // Adicionar classe fade-in aos elementos principais
    const mainElements = document.querySelectorAll('.hero-content, .features h3, .products h3, .contact h3');
    mainElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    console.log('FarmáciaSaúde - Site carregado com sucesso!');
});

// Otimização de performance
window.addEventListener('load', function() {
    // Preload de recursos importantes
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = whatsappLink;
    document.head.appendChild(link);
});

// Tratamento de erros
window.addEventListener('error', function(e) {
    console.error('Erro no site:', e.error);
});

// Exportar funções para uso global se necessário
window.FarmaciaUtils = {
    openWhatsApp,
    isMobile,
    animateCounter
};

