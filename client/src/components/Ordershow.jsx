import React, { useEffect, useRef, useState } from "react";
import "./css/TableComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/discount/DiscountSlice.js";
import './css/Discountshowcss.css'
import { ToastContainer, toast , Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchorder, updateSingleOrder } from "../features/orders/OrderSlice.js";
import { Addordermodal } from "./Addordermodal.jsx";

export const Ordershow = () => {
  const { order, status, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const [fixedDiscountData, setFixedDiscountData] = useState([]);
  const [discountData, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [check, setcheck] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentRows, setcurrentRows] = useState();
  const [totalPages, settotalPages] = useState();
  

  const [isOpen, setIsOpen] = useState(false);
  
  // pagination
  useEffect(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    setcurrentRows(discountData?.slice(indexOfFirstRow, indexOfLastRow));

    settotalPages(Math.ceil(discountData?.length / rowsPerPage));
    console.log("pagination called");
  }, [search, discountData, currentPage, rowsPerPage]);

  useEffect(() => {
    console.log("this use effect got called");
    if (status === "idle") {
      dispatch(fetchorder());
      console.log("start use effect got called", order);
    }
  }, []);

  useEffect(() => {

    console.log("yup use effect got called", order);
    setFixedDiscountData(order);
    setData(order);
    console.log("check", check);
  }, [order]);

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
      <ToastContainer />
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

          <label onClick={() => setIsOpen(true)} className="btn text-white bg-slate-700">
            Add Order
          </label>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("number")}>Number</th>
              <th onClick={() => handleSort("total_amount")}>Amount</th>
              <th onClick={() => handleSort("delivery_date")}>delivery_date</th>
            </tr>
          </thead>
          <tbody>
            {currentRows?.map((row, index) => (
              <tr key={index} onClick={()=>{dispatch(updateSingleOrder(row))
                setIsOpen(true)
              }}>
                <td>{row.name}</td>
                <td>{row.number}</td>
                <td>{row.total_amount}</td>
                <td>{row.delivery_date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination my-10">
          <div className="join flex justify-center">{...getbuton()}</div>
          {`current page is ${currentPage}`}
        </div>
      </div>
      {isOpen && (
        <p className="fixed top-10 right-10 bg-white z-500" onClick={() => setIsOpen(false)}>close</p>
      )}

    <Addordermodal isOpen={isOpen} setIsOpen={setIsOpen}/>

    </div>
  );
};
