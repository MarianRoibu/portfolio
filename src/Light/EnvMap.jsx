import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { WebGLCubeRenderTarget, CubeCamera, RGBAFormat, LinearMipmapLinearFilter } from 'three';

const EnvMap = () =>
{
    const { gl, scene } = useThree();
    const cubeRenderTarget = new WebGLCubeRenderTarget( 128, { format: RGBAFormat, generateMipmaps: true, minFilter: LinearMipmapLinearFilter } );
    const cubeCamera = new CubeCamera( 1, 1000, cubeRenderTarget );
    const cubeCameraRef = useRef();

    useEffect( () =>
    {
        cubeCameraRef.current = cubeCamera;
        scene.add( cubeCamera );
        return () => scene.remove( cubeCamera );
    }, [cubeCamera, scene] );

    useEffect( () =>
    {
        if ( cubeCameraRef.current )
        {
            cubeCameraRef.current.update( gl, scene );
        }
    } );

    return null;
};

export default EnvMap;