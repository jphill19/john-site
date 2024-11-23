import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const PopupContent = ({
  onClose,
  imageSrc,
  title,
  parent,
  languages,
  description,
  delay = 0.2,
  theme,
  colorMode,
  lineColor, // Receive lineColor as a prop
}) => {
  // Define styles based on colorMode
  const bgColor = colorMode === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 32, 44, 0.9)';
  const textColor = colorMode === 'light' ? '#1A202C' : '#F7FAFC';
  const secondaryTextColor = colorMode === 'light' ? '#4A5568' : '#A0AEC0';

  // Use lineColor for the close button, with a default if not provided
  const buttonColor = lineColor || (colorMode === 'light' ? '#ED8936' : '#FFB74D');

  // Green color for the badge text
  const badgeTextColor = '#38A169'; // Chakra UI green.500
  const badgeBorderColor = '#38A169';

  return (
    <MotionDiv
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{
        backgroundColor: bgColor,
        borderRadius: '16px',
        boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px', // Limit the width to prevent it from getting too large
      }}
    >
      {imageSrc && (
        <div>
          <img
            src={imageSrc}
            alt={title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '16px 16px 0 0',
              display: 'block',
              margin: 'auto',
            }}
          />
        </div>
      )}
      <div style={{ flex: 1, padding: '8px', textAlign: 'center' }}>
        <p
          style={{
            fontWeight: 'bold',
            fontSize: '14px',
            color: textColor,
            margin: '4px 0',
          }}
        >
          {title}, {parent}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '4px',
          }}
        >
          <span
            style={{
              color: badgeTextColor,
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500',
              border: `1px solid ${badgeBorderColor}`,
              backgroundColor: 'transparent', // Transparent background
            }}
          >
            Languages
          </span>
          <span
            style={{
              marginLeft: '4px',
              fontWeight: '500',
              fontSize: '12px',
              color: secondaryTextColor,
            }}
          >
            {languages}
          </span>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: secondaryTextColor,
            marginTop: '8px',
          }}
        >
          {description}
        </p>
      </div>
      <div style={{ textAlign: 'center', padding: '8px', marginTop: 'auto' }}>
        <button
          onClick={onClose}
          style={{
            backgroundColor: buttonColor,
            color: '#FFFFFF',
            padding: '6px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
          }}
        >
          Close
        </button>
      </div>
    </MotionDiv>
  );
};

export default PopupContent;
