/**
 * main.js - Scripts compartilhados entre index.html e sobre.html
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos principais
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTop = document.querySelector('.back-to-top');
    
    // Barra de progresso de rolagem
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    document.body.appendChild(progressBar);

    // Atualiza a barra de progresso ao rolar
    window.addEventListener('scroll', function() {
        // Atualiza a barra de progresso
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Atualiza o cabeçalho ao rolar
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostra/esconde o botão "voltar ao topo"
        if (window.scrollY > 300) {
            backToTop && backToTop.classList.add('visible');
        } else {
            backToTop && backToTop.classList.remove('visible');
        }
        
        // Revela elementos com animação ao rolar
        revealSections();
    });

    // Função de animação de elementos ao rolar
    function revealSections() {
        const sections = document.querySelectorAll('.reveal-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('active');
            }
        });
    }

    // Menu mobile toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('open')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        // Fecha o menu ao clicar em um link
        const navLinkItems = navLinks.querySelectorAll('a');
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            });
        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navLinks.contains(event.target) && 
                !mobileMenuToggle.contains(event.target)) {
                navLinks.classList.remove('open');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }

    // Botão voltar ao topo
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Links de rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Marca o link ativo no menu
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Atualiza o link ativo ao rolar
    window.addEventListener('scroll', setActiveNavLink);
    
    // Inicializa a animação de elementos
    revealSections();
    
    // Inicializa o link ativo
    setActiveNavLink();
});
