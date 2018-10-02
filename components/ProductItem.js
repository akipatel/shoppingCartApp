import React from 'react';
import {Row, Col, Well, Button} from 'react-bootstrap';

import { connect } from 'react-redux';
import { addToCart, updateCart } from '../actions/cartActions';

class ProductItem extends React.Component {
  handleCart() {
    const product = [...this.props.cart,{
      id          : this.props.id,
      title       : this.props.title,
      description : this.props.description,
      price       : this.props.price,
      quantity    : 1
    }];

    // Check cart is empty or not
    if(this.props.cart.length > 0) {
      // Cart is not empty
      let recentlyAddedProductId = this.props.id;
      let recentlyAddedProductIndex = this.props.cart.findIndex(function(cart) {
        return cart.id === recentlyAddedProductId;
      })

      // console.log('recentlyAddedProductIndex' , recentlyAddedProductIndex);
      // If returns -1 means there are No products with same Id
      if( recentlyAddedProductIndex === -1) {
        this.props.addToCart(product);
      } else {
        // We need to update the quantity
        this.props.updateCart(this.props.id, 1, this.props.cart);
      }

    } else {
      // CART IS EMPTY
      this.props.addToCart(product);
    }
  }

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12}>
            <h4>{this.props.title}</h4>
            <p>{this.props.description}</p>
            <h5>USD {this.props.price}</h5>
            <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

const mapStateToProps = ( state ) => {
	return {
		cart : state.cart.cart
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		addToCart: ( product ) => {
			dispatch( addToCart( product ) );
		},
    updateCart:( productId, unit, cart) => {
      dispatch( updateCart( productId, unit, cart) );
    }
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( ProductItem );
