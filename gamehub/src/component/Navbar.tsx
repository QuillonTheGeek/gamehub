import { HStack, Image } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

function Navbar() {
  return (
    <HStack justifyContent="space-between" padding="20px">
      <Image src={logo} boxSize="80px" />
      <ColorModeSwitch />
    </HStack>
  );
}

export default Navbar;
