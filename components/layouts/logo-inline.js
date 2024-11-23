import { Box, Text, Image } from "@chakra-ui/react";

const LogoInline = ({ children }) => {
  const logoStart = "/images/inline/logo-inline-start.png";
  const logoEnd = "/images/inline/logo-inline-end.png";

  return (
    <Box
      display="flex"
      alignItems="center" // Align items centrally for better spacing
      gap="4px" // Add consistent spacing between elements
      p={0} // Remove unnecessary padding
    >
      {/* Logo at the beginning */}
      <Image src={logoStart} alt="Logo start" boxSize="20px" />

      {/* Text */}
      <Text lineHeight="20px" display="inline">
        {children}
      </Text>

      {/* Logo at the end */}
      <Image src={logoEnd} alt="Logo end" boxSize="20px" />
    </Box>
  );
};

export default LogoInline;
