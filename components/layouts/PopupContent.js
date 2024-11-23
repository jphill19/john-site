import { Box, Image, Text, Badge, Button, useColorModeValue, chakra, shouldForwardProp} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = chakra(motion.div, {
  shouldForwardProp: prop => shouldForwardProp(prop) || prop === 'transition'
})
const PopupContent = ({ onClose, imageSrc, title, parent, languages, description, delay = 0.2 }) => {
  return (
    <MotionBox
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.8, delay }}
      bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.500')}
      borderRadius="16px"
      boxShadow="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Popup Content */}
      {imageSrc && (
        <Box>
          <Image
            src={imageSrc}
            alt={title}
            width="100%"
            height="auto"
            borderRadius="16px 16px 0 0"
            mx="auto"
          />
        </Box>
      )}
      <Box flex="1" p={2} textAlign="center">
        <Text fontWeight="bold" fontSize="14px" color={useColorModeValue('gray.800', 'whiteAlpha.900')}>
          {title}, {parent}
        </Text>
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Badge colorScheme="green" fontSize="11px" px={2} py={1} borderRadius="md">
            Languages
          </Badge>
          <Text ml={1} fontWeight="bold" fontSize="12px" color={useColorModeValue('gray.600', 'gray.400')}>
            {languages}
          </Text>
        </Box>
        <Text fontSize="12px" color={useColorModeValue('gray.600', 'gray.400')} mt={1}>
          {description}
        </Text>
      </Box>
      <Box textAlign="center" p={2} mt="auto">
        <Button onClick={onClose} colorScheme="orange" size="sm" borderRadius="md">
          Close
        </Button>
      </Box>
    </MotionBox>
  );
};

export default PopupContent;
