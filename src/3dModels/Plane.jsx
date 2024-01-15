import React from 'react';

const Plane = () =>
{
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry attach="geometry" args={[500, 500]} />
            <meshStandardMaterial
                attach="material"
                color="#ffffff"
                roughness={0.1} // Bajar la rugosidad para aumentar la reflectividad
                metalness={1}   // Aumentar la metalicidad para mejorar el reflejo
            />
        </mesh>
    );
};

export default Plane;