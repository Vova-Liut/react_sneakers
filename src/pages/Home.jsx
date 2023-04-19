import Card from '../components/Card';

const Home = ({ 
    items,
    cartItems, 
    searchValue, 
    setSearchValue, 
    onCahangeSearchInput, 
    onAddToCart, 
    onAddToFavorites,
    isLoading,
    }) => {

    const renderItems = () => {
        let uniqId = 1;

        return ( 
            isLoading  
            ? [...Array(12)].map(() => (
                <Card
                    key={uniqId++}
                    loading={isLoading}
                /> 
            ))  :
            items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item, index) => (
                    <Card
                        key={index} 
                        onPlus ={(obj) => onAddToCart(obj)}
                        added={cartItems.some(obj => obj.title === item.title)}
                        onFavorite ={(obj) => onAddToFavorites(obj)}
                        loading={isLoading}
                        {...item}
                    />)))
    }
    

    return ( 
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
            <div className="search-block d-flex">
                <img src="/img/search.svg" alt="Search" />
                    {searchValue && <img
                    onClick={() => setSearchValue('')}
                    className="cu-p clear"
                    src="/img/btn-remove.svg" 
                    alt="Remove" />}
                <input
                    onChange={onCahangeSearchInput}
                    value={searchValue} 
                    placeholder="Поиск..." />
            </div>
        </div>

            <div className="d-flex flex-wrap">
                {/* {items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                .map((item, index) => (
                    <Card
                        key={index} 
                        onPlus ={(obj) => onAddToCart(obj)}
                        added={cartItems.some(obj => obj.title === item.title)}
                        onFavorite ={(obj) => onAddToFavorites(obj)}
                        loading={isLoading}
                        {...item}
                    />))} */}
                    {
                        renderItems()
                    }
            </div>
        </div>
    );
}
 
export default Home;