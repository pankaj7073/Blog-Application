import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  Spinner,
  useToast,
  IconButton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import CommentCard from "../components/CommentCard";
import Skleton from "../components/Skleton";

const ReadBlog = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [authorName, setAuthorName] = useState();
  const [authorProfile, setAuthorProfile] = useState();
  const [date, setDate] = useState();
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(false);

  const [likeStatus, setLikeStatus] = useState(false);
  const [disLikeStatus, setDisLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const loggedIn = sessionStorage.getItem("loggedInValue");

  const [queryParameters] = useSearchParams();
  const id = queryParameters.get("search");

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
          setAuthorName(response.data.message.author.name);
          setAuthorProfile(response.data.message.author.profile);
          setCommentCount(response.data.message.comments.length);
          setDate(response.data.message.createdAt);
          setLikeCount(response.data.message.likes.length);
          setDislikeCount(response.data.message.dislikes.length);
          getComment();
          if (response.data.likedStatus !== -1) {
            setLikeStatus(true);
            setDisLikeStatus(false);
          } else if (response.data.dislikedStatus !== -1) {
            setDisLikeStatus(true);
            setLikeStatus(false);
          }
          setLoader(false);
        })
        .catch((err) => {
          console.log(err);
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

  const dd = new Date(date).getDate();
  const mm = new Date(date).getMonth() + 1;
  const yy = new Date(date).getFullYear();

  const handleDisLike = async () => {
    try {
      await axios
        .post(`/api/v1/blog/dislike/${id}`)
        .then((response) => {
          setLikeCount(response.data.likeCount);
          setDislikeCount(response.data.dislikeCount);
          if (disLikeStatus) {
            setDisLikeStatus(false);
          } else {
            setDisLikeStatus(true);
            setLikeStatus(false);
          }
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    } catch (err) {
      toast({
        title: "Error occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const handleLike = async () => {
    try {
      await axios
        .post(`/api/v1/blog/like/${id}`)
        .then((response) => {
          setLikeCount(response.data.likeCount);
          setDislikeCount(response.data.dislikeCount);
          if (likeStatus) {
            setLikeStatus(false);
          } else {
            setLikeStatus(true);
            setDisLikeStatus(false);
          }
        })
        .catch((err) => {
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    } catch (err) {
      toast({
        title: "Error occur",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(`/api/v1/blog/comment/${id}`, { comment });
      getComment();
      toast({
        title: "Comment successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const getComment = async () => {
    try {
      const response = await axios.get(`/api/v1/blog/comment/${id}`);
      setComments(response.data.message.comments);
      setCommentCount(response.data.message.comments.length);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: `${err.message}`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getBlog();
    } else {
      navigate("/login");
    }
  }, [loggedIn, navigate]);
  return (
    <>
      <Center py={6}>
        {loader ? (
          <Skleton />
        ) : (
          <>
            <Box
              maxW={"500px"}
              w={"full"}
              bg={"white"}
              boxShadow={"2xl"}
              rounded={"md"}
              p={6}
              overflow={"hidden"}
            >
              <Box
                h={"210px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={6}
                pos={"relative"}
                alignContent={"center"}
              >
                <Image
                  src={
                    image
                      ? `data:image/png;base64,${image}`
                      : "https://miro.medium.com/v2/resize:fit:500/0*-ouKIOsDCzVCTjK-.png"
                  }
                  objectFit="cover"
                  width="100%"
                  align="center"
                  maxHeight={"210px"}
                />
              </Box>
              <Stack>
                {category ? (
                  <>
                    <Text
                      color={"green.500"}
                      textTransform={"uppercase"}
                      fontWeight={800}
                      fontSize={"sm"}
                      letterSpacing={1.1}
                    >
                      {category.map((value, index) => {
                        return value + ", ";
                      })}
                    </Text>
                  </>
                ) : (
                  ""
                )}

                <Heading
                  color={"gray.700"}
                  fontSize={"2xl"}
                  fontFamily={"body"}
                >
                  {title}
                </Heading>
                <Text color={"gray.500"}>{description}</Text>
              </Stack>
              <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
                <Avatar
                  src={
                    authorProfile
                      ? `data:image/png;base64,${authorProfile}`
                      : "https://img.freepik.com/free-icon/user_318-563642.jpg"
                  }
                  alt={"Author"}
                />
                <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                  <Text fontWeight={600}>{authorName}</Text>
                  <Text color={"gray.500"}>
                    {dd}/{mm}/{yy}
                  </Text>
                </Stack>
              </Stack>
              <Stack
                mt={6}
                direction={"row"}
                align={"center"}
                width={"full"}
                justifyContent={"space-around"}
              >
                <Stack direction={"row"} align={"center"}>
                  <IconButton
                    aria-label="Like"
                    icon={likeStatus ? <AiFillLike /> : <AiOutlineLike />}
                    onClick={handleLike}
                  />
                  <Text>{likeCount}</Text>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <Popover>
                    <PopoverTrigger>
                      <Stack direction={"row"} alignItems={"center"}>
                        <IconButton aria-label="Comment" icon={<BiComment />} />
                        <Text>{commentCount}</Text>
                      </Stack>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Add comment</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                          <FormControl>
                            <Input
                              placeholder="Enter Comment"
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                            />
                          </FormControl>
                        </PopoverBody>
                        <PopoverFooter>
                          <Button colorScheme="blue" onClick={handleComment}>
                            Save
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </Stack>
                <Stack direction={"row"} align={"center"}>
                  <IconButton
                    aria-label="Dislike"
                    icon={
                      disLikeStatus ? <AiFillDislike /> : <AiOutlineDislike />
                    }
                    onClick={handleDisLike}
                  />
                  <Text>{dislikeCount}</Text>
                </Stack>
              </Stack>
            </Box>
          </>
        )}
      </Center>
      <CommentCard comments={comments} />
    </>
  );
};

export default ReadBlog;
