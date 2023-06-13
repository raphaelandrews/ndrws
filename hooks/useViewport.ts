import { useEffect, useMemo, useState } from 'react';

const useViewport = () => {
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
  
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
  
    useEffect(() => {
      // Event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Initial width and height on component mount
      handleResize();
  
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return useMemo(() => ({
      viewportWidth,
      viewportHeight,
    }), [viewportWidth, viewportHeight]);
  };
  
  export default useViewport;