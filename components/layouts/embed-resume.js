import { Box } from '@chakra-ui/react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const EmbedResume = ({ src }) => {
  const defaultLayout = defaultLayoutPlugin(); // Fullscreen functionality is included here

  return (
    <Box
      border="2px solid"
      borderColor="gray.300"
      borderRadius="lg"
      overflow="hidden"
      position="relative"
      w="full"
      h={["80vh", "100vh"]}
      mt="10px"
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={src}
          plugins={[defaultLayout]} 
        />
      </Worker>
    </Box>
  );
};

export default EmbedResume;
