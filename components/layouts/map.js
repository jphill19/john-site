// Ensure you import Text from Chakra UI
import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactDOM from 'react-dom/client'
import {
  Box,
  Text,
  Button,
  Image,
  useColorMode,
  Spinner,
  useColorModeValue,
  useStyleConfig,
  ChakraProvider,
  chakra,
  shouldForwardProp,
  Badge
} from '@chakra-ui/react'
import theme from '../../lib/theme'
import { emotionCache } from '../../lib/emotion-cache'
import { CacheProvider } from '@emotion/react'
import { Global } from '@emotion/react'
import { motion } from 'framer-motion'
import { CloseIcon } from '@chakra-ui/icons'

const MotionBox = chakra(motion.div, {
  shouldForwardProp: prop => shouldForwardProp(prop) || prop === 'transition'
})

const PopupContent = ({
  onClose,
  imageSrc,
  title,
  parent,
  languages,
  description,
  delay = 0.2
}) => {
  return (
    <MotionBox
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.8, delay }}
      height={['270px', '300px']} // Responsive heights
      width={['280px', '300px']}
      maxWidth="500px"
      bg={useColorModeValue('whiteAlpha.500', 'blackAlpha.500')}
      backdropFilter="blur(10px)"
      borderRadius="16px"
      boxShadow="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
    >
      {/* Image Covering Full Width */}
      {imageSrc && (
        <Box>
          <Image
            src={imageSrc}
            alt={title}
            width='100%' // Adjust width based on screen size
            maxWidth="400px" // Optional: Set a maximum width for larger screens
            height="auto"
            borderRadius="16px 16px 0 0"
            mx="auto" // Center the image horizontally
          />
        </Box>
      )}
      {/* Content Section */}
      <Box flex="1" p={2} textAlign="center">
        <Text
          fontWeight="bold"
          fontSize="14px"
          color={useColorModeValue('gray.800', 'whiteAlpha.900')}
        >
          {title}, {parent}
        </Text>
        {/* Badge and Small Text */}
        <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
          <Badge
            colorScheme="green"
            fontSize="11px"
            px={2}
            py={1}
            borderRadius="md"
          >
            Languages
          </Badge>
          <Text
            ml={1}
            fontWeight="bold"
            fontSize="12px"
            color={useColorModeValue('gray.600', 'gray.400')}
          >
            {languages}
          </Text>
        </Box>
        <Text
          fontSize="12px"
          color={useColorModeValue('gray.600', 'gray.400')}
          mt={1}
        >
          {description}
        </Text>
      </Box>
      {/* Close Button Always at the Bottom */}
      <Box textAlign="center" p={2} mt="auto">
        <Button
          onClick={onClose}
          colorScheme="orange"
          size="sm"
          borderRadius="md"
        >
          Close
        </Button>
      </Box>
    </MotionBox>
  )
}

const CustomMarker = ({
  dotColor,
  lineColor,
  textColor,
  location,
  abbreviation
}) => {
  return (
    <Box position="relative" display="flex" alignItems="center" height="50px">
      {/* Small Dot */}
      <Box
        width="12px"
        height="12px"
        bg={dotColor}
        borderRadius="50%"
        boxShadow={`0 0 5px ${dotColor}`}
        position="absolute"
        left="0"
        top="0"
        zIndex="2"
      />

      {/* First Horizontal Line */}
      <Box
        width="15px"
        height="3px"
        bg={lineColor}
        position="absolute"
        left="20px"
        top="4.5px"
        zIndex="1"
        borderRadius="2px"
      />

      {/* Rotated Line */}
      <Box
        width="15px"
        height="3px"
        bg={lineColor}
        position="absolute"
        left="calc(20px + 15px - 1px)"
        top="4.5px"
        transform="rotate(30deg)"
        transformOrigin="left center"
        zIndex="1"
      />

      {/* Text with Underline */}
      <Box
        position="absolute"
        left="calc(20px + 15px + 13px - 2px)"
        top="-9.5px"
        zIndex="3"
        whiteSpace="nowrap"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Text
          color={textColor}
          fontSize="14px"
          fontWeight="bold"
          background="transparent"
          marginBottom="1px"
        >
          {location}, {abbreviation}
        </Text>
        <Box
          width="100%"
          height="3px"
          bg={lineColor}
          borderRadius="2px"
          zIndex="1"
        />
      </Box>
    </Box>
  )
}

