import { extendTheme, textDecoration } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// const styles = {
//   global: props => ({
//     body: {
//       bg: mode('#f0e7db', '#202023')(props)
//     }
//   })
// }

const styles = {
  global: props => ({
    body: {
      bg: mode('#CAD2D3', '#191A1A')(props)
    }
  })
}

const components = {
  Map: {
    baseStyle: (props) => ({
      backgroundColor: mode('background.light', 'background.dark')(props),
      borderColor: mode('border.light', 'border.dark')(props),
    }),
  },
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('3d7aed', '#ff63c3')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const colors = {
  background: {
    light: '#CAD2D3',
    dark: '#191A1A',
  },
  border: {
    light: '#CAD2D3',
    dark: '#191A1A',
  },
  glassTeal: '#88ccca',
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}


const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts
})

export default theme
