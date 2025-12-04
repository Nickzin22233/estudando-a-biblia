// Configurações EmailJS
const EMAILJS_PUBLIC_KEY = 'vzrASHBVRACkvubnX';
const EMAILJS_CDN = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js';

// Carrega EmailJS dinamicamente se necessário e inicializa
function ensureEmailJsReady() {
    return new Promise((resolve, reject) => {
        if (typeof emailjs !== 'undefined') {
            try { emailjs.init('vzrASHBVRACkvubnX'); } catch (e) { console.warn('Erro no emailjs.init:', e); }
            console.log('EmailJS detectado e inicializado.');
            return resolve(emailjs);
        }

        const msg = 'EmailJS não está carregado. Verifique se o CDN é acessível ou se existe uma cópia local em assets/emailjs.browser.min.js';
        console.error(msg);
        reject(new Error(msg));
    });
}

// Array de versículos
const verses = [
    { text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", reference: "João 3:16" },
    { text: "Confiai no SENHOR de todo o vosso coração e não vos apoieis na vossa inteligência.", reference: "Provérbios 3:5" },
    { text: "Lançai toda a vossa ansiedade sobre ele, porque ele tem cuidado de vós.", reference: "1 Pedro 5:7" },
    { text: "Bem-aventurados os que têm fome e sede de justiça, porque serão fartos.", reference: "Mateus 5:6" },
    { text: "A paz vos deixo, minha paz vos dou; não a dou como a dá o mundo.", reference: "João 14:27" },
    { text: "Porque nele vivemos, nos movemos e existimos; como também alguns dos vossos poetas têm dito: Pois somos também geração dele.", reference: "Atos 17:28" },
    { text: "Todo aquele que invoca o nome do Senhor será salvo.", reference: "Romanos 10:13" },
    { text: "Posso todas as coisas naquele que me fortalece.", reference: "Filipenses 4:13" },
    { text: "Porque a palavra de Deus é viva, e eficaz, e mais penetrante do que espada alguma de dois gumes.", reference: "Hebreus 4:12" },
    { text: "Que a graça, a misericórdia e a paz da parte de Deus Pai e de Jesus Cristo, o Filho do Pai, estejam convosco na verdade e no amor.", reference: "2 João 1:3" },
    { text: "Porque o amor de Cristo nos coage, certos de que um morreu por todos.", reference: "2 Coríntios 5:14" },
    { text: "Bem-aventurado aquele cuja transgressão é perdoada, e cujo pecado é coberto.", reference: "Salmos 32:1" }
];

// Função para rolar para seção
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Função para enviar formulário
function submitForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const message = document.getElementById('userMessage').value;
    const statusMessage = document.getElementById('statusMessage');
    
    const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'seu_email@gmail.com'
    };
    // Mostrar feedback imediato
    if (statusMessage) {
        statusMessage.style.display = 'block';
        statusMessage.style.color = '#333';
        statusMessage.innerHTML = 'Enviando...';
    }

    // Primeiro: se a biblioteca EmailJS estiver presente, use-a; caso contrário, tente a API REST como fallback
    if (typeof emailjs !== 'undefined') {
        ensureEmailJsReady()
            .then(() => {
                console.log('EmailJS pronto. Enviando email com templateParams:', templateParams);
                return emailjs.send('service_i6cvjol', 'template_sbyf40i', templateParams);
            })
            .then((response) => {
                console.log('✓ Email enviado com sucesso! resposta:', response);
                if (statusMessage) {
                    statusMessage.style.display = 'block';
                    statusMessage.style.color = '#28a745';
                    const info = response && response.status ? ` (status ${response.status})` : '';
                    statusMessage.innerHTML = '✓ Mensagem enviada com sucesso!' + info;
                }

                const form = document.getElementById('contactForm');
                if (form) form.reset();

                setTimeout(() => {
                    if (statusMessage) statusMessage.style.display = 'none';
                }, 5000);
            })
            .catch((error) => {
                console.error('✗ Erro ao enviar email via emailjs:', error);
                // Tentar fallback REST
                sendWithFetch(templateParams)
                    .then((resp) => {
                        console.log('✓ Email enviado via API REST EmailJS:', resp);
                        if (statusMessage) {
                            statusMessage.style.display = 'block';
                            statusMessage.style.color = '#28a745';
                            statusMessage.innerHTML = '✓ Mensagem enviada com sucesso (via API REST)!';
                        }
                        const form = document.getElementById('contactForm');
                        if (form) form.reset();
                        setTimeout(() => { if (statusMessage) statusMessage.style.display = 'none'; }, 5000);
                    })
                    .catch((err2) => {
                        console.error('✗ Falha no fallback REST:', err2);
                        if (statusMessage) {
                            statusMessage.style.display = 'block';
                            statusMessage.style.color = '#dc3545';
                            let detail = '';
                            try {
                                if (err2 && err2.text) detail = ' — ' + err2.text;
                                else if (err2 && err2.message) detail = ' — ' + err2.message;
                                else if (typeof err2 === 'string') detail = ' — ' + err2;
                            } catch (e) { detail = ''; }
                            statusMessage.innerHTML = '✗ Erro ao enviar mensagem. Tente novamente.' + detail + ' (ver console)';
                        }
                    });
            });
    } else {
        // Biblioteca não disponível — tentar envio via REST
        sendWithFetch(templateParams)
            .then((resp) => {
                console.log('✓ Email enviado via API REST EmailJS:', resp);
                if (statusMessage) {
                    statusMessage.style.display = 'block';
                    statusMessage.style.color = '#28a745';
                    statusMessage.innerHTML = '✓ Mensagem enviada com sucesso (via API REST)!';
                }
                const form = document.getElementById('contactForm');
                if (form) form.reset();
                setTimeout(() => { if (statusMessage) statusMessage.style.display = 'none'; }, 5000);
            })
            .catch((err) => {
                console.error('✗ Falha ao enviar via API REST:', err);
                if (statusMessage) {
                    statusMessage.style.display = 'block';
                    statusMessage.style.color = '#dc3545';
                    let detail = '';
                    try {
                        if (err && err.text) detail = ' — ' + err.text;
                        else if (err && err.message) detail = ' — ' + err.message;
                        else if (typeof err === 'string') detail = ' — ' + err;
                    } catch (e) { detail = ''; }
                    statusMessage.innerHTML = '✗ Erro ao enviar mensagem. Tente novamente.' + detail + ' (ver console)';
                }
            });
    }
}


// Enviar via API REST do EmailJS (fallback sem biblioteca)
function sendWithFetch(templateParams) {
    const payload = {
        service_id: 'service_i6cvjol',
        template_id: 'template_sbyf40i',
        user_id: 'vzrASHBVRACkvubnX',
        template_params: templateParams
    };

    return fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(async (res) => {
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error('HTTP ' + res.status + ' - ' + text);
        }
        // A API pode retornar 200 com body vazio; apenas retornamos um indicador simples
        try { return await res.json(); } catch (e) { return { status: res.status }; }
    });
}

// Adicionar animações ao scroll
function addScrollAnimations() {
    const cards = document.querySelectorAll('.book-card, .resource-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideIn 0.6s ease-out';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// Adicionar estilos de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Efeito hover em links
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#ffd700';
    });
    link.addEventListener('mouseleave', function() {
        this.style.color = 'white';
    });
});

// Carregador automático
console.log('✓ Script.js carregado');
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('✓ DOM carregado');
        addScrollAnimations();
    });
} else {
    console.log('✓ DOM já estava pronto');
    addScrollAnimations();
}
