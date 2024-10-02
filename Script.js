const resultado = document.querySelector("#resultado");
const contadorItens = document.querySelector("#contador-itens");
const notification = document.createElement("div");
notification.className = "notification";
document.body.appendChild(notification);

function atualizarContador() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadorItens.textContent = totalItens;
}


async function buscar_produtos() {
    try {
        const resposta = await fetch('https://fakestoreapi.com/products');
        const dados = await resposta.json();

        dados.forEach((produto_da_vez) => {
            const card = document.createElement("div");
            card.className = "card";

            const imagem = document.createElement("img");
            imagem.src = produto_da_vez.image;

            const preco = document.createElement("p");
            preco.textContent = `R$ ${produto_da_vez.price}`;
            preco.className = "price";

            const botao = document.createElement("button");
            botao.textContent = "Comprar";
            botao.className = "botao";

            botao.addEventListener("click", () => {
                adicionarAoCarrinho(produto_da_vez);
                mostrarNotificacao(`${produto_da_vez.title} foi adicionado ao carrinho!`);
                atualizarContador();
            });

            card.append(imagem, preco, botao);
            resultado.append(card);
        });
    } catch (error) {
        console.log(error);
        resultado.textContent = "Deu erro!";
    }
}


function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}


function mostrarNotificacao(mensagem) {
    notification.textContent = mensagem;
    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

atualizarContador();
buscar_produtos();
