import { updateCart } from "@/redux/features/cart-slice";
import { API_URL } from "@/utils/constants";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Icon,
  Image,
  Stack,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clock, ExternalLink } from "react-feather";
import { useDispatch } from "react-redux";
const OrderHistoryCard = ({ date, total, status, id, token }) => {
  let colorScheme, color;
  switch (status) {
    case "new":
      color = "bonus.400";
      colorScheme = "badge.400";

      break;
    case "pending":
      color = "bonus.900";
      colorScheme = "badge.900";

      break;
    case "shipping":
      color = "bonus.300";
      colorScheme = "badge.300";

      break;
    case "accepted":
      color = "bonus.200";
      colorScheme = "badge.200";

      break;
    case "rejected":
      color = "bonus.500";
      colorScheme = "badge.500";

      break;

    default:
      color = "bonus.200";
      colorScheme = "badge.200";

      break;
  }
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleReOrder = async () => {
    try {
      const response = await fetch(API_URL + `/regenerate-order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message, data } = await response.json();
      if (response.ok) {
        dispatch(updateCart(data));
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "regenerating order failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "regenerating order failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Card overflow="hidden" variant="outline">
        <Stack
          justifyContent={"space-between"}
          w={"100%"}
          direction={{ base: "column", sm: "row" }}
        >
          <CardBody>
            <HStack alignItems={"center"}>
              <Heading size="md">Order {id} summary</Heading>
              <Tag
                bg={colorScheme}
                textTransform={"uppercase"}
                fontWeight={"bold"}
                color={color}
                borderRadius={5}
                lineHeight={0}
                size={"sm"}
              >
                {status}
              </Tag>
            </HStack>
            <Text color={"secondary.300"} opacity={"0.8"} mt={1}>
              Ordered {date}
            </Text>
            <Text py="2">Order Total: ${total}</Text>
          </CardBody>

          <CardFooter>
            <ButtonGroup gap={5}>
              <Button
                as={Link}
                href={`/invoice/${id}`}
                variant={"outline"}
                borderColor={"primary.500"}
                leftIcon={<Icon as={ExternalLink} />}
              >
                invoice
              </Button>
              <Button
                color="primary.100"
                borderColor={"primary.500"}
                leftIcon={<Icon as={Clock} />}
                onClick={handleReOrder}
              >
                re-order
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default OrderHistoryCard;
