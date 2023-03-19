<script>

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';

import { onMount } from 'svelte';
onMount(() => {

    // IMPORTS
    // import './style.css';
    
    
    // SETUP
    const scene = new THREE.Scene();
    
    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera( 75, width/height, 0.1, 10000 );
    
    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
    });
    
    renderer.setPixelRatio( window.devicePixelRatio );

    renderer.setSize( width, height );

    scene.background = new THREE.Color(0x0094d4);

    
    // renderer.setSize( window.innerWidth, window.innerHeight );
    
    camera.position.setZ(30);
    
    // SCENE OBJECTS
    // const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
    // const material = new THREE.MeshStandardMaterial( { color: 0xFF6347 } );
    // const torus = new THREE.Mesh( geometry, material );
    
    // scene.add(torus); 
    
    // const pointLight = new THREE.PointLight(0xffffff, 1050, 50);
    // pointLight.position.set(0, 0, -50);
    
    const ambientLight = new THREE.AmbientLight(0xffffff);
    // scene.add(pointLight, ambientLight);
    scene.add(ambientLight);

    //add a directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 55);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    
    const targetObject = new THREE.Object3D();
    scene.add(targetObject);

    directionalLight.target = targetObject;

    
    // const lightHelper = new THREE.PointLightHelper(pointLight);
    // const gridHelper = new THREE.GridHelper(200, 50);
    // scene.add(lightHelper, gridHelper);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    
    // function addStar() {
    //   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    //   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    //   const star = new THREE.Mesh(geometry, material);
    
    //   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    
    //   star.position.set(x, y, z);
    //   scene.add(star);
    // }
    
    // Array(200).fill().forEach(addStar);
    
    camera.position.y += 5;
    camera.position.z += 5;
    
    //create a grid of cubes to the left of the camera, and a grid of cubes to the right of the camera
    for (let i = 0; i < 25; i++) {
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
      const cube = new THREE.Mesh(geometry, material);
    
      //make the cubes line up in a grid with the same y value but different x and z values of where in the grid they are
      const [x, y, z] = [10+(10*i)%(5*10), -10, -10*Math.floor(i/5)];
    
      cube.position.set(x, y, z);
      scene.add(cube);
    }
    
    for (let i = 0; i < 25; i++) {
      const geometry = new THREE.BoxGeometry(5, 5, 5);
      const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
      const cube = new THREE.Mesh(geometry, material);
    
      //make the cubes line up in a grid with the same y value but different x and z values of where in the grid they are
      const [x, y, z] = [-50+(10*i)%(5*10), -10, -10*Math.floor(i/5)];
    
      cube.position.set(x, y, z);
      scene.add(cube);
    }

    //add a large platform underneath all the cubes
    const geometry = new THREE.BoxGeometry(1000, 1, 1000);
    const material = new THREE.MeshBasicMaterial({ color: 0xffbc2b });
    const platform = new THREE.Mesh(geometry, material);
    platform.position.set(0, -100, 0);
    scene.add(platform);

    //add a wall at the end of the platform
    const geometry2 = new THREE.BoxGeometry(2000, 210, 1);
    const material2 = new THREE.MeshBasicMaterial({ color: 0xffbc2b });
    const wall = new THREE.Mesh(geometry2, material2);
    wall.position.set(0, -75, -450);
    scene.add(wall);


    
    //sun
    let sun_radius = 25;
    const sunGeometry = new THREE.SphereGeometry(sun_radius, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -500);
    scene.add(sun);
    
    const flare_light = new THREE.PointLight( 0xffffff, 0.5, 500 );

    const textureLoader = new THREE.TextureLoader();

    const textureFlare0 = textureLoader.load( "/img/solar/lensflare0.png" );
    const textureFlare1 = textureLoader.load( "/img/solar/lensflare1.png" );
    const textureFlare2 = textureLoader.load( "/img/solar/lensflare2.png" );
    const textureFlare3 = textureLoader.load( "/img/solar/lensflare3.png" );

    const lensflare = new Lensflare();

    lensflare.addElement( new LensflareElement( textureFlare0, 512, 0 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare1, 450, 0.2 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare3, 256, 0.4 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare2, 128, 0.6 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.8 , new THREE.Color(0xffbc2b)) );

    flare_light.add( lensflare );

    scene.add( flare_light );

    // const lightHelper = new THREE.PointLightHelper(flare_light);
    // scene.add(lightHelper);
    
    // ON SCROLL 
    function moveCamera() {
    
        // scroll amount
        const t = document.body.getBoundingClientRect().top;
        
// console.log(t)

        //light movement
        let dist = 5;//how far the scrolling for the light goes
        let x = -(3*dist)+(2*dist)*(1+t/(window.innerHeight-document.querySelector("main").scrollHeight));
        targetObject.position.set(-x, -10, 0);

        let sun_x_dist = 150;
        let sun_y_dist = 100;
        let sun_min_height = 100;
        sun.position.set(x*sun_x_dist, sun_min_height+(-Math.abs(x)/dist)*sun_y_dist, sun.position.z);

        flare_light.position.set(x*sun_x_dist, sun_min_height+(-Math.abs(x)/dist)*sun_y_dist, sun.position.z+(sun_radius+10));

        // console.log(x/dist)

        // light.position.set(sun.position);

        // console.log("X: "+x);
        // console.log("T: "+t);
        // console.log("h: "+(window.innerHeight-document.querySelector("main").scrollHeight));

        // console.log(window.innerHeight);
        // console.log(document.querySelector("main").scrollHeight);

        // camera.position.z = t * -0.01;
        // camera.position.x = t * -0.0002;
        // camera.position.y = t * -0.0002;
        
    }
    
    document.body.onscroll = moveCamera;
    moveCamera();
    
    // ON FRAME
    function animate() {
    
      requestAnimationFrame( animate );
    
    
    
      controls.update();
    
    
    
      renderer.render( scene, camera );
    
    }
    
    animate();
    
    window.addEventListener( 'resize', onWindowResize, false );
    
    
    
    function onWindowResize() {
    
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    
      renderer.setSize( window.innerWidth, window.innerHeight );
    
    }


});

</script>

<canvas id="bg"></canvas>

<main>
    
    <a href="/" style="color:red;">Home</a>

    <h1>SOLAR POWER</h1>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

</main>


<style>

canvas {
  position: fixed;
  top: 0;
  left: 0;
}


main {
  width: 100vw;
  color: white;
  z-index: 99;
  position: absolute;
  width: 100%;
  

  opacity: 1;
}

</style>