/*
Mostrar una lista en tarjetas de todos los pokemones en el json. Las tarjetas deben mostrar el nombre y tipo de cada Pokémon (tipo agua, tipo fuego, tipo venenoso, etc.)
Permitir que, al hacer click sobre la tarjeta de un pokemon, se despliegue más información, como el peso, sus movimientos (ataques), etc. De preferencia empleando un modal.
El sitio web debe tener un buscador de pokemones, donde puedas filtrar pokemones por nombre.
*/

const link = "https://raw.githubusercontent.com/oicrruf/g15-computer-science/develop/ejercicios/pokedex-registro/json/pokemon.json"
var array = []
var items = document.getElementsByClassName("nav__item--options")
var allPoke = []
const loadPokemonCat = async () => {
    const response = await fetch(link)
    const result = await response.json()
    allPoke = result
    for (let i in result) {
        for (let j in result[i].type) {
            if (array.includes(result[i].type[j]) == false) {
                array.push(result[i].type[j])
            }
            //   console.log(result[i].type[j])         
        }

    }
    let a = 0
    array.forEach(() => {
        let option = document.createElement('li')
        option.classList.add("nav__item", "nav__item--options")
        option.textContent = array[a]
        option.id = array[a]
        option.onclick = function () { createCardsCunstoms(this.innerHTML); console.log(this.innerHTML) };
        document.getElementById('second-menu').appendChild(option)
        a++
    })
    //console.log(array)         
    await createCards(result)

}
function createCardsCunstoms(texto) {
    document.getElementById("card").innerHTML = ""
    for (let i in allPoke) {
        if ((allPoke[i].type).find(elemente => elemente == texto) || texto == "All") {
            let div = document.createElement('div')
            if (texto == "All") {
                div.classList.add("card-image", "card-image-element--" + allPoke[i].type[0])
            } else {
                div.classList.add("card-image", "card-image-element--" + texto)
            }
            //div.classList.add("card-image", "card-image-element--" + allPoke[i].type[0])
            div.setAttribute("id", "card-image-" + i)
            div.addEventListener("click", function (evt) {
                CreateModal(allPoke[i])
            })
            document.getElementById('card').appendChild(div)
            let img = document.createElement('img')
            img.classList.add("card-image", "card-image-img")
            img.setAttribute("src", allPoke[i].ThumbnailImage)
            document.getElementById("card-image-" + i).appendChild(img)
            let name = document.createElement('p')
            name.classList.add("card-image", "card-image-name")
            name.textContent = allPoke[i].name
            document.getElementById("card-image-" + i).appendChild(name)
            let div2 = document.createElement('div')
            div2.classList.add("card-image-element")
            document.getElementById("card-image-" + i).appendChild(div2)
            for (let j in allPoke[i].type) {
                let element = document.createElement('p')
                element.classList.add("card-image", "card-image-p", "card-image-p--" + allPoke[i].type[j])
                element.textContent = allPoke[i].type[j]
                div2.appendChild(element)
            }

        }
    }

}
//Poner todas las imagenes

const createCards = (result) => {

    for (let i in result) {
        let div = document.createElement('div')
        div.classList.add("card-image", "card-image-element--" + result[i].type[0])
        div.setAttribute("id", "card-image-" + i)
        div.addEventListener("click", function (evt) {
            CreateModal(result[i])
        })
        document.getElementById('card').appendChild(div)
        let img = document.createElement('img')
        img.classList.add("card-image", "card-image-img")
        img.setAttribute("src", result[i].ThumbnailImage)
        document.getElementById("card-image-" + i).appendChild(img)
        let name = document.createElement('p')
        name.classList.add("card-image", "card-image-name")
        name.textContent = result[i].name
        document.getElementById("card-image-" + i).appendChild(name)
        let div2 = document.createElement('div')
        div2.classList.add("card-image-element")
        document.getElementById("card-image-" + i).appendChild(div2)
        for (let j in result[i].type) {
            let element = document.createElement('p')
            element.classList.add("card-image", "card-image-p", "card-image-p--" + result[i].type[j])
            element.textContent = result[i].type[j]
            div2.appendChild(element)
        }

    }
}

