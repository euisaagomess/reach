// =============================================================
// ARQUIVO: script.js
// FUNÇÕES ESSENCIAIS PARA O REACH - BANCO DE TEMPO
// =============================================================

// -------------------------------------------------------------
// 1. Controle do Menu de Navegação (para mobile)
// Embora a versão CSS inicial não tenha menu hambúrguer, é bom 
// já preparar a função de toggle para quando o layout responsivo
// for implementado.
// -------------------------------------------------------------
function toggleMobileMenu() {
    const navUl = document.querySelector('nav ul');
    if (navUl) {
        navUl.classList.toggle('active');
    }
}
// Exemplo de como você linkaria isso a um botão de menu no HTML:
// document.querySelector('.menu-icon').addEventListener('click', toggleMobileMenu);


// -------------------------------------------------------------
// 2. Simulação de Login (Apenas para demonstração)
// Em um sistema real, essa função faria uma requisição para o servidor.
// -------------------------------------------------------------
function handleLogin(event) {
    // Impede o envio padrão do formulário (que recarregaria a página)
    event.preventDefault(); 
    
    // Obter dados do formulário (assumindo que você tem campos 'username' e 'password')
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Simulação de verificação
        if (username === 'teste@reach.com' && password === '12345') {
            alert('Login realizado com sucesso! Bem-vindo(a) ao REACH.');
            // Redirecionar para a área do usuário (Perfil/Dashboard)
            window.location.href = 'dashboard.html'; 
        } else {
            alert('Usuário ou senha incorretos. Tente novamente.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}
// Para usar: Adicione um listener ao formulário de login (ex: no arquivo login.html)
// document.getElementById('login-form').addEventListener('submit', handleLogin);


// -------------------------------------------------------------
// 3. Simulação do Banco de Horas (Sistema de Créditos)
// Usando localStorage para simular o armazenamento do saldo.
// -------------------------------------------------------------
const STORAGE_KEY_HOURS = 'reach_user_hours_balance';

// Função para carregar o saldo do usuário
function loadHoursBalance() {
    const hours = localStorage.getItem(STORAGE_KEY_HOURS);
    // Retorna 5 horas como saldo inicial se não houver registro
    return hours ? parseInt(hours) : 5; 
}

// Função para atualizar e salvar o saldo
function updateHoursBalance(amount) {
    let currentHours = loadHoursBalance();
    currentHours += amount; // Adiciona ou subtrai o tempo
    
    // Garante que o saldo não seja negativo (opcional, dependendo da regra do negócio)
    if (currentHours < 0) {
        alert("Saldo de horas insuficiente para esta transação.");
        return loadHoursBalance();
    }

    localStorage.setItem(STORAGE_KEY_HOURS, currentHours);
    return currentHours;
}

// Exemplo de uso: Atualiza o saldo na interface (em uma dashboard, por exemplo)
function displayHoursBalance() {
    const balanceElement = document.getElementById('hours-balance-display');
    if (balanceElement) {
        balanceElement.textContent = loadHoursBalance() + ' Horas';
    }
}

// Exemplo de transação: Usuário ofereceu 2 horas de serviço (recebe crédito)
function creditHours(hours) {
    const newBalance = updateHoursBalance(hours);
    alert(`Crédito de ${hours} horas recebido! Novo saldo: ${newBalance} horas.`);
    displayHoursBalance();
}

// Exemplo de transação: Usuário solicitou 1 hora de serviço (gasta crédito)
function debitHours(hours) {
    const newBalance = updateHoursBalance(-hours);
    if (newBalance !== loadHoursBalance()) { // Se a transação foi bem-sucedida (não deu saldo negativo)
         alert(`Débito de ${hours} horas. Novo saldo: ${newBalance} horas.`);
    }
    displayHoursBalance();
}

// -------------------------------------------------------------
// 4. Validação Básica do Formulário de Contato
// -------------------------------------------------------------
function validateContactForm(event) {
    // Impede o envio padrão
    event.preventDefault(); 

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '' || email === '' || mensagem === '') {
        alert('Por favor, preencha todos os campos do formulário.');
        return false;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
        return false;
    }

    // Se tudo estiver OK, simula o envio
    alert('Mensagem enviada com sucesso! A equipe REACH entrará em contato em breve.');
    // Limpar o formulário (opcional)
    document.querySelector('.contact-form').reset();
    return true;
}


// -------------------------------------------------------------
// Inicialização do Site
// Adiciona os event listeners principais quando a página é carregada
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Adiciona o listener para o formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    // 2. Exibe o saldo inicial (se a página tiver o elemento)
    displayHoursBalance(); 
    
    // *Para testes rápidos do Banco de Horas no console:*
    // console.log('Saldo inicial:', loadHoursBalance());
    // creditHours(3); // Testa o crédito
    // debitHours(1);  // Testa o débito
});