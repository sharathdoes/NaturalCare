"use client";
import React, { useEffect } from "react";
function ProveIt() {
  const [products, setProducts] = React.useState([]);
  const [query, setQuery] = React.useState("");
  useEffect(() => {
    const findS = async () => {
      const products = await fetch("https://fakestoreapi.com/products");
      const productsData = await products.json();
      setProducts(productsData);
    };

    findS();
  }, []);
  const handleSubmit = async () => {
    const k=products.filter((p:any)=>p.title.toLowerCase().includes(query.toLowerCase()))
    setProducts(k);
  };
  return (
    <div>
      <h1>See the producsts here</h1>
      <h1>Search</h1>

      <input
      className="bg-blue-600"
        type="text"
        placeholder="enter  name"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>search</button>
      {products.map((p: any) => {
        return (
          <>
            <h1>{p.title}</h1>
            <h2>{p.price}</h2>
            <h2>${p.description}</h2>
          </>
        );
      })}
    </div>
  );
}

export default ProveIt;
