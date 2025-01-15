import React, { FormEvent, useEffect, useState } from "react";
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

  const handleCheckSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCheckTransactions({ targetAmount: target });
  };

  const handleAddSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const amount = form.get("amount");
    if (!amount) return;

    handleAddTransaction(transactions.length + 1, Number(amount));
  };

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>
      <form onSubmit={handleAddSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Add amount"
          // onChange={(e) => handleSetTarget(Number(e.target.value))}
        />
        <button type="submit">Add Transaction</button>
      </form>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}
      </ul>
      <form onSubmit={handleCheckSubmit}>
        <input
          type="number"
          placeholder="Enter target amount"
          onChange={(e) => handleSetTarget(Number(e.target.value))}
        />
        <button type="submit">Check Transactions</button>
      </form>
      <p>{result}</p>
    </div>
  );
};

export default PaymentDashboard;
