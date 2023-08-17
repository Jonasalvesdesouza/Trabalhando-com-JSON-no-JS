function state(initialValue) {
  let value = initialValue;

  function getValue() {
    return value;
  }

  function setValue(newValue) {
    value = newValue;
  }

  return [getValue, setValue];
}

const [database, setDatabase] = state([
  {
    id: 1,
    nome: "Televisao",
    preco: 2500,
  },
  {
    id: 2,
    nome: "Geladeira",
    preco: 4599,
  },
  {
    id: 3,
    nome: "Forno Eletrico",
    preco: 500,
  },
  {
    id: 4,
    nome: "Churrasqueira Eletrica",
    preco: 999,
  },
]);

const [cart, setCart] = state([]);

function showProducts(products = database()) {
  const container = document.querySelector("#produtos");

  products.forEach((product) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<li>
      ${product.nome},
      R$ ${product.preco}
        <button onClick={addToCart(${product.id})} id={${product.id}}>
          Adicionar ao Carrinho
        </button>
      </li>
      `
    );
  });
  return container;
}

function addToCart(id, products = database()) {
  const selectedProduct = products.find((element) => element.id === id);

  setCart([...cart(), selectedProduct]);

  return showProductsInCart();
}

function showProductsInCart(products = cart()) {
  const container = document.querySelector("#carrinho");

  container.innerHTML = "";

  products.forEach((product) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<li>
      ${product.nome},
      R$ ${product.preco}
        <button onClick={removeFromCart(${product.id})} id={${product.id}}>
          Remover do Carrinho
        </button>
      </li>
      `
    );
  });
  return container;
}

function removeFromCart(id, products = cart()) {
  const findProduct = products.findIndex((element) => element.id === id);

  const newCartProducts = [...products];

  newCartProducts.splice(findProduct, 1);

  setCart(newCartProducts);

  return showProductsInCart();
}

showProducts();
