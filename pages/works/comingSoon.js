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
    <Layout title="Coming Soon">
      <Container maxW="container.md">
        <Title>
          FitAtlas <Badge>2024 - Current</Badge>
        </Title>
        <Paragraph>
          FitAtlas is a beginner-friendly fitness app that links 3D muscle
          visualization to targeted workouts, helping users learn and build
          custom routines to achieve their fitness goals.
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Next.js, Rails, GraphQl, Three.js, Firebase</span>
          </ListItem>
        </List>
        <WorkImage
          src="/images/works/comingSoon/construction.png"
          alt="Under construction site"
        />
      </Container>
    </Layout>
  )
}

export default Work
