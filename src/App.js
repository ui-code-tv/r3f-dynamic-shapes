import './App.css';
import React, { useRef , useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";


function Shape(props) {

  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });


  const allShapes= {
    box: new THREE.BoxGeometry( 1, 1, 1 ),
    cylinder: new THREE.CylinderGeometry( 1, 1, 1, 32 ),
    donut : new THREE.TorusGeometry( 0.5, 0.2, 3, 20 )
  }

  const allColors ={
    box: "red",
    cylinder:"pink",
    donut: "blue"
  }

  return (
    <mesh {...props} ref={mesh} scale={[1.5, 1.5, 1.5]}>
      <primitive object={allShapes[props.shape]} attach={"geometry"} />
      <meshStandardMaterial color={allColors[props.shape]} />
    </mesh>
  );
}

export default function App() {
  const [shapesOnCanvas,setShapesOnCanvas] = useState([])

  const addShape = (e)=> {

    // Store the length of the shapeOnCanvas, to know how many there are, We also use this to calculate the position
    const shapeCount= shapesOnCanvas.length

    // Access the button data-Attribute to know what shape we are adding
    const shape= e.target.getAttribute("data-shape")
    console.log(shape)

    // Push a new Shape element onto the shapesOnCanvas state 
     setShapesOnCanvas(
       [
         ...shapesOnCanvas, 
         <Shape 
          shape={shape}
          key={shapeCount}
          position={[(-10 + (shapeCount*3)),0,0]}
          />
       ]
     )

  }

  return (
    <div>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.95} />

        {[...shapesOnCanvas]}
      </Canvas>
      <div className='buttons'>
        <button  onClick={addShape} data-shape={"box"}>Box </button>
        <button  onClick={addShape} data-shape={"cylinder"}>Cylinder </button>
        <button  onClick={addShape} data-shape={"donut"}>Donut </button>
      </div>
     </div> 
  );
}


