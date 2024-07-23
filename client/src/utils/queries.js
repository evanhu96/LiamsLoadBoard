import { gql } from "@apollo/client";
export const GET_LOADS = gql`
  query Loads {
    loads {
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
