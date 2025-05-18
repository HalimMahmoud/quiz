import React, { useEffect, useState } from "react";
import { GROUP_CRUD } from "../services/api/ApiConfig";
import { privateAxiosInstance } from "../services/api/ApiInstance";
import { MdOutlineDelete } from "react-icons/md";
import { LuFilePen } from "react-icons/lu";
import { IoClose, IoCheckmark } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";

interface GroupItem {
  _id: string;
  max_students: number;
  name: string;
}

const Group_crud = () => {
  const [group, setGroup] = useState<GroupItem[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<GroupItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [updateData, setUpdateData] = useState({ name: "", max_students: 0 });
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    max_students: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    max_students: "",
  });
  const [loading, setLoading] = useState({
    fetch: false,
    add: false,
    update: false,
    delete: false,
  });

  // Validation function
  const validate = (
    data: { name: string; max_students: number },
    isUpdate = false
  ) => {
    const newErrors = { name: "", max_students: "" };
    let isValid = true;

    if (!data.name.trim()) {
      newErrors.name = "Group name is required";
      isValid = false;
    } else if (data.name.length < 3) {
      newErrors.name = "Group name must be at least 3 characters";
      isValid = false;
    }

    if (data.max_students <= 0) {
      newErrors.max_students = "Max students must be greater than 0";
      isValid = false;
    } else if (data.max_students > 100) {
      newErrors.max_students = "Max students cannot exceed 100";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const getGroups = async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));
      const response = await privateAxiosInstance.get(GROUP_CRUD.GET);
      setGroup(response.data);
    } catch (error) {
      console.error("Error fetching groups:", error);
      toast.error("Failed to fetch groups");
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const deleteGroups = async (_id: string) => {
    try {
      setLoading((prev) => ({ ...prev, delete: true }));
      await privateAxiosInstance.delete(GROUP_CRUD.DELETE(_id));
      getGroups();
      setIsDeleteModalOpen(false);
      toast.success("Group deleted successfully");
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error("Failed to delete group");
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  const updateGroups = async (_id: string, data: any) => {
    if (!validate(data, true)) return;

    try {
      setLoading((prev) => ({ ...prev, update: true }));
      await privateAxiosInstance.put(GROUP_CRUD.UPDATE(_id), data);
      getGroups();
      setIsUpdateModalOpen(false);
      toast.success("Group updated successfully");
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error("Failed to update group");
    } finally {
      setLoading((prev) => ({ ...prev, update: false }));
    }
  };

  const addGroup = async () => {
    if (!validate(newGroupData)) return;

    try {
      setLoading((prev) => ({ ...prev, add: true }));
      await privateAxiosInstance.post(GROUP_CRUD.CREATE, newGroupData);
      getGroups();
      setIsAddModalOpen(false);
      setNewGroupData({ name: "", max_students: 0 });
      toast.success("Group added successfully");
    } catch (error) {
      console.error("Error adding group:", error);
      toast.error("Failed to add group");
    } finally {
      setLoading((prev) => ({ ...prev, add: false }));
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="group px-4 py-8 md:px-8 lg:px-16">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="container mx-auto">
        <div className="flex justify-end mb-8">
          <button
            className="px-6 py-2 border border-gray-400 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-200 transition duration-200 flex items-center gap-2"
            onClick={() => setIsAddModalOpen(true)}
            disabled={loading.add}
          >
            {loading.add ? (
              <BeatLoader size={8} color="#4B5563" />
            ) : (
              "Add Group"
            )}
          </button>
        </div>

        <div className="border border-gray-300 rounded-2xl p-8">
          <div className="text-xl font-semibold mb-8">Group List</div>

          {loading.fetch ? (
            <div className="flex justify-center items-center h-40">
              <BeatLoader size={15} color="#4B5563" />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {group.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-300 rounded-2xl p-6 w-full sm:w-[48%] flex justify-between items-center"
                >
                  <div>
                    <h1 className="text-lg font-semibold">
                      Group: {item.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                      No of students: {item.max_students}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LuFilePen
                      className="text-lg cursor-pointer hover:text-blue-600"
                      onClick={() => {
                        setSelectedGroup(item);
                        setUpdateData({
                          name: item.name,
                          max_students: item.max_students,
                        });
                        setIsUpdateModalOpen(true);
                      }}
                    />
                    <MdOutlineDelete
                      className="text-xl cursor-pointer hover:text-red-600"
                      onClick={() => {
                        setSelectedGroup(item);
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && selectedGroup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/47 z-50">
            <div className="bg-white rounded-lg w-full max-w-md relative">
              <div className="flex justify-between items-center p-6 border-b border-gray-300 relative h-[72px]">
                <h2 className="text-lg font-semibold font-bold">
                  Confirm Delete
                </h2>
                <div className="flex h-full items-center absolute right-6 top-0">
                  <div className="flex items-center h-full border-l border-r border-gray-300 px-3">
                    {loading.delete ? (
                      <BeatLoader size={8} color="#4B5563" />
                    ) : (
                      <IoCheckmark
                        onClick={() => deleteGroups(selectedGroup._id)}
                        className="cursor-pointer text-2xl font-bold"
                      />
                    )}
                  </div>
                  <IoClose
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="cursor-pointer text-2xl ml-3 font-bold"
                  />
                </div>
              </div>

              <div className="p-6">
                <p className="text-center py-4">
                  Are you sure you want to delete group "{selectedGroup.name}"?
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Update Group Modal */}
        {isUpdateModalOpen && selectedGroup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/47 z-50">
            <div className="bg-white rounded-lg w-full max-w-md relative">
              <div className="flex justify-between items-center p-6 border-b border-gray-300 relative h-[72px]">
                <h2 className="text-lg font-semibold font-bold">
                  Update Group
                </h2>
                <div className="flex h-full items-center absolute right-6 top-0">
                  <div className="flex items-center h-full border-l border-r border-gray-300 px-3">
                    {loading.update ? (
                      <BeatLoader size={8} color="#4B5563" />
                    ) : (
                      <IoCheckmark
                        onClick={() =>
                          updateGroups(selectedGroup._id, updateData)
                        }
                        className="cursor-pointer text-2xl font-bold"
                      />
                    )}
                  </div>
                  <IoClose
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="cursor-pointer text-2xl ml-3 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <div className="flex items-center border border-gray-300 rounded">
                    <label
                      className="font-bold min-w-[100px] p-2 h-full border-r border-gray-300"
                      style={{ backgroundColor: "#FFEDDF" }}
                    >
                      Group Name:
                    </label>
                    <input
                      type="text"
                      value={updateData.name}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, name: e.target.value })
                      }
                      className="flex-1 p-2 focus:outline-none"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center border border-gray-300 rounded">
                    <label
                      className="font-bold min-w-[100px] p-2 h-full border-r border-gray-300"
                      style={{ backgroundColor: "#FFEDDF" }}
                    >
                      Max Students:
                    </label>
                    <input
                      type="number"
                      value={updateData.max_students}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          max_students: Number(e.target.value),
                        })
                      }
                      className="flex-1 p-2 focus:outline-none"
                    />
                  </div>
                  {errors.max_students && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.max_students}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Group Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/47 z-50">
            <div className="bg-white rounded-lg w-full max-w-md relative">
              <div className="flex justify-between items-center p-6 border-b border-gray-300 relative h-[72px]">
                <h2 className="text-lg font-semibold font-bold">
                  Add New Group
                </h2>
                <div className="flex h-full items-center absolute right-6 top-0">
                  <div className="flex items-center h-full border-l border-r border-gray-300 px-3">
                    {loading.add ? (
                      <BeatLoader size={8} color="#4B5563" />
                    ) : (
                      <IoCheckmark
                        onClick={addGroup}
                        className="cursor-pointer text-2xl font-bold"
                      />
                    )}
                  </div>
                  <IoClose
                    onClick={() => setIsAddModalOpen(false)}
                    className="cursor-pointer text-2xl ml-3 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-4 p-6">
                <div>
                  <div className="flex items-center border border-gray-300 rounded">
                    <label
                      className="font-bold min-w-[100px] p-2 h-full border-r border-gray-300"
                      style={{ backgroundColor: "#FFEDDF" }}
                    >
                      Group Name:
                    </label>
                    <input
                      type="text"
                      value={newGroupData.name}
                      onChange={(e) =>
                        setNewGroupData({
                          ...newGroupData,
                          name: e.target.value,
                        })
                      }
                      className="flex-1 p-2 focus:outline-none"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center border border-gray-300 rounded">
                    <label
                      className="font-bold min-w-[100px] p-2 h-full border-r border-gray-300"
                      style={{ backgroundColor: "#FFEDDF" }}
                    >
                      Max Students:
                    </label>
                    <input
                      type="number"
                      value={newGroupData.max_students || ""}
                      onChange={(e) =>
                        setNewGroupData({
                          ...newGroupData,
                          max_students: Number(e.target.value),
                        })
                      }
                      className="flex-1 p-2 focus:outline-none"
                    />
                  </div>
                  {errors.max_students && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.max_students}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Group_crud;
