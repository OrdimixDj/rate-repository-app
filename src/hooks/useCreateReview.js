import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ owner, name, rate, review }) => {
    const numericRate = parseInt(rate, 10);
    const response = await mutate({
      variables: {
        review: {
          ownerName: owner,
          rating: numericRate,
          repositoryName: name,
          text: review,
        },
      },
    });
    return response;
  };

  return [createReview, result];
};

export default useCreateReview;
