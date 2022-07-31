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
      image: 'kitkat.png',
      category: categories[0]._id,
      price: 200,
      quantity: 5
    },
    {
      name: 'Kitkat Matcha',
      description:
        'Chocolate covered waffer bars. Matcha flavour.',
      image: 'kitkatmatcha.png',
      category: categories[0]._id,
      price: 200,
      quantity: 2
    },
    {
      name: 'Kitkat White',
      description:
        'Chocolate covered waffer bars. White chocolate flavour.',
      image: 'kitkatwhite.png',
      category: categories[0]._id,
      price: 200,
      quantity: 1
    },
    {
      name: 'Kitkat Chunky',
      description:
        'Chocolate covered waffer bars. Chunky version.',
      image: 'kitkatchunky.png',
      category: categories[0]._id,
      price: 200,
      quantity: 3
    },
    {
      name: 'Aero Original',
      description:
        'Creamy milk chocolate with a unique bubbly texture that collapses as the bar melts in your mouth. Original flavour.',
      image: 'aero.png',
      category: categories[1]._id,
      price: 200,
      quantity: 8
    },
    {
      name: 'Aero White',
      description:
        'Creamy milk chocolate with a unique bubbly texture that collapses as the bar melts in your mouth. White Chocolate flavour',
      image: 'aerowhite.png',
      category: categories[1]._id,
      price: 200,
      quantity: 5
    },
    {
      name: 'Aero Caramel',
      description:
        'Creamy milk chocolate with a unique bubbly texture that collapses as the bar melts in your mouth, now combined with the sweet flavor of caramel',
      image: 'aerocaramel.png',
      category: categories[1]._id,
      price: 200,
      quantity: 2
    },
    {
      name: 'Aero Peppermint',
      description:
        'Creamy milk chocolate with a unique bubbly texture that collapses as the bar melts in your mouth, now combined with the refreshing flavor of peppermint',
      image: 'aeromint.png',
      category: categories[1]._id,
      price: 200,
      quantity: 2
    },
    {
      name: 'Reeses Original',
      category: categories[2]._id,
      description:
        'Milk chocolate cups filled with decadent peanut butter filling. Original flavour.',
      image: 'reeses.png',
      price: 250,
      quantity: 8
    },
    {
      name: 'Reeses Big Cup',
      category: categories[2]._id,
      description:
        'Milk chocolate cups filled with decadent peanut butter filling. Big cup version.',
      image: 'reesesbigcup.png',
      price: 300,
      quantity: 4
    },
    {
      name: 'Reeses Ultimate',
      category: categories[2]._id,
      description:
        'Milk chocolate cups filled with decadent peanut butter filling. Ultimate version for peanut butter lovers!',
      image: 'reesesultimate.png',
      price: 500,
      quantity: 2
    },
    {
      name: 'Reeses Potato Chips',
      category: categories[2]._id,
      description:
        'Milk chocolate cups filled with decadent peanut butter and potato chips filling. Savory and sweet!',
      image: 'reeseschips.png',
      price: 600,
      quantity: 1
    },
    {
      name: 'Smarties Original',
      category: categories[3]._id,
      description:
        'Colourful sugar-coated milk chocolate spheroids. Original flavour.',
      image: 'smarties.png',
      price: 150,
      quantity: 5
    },
    {
      name: 'Smarties White Chocolate',
      category: categories[3]._id,
      description:
        'Colourful sugar-coated milk chocolate spheroids. White chocolate flavour.',
      image: 'smartieswhite.png',
      price: 300,
      quantity: 2
    },
    {
      name: 'Smarties Bar',
      category: categories[3]._id,
      description:
        'Colourful sugar-coated milk chocolate spheroids embedded in a chocolate bar! Share with your friends!',
      image: 'smartiesbar.png',
      price: 1000,
      quantity: 1
    },
    {
      name: 'Mars Original',
      category: categories[4]._id,
      description:
        'Candy bar filled with nougat and toasted almonds covered with a luxurious layer of milk chocolate. Original flavour.',
      image: 'mars.png',
      price: 200,
      quantity: 5
    },
    {
      name: 'Mars Almond',
      category: categories[4]._id,
      description:
        'Candy bar filled with nougat and toasted almonds covered with a luxurious layer of milk chocolate. Almond flavour.',
      image: 'marsalmond.png',
      price: 300,
      quantity: 2
    },
    {
      name: 'Mars Protein',
      category: categories[4]._id,
      description:
        'Candy bar filled with nougat and toasted almonds covered with a luxurious layer of milk chocolate. Almond flavour.',
      image: 'marsprotein.png',
      price: 1000,
      quantity: 1
    },
    {
      name: 'Coffee Crisp Original',
      category: categories[5]._id,
      description:
        'Candy bar consisting of alternating layers of vanilla wafer and foamed coffee-flavoured soft candy covered with a milk chocolate outer layer. Original flavour.',
      image: 'coffeecrisp.png',
      price: 150,
      quantity: 6
    },
    {
      name: 'Coffee Crisp Latte',
      category: categories[5]._id,
      description:
        'Candy bar consisting of alternating layers of vanilla wafer and foamed coffee-flavoured soft candy covered with a milk chocolate outer layer. Latte flavour.',
      image: 'coffeecrisplatte.png',
      price: 1000,
      quantity: 1
    },
    {
      name: 'Coffee Crisp Double Double',
      category: categories[5]._id,
      description:
        'Candy bar consisting of alternating layers of vanilla wafer and foamed coffee-flavoured soft candy covered with a milk chocolate outer layer. Now in double the trouble flavour.',
      image: 'coffeecrispdouble.png',
      price: 300,
      quantity: 3
    },
    {
      name: 'Oh Henry! Original',
      category: categories[6]._id,
      description:
        'Delicious combination of big crunchy peanuts, creamy caramel, chewy fudge, covered with a chocolaty coating. Original flavour.',
      image: 'ohhenry.png',
      price: 200,
      quantity: 7
    },
    {
      name: 'Oh Henry! Peanut Butter',
      category: categories[6]._id,
      description:
        'Delicious combination of big crunchy peanuts, creamy caramel, chewy fudge, covered with a chocolaty coating. Peanut butter flavour.',
      image: 'ohhenrypeanutbutter.png',
      price: 200,
      quantity: 7
    },
    {
      name: 'Oh Henry! Level Up',
      category: categories[6]._id,
      description:
        'Delicious combination of big crunchy peanuts, creamy caramel, chewy fudge, covered with a chocolaty coating, now comes with pretzel. Time to level up!',
      image: 'ohhenrylevelup.png',
      price: 500,
      quantity: 3
    },
    {
      name: 'Awake Milk',
      category: categories[7]._id,
      description:
        'Creamy milk chocolate alternative to coffee and energy drinks that is equivalent to 1/2 cups of coffee with no bitter aftertaste. Milk chocolate flavour.',
      image: 'awakemilk.png',
      price: 300,
      quantity: 5
    },
    {
      name: 'Awake Dark',
      category: categories[7]._id,
      description:
        'Creamy milk chocolate alternative to coffee and energy drinks that is equivalent to 1/2 cups of coffee with no bitter aftertaste. Dark chocolate flavour.',
      image: 'awakedark.png',
      price: 300,
      quantity: 5
    },
    {
      name: 'Awake Caramel',
      category: categories[7]._id,
      description:
        'Creamy milk chocolate alternative to coffee and energy drinks that is equivalent to 1/2 cups of coffee with no bitter aftertaste. Caramel flavour.',
      image: 'awakecaramel.png',
      price: 300,
      quantity: 5
    },
    {
      name: 'Awake 9 Pack',
      category: categories[7]._id,
      description:
        'Creamy milk chocolate alternative to coffee and energy drinks that is equivalent to 1/2 cups of coffee with no bitter aftertaste. 9 Variety Pack.',
      image: 'awakepack.png',
      price: 2400,
      quantity: 1
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    bitcoin: 400,
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
    password: 'password12345',
    bitcoin: 600
  });

  console.log('users seeded');

  process.exit();
});
