// https://randomuser.me/api/?results=5000
async function fetchData() {
  try {
    response = await fetch("https://randomuser.me/api/?results=5000", {
      method: "GET",
    });
    // console.log(response);
    if (response.ok) {
      let data = await response.json();
      //   console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    return new Error("data could not be fetched, error: " + error);
  }
}

let tbody = document.getElementById("table-body");
async function renderData() {
  try {
    let users = await fetchData();
    let tableData = users?.results?.slice(0, 10);
    // let tableData = users.results;
    console.log(tableData);
    let column = ["name", "gender", "country", "email", "dob", "age", "button"];
    tableData?.forEach((val, idx) => {
      let row = document.createElement("tr");
      for (let col of column) {
        let td = document.createElement("td");
        if (col === "name") {
          td.textContent = val["name"]["first"];
        } else if (col === "dob") {
          td.textContent = new Date(val[col]["date"]).toJSON().slice(0, 10);
        } else if (col === "age") {
          td.textContent = val["dob"][col];
        } else if (col === "country") {
          td.textContent = val["location"][col];
        } else if (col === "button") {
          let input = document.createElement("input");
          input.setAttribute("type", "button");
          input.setAttribute("value", "Delete row");
          input.setAttribute("onclick", "DeleteRowFunction(this)");
          input.setAttribute("class", "btn");
          td.appendChild(input);
        } else {
          td.textContent = val[col];
        }
        row.append(td);
      }
      tbody.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
}
renderData();
function DeleteRowFunction(event) {
  //   console.log(event);
  let td = event.parentNode;
  //   console.log(td);
  let tr = td.parentNode; // the row to be removed
  tr.parentNode.removeChild(tr);
}

const submitBtn = document.querySelector("form");
submitBtn.addEventListener("submit", function (event) {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target).entries());
  const tbody = document.getElementById("table-body");
  let tr = document.createElement("tr");
  console.log(data);
  console.log(Object.values(data));
  Object.values(data).forEach((val, idx) => {
    let td = document.createElement("td");
    td.textContent = val;
    tr.appendChild(td);
  });
  let td = document.createElement("td");
  let input = document.createElement("input");
  input.setAttribute("type", "button");
  input.setAttribute("value", "Delete row");
  input.setAttribute("onclick", "DeleteRowFunction(this)");
  input.setAttribute("class", "btn");
  td.appendChild(input);
  tr.appendChild(td);
  tbody.appendChild(tr);
  submitBtn.reset();
});
