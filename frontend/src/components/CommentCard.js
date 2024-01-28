import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Stack,
  HStack,
  VStack,
  Avatar,
} from "@chakra-ui/react";

export default function GridListWithHeading(props) {
  const { comments } = props;
  return (
    <>
      {comments.length > 0 ? (
        <>
          <Box p={4}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
              <Heading fontSize={"3xl"}>Comments</Heading>
            </Stack>

            <Container maxW={"6xl"} mt={10}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {comments.map((comment) => (
                  <HStack
                    key={comment._id}
                    align={"top"}
                    border={"1px solid white"}
                    backgroundColor={"white"}
                    borderRadius={"10px"}
                    padding={"5px"}
                  >
                    <Box color={"green.400"} px={2}>
                      <Avatar
                        size={"sm"}
                        src={
                          comment.user.profile
                            ? `data:image/png;base64,${comment.user.profile}`
                            : "https://img.freepik.com/free-icon/user_318-563642.jpg"
                        }
                      />
                    </Box>
                    <VStack align={"start"}>
                      <Text fontWeight={600}>{comment.user.name}</Text>
                      <Text color={"gray.600"}>{comment.content}</Text>
                      <Text color={"gray.600"} fontSize={"10px"}>
                        {new Date(comment.timestamp).getDate()}
                        {"/"}
                        {new Date(comment.timestamp).getMonth()}
                        {"/"}
                        {new Date(comment.timestamp).getFullYear()}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </SimpleGrid>
            </Container>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
}
