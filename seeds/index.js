const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64eedb55c8569a0845dcb2e7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude, 
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/duofsmiyq/image/upload/v1694287088/YelpCamp/si2kmimowahalrljgi6a.jpg',
                    filename: 'YelpCamp/si2kmimowahalrljgi6a',
                  },
                  {
                    url: 'https://res.cloudinary.com/duofsmiyq/image/upload/v1694287089/YelpCamp/kxdzq87hcnsafnozb04t.jpg',
                    filename: 'YelpCamp/kxdzq87hcnsafnozb04t',
                  },
                  {
                    url: 'https://res.cloudinary.com/duofsmiyq/image/upload/v1694287090/YelpCamp/faon2lh3kzcioqxd0jwt.jpg',
                    filename: 'YelpCamp/faon2lh3kzcioqxd0jwt',
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})