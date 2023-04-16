<!-- https://www.eia.gov/energyexplained/geothermal/images/drysteam.gif -->
<script>
  import Header from '../../sections/header.svelte'

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
        // const directionalLight = new THREE.DirectionalLight(0xffffff, 55);
        // directionalLight.position.set(0, 1, 0);
        // scene.add(directionalLight);
    
        
        // const targetObject = new THREE.Object3D();
        // scene.add(targetObject);
    
        // directionalLight.target = targetObject;
    
        
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
        



        //make a wall
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(1000, 100, 0.01),
          new THREE.MeshStandardMaterial({
            color: 0x5e3002,
          })
        );
        wall.position.z = -65;
        wall.position.y = -77;
        scene.add(wall);

        //add a box at the top of the wall
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(50, 50, 10),
          new THREE.MeshStandardMaterial({
            color: 0xffffff,
          })
        );
        box.position.z = -50;
        box.lookAt(camera.position.x, camera.position.y, camera.position.z);
        scene.add(box);

        //make two blue and red pipes going down from the bottom of the box
        const pipe1 = new THREE.Mesh(
          new THREE.CylinderGeometry(5, 5, 100, 32),
          new THREE.MeshStandardMaterial({
            color: 0x0000ff,
          })
        );
        pipe1.position.z = -50;
        pipe1.position.y = -50;
        pipe1.position.x = 10;
        scene.add(pipe1);

        const pipe2 = new THREE.Mesh(
          new THREE.CylinderGeometry(5, 5, 100, 32),
          new THREE.MeshStandardMaterial({
            color: 0xff0000,
          })
        );
        pipe2.position.z = -50;
        pipe2.position.y = -50;
        pipe2.position.x = -50;
        scene.add(pipe2);
    
        //add a pipe coming out of the top of pipe 2, towards the box
        const pipe3 = new THREE.Mesh(
          new THREE.CylinderGeometry(5, 5, 50, 32),
          new THREE.MeshStandardMaterial({
            color: 0xff0000,
          })
        );
        pipe3.position.z = -50;
        pipe3.position.x = -27.63;
        pipe3.rotation.z = 1.5708;
        scene.add(pipe3);

        //make a black triangle infront of the box
        const triangle = new THREE.Mesh(
          new THREE.ConeGeometry(25, 25, 3),
          new THREE.MeshStandardMaterial({
            color: 0x000000,
          })
        );
        triangle.position.z = -50;
        triangle.rotation.z = 1.5708;
        scene.add(triangle);


          
        




    
        // const lightHelper = new THREE.PointLightHelper(flare_light);
        // scene.add(lightHelper);
        
        // ON SCROLL 
        function moveCamera() {
        
            // scroll amount
            const t = document.body.getBoundingClientRect().top;
            
            // console.log(t)
    
    
            triangle.rotation.z = 0.01 * t;

            
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
        
      <div class="main-container">

        <Header/>

        <h1>Geothermal Power</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>

      </div>    
    
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
    
    .main-container {
      background-color: rgb(187, 187, 187, 0.5);
      margin: 7.5vw auto 7.5vw auto;
      width: 70vw;
    }

    </style>