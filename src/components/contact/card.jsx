import {
  Box,
  Flex,
  Divider,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MessageCircle } from "react-feather";

const ContactCard = ({ icon, heading, subHeading, link }) => {
  return (
    <Box
      bg="primary.100"
      display={"flex"}
      flexDirection={"column"}
      border="1px solid"
      borderColor="secondary.300"
      borderRadius={30}
      p={5}
    >
      <Box>
        <Stack spacing={5}>
          <IconButton
            variant={"outline"}
            w="fit-content"
            icon={<Icon as={icon} />}
          ></IconButton>
          <Flex justifyContent={"space-between"} direction={"column"} gap={1}>
            <Text fontWeight={"bold"}>{heading}</Text>
            <Text>{subHeading}</Text>
          </Flex>
        </Stack>
        <Divider />
        <Link href="#" textDecoration={"underline"} color="primary.500">
          {link}
        </Link>
      </Box>
    </Box>
  );
};

export default ContactCard;
