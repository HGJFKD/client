// data
const getData = async () => {
    const resp = await fetch('http://localhost:3000/api/products');
    const data = await resp.json();
    return data
};

async function deletProduct(id) {
    await fetch('http://localhost:3000/api/' + id, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                card.remove()
            };
        });
};


async function updateQuantity(url, id) {
    const response = await fetch(url + id, { method: 'PUT' });
    if (response.ok) {
        const card = document.getElementById(id);
        const quantity = card.querySelector("#quantity");
        await response.json().then(newQuantity => quantity.textContent = newQuantity);
    };
};


const data = getData()

// Root div
const root = document.getElementById('root');
const main = document.getElementById('main');
const header = document.getElementById("home");

// page 
let page = 'load'

// const filter Array
let filterArray = []

// createing functions =============
// Create div
function createDiv(display, id = 'ID', className = 'className') {
    const div = document.createElement('div')
    div.style.display = display;
    div.id = id;
    div.className = className;
    return div;
}

// Create h or p by type
function craeteH(type, text, fontSize, id = '', className = '') {
    const h = document.createElement(type)
    h.id = id;
    h.className = className;
    h.style.fontSize = fontSize;
    h.textContent = text;
    return h;
};

// Craete img
function createImg(src, width, height) {
    const img = document.createElement("img")
    img.src = src
    img.style.width = width
    img.style.height = height
    return img
}

// Create btns filter
function createBtnFilter(text, backgroundColor, category) {
    const btn = document.createElement('button')
    btn.id = 'BtnFilter';

    // style
    btn.textContent = text

    btn.addEventListener('click', () => {
        filterCards(category)
    })
    return btn
}

// Create input
function createInput(type, placeholder) {
    const input = document.createElement('input')
    input.id = 'searchInput'
    input.type = type
    input.placeholder = placeholder
    input.style.border = '0px solid #4d4e50'
    input.style.margin = '1px'
    input.style.padding = '0.5em'
    return input
}

