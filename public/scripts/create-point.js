//Popular as selects
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for(state of states) { 
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    
    const stateInput = document.querySelector("input[name=state]")
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value="">- Selecione -</option>'
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for(city of cities) { 
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
    citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//Pegando todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    //add or remove a class
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //verifying if there's any selected items, if so
    //bring up the selected items id's
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //true or false
        return itemFound
    })

    //If already selected, and clicked again,
    //remove it from selectedItems collection
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        //If not already selected, add item id to collection
        selectedItems.push(itemId)
    }

    //update hidden input with selected items id's
    collectedItems.value = selectedItems
}