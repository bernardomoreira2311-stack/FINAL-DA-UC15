let produtosPadrao = [
  {
    id: 1,
    nome: "Camisa Brasil 2026",
    descricao: "Camisa para torcer pelo Brasil na Copa.",
    preco: 199.90,
    categoria: "Camisas",
    tamanho: "P, M, G, GG",
    cor: "Amarela",
    imagem: "assets/img/camisa do brasil.jpg",
    quantidade: 20
  },
  {
    id: 2,
    nome: "Camisa Argentina 2026",
    descricao: "Camisa da seleção argentina.",
    preco: 189.90,
    categoria: "Camisas",
    tamanho: "P, M, G, GG",
    cor: "Azul e branca",
    imagem: "assets/img/camisa da argentina.jpg",
    quantidade: 15
  },
  {
    id: 3,
    nome: "Boné Copa 2026",
    descricao: "Boné personalizado da Copa.",
    preco: 69.90,
    categoria: "Bonés",
    tamanho: "Único",
    cor: "Azul",
    imagem: "assets/img/boné da copa.jpg",
    quantidade: 30
  },
  {
    id: 4,
    nome: "Chuteira Campo",
    descricao: "Chuteira confortável para jogar futebol.",
    preco: 1499.90,
    categoria: "Chuteiras",
    tamanho: "38 ao 44",
    cor: "Preta",
    imagem: "assets/img/chuteira.jpg",
    quantidade: 12
  },
  {
    id: 5,
    nome: "Bandeira do Brasil",
    descricao: "Bandeira para decorar nos dias de jogo.",
    preco: 39.90,
    categoria: "Acessórios",
    tamanho: "Grande",
    cor: "Verde e amarela",
    imagem: "assets/img/bandeira do brasil.jpg",
    quantidade: 40
  },
  {
    id: 6,
    nome: "Copo Copa 2026",
    descricao: "Copo personalizado da Copa.",
    preco: 24.90,
    categoria: "Acessórios",
    tamanho: "500ml",
    cor: "Transparente",
    imagem: "assets/img/copo da copa.jpg",
    quantidade: 35
  },
  {
    id: 7,
    nome: "Bola Copa 2026",
    descricao: "Bola temática da Copa.",
    preco: 149.90,
    categoria: "Outros",
    tamanho: "Oficial",
    cor: "Branca",
    imagem: "assets/img/bola da copa.jpg",
    quantidade: 16
  },
  {
    id: 8,
    nome: "Mochila Copa 2026",
    descricao: "Mochila esportiva personalizada.",
    preco: 119.90,
    categoria: "Outros",
    tamanho: "Média",
    cor: "Preta",
    imagem: "assets/img/mochila da copa.jpg",
    quantidade: 10
  }
];

let produtosSalvos = JSON.parse(localStorage.getItem("produtos")) || [];
let produtos = produtosPadrao.concat(produtosSalvos);
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function mostrarProdutos(lista) {
  let areaProdutos = document.getElementById("listaProdutos");

  if (!areaProdutos) {
    return;
  }

  areaProdutos.innerHTML = "";

  lista.forEach(function(produto) {
    areaProdutos.innerHTML += `
      <div class="card">
        <img src="${produto.imagem}" alt="${produto.nome}">

        <h3>${produto.nome}</h3>

        <p>${produto.descricao}</p>
        <p><strong>Categoria:</strong> ${produto.categoria}</p>
        <p><strong>Tamanho:</strong> ${produto.tamanho}</p>
        <p><strong>Cor:</strong> ${produto.cor}</p>
        <p><strong>Disponível:</strong> ${produto.quantidade}</p>

        <p class="preco">R$ ${produto.preco.toFixed(2).replace(".", ",")}</p>

        <button onclick="verDetalhes(${produto.id})">Ver detalhes</button>
        <button onclick="adicionarCarrinho(${produto.id})">Adicionar ao carrinho</button>
      </div>
    `;
  });
}

function verDetalhes(id) {
  let produto = produtos.find(function(item) {
    return item.id === id;
  });

  alert(
    "Produto: " + produto.nome +
    "\nDescrição: " + produto.descricao +
    "\nPreço: R$ " + produto.preco.toFixed(2).replace(".", ",") +
    "\nCategoria: " + produto.categoria +
    "\nTamanho: " + produto.tamanho +
    "\nCor: " + produto.cor +
    "\nQuantidade disponível: " + produto.quantidade
  );
}

