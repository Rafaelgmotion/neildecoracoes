// app.js COMPLETO e ATUALIZADO
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.getElementById('header');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const leadForm = document.getElementById('leadForm');
    const currentYearSpan = document.getElementById('currentYear');
    
    // Atualizar ano no rodapé
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Controlar scroll do header
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Toggle menu mobile
    function toggleMobileMenu() {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle('active');
        
        // Alternar ícone do botão
        const icon = mobileMenuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // Prevenir scroll do body quando menu está aberto
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }
    
    // Fechar menu mobile ao clicar em um link
    function closeMobileMenu() {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        nav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
    }
    
    // Form submission
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const eventType = document.getElementById('event-type').value;
        
        if (!name || !email || !phone || !eventType) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitButton.disabled = true;
        
        // Simular envio (em produção, enviaria para um servidor)
        setTimeout(() => {
            alert('✅ Obrigado pelo seu interesse! Entraremos em contato em até 24 horas para discutir os detalhes do seu evento.');
            
            // Resetar formulário
            leadForm.reset();
            
            // Restaurar botão
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 1500);
    }
    
    // Smooth scrolling for anchor links
    function handleSmoothScroll(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile após clicar em um link
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        }
    }
    
    // Set minimum date for event date picker
    function setMinDateForEvent() {
        const eventDateInput = document.getElementById('event-date');
        if (eventDateInput) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            
            const minDate = tomorrow.toISOString().split('T')[0];
            eventDateInput.min = minDate;
            
            // Formatar data para exibição mais amigável
            eventDateInput.addEventListener('change', function() {
                if (this.value) {
                    const date = new Date(this.value);
                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                    console.log('Data do evento selecionada:', date.toLocaleDateString('pt-BR', options));
                }
            });
        }
    }
    
    // Animation on scroll
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Efeito de stagger para galeria
                    if (entry.target.classList.contains('gallery-item')) {
                        const index = Array.from(document.querySelectorAll('.gallery-item')).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
        });
        
        // Observe service cards
        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', handleSmoothScroll);
        });
    }
    
    if (leadForm) {
        leadForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Fechar menu ao pressionar ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Inicialização
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Executar inicialmente
    setMinDateForEvent();
    setupIntersectionObserver();
    
    // Logotipo no console (opcional)
    console.log('%c Neil Dias Decorações ', 'color: #d4af37; font-size: 20px; font-weight: bold;');
    console.log('%cOrnamentação floral para Celebrações & Eventos', 'color: #2c3e50; font-size: 16px;');
    console.log('%cSite otimizado para conversão WhatsApp', 'color: #25D366; font-size: 14px;');
    
    // Preload de imagens importantes
    function preloadImages() {
        const images = [
            'fotos/logo.png',
            'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    preloadImages();
});
