//Variaveis
const btnAdd = document.getElementById("btn")
const nome = document.getElementById("Nome")
const qtde = document.getElementById("Qtde")
const preco = document.getElementById("Preco")
const di = document.getElementById("lista")
const Hdid = document.getElementById("Hdid")
const total =  document.getElementById("total")

let listFeira = []

window.onload = function (){
   carregarList()
   SaldoTotal()
 }
 

btnAdd.addEventListener("click", (e)=>{
  e.preventDefault()
  addList()
  

})


function addList(){
   const regex = /^[a-zÀ-ú\s]+$/i;
   
  
  if(Hdid.value == ""){
    if(nome.value === "" || qtde.value === "" || preco.value ==="") {
    alert("preencha os campos")
  }
    else if(regex.test(nome.value.trim())===true){
    listFeira.push({
      id: listFeira.length + 1,
      name: nome.value,
      qtde: qtde.value,
      price: preco.value
      })
    }
    else{
      alert("Nome não pode conter números")
    }
   
  }
  else if(regex.test(nome.value.trim())===true) {
    listFeira.forEach((lista)=>{
      if(lista.id == Hdid.value){
        lista.name = nome.value
        lista.qtde = qtde.value
        lista.price = preco.value
      }
    })
  }
  else{
      alert("Nome não pode conter números")
    }
  /*if(nome.value == "" && qtde.value == "" && preco.value =="") {
    alert("preencha os campos")
  }
  else{
    listFeira.push({
      id: listFeira.length + 1,
      name: nome.value,
      qtde: qtde.value,
      price: preco.value
    })
  }*/

  setElementLocalStorage()
  carregarList()
  SaldoTotal()
  nome.value =""
  qtde.value =""
  preco.value =""
  
}



const criarItem = (item, index) =>{
  
  const div = document.createElement("div")
  div.innerHTML += `
     <div class="itens-list">
           <div class="itens">
             <p class="nome">${item.name}</p>
           </div>
           <div class="itens">
             <p class="qtde">${item.qtde}</p>
           </div>
           <div class="itens">
             <p>R$: ${item.price.replace(".",",")}</p>
           </div>
           <div class="itens">
              <button onclick="editar(${item.id})">
                <img src="img/edit.png" alt="">
              </button>
              <button onclick="deletar(${index})">
                <img srcset="" src="img/excluir.png" alt="">
              </button>
           </div>
      </div>
  
  `
  di.appendChild(div)
}

function carregarList(){
  listFeira = getElementLocalStorage();

  di.innerHTML = "";
  
  listFeira.forEach((item, index)=>{
    criarItem(item, index)
  })
}

function SaldoTotal(){
  
 const totaLista = listFeira.filter((itens)=>
   itens.qtde > 0 && itens.price > 0
 ).map((itens)=>{
   return itens.qtde * itens.price
 }).reduce((total,valor)=>{
   return total + valor 
 },0.00)
 total.innerText = "R$: " + totaLista.toFixed(2).replace(".",",")
  console.log(totaLista)
}


function editar(Id){
  listFeira.forEach((lista)=>{
    if (lista.id == Id) {
      Hdid.value = lista.id
      nome.value = lista.name
      qtde.value = lista.qtde
      preco.value = lista.price
      
    }
  })

}
  
function deletar(index){
  listFeira.splice(index, 1)
  setElementLocalStorage()
  carregarList()
  SaldoTotal()
}

const getElementLocalStorage = () => JSON.parse(localStorage.getItem("ListaFeira")) ??[]

const setElementLocalStorage = ()=>{
  localStorage.setItem("ListaFeira",JSON.stringify(listFeira))}