import { useEffect, useState } from 'react';

const useDebounce = (value, delay) => {
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setSearchValue(value);
    }, delay);

    //Clean function
    return () => {
      clearInterval(timeOutId);
    };
  }, [value]);
  return searchValue;
};

export default useDebounce;

//hàm xử lý bất đồng bộ trong webAPI setTimeOut()
