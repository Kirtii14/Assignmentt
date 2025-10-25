import React, { useState, useEffect, useRef } from 'react'; // Added React imports

// --- InfoBox Component and its dependencies ---

// --- MODIFIED: QuestionMarkIcon ---
// The outer div is 24x24 with a circular border.
// The inner SVG is scaled down to 16x16 so the border is visible.
const QuestionMarkIcon = () => {
  return (
    // Outer div for the 24x24 circular border
    <div
      style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%', // Ensures a perfect circle
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent', // Transparent background for the circle
        // Apply gradient to the border
        border: '1.5px solid transparent',
        borderImage: 'linear-gradient(327.89deg, #4A4E54 -1.73%, #A3ADBA 89.26%) 1',
        borderImageSlice: '1',
      }}
    >
      {/* Inner SVG, scaled down to 16x16 to be visible inside the border */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Added unique ID for gradient within this scope */}
          <linearGradient id="questionMarkGradientInfo" x1="22.6274" y1="20.8909" x2="3.1414" y2="1.38133" gradientUnits="userSpaceOnUse">
            <stop offset="-0.0173" stopColor="#4A4E54"/>
            <stop offset="0.8926" stopColor="#A3ADBA"/>
          </linearGradient>
        </defs>
        <path
          d="M9 10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 11.38 14.1 12.6 13 13.15V14"
          stroke="url(#questionMarkGradientInfo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
        <path
          d="M12 17H12.01"
          stroke="url(#questionMarkGradientInfo)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
// --- End of QuestionMarkIcon ---

// ADDED: New GridIcon component for the 6 boxes
const GridIcon = () => {
  // Style for the outer frame
  const frameStyle = {
    width: '24px',
    height: '30.68783187866211px',
    borderRadius: '2.33px',
    // We use flex wrap and gap to create the 2x3 grid
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: '1.38px',
  };

  // Style for the 6 inner boxes
  const boxStyle = {
    width: '9.312169075012207px',
    height: '9.312169075012207px',
    borderRadius: '1.16px',
    background: '#4A4E54',
  };

  return (
    <div style={frameStyle}>
      {/* Create 6 boxes */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={boxStyle} />
      ))}
    </div>
  );
};

