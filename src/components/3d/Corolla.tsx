import React from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Corolla(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF("/ccl3-transformed.glb");
  const { actions } = useAnimations(animations, group);
  const [doorOpen, setDoorOpen] = React.useState(false);

  const AnimationHandler = (name) => {
    if (!actions) {
      console.error("Actions object is undefined or not initialized.");
      return;
    }
    console.log(name);
    const action = actions[name];
    console.log("Action:", action);
    if (!action) {
      console.error(`Animation "${name}" is not defined in actions.`);
      return;
    }

    // Common action configurations
    action.clampWhenFinished = true;
    action.loop = THREE.LoopOnce;

    if (!doorOpen) {
      // Play forward (open)
      action.reset();
      action.paused = false;
      action.timeScale = 1;
      action.play();
      setDoorOpen(true);
    } else {
      // Play in reverse (close)
      action.reset();
      action.time = action.getClip().duration;
      action.paused = false;
      action.timeScale = -1;
      action.play();
      setDoorOpen(false);
    }
  };
  return (
    <group ref={group} {...props} dispose={null} position={[0, 1, 1.5]}>
      <group name="Scene">
        <group name="e180_door_FL_59" rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            name="Object_84"
            geometry={nodes.Object_84.geometry}
            material={materials.PaletteMaterial001}
            position={[0.849, 0.916, -0.669]}
            onClick={() => AnimationHandler("Object_84Action")}
            ref={props.CCl3Ref}
          >
            <mesh
              name="Object_16"
              geometry={nodes.Object_16.geometry}
              material={materials.PaletteMaterial002}
              position={[-0.849, -0.916, 0.669]}
            />
            <mesh
              name="Object_79"
              geometry={nodes.Object_79.geometry}
              material={materials.PaletteMaterial001}
              position={[-0.849, -0.916, 0.669]}
            />
            <mesh
              name="Object_87"
              geometry={nodes.Object_87.geometry}
              material={materials.e180_interior}
              position={[-0.849, -0.916, 0.669]}
            />
          </mesh>
        </group>
        <group
          name="e180_door_FR_61"
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => AnimationHandler("Object_95Action")}
        >
          <mesh
            name="Object_95"
            geometry={nodes.Object_95.geometry}
            material={materials.PaletteMaterial001}
            position={[-0.866, 0.897, -0.669]}
          >
            <mesh
              name="Object_17"
              geometry={nodes.Object_17.geometry}
              material={materials.PaletteMaterial002}
              position={[0.866, -0.897, 0.669]}
            />
            <mesh
              name="Object_89"
              geometry={nodes.Object_89.geometry}
              material={materials.PaletteMaterial001}
              position={[0.866, -0.897, 0.669]}
            />
            <mesh
              name="Object_98"
              geometry={nodes.Object_98.geometry}
              material={materials.e180_interior}
              position={[0.866, -0.897, 0.669]}
            />
          </mesh>
        </group>
        <group
          name="e180_door_RL_62"
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => AnimationHandler("Object_100Action")}
        >
          <mesh
            name="Object_100"
            geometry={nodes.Object_100.geometry}
            material={materials.PaletteMaterial001}
            position={[0.857, -0.144, -0.664]}
          >
            <mesh
              name="Object_101"
              geometry={nodes.Object_101.geometry}
              material={materials.PaletteMaterial001}
              position={[-0.857, 0.144, 0.664]}
            />
            <mesh
              name="Object_103"
              geometry={nodes.Object_103.geometry}
              material={materials.e180_interior}
              position={[-0.857, 0.144, 0.664]}
            />
            <mesh
              name="Object_15"
              geometry={nodes.Object_15.geometry}
              material={materials.PaletteMaterial002}
              position={[-0.857, 0.144, 0.664]}
            />
          </mesh>
        </group>
        <group
          name="e180_door_RR_63"
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => AnimationHandler("Object_105Action")}
        >
          <mesh
            name="Object_105"
            geometry={nodes.Object_105.geometry}
            material={materials.PaletteMaterial001}
            position={[-0.85, -0.164, -0.664]}
          >
            <mesh
              name="Object_106"
              geometry={nodes.Object_106.geometry}
              material={materials.PaletteMaterial001}
              position={[0.85, 0.164, 0.664]}
            />
            <mesh
              name="Object_108"
              geometry={nodes.Object_108.geometry}
              material={materials.e180_interior}
              position={[0.85, 0.164, 0.664]}
            />
            <mesh
              name="Object_14"
              geometry={nodes.Object_14.geometry}
              material={materials.PaletteMaterial002}
              position={[0.85, 0.164, 0.664]}
            />
          </mesh>
        </group>
        <group
          name="e180_hood_64"
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => AnimationHandler("Object_111Action.001")}
        >
          <mesh
            name="Object_111"
            geometry={nodes.Object_111.geometry}
            material={materials.PaletteMaterial001}
            position={[-0.011, 1.145, -0.929]}
          >
            <mesh
              name="Object_110"
              geometry={nodes.Object_110.geometry}
              material={materials.PaletteMaterial001}
              position={[-0.002, 0.201, -0.02]}
            />
          </mesh>
        </group>
        <mesh
          name="Object_114"
          geometry={nodes.Object_114.geometry}
          material={materials.PaletteMaterial001}
          position={[0.109, 5.292, -8.909]}
          rotation={[Math.PI / 2, 0, 0]}
          onClick={() => AnimationHandler("Object_114Action")}
        >
          <mesh
            name="Object_112"
            geometry={nodes.Object_112.geometry}
            material={materials.PaletteMaterial001}
            position={[-0.109, 8.909, 5.292]}
          />
          <mesh
            name="Object_9"
            geometry={nodes.Object_9.geometry}
            material={materials.e180_glassred}
            position={[-0.109, 8.909, 5.292]}
          />
        </mesh>
        <mesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial002}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Object_132"
          geometry={nodes.Object_132.geometry}
          material={materials.PaletteMaterial001}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Object_161"
          geometry={nodes.Object_161.geometry}
          material={materials.PaletteMaterial003}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Object_167"
          geometry={nodes.Object_167.geometry}
          material={materials.e180_interior}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <mesh
          name="Object_130"
          geometry={nodes.Object_130.geometry}
          material={materials.e180_glassred}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/ccl3-transformed.glb");
