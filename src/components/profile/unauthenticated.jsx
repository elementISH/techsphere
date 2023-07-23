import {
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

const UnAuth = () => {
  return (
    <>
      <Heading textAlign={"center"}>
        please log in first to view your profile
      </Heading>
    </>
  );
};

export default UnAuth;
