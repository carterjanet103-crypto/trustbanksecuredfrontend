import React from "react";

const Cards = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Your Cards</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="card-title">Visa Debit</h3>
          <p>**** 4821</p>
        </div>

        <div className="card">
          <h3 className="card-title">Mastercard Credit</h3>
          <p>**** 9932</p>
        </div>
      </div>
    </div>
  );
};

export default Cards;
