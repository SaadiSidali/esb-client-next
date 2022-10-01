import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";

// import { useAppDispatch } from "../utils/hooks";
// import { setToken, setUser } from "../store/authSlice";
// import { LoginType } from "../types/login-type";
// import { SignInInput } from "../types/signin-input";
// import { SIGN_IN_MUTATION } from "../gql/mutations";
// import ErrorAlert from "../components/ErrorAlert";
import { PasswordInput } from "../components/PasswordInput";
import { useLoginMutation } from "../generated/graphql";

function Login() {
  const [signin] = useLoginMutation();
  //   const dispatch = useAppDispatch();
  //   const navigate = useNavigate();

  //   const [signInMutation, { data, loading, error }] = useMutation<
  //     LoginType,
  //     SignInInput
  //   >(SIGN_IN_MUTATION);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await signin({
          variables: {
            username: values.userName,
            password: values.password,
          },
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  });
  //   if (!loading && data) {
  //     dispatch(setToken(data.signIn.token));
  //     dispatch(setUser(data.signIn.token));

  //     localStorage.setItem("token", data.signIn.token);
  //     navigate("/profile");
  //   }

  return (
    <>
      <Container centerContent>
        <form onSubmit={formik.handleSubmit}>
          <Box borderWidth="1px" borderRadius="lg" p={12} mt={16}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                name="userName"
                onChange={formik.handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <PasswordInput onChange={formik.handleChange}></PasswordInput>
            </FormControl>
            <Flex mt={8} align={"center"}>
              <Button type="submit" colorScheme={"linkedin"}>
                Sign in
              </Button>
              <Spacer />
              <Text>
                Need an account? <Link color={"blue.400"}>Signup.</Link>
              </Text>
            </Flex>

            {/* {error ? <ErrorAlert error={error} /> : null} */}
          </Box>
        </form>
      </Container>
    </>
  );
}

export default Login;
