"use client";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
const Faq = () => {
  const { faqs, isLoading } = useSelector((state) => state.faqsReducer.value);
  if (isLoading)
    return (
      <>
        <Flex direction={"column"} gap={5}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              w={"100%"}
              height={"50px"}
              borderRadius={20}
            />
          ))}
        </Flex>
      </>
    );
  return (
    <>
      <Accordion
        allowToggle
        bg={"primary.100"}
        borderRadius={10}
        mb={4}
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        p={5}
        variant={"outline"}
      >
        {faqs?.map((faq) => (
          <AccordionItem key={faq.id}>
            <AccordionButton _expanded={{ bg: "primary.500", color: "white" }}>
              <Box as="span" flex="1" textAlign="left">
                {faq.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>{faq.answer}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
export default Faq;
