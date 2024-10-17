import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Category 1',
    imgSrc: 'https://www.rosierfoods.com/cdn/shop/collections/DSC4615.jpg?v=1712577403',
  },
  {
    id: 2,
    name: 'Category 2',
    imgSrc: 'https://www.rosierfoods.com/cdn/shop/collections/GHEE.png?v=1722961608',
  },
  {
    id: 3,
    name: 'Category 3',
    imgSrc: 'https://www.rosierfoods.com/cdn/shop/collections/image.jpg?v=1712577525',
  },
  {
    id: 4,
    name: 'Category 4',
    imgSrc: 'https://www.rosierfoods.com/cdn/shop/collections/Ajwain-2.jpg?v=1712577436',
  },
  {
    id: 5,
    name: 'Category 5',
    imgSrc: 'https://www.rosierfoods.com/cdn/shop/collections/DSC4597.jpg?v=1712577463',
  },
  {
    id: 6,
    name: 'Category 6',
    imgSrc: 'https://www.rosierfoods.com/cdn/shop/collections/image_867e0c03-ac86-45ae-9acc-494cbb52a8d5.jpg?v=1712577492',
  },
];

function ShopCatalog() {
  return (
    <div className="container font-afacadFlux mx-auto p-4">
      <h1 className="text-3xl text-pink-700 font-bold text-center mb-10">Shop by Categories</h1>

      {/* Desktop View with 3 Columns */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-10 md:px-10">
        {categories.map((category) => (
          <div key={category.id} className="flex justify-center">
            <img
              src={category.imgSrc}
              alt={category.name}
              className="w-full md:h-52 h-40 md:object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Mobile View with 2 Columns */}
      <div className="grid md:hidden grid-cols-2 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="flex justify-center">
            <img
              src={category.imgSrc}
              alt={category.name}
              className="w-full h-28 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopCatalog;
