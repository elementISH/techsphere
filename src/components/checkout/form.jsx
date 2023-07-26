import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Grid,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { resetCart } from "@/redux/features/cart-slice";
import { API_URL } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { fetchHistory, updateHistory } from "@/redux/features/history-slice";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
});

const CheckoutForm = ({ user, token, isVerified }) => {
  const { name, address, city, phone } = user;
  const initialValues = {
    name: name || "",
    phone: phone || "",
    city: city || "",
    address: address || "",
  };

  const router = useRouter();
  const toast = useToast();
  const dispatch = useDispatch();
  const fetchNewHistory = async (token) => {
    const response = await fetch(API_URL + `/order-history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Cache-Control": " no-cache, no-store, must-revalidate",
      },
    });
    const { message, data } = await response.json();
    if (response.ok) {
      const { orders } = data;
      dispatch(updateHistory(orders));
    }
  };
  const handleSubmit = async (values) => {
    if (!isVerified)
      return toast({
        title: "please verify your email first to checkout",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    fetch(API_URL + "/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((result) => {
        const { data, message } = result;
        router.push(`/invoice/${data.id}`);
        dispatch(resetCart());
        fetchNewHistory(token);
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "failed to checkout",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box w={"100%"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Box as={Form} bg="secondary.100" p={5} borderRadius={10}>
            <Grid templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }} gap={4}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="Enter your name" />
                  </FormControl>
                )}
              </Field>
              <Field name="phone">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.phone && form.touched.phone}
                  >
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <Input
                      {...field}
                      id="phone"
                      placeholder="Enter your phone"
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="city">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.city && form.touched.city}
                  >
                    <FormLabel htmlFor="city">City</FormLabel>
                    <Input {...field} id="city" placeholder="Enter your city" />
                  </FormControl>
                )}
              </Field>
              <Field name="address">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.address && form.touched.address}
                  >
                    <FormLabel htmlFor="address">Address</FormLabel>
                    <Input
                      {...field}
                      id="address"
                      placeholder="Enter your address"
                    />
                  </FormControl>
                )}
              </Field>
              <Flex gap={4}>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  bg="primary.500"
                  size={"sm"}
                  color="secondary.100"
                >
                  Checkout
                </Button>
              </Flex>
            </Grid>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default CheckoutForm;