const Map = props => {
  const {
    center = [-74.5, 40],
    zoom = 1,
    height = '500px',
    width = '100%',
    markers = [],
    ...rest
  } = props

  const [loading, setLoading] = useState(true) // For map loading
  const [colorModeLoading, setColorModeLoading] = useState(false) // For color mode transition
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])

  const { colorMode, toggleColorMode } = useColorMode()
  const styles = useStyleConfig('Map', { ...props, colorMode })

  const dotColor = useColorModeValue('#ED8936', '#FFB74D')
  const lineColor = useColorModeValue('#ED8936', '#FFB74D')
  const textColor = useColorModeValue('#4A5568', 'whiteAlpha.900')

  const mapStyle =
    colorMode === 'light'
      ? 'mapbox://styles/jphill-apis/cm3t9we0e004h01qs4gvubcb3'
      : 'mapbox://styles/mapbox/dark-v10'

  // Handle map loading
  useEffect(() => {
    if (!mapContainer.current) return

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: mapStyle,
        center,
        zoom,
        attributionControl: false,
        ...props.mapOptions
      })

      map.current.on('load', () => setLoading(false))
    } else {
      map.current.setStyle(mapStyle)
      if (map.current.loaded()) {
        setLoading(false)
      } else {
        map.current.on('load', () => setLoading(false))
      }
    }
  }, [mapStyle, center, zoom, props.mapOptions])

  useEffect(() => {
    if (!map.current) return

    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    markers.forEach(
      ({
        coordinates,
        location,
        imageSrc,
        description,
        abbreviation,
        parent,
        languages
      }) => {
        const markerContainer = document.createElement('div')
        const root = ReactDOM.createRoot(markerContainer)
        root.render(
          <CustomMarker
            dotColor={dotColor}
            lineColor={lineColor}
            textColor={textColor}
            location={location}
            abbreviation={abbreviation}
          />
        )

        const handleClosePopup = popup => {
          popup.remove()
        }

        const popupContainer = document.createElement('div')
        const popupRoot = ReactDOM.createRoot(popupContainer)
        popupRoot.render(
          <ChakraProvider theme={theme}>
            <PopupContent
              imageSrc={imageSrc}
              title={location}
              description={description}
              onClose={() => handleClosePopup(popup)}
              parent={parent}
              languages={languages}
            />
          </ChakraProvider>
        )

        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false
        }).setDOMContent(popupContainer)

        const marker = new mapboxgl.Marker(markerContainer)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current)

        markersRef.current.push(marker)
      }
    )
  }, [markers, dotColor, lineColor, textColor])

  // Handle color mode changes
  useEffect(() => {
    const handleColorModeTransition = () => {
      setColorModeLoading(true)
      setTimeout(() => setColorModeLoading(false), 300) // Simulate transition duration
    }

    handleColorModeTransition()
  }, [colorMode])

  return (
    <>
      <Global
        styles={`
          .mapboxgl-popup-content {
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .mapboxgl-popup-tip {
            opacity: 0 !important; /* Makes the tip invisible */
          }
          .mapboxgl-ctrl-logo, .mapboxgl-ctrl-attrib {
            display: none !important; /* Completely hides the logo and attribution */
          }
        `}
      />

      <Box
        position="relative"
        width={width}
        height={height}
        bg={styles.backgroundColor}
        borderColor={styles.borderColor}
        borderWidth="4px"
        borderStyle="solid"
        borderRadius="md"
        overflow="hidden"
        {...rest}
      >
        {(loading || colorModeLoading) && (
          <Spinner
            size="xl"
            position="absolute"
            left="50%"
            top="50%"
            transform="translate(-50%, -50%)"
            zIndex="10"
          />
        )}
        <Box
          ref={mapContainer}
          width="100%"
          height="100%"
          visibility={loading || colorModeLoading ? 'hidden' : 'visible'}
        />
      </Box>
    </>
  )
}

export default Map
