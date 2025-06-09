const ProdutoDtoCreateRequest = require('../dtos/ProdutoDtoCreateRequest');

const ProdutoDtoResponse = require('../dtos/ProdutoDtoResponse');

const UnitOfWork = require('../repositories/UnitOfWork');

const uow = new UnitOfWork();

const ProdutoController = {
    async create(req, res) {
        try {
            const produtoDto = new ProdutoDtoCreateRequest(req.body);
            const produto = await uow.produtos.create(produtoDto);
            res.status(201).json(new ProdutoDtoResponse(produto));
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async list(req, res) {
        try {
            const produtos = await uow.produtos.findAll({
                catalogo: true
            });

            res.status(200).json(produtos.map(
                produto => new ProdutoDtoResponse(produto))
            );
        } catch {
            res.status(400).json(error)
        }
    }
}

module.exports = ProdutoController;