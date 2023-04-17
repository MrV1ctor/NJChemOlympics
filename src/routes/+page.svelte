<!-- https://www.eia.gov/energyexplained/geothermal/images/drysteam.gif -->
<script>
  import Header from '../sections/header.svelte'
  import Map from '../sections/map.svelte'

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
    
        // scene.background = new THREE.Color(0x000000);
        scene.background = new THREE.Color(0x000000);
    
        
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
        // const wall = new THREE.Mesh(
        //   new THREE.BoxGeometry(1000, 100, 0.01),
        //   new THREE.MeshStandardMaterial({
        //     color: 0x5e3002,
        //   })
        // );
        // wall.position.z = -65;
        // wall.position.y = -77;
        // scene.add(wall);
        //make a wall with the same position and dimensions as commented above but with an image texture
        const wall2 = new THREE.Mesh(
          new THREE.BoxGeometry(400, 200, 0.01),
          new THREE.MeshStandardMaterial({
            // color: 0x5e3002,
            map: new THREE.TextureLoader().load('/img/lightning.png'),
            transparent: true,
          })
        );
        wall2.position.z = -75;
        wall2.position.y = -5;
        scene.add(wall2);


        //create a yellow wall behind the first wall
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(400, 200, 0.01),
          new THREE.MeshStandardMaterial({
            color: 0x000000,
            transparent: true,
          })
        );
        wall.position.z = -70;
        wall.position.y = 200;
        scene.add(wall);



        //fixes lightning transparency bug by looking slightly upwards
        camera.rotation.x = 0.05;


    
        // const lightHelper = new THREE.PointLightHelper(flare_light);
        // scene.add(lightHelper);
        
        // ON SCROLL 
        function moveCamera() {
        
            // scroll amount
            const t = document.body.getBoundingClientRect().top;
            
            // console.log(t)
    
            // if (wall2.position.y >= 0)
            //   wall2.position.y = 0.1*-t;
            // else
            //   wall2.position.y = 0;


            let maxDist = 0;
            let minDist = -200;
            //keep
            wall.position.y = (1-(1+t/(window.innerHeight-document.querySelector("main").scrollHeight-100))) * (maxDist-minDist) + maxDist;

            
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
        
        
        
          // controls.update();


        
        
        
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

        <div class="secondary-container">
            <div class="intro">
                <p>
                    &emsp; &emsp; Welcome to our website, where we'll dive deep into the world of renewable energy in the United States! As you may know, the US is one of the largest energy consumers in the world, having a large energy consumption per person. In America, the average person uses about 85.87 Megawatt Hours of energy (MWh). Petroleums and natural gases are still by far the most consumed energy sources in America, however, renewable energy sources are becoming more and more widespread. In this website, we aim to educate you about some of the alternative energy sources that America has started to use, including hydroelectric, geothermal, and solar power, and their future in the U.S.! Below is a map that, when hovered, shows the details of the energy production and the number of power plants each state has for a given renewable energy source. You can also change which statistic the heatmap shows by clicking on their respective icons. Finally, to learn more about these interesting renewable energy sources, click on the buttons at the top of the page or on the images on the right.
                </p>
            </div>
            <div class="landing-container">
                <a href="/geothermal" class="geo-sect section">
                    <p>Geothermal Energy</p>
                </a>
                <a href="/hydro" class="hydro-sect section">
                    <p>Hydroelectric Energy</p>
                </a>
                <a href="/solar" class="solar-sect section">
                    <p>Solar Energy</p>
                </a>
            </div>
        </div>

        <div class="spacer"></div>

        <Map/>

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

    .secondary-container {
        display: flex;
        flex-direction: row;
    }

    .spacer {
        min-height: 6rem;
    }

    .section, .intro {
        margin: 1rem 3rem 1rem 3rem;
    }


    .landing-container { 
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 45rem;
    }
    
    .landing-container .section {
        width: auto;
        height: auto;
    }
    
    .intro {
        width: 40%;
    }

    .intro p {
        text-align: left;
    }

    .geo-sect {
        background-image: url('/img/geo/rockbanner.png');
    }
    
    .hydro-sect {
        background-image: url('/img/hydro/waterbanner.png');
    }
    
    .solar-sect {
        background-image: url('/img/solar/sunbanner.png');
    }

    .section {
        background-size: cover;
    }

    .section p {
        font-size: 5.5rem;
        text-align: center;
    }

    .section {
        color: #000;
    }

</style>