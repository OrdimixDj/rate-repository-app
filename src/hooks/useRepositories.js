import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (firstValue, orderBy, filterKey) => {
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

  let variables = getVariables(orderBy);

  variables = { first: firstValue, searchKeyword: filterKey, ...variables };

  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
