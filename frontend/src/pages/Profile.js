import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
  Spinner,
  useToast,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { SmallCloseIcon } from "@chakra-ui/icons";

export default function Profile() {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState("");
  const [loader, setLoader] = useState(false);
  const [remove, setRemove] = useState(false);

  const loggedIn = sessionStorage.getItem("loggedInValue");

  const navigate = useNavigate();

  const convertImageToBase64 = (event) => {
    const file = event.target.files[0];
    setProfile(file);
    setRemove(false);
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const removeBase64Prefix = (base64String) => {
          const prefixIndex = base64String.indexOf(",") + 1;
          return base64String.substring(prefixIndex);
        };

        const base64String = reader.result;
        const base64Data = removeBase64Prefix(base64String);

        setView(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleProfileChange = () => {
    setRemove(true);
    setLoader(true);
    setProfile("");
    setView("");
    setLoader(false);
  };

  const handleCancel = () => {
    setLoader(true);
    navigate("/blogs");
  };

  const handleUpdate = async () => {
    setLoader(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (profile) {
        formData.append("profile", profile);
      }
      if (remove) {
        formData.append("profile", profile);
      }
      await axios
        .put("/api/v1/auth/update", formData)
        .then((data) => {
          toast({
            title: "Profile Update Succesfully",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          sessionStorage.setItem("profileBuffer", data.data.profile);
          navigate("/blogs");
          setLoader(false);
        })
        .catch((err) => {
          toast({
            title: "Something went wrong",
            status: `${err.response.data.error}`,
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setLoader(false);
        });
    } catch (err) {
      toast({
        title: "Error occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoader(false);
    }
  };

  const getDetails = async () => {
    setLoader(true);
    try {
      await axios
        .get("/api/v1/auth/detail")
        .then((data) => {
          setName(data.data.result.name);
          setEmail(data.data.result.email);
          setView(data.data.result.profile);
          setLoader(false);
        })
        .catch((err) => {
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          setLoader(false);
        });
    } catch (err) {
      toast({
        title: "Error occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoader(false);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getDetails();
    } else {
      navigate("/login");
    }
  }, [navigate, loggedIn]);
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.50"}>
      {loader ? (
        <Spinner color="blue.500" />
      ) : (
        <>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={"white"}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              Edit Your Profile
            </Heading>
            <FormControl id="userName">
              <FormLabel>Profile Picture</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" src={`data:image/png;base64,${view}`}>
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                      onClick={handleProfileChange}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Input
                    type="file"
                    accept="image/*"
                    border={"none"}
                    onChange={convertImageToBase64}
                  />
                </Center>
              </Stack>
            </FormControl>
            <FormControl id="userName" isRequired>
              <FormLabel>Fullname</FormLabel>
              <Input
                placeholder="ex.-Manoj Vaishnav"
                _placeholder={{ color: "gray.500" }}
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
                placeholder="your-email@example.com"
                _placeholder={{ color: "gray.500" }}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleUpdate}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </Flex>
  );
}
