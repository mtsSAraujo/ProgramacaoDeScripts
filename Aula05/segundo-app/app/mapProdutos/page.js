import ListaProdutos from "@/data/ListaProdutos";
import style from "@/app/mapProdutos/css/tabela.module.css"

export default function TabelaDeProdutos() {
    function renderLinhas() {
        return ListaProdutos.map((produto) => (
            <tr key={produto.id}>
                <td>{produto.id}</td>
                <td>{produto.nome}</td>
                <td>{formatarPreco(produto.preco)}</td>
            </tr>
        ));
    }

    function formatarPreco(preco) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(preco);
    }

    return (
        <div className={style.tabelaContainer}>
            <h1 className={style.tabelaTitle}>Tabela de Produtos</h1>
            <table className={style.tabela}>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {renderLinhas()}
                </tbody>
            </table>
        </div>
    )
}