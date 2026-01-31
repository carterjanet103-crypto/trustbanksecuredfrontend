import React from "react";

interface Props {
  user: any;
  transactions: any[];
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<Props> = ({ user, transactions }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        Welcome back, {user?.name || "User"}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="card">
          <h3 className="card-title">Account Balance</h3>
          <p className="text-3xl font-bold">${user?.balance || "0.00"}</p>
        </div>

        <div className="card">
          <h3 className="card-title">Total Transactions</h3>
          <p className="text-3xl font-bold">{transactions?.length || 0}</p>
        </div>

        <div className="card">
          <h3 className="card-title">Active Cards</h3>
          <p className="text-3xl font-bold">2</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-200">
        Recent Transactions
      </h2>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow">
        {transactions?.length === 0 ? (
          <p className="text-slate-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-3">
            {transactions.map((t, i) => (
              <li key={i} className="flex justify-between border-b pb-2">
                <span>{t.description}</span>
                <span className={t.amount < 0 ? "text-red-500" : "text-green-500"}>
                  ${t.amount}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
