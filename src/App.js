import React from 'react';
import axios from 'axios';
import { Routes, Route} from 'react-router-dom';

import AppContex from './context';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import './App.scss';


// const arr = [
//     {
//         title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//         price: 12999,
//         imageUrl: '/img/sneakers/1.jpg'
//     },
//     {
//         title: 'Мужские Кроссовки Nike Air Max 270',
//         price: 11500,
//         imageUrl: '/img/sneakers/2.jpg'
//     },
//     {
//         title: 'Мужские Кроссовки Nike Blazer Mid Suede',
//         price: 10500,
//         imageUrl: '/img/sneakers/3.jpg'
//     },
//     {
//         title: 'Кроссовки Puma X Aka Boku Future Rider',
//         price: 13500,
//         imageUrl: '/img/sneakers/4.jpg'
//     }
// ]



function App() {

    const [items, setItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [cartItems, setCartItems] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [favorites, setFavorites] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const urlElements = 'https://6431d8973adb15965175107b.mockapi.io/Sneakers';
    const urlCart = 'https://6431d8973adb15965175107b.mockapi.io/Cart/';
    const urlFav = 'https://64344d4b1c5ed06c95942a77.mockapi.io/Cart'


    React.useEffect( () => {
        async function fetchData () {
            try {
                setIsLoading(true);
                const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get(urlCart),
                    axios.get(urlFav),
                    axios.get(urlElements),
                ]);

                setIsLoading(false);
                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data)
    
            } catch (error) {
                alert('Ошибка при запросе данных ;(');
                console.error(error);
            }
        }
        fetchData();
    }, []);


    // React.useEffect(() => {
    //     fetch(urlGet).then((res) => {
    //         return res.json();
    //     }).then(json => {
    //         setItems(json)
    //     });
    // }, [])

    const onAddToCart = async (obj) => {
        try { 
            const findItem = await cartItems.find((item) => Number(item.parentId) === Number(obj.id));
            if (findItem) {
            setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
            axios.delete(`${urlCart}${findItem.id}`);
        } else {
            const { data } = await axios.post(urlCart, obj);
            setCartItems((prev) => [...prev, data]);
            setCartItems((prev) => prev.map((item) => {
                if(item.parentId === data.parentId) {
                    return {
                        ...item,
                        id: data.id,
                    };
                }
                return item;
                }),
            );
        }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
            console.error(error);
        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`${urlCart}${id}`);
        // console.log(id);
        setCartItems((prev) => prev.filter((item) => item.id !== id));

    }

    const onCahangeSearchInput = (e) => {
        setSearchValue(e.target.value);

    }

    const onAddToFavorite = async (obj) => {
       try { 
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`${urlFav}/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));   //Deleting from state on Fav page
            } else {
                const { data } = await axios.post(urlFav, obj);
                setFavorites((prev) => [...prev, data]);  
            }
        }   
       catch (error) {
            alert('Не удалось добавить товар');
            console.error(error);
        }
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    };

    const isFavorited = (id) => {
        return favorites.some((obj) => Number(obj.parentId) === Number(id));
    };


    // const onAddToFavorite = async (obj) => {
    //     try {
    //       if (isFavorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
    //         axios.delete(`https://mocki.io/v1/42dc2c3a-2403-4cf4-9fa2-b0508b7e7f75`);
    //         setIsFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    //       } else {
    //         const { data } = await axios.post(
    //             'https://mocki.io/v1/42dc2c3a-2403-4cf4-9fa2-b0508b7e7f75',
    //           obj,
    //         );
    //         setIsFavorites((prev) => [...prev, data]);
    //       }
    //     } catch (error) {
    //       alert('Не удалось добавить в фавориты');
    //       console.error(error);
    //     }
    //   };


    return (
        <AppContex.Provider value={{ items, cartItems, favorites, isItemAdded, isFavorited, 
                                        onAddToFavorite, onAddToCart, setCartOpened, setCartItems }}> 
            <div className="wrapper clear">

                <Drawer 
                    items={cartItems} 
                    onClose={() => setCartOpened(false)} 
                    onRemove={onRemoveItem}
                    opened={cartOpened}/>

                <Header onClickCart={() => setCartOpened(true)}/>

                <Routes>
                    <Route path="/" element={
                        <Home 
                        items={items}
                        cartItems={cartItems}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onCahangeSearchInput={onCahangeSearchInput}
                        onAddToFavorites={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                        />}>
                    </Route>
                    <Route path="/favorites" element={<Favorites
                        items={favorites}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        isLoading={isLoading}
                        />}>
                    </Route>
                    <Route path="/orders" element={<Orders 
                            items={favorites}
                            />
                        }>
                    </Route>
                </Routes>
            </div>
        </AppContex.Provider> 
    );
}

export default App;
