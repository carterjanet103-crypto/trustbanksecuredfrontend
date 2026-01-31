import React from "react";

const Home = ({ onStart }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to TrustBank</h1>
      <p className="text-slate-600 dark:text-slate-300 max-w-md mb-6">
        Secure, fast, and modern banking designed for your lifestyle.
      </p>

      <button onClick={onStart} className="btn-primary px-6 py-3 text-lg">
        Get Started
      </button>
    </div>
  );
};

export default Home;
