import React from 'react';
import './MainPageStyle.css';
import { Canvas } from "react-three-fiber";
import Box from "../3dModels/Box";
import Particles from "../3dModels/Particles";
import Plane from "../3dModels/Plane";

const MainPage = () =>
{
    return (
        <>
            <div className="canvas-container">
                <Canvas className="canvas">
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <directionalLight color="white" position={[-2, 5, 2]} intensity={1.5} />
                    <spotLight position={[5, 15, 10]} angle={0.3} intensity={2} />
                    <hemisphereLight skyColor={"deepskyblue"} groundColor={"green"} intensity={0.5} position={[0, 50, 0]} />
                    {/* Add more lights as needed */}
                    <Box />
                    <Particles count={50000} />
                    {/* Add Plane if you need it */}
                </Canvas>
            </div>
        </>
    );
};


export default MainPage;
