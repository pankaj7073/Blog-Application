import { Box, Image, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";
import Placeholder from "../utills/placeholder.png";

const Skleton = () => {
  return (
    <>
      <Box padding="6" boxShadow="lg" bg="white" w={"300px"}>
        <Image src={Placeholder} />
        <SkeletonText mt="4" noOfLines={8} spacing="4" skeletonHeight="2" />
        <SkeletonCircle mt={"5"} size="10" />
      </Box>
    </>
  );
};

export default Skleton;