function adicionarCarrinho(id) {
  let produto = produtos.find(function(item) {
    return item.id === id;
  });

  if (!produto) {
    alert("Produto não encontrado. Recarregue a página e tente novamente.");
    return;
  }

  let itemCarrinho = carrinho.find(function(item) {
    return item.id === id;
  });

  if (itemCarrinho) {
    itemCarrinho.quantidadeCarrinho++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidadeCarrinho: 1
    });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarCarrinho();

  alert("Produto adicionado ao carrinho!");
}

function mostrarCarrinho() {
  let areaCarrinho = document.getElementById("listaCarrinho");
  let areaTotal = document.getElementById("total");

  if (!areaCarrinho || !areaTotal) {
    return;
  }

  areaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    areaCarrinho.innerHTML = "<p>Seu carrinho está vazio.</p>";
  }

  let totalCompra = 0;

  carrinho.forEach(function(item) {
    let subtotal = item.preco * item.quantidadeCarrinho;
    totalCompra += subtotal;

    areaCarrinho.innerHTML += `
      <div class="item-carrinho">
        <img src="${item.imagem}" alt="${item.nome}">

        <div>
          <h4>${item.nome}</h4>
          <p>Preço: R$ ${item.preco.toFixed(2).replace(".", ",")}</p>
          <p>Quantidade: ${item.quantidadeCarrinho}</p>
          <p>Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}</p>
        </div>

        <div>
          <button onclick="diminuirQuantidade(${item.id})">-</button>
          <button onclick="aumentarQuantidade(${item.id})">+</button>
          <button onclick="removerCarrinho(${item.id})" class="btn-vermelho">Remover</button>
        </div>
      </div>
    `;
  });

  areaTotal.innerHTML = "Total: R$ " + totalCompra.toFixed(2).replace(".", ",");
}

function aumentarQuantidade(id) {
  let item = carrinho.find(function(produto) {
    return produto.id === id;
  });

  item.quantidadeCarrinho++;

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarCarrinho();
}

