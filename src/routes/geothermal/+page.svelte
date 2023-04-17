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
    
  <div class="main-container">

    <Header/>

    <h1 align="center" style="color:black;">Geothermal Power</h1>

    <div class="image-container">
      <img src="/img/geo/geothermalTitle.jpeg" alt="A Geothermal Power Plant">
      <p class="source">Photo by <a href="https://www.dgi.com/blog/site-selection-geothermal-power-plants-comprehensive-visualization-geographical-data/">Dynamic Graphics, INC.</a></p>
    </div>

    <p>
      <b>
        <u>
          What is Geothermal Energy?
        </u>
      </b>

      <br>

      &emsp; &emsp; Geothermal energy is the thermal energy stored at accessible depths in the earth’s crust. Thermal energy in the earth is distributed between the constituent hot rock and the natural fluid in its fractures and pores at temperatures above ambient levels. The ultimate sources of geothermal heat are associated with the upward conduction and convention of energy within the earth’s core and mantle, which remain from the earth’s formation, and with the generation of energy owing to radiogenic decay of naturally occurring elemental isotopes, particularly those of potassium, uranium, and thorium. Geothermal energy is heat energy from the earth—Geo (earth) + thermal (heat).
    
    </p>

    <p>
      <b>
        <u>
          Where is Geothermal energy found?
        </u>
      </b>

      <br>

      &emsp; &emsp; Geothermal resources are reservoirs of hot water found on the Earth's surface or made by humans at varying temperatures and depths below the Earth’s surface. Wells can be drilled into underground reservoirs to tap steam and very hot water to be brought to the surface for various applications such as electricity generation.   
    
    </p>

    <p>
      <b>
        <u>
          How Geothermal Energy is produced?
        </u>
      </b>

      <br>

      &emsp; &emsp; Geothermal power plants draw fluids from underground reservoirs to the surface to produce steam. Then the steam drives turbines that generate electricity.

      <br>

      The three main types of geothermal power plant technologies are…
      
      <br>
      <br>
      
    </p>

    <div class="image-container">
      <img src="/img/geo/drySteamPowerPlant.gif" alt="A Model of a Dry Steam Power Plant">
      <p class="source">Diagram by <a href="https://www.saveonenergy.com/green-energy/geothermal-energy/">saveonenergy</a></p>
    </div>

    <p>
      <br>
      <br>
      
      <u>•Dry Steam Power Plant:</u>
      <br>
      &emsp; -Dry steam power plants use hydrothermal fluids already in the form of steam. The steam is then drawn directly into a turbine which drives a generator that produces electricity. After the steam condenses, it is reinjected back into the reservoir. 
      
      
      <br>
      <br>
    </p>

    <div class="image-container">
      <img src="/img/geo/flashSteamPowerPlant.gif" alt="A Model of a Flash Steam Power Plant">
      <p class="source">Diagram by <a href="https://www.saveonenergy.com/green-energy/geothermal-energy/">saveonenergy</a></p>
    </div>
    
    <p>
      
      <br>
      <br>
      
      <u>•Flash Steam Power Power plant:</u>
      <br>
      &emsp; -Most common type of geothermal power plant. Fluids at temperatures greater than 182 degrees/360 degrees are pumped from deep underground. Which then travels under high pressure to a low-pressure tank at the earth’s surface. The change in pressure causes some fluid to transform rapidly into vapor. This vapor then drives a turbine which drives a generator and generates electricity. 
      
      
      <br>
      <br>
    </p>

    <div class="image-container">
      <img src="/img/geo/binaryCyclePowerPlant.gif" alt="A Model of a Binary Cycle Power Plant">
      <p class="source">Diagram by <a href="https://www.saveonenergy.com/green-energy/geothermal-energy/">saveonenergy</a></p>
    </div>
    
    <p>
      
      <br>
      <br>
      
      <u>•Binary-Cycle Power Plant:</u>
      <br>
      &emsp; -Binary-Cycle geothermal power plants can use lower temperatures of the geothermal resource, making them an important technology for deploying geothermal electricity. Binary-Cycle geothermal power plants are different from other geothermal power plants because the geothermal reservoir fluids never come into contact with the power plant’s turbine units. Low-temperature geothermal fluids pass through a heat exchanger with a secondary fluid. This binary fluid has a much lower boiling point than water, and the modest heat from the geothermal fluid causes it to flash to vapor, which drives the turbines and generates electricity. 

      <br>
      <br>

    </p>

    <p>
      <b>
        <u>
          What are the benefits of geothermal energy?
        </u>
      </b>

      <br>

      &emsp; &emsp; It is renewable because the heat flowing from Earth's interior is continually replenished by the decay of naturally occurring radioactive elements and will still remain available for billions of years. Geothermal power plants produce electricity consistently and run 24/7 regardless of weather conditions. U.S. geothermal resources can be harnessed for power production without importing fuel. Geothermal power plants are compact since they use less land power per gigawatt-hour than comparable capacity coal, wind, and solar photovoltaic power stations. Modern closed-loop geothermal power plants emit no greenhouse gases and have life cycle emissions four times lower than solar PV and six to twenty times lower than natural gas. 
    
    </p>

    <p>
      <b>
        <u>
          Limitations and shortcomings behind geothermal energy:
        </u>
      </b>

      <br>

      &emsp; &emsp; The largest disadvantage of geothermal energy is that it is location specific since it needs to be built in places where energy is accessible which would mean that some areas are not suitable for a geothermal power plant. Although Geothermal energy does not release greenhouse gases, many of these gases sted under the Earth's surface and are released into the atmosphere during digging. Geothermal energy also runs the risk of triggering earthquakes. This is mainly caused by the alterations in the Earth’s structure due to digging. Since most geothermal plants are away from population centers, the implications of these earthquakes are relatively minor. Geothermal energy is an expensive resource, but where the upfront costs are high, the outlay can be recouped as part of a long-term investment. To maintain the sustainability of geothermal energy, geothermal energy fluid needs to be pumped back into the underground reservoirs faster than it’s depleted. 

    
    </p>

    <p>
      <b>
        <u>
          The chemistry behind the process:
        </u>
      </b>

      <br>

      <u>•Mineral Equilibria:</u>
      <br>
      &emsp; -Temperature-dependent reactions between the geothermal fluid and minerals control the composition of the geothermal fluid. Chemical equations for the formation of alteration minerals can be written to which the water composition is compared. For example, at equilibrium, ratios of sodium and potassium in a solution are controlled by a temperature-dependent exchange reaction:

      <br>
      <br>
      NaAlSi3O8 + K+ = KAl Si3O8 + Na+ (1) 
      <br>
      Albite 	 &emsp; &emsp; &emsp; &emsp; &emsp;		K-feldspar
      <br>
      <br>
    

      <u>•Some of the chemicals that are present in the geothermal fluid are:</u>
      <br>
      &emsp; -Chloride (Cl) <br>
      &emsp; -Silica (SiO2) <br>
      &emsp; -Magnesium (Mg) <br>
      &emsp; -Hydrogen sulfide (H2S) <br>
      &emsp; -Fluoride (F) <br>
      &emsp; -Dissolved oxygen <br>
      <br> <br>

    </p>

    <p>
      <b>
        <u>
          Conclusion:
        </u>
      </b>

      <br>
      
      &emsp; &emsp; Geothermal energy is a type of renewable energy that is stored in the earth’s crust. Geothermal power plants draw fluids from the ground to produce steam, which drives a turbine and generates electricity. Geothermal energy plants are compact since they use less land per gigawatt-hour. Geothermal energy is a rising source of renewable energy that is only produced in some parts of the U.S., yet it is sure to become an important energy source. 
      
      <br>
      <br>
      <br>
    
    </p>

    <button class="accordion">Citations</button>
    <div class="accordion-text">
      <p>
        Gunnlaugsson, E. (n.d.). Importance of Chemistry in Geothermal Exploration and Utilization. United Nations University: Geothermal Training Program. <a href="https://orkustofnun.is/gogn/unu-gtp-sc/UNU-GTP-SC-06-15.pdf">https://orkustofnun.is/gogn/unu-gtp-sc/UNU-GTP-SC-06-15.pdf</a>
        <br> 
        <br> 
        Mock, J. E., Tester, J. W., & Wright, P. M. (2003). GEOTHERMAL ENERGY FROM THE EARTH: Its Potential Impact as an Environmentally Sustainable Resource. <a href="https://doi.org/10.1146/annurev.energy.22.1.305">https://doi.org/10.1146/annurev.energy.22.1.305</a>
        <br> 
        <br> 
        Office of ENERGY EFFICIENCY & RENEWABLE ENERGY. (n.d.). Electricity Generation. Department of Energy. Retrieved April 16, 2023, from <a href="https://www.energy.gov/eere/geothermal/electricity-generation">https://www.energy.gov/eere/geothermal/electricity-generation</a>
        <br> 
        <br> 
        Office of ENERGY EFFICIENCY & RENEWABLE ENERGY. (n.d.). Geothermal Basics. Department of Energy. Retrieved April 16, 2023, from <a href="https://www.energy.gov/eere/geothermal/geothermal-basics">https://www.energy.gov/eere/geothermal/geothermal-basics</a>
        <br> 
        <br> 
        TWI. (n.d.). What are the Advantages and Disadvantages of Geothermal Energy? TWI Global. Retrieved April 16, 2023, from <a href="https://www.twi-global.com/technical-knowledge/faqs/geothermal-energy/pros-and-cons#WhataretheDisadvantagesofGeothermalEnergy">https://www.twi-global.com/technical-knowledge/faqs/geothermal-energy/pros-and-cons#WhataretheDisadvantagesofGeothermalEnergy</a>
        <br> 
        <br> 
      </p>
    </div>

  </div>    

</main>
    
    
<style>

  img {
    width: 50%;
    /* center img using margin */
    margin-left: 17vw;
  }

  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }


  main {
    width: 100vw;
    color: black;
    z-index: 99;
    position: absolute;
    width: 100%;
    

    opacity: 1;
  }

  .main-container {
    background-color: rgb(187, 187, 187, 0.75);
    margin: 7.5vw auto 7.5vw auto;
    width: 70vw;
  }

  p {
    font-size: 1.5vw;
    margin: 2vw;
  }
</style>