import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const ProfileFavoriteCard = ({ id, name, image, price }) => {
  return (
    <>
      <Card overflow="hidden" variant="outline">
        <Stack
          justifyContent={"space-between"}
          w={"100%"}
          direction={{ base: "column", sm: "row" }}
          alignItems={"center"}
        >
          <CardBody
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
            gap={4}
          >
            <Image
              src={image}
              objectFit="cover"
              maxW={{ base: "100%", sm: "150px" }}
              p={5}
            />
            <Box>
              <Heading size="md">{name}</Heading>
              <Text pt={2}>${price}</Text>
            </Box>
          </CardBody>

          <CardFooter>
            <Button variant={"outline"} borderColor={"primary.500"}>
              <Link href={`/products/${id}`}>view product</Link>
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default ProfileFavoriteCard;
