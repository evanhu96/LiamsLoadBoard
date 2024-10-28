const { gql } = require("apollo-server-express");
const mongoose = require("mongoose");

const typeDefs = gql`
  type Load {
    hash: String
    dates: String
    trip: Float
    lastScene: Float
    lastPosted: Float
    postEpoch: Float
    favorites: Boolean
    company: String
    contact: String
    origin: String
    distance: Float
    profit: Float
    rate: Float
    deadhead: Float
    destination: String
    travelTime: Float
    hotspot: String
    hotspotDistance: Float
    age: String
    notes: String
    clickNumber: String
    comments: String
    clickDetails: String
    currentDeadhead: Float
    tab: Float
  }
  type Input {
    location: String
    arrivalDate: String
    dates: String
    distance: Float
    deadhead: Float
    combined: Float
    notificationDeadhead: Float
    notificationDistance: Float
    notificationProfit: Float
    notificationTime: Float
    textDeadhead: Float
    textDistance: Float
    textProfit: Float
    textTime: Float
  }

  type Query {
    loadInputs(
      location: String
      arrivalDate: String
      dates: String
      distance: Float
      deadhead: Float
      combined: Float
    ): Input

    notificationInputs(
      notificationDistance: Float
      notificationDeadhead: Float
      notificationProfit: Float
      notificationTime: Float
    ): Input
    textInputs(
      textDistance: Float
      textDeadhead: Float
      textProfit: Float
      textTime: Float
    ): Input

    loads: [Load]

    cities: [String]
  }
`;

module.exports = typeDefs;
