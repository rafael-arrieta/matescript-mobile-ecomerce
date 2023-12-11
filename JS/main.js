import { navbarComponent } from "./components/navbar.component.js";
import { styleSheetSelect } from './components/style.functions.js'
import { extraerNombreDeUrlActual } from './components/url.function.js'
const restaurantUser = "authentic_094";

styleSheetSelect()

extraerNombreDeUrlActual()

//const restaurantUser = "angelydemonio_102";

const restaurantName = "ANGEL & DEMONIO";
const apiURI = "https://api.mi-menu.com.ar/";
const restaurantPhone = '+5491132685339'
//

// Div container
let divContainer = document.getElementById("div-container");
divContainer.append(navbarComponent(restaurantName));

//Estos son los sidenavs del Carrito y el menu
let sidenavMenu = document.getElementById("sidenav-menu");
let sidenavCart = document.getElementById("sidenav-cart");
let cartArray = [];

/*
//Esto agrega un modal de bienvenida al iniciar el programa
let bienvenidaModal = document.getElementById('bienvenida-modal')
bienvenidaModal.addEventListener('click', ()=>{
    bienvenidaModal.classList.add('display-none')
})
*/

/*
 * Hay que implementar la llamada a un ENDPOINT que
 * devuelva los datos del business
 */

const matescriptFooter = matescriptFooterContent();

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
        renderAllCategories(data);
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

let sidenavCategoriesContainer;

