// connect to backend test
import { useQuery } from "@apollo/client";
import { GET_CITIES } from "../utils/queries";

const Test = () => {
  const {data, loading, error} = useQuery(GET_CITIES);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.log(error);
    return <div>Error!</div>;
  }
  console.log(data);
  return;
};

export default Test;
