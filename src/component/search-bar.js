class SearchBar extends HTMLElement {
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="form-group form-inline justify-content-center">
            <input type="text" class="form-control" id="inputValue">
            <button type="submit" class="btn btn-primary" id="search">Search your Movie</button>
        </div>

        <div id="movies-searchable"></div>
        <div id="movies-container"></div>
        `;
    }
}

customElements.define("search-bar", SearchBar);