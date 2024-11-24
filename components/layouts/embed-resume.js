import { Box } from '@chakra-ui/react'

const EmbedResume = ({ src }) => (
  <Box
    border="2px solid"
    borderColor="gray.300"
    borderRadius="lg"
    overflow="hidden"
    w="full"
    h="100vh"
    mt="10px"
  >
    <embed
      src={src}
      type="application/pdf"
      width="100%"
      height="100%"
      style={{ border: 'none' }}
    />
  </Box>
)

export default EmbedResume
