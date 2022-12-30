fetch("http://localhost:3100/api/v1/data/bitcoin").then((res) => {
  res.json().then((data) => {
    console.log(data);
    if (data.status === "success") {
      const dataObject = data.data.data;
      var i = 1;
      var temp = "";
      Object.keys(dataObject).map((item) => {
        temp += `<tr>
        <td class="table__container-item">
          <h4 class="table-text">${i}</h4>
        </td>
        <td class="table__container-item">
          <h4 class="table-text">${dataObject[item].name}</h4>
        </td>
        <td class="table__container-item">
          <h4 class="table-text">₹ ${dataObject[item].last}</h4>
        </td>
        <td class="table__container-item">
          <h4 class="table-text">
            <span>₹ ${dataObject[item].buy} / ₹ ${dataObject[item].sell}</span>
          </h4>
        </td>
        <td class="table__container-item">
          <h4 class="table-text">${dataObject[item].volume}</h4>
        </td>
        <td class="table__container-item">
          <h4 class="table-text">${dataObject[item].base_unit}</h4>
        </td>
      </tr>`;
        i++;
        document.getElementById("data").innerHTML = temp;
      });
    }
  });
});