function diminuirQuantidade(id) {
  let item = carrinho.find(function(produto) {
    return produto.id === id;
  });

  if (item.quantidadeCarrinho > 1) {
    item.quantidadeCarrinho--;
  } else {
    removerCarrinho(id);
    return;
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarCarrinho();
}

function removerCarrinho(id) {
  carrinho = carrinho.filter(function(item) {
    return item.id !== id;
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarCarrinho();
}

function limparCarrinho() {
  carrinho = [];
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarCarrinho();

  alert("Carrinho limpo!");
}




function pagarCartao() {
  if (carrinho.length === 0) {
    alert("Adicione algum produto no carrinho antes de pagar.");
    return;
  }

  let nome = document.getElementById("nomeCartao").value.trim();
  let numero = document.getElementById("numeroCartao").value.replace(/\s+/g, "");
  let validade = document.getElementById("validadeCartao").value.trim();
  let cvv = document.getElementById("cvvCartao").value.trim();

  if (!nome || !numero || !validade || !cvv) {
    alert("Preencha todos os campos do cartão de crédito.");
    return;
  }

  if (!/^\d{13,19}$/.test(numero)) {
    alert("Número do cartão inválido. Use apenas números entre 13 e 19 dígitos.");
    return;
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(validade)) {
    alert("Validade inválida. Use o formato MM/AA.");
    return;
  }

  if (!/^\d{3,4}$/.test(cvv)) {
    alert("CVV inválido. Use 3 ou 4 dígitos.");
    return;
  }

  alert("Pagamento com cartão aprovado! Obrigado pela compra.");

  carrinho = [];
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  mostrarCarrinho();

  document.getElementById("nomeCartao").value = "";
  document.getElementById("numeroCartao").value = "";
  document.getElementById("validadeCartao").value = "";
  document.getElementById("cvvCartao").value = "";
}

function filtrarProdutos() {
  let texto = document.getElementById("pesquisa").value.toLowerCase();
  let categoria = document.getElementById("filtroCategoria").value;

  let produtosFiltrados = produtos.filter(function(produto) {
    let nomeCombina = produto.nome.toLowerCase().includes(texto);
    let categoriaCombina = categoria === "Todos" || produto.categoria === categoria;

    return nomeCombina && categoriaCombina;
  });

  mostrarProdutos(produtosFiltrados);
}

function limparFiltros() {
  document.getElementById("pesquisa").value = "";
  document.getElementById("filtroCategoria").value = "Todos";

  mostrarProdutos(produtos);
}

function cadastrarProduto() {
  let nome = document.getElementById("nomeCadastro").value;
  let descricao = document.getElementById("descricaoCadastro").value;
  let preco = Number(document.getElementById("precoCadastro").value);
  let categoria = document.getElementById("categoriaCadastro").value;
  let tamanho = document.getElementById("tamanhoCadastro").value;
  let cor = document.getElementById("corCadastro").value;
  let quantidade = Number(document.getElementById("quantidadeCadastro").value);
  let imagem = document.getElementById("imagemCadastro").value;
  let mensagem = document.getElementById("mensagemCadastro");

  if (nome === "" || descricao === "" || preco === 0 || tamanho === "" || cor === "" || quantidade === 0 || imagem === "") {
    mensagem.innerHTML = "Preencha todos os campos!";
    return;
  }

  let novoProduto = {
    id: Date.now(),
    nome: nome,
    descricao: descricao,
    preco: preco,
    categoria: categoria,
    tamanho: tamanho,
    cor: cor,
    imagem: "img/" + imagem,
    quantidade: quantidade
  };

  produtosSalvos.push(novoProduto);

  localStorage.setItem("produtos", JSON.stringify(produtosSalvos));

  mensagem.innerHTML = "Produto cadastrado com sucesso!";

  limparCadastro();
}

function limparCadastro() {
  if (!document.getElementById("nomeCadastro")) {
    return;
  }

  document.getElementById("nomeCadastro").value = "";
  document.getElementById("descricaoCadastro").value = "";
  document.getElementById("precoCadastro").value = "";
  document.getElementById("tamanhoCadastro").value = "";
  document.getElementById("corCadastro").value = "";
  document.getElementById("quantidadeCadastro").value = "";
  document.getElementById("imagemCadastro").value = "";
}

function enviarContato() {
  let nome = document.getElementById("nomeContato").value;
  let email = document.getElementById("emailContato").value;
  let mensagem = document.getElementById("mensagemContato").value;
  let resposta = document.getElementById("respostaContato");

  if (nome === "" || email === "" || mensagem === "") {
    resposta.innerHTML = "Preencha todos os campos antes de enviar.";
  } else {
    resposta.innerHTML = "Mensagem enviada com sucesso! Em breve entraremos em contato.";
  }
}

function limparContato() {
  document.getElementById("nomeContato").value = "";
  document.getElementById("emailContato").value = "";
  document.getElementById("mensagemContato").value = "";
  document.getElementById("respostaContato").innerHTML = "";
}

function mostrarDica(texto) {
  document.getElementById("textoDica").innerHTML = texto;
}

function voltarInicio() {
  window.location.href = "index.html";
}

let imagensCarrossel = [
  "assets/img/banner da copa 2.jpg",
  "assets/img/banner da copa 3.png",
  "assets/img/banner da copa 4.jpg"
];
let indiceCarrossel = 0;

function atualizarIndicadores() {
  let indicadorContainer = document.getElementById("indicadoresCarrossel");
  if (!indicadorContainer) return;

  indicadorContainer.innerHTML = "";
  imagensCarrossel.forEach((_, index) => {
    let dot = document.createElement("button");
    dot.type = "button";
    dot.className = "carrossel-indicador";
    dot.setAttribute("aria-label", "Ir para o slide " + (index + 1));
    if (index === indiceCarrossel) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", function() {
      indiceCarrossel = index;
      atualizarCarrossel();
      reiniciarIntervaloCarrossel();
    });
    indicadorContainer.appendChild(dot);
  });
}

function atualizarCarrossel() {
  let banner = document.getElementById("imagemCarrossel");
  if (!banner) return;

  banner.src = imagensCarrossel[indiceCarrossel];
  atualizarIndicadores();
}

function slideAnterior() {
  indiceCarrossel = (indiceCarrossel - 1 + imagensCarrossel.length) % imagensCarrossel.length;
  atualizarCarrossel();
}

function proximoSlide() {
  indiceCarrossel = (indiceCarrossel + 1) % imagensCarrossel.length;
  atualizarCarrossel();
}

let intervaloCarrossel = setInterval(proximoSlide, 4000);

function reiniciarIntervaloCarrossel() {
  clearInterval(intervaloCarrossel);
  intervaloCarrossel = setInterval(proximoSlide, 4000);
}

let botaoPrev = document.getElementById("prevBtn");
let botaoNext = document.getElementById("nextBtn");

if (botaoPrev) {
  botaoPrev.addEventListener("click", function() {
    slideAnterior();
    reiniciarIntervaloCarrossel();
  });
}

if (botaoNext) {
  botaoNext.addEventListener("click", function() {
    proximoSlide();
    reiniciarIntervaloCarrossel();
  });
}

atualizarCarrossel();

let pesquisa = document.getElementById("pesquisa");
let filtroCategoria = document.getElementById("filtroCategoria");

if (pesquisa && filtroCategoria) {
  pesquisa.addEventListener("input", filtrarProdutos);
  filtroCategoria.addEventListener("change", filtrarProdutos);
}

mostrarProdutos(produtos);
mostrarCarrinho();