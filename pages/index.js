import NextLink from 'next/link'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  Link,
  useColorModeValue,
  SimpleGrid,
  List,
  ListItem,
  Icon
} from '@chakra-ui/react'
import Section from '../components/layouts/section'
import Paragraph from '../components/layouts/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Layout from '../components/layouts/article'
import { BioSection, BioYear } from '../components/layouts/bio'
import { GridItem } from '@chakra-ui/react'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io'
import NoSsr from '../components/layouts/no-ssr'
import Map from '../components/layouts/map'

const Page = () => {
  return (
    <Layout>
      <Container maxW="container.md">
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
            John is a full-stack developer with a foundation in cybersecurity
            and computer networking. His journey into coding began during his
            role as a Sales Engineer at a cybersecurity company, where he wrote
            a Python script to solve a work-related challenge. This experience
            sparked his passion for creative problem-solving and building
            digital solutions.
          </Paragraph>
          <Paragraph>
            <br />
            With expertise in tech stacks like JavaScript, Python, Ruby on
            Rails, React, Express.js, TypeScript, Flask, and PostgreSQL, John
            brings a versatile skill set to both front-end and back-end
            development. His enthusiasm for the creative process and tackling
            real-world problems keeps him driven and excited about the endless
            possibilities in technology. Outside of coding, John enjoys spending
            time at the gym, exploring new innovations, and relaxing with his
            wife.
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
            <BioYear>1998</BioYear>
            Born in Denver Colorado, Raised in South Amerca
          </BioSection>
          <BioSection>
            <BioYear>2022</BioYear>
            Completed Bachelor&apos;s Program at Metropolitan State University
          </BioSection>
          <BioSection>
            <BioYear>2022 - 2024</BioYear>
            Worked at Everfox as a Cross Domain Solutions Sales Engineer
          </BioSection>
          <BioSection>
            <BioYear>2024 - Present</BioYear>
            Attending Turing School Of Software And Design Full Stack Program
          </BioSection>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <NoSsr>
            <Map
              center={[-60, 50]}
              zoom={0}
              height="600px"
              width="100%"
              borderRadius="lg"
              borderWidth="2px"
              markers={[
                {
                  coordinates: [-104.87561587386408, 39.56293137354986],
                  location: 'Denver, Colorado',
                  imageSrc: '/images/maps/denver.jpeg',
                  description: 'Test 123456'
                },
                {
                  coordinates: [-63.1821, -17.7833],
                  location: 'Santa Cruz, Bolivia',
                  imageSrc: '/images/maps/santacruz.jpeg',
                  description: 'Test 123456'
                },
                {
                  coordinates: [-58.3816, -34.6037],
                  location: 'Buenos Aires, Argentina',
                  imageSrc: '/images/maps/buenosaires.jpeg',
                  description: 'Test 123456'
                }
              ]}
            />
          </NoSsr>
        </Section>

        <Section delay={0.2}>
          <Heading as="h3" variant="section-title">
            Passions
          </Heading>
          <Paragraph>
            Art, Music,{' '}
            <Link as={NextLink} href="/works/inkdrop">
              Inkdrop
            </Link>
          </Paragraph>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Find Me Online
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/jphill19" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoGithub} />}
                >
                  @jphill19
                </Button>
              </Link>
            </ListItem>
            <ListItem></ListItem>
            <ListItem>
              <Link href="www.linkedin.com/in/johnpierrehill" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoLinkedin} />}
                >
                  John Hill
                </Button>
              </Link>
            </ListItem>
            <ListItem></ListItem>
          </List>
        </Section>
      </Container>
    </Layout>
  )
}

export default Page
