import { useEffect, useRef } from 'react';
import ParallaxEngine from '../utils/parallaxEngine';

export const useParallax = (configPath?: string) => {
  const engineRef = useRef<ParallaxEngine | null>(null);

  useEffect(() => {
    engineRef.current = new ParallaxEngine();
    engineRef.current.loadConfig(configPath);

    return () => {
      engineRef.current?.destroy();
    };
  }, [configPath]);

  const addParallaxElement = (selector: string, config: any) => {
    engineRef.current?.addElement(selector, config);
  };

  const updateConfig = (newConfig: any[]) => {
    engineRef.current?.updateConfig(newConfig);
  };

  return { addParallaxElement, updateConfig };
};