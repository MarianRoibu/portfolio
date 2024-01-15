import { useMemo, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, BufferGeometry, BufferAttribute, ShaderMaterial } from "three";
import * as THREE from 'three';

// Import your textures
import colorTexture from '../Textures/Marble/QuartziteDenali002_COL_8K_METALNESS.png';
import metalnessTexture from '../Textures/Marble/QuartziteDenali002_METALNESS_8K_METALNESS.png';
import normalTexture from '../Textures/Marble/QuartziteDenali002_NRM_8K_METALNESS.png';
import roughnessTexture from '../Textures/Marble/QuartziteDenali002_ROUGHNESS_8K_METALNESS.png';

const Particles = ( { count = 500 } ) =>
{
    const meshRef = useRef();
    const colorMap = useLoader( TextureLoader, colorTexture );
    const roughnessMap = useLoader( TextureLoader, roughnessTexture );
    const normalMap = useLoader( TextureLoader, normalTexture );
    const metalnessMap = useLoader( TextureLoader, metalnessTexture );


    const [initialPositions] = useState( () =>
    {
        const temp = [];
        for ( let i = 0; i < count; i++ )
        {
            temp.push(
                ( Math.random() - 0.5 ) * 2, // x
                ( Math.random() - 0.5 ) * 2, // y
                ( Math.random() - 0.5 ) * 2  // z
            );
        }
        return new Float32Array( temp );
    } );

    const particles = useMemo( () =>
    {
        const temp = new Float32Array( count * 3 );
        return temp;
    }, [count] );

    const geometry = useMemo( () =>
    {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute( 'position', new THREE.BufferAttribute( particles, 3 ) );
        return geometry;
    }, [particles] );

    useFrame( ( state ) =>
    {
        const time = state.clock.getElapsedTime();
        const positions = meshRef.current.geometry.attributes.position.array;

        for ( let i = 0; i < count; i++ )
        {
            const idx = i * 3;
            positions[idx] = initialPositions[idx] + Math.sin( time + idx ) * 0.5;
            positions[idx + 1] = initialPositions[idx + 1] + Math.sin( time + idx + 1 ) * 0.5;
            positions[idx + 2] = initialPositions[idx + 2] + Math.sin( time + idx + 2 ) * 0.5;
        }

        meshRef.current.geometry.attributes.position.needsUpdate = true;
    } );

    const vertexShader = `
        attribute float size;
        void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
    `;

    const fragmentShader = `
        void main() {
            float r = 0.0, delta = 0.0, alpha = 1.0;
            vec2 cxy = 2.0 * gl_PointCoord - 1.0;
            r = dot(cxy, cxy);
            if (r > 1.0) {
                discard;
            }
            gl_FragColor = vec4(gl_FragColor.rgb, alpha);
        }
    `;

    const shaderMaterial = useMemo( () => new ShaderMaterial( {
        uniforms: {
            colorTexture: { value: colorMap },
            particleSize: { value: .03 }, // Adjust particle size as needed
            // Add other textures as uniforms if needed
        },
        vertexShader: `
            uniform float particleSize;
            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = particleSize * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform sampler2D colorTexture;
            void main() {
                float r = 0.0, delta = 0.0, alpha = 1.0;
                vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                r = dot(cxy, cxy);
                if (r > 1.0) {
                    discard;
                }
                vec4 texColor = texture2D(colorTexture, gl_PointCoord);
                gl_FragColor = vec4(texColor.rgb, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
    } ), [colorMap] );


    return (
        <points ref={meshRef} geometry={geometry}>
            <primitive object={shaderMaterial} attach="material" />
        </points>
    );
};

export default Particles;