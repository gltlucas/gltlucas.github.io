// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Animation du texte dactylographié améliorée
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Détection du type d'appareil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
           || window.innerWidth <= 768;
}

// Terminal interactif (uniquement PC)
class InteractiveTerminal {
    constructor() {
        this.currentPath = '/home/lucas';
        this.commandHistory = [];
        this.historyIndex = -1;
        this.isInteractive = !isMobileDevice();
        
        // Système de fichiers virtuel
        this.fileSystem = {
            '/home/lucas': {
                type: 'directory',
                contents: ['projets', 'documents', 'skills.txt', 'about.txt']
            },
            '/home/lucas/projets': {
                type: 'directory',
                contents: ['flags_ios.md', 'password_generator.md', 'python_keylogger.md']
            },
            '/home/lucas/skills.txt': {
                type: 'file',
                content: `=== Compétences de Lucas ===

🚀 Développement:
   • Python (Débutant)
   • Qt/PyQt (Débutant)
   • Swift (Débutant)
   • JavaScript (Débutant)

🔒 Cybersécurité:
   • Keyloggers éducatifs

🛠️ Outils & Frameworks:
   • Git/GitHub
   • Linux
   • CLI Tools
   • GUI Development`
            },
            '/home/lucas/about.txt': {
                type: 'file',
                content: `=== À propos de Lucas Guilloteau ===

🎓 Formation: BTS CIEL (Cybersécurité, Informatique et réseaux, ELectronique)
📍 Localisation: France
💼 Statut: Étudiant passionné

🎯 Passion:
Développement d'applications sécurisées, 
et exploration des technologies innovantes.

📊 Statistiques:
• 3+ projets personnels sur GitHub
• 4 domaines d'expertise technique
• ∞ passion pour l'apprentissage continu

🔗 Contact:
• Email: lucas.guilloteau1@gmail.com
• GitHub: gitdreamlteui
• LinkedIn: lucas-guilloteau-539415196`
            },
            '/home/lucas/projets/flags_ios.md': {
                type: 'file',
                content: `# 🇫🇷 Flags iOS

## Description
Projet visant à faire un diffing entre différentes versions d'un fichier de commutateur de fonctionnalités

## Repository
🔗 https://github.com/gitdreamlteui/flags_ios

## Statut
🟢 Actif - En développement continu`
            },
            '/home/lucas/projets/password_generator.md': {
                type: 'file',
                content: `# 🔐 Password Generator

## Description
Générateur de mots de passe sécurisé développé en Python avec une interface 
graphique moderne utilisant Qt/PyQt pour une expérience utilisateur optimale.

## Technologies
• **Langage:** Python 3.x
• **GUI Framework:** PyQt5/6
• **Cryptographie:** Modules de sécurité Python
• **Architecture:** MVC Pattern

## Fonctionnalités de sécurité
🔒 Génération de mots de passe cryptographiquement sécurisés
🔒 Personnalisation des critères (longueur, caractères spéciaux)
🔒 Interface intuitive et responsive
🔒 Validation en temps réel de la robustesse

## Repository
🔗 https://github.com/gitdreamlteui/passwordGenerator-python

## Utilisation
Idéal pour générer des mots de passe robustes pour 
sécuriser vos comptes et applications.`
            },
            '/home/lucas/projets/python_keylogger.md': {
                type: 'file',
                content: `# ⌨️ Python Keylogger

## Description
Keylogger éducatif développé en Python dans un cadre d'apprentissage 
de la cybersécurité et des techniques de surveillance système.

## ⚠️ Avertissement éthique
Ce projet est strictement éducatif et destiné à:
• Comprendre les mécanismes de surveillance
• Apprendre les techniques de cybersécurité
• Développer des contre-mesures

## Technologies
• **Langage:** Python 3.x
• **Modules:** pynput, logging, os
• **Plateforme:** Multi-OS (Windows, Linux, macOS)

## Fonctionnalités éducatives
📚 Capture de frappes clavier
📚 Logging structuré et sécurisé
📚 Analyse des patterns de frappe
📚 Documentation complète du code

## Repository
🔗 https://github.com/gitdreamlteui/PythonKeylogger

## Usage responsable
🚨 Utilisation uniquement sur vos propres systèmes
🚨 Respect de la vie privée et des lois en vigueur`
            }
        };

        this.init();
    }

    init() {
        const terminalContent = document.getElementById('terminal-content');
        
        if (this.isInteractive) {
            this.setupInteractiveTerminal(terminalContent);
        } else {
            this.setupStaticTerminal(terminalContent);
        }
    }

