import { Box } from '@chakra-ui/react'
import EmbedResume from '../components/layouts/embed-resume'
import Section from '../components/layouts/section'

const Resume = () => (
  <Section delay={0.4}>
    <EmbedResume src="/pdf/resume.pdf"/>
  </Section>
)

export default Resume
