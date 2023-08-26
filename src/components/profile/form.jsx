import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  useToast,
  Flex,
  Image,
  Divider,
  Stack,
  IconButton,
  Icon,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { API_URL } from "@/utils/constants";
import { updateProfile } from "@/redux/features/auth-slice";
import { useDispatch } from "react-redux";
import { Edit } from "react-feather";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Name must be at least 5 characters")
    .max(255, "name can not exceed 225 characters")
    .required("Name is required"),
  phone: Yup.number(),
  city: Yup.string(),
  address: Yup.string(),
});

const ProfileForm = ({ userData, token }) => {
  const { name, email, address, city, phone, image } = userData;
  const [imgSrc, setImgSrc] = useState(image);
  const dispatch = useDispatch();
  const toast = useToast();
  const initialValues = {
    name: name || "",
    phone: phone || "",
    city: city || "",
    email: email,
    address: address || "",
    // image: imgSrc,
  };
  const handleSubmit = async (values) => {
    // formData.append("image", values.image);

    fetch(API_URL + "/update-profile", {
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
        dispatch(updateProfile(data));
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Profile update failed",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <>
            <Form
              encType="multipart/form-data"
              action={`${API_URL}/update-profile`}
              method="post"
            >
           {/*   <Field name="image">
                {({ field, form }) => (
                  <FormControl>
                    <Stack position={"relative"}>
                      <Image
                        src={imgSrc}
                        h={{ base: "150px", md: "2xs" }}
                        w={{ base: "150px", md: "2xs" }}
                        borderRadius={"full"}
                        objectFit={"cover"}
                        border={"1px solid"}
                        borderColor={"primary.500"}
                        mx={"auto"}
                        mb={2}
                      />
                      <IconButton
                        isRound={true}
                        as={"label"}
                        htmlFor="upload-photo"
                        fontSize="20px"
                        position={"absolute"}
                        bottom={"-10px"}
                        left={"50%"}
                        transform={"translateX(-50%)"}
                        color={"primary.100"}
                        cursor={"pointer"}
                        icon={<Icon as={Edit} />}
                      />
                      <Input
                        {...field}
                        type="file"
                        value={""}
                        opacity={0}
                        position={"absolute"}
                        zIndex={"-1"}
                        name="photo"
                        id="upload-photo"
                        onChange={(e) => {
                          setImgSrc(URL.createObjectURL(e.target.files[0]));
                          form.setFieldValue("image", e.target.files[0]);
                        }}
                      />
                    </Stack>
                  </FormControl>
                )}
              </Field> */}
              <Divider my={4} />
              <Grid
                templateColumns={{ sm: "1fr", md: "repeat(2, 1fr)" }}
                gap={4}
              >
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                      />
                    </FormControl>
                  )}
                </Field>
                <FormControl isDisabled _disabled={{ opacity: 1 }}>
                  <FormLabel htmlFor="email" _disabled={{ opacity: 1 }}>
                    Email
                  </FormLabel>
                  <Input
                    _disabled={{ opacity: 1 }}
                    value={email}
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </FormControl>
                <Field name="phone">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.phone && form.touched.phone}
                    >
                      <FormLabel htmlFor="phone">Phone</FormLabel>
                      <Input
                        {...field}
                        id="phone"
                        type="number"
                        placeholder="Enter your phone"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="city">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.city && form.touched.city}
                    >
                      <FormLabel htmlFor="city">City</FormLabel>
                      <Input
                        {...field}
                        id="city"
                        type="text"
                        placeholder="Enter your city"
                      />
                    </FormControl>
                  )}
                </Field>
                <Field name="address">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.address && form.touched.address}
                    >
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <Input
                        {...field}
                        id="address"
                        type="text"
                        placeholder="Enter your address"
                      />
                    </FormControl>
                  )}
                </Field>
              </Grid>
              <Flex gap={4} mt={5}>
                <Button
                  isLoading={props.isSubmitting}
                  type="submit"
                  bg="primary.500"
                  size={"sm"}
                  color="secondary.100"
                >
                  Save Changes
                </Button>
                <Button
                  isLoading={props.isSubmitting}
                  type="reset"
                  size={"sm"}
                  variant={"outline"}
                  borderColor="primary.500"
                >
                  Reset
                </Button>
              </Flex>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export default ProfileForm;