// --- MODIFIED: MotionNavbar Component for sliding animation ---
const MotionNavbar = ({ style }) => { // ADDED: style prop
  const [activeTab, setActiveTab] = useState('Recommended'); // Changed to useState
  const [hoveredTab, setHoveredTab] = useState(null); // Changed to useState
  const tabs = ['About Me', 'Experiences', 'Recommended'];

  // ADDED: State for the slider's position and size
  const [sliderStyle, setSliderStyle] = useState({ // Changed to useState
    left: 0,
    width: 0,
    opacity: 0, // Start invisible until calculated
  });

  // ADDED: Refs to hold the DOM elements
  const tabsContainerRef = useRef(null); // Changed to useRef
  const tabRefs = useRef({}); // Changed to useRef

  // ADDED: Effect to calculate and set slider position
  // MODIFIED: Recalculate on window resize for responsiveness (Kept resize listener for robustness)
  useEffect(() => { // Changed to useEffect
    const calculateSlider = () => {
      const activeTabRef = tabRefs.current[activeTab];
      const containerRef = tabsContainerRef.current;

      if (activeTabRef && containerRef) {
        const { offsetLeft, clientWidth } = activeTabRef;

        setSliderStyle({
          // We set left relative to the container
          left: offsetLeft,
          width: clientWidth,
          opacity: 1, // Make visible
        });
      }
    };

    calculateSlider(); // Calculate on initial render and tab change

    window.addEventListener('resize', calculateSlider); // Recalculate on resize
    return () => window.removeEventListener('resize', calculateSlider); // Cleanup listener

  }, [activeTab]); // Dependency remains activeTab

  // MODIFIED: Navbar Style - Back to fixed width
  const navbarStyle = {
    width: '614px', // Restored fixed width
    height: '62px',
    borderRadius: '23px',
    background: '#171717',
    boxShadow: '0px 4.96px 12.4px 2.48px rgba(0, 0, 0, 0.25) inset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Back to center for fixed width
    padding: '6.5px',
    position: 'relative',
    ...style,
  };


  // Style for the "slider" element that moves
  const sliderActiveStyle = {
    position: 'absolute',
    top: '6.5px',
    height: '49px',
    borderRadius: '16px',
    background: '#28292F',
    boxShadow: '13.49px 16.87px 67.47px 8.43px #0A0A0A, -8.43px -16.87px 50.6px -16.87px #485B71',
    transition: 'left 0.3s ease, width 0.3s ease',
    zIndex: 1,
    ...sliderStyle,
  };

  // MODIFIED: Base style for the tab buttons - Back to fixed width
  const tabBaseStyle = {
    width: '195px', // Restored fixed width
    height: '49px',
    borderRadius: '16px',
    padding: '10px 24px', // Restored original padding
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'color 0.3s ease, background 0.3s ease',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '500',
    fontSize: '18px', // Restored font size
    lineHeight: '16.12px', // Restored line height
    color: '#A3ADB2',
    background: 'transparent',
    boxShadow: 'none',
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };


  // Style for the *text* of the active tab
  const activeTextStyle = {
    color: 'white', // White text for active tab
  };

  // ADDED: Style for the hover state (subtle white gradient)
  const hoverStyle = {
    background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)',
  };


  return (
    // ADDED: ref to the container
    <div style={navbarStyle} ref={tabsContainerRef}>
      {/* ADDED: The moving slider element */}
      <div style={sliderActiveStyle} />

      {tabs.map((tab) => (
        <button
          key={tab}
          // ADDED: ref for each tab
          ref={(el) => (tabRefs.current[tab] = el)}
          onClick={() => setActiveTab(tab)}
          // ADDED: Mouse enter/leave events
          onMouseEnter={() => setHoveredTab(tab)}
          onMouseLeave={() => setHoveredTab(null)}
          style={{
            ...tabBaseStyle,
            // MODIFIED: Only apply active text style
            ...(activeTab === tab ? activeTextStyle : {}),
            // ADDED: Apply hover style only if hovered AND not active
            ...(hoveredTab === tab && activeTab !== tab ? hoverStyle : {}),
             // Restored margin for fixed layout
            marginRight: tab !== tabs[tabs.length - 1] ? '10px' : '0px',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
// --- End of MotionNavbar ---

/**
 * InfoBox Component
 * Contains the content for the first widget (Tabs, text, scrollbar).
 * MODIFIED: Using absolute positioning with original coordinates.
 */
const InfoBox = () => { // Made this the default export

  // --- MODIFIED: Style for the text content - Back to fixed width/coords ---
  const textContentStyle = {
    position: 'absolute',
    top: '114px',   // 210px (absolute) - 96px (widget top)
    left: '53px',   // 975px (absolute) - 922px (widget left)
    width: '611px', // Restored fixed width
    height: '175px', // Restored fixed height
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontWeight: 400,
    fontSize: '20px', // Restored font size
    lineHeight: '100%', // Restored line height
    color: '#969696',
    overflow: 'hidden', // Keep hidden overflow
  };

  // --- MODIFIED: Style for the scrollbar - Back to fixed coords ---
  const scrollbarStyle = {
    position: 'absolute',
    top: '111px',  // 207px (absolute) - 96px (widget top)
    left: '699px', // 1621px (absolute) - 922px (widget left)
    width: '8px',
    height: '64px',
    borderRadius: '8px',
    background: 'linear-gradient(177.32deg, #888989 5.6%, #4A4E54 93.28%)',
    boxShadow: '4px 4px 4.9px 0px rgba(0, 0, 0, 0.25)',
  };

  // --- MODIFIED: Style for the left icon "frame" - Back to fixed coords ---
  const iconFrameStyle = {
    position: 'absolute',
    top: '20px',   // 116px (absolute) - 96px (widget top)
    left: '12px',  // 934px (absolute) - 922px (widget left)
    width: '24px',
    height: '159.68px', // Restored fixed height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '105px', // Your specified gap
  };

  // --- MODIFIED: Style for the navbar - Back to fixed coords ---
  const navbarPosStyle = {
    position: 'absolute',
    top: '17px',   // 113px (absolute) - 96px (widget top)
    left: '53px',  // 975px (absolute) - 922px (widget left)
    // Removed responsive constraints
  };


  return (
    // MODIFIED: Added position: relative, removed padding
    <div className="h-full w-full relative">

      {/* MODIFIED: Passed positioning style to navbar */}
      <MotionNavbar style={navbarPosStyle} />

      {/* MODIFIED: Icon frame with absolute positioning */}
      <div style={iconFrameStyle}>
        <QuestionMarkIcon />
        <GridIcon />
      </div>

      {/* MODIFIED: Text Content with absolute positioning */}
      <div style={textContentStyle}>
        Hello! I'm Dave, your sales rep here from Salesforce. I've been working at this awesome company for 3 years now.
        <br /><br />
        I was born and raised in Albany, NY & have been living in Santa Carla for the past 10 years my wife Tiffany and my 4 year old twin daughters - Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9 - 10 AM. This is...
      </div>

      {/* MODIFIED: Scrollbar with absolute positioning */}
      <div style={scrollbarStyle}></div>
    </div>
  );
}


// --- GalleryBox Component and its dependencies ---

/**
 * Gallery Components
 * Icons for the gallery widget
 */
const AddIcon = () => (
  // MODIFIED: Updated stroke to match new button text color
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 1V11" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 6H11" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- MODIFIED: ArrowLeftIcon (Applying new styles) ---
const ArrowLeftIcon = ({ disabled }) => (
  <svg
    width="14.19" // Updated width
    height="14" // Updated height
    viewBox="0 0 14 14" // Keep viewBox related to actual path coords
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.5 10.5L3.5 7L8.5 3.5" // Adjusted path slightly for centering in a ~14x14 box
      stroke={disabled ? "#4A4E54" : "#6F787C"} // Color based on disabled state
      strokeWidth="2" // Updated stroke width
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- MODIFIED: ArrowRightIcon (Applying new styles) ---
const ArrowRightIcon = ({ disabled }) => (
  <svg
    width="14.19" // Updated width
    height="14" // Updated height
    viewBox="0 0 14 14" // Keep viewBox related to actual path coords
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5 10.5L10.5 7L5.5 3.5" // Adjusted path slightly for centering in a ~14x14 box
      stroke={disabled ? "#4A4E54" : "#6F787C"} // Color based on disabled state
      strokeWidth="2" // Updated stroke width
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
// --------------------------------

/**
 * GalleryBox Component
 * Contains the content for the second widget (Header, buttons, images).
 * MODIFIED: Now includes state, image upload, and carousel logic. Using fixed layout again.
 */
const GalleryBox = () => {

  // --- ADDED: State for gallery ---
  const [images, setImages] = useState([ // Changed to useState
    
  ]);
  const [startIndex, setStartIndex] = useState(0); // Changed to useState
  const [hoveredArrow, setHoveredArrow] = useState(null); // Changed to useState
  const fileInputRef = useRef(null); // Changed to useRef
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null); // Changed to useState
  // ---------------------------------

  // --- ADDED: Handlers for carousel and adding images ---
  const handleAddImageClick = () => {
    // Trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Add the uploaded image data URL to the state
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
     // Reset file input value to allow uploading the same file again if needed
     event.target.value = null;
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    // Allow scrolling only if there are enough images to show a new set of 3
    setStartIndex((prev) => (prev < images.length - 3 ? prev + 1 : prev));
  };

  const canGoPrev = startIndex > 0;
  // MODIFIED: Corrected logic for canGoNext
  const canGoNext = images.length > 3 && startIndex < images.length - 3;
  // ----------------------------------------------------

  // --- MODIFIED: Style for the left icon "frame" ---
  const iconFrameStyle = {
    position: 'absolute',
    top: '20px',   // Back to original coords relative to widget
    left: '12px',
    width: '24px',
    height: '159.68px', // Restored fixed height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '105px', // Your specified gap
  };


  // --- MODIFIED: Back to simple content wrapper for fixed layout ---
  const contentWrapperStyle = {
    position: 'absolute',
    top: '17px', // Align with navbar top (113px - 96px = 17px offset from Widget top)
    left: '53px', // Align with navbar left (975px - 922px = 53px offset from Widget left)
    width: '614px', // Match navbar width
    display: 'flex',
    flexDirection: 'column',
  };


  // --- Style for the Gallery Title Box ---
  const galleryTitleBoxStyle = {
    width: '149px',
    height: '62px',
    borderRadius: '20px',
    background: '#171717',
    boxShadow: '0px 4px 10px 2px rgba(0, 0, 0, 0.25) inset',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  // --- Style for the Gallery Title Text ---
  const galleryTitleTextStyle = {
    width: '72px',
    height: '30px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '100%',
    color: '#FFFFFF',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // --- MODIFIED: Style for the carousel arrow buttons (Corrected styles) ---
  const carouselArrowBtnStyle = {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    background: 'linear-gradient(139.14deg, #303439 12.4%, #161718 94.96%)', // Corrected gradient
    boxShadow: '4px 5px 30px 5px #101213, -5px -3px 30px -10px #96BEE7', // Corrected shadow
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.3s ease',
    flexShrink: 0,
  };


  // --- Hover style for carousel arrows ---
  const carouselArrowBtnHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '4px 5px 30px 5px #101213, -5px -3px 40px 0px #96BEE7', // Brighter blue glow
  };

  // --- Style for the "ADD IMAGE" button ---
  const addImageBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#363C43',
    borderRadius: '25px',
    padding: '10px 16px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '14px',
    color: '#E0E0E0',
     boxShadow: '4px 5px 30px 5px #101213, -5px -3px 40px 0px #96BEE7',
    transition: 'background 0.2s ease, transform 0.2s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    // Removed box-shadow
  };

  // --- MODIFIED: Style for the gallery images (Back to fixed dimensions) ---
  const galleryImageBaseStyle = {
    width: '190px', // Restored fixed width
    height: '179px', // Restored fixed height
    borderRadius: '24px',
    background: 'rgba(0, 0, 0, 0.2)',
    objectFit: 'cover',
    filter: 'grayscale(1)',
    transition: 'filter 0.3s ease, transform 0.3s ease',
    cursor: 'pointer',
  };

  // --- ADDED: Style for placeholder divs ---
  const placeholderStyle = {
      ...galleryImageBaseStyle, // Inherit base dimensions and border radius
      background: 'transparent', // Make background transparent
      filter: 'none', // No grayscale
      boxShadow: 'none', // No shadow if any was applied
      cursor: 'default', // Not clickable
  };


  return (
    // MODIFIED: Added position: relative, removed padding
    <div className="h-full w-full relative">

      {/* --- ADDED: Icon frame --- */}
      <div style={iconFrameStyle}>
        {/* MODIFIED: Need QuestionMarkIcon and GridIcon available */}
        {/* Re-added definitions for single file context */}
        <QuestionMarkIcon />
        <GridIcon />
      </div>

      {/* --- ADDED: Content wrapper for alignment --- */}
      <div style={contentWrapperStyle}>
        {/* Gallery Header */}
        <div className="flex items-center justify-between"> {/* Keep using flex for header layout */}

          {/* Gallery Title */}
          <div style={galleryTitleBoxStyle}>
            <span style={galleryTitleTextStyle}>Gallery</span>
          </div>

          {/* Button Group */}
          <div className="flex items-center gap-2"> {/* Keep using flex for button group */}
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {/* "ADD IMAGE" Button */}
            <button
              style={addImageBtnStyle}
              className="hover:bg-gray-700 active:scale-95"
              onClick={handleAddImageClick}
            >
              <AddIcon />
              ADD IMAGE
            </button>

            {/* Carousel buttons */}
            <button
              style={{
                ...carouselArrowBtnStyle,
                ...(hoveredArrow === 'left' && canGoPrev ? carouselArrowBtnHoverStyle : {}),
              }}
              className={!canGoPrev ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
              onClick={handlePrev}
              disabled={!canGoPrev}
              onMouseEnter={() => setHoveredArrow('left')}
              onMouseLeave={() => setHoveredArrow(null)}
            >
              <ArrowLeftIcon disabled={!canGoPrev} />
            </button>
            <button
              style={{
                ...carouselArrowBtnStyle,
                ...(hoveredArrow === 'right' && canGoNext ? carouselArrowBtnHoverStyle : {}),
              }}
              className={!canGoNext ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
              onClick={handleNext}
              disabled={!canGoNext}
              onMouseEnter={() => setHoveredArrow('right')}
              onMouseLeave={() => setHoveredArrow(null)}
            >
              <ArrowRightIcon disabled={!canGoNext} />
            </button>
          </div>
      </div>

        {/* --- MODIFIED: Gallery Images container - Updated rendering logic --- */}
        <div className="flex-grow flex items-center justify-center gap-4 mt-4">
          {/* Always render 3 slots */}
          {[...Array(3)].map((_, index) => {
            const actualIndexInFullArray = startIndex + index;
            const imgSrc = images[actualIndexInFullArray]; // Get image source if it exists
            const isCenter = index === 1;
            const isHovered = hoveredImageIndex === actualIndexInFullArray;

            // Conditionally render image or placeholder
            if (imgSrc) {
              // Combine base style with hover modifications
              const currentImageStyle = {
                ...galleryImageBaseStyle,
                filter: isHovered ? 'grayscale(0)' : 'grayscale(1)',
                transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
              };
              return (
                <img
                  key={imgSrc + actualIndexInFullArray}
                  src={imgSrc}
                  alt={`Gallery item ${actualIndexInFullArray + 1}`}
                  style={currentImageStyle}
                  className={!isCenter ? 'opacity-70' : ''}
                  onMouseEnter={() => setHoveredImageIndex(actualIndexInFullArray)}
                  onMouseLeave={() => setHoveredImageIndex(null)}
                />
              );
            } else {
              // Render a placeholder if no image exists at this index
              return (
                 <div key={`placeholder-${actualIndexInFullArray}`} style={placeholderStyle}></div>
              );
            }
          })}
        </div>
        {/* --- End of Gallery Images container --- */}
      </div>
    </div>
  );
}


// --- Main Layout Components ---

/**
 * Separator Component
 * Renders the custom separator line as described in your properties.
 */
const Separator = () => {
  // MODIFIED: Separator Style - Back to fixed width
  const separatorStyle = {
    width: '612px', // Restored fixed width
    height: '4px',
    borderRadius: '2.46px',
    background: 'linear-gradient(180deg, rgba(40, 40, 40, 0.1) 0%, rgba(248, 248, 248, 0.1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(9.837319374084473px)',
    boxShadow: '0px 4px 4px 0px #00000054',
  };

  return (
     // MODIFIED: Back to explicit centering wrapper with fixed margins
    <div className="flex justify-center mt-[21px] mb-[21px]">
       <div style={separatorStyle}></div>
    </div>
  );
};


/**
 * Widget Component
 * A reusable component for the two widgets on the right side.
 * MODIFIED: Back to fixed dimensions.
 */
const Widget = ({ children }) => {
  // MODIFIED: Widget Style - Back to fixed width/height
  const widgetStyle = {
    width: '720px', // Restored fixed width
    height: '316px', // Restored fixed height
    borderRadius: '18.89px',
    background: '#363C43',
    boxShadow: '5.67px 5.67px 3.78px 0px #00000066',
    overflow: 'hidden', // Keep overflow hidden
    position: 'relative', // Keep relative for absolute children
  };

  return (
    // Removed bottom margin class
    <div style={widgetStyle}>
      {children}
    </div>
  );
};

/**
 * Main App Component
 * Renders the main container and layout.
 * MODIFIED: Back to fixed dimensions.
 */
export default function App() {

  // MODIFIED: Main Container Style - Back to fixed width/height
  const mainContainerStyle = {
    width: '1728px', // Restored fixed width
    height: '895px', // Restored fixed height
    borderRadius: '28px',
    background: 'linear-gradient(180deg, #373E44 -100%, #191B1F 100%)',
    boxShadow: '10px 10px 40px 10px #00000080',
    display: 'flex', // Keep flex
  };

  return (
    // MODIFIED: Outer wrapper padding back to original
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-10">

      {/* MODIFIED: Main App Container uses style object, restored classes */}
      <div style={mainContainerStyle} className="flex p-24"> {/* Restored padding */}

        {/* MODIFIED: Left Side (Empty) back to flex-1 */}
        <div className="flex-1 h-full">
          {/* As per instructions, this side is kept empty */}
        </div>

        {/* MODIFIED: Right Side (Widgets) back to fixed width */}
        <div className="flex flex-col w-[720px]"> {/* Restored fixed width */}
          {/* First Widget */}
          <Widget>
            {/* Widget 1 Content */}
            <InfoBox />
          </Widget>

          {/* Separator 1 */}
          <Separator />

          {/* Second Widget */}
          <Widget>
             {/* Widget 2 Content */}
             <GalleryBox />
          </Widget>

          {/* Separator 2 */}
           {/* Adjusted bottom separator margin - Explicit div wrapper needed */}
           <div className="flex justify-center mt-[21px]">
               <div style={{
                   width: '612px',
                   height: '4px',
                   borderRadius: '2.46px',
                   background: 'linear-gradient(180deg, rgba(40, 40, 40, 0.1) 0%, rgba(248, 248, 248, 0.1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
                   backdropFilter: 'blur(9.837319374084473px)',
                   boxShadow: '0px 4px 4px 0px #00000054',
                 }}></div>
           </div>
        </div>

      </div>
    </div>
  );
}
