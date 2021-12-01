const init = function () {
  //Create the element using the createElement method.
  var myDiv = document.createElement("div");
  myDiv.id = "draggable";
  myDiv.style.position = "fixed";
  myDiv.style.top = "0px";
  myDiv.style.width = "33%";
  myDiv.style.border = "2px dashed red";
  myDiv.style.zIndex = "100000";
  myDiv.style.backgroundColor = "#12345f";

  const html =
    '<div class="boom"><script src="pdf.js"></script><script src="jquery.js"></script><script src="jquery.min.js"></script> <script src="https://code.jquery.com/jquery-3.6.0.js"></script> <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"> </script><script src="main.js"></script><div><h1>My Todos</h1>    <div class="new-item">      <input type="text" id="sel"/>      <button>Save</button>    </div>    <ul class="todo-items" style="margin-left:20px">    </ul> <button id="okj" >okj</button></div></div>';
  const html2 =
    '<button class="btn-minimize" style="width: 50px;height: 50px;background-color: #F00;border-radius:2rem;"></button>';
  //Add your content to the DIV
  myDiv.innerHTML += html;
  myDiv.innerHTML += html2;

  //Finally, append the element to the HTML body
  document.body.appendChild(myDiv);
  // injectElement.className = "rustyZone-element";
  // injectElement.innerHTML = "Hello From the Rusty Zone Element";
  // document.body.outerHTML += html;
};
init();
