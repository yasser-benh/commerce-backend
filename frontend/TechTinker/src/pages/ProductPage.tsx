import { Product } from "../types";
import React, { useEffect } from "react";
import ProductCard from "../components/ProductCard";


function ProductPage() {
  const [product, setProduct] = React.useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const data = await response.json();
        
        console.log("API Response:", data); // This will show you the structure of the data
        
        if (data.products && Array.isArray(data.products)) {
          setProduct(data.products);  // Set the products array
        } else {
          console.error("Data.products is not an array:", data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    fetchProducts();
  }, []);
  return (
    <div className="grid-grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {
        product.map((product) => (
          <ProductCard  product={product} />
        ))
      }
    </div>
  );
}

export default ProductPage;
