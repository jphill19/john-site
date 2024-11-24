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
    <Layout title="Watermark Application">
      <Container maxW="container.md">
        <Title>
          Watermark App<Badge>2023</Badge>
        </Title>
        <Paragraph>
        A Windows-exclusive application for advanced watermarking,
        featuring multi-image input, customizable resizing, adjustable
        opacity, precise alignment tools with grid overlays, and zoom
        functionality for detailed, professional-quality results
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Python, TKinter</span>
          </ListItem>
        </List>
        <WorkImage
          src="/images/works/waterMarkApp.png"
          alt="Watermark Application"
        />
        <WorkImage
          src="/images/works/watermark/designing.png"
          alt="Screenshot of the watermark app"
        />
        <WorkImage
          src="/images/works/watermark/saving.png"
          alt="Screenshot of the watermark saving menu"
        />
      </Container>
    </Layout>
  )
}

export default Work
