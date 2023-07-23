import { Box, Skeleton } from "@chakra-ui/react";

const CardSkeleton = () => {
  return (
    <Box
      borderRadius={20}
      overflow="hidden"
      w={"250px"}
      border={0}
      background={"secondary.100"}
    >
      <Skeleton height="200px" />
      <Skeleton height="2px" my="2" />
      <Box p="6">
        <Skeleton height="10px" my="2" />
        <Skeleton height="10px" my="2" />
        <Skeleton height="2px" my="2" />
        <Skeleton height="20px" my="2" />
        <Skeleton height="20px" my="2" />
      </Box>
    </Box>
  );
};
export default CardSkeleton;
