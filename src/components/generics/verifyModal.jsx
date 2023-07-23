import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  HStack,
  PinInput,
  PinInputField,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { API_URL } from "@/utils/constants";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "@/redux/features/favorites-slice";
import { fetchCart } from "@/redux/features/cart-slice";
import { fetchHistory } from "@/redux/features/history-slice";
import {
  updateProfile,
  updateProfileVerify,
} from "@/redux/features/auth-slice";
const VerifyEmailModal = ({ isOpen, setOpen }) => {
  const pin1 = useRef();
  const pin2 = useRef();
  const pin3 = useRef();
  const pin4 = useRef();
  const pin5 = useRef();
  const pin6 = useRef();
  const pins = [pin1, pin2, pin3, pin4, pin5, pin6];
  const toast = useToast();
  const { token } = useSelector((state) => state.authReducer.value);
  const { onClose } = useDisclosure();
  const dispatch = useDispatch();
  const handleConfirm = () => {
    let pinValues = [];
    pins.forEach((pin) => {
      pinValues.push(+pin.current.value);
    });

    fetch(API_URL + "/verify-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        cache: "force-cache",
      },
      body: JSON.stringify({ verify_code: +pinValues.join("") }),
    })
      .then(async (response) => {
        const res = await response.json();

        const { message } = res;
        if (response.ok) {
          const { data } = res;
          dispatch(updateProfileVerify(true));
          dispatch(fetchFavorites(token));
          dispatch(fetchCart(token));
          dispatch(fetchHistory(token));
          setOpen(false);
          toast({
            title: message,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Error verifying email",
            description: message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Error verifying email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Verify Email</ModalHeader>
        <ModalBody>
          <Flex justify="space-between">
            <HStack w={"full"} justifyContent={"center"}>
              <PinInput otp>
                <PinInputField ref={pin1} />
                <PinInputField ref={pin2} />
                <PinInputField ref={pin3} />
                <PinInputField ref={pin4} />
                <PinInputField ref={pin5} />
                <PinInputField ref={pin6} />
              </PinInput>
            </HStack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setOpen(false)}
            mr={3}
            variant={"outline"}
            borderColor={"primary.500"}
          >
            Cancel
          </Button>
          <Button color={"primary.100"} onClick={handleConfirm}>
            Verify
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VerifyEmailModal;
