export interface WebGLSupportInfo {
  isSupported: boolean;
  glVersion: 'webgl2' | 'webgl' | null;
  renderer?: string;
}

export function detectWebGL(): WebGLSupportInfo {
  if (typeof window === 'undefined' || !window.document) {
    return { isSupported: false, glVersion: null };
  }

  try {
    const canvas = document.createElement('canvas');
    let glVersion: 'webgl2' | 'webgl' | null = null;
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2') as WebGL2RenderingContext | null;

    if (gl) {
      glVersion = 'webgl2';
    } else {
      gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (gl) {
        glVersion = 'webgl';
      }
    }

    if (!gl) {
      return { isSupported: false, glVersion: null };
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : undefined;

    // Clean up WebGL context if supported by browser
    const loseContext = gl.getExtension('WEBGL_lose_context');
    if (loseContext) {
      loseContext.loseContext();
    }

    return {
      isSupported: true,
      glVersion,
      renderer: renderer ? String(renderer) : undefined,
    };
  } catch {
    return { isSupported: false, glVersion: null };
  }
}
