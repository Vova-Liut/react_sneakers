import  React  from 'react';
import axios from 'axios';



import Card from "../components/Card";



const Orders = () => {
    const urlOrders = 'https://64344d4b1c5ed06c95942a77.mockapi.io/orders';
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(urlOrders);
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false); 
            } catch (error) {
                alert('Ошибка при запросе заказов');
                console.error(error);
            }
        })();
    }, [])    
    
    return ( 
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
            <h1>Мои заказы</h1>
        </div>

            <div className="d-flex flex-wrap">
                {
                    (isLoading  
                    ? [...Array(4)] : orders).map((item, index) => (
                        <Card
                            key={index}
                            loading={isLoading}
                            {...item}
                        /> 
                    ))  
                }

            </div>
        </div>
    );
}
 
export default Orders;