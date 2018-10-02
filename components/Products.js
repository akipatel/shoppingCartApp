import React, {Component} from 'react';
import {Grid, Row, Col, Panel} from 'react-bootstrap';

import { connect } from 'react-redux';
import { getProductList } from '../actions/productActions';

import ProductItem from './ProductItem';
import ProductsForm from './ProductsForm';
import Cart from './Cart';

class Products extends React.Component {
  componentDidMount() {
    this.props.getProductList();
  }

	render() {
    if(typeof(this.props.products) === 'undefined'){
      return(<div>No Products are available!</div>);
    }

    const productsList = this.props.products.map( (product) => {
      return (
        <Col xs={12} sm={6} md={4} key={product.id}>
          <ProductItem
            id          = {product.id}
            title       = {product.title}
            description = {product.description}
            price       = {product.price}
          />
        </Col>
      )
    });

		return (
      <Grid>
        <Row>
          {this.props.cart.length > 0 &&
            <Panel bsStyle="success">
              <Panel.Heading>
                <Panel.Title componentClass="h3">Cart</Panel.Title>
              </Panel.Heading>
              <Cart />
            </Panel>}
        </Row>
        <Row>
            {productsList}
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <ProductsForm />
          </Col>
        </Row>
      </Grid>
		);
	}
}

const mapStateToProps = ( state ) => {
	return {
		products : state.products.products,
    cart     : state.cart.cart
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		getProductList: () => {
			dispatch( getProductList() );
		}
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Products );
