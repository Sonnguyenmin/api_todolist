import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Axios() {
  const [products, setProducts] = useState([]);

  const loadData = () => {
    axios
      .get('http://localhost:3000/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (id) => {
    axios
      .put(`http://localhost:3000/products/${id}`, {
        name: 'Hấu',
        price: 12345,
        quantity: 10,
      })
      .then((response) => {
        loadData();
      })
      .catch((error) => console.log(error));
  };

  const handleAddProduct = () => {
    axios
      .post('http://localhost:3000/products', {
        name: 'Dưa',
        price: 12345,
        quantity: 10,
      })
      .then((response) => {
        loadData();
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
        loadData();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <h3>Danh sách sản phẩm</h3>
        <button onClick={handleAddProduct}>Thêm mới</button>
        <table border={1}>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>quantity</th>
              <th colSpan={2}>Options</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(product.id)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
