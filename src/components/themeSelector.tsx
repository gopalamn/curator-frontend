import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, useColorMode } from "@chakra-ui/react";

const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4}>
      <Button onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Box>
  );
};

export default ThemeSelector;
