// connect to backend test
import { SEND_LOAD_INPUTS } from "../utils/queries";
import { useQuery } from "@apollo/client";
const Test = ({ rows }) => {
  const { error, data } = useQuery(SEND_LOAD_INPUTS, {
    variables: {
      location: "String",
      maxDead: 20,
      maxDistance: 30,
      dates: "1/1",
    },
  });
  if (error) console.log(error);
  return;
};

export default Test;
