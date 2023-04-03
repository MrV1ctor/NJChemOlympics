<script>
    import Header from '../sections/header.svelte'
    import Footer from '../sections/footer.svelte'
</script>

<Header/>

<h1>this is the landing</h1>

<div class="landing-container">

</div>

<Footer/>

<style>
    .landing-container {
        grid-template:
                "a a c c" 40px
                "a a c c" 40px
                "b b d d" 40px
                "b b d d" 40px;
    }
</style>