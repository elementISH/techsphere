"use client";

import Statement from "@/components/generics/statement";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";

const Terms = () => {
  return (
    <Flex direction={"column"} gap={5} mb={"5rem"}>
      <Stack>
        <Heading>Terms of Service</Heading>
        <Text color="secondary.300">Updated June 2023</Text>
      </Stack>
      <Stack>
        <Statement statement={"Heading"} size={"md"} color={"secondary.500"} />
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nisi
          delectus et nulla ut fuga eaque qui tempora sequi quisquam cum ipsum
          itaque commodi, vitae molestias distinctio! Ad, officia illo. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Minima ab veniam
          similique explicabo ratione corporis ipsa quos maxime pariatur
          sapiente harum magnam aperiam suscipit mollitia repellendus, eum cum
          officia! Ratione! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolorem, distinctio expedita! Repellat, ipsa natus pariatur
          saepe eum sunt eligendi odio dolores rem id. Possimus ex facere dolore
          quam. Odio, ipsum? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Facere reiciendis ullam quod accusantium mollitia hic in ab
          voluptatum quaerat officia! Eius quidem voluptatum voluptates, ipsa
          consectetur molestiae adipisci veniam itaque? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eum, enim mollitia veniam
          necessitatibus, inventore alias hic quam esse dicta quaerat,
          voluptatum minus commodi corporis voluptatibus asperiores ad nam.
          Exercitationem, dolores.
        </Text>
        <Statement
          statement={"Sub Heading"}
          size={"sm"}
          color={"secondary.500"}
        />
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nisi
          delectus et nulla ut fuga eaque qui tempora sequi quisquam cum ipsum
          itaque commodi, vitae molestias distinctio! Ad, officia illo. Lorem
          ipsum dolor, sit amet consectetur adipisicing elit. Minima ab veniam
          similique explicabo ratione corporis ipsa quos maxime pariatur
          sapiente harum magnam aperiam suscipit mollitia repellendus, eum cum
          officia! Ratione! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dolorem, distinctio expedita! Repellat, ipsa natus pariatur
          saepe eum sunt eligendi odio dolores rem id. Possimus ex facere dolore
          quam. Odio, ipsum? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Facere reiciendis ullam quod accusantium mollitia hic in ab
          voluptatum quaerat officia! Eius quidem voluptatum voluptates, ipsa
          consectetur molestiae adipisci veniam itaque? Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eum, enim mollitia veniam
          necessitatibus, inventore alias hic quam esse dicta quaerat,
          voluptatum minus commodi corporis voluptatibus asperiores ad nam.
          Exercitationem, dolores.
        </Text>
      </Stack>
    </Flex>
  );
};

export default Terms;
