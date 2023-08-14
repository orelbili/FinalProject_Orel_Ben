const tbody = document.getElementById("tbody");
const search = document.getElementById("search");
search.addEventListener("input", (event) => {
    searchProducts(search.value);
});

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
