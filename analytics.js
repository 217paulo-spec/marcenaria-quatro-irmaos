document.addEventListener("DOMContentLoaded", function () {

    /*
    Envia um evento para o Google Analytics somente
    quando a função gtag estiver disponível.
    */
    function enviarEvento(nomeDoEvento, parametros = {}) {
        if (typeof window.gtag !== "function") {
            console.warn(
                "Google Analytics ainda não está disponível:",
                nomeDoEvento
            );
            return;
        }

        window.gtag("event", nomeDoEvento, {
            ...parametros,
            transport_type: "beacon"
        });

        /*
        Esta mensagem aparece apenas no console do navegador
        e ajuda você a testar os eventos.
        */
        console.log("Evento enviado:", nomeDoEvento, parametros);
    }


    /* ==================================================
       1. CLIQUE NO WHATSAPP
    ================================================== */

    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]')
        .forEach(function (link) {

            link.addEventListener("click", function () {
                enviarEvento("click_whatsapp", {
                    link_text: link.innerText.trim(),
                    link_url: link.href,
                    page_path: window.location.pathname
                });
            });

        });


   
    /* ==================================================
       3. CLIQUE NO GOOGLE MAPS / ENDEREÇO
    ================================================== */

    document.querySelectorAll(
        'a[href*="google.com/maps"], ' +
        'a[href*="google.com.br/maps"], ' +
        'a[href*="maps.app.goo.gl"]'
    ).forEach(function (link) {

        link.addEventListener("click", function () {
            enviarEvento("click_maps", {
                link_text: link.innerText.trim(),
                link_url: link.href,
                page_path: window.location.pathname
            });
        });

    });


    /* ==================================================
       4. CLIQUE EM UMA FOTO DO PORTFÓLIO
    ================================================== */

    document.querySelectorAll(".lightbox-trigger")
        .forEach(function (botao) {

            botao.addEventListener("click", function () {
                const caminhoImagem =
                    botao.dataset.src ||
                    botao.querySelector("img")?.getAttribute("src") ||
                    "imagem_nao_identificada";

                const descricaoImagem =
                    botao.dataset.alt ||
                    botao.querySelector("img")?.getAttribute("alt") ||
                    "Sem descrição";

                const nomeGaleria =
                    botao.dataset.gallery ||
                    "galeria_nao_identificada";

                enviarEvento("abrir_foto", {
                    image_name: caminhoImagem,
                    image_description: descricaoImagem,
                    gallery_name: nomeGaleria,
                    page_path: window.location.pathname
                });
            });

        });


    /* ==================================================
       5. CLIQUE PARA ABRIR O PORTFÓLIO COMPLETO
    ================================================== */

    document.querySelectorAll('a[href*="projetos.html"]')
        .forEach(function (link) {

            link.addEventListener("click", function () {
                enviarEvento("click_portfolio", {
                    link_text: link.innerText.trim(),
                    link_url: link.href,
                    page_path: window.location.pathname
                });
            });

        });


    /* ==================================================
       6. ENTRADA NA PÁGINA DE PROJETOS
    ================================================== */

    const paginaAtual = window.location.pathname;

    if (
        paginaAtual.endsWith("/projetos.html") ||
        paginaAtual.endsWith("projetos.html")
    ) {
        enviarEvento("visualizar_portfolio", {
            page_title: document.title,
            page_path: paginaAtual
        });
    }

});