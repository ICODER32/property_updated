const { AuthenticationError } = require('apollo-server-express');
const { User, Property } = require('../models');
const { signToken } = require('../utils/auth')
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate('properties');
                return user;
            }
            throw new AuthenticationError('Not logged in');
        },
        property: async (parent, { _id }) => {
            return Property.findById(_id);
        },
        properties: async () => {
            return Property.find();
        },
        userProperties: async (parent, { user_id }) => {
            const properties = await Property.find({ user_id })
            return properties
        }

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            console.log('first')
            const user = await User.findOne({ email });
            if (user.isAdmin) {

                throw new AuthenticationError('Unauthorized');
            }
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        signupAdmin: async (parent, args) => {
            const user = await User.create({ ...args, isAdmin: true });
            const token = signToken(user);
            return { token, user };
        },
        adminLogin: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            if (!user.isAdmin) {
                throw new AuthenticationError('Unauthorized');
            }
            const token = signToken(user);
            return { token, user };
        },
        async addProperty(_, args) {
            const property = new Property({
                user_id: args.user_id,
                name: args.name,
                images: args.images,
                night_cost: args.night_cost,
                isAvailable: args.isAvailable,
                room: args.room,
                house: args.house,
                max_guests: args.max_guests,
                bed_number: args.bed_number,
                bath_number: args.bath_number,
                location: args.location,
                address: args.address,
                startDate: args.startDate,
                endDate: args.endDate,
                description: args.description,
            });
            const result = await property.save();
            return result;
        },
        updateProperty: async (parent, input, context) => {
            // if (context.user && context.user.isAdmin) {
            const { _id, ...updates } = input;
            const property = await Property.findByIdAndUpdate(_id, updates, { new: true });
            if (property) {
                return property;
            }
            throw new Error('Property not found');
            // }
            throw new AuthenticationError('Not logged in or Unauthorized');
        },
        deleteProperty: async (parent, { _id }, context) => {
            // if (context.user) {
            const property = await Property.findByIdAndDelete(_id);
            return property
            // }
            // throw new AuthenticationError('Not logged in');
        },
        createCheckoutSession: async (parent, { propertyId, nights }, context) => {
            const property = await Property.findById(propertyId);

            const url = new URL(context.headers.referer).origin;
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: property.name,
                            },
                            unit_amount: property.night_cost * 100, // convert to cents
                        },
                        quantity: nights,
                    },
                ],
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return {
                id: session.id,
                url: session.url,
            };
        }
    },
    User: {
        properties: async (user) => {
            // Retrieve the properties for the specified user
            const properties = await Property.find({ user_id: user._id });

            return properties;
        }
    }
};

module.exports = resolvers
