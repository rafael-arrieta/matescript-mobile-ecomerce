export function navbarComponent(title){
    const navbar = document.createElement('nav')
    navbar.className = 'navbar-component'

    const cartButton = document.createElement('button')
    cartButton.className = 'icon-button cart-btn'
    cartButton.id= 'cart-button'
    
    const cartCount = document.createElement('span')
    cartCount.id = 'cart-couter'

    const cartIcon = document.createElement('span')//
    cartIcon.textContent ='🛒'


    const categoriesMenu = document.createElement('button')
    categoriesMenu.className = 'icon-button menu-btn'
    categoriesMenu.id= 'menu-button'
    categoriesMenu.textContent = '☰'
    
    cartButton.append(cartCount,cartIcon)
    navbar.append(cartButton, categoriesMenu )

    return navbar
}
