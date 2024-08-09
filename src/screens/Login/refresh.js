import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startLogin } from './loginReducer';

const RefreshComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refresh = async () => {
      console.log("--------------------------MMMMMMMMMMMMMMMMMM");

      // Dispatch the startLogin action with default credentials
      dispatch(startLogin({ email: "test", password: "form.password" }));
      
      console.log("--------------------------MMMMMMMMMMMMMMMMMM");
    };

    // Call the refresh function when the component mounts
    refresh();
  }, [dispatch]);

  return <></>; // Or any JSX you want to render
};

export default RefreshComponent;
