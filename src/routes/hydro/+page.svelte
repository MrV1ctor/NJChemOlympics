<!-- 
    https://codesandbox.io/s/snowy-sunset-uj4zxe?file=/src/index.js

    hippity, hoppity, your code is now my property

 -->
<script>
    import Header from '../../sections/header.svelte'

    
    import * as THREE from "three";
    import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
    import { Particle, ParticleSystem } from "./ParticleSystem";

import { onMount } from 'svelte';
onMount(() => {

    var camera, scene, renderer, renderTarget, depthMaterial, clock;

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

    camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    camera.position.set(0, 6, 8);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x32a852);

    // lights

    var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // border

    // var boxGeometry = new THREE.BoxBufferGeometry(10, 1, 1);
    // var boxMaterial = new THREE.MeshLambertMaterial({ color: 0xea4d10 });

    // var box1 = new THREE.Mesh(boxGeometry, boxMaterial);
    // box1.position.z = 4.5;
    // scene.add(box1);

    // var box2 = new THREE.Mesh(boxGeometry, boxMaterial);
    // box2.position.z = -4.5;
    // scene.add(box2);

    // var box3 = new THREE.Mesh(boxGeometry, boxMaterial);
    // box3.position.x = -5;
    // box3.rotation.y = Math.PI * 0.5;
    // scene.add(box3);

    // var box4 = new THREE.Mesh(boxGeometry, boxMaterial);
    // box4.position.x = 5;
    // box4.rotation.y = Math.PI * 0.5;
    // scene.add(box4);

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

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    document.body.appendChild(renderer.domElement);

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
        value: new THREE.Color(0x4e7a71)
        },
        bottomDarkColor: {
        value: new THREE.Color(0x0e7562)
        },
        topLightColor: {
        value: new THREE.Color(0xb0f7e9)
        },
        bottomLightColor: {
        value: new THREE.Color(0x14c6a5)
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
        value: new THREE.Color(0x14c6a5)
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

    //made camera look downwards at water
    camera.rotation.x = -0.75;
    // camera.position.y = -0.25;

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

    // var controls = new OrbitControls(camera, renderer.domElement);
    // controls.minDistance = 1;
    // controls.maxDistance = 50;

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


});


</script>


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
  
      <h1>Solar Power</h1>
    
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta minima, praesentium nobis necessitatibus ducimus eos inventore ab similique quod nesciunt magnam perferendis accusantium cumque odio eum excepturi explicabo quasi maxime. Assumenda corporis atque, quos tenetur a esse aliquid commodi totam repudiandae delectus eveniet et voluptates odit praesentium repellendus deserunt. Esse!</p><br><br><br><br><br>
    
    </div>
  
  
  

</main>

<style>
  
    :global(canvas) {
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
      background-color: rgb(187, 187, 187, 0.5);
      margin: 7.5vw auto 7.5vw auto;
      width: 70vw;
    }
    
</style>