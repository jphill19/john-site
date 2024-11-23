// Ensure you import Text from Chakra UI
import { useEffect, useRef, useState, lazy, Suspense } from 'react'
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
  ThemeContext
} from '@chakra-ui/react'
import theme from '../../lib/theme'
import { emotionCache } from '../../lib/emotion-cache'
import { CacheProvider } from '@emotion/react'
import { Global } from '@emotion/react'
import { motion } from 'framer-motion'
import { CloseIcon } from '@chakra-ui/icons'
import { ContextBridge } from '../../lib/context-bridge'

const LazyPopupContent = lazy(() => import('./PopupContent'))

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

  const mapStyle = useColorModeValue(
    'mapbox://styles/jphill-apis/cm3t9we0e004h01qs4gvubcb3',
    'mapbox://styles/mapbox/dark-v10'
  )

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

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove())
    markersRef.current = []

    // Create new markers
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

        // Create a popup container
        const popupContainer = document.createElement('div')

        // Lazy-load the popup content
        ReactDOM.createRoot(popupContainer).render(
          <ContextBridge contexts={[ThemeContext]}>
            <Suspense fallback={<div>Loading...</div>}>
              <LazyPopupContent
                imageSrc={imageSrc}
                title={location}
                description={description}
                onClose={() => popup.remove()}
                parent={parent}
                languages={languages}
              />
            </Suspense>
          </ContextBridge>
        )

        // Create and attach the popup
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: false
        }).setDOMContent(popupContainer)

        // Attach the marker and popup to the map
        const marker = new mapboxgl.Marker(markerContainer)
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map.current)

        // Keep track of the marker for cleanup
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

  useEffect(() => {
    if (!map.current) return

    const debounceTimeout = setTimeout(() => {
      map.current.setStyle(mapStyle)
      if (map.current.loaded()) {
        setLoading(false)
      } else {
        map.current.on('load', () => setLoading(false))
      }
    }, 200) // Adjust debounce time as needed

    return () => clearTimeout(debounceTimeout)
  }, [mapStyle])

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
