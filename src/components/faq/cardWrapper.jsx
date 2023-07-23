import { Flex } from "@chakra-ui/react";

const FaqCardWrapper = ({ children, dir = "row" }) => {
  return (
    <Flex wrap justifyContent={"space-between"} direction={dir}>
      {children}
    </Flex>
  );
};

export default FaqCardWrapper;
