import React, { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { CheckCircleIcon, CloseIcon, WarningTwoIcon } from "@chakra-ui/icons";

export default function Success(props) {
  const API_URL = process.env.REACT_APP_URL_API;
  const [message, setMessage] = useState("Your Account  Unverified");
  const params = useParams();
  useEffect(() => {
    console.log("MYPARAMETER:", params.token);

    Axios.patch(
      API_URL + `/users/verified`,
      {},
      {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      }
    )
      .then((respond) => {
        setMessage(" Your account has been verified");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box textAlign="center" py={10} px={6}>
      {message === " Your account has been verified" ? (
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
      ) : (
        <WarningTwoIcon boxSize={"50px"} color={"red.500"} />
      )}

      <Heading as="h2" size="xl" mt={6} mb={2}>
        {message}
      </Heading>
      {/* <Text color={"gray.500"}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua.
      </Text> */}
    </Box>
  );
}
