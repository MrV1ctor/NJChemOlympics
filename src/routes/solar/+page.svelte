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
    let sun_radius = 0.01;
    const sunGeometry = new THREE.SphereGeometry(sun_radius, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(0, 0, -500);
    scene.add(sun);
    
    const flare_light = new THREE.PointLight( 0xffffff, 0.5, 500 );

    const textureLoader = new THREE.TextureLoader();

    const textureFlare0 = textureLoader.load( "/img/solar/mainFlare.png" );
    const textureFlare1 = textureLoader.load( "/img/solar/orangeFlareM.png" );
    const textureFlare2 = textureLoader.load( "/img/solar/orangeFlareS.png" );
    const textureFlare3 = textureLoader.load( "/img/solar/blueFlareS.png" );
    const textureFlare4 = textureLoader.load( "/img/solar/blueFlareS.png" );
    const textureFlare5 = textureLoader.load( "/img/solar/greenFlare.png" );
    const textureFlare6 = textureLoader.load( "/img/solar/miscFlare.png" );

    const lensflare = new Lensflare();

    lensflare.addElement( new LensflareElement( textureFlare0, 900, 0 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare1, 256, 0.08 , new THREE.Color(0xffbc2b)) );

    lensflare.addElement( new LensflareElement( textureFlare3, 128, 0.12 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare4, 256, 0.18 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare3, 128, 0.3 , new THREE.Color(0xffbc2b)) );

    lensflare.addElement( new LensflareElement( textureFlare1, 128, 0.4 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare2, 128, 0.6 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare2, 60, 0.73 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare5, 256, 0.85 , new THREE.Color(0xffbc2b)) );
    lensflare.addElement( new LensflareElement( textureFlare6, 300, 1 , new THREE.Color(0xffbc2b)) );

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
  
    <h1 align="center" style="color:black;">Solar Power</h1>
    
    <div class="image-container">
      <img src="/img/solar/solarTitle.jpg" alt="A Solar Farm">
      <p class="source">Photo by <a href="https://stories.wf.com/600-acre-solar-farm-to-power-wells-fargo-buildings-in-north-carolina/">Wells Fargo Stories</a></p>
    </div>

    <p>
      <b>
        <u>
          What is Solar Power?
        </u>
      </b>

      <br>
      
      &emsp; &emsp; Solar power is any source of power that uses the sun to generate electricity. We are able to capture solar energy because the sun gives off photons due to a complicated process called nuclear fusion, occuring when “protons of hydrogen atoms violently collide in the sun’s core and fuse to create a helium atom.” This process gives off a lot of energy, including the photons we need to generate electricity.
      
      <br>
      <br>
 
      <b>
        <u>
          How is Solar Power captured?
        </u>
      </b>

      <br>

      &emsp; &emsp; There are a few ways solar energy can be harnessed. We can use Photovoltaic Cells in order to capture the energy from the photons, or we could concentrate and convert the energy in the photons into heat energy, and use the heat the drive a turbine.   
    
      <br>

      <u>Photovoltaic (PV) Cells</u>
      
      <br>
      <br>
          
      &emsp; &emsp; Photovoltaic (PV) cells are composed of semiconductor material, most commonly silicon. A semiconductor is a material which has the conductivity between a conductor (like copper) and an insulator (like glass). Silicon is most commonly used in electronics due to its abundance and long lifetime. The efficiency of a PV Cell can be determined by this equation:

      <br>

      output power / total power (on the cell)

      <br>
      <br>
            
      &emsp; &emsp; The amount of electricity that a PV Cell can collect is dependant on the light’s intensity and wavelength. In general, a PV Cell can produce around 1 - 2 watts of DC energy. While this isn’t a lot, PV Cells are usually grouping into modules, also known as solar panels, which are then grouped into solar arrays. Each module usually has 32 - 96 cells. 

      <br>
      <br>
            
      <b>How a PV Cell is Made</b>

      <br>
      <br>

      </p>

      
      <div class="image-container">
        <img src="/img/solar/photovoltaic-cell.png" alt="A Model of a PV Cell">
        <p class="source">Diagram by <a href="https://www.eia.gov/energyexplained/solar/photovoltaics-and-electricity.php">EIA</a></p>
      </div>


      <p>

      <br>
      <br>
            
      &emsp; &emsp; PV Cells are composed of 2 semiconductors, usually with coatings on the top and a solid contact on the bottom. The top semiconductor is n-type, and the one underneath is p-type. Both n-type and p-type semiconductors are doped with a material. Doping is a process in which an impurity is added to a material.

      <br>
      <br>

      &emsp; &emsp; Normally, silicon atoms in silicon crystals all have their octet rule met via covalent bonding, but doping silicon allows for either a surplus or lack of electrons in the covalent bonds.

      <br>
      <br>
            
      &emsp; &emsp; An n-type semiconductor is a semiconductor that is usually doped with phosphorus, arsenic, or antimony, and a p-type semiconductor is usually doped with boron or indium. phosphorus, arsenic, and antimony were chosen as the impurities to add for an n-type semiconductor because they all have 5 valence electrons. Boron and indium both have 3 valence electrons.

      <br>
      <br>

      </p>

      <div class="image-container">
        <img src="/img/solar/pnjunction.png" alt="Electrons And Holes Diagram">
        <p class="source">Photo by <a href="https://youtu.be/J4oO7PT_nzQ?t=860">The Engineering Mindset</a></p>
      </div>

      <p>

      <br>
      <br>
            
      &emsp; &emsp; n-type semiconductors have an extra valence electron on each atom of doped material, while p-type semiconductors have a lack of a valence electron, or “hole”  on each atom of material introduced. When these two materials are sandwiched together, the place where they meet is called the p-n junction, which forms an electric field. When an electric charge is present, electrons flow from the n-type to the p-type semiconductor.

      <br>
      <br>

      </p>

      <div class="image-container">
        <img src="/img/solar/conductionband.png" alt="Conduction Band Diagram">
        <p class="source">Diagram by <a href="https://energyeducation.ca/encyclopedia/Conduction_band">Energy Education</a></p>
      </div>

      <p>

      <br>
      <br>
            
      &emsp; &emsp; Electricity is able to flow through semiconductor materials due to the distance of the conduction band from the valence shell. The conduction band is the band of orbitals above the valence band that electrons can jump to when excited. The band gap specifies how much energy is required to excite electrons to the conduction band. The band gap is important for the function of a PV cell.

      <br>
      <br>

      <b>How a PV Cell Works</b>

      <br>
      <br>

      &emsp; &emsp; PV Cells utilize the photovoltaic effect, which is a process that generates voltage or electric current in a photovoltaic cell when it is exposed to sunlight. When a photon’s wavelength matches the band gap of the cell, it is absorbed, and the energy is transferred to an electron of the semiconductor, allowing the electron to jump to the conduction band. As mentioned above, this will start flowing electrons from the n-type to the p-type semiconductors, which are then collected at the bottom of the cell.

      <br>
      <br>
      
      <u>Concentrating Solar-Thermal Power (CSP) Systems</u>

      <br>
      <br>

      &emsp; &emsp; There are many different types of CSP Systems, including linear concentrator systems, dish systems, and power tower systems. Each of these systems work slightly differently from eachother, but all have the same core concept, which is taking advantage of the light given off from the sun, and turning it into heat. 

      <br>
      <br>

      Linear Concentrator Systems

      <br>

      &emsp; &emsp; Long, trough shaped mirrors are turned towards the sun, and focus light on a black tube, which hold a liquid. The liquid is circulated through the tube, and is passed through a heat exchanger, which turns water into steam, then uses that steam to drive a turbine. 

      <br>
      <br>

      Dish Systems

      <br>

      &emsp; &emsp; Dish systems work similarly to Linear Concentrator systems, but are a different shape. Dish systems use mirrors arranged in a dish shape, similar to satellite dishes, in order to concentrate light on a thermal receiver, which absorbs the heat and drives a turbine.

      <br>
      <br>

      Power Tower Systems

      <br>

      &emsp; &emsp; A large plot of flat mirrors which track the sun to focus light onto a receiver, found on the top of a tower, which sits in the middle of the plot. A fluid is heated and turned into the steam in the receiver, and once again is used to drive a turbine.

      <br>
      <br>
      
      <b>
        <u>
          What are the benefits of Solar Power?
        </u>
      </b>

      <br>

      &emsp; &emsp; As a renewable source of power, solar energy has an important role in reducing greenhouse gas emissions and mitigating climate change, which is critical to protecting humans, wildlife, and ecosystems. Solar energy can also improve air quality and reduce water use from energy production. The cost of installing solar panels has been lowered from $45,000 to $31,500. Associated with installing solar panels, the electric bill has decreased from $200 to $0.
      
      <br>
      <br>
 
      Sustainability:
      
      <br>
 
      &emsp; &emsp; While fossil fuels have an expiration date that may be fast approaching, the sun will likely be around for at least a few billion years. 
      
      <br>
      <br>
 
      Low Environmental Impact:
      
      <br>
 
      &emsp; &emsp; The greenhouse gas emissions produced from Solar Energy are inconsequential as the technology does not require any fuel combustion.
      
      <br>
      <br>
 
      Energy Independence:
      
      <br>
 
      &emsp; &emsp; Since the sun shines across the globe, every country is a potential energy producer, thus allowing for greater energy independence and security. Solar energy doesn’t only promise to bring security and independence at the national level, but solar panels can also be installed on individual homes, providing power that does not depend on being connected to a larger electrical grid.
            
      <br> 
      <br> 
      
      <b>
        <u>
          Limitations and shortcomings behind Solar Power:
        </u>
      </b>

      <br>

      Intermittacy:
            
      <br> 
    
      &emsp; &emsp; One of the biggest problems that solar energy technology poses are that energy is only generated while the sun is shining, which means that nighttime and overcast days can interrupt the supply. As the global capacity for solar power continues to rise, nations like Japan and other global leaders in solar energy technology are focusing on developing adequate energy storage to deal with this issue.
      
      <br> 
      <br> 
      
      Land-Use
            
      <br> 
      
      &emsp; &emsp; Solar energy may take up a significant amount of land and cause land degradation or habitat loss for wildlife. Large utility-scale PV systems may require up to 3.5 to 10 acres per megawatt, and CSP facilities require anywhere from 4 to 16.5 acres per megawatt.
            
      <br>
      <br>

      Scarcity of Materials

      <br> 

      &emsp; &emsp; Many rare materials are byproducts of other processes rather than the focus of targeted mining efforts. Recycling PV material and advances in nanotechnology that increase solar-cell efficiency could help boost supply and perhaps find material substitutes in greater abundance.
      
      <br> 
      <br> 
      
    </p>
    
    <button class="accordion">Citations</button>
    <div class="accordion-text">
      <p>
        Averett, N. (2016, July 25). Advantages of Solar Energy: Study Finds Solar Power Lowers Cost of Energy for All Ratepayers and Causes Greater Reduction in Greenhouse Gases | The Brink. Boston University. Retrieved April 15, 2023, from <a href="https://www.bu.edu/articles/2016/solar-energy-advantages/">https://www.bu.edu/articles/2016/solar-energy-advantages/</a>
        <br> 
        <br> 
        EIA. (2022, March 17). Solar explained Photovoltaics and electricity. EIA. Retrieved April 15, 2023, from <a href="https://www.eia.gov/energyexplained/solar/photovoltaics-and-electricity.php">https://www.eia.gov/energyexplained/solar/photovoltaics-and-electricity.php</a>
        <br> 
        <br> 
        Energy Education. (n.d.). Conduction band. Energy Education. Retrieved April 15, 2023, from <a href="https://energyeducation.ca/encyclopedia/Conduction_band">https://energyeducation.ca/encyclopedia/Conduction_band</a>
        <br> 
        <br> 
        Johnston, M. (2022, August 5). Solar Energy: Benefits and Drawbacks. Investopedia. Retrieved April 16, 2023, from <a href="https://www.investopedia.com/articles/investing/053015/pros-and-cons-solar-energy.asp">https://www.investopedia.com/articles/investing/053015/pros-and-cons-solar-energy.asp</a>
        <br> 
        <br> 
        Maka, A. O. M., & Alabid, J. M. (2022, June 11). Solar energy technology and its roles in sustainable development. Clean Energy, 6(3), 476-483. <a href="https://doi.org/10.1093/ce/zkac023">https://doi.org/10.1093/ce/zkac023</a>
        <br> 
        <br> 
        NREL: National Renewable Energy Laboratory. (n.d.). Concentrating Solar Power Basics. NREL. Retrieved April 16, 2023, from <a href="https://www.nrel.gov/research/re-csp.html">https://www.nrel.gov/research/re-csp.html</a>
        <br> 
        <br> 
        Office of Energy Efficiency & Renewable Energy. (n.d.). Concentrating Solar-Thermal Power Basics. Department of Energy. Retrieved April 16, 2023, from <a href="https://www.energy.gov/eere/solar/concentrating-solar-thermal-power-basics">https://www.energy.gov/eere/solar/concentrating-solar-thermal-power-basics</a>
        <br> 
        <br> 
        Office of Energy Efficiency & Renewable Energy. (n.d.). Solar Photovoltaic Cell Basics. Department of Energy. Retrieved April 15, 2023, from <a href="https://www.energy.gov/eere/solar/solar-photovoltaic-cell-basics">https://www.energy.gov/eere/solar/solar-photovoltaic-cell-basics</a>
        <br> 
        <br> 
        Photovoltaic cell. (n.d.). Energy Education. Retrieved April 15, 2023, from <a href="https://energyeducation.ca/encyclopedia/Photovoltaic_cell">https://energyeducation.ca/encyclopedia/Photovoltaic_cell</a>
        <br> 
        <br> 
        Toshiba. (n.d.). p-type Semiconductor. Toshiba Electronic Devices & Storage Corporation. Retrieved April 15, 2023, from <a href="https://toshiba.semicon-storage.com/us/semiconductor/knowledge/e-learning/discrete/chap1/chap1-4.html">https://toshiba.semicon-storage.com/us/semiconductor/knowledge/e-learning/discrete/chap1/chap1-4.html</a>
        <br> 
        <br> 
        Toshiba. (n.d.). Semiconductor. Toshiba Electronic Devices & Storage Corporation. Retrieved April 15, 2023, from <a href="https://toshiba.semicon-storage.com/us/semiconductor.html">https://toshiba.semicon-storage.com/us/semiconductor.html</a>
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

  img {
      width: 50%;
      /* center img using margin */
      margin-left: 17vw;
    }

  p {
    margin: 2vw;
  }

  
  .accordion {
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
  }

  :global(.active, .accordion:hover) {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .accordion-text {
    color: #fff;
    font-size: 1.5rem !important;
    padding: 0 18px;
    background-color: rgba(0, 0, 0, 0.3);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
  }

  .accordion-text a {
    color: rgb(255, 255, 0)
  }

</style>