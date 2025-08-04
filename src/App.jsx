import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
const [employeeDetails, setEmployeeDetails] = useState([]);
const [pageNum, setPageNum] = useState(1);
const itemsPerPage = 10;

//calculate total pages
const totalPages = Math.ceil(employeeDetails.length / itemsPerPage);

const handlePrev = () => {
  if(pageNum > 1){
    setPageNum(pageNum - 1);
  }
}

const handleNext = () => {
  if(pageNum < totalPages){
    setPageNum(pageNum + 1);
  }
}

useEffect(() => {
  fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
  .then((response) => response.json())
  .then((details) => setEmployeeDetails(details))
  .catch((error) => alert("Error feching the details"));
}, []);

//calculate start and end index of the current page
const startIndex = (pageNum - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

//Slice the employee details for the current page
const currentEmployees = employeeDetails.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Employee Data Table</h2>
      <table>
        <tr style={{background: "#019879", padding: "12px", color: "white"}}>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", margin: "25px"}}>
        <button onClick={handlePrev}>Previous</button>
        <p>{pageNum}</p>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
