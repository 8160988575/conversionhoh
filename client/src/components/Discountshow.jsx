import React, { useState } from "react";
import { utils, writeFile } from "xlsx";
import './TableComponent.css';

export const Discountshow = () => {
  const initialData = [
    { name: "John Doe", number: "1234567890", email: "john@example.com", discount: "10%", reference: "Jane" },
    { name: "Alice Brown", number: "9876543210", email: "alice@example.com", discount: "20%", reference: "Bob" },
    { name: "Mike Johnson", number: "4567891234", email: "mike@example.com", discount: "5%", reference: "Sara" },
    { name: "Sara Smith", number: "6543217890", email: "sara@example.com", discount: "15%", reference: "Mike" },
    { name: "James Clark", number: "1472583690", email: "james@example.com", discount: "12%", reference: "Lisa" },
    { name: "Emily White", number: "9638527410", email: "emily@example.com", discount: "18%", reference: "John" },
    { name: "Lily Evans", number: "7418529630", email: "lily@example.com", discount: "22%", reference: "Kate" },
    { name: "Harry Potter", number: "8527419630", email: "harry@example.com", discount: "11%", reference: "Ron" },
  ];

  const [tableData, setTableData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [rowsPerPage] = useState(3); // Rows per page

  // Handle search filtering
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filteredData = initialData.filter((row) =>
      Object.values(row).some((val) =>
        val.toString().toLowerCase().includes(value.toLowerCase())
      )
    );
    setTableData(filteredData);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setTableData(sortedData);
  };

  // Handle export to Excel
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(tableData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Table Data");
    writeFile(workbook, "table_data.xlsx");
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-container">
      <h1 className="table-title">Searchable, Sortable, Paginated & Exportable Table</h1>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
        className="search-input"
      />

      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>

      <table className="custom-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("number")}>Number</th>
            <th onClick={() => handleSort("email")}>Email</th>
            <th onClick={() => handleSort("discount")}>Discount</th>
            <th onClick={() => handleSort("reference")}>Reference</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.number}</td>
              <td>{row.email}</td>
              <td>{row.discount}</td>
              <td>{row.reference}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => goToPage(index + 1)}
            className={currentPage === index + 1 ? "active-page" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

// export default TableComponent;
