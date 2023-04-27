//import axios from 'axios';

axios.defaults.headers.common['Authorization'] = 'HAhrm2YBNzdkMeFVvtcKkwy3';    //token de autorização para acessar a API

//vetor que vai guardar os dados das camisas já compradas
let showCards = [];
//variavel global q guarda o nome do user
let nameUSer;
 
function toggleSelectedModel(event) {
    
    // Seleciona todos os botões da classe camisa
    let botoes = document.querySelectorAll(".model");
    // Percorre os botões e verifica se algum deles tem a classe selected
    for (let botao of botoes) {
      if (botao.classList.contains("selected")) {
        // Se sim, remove a classe selected desse botão
        botao.classList.remove("selected"); 
      }
    }
    // Adiciona a classe selected ao botão que foi clicado
    event.classList.add("selected");
    confirmarEncomenda();
  }

  function toggleSelectedNeck(event) {
    
    // Seleciona todos os botões da classe camisa
    let botoes = document.querySelectorAll(".neck");
    // Percorre os botões e verifica se algum deles tem a classe selected
    for (let botao of botoes) {
      if (botao.classList.contains("selected")) {
        // Se sim, remove a classe selected desse botão
        botao.classList.remove("selected");
      }
    }
    // Adiciona a classe selected ao botão que foi clicado
    event.classList.add("selected");
    confirmarEncomenda();
  }

  function toggleSelectedMaterial(event) {
    
    // Seleciona todos os botões da classe camisa
    let botoes = document.querySelectorAll(".material");
    // Percorre os botões e verifica se algum deles tem a classe selected
    for (let botao of botoes) {
      if (botao.classList.contains("selected")) {
        // Se sim, remove a classe selected desse botão
        botao.classList.remove("selected");
      }
    }
    // Adiciona a classe selected ao botão que foi clicado
    event.classList.add("selected");
    confirmarEncomenda();
  }

  function callName(){
      nameUSer = prompt("Insira seu nome:");
      console.log(nameUSer);
      const aux = document.querySelector(".saudacao");
      aux.innerHTML = `Ola,<strong> ${nameUSer}</strong>`;
  }

  function confirmarEncomenda() {
    // Seleciona o botão desabilitado
    let botao = document.querySelector(".send");
    // Seleciona os itens das classes model, neck e material que possuem a tag selectedd
    let itens = document.querySelectorAll(".model.selected, .neck.selected, .material.selected");
    // Seleciona o input de texto
    let input = document.querySelector("input[type=text]");
    // Define uma variável para contar quantos itens têm a classe selected
    let contagem = 0;
    // Percorre os itens e verifica se eles têm a classe selected
    for (let item of itens) {
      if (item.classList.contains("selected")) {
        // Se sim, incrementa a contagem
        contagem++;
      }
    }
    //console.log("indo até aqui");
    // Verifica se o número de itens é igual a 3(a quantidade de seleções que deveria ocorrer) e se o input tem algum valor
    if (3 == itens.length && input.value) {
      // Se sim, remove a classe off do botão
      botao.removeAttribute('disabled');
      console.log("habilitou");
    }
  }

  //função q realiza o POST enviando os dados inseridos pelo usuario
  function send(){
    const modelo = document.querySelector(".model .selected");
    const gola = document.querySelector(".neck .selected");
    const tecido = document.querySelector(".material .selected");
    const img =  document.querySelector("input[type=text]");

    const modVal = modelo.attr('name');
    const golaVal = gola.attr('name');
    const tecidoVal = tecido.attr('name');
    const imgVal = img.attr('name');

    const dados = {
      "model": modVal,
      "neck": golaVal,
      "material": tecidoVal,
      "image": imgVal,
      "owner": nameUSer,
      "author": nameUSer
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',dados);
    promise.then((res) => {
      console.log(res);
     });
    promise.catch((err) => {
        console.log(err)
    });
    console.log("deu boa");
  }

  //filtro geral que pega todos os tipos de camisa
  function filterAll(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    
    promise.then((res) => {
      showCards = res.data;
      console.log(showCards.length);
      
    const aux = showCards.slice(-5);
    console.log("issae");
    console.log(aux.length);  
    const card  = document.querySelector(".card");

    card.innerHTML = '';
    //for para exibir e add via innerHTMl os cards das ultimas requisições de pedidos
    for (let i = 0; i < aux.length; i++) {
      let shirt = aux[i];
      card.innerHTML += `
      
        <div class="img-card" onClick="escolheCamisa(this)" data-index="${shirt.id}">  
          <img src=${shirt.image}>
          <p><strong>Criador:</strong>${shirt.author}</p>
        </div>`;
      console.log("deu boaaa!");
    }
    });
    promise.catch((err) => {
        console.log(err)
    });
    console.log("deu boa salvar os dados");

    console.log("deu boa!");
  }

  //filtros por tipo de camisa
  function filterTShirt(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    
    promise.then((res) => {
      showCards = res.data;
      console.log(showCards.length);
      
    const aux = showCards.slice(-5);
    console.log("issae");
    console.log(aux.length);  
    const card  = document.querySelector(".card");

    card.innerHTML = '';
    //for para exibir e add via innerHTMl os cards das ultimas requisições de pedidos
    for (let i = 0; i < aux.length; i++) {
      let shirt = aux[i];
      if(shirt.model === "t-shirt"){
      card.innerHTML += `
        <div class="img-card" onClick="escolheCamisa(this)" data-index="${shirt.id}">  
          <img src=${shirt.image}>
          <p><strong>Criador:</strong>${shirt.author}</p>
        </div> `;

    }
      console.log("deu boaaa!");
    }
    });
    promise.catch((err) => {
        console.log(err)
    });
    console.log("deu boa salvar os dados");

    console.log("deu boa!");
  }

  function filterCamisa(){
     const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    
    promise.then((res) => {
      showCards = res.data;
      console.log(showCards.length);
      
    const aux = showCards.slice(-5);
    console.log("issae");
    console.log(aux.length);  
    const card  = document.querySelector(".card");
    card.innerHTML = '';
    //for para exibir e add via innerHTMl os cards das ultimas requisições de pedidos
    for (let i = 0; i < aux.length; i++) {
      let shirt = aux[i];
      if(shirt.model === "top-tank"){
      card.innerHTML += `
        <div class="img-card" onClick="escolheCamisa(this)" data-index="${shirt.id}">  
          <img src=${shirt.image}>
          <p><strong>Criador:</strong>${shirt.author}</p>
        </div>
        `;
    }
      console.log("deu boaaa!");
    }
    });
    promise.catch((err) => {
        console.log(err)
    });
    console.log("deu boa salvar os dados");

    console.log("deu boa!");
  }    

  function filterLong(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    
    promise.then((res) => {
      showCards = res.data;
      console.log(showCards.length);
      
    const aux = showCards.slice(-5);
    console.log("issae");
    console.log(aux.length);  
    const card  = document.querySelector(".card");

    card.innerHTML = '';
    //for para exibir e add via innerHTMl os cards das ultimas requisições de pedidos
    for (let i = 0; i < aux.length; i++) {
      let shirt = aux[i];
      if(shirt.model === "long"){
      card.innerHTML += `
      <div class="img-card" onClick="escolheCamisa(this)" data-index="${shirt.id}">  
          <img src=${shirt.image}>
          <p><strong>Criador:</strong>${shirt.author}</p>
        </div>
        `;
    }
      console.log("deu boaaa!");
    }
    });
    promise.catch((err) => {
        console.log(err)
    });
    console.log("deu boa salvar os dados");

    console.log("deu boa!");
  }

  function escolheCamisa(card){
    const aux = card.getAttribute('data-index');
    console.log(aux);
    
    for (let i = 0; i < showCards.length; i++) {
      const cardId = showCards[i];
      console.log(cardId.id);
        if (aux == cardId.id) {

          const dados = {
            "model": cardId.model,
            "neck": cardId.neck,
            "material": cardId.material,
            "image": cardId.image,
            "owner": nameUSer,
            "author": cardId.author
          };
        
          const promise = axios.post('https://mock-api.driven.com.br/api/v4/shirts-api/shirts',dados);
          promise.then((res) => {
            console.log(res);
           });
          promise.catch((err) => {
              console.log(err)
          });
          break;
        }
      
    }
  }

  callName();   //executando a chamada do nome 
  filterAll();