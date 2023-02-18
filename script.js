// Initialize array to store issued books
let issuedBooks = [];

// Get form and table elements
const form = document.querySelector("form");
const table = document.querySelector("table tbody");

// Function to add book to issuedBooks array and update table
function addIssuedBook(bookName, issuedTo) {
  const id = issuedBooks.length + 1;
  const issuedTime = new Date().toLocaleString();
  const book = { id, bookName, issuedTo, issuedTime, status: "not returned" };
  issuedBooks.push(book);

  // Update table
  const row = table.insertRow();
  row.innerHTML = `
    <td>${book.id}</td>
    <td>${book.bookName}</td>
    <td>${book.issuedTo}</td>
    <td>${book.issuedTime}</td>
    <td class="status" contenteditable="true">${book.status}</td>
  `;

  // Add event listener to status column for editing
  const statusCell = row.querySelector(".status");
  statusCell.addEventListener("blur", () => {
    const status = statusCell.textContent.trim().toLowerCase();
    if (status === "returned" || status === "not returned") {
      book.status = status;
      statusCell.style.color = status === "returned" ? "green" : "red";
    } else {
      statusCell.textContent = book.status;
    }
  });
}

// Handle form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookNameInput = form.elements["book-name"];
  const issuedToInput = form.elements["issued-to"];

  // Validate inputs
  if (bookNameInput.value.trim() && issuedToInput.value.trim()) {
    addIssuedBook(bookNameInput.value.trim(), issuedToInput.value.trim());
    bookNameInput.value = "";
    issuedToInput.value = "";
  }
});
