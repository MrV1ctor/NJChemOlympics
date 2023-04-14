<main>
    <div class="header">
        <nav class="nav-container">
            <a href="/geothermal">
                <button class="geo-button button">Geothermal</button>
            </a>
            <a href="/hydro">
                <button class="hydro-button button">Hydro</button>
            </a>
            <a href="/solar">
                <button class="solar-button button">Solar</button>
            </a>
            <a href="about_us">
                <button class="button">About Us</button>
            </a>
        </nav>
    </div>
</main>

<style>
    .header {
        width: auto;
        height: 5rem;
        display: flex;
        flex-direction: row;
        
        padding: 1rem 2rem 1rem 2rem;

        background-color: var(--main-3);
    }

    .nav-container {
        width: auto;
    }

    .header-gradient {
        min-width: 100vw;
        height: 1rem;

        background-color: #fff;
        background: linear-gradient(90deg, var(--main-1) 0%, var(--main-2) 35%, var(--main-4) 100%);
    }

    .button {
        min-width: 10rem;
        width: auto;
        height: 100%;

        font-size: 2rem;

        border: 0.2rem solid var(--main-2);
        border-radius: 1rem;

        background-color: var(--main-3);
    }

    .button:hover {
        cursor: pointer;
    }

    .geo-button {
        border: 0.2rem solid var(--geo-1);
        background-color: var(--geo-3);
    }
    
    .hydro-button {
        border: 0.2rem solid var(--hydro-1);
        background-color: var(--hydro-3);
    }
    
    .solar-button {
        border: 0.2rem solid var(--solar-1);
        background-color: var(--solar-3);
    }
</style>