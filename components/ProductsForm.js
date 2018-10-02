import React, {Component} from 'react';
import {Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {addNewProduct} from '../actions/productActions';
import {size} from 'lodash';

class ProductsForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    let productsLength = size(this.props.products);

    const product = [{
      id          : ++productsLength,
      title       : findDOMNode(this.refs.title).value,
      description : findDOMNode(this.refs.description).value,
      price       : findDOMNode(this.refs.price).value,
    }];

    if( (product[0].title) !== '' && product[0].description !== '' && product[0].price !== '') {
      this.props.addNewProduct(product);
      this.resetForm();
    }
  }

  resetForm() {
    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';
  }

  render(){
    return(
      <Well>
          <h3>Add New Product</h3>
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter Title"
              ref="title" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              type="text"
              placeholder="Enter
              Description"
              ref="description" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Price (USD)</ControlLabel>
            <FormControl
              type="number"
              min={1}
              placeholder="Enter Price"
              ref="price" />
          </FormGroup>
          <Button
            onClick={this.handleSubmit.bind(this)}
            bsStyle="primary">Save Product
          </Button>
      </Well>
    )
  }
}

const mapStateToProps = ( state ) => {
	return {
		products : state.products.products
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		addNewProduct: ( newProduct ) => {
			dispatch( addNewProduct( newProduct ) );
		}
	};
};
export default connect( mapStateToProps, mapDispatchToProps )( ProductsForm );
