import React from 'react';
import axios from 'axios';

import Info from '../Info';
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss';

const delay = (ms) => {
    new Promise((resolve) => setTimeout(resolve, ms));
};

function Drawer({ onClose, onRemove, items = [], opened }) {
    const urlOrder = 'https://64344d4b1c5ed06c95942a77.mockapi.io/orders/'
    const urlCart = 'https://6431d8973adb15965175107b.mockapi.io/Cart/';

    const { cartItems, setCartItems, totalPrice } = useCart();
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(urlOrder, {items: cartItems});


            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`${urlCart}${item.id}`);
                await delay(1000); 
            }


        } catch (error) {
            alert("Ошибка при создании заказа! :(")
        }
        setIsLoading(false);
    };

    return (
        <div  className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-30">Корзина 
                        <img onClick={onClose}
                        className="cu-p" 
                        src="/img/btn-remove.svg" 
                        alt="Remove" />
                    </h2>

                {
                    items.length > 0 ? (                
                        <div className="d-flex flex-column flex" >
                            <div className="flex">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div
                                        style={{backgroundImage: `url(${obj.imageUrl})`}} 
                                        className="cartItemImg">
                                        </div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price}</b>
                                        </div>
                                        <img
                                        onClick={() => onRemove(obj.id)}
                                        className="removeBtn" 
                                        src="/img/btn-remove.svg" g
                                        alt="Remove" />
                                    </div>
                                ))}
                                <div className="cardTotalBlock">
                                    <ul>
                                        <li className="d-flex">
                                            <span>Итого:</span>
                                            <div></div>
                                            <b>{totalPrice} UAH</b>
                                        </li>
                                        <li className="d-flex">
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>{Math.ceil((totalPrice / 100 * 5))} UAH</b>
                                        </li>
                                    </ul>
                                    <button
                                        disabled={isLoading}
                                        onClick={onClickOrder} 
                                        className="greenButton">
                                        Оформить заказ
                                        <img src="/img/arrow.svg" alt="Arrow" />
                                    </button>
                                </div> 
                            </div>
                        </div>
                        ) : (
                        <Info 
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая" }
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` 
                                                        : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} 
                            image={isOrderComplete ? "/img/completed.png" : "/img/emptyCart.jpg"} />
                        )}
            </div>
        </div>
    );
}

export default Drawer;