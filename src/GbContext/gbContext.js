import React, { createContext, useReducer } from "react";

const initialState = {
  userData: [],
};

export const GbContext = createContext(initialState);


export const GbProvider = ({ children }) => {

  const [post, setPost] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [allComments, setAllComments] = React.useState([])


  return (
    <GbContext.Provider
      value={{
        userData: users,

        addData: setUsers,
        post: [post, setPost],
        allCmnts: [allComments, setAllComments]
      }}
    >
      {children}
    </GbContext.Provider>
  );
};
