var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var nameAlert=document.getElementById("nameAlert")
var priceAlert=document.getElementById("priceAlert")
var categoryAlert=document.getElementById("categoryAlert")
var inputs = document.getElementsByClassName('form-control');
var searchInput = document.getElementById('searchInput');
var addBtn = document.getElementById('addBtn');
var products = [];

if (localStorage.getItem("productInfo")!=null) {
    products=JSON.parse(localStorage.getItem("productInfo"))
    displayData()
}


addBtn.onclick = function () {
    addProject();
    displayData();
    clearForm();
}


function addProject() {
        var product = {
            name: productNameInput.value,
            price: productPriceInput.value,
            category: productCategoryInput.value,
            desc: productDescInput.value
        }
        products.push(product);
        localStorage.setItem("productInfo",JSON.stringify(products))
    
}

function displayData() {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        cartona += `<tr>
                        <td>${products[i].name}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].category}</td>
                        <td>${products[i].desc}</td>
                        <td><button onclick="getProductInfo(${i})" class="btn btn-warning">ubdate</button></td>
                        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                    </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function deleteProduct(first) {
    products.splice(first, 1);
    localStorage.setItem("productInfo",JSON.stringify(products))
    displayData();
}

function clearForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = ''
    }
}

searchInput.oninput = function () {
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
            cartona += `<tr>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].category}</td>
            <td>${products[i].desc}</td>
            <td><button onclick="getProductInfo(${i})" class="btn btn-warning">ubdate</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
        </tr>`

        }

    }
    document.getElementById('tableBody').innerHTML = cartona;
}

function getProductInfo(index){
    var currentProduct=products[index]
    productNameInput.value=currentProduct.name;
    productPriceInput.value=currentProduct.price;
    productCategoryInput.value=currentProduct.category;
    productDescInput.value=currentProduct.desc;
}

// validation 

productNameInput.onkeyup=function () {
    var regex=/^[A-Z][a-z]{2,9}$/
    if (regex.test(productNameInput.value)) {
        addBtn.removeAttribute("disabled");
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none")

    }
    else{
        addBtn.disabled="true";
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        nameAlert.classList.remove("d-none")
    }
}

productPriceInput.onkeyup=function () {
    var regex=/^[1-9]{2,9}$/
    if (regex.test(productPriceInput.value)) {
        addBtn.removeAttribute("disabled");
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        priceAlert.classList.add("d-none")
    }
    else{
        addBtn.disabled="true";
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        priceAlert.classList.remove("d-none")
    }
}
productCategoryInput.onkeyup=function () {
    var regex=/^[A-Z][a-z]{2,9}[1-9]{0,9}$/
    if (regex.test(productCategoryInput.value)) {
        addBtn.removeAttribute("disabled");
        productCategoryInput.classList.add("is-valid");
        productCategoryInput.classList.remove("is-invalid");
        categoryAlert.classList.add("d-none")
    }
    else{
        addBtn.disabled="true";
        productCategoryInput.classList.add("is-invalid");
        productCategoryInput.classList.remove("is-valid");
        categoryAlert.classList.remove("d-none")
    }
}
