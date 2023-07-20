// Function to create a new table row
function createRow(ip, name, reason) {
    const tableBody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td contenteditable>${ip}</td>
      <td contenteditable>${name}</td>
      <td contenteditable>${reason}</td>
      <td>
        <button class="editBtn btn btn-primary">Edit</button>
        <button class="deleteBtn btn btn-danger">Delete</button>
      </td>
    `;
    tableBody.appendChild(newRow);
  }
  
  // Function to handle adding a new row
  function addRow() {
    createRow("192.168.0.1", "John Doe", "Sample Reason");
  }
  
  // Function to handle deleting a row
  function deleteRow(e) {
    const row = e.target.closest("tr");
    if (row) {
      row.remove();
    }
  }
  
  // Function to handle saving the table data to local storage
  function saveTableData() {
    const tableData = [];
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => {
      const [ip, name, reason] = row.querySelectorAll("td[contenteditable]");
      tableData.push({
        ip: ip.textContent.trim(),
        name: name.textContent.trim(),
        reason: reason.textContent.trim(),
      });
    });
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }
  
  // Function to load the table data from local storage
  function loadTableData() {
    const tableData = JSON.parse(localStorage.getItem("tableData"));
    if (tableData) {
      tableData.forEach(({ ip, name, reason }) => {
        createRow(ip, name, reason);
      });
    }
  }
  
  document.getElementById("addRowBtn").addEventListener("click", addRow);
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      deleteRow(e);
    }
  });
  
  document.addEventListener("input", saveTableData);
  
  // Load table data on page load
  loadTableData();
  