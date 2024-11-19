import Head from 'next/head'
import Navbar from '../nav-bar/nav-bar.component'
import { useState, useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import VoxelJohn from './voxel-john'
import NoSsr from './no-ssr'

const MotionBox = motion(Box)

const Main = ({ children, router }) => {
  const [shouldDisplay, setShouldDisplay] = useState(true)

  useEffect(() => {
    if (router.asPath !== '/resume') {
      setShouldDisplay(true)
    }
  }, [router.asPath])

  const handleAnimationComplete = () => {
    if (router.asPath === '/resume') {
      setShouldDisplay(false)
    }
  }

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>John Hills - Homepage</title>
      </Head>

      <Navbar path={router.asPath} />

      <Container maxW="container.md" pt={14}>
        <NoSsr>
          <MotionBox
            initial={{ opacity: 1, y: 0 }}
            animate={
              router.asPath === '/resume'
                ? { opacity: 0, y: 10 } 
                : { opacity: 1, y: 0 } 
            }
            transition={{ duration: 0.8 }}
            style={{ display: shouldDisplay ? 'block' : 'none' }}
            onAnimationComplete={handleAnimationComplete} 
          >
            <VoxelJohn />
          </MotionBox>
        </NoSsr>
        {children}
      </Container>
    </Box>
  )
}

export default Main
