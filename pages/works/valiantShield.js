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
    <Layout title="Valiant Shield">
      <Container maxW="container.md">
        <Title>
          Valiant Shield <Badge>2023 - 2024</Badge>
        </Title>
        <WorkImage
          src="/images/works/valiantShield.png"
          alt="Screenshot of the watermark saving menu"
        />
        <Paragraph>
          L3Harris’ Valiant Shield 2024 project showcased advanced electronic
          warfare capabilities, integrating secure cross-domain solutions to
          enhance military readiness and secure communications across diverse
          platforms. As a Sales Engineer on behalf of Everfox, John played a key
          role in aiding the implementation of these cross-domain capabilities,
          ensuring seamless interoperability while adhering to stringent NSA
          guidance and security protocols. His contributions supported the
          project’s mission to demonstrate cutting-edge technology in real-world
          defense scenarios.
        </Paragraph>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Article</Meta>
            <Link
              isExternal
              href="https://www.l3harris.com/newsroom/press-release/2024/07/l3harris-demonstrates-electronic-warfare-valiant-shield-2024"
            >
              ashbattles.com <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>
      </Container>
    </Layout>
  )
}

export default Work
