const publicKey = 'c1159c217ab6b3dc85ec7ea6b9617316'
const hash = 'e5a632b130239b16aa740346e1db1d76'
const ts = 1688146702

const popularHeroesArea = document.getElementById('popularHeroes')
const allCharactersArea = document.getElementById('allCharacters')
const heroInput = document.getElementById('heroInput')

// Fetch All Characters

const fetchCharacters = async () => {
    const APIResponse = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`)
    const data = APIResponse.json().then((data) => {
        data.data.results.forEach((character)=> {
            const srcImage = character.thumbnail.path + '.' + character.thumbnail.extension
            const name = character.name
            let description = character.description
            if (description == ''){
                description = "Sorry, we don't have a description for this character yet."
            }
            createCard(srcImage, name, allCharactersArea, description)
        })

    })
}

fetchCharacters()

// Fetch Popular Heroes

const popularHeroesID = ['1009610', '1009368', '1009664', '1009220']
popularHeroesID.forEach(id => {
    fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`).then((res) => {
        res.json().then((data) => {
            const srcImage = data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension
            const name = data.data.results[0].name
            const description = data.data.results[0].description
            createCard(srcImage, name, popularHeroesArea, description)
        })

    })
})

// Card

function createCard (srcImage, name, daddy, description) {
    const divHero = document.createElement('div')
    divHero.setAttribute("class", 'card')
    const imgHero = document.createElement('img')
    imgHero.setAttribute('src', `${srcImage}`)
    const nameHero = document.createElement('p')
    nameHero.innerText = `${name}`
    nameHero.setAttribute('class', 'heroNames')
    nameHero.style.cursor = 'pointer'
    const descriptionHero = document.createElement('p')
    descriptionHero.innerText = description
    descriptionHero.style.display = 'none'
    const hoverDiv = document.createElement('div')
    hoverDiv.setAttribute('class', 'hoverCard')
    hoverDiv.innerHTML = '<i class="fa-solid fa-up-right-and-down-left-from-center fa-2xl" style="color: #ffffff;"></i>'
    daddy.appendChild(divHero)
    divHero.appendChild(hoverDiv)
    divHero.appendChild(imgHero)
    divHero.appendChild(nameHero)
    divHero.appendChild(descriptionHero)
}

// Characters Search

const btnSubmit = document.getElementById('btnSubmit')
btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()   
    const character = heroInput.value
    heroInput.value = ''
    heroInput.focus()
    allCharactersArea.innerHTML = ''
    fetchHeroWanted(character)
    allCharactersArea.focus()
    modalEvent()
})

const fetchHeroWanted = async (persona) => {
    await fetch(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${persona}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=100`).then((APIResponse) => {
        data = APIResponse.json().then((data) => {
            if (data.data.total == 0) {
                window.alert("The Character sought was not found in our data. Try again!")
            }
            data.data.results.forEach((character)=> {
                const srcImage = character.thumbnail.path + '.' + character.thumbnail.extension
                const name = character.name
                let description = character.description
                if (description == '' || description == ' '){
                    description = "Sorry, we don't have a description for this character yet."
                }
                createCard(srcImage, name, allCharactersArea, description)
            })
        })
    })
}

//Modal 
let modalContainter = document.getElementById('modal-container')
let nameModal = document.getElementById('nameModal')
let imgModal = document.getElementById('imgModal')
let descriptionModal = document.getElementById('descriptionModal')

function  showModal () {
    modalContainter.classList.add('show')
}

function removeModal () {
    modalContainter.classList.remove('show')
}

events()

function events(){
    setTimeout(() => {
        const cards = document.querySelectorAll('.card')
        const heroCards = [...cards]
        heroCards.forEach(hero => {
            hero.addEventListener('mouseover', ()=> {
                hero.firstChild.classList.add('hover')
            })
            hero.addEventListener('mouseout', ()=> {
                hero.firstChild.classList.remove('hover')
            })
            hero.addEventListener('click', ()=> {
                nameModal.innerHTML = hero.children[2].innerText
                imgModal.src = hero.children[1].src
                descriptionModal.innerText = hero.lastChild.innerText
                showModal()
            })
        })       
    }, 1500)
}


