class ShoppingCartObserver {
    // instance properties
    items = [];
    observers = [];

    // add item
    addItem(item) {
        console.log(item);
        // add item to items
        this.items.push(item);
        // notify all subscribers that an item has been added
        this.notifyAll();
    }

    // clear cart
    clear() {
      this.items = [];
      this.notifyAll();
    }

    // add subscriber to observers
    subscribe(observer) {
        this.observers.push(observer);
    }

    // broadcast information to all subscribers
    notifyAll() {
        this.observers.forEach((observer) => observer(this.items));
    }
}

const cart = new ShoppingCartObserver();
const productContainer = document.querySelector('.product-container');
const cartQuantityElement = document.getElementById('cart-quantity');
const clearCartButton = document.getElementById('clear-cart');

// https://fakestoreapi.com/products?limit=20
fetch('https://fakestoreapi.com/products?limit=20')
  .then(res => res.json())
  .then(data => renderProducts(data));


cart.subscribe(updateCartTotal);

clearCartButton.addEventListener('click', () => {
  cart.clear();
})

function updateCartTotal(items) {
  cartQuantityElement.innerText = items.length;
}

function renderProducts(products) {
  products.forEach(product => {
    // Create card
    const card = document.createElement('div');
    card.classList.add('card', 'product-card', 'col-3');

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


    // // create card image
    // const cardImage = document.createElement('img');
    // cardImage.classList.add('card-img-top');
    // cardImage.src = product.image;

    // // create card body
    // const cardBody = document.createElement('div');
    // cardBody.classList.add('card-body');

    // // create card title
    // const cardTitle = document.createElement('h5');
    // cardTitle.classList.add('card-title');
    // cardTitle.innerText = product.title;

    // // create card text
    // const cardText = document.createElement('div');
    // cardText.classList.add('card-text');

    // // create product description element
    // const productDescriptionElement = document.createElement('p');
    // productDescriptionElement.classList.add('product-description');
    // productDescriptionElement.innerText = product.description;

    // // create product price elemenmt
    // const productPriceElement = document.createElement('p');
    // productPriceElement.classList.add('product-price');
    // productPriceElement.innerText = `$${product.price.toFixed(2)}`;


    // // create card button
    // const cardButton = document.createElement('button');
    // cardButton.classList.add('btn', 'btn-primary');
    // cardButton.type = 'button';
    // cardButton.innerText = 'Add to Cart';
    // cardButton.addEventListener('click', () => {
    //   cart.addItem(product);
    // });

    // // add description and price to card text
    // cardText.append(productDescriptionElement, productPriceElement);
    // // cardText.appendChild(productPriceElement);

    // // add card title, card text, and card button to body
    // cardBody.appendChild(cardTitle);
    // cardBody.appendChild(cardText);
    // cardBody.appendChild(cardButton);

    // // add image and body to card
    // card.appendChild(cardImage);
    // card.appendChild(cardBody);

    // add card to product container
    productContainer.appendChild(card);
  });
}