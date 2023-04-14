<script>
    import Header from '../sections/header.svelte'
    import Footer from '../sections/footer.svelte'
</script>

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
                <div class="geo-sect section">
                    <p>Geothermal Energy</p>
                </div>
                <div class="hydro-sect section">
                    <p>Hydroelectric Energy</p>
                </div>
                <div class="solar-sect section">
                    <p>Solar Energy</p>
                </div>
            </div>
        </div>
    </div>
    
    <Footer/>

</main>


<style>

    .main-container {
        background-color: #bbb;
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

    .geo-sect {
        background-image: url('/rockbanner.png');
    }
    
    .hydro-sect {
        background-image: url('/waterbanner.png');
        background-position: 0 -2rem;
    }
    
    .solar-sect {
        background-image: url('/sunbanner.png');
        background-position: 0 -4rem;
    }

    .section {
        background-size: cover;
    }

    .section p {
        font-size: 4rem;
        text-align: center;
    }
</style>