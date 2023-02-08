import React, {useContext, useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import PosterFrame from './PosterFrame';
import Non_target from './Non_target'
import Target from './Target'; 



function PosterCollection() {
    const group_ref = useRef(); 
    const rotation_factor = 0.15; 
    
    
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        group_ref.current.rotation.y = a*rotation_factor; 

    });

    return (
        
        <>
            <Target />
            <group ref={group_ref} position={[0,0,-6]}>
                <Non_target />
            </group>
        </>
        
    )
}

export default PosterCollection