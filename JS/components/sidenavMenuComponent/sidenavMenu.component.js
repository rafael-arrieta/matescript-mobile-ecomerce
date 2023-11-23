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
        container.append(anchor)
    }

    console.log(container);

    return container
}