import  React  from 'react';
import AppContex from '../contex';

import Card from "../components/Card";



const Favorities = ({ onAddToFavorite, onAddToCart, isLoading }) => {
    const { favorites } = React.useContext(AppContex);
    let uniqId = 1;
    return ( 
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h1>Мои закладки</h1>
        </div>

            <div className="d-flex flex-wrap">
                {
                    isLoading  
                    ? [...Array(4)].map(() => (
                        <Card
                            key={uniqId++}
                            loading={isLoading}
                        /> 
                    ))  : favorites.map((item, index) => (
                        <Card
                            key={index} 
                            favorited={true}
                            onFavorite={onAddToFavorite}
                            onPlus={onAddToCart}
                            loading={isLoading}
                            {...item}
                        />))
                }

            </div>
        </div>
    );
}
 
export default Favorities;