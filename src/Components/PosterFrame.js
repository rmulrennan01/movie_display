import React from 'react';
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'

function PosterFrame(props) {
    const GOLDENRATIO = 1.61803398875
    const [hover, set_hover] = useState(false); 
    const this_mesh = useRef(); 
    const radius = 12; 
    const speed_factor = 0.25; 


    /*
    useFrame(({ clock }) => {
      const a = clock.getElapsedTime();
      let rotation = a*speed_factor ; //RADIANS
      let prev_rads = this_mesh.current.rotation.y; 
      this_mesh.current.rotation.y = rotation; 
      let orbit_angle = this_mesh.current.rotation.y - prev_rads; 
      console.log(orbit_angle)
      //this_mesh.current.position.z -= 0.01;
      //Angle in Radians × 180°/π 
      
      
      let x = radius * Math.sin(Math.PI *   rotation  );

      let z = radius * Math.cos(Math.PI *  rotation  );

      this_mesh.current.position.x = x; 
      this_mesh.current.position.z = z; 
    });
    */

    return (
        <group >
        <mesh 
        ref={this_mesh}
        name={'example'}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={props.pos}
        rotation={[0,props.angle, 0]}>
        <boxGeometry args={[1.2,1.2,1.1]} offset={[1,0,0]}/>
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
            

          <boxGeometry args={[1.2,1.2,1.1]} />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} position={[0, 0, 0.7]} url={props.url}/>
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.55, GOLDENRATIO, 0]} fontSize={0.025}>
          {/*todo*/}
      </Text>
      </group>
    )
}

export default PosterFrame


/*
animation example
import React from "react";
import { Canvas, useFrame } from "react-three-fiber";
import "./styles.css";

function MyRotatingBox() {
  const myMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
    myMesh.current.position.z -= 0.01;
  });

  return (
    <mesh ref={myMesh}>
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas>
        <MyRotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight />
      </Canvas>
    </div>
  );
}






*/