import { Eye } from "lucide-react";
import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  totalOrder: number;
  price: number;
  availability: "In Stock" | "Out of Stock";
  addedDate: Date;
}

const RecentAddedProducts: React.FC = () => {
  // Demo product list (more than 10 items)
  const demoProducts: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      totalOrder: 45,
      price: 99.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-15"),
    },
    {
      id: 2,
      name: "Smart Watch",
      totalOrder: 32,
      price: 199.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-14"),
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      totalOrder: 28,
      price: 59.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-14"),
    },
    {
      id: 4,
      name: "Laptop Backpack",
      totalOrder: 19,
      price: 49.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-13"),
    },
    {
      id: 5,
      name: "USB-C Cable",
      totalOrder: 87,
      price: 12.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-12"),
    },
    {
      id: 6,
      name: "Wireless Mouse",
      totalOrder: 41,
      price: 24.99,
      availability: "Out of Stock",
      addedDate: new Date("2025-06-12"),
    },
    {
      id: 7,
      name: "External SSD 1TB",
      totalOrder: 15,
      price: 129.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-11"),
    },
    {
      id: 8,
      name: "Desk Lamp",
      totalOrder: 23,
      price: 34.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-10"),
    },
    {
      id: 9,
      name: "Mechanical Keyboard",
      totalOrder: 18,
      price: 89.99,
      availability: "Out of Stock",
      addedDate: new Date("2025-06-09"),
    },
    {
      id: 10,
      name: "Monitor Stand",
      totalOrder: 12,
      price: 29.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-08"),
    },
    {
      id: 11,
      name: "Phone Holder",
      totalOrder: 36,
      price: 9.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-07"),
    },
    {
      id: 12,
      name: "Noise Cancelling Earbuds",
      totalOrder: 29,
      price: 149.99,
      availability: "In Stock",
      addedDate: new Date("2025-06-06"),
    },
    {
      id: 13,
      name: "Webcam",
      totalOrder: 14,
      price: 69.99,
      availability: "Out of Stock",
      addedDate: new Date("2025-06-05"),
    },
  ];

  // State for the product list
  const [products] = useState<Product[]>(demoProducts);

  // Get the 10 most recent products based on date
  const recentProducts = [...products]
    .sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime())
    .slice(0, 10);

  return (
    <div className="w-full  portrait:w-[100%w]   p-2 sm:p-6 overflow-x-hidden">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
        Recent Added Products
      </h2>

      {recentProducts.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full bg-white rounded-lg overflow-hidden text-xs sm:text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left font-bold text-[#041827] uppercase tracking-wider whitespace-nowrap">
                  Items
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-bold text-[#041827] uppercase tracking-wider whitespace-nowrap">
                  Total Order
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-bold text-[#041827] uppercase tracking-wider whitespace-nowrap">
                  Price
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-bold text-[#041827] uppercase tracking-wider whitespace-nowrap">
                  Action
                </th>
                <th className="px-2 sm:px-4 py-2 text-left font-bold text-[#041827] uppercase tracking-wider whitespace-nowrap">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-2 sm:px-4 py-2 whitespace-nowrap font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-[#041827]">
                    {product.totalOrder}
                  </td>
                  <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-[#041827]">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 whitespace-nowrap text-[#041827] ">
                    <Eye className="inline-block mr-1 text-gray-500 cursor-pointer portrait:w-[3vw] portrait:sm:w-[4vw] landscape:w-[0.7vw]" />
                  </td>
                  <td
                    className={`px-2 sm:px-4 py-2 whitespace-nowrap font-medium ${
                      product.availability === "In Stock"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.availability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-[#041827] italic mt-6 text-center">
          You have not added any product yet.
        </p>
      )}
    </div>
  );
};

export default RecentAddedProducts;
