<script>
    import {onMount} from 'svelte';
    export let contentArr = [{img: "/img/solar/greenFlare.png", title: "energy", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Mattis pellentesque id nibh tortor id aliquet lectus proin. Leo vel orci porta non. Erat nam at lectus urna duis convallis convallis tellus id. Mauris a diam maecenas sed enim ut. Odio tempor orci dapibus ultrices in.", "link": './solar'}];
    let currentPage = 0;
    let backArrow = "/icon/arrow-back.svg";
    let forwardArrow = "/icon/arrow-forward.svg";

    onMount(() => {
        setStyle();
    });

    function setStyle() {
        let navButtons = document.querySelectorAll('.carousel-container>button');
        let container = document.querySelector('.carousel-container');

        for(let i = 0; i < navButtons.length; i++) {
            navButtons[i].style.backgroundColor = `var(--${contentArr[currentPage].colorPrefix}-3)`;
        }

        container.style.border = `0.4rem solid var(--${contentArr[currentPage].colorPrefix}-1)`;
        container.style.backgroundColor = `var(--${contentArr[currentPage].colorPrefix}-4)`;
        container.style.boxShadow = `-1rem 1rem var(--${contentArr[currentPage].colorPrefix}-3);`
    }

    function nextPage() {
        if(currentPage + 1 > contentArr.length - 1)
            return;
    
        currentPage++;
        setStyle();
        replaceImage();
    }

    function prevPage() {
        if(currentPage - 1 < 0)
            return;

        currentPage--;
        setStyle();
        replaceImage();
    }

</script>

<main>
    <div class="flex-row carousel-container">
        <button on:click={prevPage} class="flex-col flex-center"><img src="{backArrow}"></button>
        <div class="flex-row flex-center content-container">
            <img src="{contentArr[currentPage].img}" id="image">
            <div class="flex-col flex-center text-container">
                <p class="title">
                    {contentArr[currentPage].title}
                </p>
                <p>
                    {contentArr[currentPage].content}
                </p>
                <a href="{contentArr[currentPage].link}">
                    <button>Learn More</button>
                </a>
            </div>
        </div>
        <button on:click={nextPage} class="flex-col flex-center"><img src="{forwardArrow}"></button>
    </div>
</main>

<style>
    .carousel-container {
        width: auto;
        padding: 2rem;
        margin: 2rem 2rem;
        border-radius: 1rem;
        border: 0.4rem solid #666;
        box-shadow: -1rem 1rem #ccc;
    }

    .carousel-container .content-container {
        height: max-content;
    }

    .carousel-container button:hover {
        cursor: pointer;
    }

    .carousel-container>button {
        width: 12rem;
        border-radius: .5rem;
        border: none;
    }

    .carousel-container>button img {
        width: 3rem;
    }

    .carousel-container #image {
        object-fit: contain;
        max-width: 55%;
        max-height: 70rem;
        width: auto;
        height: 100%;
        border-radius: 1rem;

        padding: 0 2rem;
    }

    .carousel-container .text-container {
        width: 45%;
        font-size: 3rem;
        text-align: center;
    }

    .carousel-container .text-container .title {
        font-size: 4rem;
        font-weight: bold;
        margin: 2rem 0;
    }

    .carousel-container .text-container button {
        width: 20rem;
        font-size: 3rem;
        padding: 1rem;
        margin: 1rem 0;
        background-color: var(--main-3);

        border-radius: .5rem;
        border: 4px solid var(--main-2);
    }
</style>