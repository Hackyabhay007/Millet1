import React from 'react';

const products = [
    {
        id: 1,
        name: 'Organic Apple',
        price: 250,
        image: 'https://gcdnb.pbrd.co/images/rGq54oVxCeXf.jpg?o=1',
    },
    {
        id: 2,
        name: 'Organic Banana',
        price: 150,
        image: 'https://gcdnb.pbrd.co/images/JF1ds3oEUDcn.jpg?o=1',
    },
    {
        id: 3,
        name: 'Organic Carrot',
        price: 200,
        image: 'https://gcdnb.pbrd.co/images/OvPFuBiWMqoS.jpg?o=1',
    },
    {
        id: 4,
        name: 'Organic Broccoli',
        price: 300,
        image: 'https://gcdnb.pbrd.co/images/WSe7gVhHkgDh.jpg?o=1',
    },
    {
        id: 5,
        name: 'Organic Tomato',
        price: 180,
        image: 'https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1',
    },
    // additional products...
    {
        id: 6,
        name: 'Organic Spinach',
        price: 120,
        image: 'https://gcdnb.pbrd.co/images/oCHDV8Vs98Be.jpg?o=1',
    },
    {
        id: 7,
        name: 'Organic Potato',
        price: 50,
        image: 'https://gcdnb.pbrd.co/images/K27d9xHI1JJ5.jpg?o=1',
    },
    {
        id: 8,
        name: 'Organic Cucumber',
        price: 100,
        image: 'https://gcdnb.pbrd.co/images/3AmDLfUR6RAs.jpg?o=1',
    },
    {
        id: 9,
        name: 'Organic Bell Pepper',
        price: 200,
        image: 'https://gcdnb.pbrd.co/images/3AmDLfUR6RAs.jpg?o=1',
    },
    {
        id: 10,
        name: 'Organic Zucchini',
        price: 150,
        image: 'https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1',
    },
];

function Shop() {
    return (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 p-4">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="flex flex-col bg-yellow-50 rounded-xl shadow-lg overflow-hidden"
                >
                    <div className="h-52 hover:scale-105 transition-transform duration-300  w-full overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full  h-full object-cover rounded-t-xl"
                        />
                    </div>
                    <div className="flex flex-col flex-grow p-0 text-center">
                        <p className="text-lg font-semibold">{product.name}</p>
                        <p className="text-gray-500 font-semibold pb-2">Price: ₹{product.price}</p>
                        <button className="mt-auto bg-green-600 text-white px-4 py-2 font-semibold rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Shop;
