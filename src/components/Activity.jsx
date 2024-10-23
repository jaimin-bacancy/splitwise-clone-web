import React from "react";

const Activity = () => {
  return (
    <div class="bg-background min-h-screen p-6">
      <h2 class="text-primary text-2xl font-bold mb-4">Activity</h2>
      <div class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-2">Expense 1</h3>
        <p class="text">Paid by You</p>
        <p class="text-success">You are owed $50</p>
        <p class="text-error">You owe $20</p>
      </div>
    </div>
  );
};

export default Activity;
