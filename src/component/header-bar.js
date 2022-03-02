class HeaderBar extends HTMLElement {
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
        <header class="content-header clearfix navbar fixed-top navbar-light bg-light">
			<div class="wrapper">
				<div class="header-left">
					<h1 class="text-animation">Welcome guest...</h1>
				</div>
				<div class="header-right"> 
					<a href="#" class="header-btn pull-right">Login</a>
				</div>
			</div>
		</header>
        `;
    }
}

customElements.define("header-bar", HeaderBar);