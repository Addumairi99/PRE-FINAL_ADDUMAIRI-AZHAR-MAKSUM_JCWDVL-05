import React, { useState,useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import {
  Input,
  Button,
  Stack,
  Avatar,
  Center,
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Td,
  Tfoot,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function UserProfileEdit() {
  const API_URL = process.env.REACT_APP_URL_API;
  // global state
  const { email, username, name, bio, status, uid, id } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailEdit, setEmailEdit] = useState(email);
  const [usernameEdit, setUsernameEdit] = useState(username);
  const [nameEdit, setNameEdit] = useState(name);
  const [bioEdit, setBioEdit] = useState(bio);
  const [confirm, setConfirm] = useState(false);
  
  

  // cannot access this page if not login
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;

  const onButtonEdit = () => {
    setConfirm(true);
  };

  const onBtnCancel = () => {
    navigate("/");
  };

  const onBtnCancelConfirm = () => {
    setConfirm(false);
  };
  const onButtonEditConfirm = () => {
    const newUser = {
      username: usernameEdit,
      email: email,
      name: nameEdit,
      bio: bioEdit,
    };
    console.log(newUser);

    Axios.patch(API_URL + `/users/edit/${id}`, newUser);
    // .then
    setConfirm(false)
  };

  return (
    <Box px={161} py={35} w="100%" h="auto">
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        User Profile Edit
        {/* {uid} */}
      </Heading>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        {/* User Profile Edit */}
        {nameEdit}
      </Heading>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        {/* User Profile Edit */}
        {emailEdit}
      </Heading>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        {/* User Profile Edit */}
        {usernameEdit}
      </Heading>
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
        {/* User Profile Edit */}
        {bioEdit}
      </Heading>

      <Stack direction={["column", "row"]} spacing={6} mt={10}>
        <Center>
          <Avatar size="2xl" src="https://bit.ly/broken-link" />
        </Center>
        <Center w="50%">
          <Button w="60%" backgroundColor={"#63B3ED"}>
            Change Icon
          </Button>
          <input type="file" />
        </Center>
      </Stack>
      <Table variant="simple">
        <Tbody>
          <Tr>
            <Td>Nama</Td>
            <Td>
              <Input
                type="text"
                // value={nameEdit}
                defaultValue={name}
                onChange={(e) => setNameEdit(e.target.value)}
                placeholder="Name"
              />
            </Td>
          </Tr>
          <Tr>
            <Td>Username</Td>
            <Td>
              <Input
                type="text"
                // value={usernameEdit}
                defaultValue={username}
                onChange={(e) => setUsernameEdit(e.target.value)}
                placeholder="Username"
              />
            </Td>
          </Tr>
          <Tr>
            <Td>Email</Td>
            <Td>
              <Input
                // value={emailEdit}
                type="text"
                defaultValue={email}
                onChange={(e) => setEmailEdit(e.target.value)}
                placeholder="Email"
              />
            </Td>
          </Tr>
          <Tr>
            <Td>Bio</Td>
            <Td>
              <Input
                // value={bioEdit}
                type="text"
                defaultValue={bio}
                onChange={(e) => setBioEdit(e.target.value)}
                placeholder="Bio"
              />
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td>
              <Button
                onClick={onBtnCancel}
                w="full"
                backgroundColor={"#FC8181"}
              >
                Cancel
              </Button>
            </Td>
            <Td>
              <Button
                onClick={onButtonEdit}
                w="40%"
                backgroundColor={"#63B3ED"}
              >
                Save
              </Button>
            </Td>
          </Tr>
        </Tfoot>
      </Table>
      <AlertDialog
        isOpen={confirm}
        // leastDestructiveRef={cancelRef}
        // onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit user
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onBtnCancelConfirm}>Cancel</Button>
              <Button onClick={onButtonEditConfirm} colorScheme="blue" ml={3}>
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
