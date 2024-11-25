import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Section from '../components/layouts/section'
import { WorkGridItem } from '../components/layouts/grid-item'
import { useColorModeValue } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

import battleShip from '../public/images/works/battleShip.png'
import morseCodeTranslator from '../public/images/works/morseCodeTranslator.png'
import waterMarkApp from '../public/images/works/waterMarkApp.png'
import comingSoon from '../public/images/works/comingSoon.png'
import ashBattles from '../public/images/works/ashBattles.png'
import freshStartRecipes from '../public/images/works/freshStartRecipes.png'
import valiantShield from '../public/images/works/valiantShield.png'

const Works = () => {
  return (
    <Layout>
      <Container maxW="container.md">
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading>
        <SimpleGrid columns={[1, 1, 2]} spacing={6}>
          <Section>
            <WorkGridItem
              id="comingSoon"
              title="FitAtlas"
              thumbnail={comingSoon}
              placeholder="blur"
            >
              A website and mobile application designed for 3D human body
              rendering, enabling users to interactively select muscle groups
              and visualize targeted workouts for those muscles.
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="freshStartRecipes"
              title="Fresh Start Recipes"
              thumbnail={freshStartRecipes}
            >
              A mobile website providing simple, budget-friendly recipes with
              real-time pricing from local King Soopers stores, designed to
              support individuals navigating challenges or new beginnings by
              making cooking accessible and affordable.
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem
              id="ashBattles"
              title="Ash Battles"
              thumbnail={ashBattles}
              placeholder="blur"
            >
              A Pokémon-themed website leveraging AI and the Pokémon API to
              determine if Ash Ketchum, the protagonist of the Pokémon series,
              has battled specific Pokémon featured in the series.
            </WorkGridItem>
          </Section>
        </SimpleGrid>
        <Section delay={0.4}>
          <Divider my={6} />
          <Heading as="h3" fontSize={20} mb={4}>
            Sales Engineer Work
          </Heading>
          <SimpleGrid columns={[1, 1, 2]} spacing={6}>
            <Section>
              <WorkGridItem
                id="valiantShield"
                title="Valiant Shield"
                thumbnail={valiantShield}
                placeholder="blur"
              >
                I worked as a contractor for Everfox, implementing Cross Domain
                Solutions for L3Harris’ Valiant Shield 2024 project, which
                enhanced military readiness and secure communication through
                advanced electronic warfare capabilities.
              </WorkGridItem>
            </Section>
          </SimpleGrid>
        </Section>

        <Section delay={0.4}>
          <Divider my={6} />
          <Heading as="h3" fontSize={20} mb={4}>
            Old Works
          </Heading>
          <SimpleGrid columns={[1, 1, 2]} spacing={6}>
            <Section>
              <WorkGridItem
                id="battleship"
                title="Battle Ship"
                thumbnail={battleShip}
                placeholder="blur"
              >
                A Ruby terminal-based Battleship game with customizable board
                sizes, dynamic ship types, and a smart AI opponent featuring
                strategic targeting, adaptive gameplay mechanics, and real-time
                feedback for an engaging and challenging experience.
              </WorkGridItem>
            </Section>

            <Section>
              <WorkGridItem
                id="watermark"
                title="Watermark"
                thumbnail={waterMarkApp}
                placeholder="blur"
              >
                A Windows-exclusive application for advanced watermarking,
                featuring multi-image input, customizable resizing, adjustable
                opacity, precise alignment tools with grid overlays, and zoom
                functionality for detailed, professional-quality results
              </WorkGridItem>
            </Section>

            <Section>
              <WorkGridItem
                id="morseCodeConverter"
                title="Morse Code Converter"
                thumbnail={morseCodeTranslator}
                placeholder="blur"
              >
                A terminal-based Morse Code translator featuring text-to-Morse
                encoding, Morse-to-text decoding, audio playback with
                customizable pitch and speed, and an intuitive interface for
                seamless and educational use
              </WorkGridItem>
            </Section>
          </SimpleGrid>
        </Section>
      </Container>
    </Layout>
  )
}

export default Works
