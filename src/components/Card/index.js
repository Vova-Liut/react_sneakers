import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from './card.module.scss';

function Card( { 
    id, 
    title, 
    imageUrl, 
    price, 
    onPlus, 
    onFavorite, 
    favorited = false, 
    added = false,
    loading = true,

    })  {

    const [isAdded, setIsAdded] = React.useState(added);
    const [isFavorite, setIsFavorite] = React.useState(favorited);

    const onClickPlus = () => {
        onPlus( { id, title, imageUrl, price } )
        setIsAdded(!isAdded)
    };

    const onClickFavorite = () => {
            onFavorite( {id, title, imageUrl, price} )
            setIsFavorite(!isFavorite);
    }

    return(
        <div className={styles.card}>
            {
                loading ? 
                <ContentLoader 
                    speed={2}
                    width={250}
                    height={250}
                    viewBox="15 0 180 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb">
                    <rect x="0" y="100" rx="5" ry="5" width="150" height="15" /> 
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
                    <rect x="0" y="127" rx="5" ry="5" width="100" height="15" /> 
                    <rect x="0" y="170" rx="5" ry="5" width="80" height="25" /> 
                    <rect x="118" y="169" rx="10" ry="10" width="32" height="32" />
              </ContentLoader> :
                    <>
                        <div className={styles.favorite}
                            onClick={onClickFavorite}>
                            <img src={isFavorite ? '/img/heart-liked.svg' : '/img/heart-unliked.svg'} alt="Unliked" />
                        </div>
                            <img widrh='100%' height={135} src={imageUrl} alt="Sneakers" />
                            <h5>{title}</h5>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} uah.</b>
                            </div>
                                <img className={styles.plus}
                                onClick={onClickPlus} 
                                src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="plus" />
                            </div>
                    </> 
            }

        </div>
    )
}

export default Card;
