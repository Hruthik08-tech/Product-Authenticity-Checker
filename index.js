async function loadAndColorProducts() {
    try {
        //Load Harmful Ingredients
        const harmfulRes = await fetch("ProductInfo/chemicalData.json");
        const harmfulList = await harmfulRes.json();
        const harmfulSet = new Set(harmfulList);

        //Load Product List 
        const productRes = await fetch("ProductInfo/productData.json");
        const productList = await productRes.json();

        //Loop through products each product 
        for (const product of productList) {
            const box = document.getElementById(product.id);

            if (!box) {
                console.error(`HTML element not found with: ${product.id}`)
                continue;

            }

            // Check if any ingredient is harmful 
            const hasHarmfulIngredient = product.ingredients.some(ingredient => harmfulSet.has(ingredient.toLowerCase()));

            // Color the box based on the presence of harmful ingredients 
            if (hasHarmfulIngredient) {
                box.style.backgroundColor = "tomato"; // Harmful ingredient found 
            } else {
                box.style.backgroundColor = "lightgreen"; // No harmful ingredients 
            }

            await new Promise(resolve => setTimeout(resolve, 200)); // Pause for 500 milliseconds 

        }
    } catch (error) {
        console.error("Error loading JSON files:", error)
    }
}



function openProductDetails(id) {
    window.location.href = `productDisplay.html?id=${id}`;
}

