const db = require('./connection');
const { Property, User } = require('../models');
const bcrypt = require('bcrypt')

db.once('open', async () => {

    // Delete all existing users and properties
    await User.deleteMany({});
    await Property.deleteMany({});

    // Create a new user
    const user = await User.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        password: "password123",
        isAdmin: true,
    });
    const user2 = await User.create({
        firstName: 'Emily',
        lastName: 'Smith',
        email: 'emily@example.com',
        password: "password123",
        isAdmin: false,
    });

    // Create some properties owned by the user
    const properties = await Property.insertMany([
        {
            user_id: user._id,
            name: 'Beach House',
            images: ['https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?cs=srgb&dl=pexels-binyamin-mellish-186077.jpg&fm=jpg', 'https://ap.rdcpix.com/4226aab6867adee24381481c13b8b603l-m1654096563od-w480_h360_x2.jpg'],
            night_cost: 50,
            isAvailable: false,
            room: true,
            house: false,
            max_guests: 6,
            bed_number: 3,
            bath_number: 2,
            startDate: new Date('12-04-2012'),
            endDate: new Date('6-01-2024'),
            location: {
                type: 'Point',
                coordinates: [21.521, 25.55],
            },
            address: '256 Main St, Calf',
            description: 'House with great view and affordable price',
        },
        {
            user_id: user._id,
            name: 'Pent House',
            images: ['https://charlotte.axios.com/wp-content/uploads/2022/01/hot-homes-charlotte.jpeg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCxuHtcef_GV6X9TLImxW4-QJ7gkflZAyTlX29ofhsgv2SBAK7LI2TDE_DuTKIt6ZSi-g&usqp=CAU'],
            night_cost: 35,
            isAvailable: true,
            room: false,
            house: true,
            max_guests: 6,
            bed_number: 3,
            bath_number: 2,
            startDate: new Date('12-04-2012'),
            endDate: new Date('6-01-2012'),
            location: {
                type: 'Point',
                coordinates: [201.521, 15.55],
            },
            address: '221 Fella St, NY',
            description: 'Pent house with great view',
        },
    ]);

    console.log(`User ${user.email} created with properties:`);
    console.log(properties);

    // Close the database connection
    db.close();
});
