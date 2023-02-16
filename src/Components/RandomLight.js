import React, {useRef} from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Plane, Text, Environment, OrbitControls, SpotLight } from '@react-three/drei'

function RandomLight(props) {
    const lightFixture = useRef();

    useFrame(({ clock }) => {
        let color = new THREE.Color( 0xD21404 );
        let color2 = new THREE.Color(0x0000FF);
        let changeSpeed = 0.35
        let alpha = 0.5*Math.cos(clock.getElapsedTime()*changeSpeed*Math.PI)+.5
        console.log(alpha);
        color.lerp(color2,alpha)
        if(lightFixture != undefined){
            console.log(lightFixture.current);
            lightFixture.current.color = color
        }
  
    });
    return (
        <SpotLight
        penumbra={0.2}
        radiusTop={0.4}
        radiusBottom={40}
        distance={80}
        angle={0.45}
        attenuation={200}
        anglePower={5}
        intensity={400}
        opacity={1}
        target={props.target}
        position={[0,10,-6]}
        color="#b00c3f"
        ref={lightFixture}
      />
    )
}

export default RandomLight
