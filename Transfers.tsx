import React, { useState } from "react";

const Transfers = () => {
  const [amount, setAmount] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Send Money</h1>

      <div className="card max-w-md">
        <input
          type="number"
          placeholder="Amount"
          className="input mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="btn-primary w-full">Transfer</button>
      </div>
    </div>
  );
};

export default Transfers;
