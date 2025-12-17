import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async ({ reviewId }) => {
    await mutate({
      variables: {
        deleteReviewId: reviewId,
      },
    });
  };

  return [deleteReview];
};

export default useDeleteReview;
