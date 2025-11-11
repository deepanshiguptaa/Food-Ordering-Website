import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItem from './FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  if (!food_list || food_list.length === 0) {
    return <div className="text-center mt-5">Loading food items...</div>;
  }

  return (
    <div className='container'>
      <div className='row g-2'>
        {food_list.map((item) => {
          if (category === 'All' || category === item.category) {
            return (
              <div className='col-lg-3' key={item._id}>
                <FoodItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                  description={item.description}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
