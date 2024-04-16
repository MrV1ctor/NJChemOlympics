<!-- https://www.eia.gov/energyexplained/geothermal/images/drysteam.gif -->
<script>
  import Header from '../sections/header.svelte'
  import Map from '../sections/map.svelte'
  import Coursell from '../sections/carousel.svelte'

    import * as THREE from 'three';
    
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
    import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
    import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare.js';
    
    import { onMount } from 'svelte';
    import Carousel from '../sections/carousel.svelte';
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
    
        var acc = document.getElementsByClassName("accordion");
  
        acc[0].addEventListener("click", function() {
            this.classList.toggle("active");
            var text = this.nextElementSibling;
            if (text.style.maxHeight) {
            text.style.maxHeight = null;
            } else {
            text.style.maxHeight = text.scrollHeight + "px";
            } 
        
        });

    });
    
    </script>
    
<canvas id="bg"></canvas>

<main>
    <div class="landing-title-container">
        <p class="title">
            <b>Renewable Energy</b>
        </p>
    
        <p class="landing-desc">
            &emsp; &emsp; Welcome to our website, where we'll dive deep into the world of renewable energy in the United States! As you may know, the US is one of the largest energy consumers in the world, having a large energy consumption per person. In America, the average person uses about 85.87 Megawatt Hours of energy (MWh). Petroleums and natural gases are still by far the most consumed energy sources in America, however, renewable energy sources are becoming more and more widespread. In this website, we aim to educate you about some of the alternative energy sources that America has started to use, including hydroelectric, geothermal, and solar power, and their future in the U.S.!
        </p>
    </div>
    <div class="landing-container">
        
        <Carousel contentArr={[
            {
                img: "/img/geo/geoTitle.jpeg", 
                colorPrefix: "geo",
                title: "Geothermal Energy",
                content: "Hydroelectric energy is one of the widely used renewable sources of energy. It harnesses the power of water by converting kinetic energy to electric energy. This energy can then be stored and used on demand, emitting relatively low greenhouse gases compared to fossil fuels. Sadly, constructing these massive hydroelectric dams can have large environmental and social impacts.",
                link: "./geothermal"
            },
            {
                img: "/img/hydro/hydroTitle.jpg", 
                colorPrefix: "hydro",
                title: "Hydroelectric Energy",
                content: "Geothermal energy is a unique and complex renewable energy source extracted from the Earth’s crust. It uses an interesting process to turn heat from underground to energy. Geothermal energy is a reliable resource, providing a constant source of heat and electricity. However, the depth at which the heat sources are located poses a significant challenge in harnessing it. ",
                link: "./hydro"
            },
            {
                img: "/img/solar/solarTitle.jpg", 
                colorPrefix: "solar",
                title: "Solar Energy",
                content: "Solar energy is a renewable energy source that utilizes the sun's power. It’s created by harnessing the photons from the sun by using large solar farms. The energy captured by the solar farms is then turned into electrical energy through the photovoltaic effect. Since the total amount of energy the earth receives from the sun is vastly more than our energy demands, solar energy has the potential to satisfy all future energy needs.",
                link: "./solar"
            },
        ]}/>
    </div>
    <div class="landing-container">
        <p class="map-text">Below is a map that, when hovered, shows the details of the energy production and the number of power plants each state has for a given renewable energy source. You can also change which statistic the heatmap shows by clicking on their respective icons.</p>
        <Map/>
    
        <button class="accordion"><p class="accordion-title">Citations</p> <p class="accordion-tip">Click to reveal!</p></button>
        <div class="accordion-text">
            <p>
                EIA. (n.d.). Frequently Asked Questions (FAQs) - U.S. Energy Information Administration. Frequently Asked Questions (FAQs) - U.S. Energy Information Administration (EIA). Retrieved April 15, 2023, from <a href="https://www.eia.gov/tools/faqs/faq.php?id=85&t=1">https://www.eia.gov/tools/faqs/faq.php?id=85&t=1</a>
                <br> 
                <br> 
                U.S. Energy Information Administration. (2022, October 27). Annual Energy Outlook 2022. Presentation to Electricity Advisory Committee. <a href="https://www.energy.gov/sites/default/files/2022-11/05%20October%2027%20-%20EIA%20Annual%20Energy%20Outlook%202022.pdf">https://www.energy.gov/sites/default/files/2022-11/05%20October%2027%20-%20EIA%20Annual%20Energy%20Outlook%202022.pdf</a>
                <br> 
                <br> 
            </p>
        </div>
    </div>
</main>

<style>
    canvas {
        position: fixed;
        top: 0;
        left: 0;
    }
    
    main {
        width: 100%;
        z-index: 99;
        position: absolute;
    }

    .landing-container {
        position: relative;
        width: auto;
        color: black;
        background-color: #fff;
        margin: 5rem 6rem 0 6rem;
        padding: 2rem;
        border-radius: 1rem;
    }

    .landing-title-container {
        width: 120rem;
        max-width: 90vw;
        height: 80vh;
        background-color: #fff;
        padding: 5vh 2rem;
        margin: 5vh auto;
        border-radius: 1rem;
    }

    .title {
        margin: 0;
        text-align: center;
        font-size: 14rem;
    }

    .landing-desc {
        font-size: 3rem;
        margin: 4rem 10rem;
        text-align: center;
    }

    .landing-container .map-text {
        font-size: 3rem;
        text-align: center;

        margin: 4rem 10rem 4rem 10rem;
    }

    .map-text {
        padding: 2rem;
        background-color: #ccc;
        border-radius: 1rem;
    }
</style>