let search = async () => {
    const response = await fetch(link)
    const allPoke = await response.json()

    let resultado = allPoke.filter(function (pokemon) {
        return pokemon.name.includes(document.getElementById("nav-input").value)
    })
    //return resultado
    document.getElementById("card").innerHTML = ""
    for (let i in resultado) {
        let div = document.createElement('div')
        div.classList.add("card-image", "card-image-element--" + resultado[i].type[0])            //div.classList.add("card-image", "card-image-element--" + allPoke[i].type[0])
        div.setAttribute("id", "card-image-" + i)
        div.addEventListener("click", function (evt) {
            CreateModal(resultado[i])
        })
        document.getElementById('card').appendChild(div)
        let img = document.createElement('img')
        img.classList.add("card-image", "card-image-img")
        img.setAttribute("src", resultado[i].ThumbnailImage)
        document.getElementById("card-image-" + i).appendChild(img)
        let name = document.createElement('p')
        name.classList.add("card-image", "card-image-name")
        name.textContent = resultado[i].name
        document.getElementById("card-image-" + i).appendChild(name)
        let div2 = document.createElement('div')
        div2.classList.add("card-image-element")
        document.getElementById("card-image-" + i).appendChild(div2)
        for (let j in resultado[i].type) {
            let element = document.createElement('p')
            element.classList.add("card-image", "card-image-p", "card-image-p--" + resultado[i].type[j])
            element.textContent = resultado[i].type[j]
            div2.appendChild(element)
        }

    }
}
let input = document.querySelector("#nav-input");
input.addEventListener("keyup", search);

let CreateModal = (Pokemon) => {
    let sect = document.createElement('section')
    sect.classList.add("Ventana-Full")
    document.getElementById("card").appendChild(sect)
    let ventana = document.createElement('div')        
    ventana.id = "Ventana-Modal"
    sect.appendChild(ventana)
    let boton = document.createElement('a')
    boton.textContent = "x"
    boton.id = "Ventana-Button"
    boton.addEventListener("click", function () {        
        ventana.remove()     
        sect.classList.remove("Ventana-Full")        
    })    
    ventana.appendChild(boton)
    let div = document.createElement('div')
    div.classList.add("card-image","card-image--Modal", "card-image-element--" + Pokemon.type[0])            //div.classList.add("card-image", "card-image-element--" + allPoke[i].type[0])
    div.setAttribute("id", "card-image-" +Pokemon.name)
    ventana.appendChild(div)
    let img = document.createElement('img')
    img.classList.add("card-image", "card-image-img")
    img.setAttribute("src", Pokemon.ThumbnailImage)
    document.getElementById("card-image-" + Pokemon.name).appendChild(img)
    let name = document.createElement('p')
    name.classList.add("card-image", "card-image-name")
    name.textContent = Pokemon.name
    document.getElementById("card-image-" + Pokemon.name).appendChild(name)
    let div2 = document.createElement('div')
    div2.classList.add("card-image-element")
    document.getElementById("card-image-" + Pokemon.name).appendChild(div2)
    for (let j in Pokemon.type) {
        let element = document.createElement('p')
        element.classList.add("card-image", "card-image-p", "card-image-p--" + Pokemon.type[j])
        element.textContent = Pokemon.type[j]
        div2.appendChild(element)
    }    
    let divModal=document.createElement('div')
    divModal.classList.add("DivAditional")
    divModal.innerHTML=`<p>Weight:<span class='DivAditional-p'>${Pokemon.weight}</span></p>
    <p>Abilities:<span class='DivAditional-p'>${Pokemon.abilities.toString()}</span></p>
    <p>Weakness:<span class='DivAditional-p'>${Pokemon.weakness.toString()}</span></p>`    
    ventana.appendChild(divModal) 
    
}
