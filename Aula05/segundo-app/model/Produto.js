class Produto {
    #id;
    #nome;
    #preco;

    constructor(id, nome, preco) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
    }

    get id() {
        return this.#id;
    }

    get nome() {
        return this.#nome;
    }

    get preco() {
        return this.#preco;
    }

    set id(id) {
        this.#id = id;
    }

    set nome(nome) {
        this.#nome = nome;
    }

    set preco(preco) {
        this.#preco = preco;
    }
}

export default Produto;