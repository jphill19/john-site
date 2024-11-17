import NextLink from 'next/link'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  Link,
  useColorModeValue
} from '@chakra-ui/react'
import Section from '../components/layouts/section'
import Paragraph from '../components/layouts/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import { BioSection, BioYear } from '../components/layouts/bio'

const Page = () => {
  return (
    <Layout>
      <Container>
        <Box
          borderRadius="lg"
          bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
          p={3}
          mb={6}
          mt={3}
          align="center"
        >
          Hello, I&apos;m a full-stack developer based in Colorado
        </Box>

        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Heading as="h2" variant="page-title">
              John Hill
            </Heading>
            <p>Nerdy guy with nerdy hobbies</p>
          </Box>
          <Box
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
            ml={{ md: 6 }}
            align="center"
          >
            <Image
              borderColor="whiteAlpha.800"
              borderWidth={2}
              borderStyle="solid"
              maxWidth="100px"
              display="inline-block"
              borderRadius="full"
              src="/images/john.jpg"
              alt="Profile Image"
            />
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            John is a freelance and a full-stack developer based in Colorado
            with a passion for building digital services/stuff he wants. He has
            a knack for all things launching products, from planning and
            designing all the way to solving real-life problems with code. When
            not online, he loves to hanging out with his wife or at the gym.{' '}
            <Link as={NextLink} href="/works/inkdrop">
              Inkdrop
            </Link>
            .
          </Paragraph>
          <Box align="center" my={4}>
            <NextLink href="/works">
              <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
                My Portfolio
              </Button>
            </NextLink>
          </Box>
        </Section>
        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>1984</BioYear>
            Born in Denver Colorado, Raised in Santa Cruz Bolivia
          </BioSection>
          <BioSection>
            <BioYear>2022</BioYear>
            Completed Bachelor&apos;s Program at Metropolitan State University
          </BioSection>
          <BioSection>
            <BioYear>2022 to 2024</BioYear>
            Worked at Everfox as a Cross Domain Solutions Sales Engineer
          </BioSection>
        </Section>

        <Section delay={0.2}>
          <Heading>I ♥</Heading>
          <Paragraph>
            Art, Music,{' '}
            <Link as={NextLink} href="/works/inkdrop">
              Inkdrop
            </Link>
          </Paragraph>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
