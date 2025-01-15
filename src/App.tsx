import React, { FormEvent, useEffect } from "react";
import "./App.css";
import { useTransactions } from "./hooks/useTransactions";

const PaymentDashboard: React.FC = () => {
  const {
    result,
    target,
    transactions,
    error,
    totalAmount,
    handleCheckTransactions,
    handleSetTarget,
    handleAddTransaction,
    setError,
  } = useTransactions();

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
      <h3>Add a new transaction:</h3>
      <form onSubmit={handleAddSubmit} className="add-form">
        <div className="input-container">
          <input type="number" name="amount" placeholder="Add amount" />
          <button type="submit">Add Transaction</button>
        </div>
        <span>{error}</span>
      </form>
      <ul className="transactions">
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            <span>ID: {transaction.id}</span>
            <span>Amount: ${transaction.amount}</span>
          </li>
        ))}
      </ul>
      <p>Total: {totalAmount}</p>
      <form onSubmit={handleCheckSubmit} className="check-form">
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
