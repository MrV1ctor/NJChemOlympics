<!-- 
    https://codesandbox.io/s/snowy-sunset-uj4zxe?file=/src/index.js

    hippity, hoppity, your code is now my property

    nah but for real this is a pretty good water shader for threejs, all credit to the guy who made it in the above link

 -->
<script>
    import Header from '../../sections/header.svelte'

    
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { Particle, ParticleSystem } from "./ParticleSystem";

import { onMount } from 'svelte';
onMount(() => {

    var camera, 
    scene, 
    renderer, 
    renderTarget, 
    depthMaterial, 
    clock;

    var water1,
    water2,
    waterfall1,
    waterfall2,
    waterfall3,
    waterfall4,
    particleSystem1,
    particleSystem2,
    particleSystem3,
    particleSystem4,
    emissionTime = 0,
    nextEmissionTime = 0;

    init();
    animate();

    function init() {
        clock = new THREE.Clock();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x32a852);

        var dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
        dirLight.position.set(0, 5, 5);
        scene.add(dirLight);
        
        camera.position.set(0, 5, 5);
        camera.rotation.x = -0.75;


        //add a large wall
        var wallGeometry = new THREE.BoxBufferGeometry(21, 10, 1);
        var wallMaterial = new THREE.MeshLambertMaterial({ color: 0x524f4f });
        var wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.z = -5;
        wall.position.y = -3;
        scene.add(wall);

        //add 4 tall sections coming out of the wall
        var tallGeometry = new THREE.BoxBufferGeometry(1, 10, 1);
        var tallMaterial = new THREE.MeshLambertMaterial({ color: 0x6b6868 });
        var tall1 = new THREE.Mesh(tallGeometry, tallMaterial);
        tall1.position.z = -4;
        tall1.position.y = -3;
        tall1.position.x = -10;
        scene.add(tall1);

        var tall2 = new THREE.Mesh(tallGeometry, tallMaterial);
        tall2.position.z = -4;
        tall2.position.y = -3;
        tall2.position.x = -5;
        scene.add(tall2);

        var tall3 = new THREE.Mesh(tallGeometry, tallMaterial);
        tall3.position.z = -4;
        tall3.position.y = -3;
        tall3.position.x = 0;
        scene.add(tall3);

        var tall4 = new THREE.Mesh(tallGeometry, tallMaterial);
        tall4.position.z = -4;
        tall4.position.y = -3;
        tall4.position.x = 5;
        scene.add(tall4);

        var tall5 = new THREE.Mesh(tallGeometry, tallMaterial);
        tall5.position.z = -4;
        tall5.position.y = -3;
        tall5.position.x = 10;
        scene.add(tall5);


        renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#bg')
        });
        
        renderer.setPixelRatio(window.devicePixelRatio);
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        

        var supportsDepthTextureExtension = !!renderer.extensions.get(
            "WEBGL_depth_texture"
        );

        //

        var pixelRatio = renderer.getPixelRatio();

        renderTarget = new THREE.WebGLRenderTarget(
            window.innerWidth * pixelRatio,
            window.innerHeight * pixelRatio
        );
        renderTarget.texture.minFilter = THREE.NearestFilter;
        renderTarget.texture.magFilter = THREE.NearestFilter;
        renderTarget.texture.generateMipmaps = false;
        renderTarget.stencilBuffer = false;

        if (supportsDepthTextureExtension === true) {
            renderTarget.depthTexture = new THREE.DepthTexture();
            renderTarget.depthTexture.type = THREE.UnsignedShortType;
            renderTarget.depthTexture.minFilter = THREE.NearestFilter;
            renderTarget.depthTexture.maxFilter = THREE.NearestFilter;
        }

        depthMaterial = new THREE.MeshDepthMaterial();
        depthMaterial.depthPacking = THREE.RGBADepthPacking;
        depthMaterial.blending = THREE.NoBlending;

        // textures

        var loader = new THREE.TextureLoader();

        var noiseMap = loader.load("/img/hydro/noiseTexture.jpeg");
        var dudvMap = loader.load("/img/hydro/noiseNormal.png");

        noiseMap.wrapS = noiseMap.wrapT = THREE.RepeatWrapping;
        noiseMap.minFilter = THREE.NearestFilter;
        noiseMap.magFilter = THREE.NearestFilter;
        dudvMap.wrapS = dudvMap.wrapT = THREE.RepeatWrapping;

        // waterfall

        var waterfallUniforms = {
            time: {
            value: 0
            },
            tNoise: {
            value: null
            },
            tDudv: {
            value: null
            },
            topDarkColor: {
            value: new THREE.Color(0x4e7ac6)
            },
            bottomDarkColor: {
            value: new THREE.Color(0x0e75b7)
            },
            topLightColor: {
            value: new THREE.Color(0xb0f7fe)
            },
            bottomLightColor: {
            value: new THREE.Color(0x14c6fa)
            },
            foamColor: {
            value: new THREE.Color(0xffffff)
            }
        };

        var waterfallMaterial = new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib["fog"],
            waterfallUniforms
            ]),
            vertexShader: document.getElementById("vertexShaderWaterfall").textContent,
            fragmentShader: document.getElementById("fragmentShaderWaterfall")
            .textContent,
            fog: true
        });

        waterfall1 = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(2.5, 2.5, 10, 16, 1, true),
            waterfallMaterial
        );
        waterfall1.position.x = -7.75;
        waterfall1.position.y = -3.1;
        waterfall1.position.z = -6.3;
        scene.add(waterfall1);

        waterfall2 = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(2.5, 2.5, 10, 16, 1, true),
            waterfallMaterial
        );
        waterfall2.position.x = -2.5;
        waterfall2.position.y = -3.1;
        waterfall2.position.z = -6.3;
        scene.add(waterfall2);

        waterfall3 = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(2.5, 2.5, 10, 16, 1, true),
            waterfallMaterial
        );
        waterfall3.position.x = 2.75;
        waterfall3.position.y = -3.1;
        waterfall3.position.z = -6.3;
        scene.add(waterfall3);

        waterfall4 = new THREE.Mesh(
            new THREE.CylinderBufferGeometry(2.5, 2.5, 10, 16, 1, true),
            waterfallMaterial
        );
        waterfall4.position.x = 8;
        waterfall4.position.y = -3.1;
        waterfall4.position.z = -6.3;
        scene.add(waterfall4);

        waterfallMaterial.uniforms.tNoise.value = noiseMap;
        waterfallMaterial.uniforms.tDudv.value = dudvMap;

        // water

        var waterUniforms = {
            time: {
            value: 0
            },
            threshold: {
            value: 0.1
            },
            tDudv: {
            value: null
            },
            tDepth: {
            value: null
            },
            cameraNear: {
            value: 0
            },
            cameraFar: {
            value: 0
            },
            resolution: {
            value: new THREE.Vector2()
            },
            foamColor: {
            value: new THREE.Color(0xffffff)
            },
            waterColor: {
            value: new THREE.Color(0x14c6fa)//0x14c6fa
            }
        };

        var waterGeometry = new THREE.PlaneBufferGeometry(21, 25);
        var waterMaterial = new THREE.ShaderMaterial({
            defines: {
            DEPTH_PACKING: supportsDepthTextureExtension === true ? 0 : 1,
            ORTHOGRAPHIC_CAMERA: 0
            },
            uniforms: THREE.UniformsUtils.merge([
            THREE.UniformsLib["fog"],
            waterUniforms
            ]),
            vertexShader: document.getElementById("vertexShaderWater").textContent,
            fragmentShader: document.getElementById("fragmentShaderWater").textContent,
            fog: true
        });

        waterMaterial.uniforms.cameraNear.value = camera.near;
        waterMaterial.uniforms.cameraFar.value = camera.far;
        waterMaterial.uniforms.resolution.value.set(
            window.innerWidth * pixelRatio,
            window.innerHeight * pixelRatio
        );
        waterMaterial.uniforms.tDudv.value = dudvMap;
        waterMaterial.uniforms.tDepth.value =
            supportsDepthTextureExtension === true
            ? renderTarget.depthTexture
            : renderTarget.texture;

        water1 = new THREE.Mesh(waterGeometry, waterMaterial);
        water1.rotation.x = -Math.PI * 0.5;
        water1.position.z = -16;
        water1.position.y = 2.01;
        scene.add(water1);

        water2 = new THREE.Mesh(waterGeometry, waterMaterial);
        water2.rotation.x = -Math.PI * 0.5;
        water2.position.z = 8;
        water2.position.y = -8;
        scene.add(water2);


        //

        particleSystem1 = new ParticleSystem();
        particleSystem2 = new ParticleSystem();
        particleSystem3 = new ParticleSystem();
        particleSystem4 = new ParticleSystem();

        var particleGeometry = new THREE.SphereBufferGeometry(1.25, 16, 8);
        particleGeometry = particleGeometry.toNonIndexed();
        var particleMaterial = new THREE.MeshBasicMaterial({
            color: 0xfcfcfc,
            alphaMap: noiseMap
        });

        particleMaterial.onBeforeCompile = function (shader) {
            shader.vertexShader =
            "attribute float t;\nvarying float vT;\n" + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
            "#include <begin_vertex>",
            [
                "vec3 transformed = vec3( position );",
                "transformed.y += t * 0.25;",
                "vT = t;"
            ].join("\n")
            );
            shader.fragmentShader = "varying float vT;\n" + shader.fragmentShader;
            shader.fragmentShader = shader.fragmentShader.replace(
            "#include <alphamap_fragment>",
            [
                "float dissolve = abs( sin( 1.0 - vT ) ) - texture2D( alphaMap, vUv ).g;",
                "if ( dissolve < 0.01 ) discard;"
            ].join("\n")
            );
        };

        particleSystem1.init(particleGeometry, particleMaterial, 250);
        particleSystem1._instancedMesh.position.x = -7;
        particleSystem1._instancedMesh.position.y = -7;
        particleSystem1._instancedMesh.position.z = -2;
        scene.add(particleSystem1._instancedMesh);

        particleSystem2.init(particleGeometry, particleMaterial, 250);
        particleSystem2._instancedMesh.position.x = -1.75;
        particleSystem2._instancedMesh.position.y = -7;
        particleSystem2._instancedMesh.position.z = -2;
        scene.add(particleSystem2._instancedMesh);

        particleSystem3.init(particleGeometry, particleMaterial, 250);
        particleSystem3._instancedMesh.position.x = 3.5;
        particleSystem3._instancedMesh.position.y = -7;
        particleSystem3._instancedMesh.position.z = -2;
        scene.add(particleSystem3._instancedMesh);
        
        particleSystem4.init(particleGeometry, particleMaterial, 250);
        particleSystem4._instancedMesh.position.x = 8.75;
        particleSystem4._instancedMesh.position.y = -7;
        particleSystem4._instancedMesh.position.z = -2;
        scene.add(particleSystem4._instancedMesh);

        //

        window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        var pixelRatio = renderer.getPixelRatio();

        renderTarget.setSize(
            window.innerWidth * pixelRatio,
            window.innerHeight * pixelRatio
        );
        water1.material.uniforms.resolution.value.set(
            window.innerWidth * pixelRatio,
            window.innerHeight * pixelRatio
        );
    }

    function updateParticles(delta) {
    emissionTime += delta;

    if (emissionTime > nextEmissionTime) {
        const particlePerSecond = 25;
        const t = 1 / particlePerSecond;

        nextEmissionTime = emissionTime + t / 2 + (t / 2) * Math.random();

        // emit new particle

        const particle1 = new Particle();
        particle1.position.x = Math.sin(2 * Math.PI * Math.random());
        particle1.position.y = 0;
        particle1.position.z = Math.cos(2 * Math.PI * Math.random());
        particle1.lifetime = Math.random() * 0.2 + 0.5;
        particle1.size = Math.random() * 0.25 + 0.5;
        
        const particle2 = new Particle();
        particle2.position.x = Math.sin(2 * Math.PI * Math.random());
        particle2.position.y = 0;
        particle2.position.z = Math.cos(2 * Math.PI * Math.random());
        particle2.lifetime = Math.random() * 0.2 + 0.5;
        particle2.size = Math.random() * 0.25 + 0.5;
        
        const particle3 = new Particle();
        particle3.position.x = Math.sin(2 * Math.PI * Math.random());
        particle3.position.y = 0;
        particle3.position.z = Math.cos(2 * Math.PI * Math.random());
        particle3.lifetime = Math.random() * 0.2 + 0.5;
        particle3.size = Math.random() * 0.25 + 0.5;

        const particle4 = new Particle();
        particle4.position.x = Math.sin(2 * Math.PI * Math.random());
        particle4.position.y = 0;
        particle4.position.z = Math.cos(2 * Math.PI * Math.random());
        particle4.lifetime = Math.random() * 0.2 + 0.5;
        particle4.size = Math.random() * 0.25 + 0.5;

        particleSystem1.add(particle1);
        particleSystem2.add(particle2);
        particleSystem3.add(particle3);
        particleSystem4.add(particle4);
    }

    // update the system itself

        particleSystem1.update(delta);
        particleSystem2.update(delta);
        particleSystem3.update(delta);
        particleSystem4.update(delta);
    }

    function animate() {
        requestAnimationFrame(animate);

        // depth pass

        water1.visible = false; // we don't want the depth of the water
        scene.overrideMaterial = depthMaterial;

        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);

        scene.overrideMaterial = null;
        water1.visible = true;

        // beauty pass

        var delta = clock.getDelta();
        var time = clock.getElapsedTime();

        waterfall1.material.uniforms.time.value = time;
        water1.material.uniforms.time.value = time;

        updateParticles(delta);

        renderer.render(scene, camera);
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

    <script id="vertexShaderWater" type="x-shader/x-vertex" defer>

      #include <fog_pars_vertex>

      varying vec2 vUv;

      void main() {

      	vUv = uv;

      	#include <begin_vertex>
      	#include <project_vertex>
      	#include <fog_vertex>

      }
    </script>

    <script id="fragmentShaderWater" type="x-shader/x-fragment" defer>

      #include <common>
      #include <packing>
      #include <fog_pars_fragment>

      varying vec2 vUv;
      uniform sampler2D tDepth;
      uniform sampler2D tDudv;
      uniform vec3 waterColor;
      uniform vec3 foamColor;
      uniform float cameraNear;
      uniform float cameraFar;
      uniform float time;
      uniform float threshold;
      uniform vec2 resolution;

      float getDepth( const in vec2 screenPosition ) {
      	#if DEPTH_PACKING == 1
      		return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
      	#else
      		return texture2D( tDepth, screenPosition ).x;
      	#endif
      }

      float getViewZ( const in float depth ) {
      	#if ORTHOGRAPHIC_CAMERA == 1
      		return orthographicDepthToViewZ( depth, cameraNear, cameraFar );
      	#else
      		return perspectiveDepthToViewZ( depth, cameraNear, cameraFar );
      	#endif
      }

      const float strength = 1.0;

      void main() {

      	vec2 screenUV = gl_FragCoord.xy / resolution;

      	float fragmentLinearEyeDepth = getViewZ( gl_FragCoord.z );
      	float linearEyeDepth = getViewZ( getDepth( screenUV ) );

      	float diff = saturate( fragmentLinearEyeDepth - linearEyeDepth );

      	vec2 displacement = texture2D( tDudv, ( vUv * 2.0 ) - time * 0.05 ).rg;
      	displacement = ( ( displacement * 2.0 ) - 1.0 ) * strength;
      	diff += displacement.x;

      	gl_FragColor.rgb = mix( foamColor, waterColor, step( threshold, diff ) );
      	gl_FragColor.a = 1.0;

      	#include <tonemapping_fragment>
      	#include <encodings_fragment>
      	#include <fog_fragment>

      }
    </script>

    <script id="vertexShaderWaterfall" type="x-shader/x-vertex" defer>

      #include <fog_pars_vertex>

      varying vec2 vUv;

      void main() {

      	vUv = uv;

      	#include <begin_vertex>
      	#include <project_vertex>
      	#include <fog_vertex>

      }
    </script>

    <script id="fragmentShaderWaterfall" type="x-shader/x-fragment" defer>

      #include <common>
      #include <packing>
      #include <fog_pars_fragment>

      varying vec2 vUv;
      uniform sampler2D tNoise;
      uniform sampler2D tDudv;
      uniform vec3 topDarkColor;
      uniform vec3 bottomDarkColor;
      uniform vec3 topLightColor;
      uniform vec3 bottomLightColor;
      uniform vec3 foamColor;
      uniform float time;

      float round1( float a ) {

        return floor( a + 0.5 );

      }

      const float strength = 0.02;
      const float foamThreshold = 0.15;

      void main() {

        vec2 displacement = texture2D( tDudv, vUv + time * 0.1 ).rg;
      	displacement = ( ( displacement * 2.0 ) - 1.0 ) * strength;

        float noise = texture2D( tNoise, vec2( vUv.x, ( vUv.y / 5.0 ) + time * 0.2 ) + displacement ).r;
        noise = round1( noise * 5.0 ) / 5.0; // banding, values in the range [0, 0.2, 0.4, 0.6, 0.8, 1]

        vec3 color = mix( mix( bottomDarkColor, topDarkColor, vUv.y ), mix( bottomLightColor, topLightColor, vUv.y ), noise );
        color = mix( color, foamColor, step( vUv.y + displacement.y, foamThreshold ) ); // add foam

      	gl_FragColor.rgb = color;
      	gl_FragColor.a = 1.0;

      	#include <tonemapping_fragment>
      	#include <encodings_fragment>
      	#include <fog_fragment>

      }
    </script>


    
    <div class="main-container">
  
      <Header/>
  
      <h1 align="center" style="color:black;">Hydroelectric Power</h1>

      <div class="image-container">
        <img src="/img/hydro/hydroTitle.jpg" alt="A Hydro Power Plant">
        <p class="source">Photo by <a href="https://commons.wikimedia.org/wiki/File:SQK_Dam_DSC_3657.jpg">Martina Nolte</a></p>
      </div>
    
      <p>
        <b>
          <u>
            What is Hydroelectric Energy?
          </u>
        </b>
  
        <br>
  
        &emsp; &emsp; Hydropower is one of the oldest sources of energy for producing mechanical and electrical energy, and up until 2019, it was the largest source of total annual U.S. renewable electricity generation. Hydroelectric power is produced by moving water. Thus, hydroelectric power plants are usually located on or near a water source. The volume of water flow and the change in elevation of the fall, also referred to as the head, from one point to another determines the amount of available energy in moving water. The greater the water flow, the more electricity a hydropower plant can produce. At a hydropower plant, water flows through a penstock pipe that pushes against and turns blades in a turbine to spin a generator to produce electricity.

      </p>

      <div class="image-container">
        <img src="/img/hydro/hydroelectricpowersystem.gif" alt="A diagram of a hydroelectric power system">
        <p class="source">Diagram by <a href="https://www.pinterest.com/pin/332281278737640156/">Topper Learning</a></p>
      </div>

      <p>
        <b>
          <u>
            Conventional hydroelectric facilities include
          </u>
        </b>
  
        <br>
  
        &emsp; &emsp; Run of the river system, where the force of the river's current applies pressure on a turbine. Storage systems is where water accumulates in the reservoir created by dams on streams and rivers and is released through hydro turbines as needed to generate electricity. Most U.S. hydropower facilities have dams and storage reservoirs. 

      </p>

      <p>
        <b>
          <u>
            Benefits of using hydropower:
          </u>
        </b>
  
        <br>
  
        &emsp; &emsp; Hydropower dams can't be built anywhere because these plants need a consistent water supply and a large amount of land. Many countries have this, but some countries don’t have these resources. Poorly planned hydropower can have many problems for the climate. Hydropower generators are important contributors to grid reliability. Even in a changing power system, hydropower significantly contributes to system reliability through inertial and primary frequency responses, reactive power support, and black-start capabilities. 40% of units maintained and tested for providing black start in the US are hydropower turbines, even though hydropower currently only makes up approximately 10% of overall US generating capacity. Hydropower resources have been observed to contribute up to 25% of the total Regulation Reserve (up and down) requirements and up to 60% of the total Spinning Reserve requirements, even though hydropower constitutes approximately 15% of installed capacity.
        <br>
  
        <br>
        
        <u>•Environmental benefits:</u>
        <br>
        &emsp; -Since hydropower is fuelled by water, it can lead to a decrease in carbon emissions. 

        <br>
        <br>
        
        <u>•Economical benefits:</u>
        <br>
        &emsp; -The most important advantage of hydropower, in contrast to other energy sources, is that it can be dispatched quickly at any time, enabling utilities to balance load variations on the electric distribution system.  

        <br>
        <br>
        
      </p>

      <p>
        <b>
          <u>
            Limitations and Shortcomings:
          </u>
        </b>
  
        <br>
  
        <br>
        
        <u>•Sustainability of hydropower:</u>
        <br>
        &emsp; -The biggest and most important challenge that is faced with the sustainability of the hydro plants which are used in the production of hydropower is to cope with the reservoir sedimentation and the loss of storage mainly contributed by uncontrolled deforestation, poor agricultural land management, residential development and infrastructure developments within the vicinity of this area. Sedimentation can result in the loss of live storage, which as a result, will affect the revenue from power generation output. This can also result in the loss of energy production. This can lead to an increase in the risk of flooding downstream through controlled spilling. This can lead to an increased maintenance cost by frequent dredging, excavation, and disposal of sediments. Reservoirs considerably filled with sediments threaten environmental disasters if a dam fails. 

        <br>
        <br>
        
        <u>•Impact from Climate Change:</u>
        <br>
        &emsp; -Hydropower development in developing countries like the US seems to overlook climate change scenarios. Some dams in developed countries, like Hoover Dam, are already putting new turbines at a lower elevation to prepare for projected water shortages in the Colorado River due to climate change. Lake Mead, the water storage for the Hoover Dam, has seen a 40% decline in its water level; thus, its peak power output has decreased from 2 to 1.5 GW. Improvements have also been made in several dams through the relicensing process that mandates improvements in river flows, facilitating fish migrations and enhancing dissolved oxygen levels in the water. 
        <br>
        &emsp; -According to a recent US Energy Information Administration Outlook, the vast majority of the world’s newly installed renewable energy over the next 25 years will come from hydroelectric dams, mostly in the developing world. Even though this is the case, climate change impacts have begun but are not addressed by dam builders.  

        <br>
        <br>

        <u>•Negative effects on the environment:</u>
        <br>
        &emsp; -Dam builders frequently fail to consider the effects of land use change on the hydropower potential of a dam. Regional deforestation can sufficiently inhibit rainfall and soil moisture in tropical moist forest regions to constrain energy generation.
        <br>
        &emsp; -Hydro plants need large reservoirs to provide a steady stream of water, so when these reservoirs are built, plants and other organic matter get flooded. This material decays over time, releasing greenhouse gases like carbon dioxide and methane, thus affecting life near these reservoirs. 

        <br>
        <br>

        <u>•Shortcomings:</u>
        <br>
        &emsp; -The seasonal variations in water availability from year to year and the prevailing water management practices due to environmental and other conditions can indicate huge variations in the amount of energy produced and other essential reliability services by hydropower resources.

        <br>
        <br>
        
      </p>

      <p>
        <b>
          <u>
            Conclusion:
          </u>
        </b>
  
        <br>
        
        &emsp; &emsp; Hydropower is one of the oldest sources of energy production because hydroelectric power is produced by moving water. Hydropower has many benefits such as the fact that it can decrease carbon emissions since it’s driven by water. The production of hydroelectric power also poses many limitations, such as the need for a constant supply of water, meaning that hydropower dams are limited to reservoirs and large rivers. Hydropower dams also require a large amount of land, making it even harder to find suitable locations for them. Hydro plants can also be hard to sustain because of reservoir sedimentation and storage loss due to deforestation. Hydropower has many benefits and few limitations, making it one of the largest sources of annual U.S. electrical energy.

        <br>
        <br>
        <br>
      
      </p>

      <button class="accordion">Citations</button>
      <div class="accordion-text">
        <p>
          EIA. (2022, March 16). Hydropower explained - U.S. Energy Information Administration. EIA. Retrieved April 16, 2023, from <a href="https://www.eia.gov/energyexplained/hydropower/">https://www.eia.gov/energyexplained/hydropower/</a>
          <br> 
          <br> 
          Luis, J., Sidek, L. M., Desa, M. N. M., & Julien, P. Y. (2013). Sustainability of hydropower as source of renewable and clean energy. IOP Conference Series: Earth and Environmental Science, 16. doi:10.1088/1755-1315/16/1/012050
          <br> 
          <br> 
          MIT. (2021, March 2). Why aren't we looking at more hydropower? MIT Climate Portal. Retrieved April 16, 2023, from <a href="https://climate.mit.edu/ask-mit/why-arent-we-looking-more-hydropower">https://climate.mit.edu/ask-mit/why-arent-we-looking-more-hydropower</a>
          <br> 
          <br> 
          Moran, E. F., Lopez, M. C., Moore, N., Müller, N., & Hyndman, D. W. (2018). Sustainable hydropower in the 21st century. Proceedings of the National Academy of Sciences, 115(47), 11891-11898. <a href="https://doi.org/10.1073/pnas.1809426115">https://doi.org/10.1073/pnas.1809426115</a>
          <br> 
          <br> 
          Moran, E. F., Lopez, M. C., Moore, N., Müller, N., & Hyndman, D. W. (2018). Sustainable hydropower in the 21st century. Proceedings of the National Academy of Sciences, 115(47), 11891-11898. <a href="https://doi.org/10.1073/pnas.1809426115">https://doi.org/10.1073/pnas.1809426115</a>
          <br> 
          <br> 
          Somani, A., Voisin, N., Tipireddy, R., Turner, S., Veselka, T., Ploussard, Q., Koritarov, V., Mosier, T., Mohanpurkar, M., Ingram, M., Signore, S., Hadjerioua, B., Smith, B., O'Connor, P., & Shan, R. (2021, January). Hydropower Value Study: Current Status and Future Opportunities. Hydro Wire: U.S. Department of Energy. <a href="https://www.energy.gov/sites/prod/files/2021/01/f82/hydropower-value-study-v2.pdf">https://www.energy.gov/sites/prod/files/2021/01/f82/hydropower-value-study-v2.pdf</a>
          <br> 
          <br> 
          U.S. Department of the Interior Bureau of Reclamation Power Resource Office. (2005, July). Hydroelectric Power. Reclamation: Managing Water in the West. <a href="https://www.usbr.gov/power/edu/pamphlet.pdf">https://www.usbr.gov/power/edu/pamphlet.pdf</a>
          <br> 
          <br> 
          Walsh, D., Coleman, J., Rosenthall, P., & Kiryushin, S. (2020, December 21). The benefits of hydropower. Environment Journal. <a href="https://environmentjournal.online/features/the-benefits-of-hydropower/">https://environmentjournal.online/features/the-benefits-of-hydropower/</a>
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