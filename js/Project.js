class Project {
    #name;
    #link;
    constructor(obj){
        this.#name = obj.name;
        this.#link = obj.link;
    }
    get name(){return this.#name;}
    get link(){return this.#link;}
    set name(value){this.#name = value;return this;}
    set link(value){this.#link = value;return this;}
    getTemplate(){
        return `
            <div class="grille-item">
                <div class="card">
                    <div class="card-content">
                        <h1 class="title has-text-centered">${this.#name}</h1>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            <span>
                                <a href="./projects/${this.#link}">Demo</a>
                            </span>
                        </p>
                    </footer>
                </div>
            </div>
        `;
    }
}