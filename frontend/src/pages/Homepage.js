import React from "react";
import { Container, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  const loggedIn = sessionStorage.getItem("loggedInValue");

  return (
    <>
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={"black"}
          >
            Unleash Your Inner Writer:{" "}
            <Text as={"span"} color={"#3182CE"}>
              Publish Your Passionate Blogs with Ease
            </Text>
          </Heading>
          <Text color={"gray.500"} maxW={"3xl"}>
            Discover the ultimate platform for aspiring writers to unleash their
            creativity. Write and publish your own blogs effortlessly,
            expressing your passions, interests, and expertise. Connect with a
            diverse community of writers, receive feedback, and grow your
            audience. Fuel your passion for writing and embark on a journey of
            self-expression, one blog post at a time.
          </Text>
          {loggedIn ? (
            <Stack spacing={6} direction={"row"}>
              <Button
                rounded={"full"}
                px={6}
                colorScheme={"orange"}
                bg={"#3182CE"}
                _hover={{ bg: "blue.700" }}
                onClick={(e) => {
                  navigate("/blogs");
                }}
              >
                Read Blogs
              </Button>
            </Stack>
          ) : (
            <>
              <Stack spacing={6} direction={"row"}>
                <Button
                  rounded={"full"}
                  px={6}
                  colorScheme={"orange"}
                  bg={"#3182CE"}
                  _hover={{ bg: "blue.700" }}
                  onClick={(e) => {
                    navigate("/login");
                  }}
                >
                  Sign in
                </Button>
                <Button
                  rounded={"full"}
                  px={6}
                  colorScheme={"orange"}
                  bg={"#3182CE"}
                  _hover={{ bg: "blue.700" }}
                  onClick={(e) => {
                    navigate("/register");
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack>
                <Button
                  rounded={"full"}
                  px={6}
                  colorScheme={"orange"}
                  bg={"#3182CE"}
                  _hover={{ bg: "blue.700" }}
                  onClick={(e) => {
                    navigate("/blogs");
                  }}
                >
                  Read Blogs
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
};

export default Homepage;
