import React from 'react'
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import PosterFrame from './PosterFrame'



function PosterCollection() {
    const group_ref = useRef(); 
    const rotation_factor = 0.5; 

    
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        group_ref.current.rotation.y = a*rotation_factor; 

      });
      

    return (
        <group ref={group_ref} position={[0,0,0]}>
            <PosterFrame url={'https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'} pos={[12,1,0]} angle={-Math.PI/2}/>
            <PosterFrame url={'https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'} pos={[-12,1,0]} angle={Math.PI/2}/>
            <PosterFrame url={'https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'} pos={[0,1,12]} angle={-Math.PI}/>
            <PosterFrame url={'https://image.tmdb.org/t/p/w300/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg'} pos={[0,1,-12]} angle={0}/>

        </group>
    )
}

export default PosterCollection