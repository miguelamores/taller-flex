import React, { useEffect, useState } from "react";
import "./App.css";
import { useTransactions } from "./hooks/useTransactions";

const PaymentDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);

  const { handleCheckTransactions, result, target, handleSetTarget } =
    useTransactions();

  const handleAddTransaction = (id: number, amount: number) => {
    setTransactions([...transactions, { id, amount }]);
  };

  useEffect(() => {
    console.log("handleCheckTransactions");
  }, [handleCheckTransactions]);

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}
      </ul>
      <input
        type="number"
        placeholder="Enter target amount"
        onChange={(e) => handleSetTarget(Number(e.target.value))}
      />
      <button onClick={() => handleCheckTransactions({ targetAmount: target })}>
        Check Transactions
      </button>
      <p>{result}</p>
    </div>
  );
};

export default PaymentDashboard;
