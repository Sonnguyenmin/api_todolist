import { Button, Dropdown, Input, Modal, Radio, Select, Tag } from 'antd';
import { FaFilter } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { LuRefreshCw } from 'react-icons/lu';
import FormCustomer from '../../../components/admin/formCustomer';
import { useEffect, useState } from 'react';
import { getAllCustomer, searchAndPaging } from '../../../services/customerService';
import useDebounce from '../../../hooks/useDebounce';
import Loader from '../../../components/base/Loader';
import './customer.css';

const Customer = () => {
  const items = [
    {
      key: '1',
      label: <span>Hủy bỏ bộ lọc</span>,
    },
    {
      key: '2',
      label: <span>Đang hoạt động</span>,
    },
    {
      key: '3',
      label: <span>Ngừng hoạt động</span>,
    },
  ];

  const options = [
    {
      key: '4',
      label: <span>Chỉnh sửa</span>,
    },
    {
      key: '5',
      label: <span>Chặn</span>,
    },
    {
      key: '6',
      label: <span>Xóa</span>,
    },
  ];

  // B1:Tạo trạng thái hiển thị form
  const [isShowForm, setIsShowForm] = useState(false);
  //render ra màn hình
  const [customers, setCustomers] = useState([]);
  //search
  const [keySearch, setKeySearch] = useState('');

  const [isShowLoader, setIsShowLoader] = useState(false);

  const [pageSize, setPageSize] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPage, setTotalPage] = useState(1);

  const [totalRecord, setTotalRecord] = useState(1);

  const debounce = useDebounce(keySearch, 300);

  useEffect(() => {
    const findAllCustomer = async () => {
      const response = await getAllCustomer();
      //Lấy ra tổng số trang
      const totalRecords = response.data.length;

      //Cập nhât tổng số bản ghi
      setTotalRecord(totalRecords);

      const pages = Math.ceil(totalRecords / pageSize);

      setTotalPage(pages);
    };

    findAllCustomer();
  }, [pageSize]);

  //B3: Gọi API

  const loadData = async (searchValue) => {
    //Mở loader
    setIsShowLoader(true);

    const response = await searchAndPaging(searchValue, pageSize, currentPage);
    setCustomers(response.data);

    setIsShowLoader(false);
  };

  //gặp vấn đề khi search thì bị gọi liên tục khắc phục = debounce
  //Component không phải nơi gọi Api mà chỉ là nơi lấy dữ liệu và render dữ liệu
  useEffect(() => {
    loadData(debounce);
  }, [debounce, pageSize, currentPage]);

  const handleActivePage = (page) => {
    setCurrentPage(page);
  };

  //Hàm chuyển đến trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  //Hàm quay lại trang trước

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  //Render danh sách các trang
  const renderPages = () => {
    const pages = [];

    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return (
      <>
        {pages.map((page) => {
          return (
            <div
              key={page}
              onClick={() => handleActivePage(page)}
              className={`${
                page === currentPage ? 'active' : ''
              } h-8 w-8 border flex items-center justify-center rounded cursor-pointer hover:bg-[#dadada]`}
            >
              {page}
            </div>
          );
        })}
      </>
    );
  };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //b2 : Tạo hàm mở đóng form
  const handleShowForm = () => {
    setIsShowForm(true);
  };

  const handleCloseForm = () => {
    setIsShowForm(false);
  };

  /**
   * Hàm lấy số lượng bản ghi
   * @param {*} size số lượng bản ghi
   */
  const handleGetPageSize = (size) => {
    setPageSize(size);
  };

  //Telport đẩy tất cả ra ngoài khỏi dom

  return (
    <>
      <Modal
        title={<h3 className="text-[20px]">Xác nhận xóa</h3>}
        open={false}
        maskClosable={false}
        footer={
          <>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button onClick={handleOk} danger type="primary">
              Xóa
            </Button>
          </>
        }
      >
        <p>Bạn có chắc chắn muốn xóa khách hàng này không?</p>
      </Modal>
      {/* Hiệu ứng loader */}
      {isShowLoader && <Loader />}
      {/* Danh sách khách hàng */}
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex items-center justify-between mb-6  ">
          <h1 className="text-[24px] font-bold">Danh sách khách hàng</h1>
          <Button onClick={handleShowForm} type="primary">
            Thêm mới khách hàng
          </Button>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
          >
            <Button className="border-none shadow-none">
              <FaFilter size={20} className="cursor-pointer text-gray-500 hover:text-gray-600" />
            </Button>
          </Dropdown>

          <div className="flex items-center gap-3">
            <Input.Search
              onChange={(e) => setKeySearch(e.target.value)}
              value={keySearch}
              className="w-[300px]"
              placeholder="Tìm kiếm tài khoản theo tên"
            />
            <LuRefreshCw
              onClick={() => loadData(debounce)}
              size={24}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 h-11 text-left">Tên</th>
                <th className="px-4 h-11 text-left">Giới tính</th>
                <th className="px-4 h-11 text-left cursor-pointer">Ngày sinh</th>
                <th className="px-4 h-11 text-left">Email</th>
                <th className="px-4 h-11 text-left">Địa chỉ</th>
                <th className="px-4 h-11 text-left">Trạng thái</th>
                <th className="px-4 h-11 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {debounce && <p>Không tìm thấy kết quả bạn muốn tìm kiếm</p>}
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b">
                  <td className="px-4 h-11">{customer.name}</td>
                  <td className="px-4 h-11">{customer.gender === 0 ? 'Nam' : customer.gender === 1 ? 'Nữ' : 'Khác'}</td>
                  <td className="px-4 h-11">{customer.dateOfBirth}</td>
                  <td className="px-4 h-11">{customer.email}</td>
                  <td className="px-4 h-11">{customer.address}</td>
                  <td className="px-4 h-11">
                    {customer.status ? <Tag color="green">Đang hoạt động</Tag> : <Tag color="red">Ngừng hoạt động</Tag>}
                  </td>
                  <td className="px-4 h-11">
                    <Dropdown
                      menu={{
                        items: options,
                      }}
                      placement="bottom"
                      trigger={['click']}
                    >
                      <Button className="border-none shadow-none focus:shadow-none focus:bg-none">Sửa</Button>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center ">
          <div>
            Hiển thị <b>{customers.length}</b> trên <b>{totalRecord}</b> bản ghi
          </div>
          <div className="flex items-center gap-5">
            <Select
              onChange={handleGetPageSize}
              defaultValue="Hiển thị 10 bản ghi / trang"
              style={{
                width: 220,
              }}
              options={[
                {
                  value: '10',
                  label: 'Hiển thị 10 bản ghi / trang',
                },
                {
                  value: '20',
                  label: 'Hiển thị 20 bản ghi / trang',
                },
                {
                  value: '50',
                  label: 'Hiển thị 50 bản ghi / trang',
                },
                {
                  value: '100',
                  label: 'Hiển thị 100 bản ghi / trang',
                },
              ]}
            />
            <div className="flex items-center gap-3">
              <div
                onClick={handlePrevPage}
                className="h-8 w-8 border flex items-center justify-center rounded cursor-pointer hover:bg-[#dadada]"
              >
                <IoIosArrowBack className={`${currentPage === 1 ? 'dissable' : ''}`} />
              </div>
              {renderPages()}
              <div
                onClick={handleNextPage}
                className="h-8 w-8 border flex items-center justify-center rounded cursor-pointer hover:bg-[#dadada]"
              >
                <IoIosArrowForward className={`${currentPage === totalPage ? 'dissable' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form quản lý */}
      {isShowForm && <FormCustomer onCloseForm={handleCloseForm} />}
    </>
  );
};

export default Customer;

//Khái niệm bắn thằng con lên thằng cha thông qua prop : lifting state up react
//vue : emit
