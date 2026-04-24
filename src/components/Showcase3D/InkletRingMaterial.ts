import { shaderMaterial } from '@react-three/drei'
import { Color, type ShaderMaterial } from 'three'

export const InkletRingMaterial = shaderMaterial(
  {
    uTime: 0,
    uIntensity: 1,
    uColorA: new Color('#FFB04A'),
    uColorB: new Color('#FF4A8C'),
    uColorC: new Color('#6B3AF6'),
    uColorD: new Color('#3DD1E6'),
  },
  /* glsl vertex */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl fragment */ `
    uniform float uTime;
    uniform float uIntensity;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    uniform vec3 uColorD;
    varying vec2 vUv;

    vec3 palette(float t) {
      t = fract(t);
      float s = t * 4.0;
      if (s < 1.0) return mix(uColorA, uColorB, s);
      if (s < 2.0) return mix(uColorB, uColorC, s - 1.0);
      if (s < 3.0) return mix(uColorC, uColorD, s - 2.0);
      return mix(uColorD, uColorA, s - 3.0);
    }

    void main() {
      float phase = vUv.x - uTime * 0.125;
      vec3 col = palette(phase);
      float edge = 1.0 - pow(abs(vUv.y - 0.5) * 2.0, 2.0);
      edge = clamp(edge, 0.0, 1.0);
      gl_FragColor = vec4(col * uIntensity, edge);
    }
  `,
)

export type InkletRingMaterialInstance = ShaderMaterial & {
  uniforms: {
    uTime: { value: number }
    uIntensity: { value: number }
    uColorA: { value: Color }
    uColorB: { value: Color }
    uColorC: { value: Color }
    uColorD: { value: Color }
  }
}
