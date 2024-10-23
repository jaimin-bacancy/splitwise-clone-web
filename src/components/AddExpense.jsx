import React from "react";

const AddExpense = () => {
  return (
    <div class="bg-background min-h-screen p-6">
      <button class="bg-primary text-white p-4 rounded mb-4">
        Add Expense
      </button>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h2 class="text-primary text-2xl font-bold mb-4">Add Expense</h2>
        <select class="w-full p-2 mb-4 border border-text-secondary rounded">
          <option>Select Group</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          class="w-full p-2 mb-4 border border-text-secondary rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          class="w-full p-2 mb-4 border border-text-secondary rounded"
        />
        <div class="flex justify-between">
          <button class="bg-accent text-white p-2 rounded">Paid by</button>
          <button class="bg-secondary text-white p-2 rounded">Split</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
