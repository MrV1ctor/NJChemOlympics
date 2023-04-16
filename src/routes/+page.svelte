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
        const wall = new THREE.Mesh(
          new THREE.BoxGeometry(400, 200, 0.01),
          new THREE.MeshStandardMaterial({
            color: 0x5e3002,
            map: new THREE.TextureLoader().load('/img/lightning.png'),
            transparent: true,
          })
        );
        wall.position.z = -65;
        wall.position.y = -5;
        scene.add(wall);


        //create a yellow wall behind the first wall
        const wall2 = new THREE.Mesh(
          new THREE.BoxGeometry(400, 200, 0.01),
          new THREE.MeshStandardMaterial({
            color: 0xf2e30a,
            transparent: true,
          })
        );
        wall2.position.z = -70;
        wall2.position.y = 200;
        scene.add(wall2);



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


            let maxDist = 200;
            let minDist = 0;
            //keep
            wall2.position.y = (1-(1+t/(window.innerHeight-document.querySelector("main").scrollHeight))) * (maxDist-minDist) + maxDist;

            console.log(wall2.position.y)
//not working maybe
            
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto rem exercitationem accusamus nulla quasi in voluptatem molestiae atque voluptas veritatis, modi nobis repudiandae excepturi recusandae possimus non perferendis nam maxime mollitia sunt voluptate. Ex expedita quasi vel fugit voluptatum facilis aliquid nisi quidem illum, ut tempora autem eum cum eveniet provident consequuntur hic quae laboriosam quam eos dolorem? Modi ea quia tempora eos et necessitatibus accusantium alias, illum aperiam saepe, animi tempore sunt cupiditate officia praesentium unde veritatis possimus, doloribus fuga molestiae reprehenderit vitae omnis tenetur mollitia. Itaque nihil quisquam explicabo mollitia nobis earum autem adipisci ducimus cum. Eveniet assumenda veniam quo perspiciatis rem ab enim doloremque? Quasi ad atque impedit incidunt fugit. Neque, iure harum temporibus incidunt sapiente velit sequi ipsam molestias magni! Autem voluptate harum error ullam doloremque ducimus nulla ipsum quam minus officiis recusandae itaque nihil, illum consectetur voluptatem quibusdam alias sapiente? Nostrum expedita nam placeat voluptas repellendus porro. Consequuntur ad laudantium numquam. Obcaecati, rerum. Placeat dicta blanditiis inventore incidunt eligendi cum. Libero nostrum facilis accusamus incidunt atque beatae porro fuga necessitatibus?
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

    .main-container {
    background-color: rgb(187, 187, 187, 0.5);
    margin: 7.5vw auto 7.5vw auto;
    width: 70vw;
    }

    .secondary-container {
        display: flex;
        flex-direction: row;
    }

    .section, .intro {
        margin: 1rem;
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
        text-align: right;
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