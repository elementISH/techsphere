import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

const FaqCard = ({ icon, heading, subHeading }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} p={5} w={"50%"}>
      <Box>
        <Stack spacing={5} direction={"row"}>
          <IconButton
            bg="secondary.100"
            variant={"outline"}
            w="fit-content"
            icon={<Icon as={icon} />}
          ></IconButton>
          <Flex justifyContent={"space-between"} direction={"column"} gap={1}>
            <Text fontWeight={"bold"}>{heading}</Text>
            <Text>{subHeading}</Text>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
};

export default FaqCard;
