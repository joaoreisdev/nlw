function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => { return res.json()} )
    .then( states => {

        //.innerHTML propriedade de elemento html
        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //Limpa o conteúdo para popular as cidades de outro estado
    citySelect.innerHTML = ""
    citySelect.disabled = true

    fetch(url)
    .then( (res) => { return res.json()} )
    .then( cities => {

        //.innerHTML propriedade de elemento html
        for( const city of cities ){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false

    } )
}

//Procure o select que tenha o nome uf
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handSelectedItem)
}

//
let selectedItems = [2,3,5]

function handSelectedItem(event){
    
    const itemLi = event.target
    //Add or remove a class with JS, if exists remove and if doent exists add
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //Verificar se existem itens selecionados, se sim pegar os itens selecionados 
    const alreadySelected = selectedItems.findIndex(function(item) {
        return item == itemId 
    })
    console.log(alreadySelected != -1)
    //Se já estiver selecionado, tirar da seleção
    
    //Se não estive selecionado adicionar a seleção

    //Atualizar o campo escondido com os itens selecionados <input type="hidden" name="items">

    
}