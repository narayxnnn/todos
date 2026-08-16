import React from 'react';

const Navbar = () => {
    return(
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "10px"}}>
            <input type="checkbox" />
            <div style={{display: "flex", alignItems: "center", gap: "4px", marginRight: "20px"}}>
            <img width="35" height="35" src="https://img.icons8.com/scribby/50/todo-list.png" alt="logo" />
            <h1 style={{color: 'red'}}>my-todos</h1>
            </div>
        </div>
    );
}

export default Navbar;