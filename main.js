$(document).ready(function () {
  $(function () {
    $("#draggable").draggable({
      cursor: "move",
      containment: "window",
      refreshPositions: true,
    });
  });
});
$(".btn-minimize").click(function () {
  $(this).toggleClass("btn-plus");
  $(".boom").slideToggle("down");
});

document
  .querySelector(".new-item input")
  .addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();

      var itemNam = document.querySelector(".new-item input").value;
      if (itemNam != "") {
        var itemsStorag = localStorage.getItem("todo-items");
        if (itemsStorag) {
          var itemsAr = JSON.parse(itemsStorag);
        } else {
          var itemsAr = [];
        }
        itemsAr.push({ item: itemNam });
        saveItems(itemsAr);
        fetchItems();
        document.querySelector(".new-item input").value = "";
      }
    }
  });

document
  .querySelector(".new-item button")
  .addEventListener("click", function () {
    var itemName = document.querySelector(".new-item input").value;
    if (itemName != "") {
      var itemsStorage = localStorage.getItem("todo-items");
      if (itemsStorage) {
        var itemsArr = JSON.parse(itemsStorage);
      } else {
        var itemsArr = [];
      }
      itemsArr.push({ item: itemName });
      saveItems(itemsArr);
      fetchItems();
      document.querySelector(".new-item input").value = "";
    }
  });

document.querySelector("ul.todo-items").addEventListener("click", () => {
  var itemsListli = document.querySelectorAll("ul li");
  for (var i = 0; i < itemsListli.length; i++) {
    if (itemsListli[i].querySelector(".itemDelete")) {
      itemsListli[i]
        .querySelector(".itemDelete")
        .addEventListener("click", function () {
          var index = this.parentNode.parentNode.dataset.itemindex;
          itemDelete(index);
        });
    }
  }
});

function fetchItems() {
  const itemsList = document.querySelector("ul.todo-items");
  itemsList.innerHTML = "";
  var newItemHTML = "";
  try {
    var itemsStorage = localStorage.getItem("todo-items");
    var itemsArr = JSON.parse(itemsStorage);

    for (var i = 0; i < itemsArr.length; i++) {
      newItemHTML += `<li data-itemindex="${i}">
      <span class="item">${itemsArr[i].item}</span>
      <div><span class="itemDelete" style="cursor:pointer;">🗑</span></div>
      </li>`;
    }

    itemsList.innerHTML = newItemHTML;
  } catch (e) {}
}

fetchItems();

function itemDelete(index) {
  var itemsStorage = localStorage.getItem("todo-items");
  var itemsArr = JSON.parse(itemsStorage);

  itemsArr.splice(index, 1);

  saveItems(itemsArr);

  var delthis = document.querySelector(
    'ul.todo-items li[data-itemindex="' + index + '"]'
  );
  if (delthis) {
    delthis.remove();
  }
}

function saveItems(obj) {
  var string = JSON.stringify(obj);

  localStorage.setItem("todo-items", string);
}

function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    activeElTagName == "textarea" ||
    (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type) &&
      typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}

document.onmouseup =
  document.onkeyup =
  document.onselectionchange =
    function () {
      var activeE = document.activeElement;
      var activeElTagNam = activeE ? activeE.id.toLowerCase() : null;
      if (activeElTagNam !== "sel") {
        var str = getSelectionText();
        if (str !== "") {
          document.getElementById("sel").value = getSelectionText();
        }
      }
    };

function printit() {
  var itemsStorage = localStorage.getItem("todo-items");
  var itemsArr = JSON.parse(itemsStorage);
  window.jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF();
  if (itemsArr.length > 0) {
    doc.text(itemsArr[0].item, 10, 10);
    doc.save("a4.pdf");
  }
}

document.getElementById("okj").addEventListener("click", function () {
  printit();
});