    setupInteractiveTerminal(container) {
        container.innerHTML = `
            <div class="terminal-scrollable-content">
                <div class="terminal-line">
                    <span class="prompt">lucas@ciel:~$ </span>
                    <span class="output">Terminal interactif activé! Tapez 'help' pour voir les commandes.</span>
                </div>
                <div class="terminal-line">
                    <span class="prompt">lucas@ciel:~$ </span>
                    <span class="output">💡 Essayez: whoami, ls, cd projets, cat about.txt</span>
                </div>
            </div>
            <div class="terminal-input-line">
                <span class="prompt">lucas@ciel:${this.currentPath.replace('/home/lucas', '~')}$ </span>
                <input type="text" class="terminal-input" autocomplete="off" spellcheck="false" placeholder="Tapez une commande...">
            </div>
        `;

        const input = container.querySelector('.terminal-input');
        input.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Focus automatique après un délai pour éviter les conflits
        setTimeout(() => {
            input.focus();
        }, 100);

        // Refocus sur clic du terminal
        container.addEventListener('click', () => {
            setTimeout(() => input.focus(), 10);
        });
    }

    setupStaticTerminal(container) {
        // Animation originale pour mobile
        container.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">lucas@ciel:~$ </span>
                <span class="command typing">whoami</span>
            </div>
            <div class="terminal-line delay-1">
                <span class="output">Étudiant BTS CIEL - Développeur Python</span>
            </div>
            <div class="terminal-line delay-2">
                <span class="prompt">lucas@ciel:~$ </span>
                <span class="command">ls projets/</span>
            </div>
            <div class="terminal-line delay-3">
                <span class="output">flags_ios/ password_generator/ python_keylogger/ security_tools/</span>
            </div>
        `;
    }

    handleKeydown(e) {
        const input = e.target;

        if (e.key === 'Enter') {
            this.processCommand(input.value.trim());
            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.navigateHistory(-1, input);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.navigateHistory(1, input);
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete(input);
        }
    }

    processCommand(command) {
        if (command === '') return;

        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;

        const container = document.getElementById('terminal-content');
        const scrollableContent = container.querySelector('.terminal-scrollable-content');
        const inputLine = container.querySelector('.terminal-input-line');

        // Ajouter la commande au contenu scrollable
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-line';
        commandLine.innerHTML = `
            <span class="prompt">lucas@ciel:${this.currentPath.replace('/home/lucas', '~')}$ </span>
            <span class="command">${command}</span>
        `;
        scrollableContent.appendChild(commandLine);

        // Traiter la commande
        const output = this.executeCommand(command);
        if (output !== null && output !== '') {
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.innerHTML = `<span class="output">${output}</span>`;
            scrollableContent.appendChild(outputLine);
        }

        // Mettre à jour le prompt
        const prompt = inputLine.querySelector('.prompt');
        prompt.textContent = `lucas@ciel:${this.currentPath.replace('/home/lucas', '~')}$ `;

        // Focus sur l'input et scroll vers le bas
        const input = inputLine.querySelector('.terminal-input');
        setTimeout(() => {
            input.focus();
            // Scroll du conteneur principal vers le bas
            const terminalBody = container.parentElement;
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 10);
    }

    executeCommand(command) {
        const parts = command.split(' ');
        const cmd = parts[0];
        const args = parts.slice(1);

        switch (cmd) {
            case 'help':
                return this.helpCommand();
            case 'whoami':
                return 'Lucas Guilloteau - Étudiant BTS CIEL';
            case 'pwd':
                return this.currentPath;
            case 'ls':
                return this.lsCommand(args[0]);
            case 'cd':
                return this.cdCommand(args[0]);
            case 'cat':
                return this.catCommand(args[0]);
            case 'clear':
                return this.clearCommand();
            case 'date':
                return new Date().toLocaleString('fr-FR', { 
                    timeZone: 'Europe/Paris',
                    dateStyle: 'full',
                    timeStyle: 'medium'
                });
            case 'uname':
                return 'Lucas-Portfolio-System v11.0 (BTS-CIEL-2025)';
            case 'echo':
                return args.join(' ');
            case 'tree':
                return this.treeCommand();
            case 'neofetch':
                return this.neofetchCommand();
            default:
                return `zsh: command not found: ${cmd}. Tapez 'help' pour voir les commandes disponibles.`;
        }
    }

    helpCommand() {
        return `<div style="color: var(--neon-blue);">🚀 Commandes disponibles:</div>
<br>
<strong style="color: var(--neon-green);">Navigation:</strong>
  ls [dossier]     - Lister les fichiers et dossiers
  cd [dossier]     - Changer de répertoire
  pwd              - Afficher le répertoire actuel
  tree             - Afficher l'arborescence

<strong style="color: var(--neon-purple);">Lecture de fichiers:</strong>
  cat [fichier]    - Afficher le contenu d'un fichier

<strong style="color: var(--neon-pink);">Informations:</strong>
  whoami           - Informations utilisateur
  date             - Date et heure actuelles
  uname            - Informations système
  neofetch         - Informations détaillées

<strong style="color: var(--neon-yellow);">Utilitaires:</strong>
  echo [texte]     - Afficher du texte
  clear            - Effacer l'écran
  help             - Afficher cette aide

<div style="color: var(--text-secondary); margin-top: 10px;">💡 Utilisez Tab pour l'auto-complétion et ↑/↓ pour l'historique</div>`;
    }

    lsCommand(path) {
        const targetPath = path ? this.resolvePath(path) : this.currentPath;
        const item = this.fileSystem[targetPath];

        if (!item) {
            return `ls: cannot access '${path}': No such file or directory`;
        }

        if (item.type !== 'directory') {
            return `ls: ${path}: Not a directory`;
        }

        return item.contents.map(name => {
            const itemPath = `${targetPath}/${name}`.replace(/\/+/g, '/');
            const itemData = this.fileSystem[itemPath];
            const isDir = itemData && itemData.type === 'directory';
            const color = isDir ? 'var(--neon-blue)' : 'var(--text-primary)';
            const suffix = isDir ? '/' : '';
            return `<span style="color: ${color}">${name}${suffix}</span>`;
        }).join('  ');
    }

    cdCommand(path) {
        if (!path || path === '~') {
            this.currentPath = '/home/lucas';
            return '';
        }

        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            if (parts.length > 2) { // Ne pas remonter au-dessus de /home/lucas
                parts.pop();
                this.currentPath = '/' + parts.join('/');
            }
            return '';
        }

        const targetPath = this.resolvePath(path);
        const item = this.fileSystem[targetPath];

        if (!item) {
            return `cd: no such file or directory: ${path}`;
        }

        if (item.type !== 'directory') {
            return `cd: not a directory: ${path}`;
        }

        this.currentPath = targetPath;
        return '';
    }

    catCommand(filename) {
        if (!filename) {
            return 'cat: missing file operand';
        }

        const filePath = this.resolvePath(filename);
        const file = this.fileSystem[filePath];

        if (!file) {
            return `cat: ${filename}: No such file or directory`;
        }

        if (file.type !== 'file') {
            return `cat: ${filename}: Is a directory`;
        }

        return file.content.replace(/\n/g, '<br>');
    }

    clearCommand() {
        const container = document.getElementById('terminal-content');
        const scrollableContent = container.querySelector('.terminal-scrollable-content');
        const inputLine = container.querySelector('.terminal-input-line');
        
        // Clear du contenu scrollable
        scrollableContent.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">lucas@ciel:~$ </span>
                <span class="output">Terminal effacé.</span>
            </div>
        `;
        
        // Focus sur l'input
        const input = inputLine.querySelector('.terminal-input');
        setTimeout(() => input.focus(), 10);
        
        return null;
    }

