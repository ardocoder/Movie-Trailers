class LogoBar extends HTMLElement {
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="content-middle clearfix">
            <img src="../media/logo.jpg" alt="LogoMovieTrailer">
            <h1>Your Official Movie Trailers!</h1>
        </div>
        `;
    }
}

customElements.define("logo-bar", LogoBar);