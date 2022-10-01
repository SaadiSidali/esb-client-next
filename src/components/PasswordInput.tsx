import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import React from "react";

export function PasswordInput({ onChange }: any) {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
        name="password"
        onChange={onChange}
      />
      <InputRightElement width="4.5rem">
        <IconButton
          backgroundColor={"transparent"}
          aria-label="Hide Password"
          onClick={handleClick}
          icon={show ? <BiHide /> : <BiShow />}
        />
      </InputRightElement>
    </InputGroup>
  );
}
