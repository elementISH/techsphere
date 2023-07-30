import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ContactCard from "./card";
import { MapPin, MessageCircle } from "react-feather";
import { API_URL } from "@/utils/constants";
import { useSelector } from "react-redux";

const ContactForm = () => {
  const { name, email } = useSelector((state) => state.authReducer.value.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });
  const initialValues = {
    name: name || "",
    email: email || "",
    subject: "",
    message: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    setIsSubmitting(true);
    fetch(API_URL + "/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        resetForm();
        setIsSubmitting(false);
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Sending Message failed",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Box mb={"5rem"}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <>
              <Box
                as={Form}
                bg="secondary.100"
                p={10}
                display={"flex"}
                justifyContent={"space-between"}
                gap={5}
                borderRadius={10}
                border="1px solid"
                borderColor="secondary.900"
              >
                <Box w={"100%"}>
                  <Field name="name">
                    {({ field }) => (
                      <FormControl
                        isRequired
                        isInvalid={errors.name && touched.name}
                        mb={4}
                      >
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} id="name" placeholder="Your name" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field }) => (
                      <FormControl
                        isRequired
                        isInvalid={errors.email && touched.email}
                        mb={4}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" placeholder="Your email" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="subject">
                    {({ field }) => (
                      <FormControl
                        isRequired
                        isInvalid={errors.subject && touched.subject}
                        mb={4}
                      >
                        <FormLabel htmlFor="subject">Subject</FormLabel>
                        <Input {...field} id="subject" placeholder="Subject" />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="message">
                    {({ field }) => (
                      <FormControl
                        isRequired
                        isInvalid={errors.message && touched.message}
                        mb={4}
                      >
                        <FormLabel htmlFor="message">Message</FormLabel>
                        <Textarea
                          {...field}
                          id="message"
                          placeholder="Message"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    bg="primary.500"
                    color="secondary.100"
                    fontSize={["sm"]}
                    fontWeight={["bold"]}
                    type="submit"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    mt={4}
                    variant={"styled"}
                    px={5}
                  >
                    Send
                  </Button>
                </Box>
                <Flex
                  direction={"column"}
                  gap={5}
                  display={{ base: "none", md: "flex" }}
                >
                  <ContactCard
                    icon={MapPin}
                    heading={"visit us"}
                    subHeading={"speak to our team"}
                    link={"support@techshare.com"}
                  />
                  <ContactCard
                    icon={MessageCircle}
                    heading={"Chat with us"}
                    subHeading={"speak to our team"}
                    link={"support@techshare.com"}
                  />
                </Flex>
              </Box>
            </>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ContactForm;
