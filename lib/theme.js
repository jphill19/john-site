import { extendTheme, textDecoration } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'


const styles = {
  global: props => ({
    body: {
      bg: mode('#F7FAFC', '#191A1A')(props)
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
      color: mode('#FF6F00', '#FFB74D')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'"
}

const colors = {
  background: {
    light: '#F7FAFC',
    dark: '#191A1A',
  },
  border: {
    light: '#F7FAFC',
    dark: '#191A1A',
  },
  glassTeal: '#88ccca',
  warmYellow: '#FFB74D'
};

const config = {
  initialColorMode: 'light',
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
