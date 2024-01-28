import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { AiFillDislike, AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function BlogCard(props) {
  const { object } = props;
  const desc = object.description;
  const truncateDescription = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    const truncatedText = text.split(" ").slice(0, maxLength).join(" ");
    return truncatedText + "...";
  };
  const truncatedDescription = truncateDescription(desc, 30);

  const date = new Date(object.createdAt).getDate();
  const month = new Date(object.createdAt).getMonth() + 1;
  const year = new Date(object.createdAt).getFullYear();

  return (
    <Center py={6}>
      <Box
        maxW={"445px"}
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
        >
          <Image
            src={
              object.image
                ? `data:image/png;base64,${object.image}`
                : "https://miro.medium.com/v2/resize:fit:500/0*-ouKIOsDCzVCTjK-.png"
            }
            layout={"fill"}
            width={"full"}
            maxHeight={"210px"}
          />
        </Box>
        <Stack>
          {object.category.length > 0 ? (
            <>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                {object.category.map((value, index) => {
                  return value + ", ";
                })}
              </Text>
            </>
          ) : (
            ""
          )}

          <Heading color={"gray.700"} fontSize={"2xl"} fontFamily={"body"}>
            {object.title}
          </Heading>
          <Text color={"gray.500"}>
            {truncatedDescription}{" "}
            <Link
              to={`/read?search=${object._id}`}
              style={{
                fontWeight: "bold",
                textDecoration: "underLine",
                color: "purple",
              }}
            >
              Read More
            </Link>
          </Text>
        </Stack>
        <Stack
          mt={6}
          direction={"row"}
          spacing={4}
          align={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"}>
            <Avatar
              src={`data:image/png;base64,${object.author.profile}`}
              alt={"Author"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600} color={"gray.700"}>
                {object.author.name}
              </Text>
              <Text color={"gray.500"}>
                {date}/{month}/{year}
              </Text>
            </Stack>
          </Stack>
          <Stack direction={"row"}>
            <Stack direction={"row"} align={"center"}>
              <AiFillLike />
              <Text>{object.likes.length}</Text>
            </Stack>
            <Stack direction={"row"} align={"center"}>
              <AiFillDislike />
              <Text>{object.dislikes.length}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
