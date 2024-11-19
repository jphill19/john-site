import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Title,
  WorkImage,
  Meta,
  WorkVideo
} from '../../components/layouts/work-details'
import Paragraph from '../../components/layouts/paragraph'
import Layout from '../../components/layouts/article'

const Work = () => {
  return (
    <Layout title="Morse Code Translator">
      <Container maxW="container.md">
        <Title>
          Morse Code Converter<Badge>2023</Badge>
        </Title>
        <Paragraph>
          A terminal-based Morse Code translator featuring text-to-Morse
          encoding, Morse-to-text decoding, audio playback with customizable
          pitch and speed, and an intuitive interface for seamless and
          educational use
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Python, PyAudio</span>
          </ListItem>
        </List>
        <WorkImage
          src="/images/works/morseCodeTranslator/morseCodeConverter.png"
          alt="Morse Code Converter Application"
        />
      </Container>
    </Layout>
  )
}

export default Work
