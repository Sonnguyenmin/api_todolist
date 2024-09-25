import BASE_URL from '../api/instance';

/**
 * Hàm gọi API lấy danh sách dữ liệu khách hàng
 * @returns Dữ liệu danh sách khách hàng
 *
 */
const getAllCustomer = async () => {
  const response = BASE_URL.get('customers');
  return response;
};

/**
 * Hàm gọi API Tim kiem phan trang loc ...
 * @returns Dữ liệu danh sách khách hàng
 *
 */
const searchAndPaging = async (searchValue, pageSize, currentPage) => {
  const response = BASE_URL.get(`customers?_page=${currentPage}&_limit=${pageSize}&email_like=${searchValue}`);
  return response;
};

export { getAllCustomer, searchAndPaging };

//3 cách a sin a weet
