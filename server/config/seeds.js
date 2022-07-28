const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Kitkat' },
    { name: 'Aero' },
    { name: 'Reeses' },
    { name: 'Smarties' },
    { name: 'Mars' },
    { name: 'Coffee Crisp' },
    { name: 'Oh Henry!' },
    { name: 'Awake' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Kitkat Original',
      description:
        'Chocolate covered waffer bars. Original flavour.',
      image: 'kitkat.jpg',
      category: categories[0]._id,
      price: 200,
      quantity: 5
    },
    {
      name: 'Kitkat Matcha',
      description:
        'Chocolate covered waffer bars. Matcha flavour.',
      image: 'kitkatmatcha.jpg',
      category: categories[0]._id,
      price: 200,
      quantity: 2
    },
    {
      name: 'Kitkat White',
      description:
        'Chocolate covered waffer bars. White chocolate flavour.',
      image: 'kitkatwhite.jpg',
      category: categories[0]._id,
      price: 200,
      quantity: 1
    },
    {
      name: 'Kitkat Chunky',
      description:
        'Chocolate covered waffer bars. Chunky version.',
      image: 'kitkatchunky.jpg',
      category: categories[0]._id,
      price: 200,
      quantity: 3
    },
    {
      name: 'Aero Original',
      description:
        'Creamy milk chocolate with a unique bubbly texture that collapses as the bar melts in your mouth. Original flavour.',
      image: 'aero.jpg',
      category: categories[1]._id,
      price: 200,
      quantity: 8
    },
    {
      name: 'Aero White',
      description:
        'Creamy milk chocolate with a unique bubbly texture that collapses as the bar melts in your mouth.',
      image: 'aerowhite.jpg',
      category: categories[1]._id,
      price: 200,
      quantity: 3
    },
    {
      name: 'Reeses Original',
      category: categories[2]._id,
      description:
        'Milk chocolate cups filled with decadent peanut butter filling. Original flavour.',
      image: 'reeses.jpg',
      price: 250,
      quantity: 3
    },
    {
      name: 'Reeses Big Cup',
      category: categories[2]._id,
      description:
        'Milk chocolate cups filled with decadent peanut butter filling. Big cup version.',
      image: 'reesesbigcup.jpg',
      price: 300,
      quantity: 1
    },
    {
      name: 'Smarties Original',
      category: categories[3]._id,
      description:
        'Colourful sugar-coated milk chocolate spheroids. Original flavour.',
      image: 'smarties.jpg',
      price: 150,
      quantity: 5
    },
    {
      name: 'Mars Original',
      category: categories[4]._id,
      description:
        'Candy bar filled with nougat and toasted almonds covered with a luxurious layer of milk chocolate. Original flavour.',
      image: 'mars.jpg',
      price: 200,
      quantity: 2
    },
    {
      name: 'Coffee Crisp Original',
      category: categories[5]._id,
      description:
        'Candy bar consisting of alternating layers of vanilla wafer and foamed coffee-flavoured soft candy covered with a milk chocolate outer layer. Original flavour.',
      image: 'coffeecrisp.jpg',
      price: 150,
      quantity: 6
    },
    {
      name: 'Coffee Crisp Latte',
      category: categories[5]._id,
      description:
        'Candy bar consisting of alternating layers of vanilla wafer and foamed coffee-flavoured soft candy covered with a milk chocolate outer layer. Latte flavour.',
      image: 'coffeecrisplatte.png',
      price: 150,
      quantity: 2
    },
    {
      name: 'Oh Henry! Original',
      category: categories[6]._id,
      description:
        'Delicious combination of big crunchy peanuts, creamy caramel, chewy fudge, covered with a chocolaty coating. Original flavour.',
      image: 'ohhenry.jpg',
      price: 200,
      quantity: 7
    },
    {
      name: 'Oh Henry! Peanut Butter',
      category: categories[6]._id,
      description:
        'Delicious combination of big crunchy peanuts, creamy caramel, chewy fudge, covered with a chocolaty coating. Peanut butter flavour.',
      image: 'ohhenrypeanutbutter.jpg',
      price: 200,
      quantity: 7
    },
    {
      name: 'Awake Original',
      category: categories[7]._id,
      description:
        'Creamy milk chocolate alternative to coffee and energy drinks that is equivalent to 1/2 cups of coffee with no bitter aftertaste. Original flavour.',
      image: 'awake.jpg',
      price: 300,
      quantity: 5
    },
    {
      name: 'Awake Caramel',
      category: categories[7]._id,
      description:
        'Creamy milk chocolate alternative to coffee and energy drinks that is equivalent to 1/2 cups of coffee with no bitter aftertaste. Caramel flavour.',
      image: 'awakecaramel.jpg',
      price: 300,
      quantity: 3
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
