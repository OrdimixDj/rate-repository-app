import { useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { credentials: { username, password } },
    });
    return response;
  };

  return [signIn, result];
};

export default useSignIn;
