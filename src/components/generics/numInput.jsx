import {
  Button,
  Flex,
  FormHelperText,
  Heading,
  Input,
  VStack,
  useNumberInput,
} from "@chakra-ui/react";
import { useLayoutEffect, useState } from "react";
import { useEffect, useMemo } from "react";

const NumInput = ({
  label,
  value,
  step,
  precision,
  min,
  max,
  onIncrement,
  onDecrement,
  onChange,
  onBlur,
}) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: step || 1.0,
      defaultValue: value,
      precision,
      min,
      max,
    });

  const input = getInputProps({
    onChange: (event) => {
      const newValue = parseFloat(event.target.value);
      if (!isNaN(newValue) && newValue <= max && newValue >= min) {
        onChange(newValue);
      } else {
        if (newValue <= max) {
          onChange(min);
        } else {
          onChange(max);
        }
      }
    },
    onBlur: (event) => {
      const newValue = parseFloat(event.target.value);
      if (!isNaN(newValue) && newValue <= max && newValue >= min) {
        onChange(newValue);
        onBlur();
      } else {
        if (newValue <= max) {
          onChange(min);
        } else {
          onChange(max);
        }
        onBlur();
      }
    },
  });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  return (
    <VStack>
      <Heading size={"sm"} w={"100%"}>
        {label}
      </Heading>
      <Flex color={"primary.100"} alignItems="center">
        <Button
          {...dec}
          size="sm"
          borderRightRadius={0}
          onClick={onDecrement}
          onMouseDown={onDecrement}
        >
          -
        </Button>
        <Input
          borderLeftRadius={0}
          {...input}
          size="sm"
          color={"secondary.900"}
          textAlign={"center"}
          bg={"primary.100"}
          borderRightRadius={0}
          placeholder="----"
          inputMode={"numeric"}
        />
        <Button
          {...inc}
          size="sm"
          borderLeftRadius={0}
          onClick={onIncrement}
          onMouseDown={onIncrement}
        >
          +
        </Button>
      </Flex>
    </VStack>
  );
};

export default NumInput;
