let titles = document.querySelectorAll(".card .title");
let listItems = document.querySelectorAll("ul li");
let currTimeElements = document.querySelectorAll(".card h1");
let prevTimeElements = document.querySelectorAll(".card p");

listItems.forEach((li) => {
  li.addEventListener("click", function () {
    listItems.forEach((li) => {
      li.classList.remove("active");
    });
    this.classList.add("active");
    let dataTime = this.dataset.time;
    data(dataTime);
  });
});

function data(dataTime) {
  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", "data.json");
  myRequest.send();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let jsonData = JSON.parse(this.responseText);
      for (let i = 0; i < jsonData.length; i++) {
        titles[i].innerHTML = jsonData[i]["title"];
        currTimeElements[i].innerHTML = `${
          jsonData[i]["timeframes"][`${dataTime}`]["current"]
        }hrs`;
        let quote;
        dataTime === "daily"
          ? (quote = "Yesterday")
          : dataTime === "weekly"
          ? (quote = "Last Week")
          : (quote = "Last Month");
        prevTimeElements[i].innerHTML = `${quote} - ${
          jsonData[i]["timeframes"][`${dataTime}`]["previous"]
        }hrs`;
      }
    }
  };
}

window.onload = listItems[0].click();
