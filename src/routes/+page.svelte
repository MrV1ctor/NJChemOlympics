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
        
        var clock;
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
        
        // previous material
        // const wall2 = new THREE.Mesh(
        //   new THREE.BoxGeometry(400, 200, 0.01),
        //   new THREE.MeshStandardMaterial({
        //     // color: 0x5e3002,
        //     map: new THREE.TextureLoader().load('/img/lightning.png'),
        //     transparent: true,
        //   })
        // );
        var waterfallUniforms = {
            iTime: {
                value: 0
            },
            iResolution: {
                value: new THREE.Vector2(1920, 1080)
            }
        };
        var wall2 = new THREE.Mesh(
          new THREE.BoxGeometry(800, 200, 0.01),
          new THREE.ShaderMaterial({
            uniforms: THREE.UniformsUtils.merge([
                THREE.UniformsLib["fog"],
                waterfallUniforms
            ]),
            vertexShader: document.getElementById("vertexShader").textContent,
            fragmentShader: document.getElementById("fragmentShader").textContent,
            fog: true
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
            // wall.position.y = (1-(1+t/(window.innerHeight-document.querySelector("main").scrollHeight-100))) * (maxDist-minDist) + maxDist;
            wall.position.y = 500;

            
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

            var delta = clock.getDelta();
            wall2.material.uniforms.iTime.value = clock.getElapsedTime()/250000;

        
        
        
          renderer.render( scene, camera );
        
        }
        
        clock = new THREE.Clock();
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
        
        // });

    });
    
    </script>
<head>
<script id="vertexShader" type="x-shader/x-vertex" defer>

    #include <fog_pars_vertex>

    varying vec2 vUv;

    void main() {

        vUv = uv;

        #include <begin_vertex>
        #include <project_vertex>
        #include <fog_vertex>

    }
  </script>
