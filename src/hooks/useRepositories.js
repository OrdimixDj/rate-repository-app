import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES_BY_ORDER } from "../graphql/queries";

const useRepositories = (orderBy) => {
  const getVariables = (orderBy) => {
    if (orderBy === "NORMAL") {
      return { orderBy: "CREATED_AT", orderDirection: "DESC" };
    } else if (orderBy === "RATING_AVERAGE_DESC") {
      return { orderBy: "RATING_AVERAGE", orderDirection: "DESC" };
    } else if (orderBy === "RATING_AVERAGE_ASC") {
      return { orderBy: "RATING_AVERAGE", orderDirection: "ASC" };
    }
    return { orderBy: "CREATED_AT", orderDirection: "DESC" };
  };

  let variableToUse = getVariables(orderBy);

  const { data, loading, error } = useQuery(GET_REPOSITORIES_BY_ORDER, {
    variables: variableToUse,
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error };
};

export default useRepositories;
