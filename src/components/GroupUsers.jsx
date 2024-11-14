import {
  faLink,
  faReceipt,
  faRemove,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import axios from "axios";
import React, { useContext, useState } from "react";
import { ApiConst, AppConst } from "../constants";
import { AuthContext } from "../context/AuthContext";

const GroupUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const { groupId } = useParams({ strict: false });

  const { token, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const callGetGroupDetailsApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.GROUP}/detail/${groupId}`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const { data, error } = useQuery({
    queryKey: ["groupDetail"],
    queryFn: () => callGetGroupDetailsApi(),
  });

  const callRemoveUserApi = async (userId = "") => {
    const URL = `${AppConst.BASE_URL}${ApiConst.DELETE_GROUP}/${groupId}/user/${userId}`;
    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const removeUserMutation = useMutation({
    mutationFn: ({ userId }) => callRemoveUserApi(userId),
    onSuccess: () => {},
    onError: (error, variables, context) => {
      // An error happened!
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    },
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDeleteUserClick = (event, userId) => {
    event.stopPropagation();

    removeUserMutation.mutate({ userId });
  };

  const handleAddExpenseButtonPress = () => {
    // Logic for adding expense
  };

  const handleDeleteButtonPress = () => {
    deleteGroupMutation.mutate();
  };

  const generateUniqueLink = (uniqueCode) => {
    return `${AppConst.BASE_URL}?join=${uniqueCode}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(generateUniqueLink(data?.group?.uniqueCode))
      .then(() => {
        setLinkCopied(true);
        setTimeout(() => {
          setLinkCopied(false);
        }, 2000); // Show message for 2 seconds
      });
  };

  const callDeleteGroupApi = async () => {
    const URL = `${AppConst.BASE_URL}${ApiConst.DELETE_GROUP}/${groupId}`;
    const response = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const deleteGroupMutation = useMutation({
    mutationFn: () => callDeleteGroupApi(),
    onSuccess: () => {
      navigate({ to: "/", replace: true });
    },
    onError: (error, variables, context) => {
      // An error happened!
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    },
  });

  return (
    <div className="bg-background min-h-screen p-6 relative">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 rounded">
        <h1 className="text-2xl font-bold text-primary">{"Group Users"}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search user"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full md:w-64 p-2 pl-10 border border-gray-300 rounded focus:outline-none"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
            />
          </div>
          <div
            className="flex items-center space-x-2 p-2 cursor-pointer"
            onClick={handleCopyLink}
          >
            <FontAwesomeIcon
              icon={faLink}
              size="lg"
              className="hover:text-accent text-green-500"
            />
          </div>
          <div
            className="flex items-center space-x-2 p-2 cursor-pointer"
            onClick={handleDeleteButtonPress}
          >
            <FontAwesomeIcon
              icon={faTrash}
              size="lg"
              className="hover:text-accent text-red-500"
            />
          </div>
        </div>
      </header>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.group?.users
          ?.filter((item) => item.name.includes(searchTerm))
          .map((userItem) => (
            <div key={userItem._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold truncate me-4">
                  {userItem.name}
                </h3>
                {userItem?._id != user?._id &&
                  user?._id === data?.group?.createdBy && (
                    <div
                      className="flex items-center space-x-2 p-2 cursor-pointer"
                      onClick={(event) =>
                        handleDeleteUserClick(event, userItem._id)
                      }
                    >
                      <FontAwesomeIcon icon={faRemove} />
                    </div>
                  )}
              </div>
              {userItem?.isOwed ? (
                <p className="text-success font-bold">
                  You are owed ₹{userItem?.amount}
                </p>
              ) : userItem?.amount ? (
                <p className="text-error font-bold">
                  You owe ₹{userItem?.amount}
                </p>
              ) : null}
            </div>
          ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
        <button
          className="bg-primary text-white py-4 px-6 rounded-full shadow-lg flex items-center justify-center"
          onClick={handleAddExpenseButtonPress}
        >
          <FontAwesomeIcon icon={faReceipt} size="lg" />
          <p className="text-white text-base font-bold ms-2">Add Expense</p>
        </button>
      </div>

      {/* Link Copied Message */}
      {linkCopied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default GroupUsers;
