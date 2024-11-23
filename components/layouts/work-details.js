import NextLink from 'next/link'
import { Headin, Box, Image, Link, Badge, Heading } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

export const Title = ({ children }) => (
  <Box>
    <Link as={NextLink} href="/works" scroll={false}>
      Works
    </Link>

    <span>
      &nbsp;
      <ChevronRightIcon />
      &nbsp;
    </span>
    <Heading display="inline-block" as="h3" fontSize={20} mb={4}>
      {children}
    </Heading>
  </Box>
)

export const WorkImage = ({ src, alt }) => (
  <Image borderRadius="lg" w="full" src={src} alt={alt} mb={4} />
)
export const WorkVideo = ({ src, alt }) => (
  <Box borderRadius="lg" overflow="hidden" mb={4}>
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
    >
      <source src={src} type="video/mp4" />
      {alt && <p>{alt}</p>}
    </video>
  </Box>
)
export const Meta = ({ children }) => (
  <Badge colorScheme="green" mr={2}>
    {children}
  </Badge>
)
