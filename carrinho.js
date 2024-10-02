const resultado = document.querySelector("#resultado2");

function mostrarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length > 0) {
        let valorTotal = 0;
        resultado.innerHTML = ''; 

        carrinho.forEach((produto_da_vez) => {
            const card = document.createElement("div");
            card.className = "carrinho-item";

            const descricao = document.createElement("p");
            descricao.textContent = produto_da_vez.description;
            descricao.className = "description";

            const imagem = document.createElement("img");
            imagem.src = produto_da_vez.image;

            const preco = document.createElement("p");
            preco.textContent = `R$ ${produto_da_vez.price.toFixed(2)}`;
            preco.className = "price";

            const categoria = document.createElement("p");
            categoria.textContent = produto_da_vez.category;
            categoria.className = "category";

            const quantidade = document.createElement("p");
            quantidade.textContent = `Quantidade: ${produto_da_vez.quantidade}`;
            quantidade.className = "quantidade";

            const aumentarBtn = document.createElement("button");
            aumentarBtn.textContent = "+";
            aumentarBtn.className = "botao";
            aumentarBtn.onclick = () => {
                produto_da_vez.quantidade += 1;
                atualizarCarrinho(carrinho);
            };

            const diminuirBtn = document.createElement("button");
            diminuirBtn.textContent = "-";
            diminuirBtn.className = "botao";
            diminuirBtn.onclick = () => {
                if (produto_da_vez.quantidade > 1) {
                    produto_da_vez.quantidade -= 1;
                } else {
                    carrinho = carrinho.filter(item => item.id !== produto_da_vez.id);
                }
                atualizarCarrinho(carrinho);
            };

            const removerBtn = document.createElement("button");
            removerBtn.textContent = "Remover";
            removerBtn.className = "botao";
            removerBtn.onclick = () => {
                carrinho = carrinho.filter(item => item.id !== produto_da_vez.id);
                atualizarCarrinho(carrinho);
            };

            card.append(descricao, imagem, preco, categoria, quantidade, aumentarBtn, diminuirBtn, removerBtn);
            resultado.append(card);

            valorTotal += produto_da_vez.price * produto_da_vez.quantidade;
        });

        const total = document.createElement("p");
        total.textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
        total.className = "total";
        resultado.append(total);
    } else {
        resultado.textContent = "Nenhum produto no carrinho.";
    }
}

function atualizarCarrinho(carrinho) {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    mostrarCarrinho(); 
}

mostrarCarrinho();
