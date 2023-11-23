export function styleSheetSelect(){
    let cssLink = document.createElement('link')
    cssLink.rel="stylesheet"
    cssLink.href = './CSS/style.css'
    document.head.append(cssLink)
}