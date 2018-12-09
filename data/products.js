let products = [
  {
    id: 1,
    name: "mug"
  },
  {
    id: 2,
    name: "tshirt"
  },
  {
    id: 3,
    name: "cap"
  }
];

const addProduct = (name, description) => {
  const id = products[products.length - 1].id + 1;
  const newProduct = { id, name, description };
  products = [...products, newProduct];
  return { ...newProduct };
};

const getProducts = () => {
  return products;
};

module.exports = {
  getProducts,
  addProduct
};
