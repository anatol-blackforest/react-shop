import React from 'react'
import PropTypes from 'prop-types'

import Item from './Item'
//список товаров
function ItemPage({items, onAddToCart}) {
  return(
    <ul className="itemPage-items">
      {
        items.map((item) =>
          <li key={item.id} className="item-page-item">
            <Item item={item} >
              <button className='item-addToCart'
                      onClick={onAddToCart.bind(null, item)} >
                Закинуть в корзину
              </button>
            </Item>
          </li>
        )
      }
    </ul>
  )
}

ItemPage.propTypes = {
  items: PropTypes.array.isRequired,
  onAddToCart: PropTypes.func.isRequired
}

export default ItemPage