    treeCommand() {
        return `<span style="color: var(--neon-blue);">~</span>
├── <span style="color: var(--neon-blue);">projets/</span>
│   ├── <span style="color: var(--neon-green);">flags_ios.md</span>
│   ├── <span style="color: var(--neon-green);">password_generator.md</span>
│   └── <span style="color: var(--neon-green);">python_keylogger.md</span>
├── <span style="color: var(--neon-blue);">documents/</span>
├── <span style="color: var(--text-primary);">skills.txt</span>
└── <span style="color: var(--text-primary);">about.txt</span>`;
    }

    neofetchCommand() {
        return `<pre style="color: var(--neon-blue); line-height: 1.2; font-family: monospace;">
██╗     ██╗   ██╗ ██████╗ █████╗ ███████╗
██║     ██║   ██║██╔════╝██╔══██╗██╔════╝
██║     ██║   ██║██║     ███████║███████╗
██║     ██║   ██║██║     ██╔══██║╚════██║
███████╗╚██████╔╝╚██████╗██║  ██║███████║
╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝
</pre>
<br>
<strong style="color: var(--neon-green);">lucas</strong><span style="color: var(--text-secondary);">@</span><strong style="color: var(--neon-green);">ciel-portfolio</strong>
<span style="color: var(--text-secondary);">─────────────────────────</span>
<strong style="color: var(--neon-blue);">OS:</strong> Portfolio Linux v11.0
<strong style="color: var(--neon-blue);">Formation:</strong> BTS CIEL 
<strong style="color: var(--neon-blue);">Spécialité:</strong> Dev
<strong style="color: var(--neon-blue);">Langages:</strong> Python, Swift, JS
<strong style="color: var(--neon-blue);">Projets:</strong> 3+ sur GitHub
<strong style="color: var(--neon-blue);">Terminal:</strong> Interactive v11.0
<strong style="color: var(--neon-blue);">Uptime:</strong> ${new Date().getFullYear() - 2023} ans en dev`;
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }
        return `${this.currentPath}/${path}`.replace(/\/+/g, '/');
    }

    navigateHistory(direction, input) {
        if (this.commandHistory.length === 0) return;

        this.historyIndex += direction;
        
        if (this.historyIndex < 0) {
            this.historyIndex = 0;
        } else if (this.historyIndex >= this.commandHistory.length) {
            this.historyIndex = this.commandHistory.length;
            input.value = '';
            return;
        }

        input.value = this.commandHistory[this.historyIndex] || '';
    }

    autoComplete(input) {
        const value = input.value;
        const parts = value.split(' ');
        const currentArg = parts[parts.length - 1];

        // Auto-complétion pour les commandes
        if (parts.length === 1) {
            const commands = ['help', 'whoami', 'pwd', 'ls', 'cd', 'cat', 'clear', 'date', 'uname', 'echo', 'tree', 'neofetch'];
            const matches = commands.filter(cmd => cmd.startsWith(currentArg));
            
            if (matches.length === 1) {
                input.value = matches[0] + ' ';
            }
        }
        // Auto-complétion pour les fichiers/dossiers
        else if (parts[0] === 'ls' || parts[0] === 'cd' || parts[0] === 'cat') {
            const currentDir = this.fileSystem[this.currentPath];
            if (currentDir && currentDir.contents) {
                const matches = currentDir.contents.filter(item => item.startsWith(currentArg));
                
                if (matches.length === 1) {
                    parts[parts.length - 1] = matches[0];
                    input.value = parts.join(' ') + ' ';
                }
            }
        }
    }
}

