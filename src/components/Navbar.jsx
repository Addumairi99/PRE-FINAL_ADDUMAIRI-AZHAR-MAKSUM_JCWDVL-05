import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {BiLogIn } from "react-icons/bi";

export default function Navbar(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // global state
  const { email, username, name, bio, status } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const onButtonNavigate = () => {
    const location = props.pathname === "/login" ? "/" : "/login";
    navigate(location);
  };
  const onButtonLogin = () => {
    navigate("/login");
  };
  const onButtonLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <Box bg={useColorModeValue("blue.300", "blue.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            {" "}
            <Heading size="md"> My App</Heading>{" "}
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://bit.ly/broken-link" }
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://bit.ly/broken-link" 
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p> {username} </p>
                    </Center>
                    <Center>
                      <p> {status} </p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>
                      <Link as={ReactLink} to="/UserProfile">
                        My Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link as={ReactLink} to="/UserProfileEdit">
                        Account Settings
                      </Link>
                    </MenuItem>

                    <MenuItem onClick={onButtonLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button size={'md'} onClick={onButtonLogin} leftIcon={<BiLogIn/>}>Login</Button>
              )}

              {/* DUA */}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
