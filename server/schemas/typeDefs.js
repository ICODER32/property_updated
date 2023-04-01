const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    isAdmin: Boolean
    properties: [Property]
    propertiesByUserId(user_id: ID!): [Property]
  }

  type Property {
    _id: ID!
    user_id: ID!
    name: String!
    images: [String!]!
    night_cost: Float!
    isAvailable: Boolean!
    room: Boolean!
    startDate:String! 
    endDate:String!
    house: Boolean!
    max_guests: Int!
    bed_number: Int!
    bath_number: Int!
    location: Location!
    address: String!
    description: String!
  }

  type Location {
    type: String
    coordinates: [Float]
  }

  type Auth {
    token: ID
    user: User
  }

  type CheckoutSession {
    id: ID!
    url: String!
  }

  type Query {
    user: User
    property(_id: ID!): Property
    properties: [Property]
    userProperties(user_id:ID!):[Property]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProperty(
      user_id: ID!
      name: String!
      images: [String!]!
      night_cost: Float!
      isAvailable: Boolean!
      room: Boolean!
      house: Boolean!
      max_guests: Int!
      bed_number: Int!
      bath_number: Int!
      startDate:String!
      endDate:String!
      location: LocationInput!
      address: String!
      description: String!
    ): Property!
    updateProperty(
      _id: ID!
      name: String
      address: String
      startDate:String
      endDate:String
      user_id: ID
      images: [String]
      night_cost: Float
      isAvailable: Boolean
      room: Boolean
      house: Boolean
      max_guests: Int
      bed_number: Int
      bath_number: Int
      location: LocationInput
      description: String
    ): Property
    deleteProperty(_id: ID!): Property
    signupAdmin(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    adminLogin(email: String!, password: String!): Auth
    createCheckoutSession(propertyId: ID!, nights: Int!): CheckoutSession!
  }

  input LocationInput {
    type: String
    coordinates: [Float]
    longitude: Float
  }
`;

module.exports = typeDefs;