// Initialiser l'animation de frappe (seulement si non interactif)
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le terminal
    new InteractiveTerminal();

    // Animation de frappe pour le titre seulement
    const txtElement = document.querySelector('.typing-animation');
    const words = [
        'Lucas Guilloteau',
        'Étudiant BTS CIEL'
    ];
    
    if (txtElement) {
        new TypeWriter(txtElement, words, 2500);
    }
});

// Smooth scroll pour la navigation
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

// Animation au scroll optimisée
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Effet parallaxe optimisé
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.2;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    ticking = false;
}

function requestParallaxTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestParallaxTick);

// Navigation active améliorée avec effet visuel
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Gestion améliorée du bouton retour en haut
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        // Cacher le bouton initialement
        backToTop.style.opacity = '0';
        backToTop.style.transform = 'translateY(20px)';
        backToTop.style.pointerEvents = 'none';
        
        // Montrer/cacher selon le scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(20px)';
                backToTop.style.pointerEvents = 'none';
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Effets de particules pour les boutons
class ButtonParticleEffect {
    constructor() {
        this.init();
    }
    
    init() {
        const buttons = document.querySelectorAll('.btn, .project-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createParticles(e.target);
            });
        });
    }
    
    createParticles(element) {
        const rect = element.getBoundingClientRect();
        const particles = 6;
        
        for (let i = 0; i < particles; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = getComputedStyle(element).borderColor;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = rect.left + Math.random() * rect.width + 'px';
            particle.style.top = rect.top + Math.random() * rect.height + 'px';
            particle.style.boxShadow = `0 0 10px ${getComputedStyle(element).borderColor}`;
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            // Animation
            const animation = particle.animate([
                { 
                    transform: 'translateY(0) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translateY(-${20 + Math.random() * 20}px) scale(0)`, 
                    opacity: 0 
                }
            ], {
                duration: 800 + Math.random() * 400,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            };
        }
    }
}

// Système de notifications pour les interactions
class NotificationSystem {
    constructor() {
        this.container = this.createContainer();
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '10000';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.gap = '10px';
        document.body.appendChild(container);
        return container;
    }
    
    show(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '8px';
        notification.style.color = '#fff';
        notification.style.fontWeight = '500';
        notification.style.fontSize = '14px';
        notification.style.backdropFilter = 'blur(10px)';
        notification.style.border = '1px solid';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease';
        
        switch(type) {
            case 'success':
                notification.style.background = 'rgba(16, 185, 129, 0.2)';
                notification.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                notification.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3)';
                break;
            case 'error':
                notification.style.background = 'rgba(239, 68, 68, 0.2)';
                notification.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                notification.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.3)';
                break;
            default:
                notification.style.background = 'rgba(0, 245, 255, 0.2)';
                notification.style.borderColor = 'rgba(0, 245, 255, 0.5)';
                notification.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
        }
        
        this.container.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto-remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialisation des systèmes
