import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Button,
  Box,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";

const MyBlogs = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const loggedIn = sessionStorage.getItem("loggedInValue");
  const [blogs, setBlogs] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleDelete = async (id) => {
    setLoader(true);
    try {
      await axios
        .delete(`/api/v1/blog/${id}`)
        .then((response) => {
          toast({
            title: `${response.data.message}`,
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          getMyBlogs();
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

  const getMyBlogs = async () => {
    setLoader(true);
    try {
      const response = await axios.get("/api/v1/myblogs");
      setBlogs(response.data.message);
      setLoader(false);
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
      getMyBlogs();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {loader ? (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Spinner color="blue.500" />
        </Box>
      ) : (
        <>
          {blogs.length > 0 ? (
            <>
              {blogs.map((value, index) => {
                return (
                  <>
                    <Container maxW={"5xl"} py={12}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <Flex>
                          <Image
                            rounded={"md"}
                            alt={"feature image"}
                            src={`data:image/png;base64,${value.image}`}
                            objectFit={"fill"}
                          />
                        </Flex>
                        <Stack spacing={4}>
                          <Text
                            textTransform={"uppercase"}
                            color={"blue.400"}
                            fontWeight={600}
                            fontSize={"sm"}
                            bg={"blue.50"}
                            p={2}
                            alignSelf={"flex-start"}
                            rounded={"md"}
                          >
                            {value.category.map((data, index) => {
                              return data + ", ";
                            })}
                          </Text>
                          <Heading size={"md"}>{value.title}</Heading>
                          <Box
                            color={"gray.500"}
                            fontSize={"lg"}
                            maxH={"7em"}
                            overflowY={"auto"}
                          >
                            <Text>{value.description}</Text>
                          </Box>
                          <Stack
                            spacing={4}
                            divider={<StackDivider borderColor={"gray.100"} />}
                          >
                            <Stack direction={"row"} align={"center"}>
                              <Button
                                onClick={() => {
                                  handleDelete(value._id);
                                }}
                              >
                                <Flex
                                  w={8}
                                  h={8}
                                  align={"center"}
                                  justify={"center"}
                                  rounded={"full"}
                                >
                                  <AiFillDelete fill="red" />
                                </Flex>
                                <Text fontWeight={600}>Delete</Text>
                              </Button>
                              <Button
                                onClick={() => {
                                  navigate(`/update?search=${value._id}`);
                                }}
                              >
                                <Flex
                                  w={8}
                                  h={8}
                                  align={"center"}
                                  justify={"center"}
                                  rounded={"full"}
                                >
                                  <GrUpdate />
                                </Flex>
                                <Text fontWeight={600}>Update</Text>
                              </Button>
                            </Stack>
                          </Stack>
                        </Stack>
                      </SimpleGrid>
                    </Container>
                  </>
                );
              })}
            </>
          ) : (
            <Container>
              <Text>You don't have any blog</Text>
            </Container>
          )}
        </>
      )}
    </>
  );
};

export default MyBlogs;
