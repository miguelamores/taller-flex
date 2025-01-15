import React, { FormEvent, useEffect, useState } from "react";
import "./App.css";
import { useTransactions } from "./hooks/useTransactions";

const PaymentDashboard: React.FC = () => {
  const {
    result,
    target,
    transactions,
    error,
    handleCheckTransactions,
    handleSetTarget,
    setTransactions,
    setError,
  } = useTransactions();

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
    setError("");
    const form = new FormData(e.target as HTMLFormElement);
    const amount = form.get("amount");

    if (!amount) {
      setError("Amount can not be empty");
      return;
    }
    if (Number(amount) <= 0) {
      setError("Amount can not be negative");
      return;
    }

    handleAddTransaction(transactions.length + 1, Number(amount));
  };

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>
      <form onSubmit={handleAddSubmit}>
        <span>{error}</span>
        <input type="number" name="amount" placeholder="Add amount" />
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
