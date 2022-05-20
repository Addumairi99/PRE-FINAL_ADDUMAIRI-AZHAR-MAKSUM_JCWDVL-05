import React, { useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
  useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { Link as ReactLink } from "react-router-dom";

const API_URL = process.env.REACT_APP_URL_API;

export default function Login() {
  const username = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onButtonLogin = () => {
    setLoading(true);
    Axios.post(API_URL + `/users/login`, {
      username: username.current.value,
      password: password.current.value,
    })
      .then((respond) => {
        console.log(respond.data);
        setLoading(false);
        // if success =>
        toast({
          title: "Login Success",
          // description:"Email & password doesn't found. ",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        console.log(respond.data.token);
        // save token to local storage
        localStorage.setItem("token", respond.data.token);
        console.log(respond.data.dataLogin);

        // save user data to global state
        dispatch({ type: "LOGIN", payload: respond.data.dataLogin });

        //  redirect to home page
        toast({
          title: "Login Success",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "Error",
          description: error.response.data,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/" />;
  const color = useColorModeValue;

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={color("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {/* <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={color("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email or username</FormLabel>
              <Input ref={username} type="text" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  ref={password}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link as={ReactLink} to="/forgotpassword" color={"blue.400"}>
                  Forgot password?
                </Link>
              </Stack>
              <Button
                leftIcon={loading ? <Spinner size="md" /> : null}
                disabled={loading}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onButtonLogin}
              >
                {loading ? "Login..." : "Login"}
              </Button>

              <Text align={"center"}>
                Not already a user?{" "}
                <Link as={ReactLink} to="/register" color={"blue.400"}>
                  Register{" "}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
