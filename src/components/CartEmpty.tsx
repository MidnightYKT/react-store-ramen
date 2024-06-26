import React from 'react'
import { Link } from 'react-router-dom'

import cartEmpty from '../assets/image/empty-cart.png'

const CartEmpty: React.FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>
                    Cart is empty <span>😕</span>
                </h2>
                <p>
                    You probably haven't ordered pizza yet.
                    <br />
                    To order pizza, go to the main page.
                </p>
                <img src={cartEmpty} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Come back</span>
                </Link>
            </div>
        </>
    )
}

export default CartEmpty
