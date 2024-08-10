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
      hash
      company
      contact
      origin
      destination
      travelTime
      hotSpot
      distanceFromHotSpot
      age
      notes
    }
  }
`;

export const GET_CITIES = gql`
  query Loads {
    loads {
      hash
      company
      contact
      origin
      destination
      deadhead
      distance
      profit
      rate
      travelTime
      hotSpot
      distanceFromHotSpot
      age
      notes
    }
  }
`;
export const GET_LOADS = gql`
  query Loads {
    loads {
      hash
      company
      contact
      origin
      destination
      deadhead
      distance
      profit
      rate
      travelTime
      hotSpot
      distanceFromHotSpot
      age
      notes
    }
  }
`;
