class FooterBar extends HTMLElement {
    
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
		<div class="content-footer clearfix">
			<div class="wrapper">
				<footer class="footer-left">
					<h3>Follow me</h3>
					<a href="#" class="fa fa-facebook"></a>
					<a href="#" class="fa fa-twitter"></a>
					<a href="#" class="fa fa-instagram"></a>
					<a href="#" class="fa fa-youtube"></a>
				</footer>
				<div class="footer-right">
					<audio autoplay="autoplay" controls="controls">
						<source src="../media/superheroes.mp3" type="audio/mp3">
					</audio>
					<p>&copy; 2020 ArdoCoder</p>
				</div>
			</div>
		</div>
        `;
    }
}

customElements.define("footer-bar", FooterBar);