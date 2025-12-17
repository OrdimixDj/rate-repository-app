import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY_DETAILS } from "../graphql/queries";

const useGetRepositoryDetails = (firstValue, repositoryId) => {
  const variables = { first: firstValue, repositoryId };
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_DETAILS,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useGetRepositoryDetails;
