export function extraerNombreDeUrlActual() {
    const currentURL = window.location.href;
    const urlObj = new URL(currentURL);
    const pathname = urlObj.pathname;

    // Extraemos el nombre deseado (aquí asumimos que siempre está después de la última barra)
    const partes = pathname.split('/');
    const name = partes[partes.length - 1].replace('.html', '');

    return name;
}