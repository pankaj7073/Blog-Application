import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Textarea,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const [loader, setLoader] = useState(false);

  const loggedIn = sessionStorage.getItem("loggedInValue");

  const handleCancel = () => {
    setLoader(true);
    navigate("/blogs");
    setLoader(false);
  };

  const handleCreateBlog = async () => {
    setLoader(true);
    try {
      if (!title || !description || !image) {
        setLoader(false);
        toast({
          title: "Title, image and description are required",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } else {
        const categoryArray = category.split(",");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        categoryArray.forEach((value, index) => {
          formData.append(`category[${index}]`, value);
        });

        await axios
          .post("/api/v1/blog", formData)
          .then((data) => {
            toast({
              title: "Blog created successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
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

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn]);
  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          {loader ? (
            <Spinner color="blue.500" />
          ) : (
            <Stack
              spacing={4}
              w={"full"}
              maxW={"md"}
              border={"2px solid white"}
              backgroundColor={"white"}
              padding={"10px"}
            >
              <Heading fontSize={"2xl"} textAlign={"center"}>
                Create Your Blog
              </Heading>

              <FormControl id="title">
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Write your description here"
                  size="sm"
                  resize={"vertical"}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="title">
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  border={"none"}
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setFile(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  />
                </Stack>
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
                    onClick={handleCreateBlog}
                  >
                    Post
                  </Button>
                </Stack>
              </Stack>
              {file ? (
                <Image alt={"Blog Image"} objectFit={"cover"} src={file} />
              ) : (
                ""
              )}
            </Stack>
          )}
        </Flex>
      </Stack>
    </>
  );
}