// header
function craeteHeader() {

    header.style.padding = '10px'
    header.style.borderBlockEnd = "1px solid #1b004b"

    // Inventory management p
    const inventoryManagementP = craeteH('p', "Inventory management", '25px');
    inventoryManagementP.style.fontStyle = "italic";
    inventoryManagementP.style.marginLeft = '0.5em';
    header.appendChild(inventoryManagementP);

    // Home div icons
    const homeDiv = createDiv('flex', 'homeDiv');

    // Plus icon
    const plusImg = createImg("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Ik0yNTYgMEMxMTQuODM2IDAgMCAxMTQuODM2IDAgMjU2czExNC44MzYgMjU2IDI1NiAyNTYgMjU2LTExNC44MzYgMjU2LTI1NlMzOTcuMTY0IDAgMjU2IDB6bTExMiAyNzcuMzMyaC05MC42NjhWMzY4YzAgMTEuNzc3LTkuNTU1IDIxLjMzMi0yMS4zMzIgMjEuMzMycy0yMS4zMzItOS41NTUtMjEuMzMyLTIxLjMzMnYtOTAuNjY4SDE0NGMtMTEuNzc3IDAtMjEuMzMyLTkuNTU1LTIxLjMzMi0yMS4zMzJzOS41NTUtMjEuMzMyIDIxLjMzMi0yMS4zMzJoOTAuNjY4VjE0NGMwLTExLjc3NyA5LjU1NS0yMS4zMzIgMjEuMzMyLTIxLjMzMnMyMS4zMzIgOS41NTUgMjEuMzMyIDIxLjMzMnY5MC42NjhIMzY4YzExLjc3NyAwIDIxLjMzMiA5LjU1NSAyMS4zMzIgMjEuMzMycy05LjU1NSAyMS4zMzItMjEuMzMyIDIxLjMzMnptMCAwIiBmaWxsPSIjNTI0ZDQ5IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBvcGFjaXR5PSIxIiBjbGFzcz0iIj48L3BhdGg+PC9nPjwvc3ZnPg==")
    plusImg.style.marginLeft = "20px";
    plusImg.classList.add('bigHover')



    // Home icon ===
    const homeImg = createImg("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ2MC4yOTggNDYwLjI5NyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PHBhdGggZD0iTTIzMC4xNDkgMTIwLjkzOSA2NS45ODYgMjU2LjI3NGMwIC4xOTEtLjA0OC40NzItLjE0NC44NTUtLjA5NC4zOC0uMTQ0LjY1Ni0uMTQ0Ljg1MnYxMzcuMDQxYzAgNC45NDggMS44MDkgOS4yMzYgNS40MjYgMTIuODQ3IDMuNjE2IDMuNjEzIDcuODk4IDUuNDMxIDEyLjg0NyA1LjQzMWgxMDkuNjNWMzAzLjY2NGg3My4wOTd2MTA5LjY0aDEwOS42MjljNC45NDggMCA5LjIzNi0xLjgxNCAxMi44NDctNS40MzUgMy42MTctMy42MDcgNS40MzItNy44OTggNS40MzItMTIuODQ3VjI1Ny45ODFjMC0uNzYtLjEwNC0xLjMzNC0uMjg4LTEuNzA3TDIzMC4xNDkgMTIwLjkzOXoiIGZpbGw9IiM1MjRkNDkiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSIiIG9wYWNpdHk9IjEiPjwvcGF0aD48cGF0aCBkPSJNNDU3LjEyMiAyMjUuNDM4IDM5NC42IDE3My40NzZWNTYuOTg5YzAtMi42NjMtLjg1Ni00Ljg1My0yLjU3NC02LjU2Ny0xLjcwNC0xLjcxMi0zLjg5NC0yLjU2OC02LjU2My0yLjU2OGgtNTQuODE2Yy0yLjY2NiAwLTQuODU1Ljg1Ni02LjU3IDIuNTY4LTEuNzExIDEuNzE0LTIuNTY2IDMuOTA1LTIuNTY2IDYuNTY3djU1LjY3M2wtNjkuNjYyLTU4LjI0NWMtNi4wODQtNC45NDktMTMuMzE4LTcuNDIzLTIxLjY5NC03LjQyMy04LjM3NSAwLTE1LjYwOCAyLjQ3NC0yMS42OTggNy40MjNMMy4xNzIgMjI1LjQzOGMtMS45MDMgMS41Mi0yLjk0NiAzLjU2Ni0zLjE0IDYuMTM2LS4xOTMgMi41NjguNDcyIDQuODExIDEuOTk3IDYuNzEzbDE3LjcwMSAyMS4xMjhjMS41MjUgMS43MTIgMy41MjEgMi43NTkgNS45OTYgMy4xNDIgMi4yODUuMTkyIDQuNTctLjQ3NiA2Ljg1NS0xLjk5OEwyMzAuMTQ5IDk1LjgxN2wxOTcuNTcgMTY0Ljc0MWMxLjUyNiAxLjMyOCAzLjUyMSAxLjk5MSA1Ljk5NiAxLjk5MWguODU4YzIuNDcxLS4zNzYgNC40NjMtMS40MyA1Ljk5Ni0zLjEzOGwxNy43MDMtMjEuMTI1YzEuNTIyLTEuOTA2IDIuMTg5LTQuMTQ1IDEuOTkxLTYuNzE2LS4xOTUtMi41NjMtMS4yNDItNC42MDktMy4xNDEtNi4xMzJ6IiBmaWxsPSIjNTI0ZDQ5IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIiBvcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==");
    homeImg.classList.add('bigHover')
    // Click func
    homeImg.addEventListener('click', () => {
        home();
    });

    homeDiv.appendChild(homeImg);
    homeDiv.appendChild(plusImg);
    header.appendChild(homeDiv);
}

// Craete Header Product
function craeteHeaderProduct(load) {
    const headerProduct = craeteH('h1');
    headerProduct.id = 'headerProduct'
    const input = document.getElementById('searchInput')
    if (load === 'load') {
        headerProduct.textContent = 'Products'
    } else {
        let text = 'text'
        if (filterArray.length > 0) {
            text = 'Products'
        } else {
            text = "Sorry, there are no products that include " + "'" + input.value + "'"
        }
        headerProduct.textContent = text;
    }
    main.appendChild(headerProduct);
}

