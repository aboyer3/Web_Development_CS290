    // Create table.
    var table = document.createElement('table');
    // Insert New Row for table at index '0'.
   	var header = document.createElement("tr");
     for(i=0; i < 4; i++){
    		var headerCell = document.createElement("th");
        headerCell.textContent = "header" + i;
        table.appendChild(headerCell);
    }

    for(i=0; i < 3; i++){

    	var row = document.createElement("tr");

      for(j=0; j < 4; j++){
      		var column = document.createElement("td");
          column.textContent = [j+1] + "," + [i+1];
          row.appendChild(column);
      }
     table.appendChild(row);
    }

    var div = document.body.appendChild(table);
    table.setAttribute("border","1");
    table.style.borderCollapse = "collapse";
    table.style.textAlign = "center";


    var x = 0;
    var y = 0;

    function sel(z,q){
      var search = div.rows[z].cells[q];
      search.style.borderWidth = "5px";
      search.style.borderStyle = "solid";
    };

    function unSel(z,q){
      var search = div.rows[z].cells[q];
      search.style.borderWidth = "1px";
      search.style.borderStyle = "solid";
    };

    sel(x,y);

    // Button  Creations
    var upButton = document.createElement("Button");
    upButton.textContent = "Up";
    document.body.appendChild(upButton);
    upButton.addEventListener("click", upFunc);

    var downButton = document.createElement("Button");
    downButton.textContent = "Down";
    document.body.appendChild(downButton);
    downButton.addEventListener("click", downFunc);

    var rightButton = document.createElement("Button");
    rightButton.textContent = "Right";
    document.body.appendChild(rightButton);
    rightButton.addEventListener("click", rightFunc);

    var leftButton = document.createElement("Button");
    leftButton.textContent = "Left";
    document.body.appendChild(leftButton);
    leftButton.addEventListener("click", leftFunc);

    var markButton = document.createElement("Button");
    markButton.textContent = "Mark Cell";
    document.body.appendChild(markButton);
    markButton.addEventListener("click", markFunc);

    //Button Functions
    function upFunc(){
      if(x > 0){
        unSel(x,y);
        x--;
        sel(x,y);
      }
    };
    function downFunc(){
      if(x < 2){
        unSel(x,y);
        x++;
        sel(x,y);
      }
    };
    function rightFunc(){
      if(y < 3){
        unSel(x,y);
        y++;
        sel(x,y);
      }
    };
    function leftFunc(){
      if(y > 0){
        unSel(x,y);
        y--;
        sel(x,y);
      }
    };

    function markFunc(){
      var search = div.rows[x].cells[y];
      search.style.backgroundColor = "yellow";
    }
