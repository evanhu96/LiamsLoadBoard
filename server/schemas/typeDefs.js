const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Load {
    hash: String
    company: String
    contact: String
    origin: String
    destination: String
    travelTime: Float
    hotSpot: String
    distanceFromHotSpot: String
    age: String
    notes: String
  }

  type Query {
    loadInputs(
      location: String
      arrivalDate: String
      dates: String
      distance: Float
      deadhead: Float
      combined: Float
    ): Load

    loads: [Load]
  }
`;

module.exports = typeDefs;