async function renderAllCategories(data) {
    data.sort((a, b) => a.sortNumber - b.sortNumber);
    try {
        sidenavMenu.append(sidenavMenuComponent(data), matescriptFooter);
        sidenavCategoriesContainer = document.getElementById(
            "sidenav-categories-container"
        );

        let pageBodyContent = document.createElement("div");
        pageBodyContent.className = "page-body-content";

        for (const category of data) {
            if (category.enable) {
                pageBodyContent.append(
                    await sectionByCategoryComponent(category)
                );
            }
        }

        divContainer.append(pageBodyContent);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

//boton de carrito del navbar
let cartButton = document.getElementById("cart-button");
//boton del sidenav de cerrar el carrito
let closeSidenavBtn = document.getElementById("close-cart-btn");

//boton de menu del navbar (muestra las categorias)
let menuButton = document.getElementById("menu-button");

//boton del sidenav de cerrar el menu de categorias
let closeMenuBtn = document.getElementById("close-menu-btn");

let sidenavCategoriesTitle = document.getElementById("sidenav-menu-categories");
let sidenavCartTitle = document.getElementById("sidenav-menu-cart");

cartButton.onclick = () => {
    openMenuNav(sidenavCart, sidenavCartContainer);
};
closeSidenavBtn.onclick = () => {
    closeMenuNav(sidenavCart, sidenavCartContainer);
};

menuButton.onclick = () => {
    openMenuNav(sidenavMenu, sidenavCategoriesContainer);
};
closeMenuBtn.onclick = () => {
    closeMenuNav(sidenavMenu, sidenavCategoriesContainer);
};

function openMenuNav(conteiner, content) {
    conteiner.style.width = "100%";
    content.classList.remove("display-none");

    setTimeout(() => {
        sidenavCategoriesTitle.classList.remove("display-none");
        sidenavCartTitle.classList.remove("display-none");
        content.classList.add("opacity-one-transition");
        content.classList.remove("opacity-cero-transition");
        matescriptFooter.classList.add("opacity-one-transition");
        matescriptFooter.classList.remove("opacity-cero-transition");
    }, 300);
}

function closeMenuNav(conteiner, content) {
    conteiner.style.width = "0";
    content.classList.remove("opacity-one-transition");
    content.classList.add("opacity-cero-transition");
    matescriptFooter.classList.remove("opacity-one-transition");
    matescriptFooter.classList.add("opacity-cero-transition");
    sidenavCategoriesTitle.classList.add("display-none");
    sidenavCartTitle.classList.add("display-none");

    setTimeout(() => {
        content.classList.add("display-none");
    }, 100);
}
//revisar matescriptFooterContent() porque se instancia una sola vez
sidenavCart.append(sidenavCartComponent(), matescriptFooterContent()); //function in line 179

let sidenavCartContainer = document.getElementById("sidenav-cart-container");
let sidenavCartContent = document.getElementById("sidenav-cart-content");
let sidenavCartBtn = document.getElementById("sidenav-cart-button");

function sidenavMenuComponent(categories) {
    const container = document.createElement("div");
    container.classList.add("sidenav-categories-container");
    container.classList.add("display-none");
    container.classList.add("opacity-cero-transition");
    container.id = "sidenav-categories-container";

    for (const category of categories) {
        if (category.enable) {
            const anchor = document.createElement("a");
            anchor.textContent =
                category.name.charAt(0).toUpperCase() + category.name.slice(1);
            anchor.href = "#" + category.id;
            anchor.onclick = () => {
                closeMenuNav(sidenavMenu, sidenavCategoriesContainer);
            };
            container.append(anchor);
        }
    }
    return container;
}

function sidenavCartComponent() {
    const container = document.createElement("div");
    container.className =
        "sidenav-cart-container display-none opacity-cero-transition";
    container.id = "sidenav-cart-container";

    const cartContent = document.createElement("div");
    cartContent.className = "sidenav-cart-content";
    cartContent.id = "sidenav-cart-content";

    const cartTotal = document.createElement("h4");
    cartTotal.className = 'sidenav-cart-total'
    cartTotal.id = 'cart-total'

    const cartWhatsappBnt = document.createElement("button");
    cartWhatsappBnt.className = "sidenav-cart-button";
    cartWhatsappBnt.id = "sidenav-cart-button";
    cartWhatsappBnt.textContent = "finalizar compra";

    cartWhatsappBnt.onclick = ()=>{
        modalBuyAction()
    }

    //container.textContent = 'Carrito de compras'
    container.append(cartContent, cartTotal, cartWhatsappBnt);
    return container;
}

async function sectionByCategoryComponent(category) {
    //este componente debe retornar la categoria completa con los productos
    const sectionByCategory = document.createElement("section");
    sectionByCategory.id = category.id;
    sectionByCategory.className = "section-category";
    const apiImageURL = `${apiURI}images/${restaurantUser}`;
    sectionByCategory.style.backgroundImage = `url(${apiImageURL}/${category.image})`;

    const sectionTitle = document.createElement("h3");
    //falta el titulo, el separador el objetivo del touch del sidenav, calcular la imagen
    //sectionTitle.textContent = category.name.charAt(0).toUpperCase() + category.name.slice(1)
    sectionTitle.textContent = category.name.toUpperCase();
    // sectionByCategory.append(sectionByCategory)

    const productsContainer = document.createElement("div");
    productsContainer.className = "products-container";

    try {
        const products = await getProductsToCategory(category.id);

        for (const product of products) {
            if (product.enable) {
                const productCardContainer = document.createElement("div");
                productCardContainer.id = product.id;
                productCardContainer.onclick = () => {
                    modalDetailProduct(product);
                };
                //
                const productCardTitle = document.createElement("h4");
                productCardTitle.textContent =
                    product.name.charAt(0).toUpperCase() +
                    product.name.slice(1);
                productCardTitle.className = "product-card__title";

                if (!product.smallPrice) {
                    let productPriceLarge = document.createElement("h5");
                    productPriceLarge.className = "price-l";
                    productPriceLarge.textContent =
                        "Precio: $" + product.largePrice;
                    productCardContainer.append(productPriceLarge);
                } else {
                    let productPriceLarge = document.createElement("h5");
                    productPriceLarge.className = "price-l";
                    productPriceLarge.textContent =
                        "Grande: $" + product.largePrice;
                    let productPriceSmall = document.createElement("h5");
                    productPriceSmall.className = "price-s";
                    productPriceSmall.textContent =
                        "Chico: $" + product.smallPrice;
                    productCardContainer.append(
                        productPriceSmall,
                        productPriceLarge
                    );
                }

                if (product.image) {
                    productCardContainer.className =
                        "product-card product-card__grid-img";
                    const productImage = document.createElement("img");
                    productImage.src = `${apiURI}images/${restaurantUser}/${product.image}`;
                    productImage.className = "product-image";
                    productCardContainer.append(productImage, productCardTitle);
                } else {
                    productCardContainer.className =
                        "product-card product-card__grid";
                    productCardContainer.append(productCardTitle);
                }

                productsContainer.append(productCardContainer);
            }
        }
        sectionByCategory.append(sectionTitle, productsContainer);
        return sectionByCategory;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

function productQuantityCounter(product) {
    //contador de productos
    const productCounterContainer = document.createElement("div");
    productCounterContainer.className = "product-counter__container";

    const prod = {
        _id: product._id,
        name: `${product.name} ${product.size ? `(${product.size})` : ""}`,
        price: product.price,
    };

    const buttonAddProduct = document.createElement("button");
    buttonAddProduct.textContent = "+";
    buttonAddProduct.className = "icon-product-btn";
    buttonAddProduct.onclick = (_) => addProductToCart(prod); //line 246

    const quantityProduct = document.createElement("p");
    let index = cartArray.findIndex((prod) => prod._id === product._id);
    if (index !== -1) {
        quantityProduct.textContent = cartArray[index].quantity;
    } else {
        quantityProduct.textContent = 0;
    }
    quantityProduct.className = "count-product";
    quantityProduct.id = "quantity-" + product._id;
    const buttonRemoveProduct = document.createElement("button");
    buttonRemoveProduct.textContent = "-";
    buttonRemoveProduct.className = "icon-product-btn";
    buttonRemoveProduct.onclick = (_) => removeOneProductFromCart(prod); // line

    productCounterContainer.append(
        buttonRemoveProduct,
        quantityProduct,
        buttonAddProduct
    );

    return productCounterContainer;
}

function addProductToCart(product) {
    let index = cartArray.findIndex((prod) => prod._id === product._id);
    let productQuantityCounter = document.getElementById(
        "quantity-" + product._id
    );

    if (index !== -1) {
        cartArray[index].quantity++;
        productQuantityCounter.textContent = cartArray[index].quantity;
    } else {
        product.quantity = 1;
        cartArray.push(product);
        productQuantityCounter.textContent = product.quantity;
    }
    renderCartArray();
}

function removeOneProductFromCart(product) {
    let productQuantityCounter = document.getElementById(
        "quantity-" + product._id
    );
    let index = cartArray.findIndex((prod) => prod._id === product._id);

    if (index !== -1) {
        if (cartArray[index].quantity == 1) {
            cartArray.splice(index, 1);
            productQuantityCounter.textContent = 0;
        } else {
            cartArray[index].quantity--;
            productQuantityCounter.textContent = cartArray[index].quantity;
        }
        renderCartArray();
    }
}

function renderCartArray() {
    sidenavCartContent.innerHTML = "";

    let cartTotal = document.getElementById('cart-total')
    let cartTotalAcc = 0
    for (const product of cartArray) {
        const productInCart = document.createElement("div");
        productInCart.className = "product-cart-card";
        const productTitle = document.createElement("h4");
        productTitle.textContent = `${product.name}`;
        productTitle.className = 'product-cart-card__prod';
        const removeProduct = document.createElement("button");
        removeProduct.className = "delete-product-icon";
        const removeIcon = document.createElement("img");
        removeIcon.src = "./assets/icons/delete_icon.svg";

        const productQuant = document.createElement("p");
        productQuant.textContent = `${product.quantity} u. × $${product.price} = $${product.price*product.quantity}`;
        productQuant.className = 'product-cart-card__prod-quant';

        removeProduct.onclick = () => {
            removeProductFromCart(product._id);
        };
        removeProduct.append(removeIcon);
        productInCart.append(productTitle,productQuant, removeProduct);
        sidenavCartContent.append(productInCart);

        cartTotalAcc += product.price*product.quantity
    }
    if(cartTotalAcc>0) cartTotal.textContent = `Total a pagar: $${cartTotalAcc}`
}

function removeProductFromCart(productId) {
    let index = cartArray.findIndex((prod) => prod._id === productId);
    cartArray.splice(index, 1);
    renderCartArray();
}

function matescriptFooterContent() {
    let container = document.createElement("div");
    container.className = "matescript-footer-container";

    const logoMatescript = document.createElement("img");
    logoMatescript.src = "./assets/imagenes/Logo nuevo.svg";
    logoMatescript.className = "logo-matescript";

    container.append(logoMatescript);
    return container;
}

function modalDetailProduct(product) {
    const modalView = document.getElementById("product-detail-modal");
    modalView.classList.remove("display-none");

    const modalBox = document.createElement("div");
    modalBox.className = "modal-box";

    //class="close-btn" id="close-cart-btn">×</button>
    const modalCloseButton = document.createElement("button");
    modalCloseButton.id = "modal-close-btn";
    modalCloseButton.className = "modal-close-button";
    modalCloseButton.textContent = "×";
    modalCloseButton.onclick = () => {
        modalView.classList.add("display-none");
        modalView.innerHTML = "";
    };

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "modal-description";
    description.textContent = product.description;
    modalBox.append(modalCloseButton);

    if (product.image) {
        const productImage = document.createElement("img");
        productImage.className = "modal-image";
        productImage.src = `${apiURI}images/${restaurantUser}/${product.image}`;
        modalBox.append(productImage);
    }

    const productPriceBox = document.createElement("div");
    

    if (product.smallPrice > 0) {
        productPriceBox.className = "modal-price-container-doble";
        const productPrice = document.createElement("h4");
        productPrice.textContent = `Precio grande: $${product.largePrice}`;
        productPrice.style.gridArea = "text";
        const counterLarge = productQuantityCounter({
            _id: product._id + "l",
            name: product.name,
            price: product.largePrice,
            size: "grande",
        });
        counterLarge.style.gridArea = "counter";
        productPriceBox.append(productPrice, counterLarge);
        const productSmallPrice = document.createElement("h4");
        productSmallPrice.textContent = "Precio chico: " + product.smallPrice;
        productSmallPrice.style.gridArea = "text-s";
        const counterSmall = productQuantityCounter({
            _id: product._id + "sm",
            name: product.name,
            price: product.smallPrice,
            size: "chica",
        });

        counterSmall.style.gridArea = "counter-s";

        productPriceBox.append(
            productPrice,
            counterLarge,
            productSmallPrice,
            counterSmall
        );
    } else {
        productPriceBox.className = "modal-price-container-simple";
        const productPrice = document.createElement("h4");
        productPrice.textContent = "Precio: " + product.largePrice;
        productPrice.style.gridArea = "text";
        const counterLarge = productQuantityCounter({
            _id: product._id,
            name: product.name,
            price: product.largePrice,
            size: "",
        });
        counterLarge.style.gridArea = "counter";

        productPriceBox.append(productPrice, counterLarge);
    }

    modalBox.append(title, description, productPriceBox);

    modalView.append(modalBox);
}

/*
async function validateBuyAction() {
    if (productsInCart.length === 0) {
        totalOverviewDiv.style = "display:none";
        buyBtn.href = "#";
    } else {
        let totalSum = 0;
        let msg = "Hola, Pochi. Soy *INGRESÁ TU NOMBRE*. Quiero comprar:\n\n";
    
        for (const p of productsInCart) {
            productData = await getProductData(p.id);
            msg += `- *${productData.name} x ${p.quantity}*\n`;
            totalSum += productData.price * p.quantity;
        }
    
        msg +=
            "\nNecesito que me lo envíes a *CALLE NRO*\nTe pago con *MEDIO DE PAGO*";
    
        totalOverviewDiv.style = "display:block";
        totalPrice.innerText = totalSum;
        buyBtn.href =
            "https://wa.me/+5491132685339?text=" + encodeURIComponent(msg);
    }
}
*/

function modalBuyAction() {
    const product = ''
    const modalView = document.getElementById("product-detail-modal");
    modalView.classList.remove("display-none");

    const modalBox = document.createElement("div");
    modalBox.innerHTML = ''
    modalBox.className = "modal-box";

    let userName = '';
    let userAddress = '';
    let userPhone = '';
    let cartListMessage = '';
    let cartListRender = '';

    for(let item of cartArray) {
        cartListRender += `<p>· ${item.name} × ${item.quantity}u.</p>` 
        cartListMessage += ` · ${item.name} × ${item.quantity}u.\n`
    }

    
    let buyMessageToDiv = `<p>Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}</p>
    <p><strong>  Te pido: </strong> </p>
    ${cartListRender}
    <p><strong>  Enviar a ${userAddress}</strong></p>
    `
    
    let buyMessageToSend = `Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}\n*Te pido:*\n${cartListMessage}\n*Enviar a ${userAddress}*`
    const sendBuy = document.createElement("a");
    sendBuy.className = "sidenav-cart-button";
    sendBuy.role = 'button'
    sendBuy.textContent = "enviar pedido"
    sendBuy.target = '_blank'
    sendBuy.href = `https://wa.me/${restaurantPhone}?text=`+ encodeURIComponent(buyMessageToSend);
    
    const labelName = document.createElement("label")
    labelName.textContent="Nombre"
    const inputName = document.createElement("input")
    inputName.placeholder = "Nombre"
    inputName.oninput = ()=>{
        userName = inputName.value
        buyMessageToDiv = `<p>Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}</p>
            <p><strong>  Te pido: </strong> </p>
            ${cartListRender}
            <p><strong>  Enviar a ${userAddress}</strong></p>
        `
        buyMessageToSend = `Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}\n*Te pido:*\n${cartListMessage}\n*Enviar a ${userAddress}*`
        cartContainerMessage.innerHTML = buyMessageToDiv;
        sendBuy.href = `https://wa.me/${restaurantPhone}?text=` + encodeURIComponent(buyMessageToSend)
    }

    const boxName = document.createElement("div");
    boxName.className = 'form-box-container'
    boxName.append(labelName,inputName)

    
    const labelPhone = document.createElement("label")
    labelPhone.textContent="Telefono"
    const inputPhone = document.createElement("input")
    inputPhone.placeholder = "Telefono"
    inputPhone.oninput = ()=>{
        userPhone = inputPhone.value
        buyMessageToDiv = `<p>Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}</p>
            <p><strong>  Te pido: </strong> </p>
            ${cartListRender}
            <p><strong>  Enviar a ${userAddress}</strong></p>
        `
        buyMessageToSend = `Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}\n*Te pido:*\n${cartListMessage}\n*Enviar a ${userAddress}*`
        cartContainerMessage.innerHTML = buyMessageToDiv;
        sendBuy.href = `https://wa.me/${restaurantPhone}?text=` + encodeURIComponent(buyMessageToSend)
    }
    const boxPhone = document.createElement("div");
    boxPhone.className = 'form-box-container'
    boxPhone.append(labelPhone,inputPhone)

    const labelAddress = document.createElement("label")
    labelAddress.textContent="Direccion"
    const inputAddress = document.createElement("input")
    inputAddress.placeholder = "Direccion"
    inputAddress.oninput = ()=>{
        userAddress = inputAddress.value
        buyMessageToDiv = `<p>Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}</p>
            <p><strong>  Te pido: </strong> </p>
            ${cartListRender}
            <p><strong>  Enviar a ${userAddress}</strong></p>
        `
        buyMessageToSend = `Hola ${restaurantName}, mi nombre es ${userName} - ${userPhone}\n*Te pido:*\n${cartListMessage}\n*Enviar a ${userAddress}*`
        cartContainerMessage.innerHTML = buyMessageToDiv;
        sendBuy.href = `https://wa.me/${restaurantPhone}?text=` + encodeURIComponent(buyMessageToSend)
    }

    const boxAddress = document.createElement("div");
    boxAddress.className = 'form-box-container'
    boxAddress.append(labelAddress,inputAddress)

    //Boton de cerrado del modal
    const modalCloseButton = document.createElement("button");
    modalCloseButton.id = "modal-close-btn";
    modalCloseButton.className = "modal-close-button";
    modalCloseButton.textContent = "×";
    modalCloseButton.onclick = () => {
        modalView.classList.add("display-none");
        modalView.innerHTML = "";
    };

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "modal-description";
    description.textContent = product.description;
    modalBox.append(modalCloseButton);

    const cartContainerMessage = document.createElement("div");
    cartContainerMessage.className = 'cart-message'
    cartContainerMessage.innerHTML = buyMessageToDiv;

    modalBox.append(boxName, boxPhone, boxAddress,cartContainerMessage,sendBuy);

    modalView.append(modalBox);
}