import {
  Box,
  chakra,
  Flex,
  useToast,
  Text,
  Button,
  Input,
  Stack,
  Select,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { AiOutlineSearch } from "react-icons/ai";
import Skleton from "../components/Skleton";
import { Link } from "react-router-dom";

export default function Blogs() {
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState([]);
  const [total, setTotal] = useState(0);
  const loggedIn = sessionStorage.getItem("loggedInValue");

  const handleSearch = async () => {
    setLoader(true);
    setTotal(0);
    try {
      const response = await axios.get(`/api/v1/blog/title?search=${search}`);
      setBlogs(response.data.message);
      setTotal(response.data.message.length);
      setLoader(false);
    } catch (err) {
      toast({
        title: "Error Occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  async function getAllBlogs(category) {
    setLoader(true);
    setTotal(0);
    try {
      const response = await axios.get(`/api/v1/blog?category=${category}`);
      setBlogs(response.data.message);
      setTotal(response.data.message.length);
      setLoader(false);
    } catch (err) {
      toast({
        title: "Error Occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }
  useEffect(() => {
    getAllBlogs("all");
  }, []);
  return (
    <>
      <Flex
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
        overflow={"hidden"}
        padding={"10px"}
      >
        <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
          <chakra.h3
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
          >
            Blog App
          </chakra.h3>
          <chakra.h1
            py={5}
            fontSize={48}
            fontFamily={"Work Sans"}
            fontWeight={"bold"}
            color={"gray.700"}
          >
            {loggedIn ? (
              "Thank You For Joining Us"
            ) : (
              <>
                <Link style={{ textDecoration: "underline" }} to={"/login"}>
                  Login to join us
                </Link>
              </>
            )}
          </chakra.h1>
          <chakra.h2
            margin={"auto"}
            width={"70%"}
            fontFamily={"Inter"}
            fontWeight={"medium"}
            color={"gray.500"}
          >
            Select your favourite category
          </chakra.h2>
          <br />
        </Box>
      </Flex>
      <Stack
        display={"flex"}
        marginBottom={"10px"}
        width={"full"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack direction={"row"}>
          <Input
            type="text"
            placeholder="Search Here"
            width={"fit-content"}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button onClick={handleSearch}>
            <AiOutlineSearch />
          </Button>
        </Stack>
        <Stack>
          <Select
            placeholder="Category"
            onChange={(e) => {
              getAllBlogs(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="Fashion">Fashion</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
          </Select>
        </Stack>
      </Stack>
      <Divider />
      <Stack display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Text fontWeight={"600"} mt={"10px"} fontSize={"18px"}>
          {total} BLOG FOUND
        </Text>
        {loader ? (
          <Skleton />
        ) : (
          <>
            {blogs.length > 0 ? (
              <>
                {blogs.map((value, index) => (
                  <BlogCard key={index} object={value} />
                ))}
              </>
            ) : (
              <Text>No Blog To Show</Text>
            )}
          </>
        )}
      </Stack>
    </>
  );
}
