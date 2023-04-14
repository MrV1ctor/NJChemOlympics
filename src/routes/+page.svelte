<script>
    import Header from '../sections/header.svelte'
    import Footer from '../sections/footer.svelte'
</script>

<main>

    <Header/>
    
    <h1>this is the landing</h1>
    
    <div class="main-container">
        <div class="intro">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi at nulla veniam expedita, delectus, libero dolore amet, doloremque mollitia fugit inventore? Aspernatur doloribus saepe eius?</p>
        </div>
        
        <div class="landing-container">
            <div class="geo-sect section">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, reprehenderit!</p>
            </div>
            <div class="hydro-sect section">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, reprehenderit!</p>
            </div>
            <div class="solar-sect section">
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid, reprehenderit!</p>
            </div>
        </div>
    </div>
    
    <Footer/>

</main>


<style>

    .main-container {
        display: flex;
        flex-direction: row;
    }

    .landing-container { 
        display: flex;
        flex-direction: column;

        width: 70vw;
    }

    .landing-container .section {
        width: 100%;
        height: 100%;
    }

</style>