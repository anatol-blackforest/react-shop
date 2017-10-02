import sass from './styles/app.sass'
import React from 'react'
import ReactDOM from 'react-dom'
// импортируем компоненты
import Nav from './components/Nav'
import ItemPage from './components/ItemPage'
import CartPage from './components/CartPage'

// модель
import {items} from './data/shopperData'


class App extends React.Component {
  constructor(props){
    super(props)
    // начальный стейт
    this.state = {
      selectedTabFlag: 0,
      cart: []
    }
  }
  // меняем стейт вкладки
  changeSelectedTab = (index, e) => {
    e.preventDefault()
    this.setState({
      selectedTabFlag: index
    })
  }
 // меняем стейт корзины
  handleAddToCart = (item) => {
    this.setState({
      // добавление нового ID товара в стейт корзины
      cart: [...this.state.cart, item.id]
    })
  }
  
  renderCart = () => {
    // число товаров в корзине
    let itemCounts = this.state.cart.reduce((itemCounts, itemId) => {
      itemCounts[itemId] = itemCounts[itemId] || 0;
      itemCounts[itemId] ++ ;
      return itemCounts;
    }, {}); // {id0: 2, id1: 1, id2: 1 ... }

    // создаем массив товаров 
    let keys = Object.keys(itemCounts); // ['id0', 'id1', ...]

    let cartItems = keys.map(itemId => {
      // находим товар по ID
      var item = items.find(item => item.id === parseInt(itemId, 10));
      // создать новый элемент, который также имеет счетчик
      return {
        ...item, // берем копию выбранного элемента
        count: itemCounts[itemId] // добавляем к нему свойство счетчика -> count: 2
      }
    })

    return cartItems; // из renderCart func

  }

  handleRemoveOne = (item) => {
    let { cart } = this.state;
    let idx = cart.indexOf(item.id);
    this.setState({
      cart: [
        ...cart.slice(0, idx),
        ...cart.slice(idx + 1)
      ]
    })
  }

  render() {
    return (
      <div className='App'>
        <Nav  numberOfItems={this.state.cart.length}
              onTabChange={this.changeSelectedTab}
              flag={this.state.selectedTabFlag}
              cartItems={this.renderCart()}

        />
        <main className='app-content'>
          {this.state.selectedTabFlag === 0 ?
            <ItemPage
              items={items}
              onAddToCart={this.handleAddToCart}/>
              :
            <CartPage
              cartItems={this.renderCart()}
              onAddOne={this.handleAddToCart}
              onRemoveOne={this.handleRemoveOne}
            />
          }

        </main>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
