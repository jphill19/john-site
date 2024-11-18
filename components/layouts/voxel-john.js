import { useState, useEffect, useRef, useCallback } from 'react'
import { Box, Spinner } from '@chakra-ui/icons'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../../lib/model'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelJohn = () => {
  const refContainer = useRef()
  const initRef = useRef(false)
  const [loading, setLoading] = useState(true)
  const rendererRef = useRef()
  const cameraRef = useRef()
  const controlsRef = useRef()

  const target = new THREE.Vector3(-0.5, 1.2, 0)
  const initialCameraPosition = new THREE.Vector3(
    20 * Math.sin(0.2 * Math.PI),
    10,
    35 * Math.cos(0.2 * Math.PI)
  )
  const scene = new THREE.Scene()

  const handleWindowResize = useCallback(() => {
    const { current: container} = refContainer
    if (container && rendererRef){
      const scW = container.clientWidth
      const scH = container.clientHeight

      rendererRef.current.setSize(scH, scW)
    }
  }, [rendererRef])

  useEffect(() => {
    const { current: container } = refContainer
    if (container && !initRef.current) {
      initRef.current = true

      const schW = container.clientWidth
      const scH = container.clientHeight

      // Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(schW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      rendererRef.current = renderer

      // Camera
      const scale = scH * 0.005 + 4.8 //Determines the camera's view size based on the container's height. + 4.8: Adds a base value to ensure the scene is visible even on smaller screens.
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      ) // Left, right, top, bottom, near, far clipping planes.
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)
      cameraRef.current = camera

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement)
      // controls.enableRotate = false // Disable rotation
      // controls.enableZoom = false // Disable zooming
      // controls.enablePan = false // Disable panning
      controls.autoRotate = true
      controls.target = target
      controlsRef.current = controls

      // Lights
      const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
      scene.add(ambientLight)

      // Load Model
      loadGLTFModel(scene, '/office.glb', {
        receiveShadow: false,
        castShadow: false
      }).then(() => {
        setLoading(false)
        animate()
      })

      // Animation Loop
      let req = null
      let frame = 0
      const animate = () => {
        req = requestAnimationFrame(animate)

        frame = frame <= 100 ? frame + 1 : frame

        if (frame <= 100) {
          const p = initialCameraPosition
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

          camera.position.y = 10
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
          camera.lookAt(target)
        } else {
          controls.update()
        }
        renderer.render(scene, camera)
      }

      // Cleanup
      return () => {
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])

  useEffect(()=> {
    window.addEventListener('resize', handleWindowResize)
    return()=>{
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [rendererRef, handleWindowResize])

  return (
    <Box
      ref={refContainer}
      className="voxel-john"
      m="auto"
      mt={['-20px', '-60px', '-120px']}
      mb={['-40px', '-140px', '-200px']}
      w={[280, 480, 640]}
      h={[280, 480, 640]}
      position="relative"
    >
      {loading && (
        <Spinner
          size="xl"
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
        />
      )}
    </Box>
  )
}

export default VoxelJohn
