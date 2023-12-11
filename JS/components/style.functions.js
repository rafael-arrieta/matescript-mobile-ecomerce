export function styleSheetSelect(){
    // Define un objeto con las variables
    const cssVariables = {
        fontColorPrimary: 'white',
        fontColorSecondary: 'rgb(255, 66, 98)',
        bgColorPrimary: 'rgb(15, 15, 17)',
        bgColorPrimaryOp: 'rgba(15, 15, 17, 0.9)',
        bgColorSecondary: 'rgb(60, 60, 60)',
        bgColorCard: 'rgb(15, 15, 17, 0.9)',
        bgColorNav: 'rgb(10, 180, 10)',
        btnColor: 'rgb(10, 180, 10)',
        bgColorCategory: 'rgb(80, 80, 190)',
        fontPrimary: 'poppins',
    };

    // Inserta las variables en el estilo del documento
    const rootStyle = document.documentElement.style;
    Object.entries(cssVariables).forEach(([key, value]) => {
        rootStyle.setProperty(`--${key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`, value);
    });
}