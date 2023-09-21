class ShoppingCartObserver {
    // instance properties
    items = [];
    observers = [];

    // add item
    addItem(item) {
        console.log(item);
        // add item to items
        this.items.push(item);

        // store items to local storage
        localStorage.setItem("currentCart", JSON.stringify(this.items))

        // notify all subscribers that an item has been added
        this.notifyAll();
    }

    setItems(items){
      this.items = items; 

      this.notifyAll();
    }

    // clear cart
    clear() {
      this.items = [];
      localStorage.removeItem("currentCart")
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

cart.subscribe(updateCartTotal);

// get items from local storage 
const localCart = JSON.parse(localStorage.getItem("currentCart")) || [];

cart.setItems(localCart);

// https://fakestoreapi.com/products?limit=20
fetch('https://fakestoreapi.com/products?limit=20')
  .then(res => res.json())
  .then(data => renderProducts(data));

clearCartButton.addEventListener('click', () => {
  cart.clear();
})

function updateCartTotal(items) {
  cartQuantityElement.innerText = items.length;
}

function renderProducts(products) {
  products.forEach(product => {
    createProductCard(product);
  });
}