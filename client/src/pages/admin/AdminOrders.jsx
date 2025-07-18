import {
  Bell,
  CheckCircle,
  ChevronDown,
  Clock,
  Edit,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateTheOrder } from "../../features/admin/adminSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const {
    users,
    allOrders,
    allRatings,
    adminloading,
    adminError,
    adminErrorMessage,
  } = useSelector((state) => state.admin);

  const updateOrderStatus = (orderId, newStatus) => {
   dispatch(updateTheOrder({_id : orderId ,status : newStatus}))
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  useEffect(() => {
    if (allOrders.length == 0) {
      dispatch(getAllOrders());
    }
  }, []);

  return (
    <div className="ml-64 flex-1">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Orders Management
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border-gray-500 border-gray-500-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-gray-500-orange-500 outline-none"
                />
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Add Orders</span>
              </button>
              <Bell className="h-6 w-6 text-gray-600" />
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Order
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {allOrders.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Pending Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {allOrders.filter((item) => item.status === "pending").length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <Clock className="w-6 h-6 text-yellow-600 " />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Delivered Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {
                    allOrders.filter((item) => item.status === "delivered")
                      .length
                  }
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600 " />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Cancelled Orders
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {allOrders.filter((item) => item.status === "cancelled").length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-full">
                <X className="w-6 h-6 text-red-600 " />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white  rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-gray-500-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">All Oders</h2>
          <div className="flex items-center space-x-2">
            <select className="border-gray-500 border-gray-500-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select className="border-gray-500 border-gray-500-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>Sort by Date</option>
              <option>Sort by Name</option>
              <option>Sort by Orders</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ORDER ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CUSTOMER
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ITEMS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DATE
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {allOrders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {order._id}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap ">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {order.user.name[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {order.user.name}
                      </div>
                      <div className="text-sm text-gray-500">Customer</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.meal.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ₹{order.meal.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.user.phone}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium border-none focus:ring-2 focus:ring-orange-500 cursor-pointer${getStatusColor(
                        order.status
                      )} `}
                    >
                      <option value="pending">Pending</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Showing 1 to {allOrders.length} of {allOrders.length} results
        </span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-orange-500 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
