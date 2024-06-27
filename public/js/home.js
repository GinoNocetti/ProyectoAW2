import { navbarComponent } from "../components/navbar.js"

let navConteiner = document.querySelector('header')

window.addEventListener('load', ()=> {
    navConteiner.innerHTML = navbarComponent
})