/**
 * sobre.js - Scripts específicos para a página sobre.html
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos específicos da página sobre
    const timelineItems = document.querySelectorAll('.timeline-item');
    const valuesCards = document.querySelectorAll('.value-card');
    const hobbyItems = document.querySelectorAll('.hobby-item');
    
    // Animação da linha do tempo
    if (timelineItems.length > 0) {
        animateTimeline();
    }
    
    // Efeitos nos cards de valores
    if (valuesCards.length > 0) {
        setupValuesCards();
    }
    
    // Inicializar filtro de hobbies (se existir)
    const hobbiesSection = document.querySelector('.hobbies-section');
    if (hobbiesSection) {
        initHobbiesFilter();
    }
    
    /**
     * Funções específicas da página sobre
     */
    
    // Animação da linha do tempo
    function animateTimeline() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Configuração dos cards de valores
    function setupValuesCards() {
        valuesCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('active');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('active');
            });
            
            // Adiciona animação de click
            card.addEventListener('click', () => {
                card.classList.add('pulse');
                setTimeout(() => {
                    card.classList.remove('pulse');
                }, 800);
            });
        });
    }
    
    // Inicializar filtro de hobbies
    function initHobbiesFilter() {
        const hobbyFilters = document.querySelectorAll('.hobby-filter');
        
        if (hobbyFilters.length > 0) {
            hobbyFilters.forEach(filter => {
                filter.addEventListener('click', () => {
                    const category = filter.getAttribute('data-category');
                    
                    // Atualiza filtro ativo
                    hobbyFilters.forEach(f => f.classList.remove('active'));
                    filter.classList.add('active');
                    
                    // Filtra hobbies
                    hobbyItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        
                        if (category === 'all' || itemCategory === category) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.classList.remove('filtered');
                            }, 100);
                        } else {
                            item.classList.add('filtered');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
        
        // Efeito de zoom em hobbies
        hobbyItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove classe active de todos os itens
                hobbyItems.forEach(i => i.classList.remove('active'));
                
                // Adiciona classe active ao item clicado
                item.classList.add('active');
                
                // Mostra detalhes do hobby (opcional)
                const details = item.querySelector('.hobby-details');
                if (details) {
                    details.classList.toggle('visible');
                }
            });
        });
    }
    
    // Inicializar campos de formulário (se existirem)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const formFields = contactForm.querySelectorAll('input, textarea');
        
        formFields.forEach(field => {
            // Adiciona classe quando campo está em foco
            field.addEventListener('focus', () => {
                field.parentElement.classList.add('focused');
            });
            
            // Remove classe quando campo perde o foco
            field.addEventListener('blur', () => {
                if (field.value === '') {
                    field.parentElement.classList.remove('focused');
                }
            });
        });
        
        // Validação básica de formulário
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (field.value.trim() === '') {
                    field.parentElement.classList.add('error');
                    valid = false;
                } else {
                    field.parentElement.classList.remove('error');
                }
            });
            
            if (valid) {
                // Simular envio de formulário
                const submitButton = contactForm.querySelector('[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                
                // Simular resposta de servidor
                setTimeout(() => {
                    contactForm.innerHTML = '<div class="success-message">Mensagem enviada com sucesso! Obrigado pelo contato.</div>';
                }, 2000);
            }
        });
    }
});
