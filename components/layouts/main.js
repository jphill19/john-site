import Head from 'next/head'
import Navbar from '../nav-bar/nav-bar.component'
import { Box, Container } from '@chakra-ui/react'
import VoxelJohn from './voxel-john'
import NoSsr from './no-ssr'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>John Hills - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <NoSsr>
          <VoxelJohn />
        </NoSsr>
        {children}
      </Container>
    </Box>
  )
}

export default Main
