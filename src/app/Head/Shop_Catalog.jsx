import React from 'react';

const categories = [
  {
    id: 1,
    name: 'Category 1',
    imgSrc: 'https://images6.alphacoders.com/132/1325451.png',
  },
  {
    id: 2,
    name: 'Category 2',
    imgSrc: 'https://img.freepik.com/premium-photo/ghee-clarified-butter-bowl-with-spoon-white-background_641503-169994.jpg?semt=ais_hybrid',
  },
  {
    id: 3,
    name: 'Category 3',
    imgSrc: 'https://img.freepik.com/free-photo/honey-jar-ai-generated-image_268835-5046.jpg',
  },
  {
    id: 4,
    name: 'Category 4',
    imgSrc: 'https://t4.ftcdn.net/jpg/06/14/80/29/360_F_614802940_yWmEJuNkUL93Bc0CjtFiJd7uriozeNr4.jpg',
  },
  {
    id: 5,
    name: 'Category 5',
    imgSrc: 'https://gcdnb.pbrd.co/images/VwRneHMiU6Fo.png?o=1',
  },
  {
    id: 6,
    name: 'Category 6',
    imgSrc: 'https://img.freepik.com/premium-vector/ready-eat-meal-sign-label-precooked-food-vector-stock-illustration_100456-11823.jpg',
  },
];

function ShopCatalog() {
  return (
    <div className="font-afacadFlux bg-green-200  mx-auto p-4">
      <h1 className="text-3xl text-pink-700 font-bold text-center mb-10">Shop by Categories</h1>

      {/* Desktop View with 3 Columns */}
      <div className="hidden  md:grid md:grid-cols-3 md:gap-10 md:px-10">
        {categories.map((category) => (
          <div key={category.id} className="flex shadow-lg hover:shadow-lg hover:shadow-slate-700 cursor-pointer overflow-hidden rounded-md shadow-slate-400  justify-center">
            <img
              src={category.imgSrc}
              alt={category.name}
              className="w-full md:h-52 h-40 md:object-cover"
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
