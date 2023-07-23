import { Box, Divider, Heading } from "@chakra-ui/react";

const Statement = ({ statement, size, emtext, color }) => {
  const parts = statement.split(emtext); // split statement into an array of strings
  return (
    <>
      <Box w={"fit-content"} mt={1}>
        <Heading size={size} w={"fit-content"} color={color}>
          {parts[0]}
          <Box as="span" color="primary.500">
            {emtext}
          </Box>
          {parts[1]}
        </Heading>
        <Divider
          mt={1}
          mb={5}
          color="primary.500"
          borderColor="primary.500"
          border={"2px"}
          opacity={1}
          w="100%"
        />
      </Box>
    </>
  );
};

export default Statement;
