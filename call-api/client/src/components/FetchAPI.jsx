import React, { useEffect, useState } from 'react';

export default function FetchAPI() {
  const [products, setProduct] = useState([]);

  const loadData = () => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.log(error))
      .finally(() => console.log('Hoàn thành'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'delete',
    })
      .then((response) => {
        if (response.ok) {
          //load lại dữ liệu
          loadData();
          //Hiển thị thông báo thành cong
          setTimeout(() => {
            alert('Xóa thành công');
          }, 0);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (id) => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Dưa',
        price: 12345,
        quantity: 10,
      }),
    })
      .then((response) => {
        if (response.ok) {
          //load lại dữ liệu
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  const handleAddProduct = () => {
    fetch(`http://localhost:3000/products`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Dưa',
        price: 12345,
        quantity: 10,
      }),
    })
      .then((response) => {
        if (response.ok) {
          //load lại dữ liệu
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  //Xử lý bất đồng bộ
  //3 trạng thái : pending : chờ xử lý
  //fulfilled: đã hoàn thành thành công
  // Rejected : có lỗi xảy ra
  //then: đã hoàn thành rồi
  //catch: bị từ chối
  //finally: dc goin khi promit hoàn thành hoặc gặp
  //body: gửi dữ liệu từ form
  //param: dường dẫn
  //header: nội dung hay bắn token
  //query : sau ? không làm thay đổi url gốc

  return (
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
  );
}
