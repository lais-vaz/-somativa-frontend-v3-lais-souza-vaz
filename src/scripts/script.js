//Missão 1: Boas-vindas Literárias
const saudacao = document.querySelector('#saudacao-livraria')

const agora = new Date()
const hora = agora.getHours()

if (hora < 12)
{
    saudacao.textContent = "Boa leitura matinal!"
}

else if (hora >= 12 && hora <=18){
    
    saudacao.textContent = "Aproveite a tarde para ler!"
}

else if  (hora > 18){
    saudacao.textContent = "Uma boa história antes de dormir?"
}


///////////////////////////////////////////////////////
//Missão 2: Tema de Leitura
const banner = document.querySelector("#banner-cultura");

 banner.classList.add("mouseover", () => {
    classe .tema-sepia
  });

  banner.classList.remove("mouseout", () => {
    classe .tema-sepia 
  });

///////////////////////////////////////////////////////
//Missão 3: Calculadora de Coleção 
const quantidade = document.querySelector("#qtd-livros");
const precoTexto = document.querySelector("#total-pagar");

if (quantidade && precoTexto) {
    quantidade.addEventListener("input", () => {
        const precoUnitario = 42.0;
        const total = Number(quantidade.value) * precoUnitario;
        precoTexto.textContent = `R$ ${total.toFixed(2)}`;
    });
}

//Missão 4: Lista de Desejos
const botao = document.querySelector("btn-lista");
const texto = document.querySelector("nome-livro");
const lista = document.querySelector("lista-leitura");



//Missão 5: Arquivar Lista


