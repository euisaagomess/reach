document.addEventListener('DOMContentLoaded', () => {
    const toggleTheme = document.getElementById("toggleTheme");
    const rootHtml = document.documentElement;
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    const menuLinks = document.querySelectorAll(".menu-link");
    const menuHamburger = document.getElementById('menuHamburger');
    const menuMobile = document.getElementById('menuMobile');
    const icon = menuHamburger?.querySelector('i');
    const telefoneInput = document.getElementById("telefone");

    // --- 1. Alternar tema (claro/escuro) ---
    function changeTheme() {
        const currentTheme = rootHtml.getAttribute("data-theme");
        const isDark = currentTheme === "dark";
        rootHtml.setAttribute("data-theme", isDark ? "light" : "dark");
        
        // Alterna o ícone: Sol (para mudar para claro) | Lua (para mudar para escuro)
        if (toggleTheme) {
            toggleTheme.classList.toggle("bi-sun", !isDark);
            toggleTheme.classList.toggle("bi-moon-stars", isDark);
        }
    }

    if (toggleTheme) {
        // Inicializa o ícone correto baseado no tema atual
        const currentTheme = rootHtml.getAttribute("data-theme");
        if (currentTheme === "dark") {
            toggleTheme.classList.add("bi-sun"); // Mostra o sol para mudar para claro
        } else {
            toggleTheme.classList.add("bi-moon-stars"); // Mostra a lua para mudar para escuro
        }
        
        toggleTheme.addEventListener("click", changeTheme);
    }

    // --- 2. Acordeões (Seção "Sobre") ---
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const accordionItem = header.parentElement;
            const content = header.nextElementSibling;
            
            // Toggle de classe 'active'
            accordionItem.classList.toggle("active");
            
            // Ajusta a altura máxima para animar a abertura/fechamento
            if (accordionItem.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = "0";
            }
        });
    });

    // --- 3. Alternar menu mobile e ícone ---
    function closeMenu() {
        if (menuMobile) menuMobile.classList.remove('active');
        if (icon) {
            icon.classList.remove('bi-x-lg');
            icon.classList.add('bi-list');
        }
    }
    
    function toggleMenu() {
        if (!menuMobile) return;
        
        const isOpen = menuMobile.classList.toggle('active');
        if (icon) {
            icon.classList.toggle('bi-list', !isOpen);
            icon.classList.toggle('bi-x-lg', isOpen);
        }
    }

    if (menuHamburger) {
        menuHamburger.addEventListener('click', toggleMenu);
    }

    // Fecha o menu mobile ao clicar no link
    menuLinks.forEach(item => {
        item.addEventListener("click", () => {
            // Desativa todos os links ativos
            menuLinks.forEach(i => i.classList.remove("active"));
            // Ativa o link clicado (se você quiser manter o estado de link ativo)
            item.classList.add("active");

            // Fecha o menu mobile
            if (menuMobile?.classList.contains('active')) {
                closeMenu();
            }
        });
    });
    
    // --- 4. Máscara do telefone ---
    if (telefoneInput) {
        telefoneInput.addEventListener("input", (e) => {
            let input = e.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
            if (input.length > 11) input = input.slice(0, 11);

            let formatted = "";
            if (input.length > 0) formatted += "(" + input.slice(0, 2);
            if (input.length >= 3) formatted += ") " + input.slice(2, 7);
            if (input.length >= 8) formatted += "-" + input.slice(7, 11);

            e.target.value = formatted;
        });
    }

    // --- 5. Validação e envio do formulário (Simulação) ---
    const form = document.querySelector(".form-contato");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Impede a atualização da página

            // Validação de telefone
            const telefoneValor = telefoneInput?.value.replace(/\D/g, "");
            if (telefoneInput && (!telefoneValor || telefoneValor.length !== 11)) {
                alert("Por favor, insira um telefone válido com DDD e 9 dígitos (11 dígitos no total).");
                telefoneInput.focus();
                return;
            }

            // Simulação de envio
            // REMOVA ESTE TRECHO DE CÓDIGO SE VOCÊ FOR USAR UM SERVIÇO DE BACKEND REAL
            alert("Mensagem do REACH enviada com sucesso! Agradecemos seu contato.");
            form.reset();
            // FIM DA SIMULAÇÃO
            
            /*
            // TRECHO PARA ENVIO REAL (Se você tiver um backend/service como FormSubmit/Netlify Forms)
            const formData = new FormData(form);
            const action = form.getAttribute("action");

            try {
                const response = await fetch(action, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (response.ok) {
                    alert("Mensagem enviada com sucesso!");
                    form.reset();
                } else {
                    alert("Erro ao enviar a mensagem. Tente novamente.");
                }

            } catch (error) {
                alert("Erro de conexão. Verifique sua internet.");
            }
            */
        });
    }
});