<!-- credit to illus0r, https://www.shadertoy.com/view/wscyz7 i modified it to work with this shader format and to move things around-->
  <script id="fragmentShader" type="x-shader/x-fragment" defer>

    uniform float iTime;
    uniform vec2 iResolution;

    varying vec2 vUv;


    #define MAX_STEPS 99
    #define MAX_DIST 100.
    #define EPSILON 0.001
    #define PI 3.1415

    #define EMPTY 0.
    #define MIRROR 1.
    #define WHITE_MIRROR 5.
    #define PUREWHITE 6.
    #define n getNormal(p)

    #define tChank 4.28125

    mat2 Rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }
    float rnd(float x) {return 2.*fract(54321.987139 * sin(987.123452331 * x))-1.;}

    float timeCurve(float t) {
        t = t * 4. / tChank;
        float whole = floor(t);
        float decimal = fract(t);
        t =  (whole + 1. - pow(1. - decimal, 32.));
        return t;
    }


    float lightning(vec3 p, vec2 amp){
        float id = floor(p.x);
        vec2 shift=     vec2(rnd(id+   iTime*1.0),
                            rnd(id+   iTime*1.0+10.));
        vec2 shiftNext = vec2(rnd(id+1.+iTime*1.0),
                            rnd(id+1.+iTime*1.0+10.));
        vec2 shift_ = shift, shiftNext_ = shiftNext;
        shift=pow(shift,vec2(4.)); shiftNext=pow(shiftNext,vec2(4.));
        shift*=shift_/abs(shift_); shiftNext*=shiftNext_/abs(shiftNext_);
        shift*=amp; shiftNext*=amp;
        p.x -= id;
        p.yz += shift;
        float dx = 1.,
            dy = shiftNext.x-shift.x,
            dz = shiftNext.y-shift.y;
        p.xy *= Rot(atan(dy, dx));
        p.zx *= Rot(-atan(dz, length(vec2(dx, dy))));
        return length(p.yz);
    }

    vec2 getDist(vec3 p) {
        p.z-=10.;
        p.xy*=Rot(1000.*rnd(floor(iTime*4.16)));
        p.x-=2.;
        p.xz*=Rot(PI/2.2);
        p.x *= .2;
        vec2 amp=vec2(1.5);
        float obj = lightning(p, amp);
        return vec2(obj*.6, WHITE_MIRROR);
    }

    vec3 rayMarch(vec3 ro, vec3 rd) {
        float d = 0.;
        float info = EMPTY;
        float minAngleToObstacle = 1e10;
        for (int i = 0; i < MAX_STEPS; i++) {
            vec2 distToClosest = getDist(ro + rd * d);
            minAngleToObstacle = min(minAngleToObstacle, atan(distToClosest.x, d));
            d += abs(distToClosest.x);
            info = distToClosest.y;
            if(abs(distToClosest.x) < EPSILON || d > MAX_DIST) {
                break;
            }
        }
        return vec3(d, info, minAngleToObstacle);
    }

    vec3 getNormal(vec3 p) {
        vec2 e = vec2(EPSILON, 0.);
        vec3 n_ = getDist(p).x - vec3(getDist(p - e.xyy).x,
                                getDist(p - e.yxy).x,
                                getDist(p - e.yyx).x);
        return normalize(n_);
    }

    vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
        vec3 f = normalize(l-p),
            r = normalize(cross(vec3(0,1,0), f)),
            u = cross(f,r),
            c = f*z,
            i = c + uv.x*r + uv.y*u,
            d = normalize(i);
        return d;
    }

    void main()
    {
        float d, info, dTotal=0.;
        vec2 uv = (vUv*500.0-0.01*iResolution.xy)/iResolution.y;
        
        vec2 moveAmount = vec2(0.1, -0.2); // Change these values to move by different amounts
        uv += moveAmount;


        gl_FragColor = vec4(uv, 1, 1);

        vec3 ro, rd, color, p, rm;
        float camDist = -10.;
        ro = vec3(0,0,camDist);
        rd = getRayDir(vUv, ro, vec3(0), 1.);
        color = vec3(0);
        float colorAmount = 0.;

        for(int reflectionDepth = 0; reflectionDepth < 2; reflectionDepth++) {
            rm = rayMarch(ro, rd);
            dTotal += d = rm[0];
            info = rm[1];
            p = ro + rd * d;
            if (d < MAX_DIST) {
                // color = vec3(1);//textureCube(iChannel0, rd).rgb;
                if (info == MIRROR) {
                    rd = reflect(rd, n);
                    gl_FragColor = vec4(rd, 1);
                    ro = p + 0.01 * rd;
                    continue;
                    // do nothing, propogate color getting to the reflection
                }
                else if (info == WHITE_MIRROR) {
                    vec3 nn = n;
                    nn.xy*=Rot(1.);
                    // color = vec3(1) * (dot(nn, vec3(1,1,-1))*.3+.7);
                    color = nn*.5+.5;
                }
                else if (info == PUREWHITE) {
                    color += vec3(1) * (1. - colorAmount);
                    colorAmount = 1.;
                }
            }
            else {
            }
            break;
        }
        color = mix(color, rd*.2, smoothstep(20., 100., dTotal));

        vec3 moveAmounts = vec3(-5.0, -5.0, 0.0); // Change these values to move by different amounts
        ro += moveAmounts;
        // gl_FragColor = vec4(, 1);
        
        rm = rayMarch(ro, rd);

        // vec4 col = vec4(vec3(.003/(rm.z-0.001)), 1);//haki black lightning
        vec4 col = vec4(vec3(.003/rm.z), 1);
        vec4 moveAmount_ = vec4(-0.3, -0.3, -0.0, 0.0);//color change whatnot
        col += moveAmount_;
        gl_FragColor = col;
        
    }


    </script>
  </head>

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
    <div class="landing-map-container">
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

    .landing-map-container {
        width: 120rem;
        max-width: 90vw;
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

    .landing-map-container .map-text {
        font-size: 3rem;
        text-align: center;

        margin: 0 10rem 2rem 10rem;
    }

    .map-text {
        padding: 2rem;
        background-color: #ccc;
        border-radius: 1rem;
    }
</style>