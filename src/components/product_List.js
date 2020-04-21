import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {productData} from '../productData';
const API_URL = 'https://api.exchangeratesapi.io/latest?base=INR';


class ProductsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
cost_Of_One_USD:0,
currency:'INR',
options: [
   
    {
      name: 'INR',
      value: 'INR'
    },
    {
      name: 'USD',
      value: 'USD'
    }]
          }
    }

    handleChange = (event) => {
      { this.state.currency ==!this.state.currency ? this.setState({currency:'INR'}):this.setState({currency: event.target.value})}
      };

componentDidMount()
{
    const url = `${API_URL}`;
    axios.get(url).then(response => response.data)
    .then((data) => {
        console.log("rates are", data);
      this.setState({ cost_Of_One_USD: data.rates.USD })
      console.log(this.state.cost_Of_One_USD);
     })

}



Dropdownlist=()=>
{
    const { options, value } = this.state;
    return(
        
< >
<div style={{flexDirection:"row",marginLeft:"60%"}}>   
<div>Please select the Currency  
        <select onChange={this.handleChange} value={value} style={{backgroundColor:"#fff",color:'#000',borderRadius:5,width:100,borderWidth:1,marginTop:50,marginLeft:30}}>
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select></div> </div>
      </>    
    );
}





    render() { 
       
        return ( 
            <>
            <this.Dropdownlist/>
            <Container style={{marginTop:100}}>
   <Row>
{
    
    productData.map((item,key) =>
    (
        
     <Col xs={6} md={4}>
     <Image src={item.url} style={{width:250,height:250}} rounded/> 
    <div style={{color:'blue'}}>{item.name}</div>
    <div style={{color:'red'}}>
    { this.state.currency ==='INR' ? <div > Rs.{item.price}/- </div>:<div>${item.price*this.state.cost_Of_One_USD.toFixed(4)}</div> }
    </div> 
    </Col>
     
    ))}

    </Row>
     </Container>
</>
          
            );

    }
}
 
export default ProductsList;


