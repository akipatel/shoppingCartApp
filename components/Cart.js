import React from 'react';
import {connect} from 'react-redux';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from 'react-bootstrap';
import {deleteCartItem, updateCart, getCart} from '../actions/cartActions';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal:false
    }
  }

  // componentDidMount() {
  //   this.props.getCart();
  // }

  onDelete( productId ) {
    // // Create a copy of the current array of products
    const currentCartArr = this.props.cart;

    // Determine at which index in products array is the product to be deleted
    const indexToDelete = currentCartArr.findIndex(
      function(cart) {
        return cart.id === productId;
      }
    )

    let carItemDelete = [...currentCartArr.splice(indexToDelete, 1)];
    // console.log('Remaining', currentCartArr);

    this.props.deleteCartItem(currentCartArr);
  }

  onIncrement(id){
    this.props.updateCart(id, 1, this.props.cart);
  }

  onDecrement(id, quantity){
    if(quantity > 1){
      this.props.updateCart(id, -1, this.props.cart);
    }
  }

  open() {
    this.setState({showModal:true})
  }

  close() {
    this.setState({showModal:false})
  }

  render() {
    if(this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }

  renderEmpty() {
    return(<div></div>)
  }

  renderCart(){
    const cartItemsList = this.props.cart.map(function(cartArr){
      return(
        <Panel key={cartArr.id} bsStyle="info">
          <Row>
            <Col xs={12} sm={4}>
              <h5>{cartArr.title}</h5><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h5>USD. {cartArr.price}</h5>
            </Col>
            <Col xs={12} sm={2}>
              <h5>Qty. <Label bsStyle="success">{cartArr.quantity}</Label></h5>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth:'300px'}}>
                <Button onClick={this.onDecrement.bind(this, cartArr.id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr.id)} bsStyle="default" bsSize="small">+</Button>
                <span>     </span>
                <Button onClick={this.onDelete.bind(this, cartArr.id)} bsStyle="danger" bsSize="small">DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    }, this)
    return(
      <Panel header="Cart" bsStyle="primary" >
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h4>Total Qty : {this.props.totalQty}</h4>
            <h4>Total Amount USD: {this.props.totalAmount}</h4>
            <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h5>Total Amount USD : {this.props.totalAmount}</h5>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }
}

const mapStateToProps = ( state ) => {
	return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQty:state.cart.totalQty
	};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		deleteCartItem: ( productId ) => {
			dispatch( deleteCartItem( productId ) );
		},
    updateCart:( productId, unit, cart ) => {
      dispatch( updateCart( productId, unit, cart ) );
    }
    //,
    // getCart:() => {
    //   dispatch( getCart() );
    // }
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( Cart );
