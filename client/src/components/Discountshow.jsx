import React, { useEffect, useState } from "react";
import "./css/TableComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/discount/DiscountSlice.js";

export const Discountshow = () => {
  const { todos, status, error } = useSelector((state) => state.discount);
  const dispatch = useDispatch();

  const [fixedDiscountData, setFixedDiscountData] = useState([]);
  const [discountData, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [check, setcheck] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentRows, setcurrentRows] = useState();
  const [totalPages, settotalPages] = useState();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    discount_type: "",
    email: "",
    reference_name: "",
    reference_number: "",
    current_use: false,
    self_giving: false,
  });

  const [defaultref, setdefaultref] = useState({
    name: "Owner",
    number: "1234567891",
  });

  // pagination
  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    setcurrentRows(discountData.slice(indexOfFirstRow, indexOfLastRow));

    settotalPages(Math.ceil(discountData.length / rowsPerPage));
    console.log("pagination called");
  }, [search, discountData, currentPage, rowsPerPage]);

  useEffect(() => {
    console.log("this use effect got called");
    if (status === "idle") {
      dispatch(fetchTodos());
      console.log("start use effect got called", todos);
    }
  }, []);

  useEffect(() => {
    console.log("todos use effect got called", todos);
    setFixedDiscountData(todos);
    setData(todos);
    console.log("check", check);
  }, [todos]);

  const searchhandle = (e) => {
    console.log("at the searches");
    const updatedata = fixedDiscountData.filter((row) => {
      return Object.values(row)
        .toString()
        .toLowerCase()
        .includes(e.target.value?.toLowerCase());
    });
    setsearch(e.target.value);
    setData(updatedata);
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    const { id, value } = e.target; // Destructure to get field id and its value
    setFormData((prevData) => ({
      ...prevData, // Spread the previous data
      [id]: value, // Update the specific field
    }));

    // console.log({...formData,[id]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Here, you can handle the form submission, such as sending the data to the server
    const finaldata = await fetch(
      `${import.meta.env.VITE_APP_BASE_URL}/discount/adddiscount`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      }
    );
    console.log(await finaldata.json());
    dispatch(fetchTodos());
    setFormData({
      name: "",
      number: "",
      discount_type: "",
      email: "",
      reference_name: "",
      reference_number: "",
      current_use: false,
      self_giving: false,
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage == totalPages) {
      setCurrentPage(1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentPage == 1) {
      setCurrentPage(totalPages);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getbuton = () => {
    let i = 1;
    let ar = [];
    ar.push(
      <button className="join-item btn" onClick={prevPage}>
        {" "}
        Prev{" "}
      </button>
    );
    while (i <= totalPages) {
      let vat = i;
      console.log("hi");
      ar.push(
        <button
          id={i}
          onClick={(e) => {
            setCurrentPage(e.target.id);
            console.log("clicked", currentPage, vat);
          }}
          className={`join-item btn ${currentPage == vat ? "btn-active" : ""}`}
        >
          {i}
        </button>
      );

      i++;
    }
    ar.push(
      <button className="join-item btn" onClick={nextPage}>
        {" "}
        Next{" "}
      </button>
    );
    // console.log("at the paginatio")
    return ar;
  };

  return (
    <div>
      <div className="table-container">
        <div className="my-4 flex justify-between">
          <input
            className="rounded-xl w-1/3 px-2 sm:text-xs md:text-lg "
            placeholder="Search here.."
            type="text"
            name="search"
            value={search}
            onChange={searchhandle}
          />

          <label htmlFor="" className="btn text-white bg-slate-700">
            Add Discount
          </label>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("number")}>Number</th>
              <th onClick={() => handleSort("Discount_type")}>Discount_type</th>
              <th onClick={() => handleSort("status")}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.number}</td>
                <td>{row.Discount_type}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination my-10">
          <div className="join flex justify-center">{...getbuton()}</div>
          {`current page is ${currentPage}`}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mx-2 my-3 md:mx-0">
        <div>
          <h1 className=" hidden text-2xl flex justify-center mb-5 font-bold popins">
            Add Discount
          </h1>
        </div>
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
            value={formData.name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="John Doe"
            required
          />
        </div>

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
            value={formData.number}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="1234567890"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="discount_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Discount Type
          </label>
          <input
            type="text"
            id="discount_type"
            value={formData.discount_type}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Discount Type"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            type="checkbox"
            id="currentuse"
            value={formData.current_use}
            onChange={() =>
              setFormData({ ...formData, current_use: !formData.current_use })
            }
            className="shadow-sm mb-2"
            placeholder="CurrentUse"
          />{" "}
          <label
            htmlFor="refname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Currently Use
          </label>
        </div>

        <div className="flex gap-3">
          <input
            type="checkbox"
            id="selfgiving"
            value={formData.self_giving}
            onChange={() => {
              setFormData({
                ...formData,
                self_giving: !formData.self_giving,
                reference_name: !formData.self_giving ? defaultref.name : "",
                reference_number: !formData.self_giving
                  ? defaultref.number
                  : "",
              });
            }}
            className="shadow-sm mb-2"
            placeholder="Self Giving"
          />{" "}
          <label
            htmlFor="refname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Self Giving
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="reference_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reference Name
          </label>
          <input
            type="text"
            id="reference_name"
            value={formData.reference_name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Reference Name"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="reference_number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reference Number
          </label>
          <input
            type="text"
            id="reference_number"
            value={formData.reference_number}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Reference Number"
            required
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </div>
      </form>

    </div>
  );
};
