import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart, updateCart} from '../../actions/cartActions';

class BookItem extends React.Component{
  handleCart(){
    const book = [...this.props.cart, {
      _id:this.props.id,
      title:this.props.title,
      description:this.props.description,
      images: this.props.images,
      price:this.props.price,
      quantity:1
    }]

    // Check if cart is empty
    if(this.props.cart.length > 0){
      // Chart is not empty
      let _id = this.props.id;
      // TODO: something wrong with this. returns 0 when not in cart………
      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      })

      // If returns -1, there are no items with same ID
      if (cartIndex === -1){
        this.props.addToCart(book);
      } else {
        // update the quantity
        this.props.updateCart(_id, 1, this.props.cart);
      }
    } else {
      // Cart is empty
      this.props.addToCart(book);
    }

  }

  constructor(){
    super();
    this.state = {
      isClicked:false
    };
  }

  onReadMore(){
    this.setState({isClicked:true});
  }

  render(){
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.description.length > 50 && this.state.isClicked === false)?(this.props.description.substring(0,50)):(this.props.description)}
              <Button className="link" onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 50)?('...read more'):('')}
              </Button>
            </p>
            <h6>usd. {this.props.price}</h6>
            <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}
function mapStateToProps(state){
  return{
    cart:state.cart.cart
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addToCart:addToCart,
    updateCart:updateCart
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BookItem);
