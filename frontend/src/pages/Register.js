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
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast, Spinner } from "@chakra-ui/react";

export default function Register() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  const [loader, setLoader] = useState(false);

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        setLoader(true);
        toast({
          title: "All field are required.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        setLoader(false);
      } else {
        setLoader(true);
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profile", profile);

        await axios
          .post("/api/v1/auth/register", formData)
          .then((data) => {
            toast({
              title: "Registration Successfull.",
              description: `Thank you for trust on us`,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            sessionStorage.setItem("profileBuffer", data.data.profile);
            sessionStorage.setItem("loggedInValue", true);
            navigate("/blogs");
            setLoader(false);
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
      setLoader(true);
      toast({
        title: "Error occured",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoader(false);
    }
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
        {loader ? (
          <Spinner color="blue.500" />
        ) : (
          <>
            <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Sign up
                </Heading>
                <Text fontSize={"lg"} color={"gray.600"}>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>
              <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
                <Stack spacing={4}>
                  <FormControl id="name" isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl id="profile">
                    <FormLabel>Profile Picture</FormLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setProfile(e.target.files[0]);
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
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleRegister}
                    >
                      Sign up
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user?{" "}
                      <Link to={"/login"} style={{ color: "#3182CE" }}>
                        Sign in
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </>
        )}
      </Flex>
    </>
  );
}
