import React from 'react';
import logo from "./assets/ChaudronLogo.png";

function Footer() {
  return (
    <>
      <div className="bg-base-10 p-10 flex justify-between items-center">
        <img src={logo} alt="Logo" className="max-w-10 h-20" />
        <div className="text-center">
          <p className="text-sm">Sylvan Courtiol, Quentin Coignus, Kylian Margaillan</p>
          <p className="text-sm">© 2023 Chaudron</p>
          <p className="text-sm italic">Toute ressemblance avec un autre site de recettes est purement fortuite et strictement non intentionnelle</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
