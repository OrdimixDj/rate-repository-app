import { useApolloClient, useMutation } from "@apollo/client/react";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "../hooks/useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(LOGIN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: { credentials: { username, password } },
    });
    await authStorage.setAccessToken(response.data.authenticate.accessToken);
    apolloClient.resetStore();
    return response;
  };

  return [signIn, result];
};

export default useSignIn;
