import { useEffect } from 'react';
import { useAnimate } from 'framer-motion';

export const useTabAnimation = (activeTab) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate([
      [
        scope.current,
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.3, ease: "easeOut" }
      ]
    ]);
  }, [activeTab, animate]);

  return scope;
}; 