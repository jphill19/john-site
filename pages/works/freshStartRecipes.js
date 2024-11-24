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
    <Layout title="Fresh Start Recipes">
      <Container maxW="container.md">
        <Title>
          Fresh Start Recipes <Badge>2024</Badge>
        </Title>
        <Paragraph>
          A mobile website providing simple, budget-friendly recipes with
          real-time pricing from local King Soopers stores, designed to support
          individuals navigating challenges or new beginnings by making cooking
          accessible and affordable.
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Wesite</Meta>
            <Link
              isExternal
              href="https://fresh-start-recipes-fe-git-main-jphill19s-projects.vercel.app"
            >
              freshStartRecipes.com <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>React, Rails, PostgreSQL</span>
          </ListItem>
        </List>
        <WorkImage
          src="/images/works/freshStartRecipes.png"
          alt="Images of Fresh Start Recipes website"
        />
      </Container>
    </Layout>
  )
}

export default Work
