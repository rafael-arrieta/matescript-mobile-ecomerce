import { navbarComponent } from './components/navbarComponent/navbar.component.js'
import { sidenavMenuComponent } from './components/sidenavMenuComponent/sidenavMenu.component.js'
import { sidenavCartComponent } from './components/sidenavCartComponent/sidenavCart.component.js'

const restaurantUser = "angelydemonio_102";
const restaurantName = "ANGEL & DEMONIO";
const apiURI = "https://api.mi-menu.com.ar/";

let divContainer = document.getElementById('div-container')
divContainer.append(navbarComponent(restaurantName))

let sidenavMenu =  document.getElementById("sidenav-menu")
let sidenavCart = document.getElementById('sidenav-cart')

function getCategories() {
    return new Promise((resolve, reject) => {
        const route = `${apiURI}categories/${restaurantUser}`;
        fetch(route)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

getCategories()
    .then((data) => {
        renderCategories(data);
    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);
    });

function getProductsToCategory(categoryId) {
    return new Promise((resolve, reject) => {
        const url = `${apiURI}products/${restaurantUser}/${categoryId}`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

let sidenavCategoriesContainer

async function renderCategories(data) {
    data.sort((a, b) => a.sortNumber - b.sortNumber);
    try {
        sidenavMenu.appendChild(sidenavMenuComponent(data))
        sidenavCategoriesContainer = document.getElementById('sidenav-categories-container')

    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

//boton de carrito del navbar
let cartButton = document.getElementById('cart-button')
//boton del sidenav de cerrar el carrito
let closeSidenavBtn = document.getElementById('close-cart-btn')

//boton de menu del navbar (muestra las categorias)
let menuButton = document.getElementById('menu-button')

//boton del sidenav de cerrar el menu de categorias
let closeMenuBtn = document.getElementById('close-menu-btn')

cartButton.onclick = ()=>{ openMenuNav(sidenavCart,sidenavCartContainer)}
closeSidenavBtn.onclick = ()=>{closeMenuNav(sidenavCart,sidenavCartContainer)}

menuButton.onclick = ()=>{ openMenuNav(sidenavMenu,sidenavCategoriesContainer)}
closeMenuBtn.onclick = ()=>{closeMenuNav(sidenavMenu,sidenavCategoriesContainer)}

function openMenuNav(conteiner, content) {
    conteiner.style.width = "100%";
    content.classList.remove('display-none')
    setTimeout(()=>{
        content.classList.add('opacity-one-transition')
        content.classList.remove('opacity-cero-transition')
    },300)
}

function closeMenuNav(conteiner, content) {
    conteiner.style.width = "0";
    content.classList.remove('opacity-one-transition')
    content.classList.add('opacity-cero-transition')
    setTimeout(()=>{
        content.classList.add('display-none')
    },100)
}

sidenavCart.appendChild(sidenavCartComponent('hola'))
let sidenavCartContainer = document.getElementById('sidenav-cart-container')


// class-sidenav-menu-anchor es la clase de cada enlace del sidenav de categorias
let classMenuAnchor = document.getElementsByClassName('class-sidenav-menu-anchor')

console.log(classMenuAnchor);

for (let i= 0; i < classMenuAnchor.length; i++) {
    console.log('hola');
    // anchor.onclick = ()=>{
    //     closeMenuNav(sidenavMenu,sidenavCategoriesContainer)
    //     console.log('lol');
    // }
}
