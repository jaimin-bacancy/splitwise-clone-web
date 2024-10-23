import {
  faEdit,
  faEllipsisV,
  faLink,
  faPlus,
  faSearch,
  faTrash,
  faUser,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [groups, setGroups] = useState([
    { name: "Group 1", amount: 100, isOwed: true },
    { name: "Group 2", amount: 200, isOwed: false },
    { name: "Group 3", amount: 300, isOwed: true },
    { name: "Group 4", amount: 400, isOwed: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const [isJoinGroupModalOpen, setIsJoinGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [editGroupIndex, setEditGroupIndex] = useState(-1);
  const [popupVisible, setPopupVisible] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [joinGroupId, setJoinGroupId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const join = params.get("join");
    if (join) {
      setJoinGroupId(join);
      setIsJoinGroupModalOpen(true);
    }
  }, [location]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCreateGroup = () => {
    setGroups([...groups, { name: newGroupName, amount: 0, isOwed: false }]);
    setNewGroupName("");
    setIsCreateGroupModalOpen(false);
  };

  const handleUpdateGroup = () => {
    if (editGroupIndex > -1) {
      setGroups(
        groups.map((_, index) =>
          index === editGroupIndex
            ? { ...groups[index], name: newGroupName }
            : _
        )
      );
    }

    setNewGroupName("");
    setEditGroupIndex(-1);
    setIsCreateGroupModalOpen(false);
  };

  const handleJoinGroup = () => {
    // Logic for joining group
    setIsJoinGroupModalOpen(false);
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateUniqueLink = () => {
    return `http://localhost:3000/home?join=${uuidv4()}`;
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
      setPopupVisible(null);
      setTimeout(() => {
        setLinkCopied(false);
      }, 2000); // Show message for 2 seconds
    });
  };

  const handleDeleteGroup = (groupName) => {
    setGroups(groups.filter((group) => group.name !== groupName));
    setPopupVisible(null);
  };

  const handleEditGroup = (groupName) => {
    const index = groups.findIndex((group) => group.name === groupName);
    if (index > -1) {
      setEditGroupIndex(index);
    }

    setNewGroupName(groupName);
    setIsCreateGroupModalOpen(true);
    setPopupVisible(null);
  };

  const handleEllipsisClick = (event, groupName) => {
    const rect = event.target.getBoundingClientRect();
    const top = rect.top + window.scrollY + rect.height;
    const left = rect.left + window.scrollX;
    const isOverflowingRight = left + 160 > window.innerWidth;

    setPopupPosition({
      top,
      left: isOverflowingRight ? window.innerWidth - 160 - 16 : left,
    });
    setPopupVisible(popupVisible === groupName ? null : groupName);
  };

  const handleAddExpenseButtonPress = () => {
    // Logic for adding expense
  };

  const handleCreateGroupButtonPress = () => {
    setEditGroupIndex(-1);
    setNewGroupName("");
    setIsCreateGroupModalOpen(true);
  };

  const handleProfileButtonPress = () => {
    // Logic for profile
    navigate({ to: "/edit-profile" });
  };

  return (
    <div className="bg-background min-h-screen p-6 relative">
      {/* Header */}
      <header className="bg-white shadow p-4 mb-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 rounded">
        <h1 className="text-2xl font-bold text-primary">My Groups</h1>
        <div className="flex items-center space-x-4">
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              placeholder="Search groups"
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
            onClick={handleProfileButtonPress}
          >
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="hover:text-accent text-primary"
            />
          </div>
        </div>
      </header>

      {/* Groups List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGroups.map((group) => (
          <div key={group.name} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold truncate me-4">{group.name}</h3>
              <div
                className="flex items-center space-x-2 p-2 cursor-pointer"
                onClick={(event) => handleEllipsisClick(event, group.name)}
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
            </div>
            {group.isOwed ? (
              <p className="text-success font-bold">
                You are owed ₹{group?.amount}
              </p>
            ) : (
              <p className="text-error font-bold">You owe ₹{group?.amount}</p>
            )}
          </div>
        ))}
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
        <button
          className="bg-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={handleAddExpenseButtonPress}
        >
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
        <button
          className="bg-secondary text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          onClick={handleCreateGroupButtonPress}
        >
          <FontAwesomeIcon icon={faUserPlus} size="lg" />
        </button>
      </div>

      {/* Create Group Modal */}
      {isCreateGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">
                {editGroupIndex > -1 ? "Edit Group" : "Create Group"}
              </h2>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsCreateGroupModalOpen(false)}
              >
                <FontAwesomeIcon icon={faXmark} size="lg" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              disabled={!newGroupName}
              onClick={
                editGroupIndex > -1 ? handleUpdateGroup : handleCreateGroup
              }
              className="w-full bg-primary text-white p-2 rounded disabled:opacity-50"
            >
              {editGroupIndex > -1 ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}

      {/* Join Group Modal */}
      {isJoinGroupModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">Join Group</h2>
            <p className="mb-4">Do you want to join this group?</p>
            <div className="flex space-x-4">
              <button
                onClick={handleJoinGroup}
                className="w-full bg-primary text-white p-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => setIsJoinGroupModalOpen(false)}
                className="w-full bg-gray-500 text-white p-2 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Menu */}
      {popupVisible && (
        <div
          className="absolute bg-white shadow-lg rounded-lg p-2 w-40"
          style={{ top: popupPosition.top, left: popupPosition.left }}
        >
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 flex items-center"
            onClick={() => handleEditGroup(popupVisible)}
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Group
          </button>
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 flex items-center"
            onClick={() => handleCopyLink(generateUniqueLink())}
          >
            <FontAwesomeIcon icon={faLink} className="mr-2" /> Copy Link
          </button>
          <button
            className="w-full text-left px-2 py-1 hover:bg-gray-100 flex items-center text-red-600"
            onClick={() => handleDeleteGroup(popupVisible)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete Group
          </button>
        </div>
      )}

      {/* Link Copied Message */}
      {linkCopied && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-2 rounded">
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default Home;
