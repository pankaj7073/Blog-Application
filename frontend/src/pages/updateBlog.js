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
import { useNavigate, useSearchParams } from "react-router-dom";

export default function UpdateBlog() {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [file, setFile] = useState();
  const [category, setCategory] = useState();
  const [loader, setLoader] = useState(false);
  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("search");

  const loggedIn = sessionStorage.getItem("loggedInValue");

  const getBlog = async () => {
    setLoader(true);
    try {
      await axios
        .get(`/api/v1/blog/${id}`)
        .then((response) => {
          setTitle(response.data.message.title);
          setDescription(response.data.message.description);
          setImage(response.data.message.image);
          setCategory(response.data.message.category);
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
        title: "Error Occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLoader(false);
    }
  };

  const handleCancel = () => {
    setLoader(true);
    navigate("/blog");
    setLoader(false);
  };

  const handleUpdateBlog = async () => {
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
        const categoryArray = category.toString().split(",");
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        if (image) {
          formData.append("image", image);
        }
        categoryArray.forEach((value, index) => {
          formData.append(`category[${index}]`, value);
        });

        await axios
          .put(`/api/v1/blog/${id}`, formData)
          .then((data) => {
            toast({
              title: `${data.data.message}`,
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top",
            });
            navigate("/blog");
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
      console.log(err);
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
    if (loggedIn) {
      getBlog();
    } else {
      navigate("/login");
    }
  }, [loggedIn]);

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      {loader ? (
        <Spinner color="blue.500" />
      ) : (
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            border={"2px solid white"}
            backgroundColor={"white"}
            padding={"10px"}
          >
            <Heading fontSize={"2xl"} textAlign={"center"}>
              Update Blog
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
                  onClick={handleUpdateBlog}
                >
                  save
                </Button>
              </Stack>
            </Stack>
            {file ? (
              <Image alt={"Blog Image"} objectFit={"cover"} src={file} />
            ) : (
              <Image
                alt={"Blog Image"}
                objectFit={"cover"}
                src={`data:image/png;base64,${image}`}
              />
            )}
          </Stack>
        </Flex>
      )}
    </Stack>
  );
}
