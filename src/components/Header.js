import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart'

function Header(props) {
    const { totalPrice } = useCart()

    return(
        <header className="d-flex justify-between align-center p-40">
                <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="logo" />
                    <div className="headerInfo">
                        <h3 className="text-uppercase">REAT SNEAKERS</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
                </Link>
                <ul className="d-flex">
                    <li onClick={props.onClickCart}
                        className="mr-30 cu-p">
                        <img width={18} height={18} src="/img/cart.svg" alt="cart" /> 
                        <spn>{totalPrice} uah</spn>
                    </li>
                    <li>
                        <Link to="/favorites">
                            <img className="mr-20 cu-p" 
                            width={18} height={18} src="/img/heart.svg" alt="userFavorite" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders">
                            <img 
                            width={18} height={18} 
                            src="/img/user.svg" alt="cart" /> 
                        </Link>

                    </li>
                </ul>
        </header>
    );
}

export default Header;