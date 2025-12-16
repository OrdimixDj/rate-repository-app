import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES_BY_ORDER_AND_KEYWORD } from "../graphql/queries";

const useRepositories = (orderBy, filterKey) => {
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

  variableToUse = { searchKeyword: filterKey, ...variableToUse };

  const { data, loading, error } = useQuery(
    GET_REPOSITORIES_BY_ORDER_AND_KEYWORD,
    {
      variables: variableToUse,
      fetchPolicy: "cache-and-network",
    }
  );

  return { data, loading, error };
};

export default useRepositories;