// futter
function createFooter() {
    const footer = createDiv('flex', 'footer');
    const technical = craeteH('h3');
    technical.textContent = 'Technical Support';
    footer.appendChild(technical);
    root.appendChild(footer)
}

// Load cards by category
async function filterCards(category) {
    const data = getData()
    const cardsDiv = document.getElementById('cardsDiv');
    cardsDiv.remove();
    if (category === 'All Products') {
        craeteCards(await data)
    } else {
        const filterArray = await data.then(resp => resp.filter(product => product.category === category))
        craeteCards(filterArray)
    }
}

//  Create serch div
function createSearchDiv() {
    const searchDiv = createDiv('flex', 'searchDiv');
    return searchDiv
}

function createHr() {
    const hr = document.createElement('hr')
    hr.style.width = '80%'
    return hr
}

// Search Func
async function searchBy() {
    // Get input search
    const input = document.getElementById('searchInput')
    const filterArray = await data.then(resp => resp.filter(product => product.category.toUpperCase().includes(input.value.toUpperCase()) ||
        product.title.toUpperCase().includes(input.value.toUpperCase())))
    const cardsDiv = document.getElementById('cardsDiv');
    cardsDiv.remove();

    // Remove header 'Product'
    const headerProduct = document.getElementById('headerProduct')
    main.removeChild(headerProduct)

    // 
    craeteHeaderProduct('sherch')
    craeteCards(filterArray)
}


// Filter And search div
function createFilterDIv() {
    const filterSearchDiv = document.getElementById('filter');

    // Filter div
    const filterDiv = createDiv('flex');

    // Btns filter
    const allProducts = createBtnFilter('All products', "#ffdecb", "All Products");
    const men = createBtnFilter('Men', "#fec09c", "men's clothing");
    const women = createBtnFilter('Women', "#fec09c", "women's clothing");
    const jewelery = createBtnFilter('Jewelery', "#fec09c", "jewelery");
    const electronics = createBtnFilter('Electronics', "#fec09c", "electronics");

    // Search div
    const searchDiv = createSearchDiv()

    // search
    const search = createInput('input', 'search');
    search.id = 'searchInput'

    // search img
    const searchImg = createImg("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ4IDQ4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJtNDAuOSAzOS40ODUtNy44MTMtNy44MTJhMTQuODc4IDE0Ljg3OCAwIDAgMCAzLjcyLTkuODY1YzAtNC4wMDctMS41Ni03Ljc3NC00LjM5My0xMC42MDdzLTYuNi00LjM5My0xMC42MDYtNC4zOTNTMTQuMDM0IDguMzY4IDExLjIgMTEuMnMtNC4zOTMgNi42LTQuMzkzIDEwLjYwNyAxLjU2IDcuNzczIDQuMzkzIDEwLjYwNiA2LjYgNC4zOTQgMTAuNjA3IDQuMzk0YzMuNjcgMCA3LjEzLTEuMzIzIDkuODY1LTMuNzIxbDcuODEyIDcuODEyYS45OTcuOTk3IDAgMCAwIDEuNDE0IDAgMSAxIDAgMCAwIDAtMS40MTR6TTEyLjYxNCAzMWMtMi40NTUtMi40NTYtMy44MDctNS43Mi0zLjgwNy05LjE5MnMxLjM1Mi02LjczNyAzLjgwNy05LjE5M2MyLjQ1Ni0yLjQ1NSA1LjcyLTMuODA3IDkuMTkzLTMuODA3UzI4LjU0NCAxMC4xNiAzMSAxMi42MTVjMi40NTUgMi40NTYgMy44MDggNS43MiAzLjgwOCA5LjE5M1MzMy40NTUgMjguNTQ0IDMxIDMxYy0yLjQ1NiAyLjQ1NS01LjcyIDMuODA4LTkuMTkyIDMuODA4UzE1LjA3IDMzLjQ1NSAxMi42MTUgMzF6IiBmaWxsPSIjNTM0NjRhIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBvcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==",
        '25px', '25px')
    searchImg.id = 'searchImg'
    searchImg.addEventListener('click', () => {
        searchBy()
    })


    // add btsn
    filterDiv.appendChild(allProducts);
    filterDiv.appendChild(men);
    filterDiv.appendChild(women);
    filterDiv.appendChild(jewelery);
    filterDiv.appendChild(electronics);

    // add search
    searchDiv.appendChild(search)
    searchDiv.appendChild(searchImg)

    filterSearchDiv.appendChild(filterDiv)
    filterSearchDiv.appendChild(searchDiv);
}

