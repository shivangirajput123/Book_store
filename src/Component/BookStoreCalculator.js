import React, { Component } from "react";


class BookStoreCalculator extends Component {
    constructor() {
        super();
        this.state = {
            basket: [],
            totalPrice: null,
        };
    }

    handleAddToBasket = book => {
        this.setState(prevState => ({
            basket: [...prevState.basket, book],
        }));
    };

    handleCalculatePrice = () => {
        fetch('https://shivangirajput123.github.io/Calculate_book_pricing/api/Bookstore/calculatePrice', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ basket: this.state.basket }),
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ totalPrice: data.result.data }); // Corrected the state variable name
        })
        .catch(error => {
            console.error('Error calculating price:', error);
        });
    };
    

    render() {
        return (
            <div>
                <h2>Bookstore Calculator</h2>
            <div>
            <h3>Add Books to Basket</h3>
            <button onClick={() =>
            this.handleAddToBasket('book1')}> Add Book 1</button>
           <button onClick={() =>
            this.handleAddToBasket('book2')}> Add Book 2</button>
            <button onClick={() =>
            this.handleAddToBasket('book3')}> Add Book 3</button>
            <button onClick={() =>
            this.handleAddToBasket('book4')}> Add Book 4</button>
            <button onClick={() =>
            this.handleAddToBasket('book5')}> Add Book 5</button>
            </div>
            <div>
                <h3>Shopping Basket</h3>
                <ul> 
                {this.state.basket.map((book, index) =>
                (
                    <li key={index}>{book}</li>
                ))}</ul>
            </div>
            <div>
                <button onClick={this.handleCalculatePrice}>Calculate Price</button>
            </div>

            <div>
                <h3>Total Price</h3>
                <p>$
{this.state.totalPrice !== null ? this.state.totalPrice.toFixed(2) : 'Calculating...'}
</p>

            </div>
             
        </div>
        );
    }
}
export default BookStoreCalculator;
