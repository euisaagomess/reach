// Aqui você irá adicionar o código JavaScript para:
// 1. Validar formulários de Cadastro/Login (temporário)
// 2. Controlar a navegação (se for um site de página única mais complexo)
// 3. (Futuramente) Fazer as chamadas (fetch/axios) para a API de Banco de Horas
// 4. (Futuramente) Exibir o Ranking de forma dinâmica

console.log("REACH - Script carregado! Pronto para a codificação da lógica do Banco de Tempo.");

// Exemplo de uma função futura:
/*
document.querySelector('.btn-cadastro').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Funcionalidade de Cadastro será ativada com JavaScript e Back-end!');
});
*/


document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos que devem ser animados (classe 'reveal')
    const revealElements = document.querySelectorAll('.reveal');

    // Define as opções para o Intersection Observer
    const options = {
        // Observa em relação ao viewport (janela do navegador)
        root: null,
        // O elemento é considerado visível 100px antes de atingir o fim da tela
        rootMargin: '0px 0px -100px 0px', 
        // 10% do elemento precisa estar visível para disparar o evento
        threshold: 0.1 
    };

    // Função de callback: O que acontece quando um elemento é observado
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Verifica se o elemento está entrando na área visível
            if (entry.isIntersecting) {
                // Adiciona a classe 'active', que dispara a animação CSS
                entry.target.classList.add('active');
                
                // Para de observar o elemento, pois ele já foi animado
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o observador
    const observer = new IntersectionObserver(observerCallback, options);

    // Inicia a observação em cada elemento
    revealElements.forEach(element => {
        observer.observe(element);
    });
});