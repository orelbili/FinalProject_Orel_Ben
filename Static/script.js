const tbody = document.getElementById("tbody");
const search = document.getElementById("search");
const addProductForm = document.getElementById("add-product-form");

if (addProductForm) {
    addProductForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const image = document.getElementById("image").value;
        const price = document.getElementById("price").value;

        fetch(`/addProduct`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                image,
                price,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                window.location.href = "/";
            });
    });
}

if (search) {
    search.addEventListener("input", (event) => {
        searchProducts(search.value);
    });
}

let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function searchProducts(search) {
    fetch(`/searchProducts?q=${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((products) => {
            if (products) {
                tbody.innerHTML = "";
                for (let product of products) {
                    tbody.innerHTML += `
                        <tr>
                            <td>${product.id}</td>
                            <td><img src="${product.image}"></td>
                            <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${dollarUS.format(product.price)}</td>
                        </tr>
                    `;
                }
            }
        });
}

function loadProducts() {
    fetch("/getProducts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((products) => {
            if (products) {
                tbody.innerHTML = "";
                for (let product of products) {
                    tbody.innerHTML += `
                        <tr>
                            <td>${product.id}</td>
                            <td><img src="${product.image}"></td>
                            <td>${product.title}</td>
                            <td>${product.description}</td>
                            <td>${dollarUS.format(product.price)}</td>
                        </tr>
                    `;
                }
            }
        });
}

function addProduct() {
    window.location.href = "/add-product";
}
