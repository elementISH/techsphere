"use client";

import getHistory from "@/utils/functions/getHistory";
import { useReactToPrint } from "react-to-print";

import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as companyData from "@/utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UnAuth from "@/components/invoice/unauthenticated";
import moment from "moment/moment";
import Print from "@/components/invoice/print";

const AuthInvoice = ({ id, token, printing }) => {
  const [invoice, setInvoice] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchHistory() {
      const res = await getHistory(id, token);
      if (res.length == 0) return setInvoice("no-data");
      const { data } = res;
      setInvoice(data);
    }
    fetchHistory();
  }, []);
  if (!invoice)
    return (
      <>
        <Skeleton height="40px" mb="5rem" borderRadius={10} />
        <Skeleton height="30px" width="60%" mb={5} />
        <Skeleton height="30px" width="60%" mb={5} />
        <Skeleton height="30px" width="40%" mb={5} />

        <Skeleton height="150px" mb={5}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Product</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td isNumeric>4</Td>
                  <Td isNumeric>999</Td>
                  <Td isNumeric>1699</Td>
                </Tr>
                <Tr>
                  <Td>Name</Td>
                  <Td isNumeric>2</Td>
                  <Td isNumeric>799</Td>
                  <Td isNumeric>1699</Td>
                </Tr>
                <Tr>
                  <Td>Name</Td>
                  <Td isNumeric>1</Td>
                  <Td isNumeric>599</Td>
                  <Td isNumeric>1699</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Product</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Skeleton>

        <Skeleton height="30px" width="40%" ml={"60%"} />
      </>
    );
  if (invoice == "no-data")
    return <Heading textAlign={"center"}>order not found</Heading>;
  return (
    <>
      <Stack
        bg={"primary.100"}
        p={5}
        borderRadius={10}
        spacing={5}
        mb={"5rem"}
        border={printing ? "1px solid" : ""}
      >
        <Flex flex={{ base: 1 }} justify={"center"}>
          <Text
            display={"flex"}
            alignItems={"center"}
            fontFamily={"heading"}
            color="primary.500"
            fontWeight={"bold"}
          >
            <Image src={companyData.COMPANY_LOGO_URL} h={5} mr={2} />
            {companyData.COMPANY_NAME}
          </Text>
        </Flex>
        <Stack spacing={10}>
          <Stack
            justifyContent={"space-between"}
            flexDirection={{ base: "column", md: "row" }}
            gap={{ base: 5, md: "" }}
          >
            <Stack w={{ md: "40%" }}>
              <Heading size={"md"}>Company Details</Heading>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Name:</Text>
                <Text>{companyData.COMPANY_NAME}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Location:</Text>
                <Text>location location</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Email:</Text>
                <Text>support@techshare.com</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Phone:</Text>
                <Text>+2012345678910</Text>
              </HStack>
            </Stack>
            <Stack w={{ md: "40%" }}>
              <Heading size={"md"}>Invoice Details</Heading>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Date:</Text>
                <Text>{invoice.order_date}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Invoice Number:</Text>
                <Text>{invoice.order_code}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Order Number:</Text>
                <Text>{invoice.id}</Text>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Text fontWeight={"bold"}>Issue Date:</Text>
                <Text>{moment().format("MMMM Do YYYY - h:mm a")}</Text>
              </HStack>
              <HStack
                justifyContent={"space-between"}
                bg={"primary.500"}
                color={"primary.100"}
                p={1}
              >
                <Text fontWeight={"bold"}>Balance Due:</Text>
                <Text>${invoice.total}</Text>
              </HStack>
            </Stack>
          </Stack>
          <Stack w={{ md: "40%" }}>
            <Heading size={"md"}>Bill To</Heading>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Name:</Text>
              <Text>{invoice.name}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Location:</Text>
              <Text>
                {invoice.address}, {invoice.city}
              </Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Email:</Text>
              <Text>{invoice.email}</Text>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Phone:</Text>
              <Text>{invoice.phone}</Text>
            </HStack>
          </Stack>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr bg={"primary.800"} color={"primary.100"}>
                  <Th color={"primary.100"}>Product</Th>
                  <Th color={"primary.100"} isNumeric>
                    Quantity
                  </Th>
                  <Th color={"primary.100"} isNumeric>
                    Price
                  </Th>
                  <Th color={"primary.100"} isNumeric>
                    Total
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {invoice.order_products?.map((product) => (
                  <Tr key={product.product_id}>
                    <Td>{product.product_name}</Td>
                    <Td isNumeric>{product.order_product_quantity}</Td>
                    <Td isNumeric>{product.product_price}</Td>
                    <Td isNumeric>{product.product_total}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr bg={"primary.800"} color={"primary.100"}>
                  <Th color={"primary.100"}>Product</Th>
                  <Th color={"primary.100"} isNumeric>
                    Quantity
                  </Th>
                  <Th color={"primary.100"} isNumeric>
                    Price
                  </Th>
                  <Th color={"primary.100"} isNumeric>
                    Total
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
          <Stack alignSelf={"end"} w={"40%"}>
            <HStack justifyContent={"space-between"}>
              <Text fontWeight={"bold"}>Sub Total:</Text>
              <Text>${invoice.sub_total}</Text>
            </HStack>
            <HStack
              justifyContent={"space-between"}
              bg={"primary.500"}
              color={"primary.100"}
              p={1}
            >
              <Text fontWeight={"bold"}>Total:</Text>
              <Text>${invoice.total}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
const Invoice = ({ params: { id } }) => {
  const { isAuth, token } = useSelector((state) => state.authReducer.value);

  if (!isAuth) return <UnAuth />;
  else
    return (
      <>
        <Print
          trigger={
            <Button
              color={"primary.100"}
              mb={5}
              display={invoice == "no-data" ? "none" : "block"}
            >
              Print
            </Button>
          }
        >
          <AuthInvoice id={id} token={token} printing />
        </Print>
        <AuthInvoice id={id} token={token} />
      </>
    );
};
export default Invoice;
