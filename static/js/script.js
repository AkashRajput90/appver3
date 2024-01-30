// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
  // Update the event listeners for the close buttons after each click
  updateCloseListeners();
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  
  // Create checkbox for marking as done
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";

  // Create close button for removing the item
  var spanClose = document.createElement("SPAN");
  var txtClose = document.createTextNode("\u00D7");
  spanClose.className = "close";
  spanClose.appendChild(txtClose);

  // Append elements to the list item
  li.appendChild(checkbox);
  li.appendChild(t);
  li.appendChild(spanClose);

  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  // Add event listener for marking as done
  checkbox.addEventListener("change", function() {
    if (this.checked) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });

  // Add event listener for the close button
  spanClose.onclick = function() {
    var listItem = this.parentElement;
    listItem.style.display = "none"; // Hide the list item instead of removing it

    // Show undo option for 3 seconds
    showUndoOption(listItem);
  };
}

function showUndoOption(listItem) {
  var undoContainer = document.createElement("div");
  undoContainer.className = "undo-container";

  var undoText = document.createTextNode("Undo");
  var undoButton = document.createElement("button");
  undoButton.appendChild(undoText);

  undoContainer.appendChild(undoButton);
  document.body.appendChild(undoContainer);

  // Event listener for undo button
  undoButton.onclick = function() {
    listItem.style.display = ""; // Show the list item again
    undoContainer.style.display = "none"; // Hide the undo option
  };

  // Hide the undo option after 3 seconds
  setTimeout(function() {
    undoContainer.style.display = "none";
  }, 3000);
}

// Function to update event listeners for close buttons
function updateCloseListeners() {
  close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
