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
    <Layout title="Battleships">
      <Container maxW="container.md">
        <Title>
          Battleships <Badge>2024</Badge>
        </Title>
        <Paragraph>
          A Ruby terminal-based Battleship game with customizable board sizes,
          dynamic ship types, and a smart AI opponent featuring strategic
          targeting, adaptive gameplay mechanics, and real-time feedback for an
          engaging and challenging experience.
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Ruby</span>
          </ListItem>
        </List>
        <WorkImage
          src="/images/works/battleships/newGame.png"
          alt="New Game Display Menu"
        />
        <WorkImage
          src="/images/works/battleships/selectShip.png"
          alt="Select Ship Menu"
        />
        <WorkImage
          src="/images/works/battleships/difficulty.png"
          alt="Difficulty Selector"
        />
        <WorkImage
          src="/images/works/battleships/board.png"
          alt="Board Selector"
        />
      </Container>
    </Layout>
  )
}

export default Work
