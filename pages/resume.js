import { Box } from '@chakra-ui/react'
import EmbedResume from '../components/layouts/embed-resume'
import Section from '../components/layouts/section'
import NoSsr from '../components/layouts/no-ssr'

const Resume = () => (
  <Section delay={0.4}>
    <NoSsr>
      <EmbedResume src="/pdf/resume.pdf" />
    </NoSsr>
  </Section>
)

export default Resume
