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
  ChakraProvider
} from '@chakra-ui/react'
import theme from '../../lib/theme'
import { emotionCache } from '../../lib/emotion-cache'
import { CacheProvider } from '@emotion/react'
import { Global } from '@emotion/react'

const PopupContent = ({ onClose, imageSrc, title, description }) => {
  return (
    <Box
      bg="black" // Semi-transparent background
      backdropFilter="blur(10px)" // Blur effect
      p={0}
      borderRadius="md"
      position="relative"
      maxWidth="250px"
    >
      <Button position="absolute" top="2" right="2" size="sm" onClick={onClose}>
        Close
      </Button>
      {imageSrc && (
        <Image src={imageSrc} alt={title} borderRadius="md" mb={2} />
      )}
      <Text fontWeight="bold" mb={1}>
        {title}
      </Text>
      <Text>{description}</Text>
    </Box>
  )
}

const CustomMarker = ({ dotColor, lineColor, textColor, location }) => {
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
          {location}
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

  const [loading, setLoading] = useState(true)
  const mapContainer = useRef(null)
  const map = useRef(null)
  const markersRef = useRef([])

  const { colorMode } = useColorMode()
  const styles = useStyleConfig('Map', { ...props, colorMode })

  const dotColor = useColorModeValue('#FF6F00', '#FFB74D')
  const lineColor = useColorModeValue('#FF6F00', '#FFB74D')
  const textColor = useColorModeValue('gray.800', 'whiteAlpha.900')

  const mapStyle =
    colorMode === 'light'
      ? 'mapbox://styles/mapbox/light-v10'
      : 'mapbox://styles/mapbox/dark-v10'

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

      // Set loading to false when the map has loaded
      map.current.on('load', () => {
        setLoading(false)
      })
    } else {
      map.current.setStyle(mapStyle)

      // If the map is already loaded, set loading to false
      if (map.current.loaded()) {
        setLoading(false)
      } else {
        map.current.on('load', () => {
          setLoading(false)
        })
      }
    }
  }, [mapStyle, center, zoom, props.mapOptions])

  useEffect(() => {
    if (!map.current) return

    // Remove existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Add new markers
    markers.forEach(({ coordinates, location, imageSrc, description }) => {
      const markerContainer = document.createElement('div')
      const root = ReactDOM.createRoot(markerContainer)
      root.render(
        <CustomMarker
          dotColor={dotColor}
          lineColor={lineColor}
          textColor={textColor}
          location={location}
        />
      )

      // Create a container for the popup content
      const popupContainer = document.createElement('div')

      // Render the PopupContent component into the popup container
      const popupRoot = ReactDOM.createRoot(popupContainer)
      popupRoot.render(
        <CacheProvider value={emotionCache}>
          <ChakraProvider theme={theme}>
            <PopupContent
              onClose={() => {
                popup.remove()
              }}
              imageSrc={imageSrc}
              title={location}
              description={description}
            />
          </ChakraProvider>
        </CacheProvider>
      )

      // Create the popup with the DOM element
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false
      }).setDOMContent(popupContainer)

      // Create the marker and set the popup
      const marker = new mapboxgl.Marker(markerContainer)
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map.current)

      // Keep track of markers
      markersRef.current.push(marker)
    })
  }, [markers, dotColor, lineColor, textColor])

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
        {loading && (
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
          visibility={loading ? 'hidden' : 'visible'}
        />
      </Box>
    </>
  )
}

export default Map
