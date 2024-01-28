import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  useBreakpointValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  VStack,
  HStack,
  useToast,
  Image,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../utills/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();

  let loggedIn = sessionStorage.getItem("loggedInValue");
  const pic = sessionStorage.getItem("profileBuffer");

  const handleSignUp = () => {
    navigate("/register");
  };
  const handleSignIn = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      await axios
        .post(`/api/v1/auth/logout`)
        .then((data) => {
          sessionStorage.clear();
          toast({
            title: `${data.data.message}`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          navigate("/login");
        })
        .catch((err) => {
          toast({
            title: "Something went wrong",
            description: `${err.response.data.error}`,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    } catch (err) {
      toast({
        title: `Error Occur`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    loggedIn = JSON.parse(localStorage.getItem("loggedInValue"));
  }, [loggedIn]);

  return (
    <Box w={"full"}>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={"gray.800"}
            fontSize={"20px"}
          >
            <Link to={"/"}>
              <Image w={"70px"} h={"35px"} src={logo} />
            </Link>
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {loggedIn ? (
            <>
              <Menu>
                <MenuButton
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <VStack>
                    <HStack alignItems={"center"}>
                      <Avatar
                        size={"sm"}
                        src={
                          pic
                            ? `data:image/png;base64,${pic}`
                            : "https://img.freepik.com/free-icon/user_318-563642.jpg"
                        }
                      />

                      <Box display={{ base: "flex", md: "flex" }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </VStack>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={"/profile"}>Edit Profile</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={"/blog"}>My Blogs</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={"/create"}>Create Blog</Link>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                </MenuList>
              </Menu>
            </>
          ) : (
            <>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
              <Button
                onClick={handleSignUp}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}
