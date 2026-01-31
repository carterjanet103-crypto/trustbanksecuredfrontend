import React, { useState } from "react";

const Login = ({ onLogin }: any) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to TrustBank</h2>

        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={onLogin} className="btn-primary w-full mt-4">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
