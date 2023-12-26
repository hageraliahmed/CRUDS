let allInput = document.body.querySelectorAll("input");
let title = document.querySelector(".title");
let priceData = document.querySelectorAll(".price-data");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let total = document.querySelector(".total");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let createBtn = document.querySelector(".submit");
let search = document.querySelector(".search");
let searchTitle = document.querySelector(".bytitle");
let searchcate = document.querySelector(".bycate");
let deleteAll = document.querySelector(".delete-all");
let mood = "create";
let num;
// let tbody = document.querySelector(".tbody");
// ---------- get Total
for (let i = 0; i < priceData.length; i++) {
  priceData[i].addEventListener("input", function () {
    if (price.value.length > 0) {
      total.textContent =
        parseInt(price.value) +
        parseInt(taxes.value || 0) +
        parseInt(ads.value || 0) -
        parseInt(discount.value || 0);

      total.style.cssText = "background-color:green";
    } else {
      total.textContent = "";
      total.style.cssText = "background-color:var(--btn-color);";
    }
  });
}

// --------------- create data
let dataArray;
if (localStorage.products != null) {
  dataArray = JSON.parse(window.localStorage.products);
} else {
  dataArray = [];
}
createBtn.addEventListener("click", function () {
  let contentData = {
    theTitle: title.value,
    thePrice: price.value,
    theTaxes: taxes.value,
    theAds: ads.value,
    theDiscount: discount.value,
    theTotal: total.innerHTML,
    theCount: count.value,
    theCate: category.value,
  };
  if (mood == "create") {
    for (let i = 0; i < parseInt(count.value || 1); i++) {
      dataArray.push(contentData);
    }
  } else {
    dataArray[num] = contentData;
    mood = "create";
    createBtn.innerHTML = "Create";
    count.style.display = "block";
  }
  window.localStorage.setItem("products", JSON.stringify(dataArray));
  title.focus();
  //   clear Data Fun
  clearData();

  //   READ DATA
  readData();
  // show delete all
  deleteAllItemsShow();
});

document.addEventListener("keydown", function (n) {
  if (n.keyCode == "13") {
    let contentData = {
      theTitle: title.value,
      thePrice: price.value,
      theTaxes: taxes.value,
      theAds: ads.value,
      theDiscount: discount.value,
      theTotal: total.innerHTML,
      theCount: count.value,
      theCate: category.value,
    };
    dataArray.push(contentData);
    window.localStorage.setItem("products", JSON.stringify(dataArray));
    title.focus();
    //   clear Data Fun
    clearData();

    //   READ DATA
    readData();
    // show delete all
    deleteAllItemsShow();
  }
});
// 000000000000 clearData
function clearData() {
  for (let i = 0; i < allInput.length; i++) {
    allInput[i].value = "";
    total.textContent = "";
    total.style.cssText = "background-color:var(--btn-color);";
  }
}
// read data
function readData() {
  let data = "";
  for (let i = 0; i < dataArray.length; i++) {
    data += `
          <tr>
            <td>${i}</td>
            <td>${dataArray[i].theTitle}</td>
            <td>${dataArray[i].thePrice}</td>
            <td>${dataArray[i].theTaxes}</td>
            <td>${dataArray[i].theAds}</td>
            <td>${dataArray[i].theDiscount}</td>
            <td>${dataArray[i].theTotal}</td>
            <td>${dataArray[i].theCate}</td>
            <td  ><button onclick=(updateItem(${i})) class="update">Update</button></td>
            <td  ><button onclick=(deleteItem(${i})) class="delete">Delete</button></td>
          </tr>`;
  }
  document.querySelector(".tbody").innerHTML = data;
}
readData();
// ----------- delete item

function deleteItem(n) {
  dataArray.splice(n, 1);
  localStorage.products = JSON.stringify(dataArray);
  readData();
  deleteAllItemsShow();
}
//  -------- delete all
function deleteAllItemsShow() {
  if (dataArray.length > 0) {
    deleteAll.style.display = "block";
    deleteAll.innerHTML = `(${dataArray.length})`;
  } else {
    deleteAll.style.display = "none";
  }
}
deleteAllItemsShow();

deleteAll.addEventListener("click", function () {
  dataArray = [];
  localStorage.clear();
  readData();
  deleteAllItemsShow();
});
// -----------
// Update Items
function updateItem(n) {
  title.value = dataArray[n].theTitle;
  price.value = dataArray[n].thePrice;
  taxes.value = dataArray[n].theTaxes;
  ads.value = dataArray[n].theAds;
  discount.value = dataArray[n].theDiscount;
  category.value = dataArray[n].theCate;
  getTotal();
  count.style.display = "none";
  createBtn.innerHTML = "Update";
  mood = "update";
  num = n;
}

function getTotal() {
  if (price.value.length > 0) {
    total.textContent =
      parseInt(price.value) +
      parseInt(taxes.value || 0) +
      parseInt(ads.value || 0) -
      parseInt(discount.value || 0);

    total.style.cssText = "background-color:green";
  } else {
    total.textContent = "";
    total.style.cssText = "background-color:var(--btn-color);";
  }
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}
// SEARCH
let searchMood = "title";
function searchby(cla) {
  if (cla == "bytitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
    search.value = "";
  } else {
    searchMood = "cate";
    search.placeholder = "Search By Category";
    search.value = "";
  }

  search.focus();
  readData();
}

search.addEventListener("keyup", function () {
  let data = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataArray.length; i++) {
      if (
        dataArray[i].theTitle.toLowerCase().startsWith(this.value.toLowerCase())
      ) {
        data += `
          <tr>
            <td>${i}</td>
            <td>${dataArray[i].theTitle}</td>
            <td>${dataArray[i].thePrice}</td>
            <td>${dataArray[i].theTaxes}</td>
            <td>${dataArray[i].theAds}</td>
            <td>${dataArray[i].theDiscount}</td>
            <td>${dataArray[i].theTotal}</td>
            <td>${dataArray[i].theCate}</td>
            <td  ><button onclick=(updateItem(${i})) class="update">Update</button></td>
            <td  ><button onclick=(deleteItem(${i})) class="delete">Delete</button></td>
          </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataArray.length; i++) {
      if (
        dataArray[i].theCate.toLowerCase().startsWith(this.value.toLowerCase())
      ) {
        data += `
          <tr>
            <td>${i}</td>
            <td>${dataArray[i].theTitle}</td>
            <td>${dataArray[i].thePrice}</td>
            <td>${dataArray[i].theTaxes}</td>
            <td>${dataArray[i].theAds}</td>
            <td>${dataArray[i].theDiscount}</td>
            <td>${dataArray[i].theTotal}</td>
            <td>${dataArray[i].theCate}</td>
            <td  ><button onclick=(updateItem(${i})) class="update">Update</button></td>
            <td  ><button onclick=(deleteItem(${i})) class="delete">Delete</button></td>
          </tr>`;
      }
    }
  }
  document.querySelector(".tbody").innerHTML = data;
});