document.addEventListener('DOMContentLoaded', () => {
    const particleEffect = new ButtonParticleEffect();
    const notifications = new NotificationSystem();
    
    // Notification spéciale pour le terminal interactif
    if (!isMobileDevice()) {
        setTimeout(() => {
            notifications.show('🖥️ Terminal interactif disponible! Tapez "help" pour commencer.', 'info');
        }, 2000);
    }
    
    // Ajouter des notifications pour les liens externes
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', () => {
            notifications.show('Ouverture dans un nouvel onglet...', 'info');
        });
    });
    
    // Notification pour les liens de contact
    document.querySelectorAll('.btn-contact').forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.href.includes('mailto:')) {
                notifications.show('Ouverture de votre client email...', 'success');
            } else {
                notifications.show('Redirection vers le profil...', 'info');
            }
        });
    });
});

// Performance: pause les animations quand l'onglet n'est pas visible
document.addEventListener('visibilitychange', () => {
    const allAnimatedElements = document.querySelectorAll('.skill-card, .project-card, .terminal-line');
    
    if (document.hidden) {
        allAnimatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    } else {
        allAnimatedElements.forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }
});

// Amélioration de l'accessibilité
document.addEventListener('DOMContentLoaded', () => {
    // Ajouter des rôles ARIA
    const nav = document.querySelector('.navbar');
    if (nav) nav.setAttribute('role', 'navigation');
    
    // Gérer la navigation au clavier avec feedback visuel amélioré
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            const activeElement = document.activeElement;
            if (activeElement && (activeElement.classList.contains('btn') || activeElement.classList.contains('nav-link'))) {
                activeElement.style.outline = '2px solid currentColor';
                activeElement.style.outlineOffset = '2px';
            }
        }
    });
    
    // Effacer l'outline quand on clique
    document.addEventListener('mousedown', () => {
        document.querySelectorAll('.btn, .nav-link').forEach(el => {
            el.style.outline = 'none';
        });
    });
});

// Theme switcher easter egg (mode Matrix)
let clickCount = 0;
let clickTimeout;

document.querySelector('.nav-logo').addEventListener('click', () => {
    clickCount++;
    
    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
        clickCount = 0;
    }, 3000);
    
    if (clickCount === 5) {
        document.body.classList.add('matrix-mode');
        const notifications = new NotificationSystem();
        notifications.show('Mode Matrix activé! 🎃', 'success');
        
        // Auto-disable après 10 secondes
        setTimeout(() => {
            document.body.classList.remove('matrix-mode');
            notifications.show('Retour au mode normal', 'info');
        }, 10000);
        
        clickCount = 0;
    }
});

// Optimisation des performances de scroll
let scrollTimeout;
let isScrolling = false;

window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Code de scroll optimisé ici
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Easter egg : konami code amélioré
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activé avec plus d'effets !
            document.body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
            document.body.style.transform = 'scale(1.02)';
            
            const notifications = new NotificationSystem();
            notifications.show('🎮 Konami Code activé! Félicitations!', 'success');
            
            setTimeout(() => {
                document.body.style.filter = 'none';
                document.body.style.transform = 'none';
            }, 3000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Système de commentaires cachés
const easterEggs = [
    "Python > tout! 🐍",
    "Keep coding! ⌨️",
];

// Random easter egg au hover sur le terminal
document.querySelector('.terminal')?.addEventListener('mouseenter', () => {
    if (Math.random() < 0.1) { // 10% de chance
        const notifications = new NotificationSystem();
        const randomEgg = easterEggs[Math.floor(Math.random() * easterEggs.length)];
        notifications.show(randomEgg, 'info');
    }
});

console.log('🚀 Portfolio Lucas Guilloteau v11.0 - BTS CIEL loaded successfully!');
console.log('🔧 Bugs corrigés: ASCII art neofetch + prompt sticky!');
console.log('💻 Terminal interactif optimisé sur PC!');
console.log('✨ Nouvelles commandes: help, whoami, ls, cd, cat, tree, neofetch...');
console.log('💡 Try the konami code for a surprise! ↑↑↓↓←→←→BA');
console.log('🎨 Click 5 times on the logo for Matrix mode!');
console.log('🔍 Hover over the terminal for random easter eggs!');