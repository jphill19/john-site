import { Box, Text, Image, useColorModeValue } from "@chakra-ui/react";

const LogoInline = ({ children }) => {
  const logoStart = useColorModeValue(
    "/images/inline/logo-inline-start.png",
    "/images/inline/logo-inline-start-dark.png"
  );

  const logoEnd = useColorModeValue(
    "/images/inline/logo-inline-end.png",
    "/images/inline/logo-inline-end-dark.png"
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      gap="4px"
      p={0}
    >
      <Image src={logoStart} alt="Logo start" boxSize="20px" />

      <Text lineHeight="20px" display="inline">
        {children}
      </Text>

      <Image src={logoEnd} alt="Logo end" boxSize="20px" />
    </Box>
  );
};

export default LogoInline;
