export function sidenavMenuComponent(data){

    const container = document.createElement('div');
    container.classList.add('sidenav-categories-container')
    container.classList.add('display-none')
    container.classList.add('opacity-cero-transition')

    container.id = 'sidenav-categories-container'
    container.textContent = 'Categorias'

    for (const obj of data) {
        const anchor = document.createElement('a');
        anchor.textContent = obj.name
        //anchor.href = obj.id
        anchor.className = 'class-sidenav-menu-anchor'
        //()=>{ openMenuNav(sidenavMenu,sidenavCategoriesContainer)}
        container.append(anchor)
    }

    return container
}