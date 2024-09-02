import { gql } from "@apollo/client";
export const SEND_LOAD_INPUTS = gql`
  query LoadInputs(
    $location: String
    $arrivalDate: String
    $dates: String
    $distance: Float
    $deadhead: Float
    $combined: Float
  ) {
    loadInputs(
      location: $location
      arrivalDate: $arrivalDate
      dates: $dates
      distance: $distance
      deadhead: $deadhead
      combined: $combined
    ) {
      location
      arrivalDate
      dates
      distance
      deadhead
      combined
    }
  }
`;
export const SEND_NOTIFICATION_INPUTS = gql`
  query Query(
    $notificationDistance: Float
    $notificationDeadhead: Float
    $notificationProfit: Float
    $notificationTime: Float
  ) {
    notificationInputs(
      notificationDistance: $notificationDistance
      notificationDeadhead: $notificationDeadhead
      notificationProfit: $notificationProfit
      notificationTime: $notificationTime
    )
  }
`;

export const GET_CITIES = gql`
  query Cities {
    cities
  }
`;

export const GET_LOADS = gql`
  query Loads {
    loads {
      hash
      dates
      trip
      lastScene
      lastPosted
      postEpoch
      favorites
      company
      contact
      origin
      distance
      profit
      rate
      deadhead
      destination
      travelTime
      hotspot
      hotspotDistance
      age
      notes
      clickNumber
      comments
      clickDetails
      currentDeadhead
    }
  }
`;
