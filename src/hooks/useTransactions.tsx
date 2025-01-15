import { useCallback, useState } from "react";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);

  const [target, setTarget] = useState<number | null>(null);
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleCheckTransactions = useCallback(
    ({ targetAmount }: { targetAmount: number | null }) => {
      if (targetAmount === null) return;

      for (let i = 0; i < transactions.length; i++) {
        for (let j = i + 1; j < transactions.length; j++) {
          if (
            transactions[i].amount + transactions[j].amount ===
            targetAmount
          ) {
            setResult(
              `Transactions ${transactions[i].id} and ${transactions[j].id} add up to ${targetAmount}`
            );
            return;
          }
        }
      }
      setResult("No matching transactions found.");
    },
    []
  );

  const handleSetTarget = (value: number | null) => {
    setTarget(value);
  };

  return {
    target,
    result,
    transactions,
    error,
    handleCheckTransactions,
    handleSetTarget,
    setTransactions,
    setError,
  };
}
