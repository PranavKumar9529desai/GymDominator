import { useState } from 'react';

interface Transaction {
  id: number;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
}

export const Wallet = () => {
  const [balance] = useState(100); // Initial balance of 1200
  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      amount: 100,
      type: 'credit',
      description: 'Gym Onboarding Bonus',
      date: new Date().toISOString().split('T')[0],
    },
    // Add more mock transactions as needed
  ]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-8 text-white">
        <h2 className="text-2xl font-semibold mb-2">Your Balance</h2>
        <p className="text-4xl font-bold mb-2">₹{balance.toFixed(2)}</p>
        <p className="text-sm opacity-90">
          You can use this money to buy gym programs and book training sessions.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold p-4 border-b">Transaction History</h3>
        <div className="divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-sm text-gray-500">{transaction.date}</p>
              </div>
              <span
                className={`font-semibold ${
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
