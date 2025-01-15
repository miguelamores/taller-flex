import { useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);

  const [target, setTarget] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");

  const handleCheckTransactions = () => {
    if (target === null) return;

    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        if (transactions[i].amount + transactions[j].amount === target) {
          setResult(
            `Transactions ${transactions[i].id} and ${transactions[j].id} add up to ${target}`
          );
          return;
        }
      }
    }
    setResult("No matching transactions found.");
  };

  return {
    target,
    result,
    handleCheckTransactions,
    setTarget,
    setTransactions,
  };
}
