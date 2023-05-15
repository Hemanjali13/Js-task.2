// Define categories
const categories = ['Electronics', 'Clothing', 'Home Decor'];

// Generate products
const products = [
  { category: 'Electronics', color: 'Black', size: 'Medium', price: 98, name: 'Smartphone' },
  { category: 'Clothing', color: 'Blue', size: 'Large', price: 40, name: 'T-Shirt' },
  { category: 'Electronics', color: 'White', size: 'Small', price: 200, name: 'Laptop' },
  { category: 'Home Decor', color: 'Red', size: 'Large', price: 150, name: 'Cushion' },
];

// Generate reports
function generateCategoryWiseReport() {
  const report = {};

  for (const category of categories) {
    report[category] = products.filter(product => product.category === category);
  }

  return report;
}

function generateColorAndSizeReport(color, size) {
  return products.filter(product => product.color === color && product.size === size);
}

function generateTop5HighestPriceReport() {
  return products
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);
}

function generateNthHighestPriceReport(n) {
  const sortedProducts = products.sort((a, b) => b.price - a.price);
  const nthHighestPrice = sortedProducts[n - 1].price;

  return sortedProducts.filter(product => product.price === nthHighestPrice);
}

// Generate and display reports
console.log('Products list by category:');
console.log(generateCategoryWiseReport());

console.log('\nProducts list based on color and size:');
console.log(generateColorAndSizeReport('Black', 'Medium'));

console.log('\nTop 5 highest price products:');
console.log(generateTop5HighestPriceReport());

console.log('\n3rd highest price products:');
console.log(generateNthHighestPriceReport(3));
