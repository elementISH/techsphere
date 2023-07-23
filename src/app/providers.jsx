"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { accordionAnatomy as parts } from "@chakra-ui/anatomy";
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  container: defineStyle({
    boxShadow: "sm",
    _focus: {
      boxShadow: "outline",
    },
  }),
});

const outline = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      border: "1px solid",
      borderColor: "secondary.300",
    },
    button: {
      color: "primary.900",
      _hover: {
        color: "primary.100",
        bg: "primary.500",
      },
      _focus: {
        color: "blue.500",
      },
    },
  };
});

const filter = definePartsStyle((props) => {
  const { colorScheme: c } = props;
  return {
    container: {
      borderRadius: "full",
      border: 0,
    },
    button: {
      bg: "primary.500",
      color: "primary.100",
      borderBottomWidth: "1px",
      borderColor: "secondary.300",
      borderRadius: "full",
      w: "auto",
      _hover: {
        bg: "primary.500",
        color: "primary.100",
        filter: "brightness(90%) !important",
      },
    },
    panel: {
      marginTop: "10px",
    },
  };
});

const variants = {
  outline,
  filter,
};

const size = {
  md: defineStyle({
    w: 5,
    h: 5,
  }),
};

const sizes = {
  md: definePartsStyle({
    icon: size.md,
  }),
};
const colors = {
  primary: {
    100: "#ffffff",
    200: "#EFF8FB",
    500: "#008ECC",
    800: "#2C3454",
    900: "#212844",
  },
  secondary: {
    900: "#313131",
    500: "#656565",
    300: "#989898",
    100: "#ffffff",
  },
  bonus: {
    900: "#FFDE74",
    500: "#F87B7B",
    400: "#64D0FF",
    300: "#FFC669",
    200: "#BCF87B",
    100: "#FFF3CC",
  },
  badge: {
    900: "#FFD54B26",
    500: "#FF4E4E26",
    400: "#64D0FF26",
    300: "#FFB33A26",
    200: "#A1FE3D26",
  },
};
const accordionTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: "md",
  },
});

const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        bg: "primary.200",
        overflowX: "hidden",
        color: "secondary.900",
      },
      html: {
        bg: "primary.200",
        overflowX: "hidden",
        color: "secondary.900",
      },
      svg: {
        transiton: "fill 3s ease",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      sizes: {
        xl: {
          h: "56px",
          fontSize: "lg",
          px: "32px",
        },
      },
      variants: {
        styled: {
          bg: "primary.500",
          _hover: {
            filter: "brightness(90%) !important",
          },
          _disabled: {
            _hover: {
              filter: "brightness(90%) !important",
              bg: "secondary.900 !important",
            },
          },
        },
      },
      defaultProps: {
        variant: "styled",
        bg: "primary.500",
      },
    },
    Accordion: accordionTheme,
  },
});

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </Provider>
  );
}
