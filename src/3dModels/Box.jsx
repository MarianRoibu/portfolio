import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from "three";
import colorTexture from '../Textures/Marble/QuartziteDenali002_COL_8K_METALNESS.png';
import metalnessTexture from '../Textures/Marble/QuartziteDenali002_METALNESS_8K_METALNESS.png';
import normalTexture from '../Textures/Marble/QuartziteDenali002_NRM_8K_METALNESS.png';
import roughnessTexture from '../Textures/Marble/QuartziteDenali002_ROUGHNESS_8K_METALNESS.png';

function Box()
{
    const meshRef = useRef();
    const colorMap = useLoader( TextureLoader, colorTexture );
    const roughnessMap = useLoader( TextureLoader, roughnessTexture );
    const normalMap = useLoader( TextureLoader, normalTexture );
    const metalnessMap = useLoader( TextureLoader, metalnessTexture );

    useFrame( ( { mouse } ) =>
    {
        if ( meshRef.current )
        {
            meshRef.current.rotation.x = mouse.y * Math.PI * 0.5;
            meshRef.current.rotation.y = mouse.x * Math.PI * 0.5;
        }
    } );

    return (
        <mesh ref={meshRef}>
            <sphereGeometry attach="geometry" args={[1, 240, 240]} /> {/* Cambiado a esfera */}
            <meshStandardMaterial
                attach="material"
                map={colorMap}
                roughnessMap={roughnessMap}
                normalMap={normalMap}
                metalnessMap={metalnessMap}
            />
        </mesh>
    );
}

export default Box;