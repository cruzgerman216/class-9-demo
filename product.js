function addProductToList() {
  // Step 1: get your data elements
  const formTitle = document.getElementById("formTitle").value
  const formDescription = document.getElementById("formDescription").value
  const formImageSource = document.getElementById("formImageSource").value
  const formPrice = Number(document.getElementById("formPrice").value)

  const product = {
    title: formTitle, 
    description: formDescription, 
    image: formImageSource,
    price: formPrice
  }

  createProductCard(product)
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('card', 'product-card', 'col-6', 'col-md-4', 'col-lg-3');

  card.innerHTML = `
      <img src="${product.image}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <div class="card-text">
          <p class="product-description">${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
        </div>

        <button type="button" class="btn btn-primary cart-button">Add to Cart</button>
      </div>
    `;

  const cardButton = card.querySelector('.cart-button');
  cardButton.addEventListener('click', () => {
    cart.addItem(product);
  });

  productContainer.appendChild(card);

}