// Create div card
function createCardsDiv() {
    const cardsDiv = createDiv('flex', 'cardsDiv')
    return cardsDiv
}

// Craete cards func
function craeteCards(array) {

    //  Get cards div
    const cardsDiv = createCardsDiv()

    array.forEach(product => {
        // Create card div
        const card = createDiv('block', product.id, "cardDiv");

        // Product img
        const img = createImg(product.image, '100%', 'auto');
        card.appendChild(img);

        // Product title
        const title = craeteH('h5', product.title, '20px', "title");
        card.appendChild(title);

        // Divider
        const divider = createHr()
        card.appendChild(divider);

        // Price div
        const priceDiv = createDiv('flex', 'priceDiv');
        const priceLebel = craeteH('h2', product.price + " $", '25px');
        priceDiv.appendChild(priceLebel)
        card.appendChild(priceDiv)

        // Quantity main Div
        const quantityDiv = createDiv('flex', "quantityDiv");

        // quantity Functionlity Div
        const quantityFunctionlityDiv = createDiv('flex', "quantityFunctionlityDiv");

        // Quantity title
        const titleQuantity = craeteH('p', "Quantity", '12px', "titleQuantity");

        // Quantity
        const quantity = craeteH('h3', product.quantity, '25px', "quantity", 'quantity' + product.id);

        // quantity Up Btn 
        const quantityUpBtn = craeteH('h2', "▲", "10px", 'quantityBtns');
        quantityUpBtn.addEventListener('click', async () => {
            await updateQuantity('http://localhost:3000/api/upQuantity/', card.id);
        });

        // quantity down Btn 
        const quantityDownBtn = craeteH('h2', "▼", "10px", 'quantityBtns');
        quantityDownBtn.addEventListener('click', async () => {
            await updateQuantity('http://localhost:3000/api/downQuantity/', card.id);
        });

        // Appand childs
        quantityDiv.appendChild(titleQuantity);

        quantityFunctionlityDiv.appendChild(quantityUpBtn);
        quantityFunctionlityDiv.appendChild(quantity);
        quantityFunctionlityDiv.appendChild(quantityDownBtn);

        quantityDiv.appendChild(quantityFunctionlityDiv);
        card.appendChild(quantityDiv);


        // Icons
        const iconsDiv = createDiv('flex', 'iconsDiv');

        // Delete icon
        const deleteI = createImg("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPjxwYXRoIGQ9Ik00MjQgNjRoLTg4VjQ4YzAtMjYuNTEtMjEuNDktNDgtNDgtNDhoLTY0Yy0yNi41MSAwLTQ4IDIxLjQ5LTQ4IDQ4djE2SDg4Yy0yMi4wOTEgMC00MCAxNy45MDktNDAgNDB2MzJjMCA4LjgzNyA3LjE2MyAxNiAxNiAxNmgzODRjOC44MzcgMCAxNi03LjE2MyAxNi0xNnYtMzJjMC0yMi4wOTEtMTcuOTA5LTQwLTQwLTQwek0yMDggNDhjMC04LjgyIDcuMTgtMTYgMTYtMTZoNjRjOC44MiAwIDE2IDcuMTggMTYgMTZ2MTZoLTk2ek03OC4zNjQgMTg0YTUgNSAwIDAgMC00Ljk5NCA1LjIzOGwxMy4yIDI3Ny4wNDJjMS4yMiAyNS42NCAyMi4yOCA0NS43MiA0Ny45NCA0NS43MmgyNDIuOThjMjUuNjYgMCA0Ni43Mi0yMC4wOCA0Ny45NC00NS43MmwxMy4yLTI3Ny4wNDJhNSA1IDAgMCAwLTQuOTk0LTUuMjM4ek0zMjAgMjI0YzAtOC44NCA3LjE2LTE2IDE2LTE2czE2IDcuMTYgMTYgMTZ2MjA4YzAgOC44NC03LjE2IDE2LTE2IDE2cy0xNi03LjE2LTE2LTE2em0tODAgMGMwLTguODQgNy4xNi0xNiAxNi0xNnMxNiA3LjE2IDE2IDE2djIwOGMwIDguODQtNy4xNiAxNi0xNiAxNnMtMTYtNy4xNi0xNi0xNnptLTgwIDBjMC04Ljg0IDcuMTYtMTYgMTYtMTZzMTYgNy4xNiAxNiAxNnYyMDhjMCA4Ljg0LTcuMTYgMTYtMTYgMTZzLTE2LTcuMTYtMTYtMTZ6IiBmaWxsPSIjNTM0NjRhIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iIiBvcGFjaXR5PSIxIj48L3BhdGg+PC9nPjwvc3ZnPg==");
        deleteI.classList.add('bigHover')
        deleteI.style.justifyContent = 'left';
        deleteI.addEventListener('click', async () => {
            await fetch('http://localhost:3000/api/' + card.id, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        card.remove()
                    };
                });
        });

        // Edit icon
        const editI = createImg("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDQ5Mi40OTMgNDkyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyIiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48cGF0aCBkPSJNMzA0LjE0IDgyLjQ3MyAzMy4xNjUgMzUzLjQ2OWExMC43OTkgMTAuNzk5IDAgMCAwLTIuODE2IDQuOTQ5TC4zMTMgNDc4Ljk3M2ExMC43MTYgMTAuNzE2IDAgMCAwIDIuODE2IDEwLjEzNiAxMC42NzUgMTAuNjc1IDAgMCAwIDcuNTI3IDMuMTE0IDEwLjYgMTAuNiAwIDAgMCAyLjU4Mi0uMzJsMTIwLjU1NS0zMC4wNGExMC42NTUgMTAuNjU1IDAgMCAwIDQuOTUtMi44MTJsMjcxLTI3MC45Nzd6TTQ3Ni44NzUgNDUuNTIzIDQ0Ni43MTEgMTUuMzZjLTIwLjE2LTIwLjE2LTU1LjI5Ny0yMC4xNC03NS40MzQgMGwtMzYuOTQ5IDM2Ljk1IDEwNS41OTggMTA1LjU5NyAzNi45NDktMzYuOTQ5YzEwLjA3LTEwLjA2NiAxNS42MTctMjMuNDY1IDE1LjYxNy0zNy43MTVzLTUuNTQ3LTI3LjY0OC0xNS42MTctMzcuNzE5em0wIDAiIGZpbGw9IiM1MzQ2NGEiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIG9wYWNpdHk9IjEiIGNsYXNzPSIiPjwvcGF0aD48L2c+PC9zdmc+");
        editI.style.marginLeft = '5px';
        editI.style.justifyContent = 'right';
        editI.classList.add('bigHover')

        iconsDiv.appendChild(deleteI);
        iconsDiv.appendChild(editI);
        card.appendChild(iconsDiv);

        cardsDiv.appendChild(card);

    })

    main.appendChild(cardsDiv)
}

// productPage fanc
function editProductPage() {
    const productPageDiv = createDiv('flex')
    productPageDiv.style.alignItems = 'center'
    productPageDiv.style.alignItems = 'center'

}


// Main func
async function home() {
    switch (page) {
        case 'load':
            craeteHeader();
            createFilterDIv();
            craeteHeaderProduct('load')
            craeteCards(await data)
            createFooter()
            page = 'home';
            break;
        case 'home':
            page = 'home';
            break;
        default:
            break;
    }

}

// load 
window.addEventListener('load', home);





