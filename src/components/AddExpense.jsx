import {
  faIndianRupeeSign,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AddExpense = () => {
  return (
    <div class="bg-background min-h-screen p-6">
      <div class="bg-white p-6 rounded-lg shadow-lg mb-4">
        <h2 class="text-primary text-2xl font-bold">Add Expense</h2>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <select class="w-full md:w-64 p-2 mb-4 border border-text-secondary rounded">
          <option>Select Group</option>
        </select>
        <div className="relative w-full md:w-auto mb-4">
          <input
            type="text"
            placeholder="Enter a description"
            className="w-full md:w-64 p-2 pl-10 border border-gray-300 rounded focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faReceipt}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
          />
        </div>
        <div className="relative w-full md:w-auto mb-4">
          <input
            type="text"
            placeholder="Enter an amount"
            className="w-full md:w-64 p-2 pl-10 border border-gray-300 rounded focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faIndianRupeeSign}
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
          />
        </div>
        <div class="flex justify-between items-center">
          <button class="bg-accent  text-white p-2 rounded">Paid by</button>
          <button class="bg-secondary  text-white p-2 rounded">Split</button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
