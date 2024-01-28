import {
  Box,
  chakra,
  Container,
  Image,
  Stack,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import logo from "../utills/logo.png";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={"blackAlpha.100"}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: "blackAlpha.200",
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <Box bg={"gray.50"} color={"gray.700"} mt={"50px"}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Image w={"60px"} h={"30px"} src={logo} />
        <Text>© {year} Pankaj Swami Vaishnav. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton
            label={"Github"}
            href={"https://github.com/pankaj7073"}
          >
            <AiFillGithub />
          </SocialButton>
          <SocialButton
            label={"Email"}
            href={
              "mailto:pankajvaishnav128@gmail.com?subject = Blog App Feedback&body = Hello, from blog app"
            }
          >
            <MdEmail />
          </SocialButton>
          <SocialButton
            label={"Linkedin"}
            href={"https://www.linkedin.com/in/pankaj-swami-vaishnav/"}
          >
            <AiFillLinkedin />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
