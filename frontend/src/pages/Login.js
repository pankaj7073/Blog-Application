import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Spinner,
  useToast,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const handleLogin = async () => {
    setLoader(true);
    try {
      if (!email || !password) {
        toast({
          title: "All field are required",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setLoader(false);
      } else {
        await axios
          .post("/api/v1/auth/login", { email, password })
          .then((data) => {
            toast({
              title: `${data.data.message}`,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            sessionStorage.setItem("profileBuffer", data.data.profile);
            sessionStorage.setItem("loggedInValue", true);
            setLoader(false);
            navigate("/blogs");
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
            setLoader(false);
          });
      }
    } catch (err) {
      toast({
        title: "Error Occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoader(false);
    }
  };
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      {loader ? (
        <Spinner color="blue.500" />
      ) : (
        <>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to enjoy all of our cool{" "}
                <Link color={"blue.400"}>features</Link> ✌️
              </Text>
            </Stack>
            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={handleLogin}
                  >
                    Sign in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Not a user?{" "}
                    <Link to={"/register"} style={{ color: "#3182CE" }}>
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </>
      )}
    </Flex>
  );
}
