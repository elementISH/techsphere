"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Icon,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Divider,
  Image,
  Alert,
  AlertIcon,
  Flex,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { Clock, Heart, Settings, User } from "react-feather";
import Form from "@/components/profile/form";
import HistoryCard from "@/components/profile/historyCard";
import FavoriteCard from "@/components/profile/favoriteCard";
import { useDispatch, useSelector } from "react-redux";
import UnAuth from "@/components/profile/unauthenticated";
import VerifyEmailModal from "@/components/generics/verifyModal";
import { API_URL } from "@/utils/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchHistory } from "@/redux/features/history-slice";

const Profile = ({ user, token, isVerified }) => {
  const params = useSearchParams();
  const tab = +params.get("tab");
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(+tab);
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);
  const { items } = useSelector((state) => state.favoritesReducer.value);
  const orders = useSelector((state) => state.historyReducer.value.orders);
  const [isVerify, setIsVerify] = useState(isVerified);
  const handleTabClick = (index) => {
    setSelectedTab(index);
  };
  const toast = useToast();
  const handleResendVerify = async () => {
    try {
      const response = await fetch(API_URL + `/resend-verify-code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const { message, data } = await response.json();
      if (response.ok) {
        setIsVerify(true);
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "resending verification code failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "resending verification code failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      {!isVerified ? (
        <>
          <Alert status="warning" mb={5}>
            <AlertIcon />
            <Flex w={"100%"} justifyContent={"space-between"}>
              Please verify your email address
              <Button variant={"link"} onClick={handleResendVerify}>
                resend verification email
              </Button>
            </Flex>
          </Alert>
          <VerifyEmailModal isOpen={isVerify} setOpen={setIsVerify} />
        </>
      ) : null}

      <Tabs
        position="relative"
        variant="unstyled"
        isLazy
        bg="primary.100"
        borderRadius={10}
        mb={"5rem"}
        index={selectedTab}
        onChange={handleTabClick}
      >
        <TabList
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Tab
            mr={2}
            mb={2}
            gap={3}
            _selected={{ color: "primary.500", bg: "white" }}
          >
            <Icon as={User} />
            Account
          </Tab>
          <Tab
            mr={2}
            mb={2}
            gap={3}
            _selected={{ color: "primary.500", bg: "white" }}
          >
            <Icon as={Clock} />
            Order History
          </Tab>
          <Tab
            mr={2}
            mb={2}
            gap={3}
            _selected={{ color: "primary.500", bg: "white" }}
          >
            <Icon as={Heart} />
            Favorite
          </Tab>
        </TabList>
        <Divider />
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="primary.500"
          borderRadius="1px"
          display={{ base: "none", md: "block" }}
        />
        <Divider
          mt="-1.5px"
          height="2px"
          display={{ base: "block", md: "none" }}
        />
        <TabPanels>
          <TabPanel>
            <Form userData={user} token={token} />
          </TabPanel>
          <TabPanel display="flex" flexDirection="column" gap={2}>
            {orders?.length == 0 || !orders ? (
              <>
                <Heading textAlign={"center"}>
                  you currently have no order history
                </Heading>
                <Button
                  variant={"outline"}
                  as={Link}
                  href="/cart"
                  borderColor={"primary.500"}
                  w={"fit-content"}
                  margin={"auto"}
                  mt={5}
                >
                  view cart
                </Button>
              </>
            ) : (
              orders?.map((history) => (
                <HistoryCard
                  token={token}
                  key={history.id}
                  date={history.order_date}
                  total={history.total}
                  status={history.status}
                  id={history.id}
                />
              ))
            )}
          </TabPanel>
          <TabPanel display="flex" flexDirection="column" gap={2}>
            {items?.length == 0 ? (
              <>
                <Heading textAlign={"center"}>
                  you currently have no favorites
                </Heading>
                <Button
                  variant={"outline"}
                  as={Link}
                  href="/products"
                  borderColor={"primary.500"}
                  w={"fit-content"}
                  margin={"auto"}
                  mt={5}
                >
                  view products
                </Button>
              </>
            ) : (
              items?.map((favorite) => (
                <FavoriteCard
                  key={favorite.id}
                  id={favorite.id}
                  name={favorite.name}
                  image={favorite.image}
                  price={favorite.price}
                />
              ))
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

const AuthProfile = () => {
  const { user, isAuth, token, isVerified } = useSelector(
    (state) => state.authReducer.value
  );

  if (!isAuth) {
    return <UnAuth />;
  }

  return <Profile user={user} token={token} isVerified={isVerified} />;
};

export default AuthProfile;
