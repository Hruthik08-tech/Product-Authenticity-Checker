// Read product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Load JSON
fetch("ProductInfo/productData.json")
    .then(response => response.json())
    .then(products => {
        const product = products.find(p => p.id === productId);

        if (!product) {
            document.getElementById("productinfo").innerHTML = "<h2>Product not found</h2>";
            return;
        }

        document.getElementById("productinfo").innerHTML = `
            <div class = "left_section"> 
                <h2 id = "product_name">${product.name}</h2>
                <img src="${product.image}" height="300px" width="300px" id = "image">

                <div class = "info_box">
                <p id = "price" ><strong>Price:</strong> ₹${product.price}</p>
                <p id = "claim" ><strong>Claim:</strong> ${product.product_claim}</p>
                </div> 

            </div> 

            <div class = "right_section">
                <h3>Ingredients:</h3>
                <ul id = "ing_table">
                    ${product.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div> 
        `;
    })
    .catch(err => console.error("Error loading product JSON:", err));

