import React, { useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { Link as ReactLink } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Register() {
  const API_URL = process.env.REACT_APP_URL_API;
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const confpassword = useRef("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // const navigate = useNavigate()

  const onRegisterSubmit = () => {
    // input validation
    if (
      username.current.value === "" ||
      email.current.value === "" ||
      password.current.value === "" ||
      confpassword.current.value === ""
    ) {
      return toast({
        title: "Warning",
        description: "Fill in all the form",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    const newUser = {
      username: username.current.value,
      email: email.current.value,
      // name:'',
      password: password.current.value,
      repassword: confpassword.current.value,
      // bio:'',
      // profilePicture:null
    };
    console.log(newUser);

    setLoading(true);

    Axios.post(API_URL + `/users/register`, newUser)
      .then((respond) => {
        console.log("Respond:", respond.data);

        // reset state
        username.current.value = "";
        email.current.value = "";
        password.current.value = "";
        confpassword.current.value = "";
        toast({
          title: "Registrasi Success",
          description: respond.data,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          toast({
            title: "Error",
            description: error.response.data,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
        setLoading(false);
      });

    // if success
    // navigate('/login')
  };

  // 
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
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={color("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="username" isRequired>
                <FormLabel>username</FormLabel>
                <Input ref={username} type="text" />
              </FormControl>
            </Box>
            {/* </HStack> */}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input ref={email} type="email" />
            </FormControl>

            {/* PASSWORD */}
            <FormControl id="password" isRequired>
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

            {/* REPASSWORD */}
            <FormControl id="repassword" isRequired>
              <FormLabel>repassword</FormLabel>
              <InputGroup>
                <Input
                  ref={confpassword}
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                leftIcon={loading ? <Spinner size="md" /> : null}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={onRegisterSubmit}
                disabled={loading}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={ReactLink} to="/login" color={"blue.400"}>
                  Login{" "}
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
