export function sidenavCartComponent(data){
    const container = document.createElement('div');
    container.className = 'sidenav-categories-container display-none opacity-cero-transition'
    container.id = 'sidenav-cart-container'
    container.textContent = 'Carrito de compras'
    return container
}
