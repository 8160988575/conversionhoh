import React, { useEffect, useState } from "react";
import "./css/TableComponent.css";
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos } from '../features/discount/DiscountSlice.js'


export const Discountshow = () => {

      
  const { todos, status, error } = useSelector((state) => state.discount);   
    const dispatch = useDispatch();
  
  const [fixedDiscountData, setFixedDiscountData] = useState([]);
  const [discountData, setData] = useState([]);
  const [search, setsearch] = useState("");

  const [check, setcheck] = useState("")


const [paginationbuttons, setpaginationbuttons] = useState([])

const [currentPage, setCurrentPage] = useState(1);
const [rowsPerPage, setRowsPerPage] = useState(3);


  useEffect(() => {
    console.log("this use effect got called")
    if (status === 'idle') {
      dispatch(fetchTodos());      
      console.log("start use effect got called",todos)
    }
    

  }, []);

  useEffect(() => {
    // if (search) {
      console.log("at the searches")
    const updatedata = fixedDiscountData.filter((row) => {
      return Object.values(row)
        .toString()
        .toLowerCase()
        .includes(search?.toLowerCase());
    });
    setData(updatedata);
    setCurrentPage(1)
      
    // }
  }, [search]);

  useEffect(() => {
    console.log("todos use effect got called",todos)
    setFixedDiscountData(todos)
    // console.log("fixedDiscountData",fixedDiscountData)
    setData(todos)   
    
     console.log("check",check)
  }, [todos]);




  
  const [currentRows, setcurrentRows] = useState()
  const [totalPages, settotalPages] = useState()
  // pagination
useEffect(() => {

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  setcurrentRows(discountData.slice(indexOfFirstRow, indexOfLastRow));

  settotalPages(Math.ceil(discountData.length / rowsPerPage));
  

 
}, [search, discountData, currentPage, rowsPerPage]); 

const nextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1);
  }
  else if (currentPage == totalPages) {
    setCurrentPage(1)
    
  }
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
  else if (currentPage == 1) {
    setCurrentPage(totalPages)
    
  }
};

const goToPage = (pageNumber) => {
  setCurrentPage(pageNumber);
};



  
  useEffect(() => {
    // console.log("hi at yup",currentPage)
    
    
  }, [currentPage])
  
  // useEffect(() => {
  //   let i = 1
  //   let ar = []
  //   while (i <= 3) {
  //     let vat = i
  //     console.log("hi");
  //     ar.push(  <button
  //     id={i}
      
  //       onClick={(e) => {
  //         setCurrentPage(e.target.id)
  //         console.log("clicked",currentPage,vat)
          
  //       }}
  //       className={`join-item btn ${currentPage == vat ? 'btn-active':''}`}
  //     >
  //       {i}
  //     </button>)
  //     i++
  //   }
  //   setpaginationbuttons(ar)
  //   console.log("at the paginatio")
  // }, [])


  const getbuton = () => {
      let i = 1
    let ar = []
    ar.push(<button className="join-item btn" onClick={prevPage}> Prev  </button>)
    while (i <= totalPages) {
      let vat = i
      console.log("hi");
      ar.push(  <button
      id={i}
      
        onClick={(e) => {
          setCurrentPage(e.target.id)
          console.log("clicked",currentPage,vat)
          
        }}
        className={`join-item btn ${currentPage == vat ? 'btn-active':''}`}
      >
        {i}
      </button>)

      i++
    }
    ar.push(<button className="join-item btn" onClick={nextPage}> Next  </button>)
    // console.log("at the paginatio")
    return ar 
    
  }
  
  


  return (
    <div>
      <div className="table-container">
        <div className="my-4">
          <input
            className="border-none rounded-xl p-3"
            placeholder="Search here.."
            type="text"
            name="search"
            value={search}
            onChange={(e) => {
              return setsearch(e.target.value);
            }}
          />
        </div>
        <p>{check}</p>
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
          <div className="join flex justify-center"
          >{
             ...getbuton()
            }</div>
            {`current page is ${currentPage}`}
        </div>

        {/* <div className="pagination my-10">
          <div className="join flex justify-center">
            <button
              className={`join-item btn ${currentPage == 1 && "btn-active"}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            <button
              className={`join-item btn ${currentPage == 2 && "btn-active"}`}
              onClick={() => setCurrentPage(2)}
            >
              2
            </button>
            <button
              className={`join-item btn ${currentPage == 3 && "btn-active"}`}
              onClick={() => setCurrentPage(3)}
            >
              3
            </button>
            <button className="join-item btn">4</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};
