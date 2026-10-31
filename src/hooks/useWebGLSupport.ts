import { useState, useEffect } from 'react';
import { detectWebGL, WebGLSupportInfo } from '../utils/webglDetector';

export function useWebGLSupport(): WebGLSupportInfo {
  const [support, setSupport] = useState<WebGLSupportInfo>(() => {
    if (typeof window !== 'undefined') {
      return detectWebGL();
    }
    return { isSupported: false, glVersion: null };
  });

  useEffect(() => {
    const result = detectWebGL();
    setSupport(result);
  }, []);

  return support;
}
