import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

const Favorites = ({ onAddToFavorite, onAddToCart, isLoading }) => {
  const { favorites } = React.useContext(AppContext);
  return ( 
      <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
          <h1>Мои закладки</h1>
      </div>

          <div className="d-flex flex-wrap">
              {
                  (isLoading  
                  ? [...Array(4)] : favorites).map((item, index) => (
                    <Card
                        key={index} 
                        favorited={true}
                        onFavorite={onAddToFavorite}
                        onPlus={onAddToCart}
                        loading={isLoading}
                        {...item}
                      /> 
                  ))  
              }

          </div>
      </div>
  );
}

export default Favorites;