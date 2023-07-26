import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Input,
  Flex,
  Icon,
  Box,
  FormControl,
  FormErrorMessage,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { User } from "react-feather";
import { logIn, updateProfile } from "@/redux/features/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, CSRF_TOKEN } from "@/utils/constants";
import { fetchFavorites } from "@/redux/features/favorites-slice";
import { fetchCart } from "@/redux/features/cart-slice";
import VerifyEmailModal from "./verifyModal";
import { fetchHistory } from "@/redux/features/history-slice";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Name must be at least 5 characters")
    .max(255, "name can not exceed 225 characters")
    .required("Name is required"),
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email format"
    )
    .max(255, "name can not exceed 225 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email format"
    )
    .max(255, "name can not exceed 225 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const AuthModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabsChange = (index) => {
    setActiveTab(index);
  };
  const [isVerify, setIsVerify] = useState(false);
  const headerText = activeTab === 0 ? "Welcome back" : "Welcome";
  const { token } = useSelector((state) => state.tokenReducer.value);
  const handleLogIn = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    fetch(API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        cache: "force-cache",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const res = await response.json();
        const { message } = res;
        if (response.ok) {
          const { data } = res;
          dispatch(updateProfile(await data));
          dispatch(fetchFavorites(data.token));
          dispatch(fetchCart(data.token));
          dispatch(fetchHistory(data.token));
          toast({
            title: message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error logging in",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error logging in",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleRegister = async (values) => {
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
      password_confirmation: values.confirmPassword,
    };
    fetch(API_URL + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token,
        cache: "force-cache",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const res = await response.json();
        const { data, message } = res;
        dispatch(updateProfile(data));
        onClose();
        setIsVerify(true);
        if (response.ok) {
          const { data } = await res;
          toast({
            title: message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error creating account",
            description: res.errors.email[0] || message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error creating account",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="primary.200">
          <ModalHeader>{headerText}!</ModalHeader>
          <ModalBody>
            <Tabs index={activeTab} onChange={handleTabsChange}>
              <TabList mb="1em">
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box mb={3} textAlign={"center"}>
                    <Icon as={User} boxSize={10} color="primary.500" />
                  </Box>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      handleLogIn(values);
                      onClose();
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Flex as={Form} gap={5} direction={"column"}>
                        <Field name="email">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                            >
                              <Input {...field} placeholder="Email" />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="password" mt={4}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <Input
                                {...field}
                                type="password"
                                placeholder="Password"
                              />
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Button
                          bg="primary.500"
                          isLoading={isSubmitting}
                          type="submit"
                          color="secondary.100"
                          mt={4}
                        >
                          Login
                        </Button>
                      </Flex>
                    )}
                  </Formik>
                </TabPanel>
                <TabPanel>
                  <Box mb={3} textAlign={"center"}>
                    <Icon as={User} boxSize={10} color="primary.500" />
                  </Box>
                  <Formik
                    initialValues={{
                      name: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => {
                      handleRegister(values);
                      onClose();
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Flex as={Form} gap={5} direction={"column"}>
                        <Field name="name">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
                            >
                              <Input {...field} placeholder="Name" />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="email">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                            >
                              <Input {...field} placeholder="Email" />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="password" mt={4}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <Input
                                {...field}
                                type="password"
                                placeholder="Password"
                              />
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="confirmPassword" mt={4}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.confirmPassword &&
                                form.touched.confirmPassword
                              }
                            >
                              <Input
                                {...field}
                                type="password"
                                placeholder="Confirm Password"
                              />
                              <FormErrorMessage>
                                {form.errors.confirmPassword}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Button
                          bg="primary.500"
                          isLoading={isSubmitting}
                          type="submit"
                          color="secondary.100"
                          mt={4}
                        >
                          Register
                        </Button>
                      </Flex>
                    )}
                  </Formik>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VerifyEmailModal isOpen={isVerify} setOpen={setIsVerify} />
    </>
  );
};

export default AuthModal;
