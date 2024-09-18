import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adddiscount,
  deletediscount,
  fetchTodos,
  todohandle,
  updateTodo,
} from "../features/discount/DiscountSlice";
import { Bounce, toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { useFieldArray, useForm } from "react-hook-form";
import { addorder } from "../features/orders/OrderSlice";

const defaultData = {
  name: "harsh new",
  number: "8160988575",
  total_amount: "55",
  payment_type: "online", // Options: "online", "offline", "mix"
  product_status: "deliverd",
  payment_status: "paid",
  delivery_date: "2024-08-17",
  departments: [
    { product_name: "Product A", product_price: "50" },
    { product_name: "Product B", product_price: "30" },
    { product_name: "Product c", product_price: "30" }
  ]
};

export const Addordermodal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [departments, setDepartments] = useState([{ product_name: "", product_price: "" }]);


  const { todo } = useSelector((state) => state.discount);

  const modalRef = useRef(null);

  const {  register, handleSubmit, control, unregister, setValue ,reset } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "departments",
  });


  useEffect(() => {
    reset(defaultData);
  }, [reset]);

 
  const addDepartment = () => {
    append({ product_name: "", product_price: "" });
  };

  const removeDepartment = (index) => {
    unregister(`departments[${index}].product_name`);
    unregister(`departments[${index}].product_price`);
    remove(index);
  };

  const onSubmit = async (data) => {
   
    dispatch(addorder({...data,products:data.departments}))

    console.log("Form Submitted:", data);
  };


  return (
    <div>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div
              ref={modalRef}
              className="bg-white rounded-lg md:w-1/2 h-5/6 p-6 relative shadow-lg overflow-y-auto scrollbar-hide"
            >
              <div className="flex justify-between">
                <p
                  className="pointer-cursor"
                  onClick={() => {
                    setIsOpen(false);
                    dispatch(todohandle({}));
                  }}
                >
                  <MdOutlineCloseFullscreen />
                </p>
                <p
                  onClick={() => {
                    dispatch(deletediscount(todo));
                    setIsOpen(false);
                  }}
                >
                  <MdDelete />
                </p>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-2 my-3 md:mx-5 md:my-5"
              >
                {/* Name Field */}
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Name"
                    required
                  />
                </div>

                {/* Number Field */}
                <div className="mb-5">
                  <label
                    htmlFor="number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Number
                  </label>
                  <input
                    type="text"
                    id="number"
                    {...register("number", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="Mobile Number"
                    required
                  />
                </div>

                {/* Total Amount Field */}
                <div className="mb-5">
                  <label
                    htmlFor="total_amount"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Amount
                  </label>
                  <input
                    type="text"
                    id="total_amount"
                    {...register("total_amount", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="55"
                    required
                  />
                </div>

                {/* Payment Type Field */}
                <div className="mb-5">
                  <label
                    htmlFor="payment_type"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Payment Type
                  </label>
                  <select
                    id="payment_type"
                    {...register("payment_type", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="mix">Mix</option>
                  </select>
                </div>

                {/* Product Status Field */}
                <div className="mb-5">
                  <label
                    htmlFor="product_status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Status
                  </label>
                  <select
                    id="product_status"
                    {...register("product_status", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  >
                    <option value="inprocess">InProcess</option>
                    <option value="ready">ready</option>
                    <option value="deliverd">Deliverd</option>
                  </select>
                </div>

                {/* Payment Status Field */}
                <div className="mb-5">
                  <label
                    htmlFor="payment_status"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Payment Status
                  </label>
                  <select
                    id="payment_status"
                    {...register("payment_status", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  >
                    <option value="rest">Rest</option>
                    <option value="semipaid">SemiPaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>

                {/* Delivery Date Field */}
                <div className="mb-5">
                  <label
                    htmlFor="delivery_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Delivery Date
                  </label>
                  <input
                    type="date"
                    id="delivery_date"
                    {...register("delivery_date", { required: true })}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  />
                </div>

              

                <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Departments
        </label>

        {fields.map((field, index) => (
          <div key={field.id} className="mb-5 border p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <div className="mb-3">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Product Name
              </label>
              <input
                type="text"
                {...register(`departments[${index}].product_name`, { required: true })}
                defaultValue={field.product_name}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Product Price
              </label>
              <input
                type="text"
                {...register(`departments[${index}].product_price`, { required: true })}
                defaultValue={field.product_price}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Product Price"
                required
              />
            </div>

            {/* Delete Button */}
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
          </div>
        ))}


        {/* Add Button */}
        <button
          type="button"
          onClick={addDepartment}
          className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Add Department
        </button>
      </div>

              
                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
