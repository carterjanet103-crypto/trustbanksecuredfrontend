import React from "react";

const Security = () => {
  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        Security Settings
      </h1>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow space-y-6">

        <div>
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Password Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-3">
            Keep your account secure by updating your password regularly.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Change Password
          </button>
        </div>

        <hr className="border-slate-300 dark:border-slate-700" />
