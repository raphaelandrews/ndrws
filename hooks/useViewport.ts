import { useEffect, useMemo, useState } from 'react';

const useViewport = () => {
    const [viewportWidth, setViewportWidth] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
  
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      handleResize();
  
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