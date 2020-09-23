import React, { useState, useEffect, useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Screens/users'
import UserDetails from './Screens/user_details'
import { GbContext } from "./GbContext/gbContext";
import { fetchData, fetchPost, fetchComment } from './Api'

function App() {
  const [active, setActive] = useState({ active: false, id: 0 })
  const { addData, userData, post, allCmnts } = useContext(GbContext);
  const fetchedData = async (id) => {
    const { data } = await fetchData(id);
    addData(data)
    const wait = await fetchComment(data.length);
    allCmnts[1](wait)
  }

  const handlePost = async (id) => {
    const { data } = await fetchPost();
    post[1](data)
  }


  useEffect(() => {
    fetchedData();
    handlePost();
  }, [])




  return (
    <>
      {
        active.active ? <UserDetails setActive={setActive} id={active.id} /> :
          <Users setActive={setActive} />
      }
    </>
  );
}

export default App;
