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
    <Layout title="Ash Battles">
      <Container maxW="container.md">
        <Title>
          AshBattles <Badge>2024</Badge>
        </Title>
        <Paragraph>
          A website that uses AI to showcase all the Pokémon Ash Ketchum has
          battled throughout the series, along with a list of his
          accomplishments during his 25 years as the main protagonist.
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Wesite</Meta>
            <Link isExternal href="https://ashbattles.com/">
              ashbattles.com <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>NodeJs, ExpressJS, JQuery</span>
          </ListItem>
        </List>
        <WorkVideo src="/videos/ashBattles.mp4" alt="Ash Battles Site" />
        <WorkImage
          src="/images/works/ashBattles/ash.png"
          alt="Ash Profile Card"
        />
        <WorkImage
          src="/images/works/ashBattles/tournament.png"
          alt="Master 8 tournament bracket"
        />
      </Container>
    </Layout>
  )
}

export default Work
