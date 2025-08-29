/**
 * index.js - Scripts específicos para a página index.html
 */

document.addEventListener('DOMContentLoaded', function() {
    // Remover tela de carregamento
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        // Adiciona uma pequena transição antes de ocultar completamente
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Elementos específicos da página inicial
    const statCounters = document.querySelectorAll('.stat-number');
    const skillBars = document.querySelectorAll('.skill-bar');
    const experienceCards = document.querySelectorAll('.experience-card');
    
    // Animação dos números de estatística
    if (statCounters.length > 0) {
        animateStatNumbers();
    }
    
    // Animação das barras de progresso
    if (skillBars.length > 0) {
        animateSkillBars();
    }
    
    // Efeitos de hover em cartões de experiência
    if (experienceCards.length > 0) {
        setupExperienceCards();
    }
    
    // Inicializar galeria de projetos (se existir)
    const projectsGallery = document.querySelector('.projects-gallery');
    if (projectsGallery) {
        initProjectsGallery();
    }
    
    // Manipulador para o botão de visualização do CV
    const cvPreviewButton = document.querySelector('.cv-preview-toggle');
    const cvEmbed = document.getElementById('cvEmbed');
    if (cvPreviewButton && cvEmbed) {
        cvPreviewButton.addEventListener('click', function() {
            if (cvEmbed.style.display === 'none') {
                // Mostrar CV
                cvEmbed.style.display = 'block';
                this.innerHTML = '<i class="fas fa-eye-slash"></i> Ocultar';
            } else {
                // Ocultar CV
                cvEmbed.style.display = 'none';
                this.innerHTML = '<i class="fas fa-eye"></i> Visualizar';
            }
        });
    }
    
    /**
     * Funções específicas da página inicial
     */
    
    // Animação dos números de estatística
    function animateStatNumbers() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    
                    // Verifica se é um stat de texto (sem animação numérica)
                    if (counter.classList.contains('stat-text')) {
                        observer.unobserve(counter);
                        return;
                    }

                    const target = parseInt(counter.getAttribute('data-target'));
                    if (!target) return; // Skip se não tiver um target válido
                    
                    const duration = 2000; // 2 segundos
                    let startTime;
                    
                    function updateCounter(timestamp) {
                        if (!startTime) startTime = timestamp;
                        
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        const currentValue = Math.floor(progress * target);
                        
                        counter.textContent = currentValue + (target >= 20 ? '+' : ''); // Adiciona o + para valores >= 20
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + (target >= 20 ? '+' : ''); // Adiciona o + no valor final
                        }
                    }
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        statCounters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Animação das barras de progresso
    function animateSkillBars() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width') || '0%';
                    
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Configuração de cartões de experiência
    function setupExperienceCards() {
        experienceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('expanded');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('expanded');
            });
        });
    }
    
    // Inicializar galeria de projetos
    function initProjectsGallery() {
        const projects = document.querySelectorAll('.project-item');
        const filterButtons = document.querySelectorAll('.filter-button');
        
        // Filtro de projetos
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const category = button.getAttribute('data-filter');
                    
                    // Atualiza botão ativo
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    
                    // Filtra projetos
                    projects.forEach(project => {
                        const projectCategory = project.getAttribute('data-category');
                        
                        if (category === 'all' || projectCategory === category) {
                            project.style.display = 'block';
                            setTimeout(() => {
                                project.classList.remove('hidden');
                            }, 100);
                        } else {
                            project.classList.add('hidden');
                            setTimeout(() => {
                                project.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
        
        // Efeito de hover em projetos
        projects.forEach(project => {
            const overlay = project.querySelector('.project-overlay');
            
            if (overlay) {
                project.addEventListener('mouseenter', () => {
                    overlay.classList.add('visible');
                });
                
                project.addEventListener('mouseleave', () => {
                    overlay.classList.remove('visible');
                });
            }
        });
    }
});
