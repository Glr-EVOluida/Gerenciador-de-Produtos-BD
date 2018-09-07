import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state={
    products:[],
    product:{
      nome: '',
      preco: '',
    },
    name:'',
    preco:'',
    id:0,
    editar:false
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts = _ =>{
    fetch('http://localhost:4000/produtos')
    .then(response => response.json())
    .then(response => this.setState({products:response.data}))
    .catch(err => console.error(err));
  }

  add = _ =>{
    const { product } = this.state;
    let preco_int = parseInt(product.preco);
    fetch(`http://localhost:4000/produtos/add?nome=${product.nome}&preco=${preco_int}`)
    .then(this.getProducts)
    .catch(err => console.error(err));
    this.setState({product:{nome:"",preco:""}})
  }

  deletar = (id) =>{
    fetch(`http://localhost:4000/produtos/delete?id=${id}`)
    .then(this.getProducts)
    .catch(err => console.error(err));
  }

  update = (id,nome,preco) =>{
    this.setState({name:nome,preco:preco,editar:true,id:id})
  }

  Atualizar = () =>{
    const {id,name,preco} = this.state;
    let preco_int = parseInt(preco);
    fetch(`http://localhost:4000/produtos/update?id=${id}&nome=${name}&preco=${preco_int}`)
    .then(this.getProducts)
    .catch(err => console.error(err));
    this.setState({name:"",preco:"",editar:false})
  }

  renderProduct = ({id,nome_produto,preco}) => 
    <tr>
      <td><label key={id}>{nome_produto}</label></td>
      <td><label>{preco}</label></td>
      <td><button className="far fa-edit btn btn-warning" onClick={() => this.update(id,nome_produto,preco)}> Editar</button></td>
      <td><button className="fas fa-trash btn btn-danger" onClick={() => this.deletar(id)}> Deletar</button></td>
    </tr>
  
  render() {
    const { products,product,name,preco,editar } = this.state;
    return (
      <div className="App">
        <div className="col-md-4"></div>

        <div className="col-md-4">

          <table className="table table-striped">
            <thead>
              <tr>
                <td colSpan="4"><h3>Produtos</h3></td>
              </tr>
              <tr className="head">
                <th><label>Produto</label></th>
                <th><label>Valor</label></th>
                <th><label>Editar</label></th>
                <th><label>Excluir</label></th>
              </tr>
            </thead>

            <tbody>
              {products.map(this.renderProduct)}
            </tbody>
          </table>

          <div className="col-md-6">
            <label>Nome do Produto:</label>
            <input className="form form-control" value={editar == true ? name : product.nome} onChange={editar == true ? e => this.setState({name: e.target.value}) :e => this.setState({product: {...product,nome: e.target.value} })}/>
          </div>

          <div className="col-md-6">
            <label>Valor do Produto:</label>  
            <input className="form form-control" value={editar == true ? preco : product.preco} onChange={editar == true ? e => this.setState({preco: e.target.value}) : e => this.setState({product: {...product,preco: e.target.value}})} /><br/>
          </div>

          <button className="btn-info form-control" onClick={editar == true? this.Atualizar: this.add}>{editar == true ? 'Editar' : 'Adicionar'}</button>
        </div>

        <div className="col-md-4"></div>
      </div>
    );
  }
}

export default App;
