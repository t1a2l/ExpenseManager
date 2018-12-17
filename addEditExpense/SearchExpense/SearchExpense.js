/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	var ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr"));
	var sortDate = 0; // sorting date acending/decnding variable
	var sortCategory = 0; // sorting category acending/decnding variable
	var sortPayment = 0; // sorting payment acending/decnding variable
	var sortTransaction = 0; // sorting transaction acending/decnding variable
	var itemChosen = 0;
	var DateChosen = 0;
	var CategoryChosen = 0;
	var PaymentChosen = 0;
	var TransactionChosen = 0;
	
	if(ExpensesArr == null)
	{
		alert("אין הוצאות כלל נא הוסף הוצאה חדשה במסך המתאים!");
		return;
	}
		
	function CategoryPopulate(){
		var k;
		var ChooseCategory = document.getElementById('InputCategory');
		var MyCategory = JSON.parse(localStorage.getItem("Category"));
		if(MyCategory == null) 
		{
			alert("גש להוספת קטגוריה חדשה ולאחר מכן חזור למסך זה!");
			return;
		}
		ChooseCategory.options[ChooseCategory.options.length] = new Option('בחר', 0);
		for(k = 0; k < MyCategory.length; k++) // take info from local storage and push to an array
		{
			ChooseCategory.options[ChooseCategory.options.length] = new Option(MyCategory[k], k+1);
		}
	}	
	
	function PaymentPopulate(){
		var s;
		var ChoosePayment = document.getElementById('InputPayment');
		var MyPayment = JSON.parse(localStorage.getItem("Payment"));
		if(MyPayment == null)
		{
			alert("גש להוספת אמצעי תשלום חדש ולאחר מכן חזור למסך זה!");
			return;
		}
		ChoosePayment.options[ChoosePayment.options.length] = new Option('בחר', 0);
		for(s = 0; s < MyPayment.length; s++) // take info from local storage and push to an array
		{
			ChoosePayment.options[ChoosePayment.options.length] = new Option(MyPayment[s], s+1);
		}
	}
	
	function DateSort(){ // sorting date acending/decnding 
		if(sortDate == 0)
		{
			SearchResults.sort(function(a, b){ 
				if(a.date > b.date) 
					return -1
				else if (a.date < b.date)
					return 1 
				else  
					return 0
			});
			ShowExpense(SearchResults);
			sortDate = 1;
		}
		else if(sortDate == 1)
		{
			SearchResults.sort(function(a, b){ 
				if(a.date > b.date) 
					return 1
				else if (a.date < b.date)
					return -1 
				else  
					return 0
			});
			ShowExpense(SearchResults);
			sortDate = 0;
		}
	}
	
	function CategorySort(){ // sorting category acending/decnding 
		if(sortCategory == 0)
		{
			SearchResults = SearchResults.sort(function(a, b){ 
				if(a.categoryName > b.categoryName) 
					return -1
				else if (a.categoryName < b.categoryName)
					return 1 
				else  
					return 0
			});
			ShowExpense(SearchResults);
			sortCategory = 1;
		}
		else if(sortCategory == 1)
		{
			SearchResults = SearchResults.sort(function(a, b){ 
				if(a.categoryName > b.categoryName) 
					return 1
				else if (a.categoryName < b.categoryName)
					return -1 
				else  
					return 0
			});
			ShowExpense(SearchResults);
			sortCategory = 0;
		}
	}
	
	function PaymentSort(){ // sorting payment acending/decnding
		if(sortPayment == 0)
		{
			SearchResults.sort(function(a, b){ 
				if(a.paymentName > b.paymentName) 
					return -1
				else if (a.paymentName < b.paymentName)
					return 1 
				else  
					return 0
			});
			ShowExpense(SearchResults);
			sortPayment = 1;
		}
		else if(sortPayment == 1)
		{
			SearchResults.sort(function(a, b){ 
				if(a.paymentName > b.paymentName) 
					return 1
				else if (a.paymentName < b.paymentName)
					return -1 
				else  
					return 0
			});
			ShowExpense(SearchResults);
			sortPayment = 0;
		}
	}
	
	function TransactionSort(){ // sorting transaction acending/decnding
		if(sortTransaction == 0)
		{
			SearchResults.sort(function(a, b){ 
				return a.transaction - b.transaction;
			});
			ShowExpense(SearchResults);
			sortTransaction = 1;
		}
		else if(sortTransaction == 1)
		{
			SearchResults.sort(function(a, b){
				return b.transaction - a.transaction;				
			});
			ShowExpense(SearchResults);
			sortTransaction = 0;
		}
	}
			
	function Search(){
		var start = document.getElementById("InputDateStart").value;
		var end = document.getElementById("InputDateEnd").value;
		
		if(start != "" && end == "")
		{
			alert("נא הכנס תאריך יעד!");
			return;
		}
		else if(start == "" && end != "")
		{
			alert("נא הכנס תאריך התחלה!");
			return;
		}
		else if(start != "" && end != "")
		{
			if(itemChosen == 0)
			{
				SearchResults = ExpensesArr.filter(function (el) {
					return el.date >= start && el.date <= end;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}	
			else
			{
				SearchResults = SearchResults.filter(function (el) {
					return el.date >= start && el.date <= end;
				});
				ShowExpense(SearchResults);
			}
		}
		
		if(document.getElementById("InputCategory").value != 0)
		{
			if(itemChosen == 0)
			{
				SearchResults = ExpensesArr.filter(function (el) {
				return 	el.categoryName == document.getElementById("InputCategory").options[document.getElementById("InputCategory").value].text;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}
			else
			{
				SearchResults = SearchResults.filter(function (el) {
				return 	el.categoryName == document.getElementById("InputCategory").options[document.getElementById("InputCategory").value].text;
				});
				ShowExpense(SearchResults);
			}
		}
		
		if(document.getElementById("InputPayment").value != 0)
		{
			if(itemChosen == 0)
			{
				SearchResults = ExpensesArr.filter(function (el) {
				return 	el.paymentName == document.getElementById("InputPayment").options[document.getElementById("InputPayment").value].text;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}
			else
			{
				SearchResults = SearchResults.filter(function (el) {
				return 	el.paymentName == document.getElementById("InputPayment").options[document.getElementById("InputPayment").value].text;
				});
				ShowExpense(SearchResults);
			}
		}
		if(document.getElementById("InputTransactionSum").value != "")
		{
			if(itemChosen == 0)
			{
				SearchResults = ExpensesArr.filter(function (el) {
				return 	el.transaction == document.getElementById("InputTransactionSum").value;
				});
				ShowExpense(SearchResults);
				itemChosen = 1;
			}
			else
			{
				SearchResults = SearchResults.filter(function (el) {
				return 	el.transaction == document.getElementById("InputTransactionSum").value;
				});
				ShowExpense(SearchResults);
			}
		}
		itemChosen = 0;
	}
	
	function ShowExpense(localExpenseArr){ // show expense table acoording to search results
		$("#ExpensesTableResults").html('');
		
		if(localExpenseArr == null)
			return;
		var ButtonsArray = ["תאריך", "קטגוריה", "אמצעי תשלום", "סכום עסקה", "הערות"];
		var val = 0;
		var tempArr = [];
		var table = $('<table></table>'); // create the expense table
		var MyCols = 6;
		
		var row = $('<tr></tr>');
		for(var k = 0; k < 4; k++)
		{
			var col = $('<td></td>');
			var addDivButton = $('<div id="divExpense"><button id="tableButton'+ k +'" class="tableButtonStyle">'+ ButtonsArray[k] +'</button></div>');
			col.append(addDivButton);
			row.append(col);
		}
		var col = $('<td></td>');
		var addDivTitle = $('<div id="divExpense4"><label id="commentsTitle" class="commentsTitleStyle">'+ ButtonsArray[4] +'</label></div>');
		col.append(addDivTitle);
		row.append(col);
		table.append(row);
		
		for(var i = 0; i < localExpenseArr.length; i++)
		{
			tempArr[0] = localExpenseArr[val].date;
			tempArr[1] = localExpenseArr[val].categoryName;
			tempArr[2] = localExpenseArr[val].paymentName;
			tempArr[3] = localExpenseArr[val].transaction;
			tempArr[4] = localExpenseArr[val].comment;
			if(tempArr[4] == undefined)
				tempArr[4] = "";
			tempArr[0] = formattedDate(tempArr[0]);
			
			var row = $('<tr id="row' + val + '"></tr>');
			for(var j = 0; j < MyCols - 1; j++)
			{
				var col = $('<td></td>');
				var addDiv = $('<div id="divExpense' + val + "_" + j + '" class="divExpenseStyle">'+ tempArr[j] +'</div>');
				col.append(addDiv);
				row.append(col);
			}
			if(j == MyCols - 1)
			{
				var col = $('<td></td>');
				var addDiv = $('<div id="divEdit"><button id="EditButton'+ val +'" class="EditButtonStyle">שינוי</button></div>');
				col.append(addDiv);
				row.append(col);
			}
			
			table.append(row);
			val++;
			tempArr = [];
		}
		if(localExpenseArr.length == 0)
		{
			var row = $('<tr></tr>');
			var col = $('<td></td>');
			var addDiv = $('<div id="divNoResult" class="divNoResultStyle">לא נמצאו תוצאות!</div>');
			col.append(addDiv);
			row.append(col);
			table.append(row);
		}
		$('#ExpensesTableResults').append(table); 
	}
	
	function formattedDate(date) {
		var myDate = new Date(date);
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var year = myDate.getFullYear();
		return day + '/' + month + '/' + year;
	}
	
	function ClearChoices(){
		itemChosen = 0;
		document.getElementById("InputDateStart").value = ""; // clear start date
		document.getElementById("InputDateEnd").value = ""; // clear end date
		document.getElementById("InputCategory").value = "0"; // clear category choice
		document.getElementById("InputPayment").value = "0"; // clear payment choice
		document.getElementById("InputTransactionSum").value = ""; // clear transaction
	}
	
	
	function EditName(id){ // edit categories/payment - create save, delete and abort buttons and input
		var i = id.replace( /^\D+/g, '');
		var row =  document.getElementById("row" + i);
		var add = row.insertCell(6);
		
		var addinput = document.createElement("input"); // input for changing element
		addinput.setAttribute("id", "input" + i);
		addinput.setAttribute("class", "inputStyle");
		add.appendChild(addinput);
		
		var addselect = document.createElement("select");// save the element form the input
		addselect.setAttribute("id", "selectOption" + i);
		addselect.setAttribute("name", "selectAnOption");
		addselect.options[addselect.options.length] = new Option('בחר', 0);
		addselect.options[addselect.options.length] = new Option('תאריך', 1);
		addselect.options[addselect.options.length] = new Option('קטגוריה', 2);
		addselect.options[addselect.options.length] = new Option('אמצעי תשלום', 3);
		addselect.options[addselect.options.length] = new Option('סכום עסקה', 4);
		addselect.options[addselect.options.length] = new Option('הערות', 5);
		addselect.setAttribute("class", "selectStyle");
		add.appendChild(addselect);
		
		var addbutton1 = document.createElement("button");// save the element form the input
		addbutton1.setAttribute("id", "buttonSave");
		addbutton1.setAttribute("name", "Save" + i);
		addbutton1.innerHTML = "שמור";
		addbutton1.setAttribute("class", "buttonSaveStyle");
		add.appendChild(addbutton1);
				
		var addbutton2 = document.createElement("button"); // delete current element
		addbutton2.setAttribute("id", "buttonDelete");
		addbutton2.setAttribute("name", "Delete" + i);
		addbutton2.innerHTML = "מחק";
		addbutton2.setAttribute("class", "buttonDeleteStyle");
		add.appendChild(addbutton2);
		
		var addbutton3 = document.createElement("button"); // abort editing action
		addbutton3.setAttribute("id", "buttonAbort");
		addbutton3.setAttribute("name", "Abort" + i);
		addbutton3.innerHTML = "בטל";
		addbutton3.setAttribute("class", "buttonAbortStyle");
		add.appendChild(addbutton3);
		disableButtons();	
	}
		
	function Save(MyName){ // save category/payment element change
		var placeInExpenseArr;
		var placeInResult = MyName.replace( /^\D+/g, '');
		ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr"));
		var inputID = "input" + placeInResult;
		input = document.getElementById(inputID).value;
		var selectID = "selectOption" + placeInResult;
		selectOption = document.getElementById(selectID).value;
		if(selectOption == 0)
		{
			alert("לא נבחרה אפשרות שינוי!");
			return;
		}
		if(input == "" && selectOption == 5)
		{
			if(confirm('הוזן ערך ריק האם אתה בטוח שאתה מעוניין להמשיך?') == false)
				return;
		}
		else if(input == "" && selectOption != 5)
		{
			alert("לא הוזן ערך!");
			return;
		}
		
		var ResultName = optionChoice(selectOption);
		
		if(ResultName == "transaction")
		{
			if(isNaN(input) == false)
			{
				if(input <= 0)
				{
					alert("נא להזין ערך גדול מאפס!");
					return;
				}
			}
			else
			{
				alert("לא הוזן מספר!");
				return;
			}
		}
		
		for(var i = 0; i < ExpensesArr.length; i++)
		{
			if(SearchResults[placeInResult].number == ExpensesArr[i].number)
			{
				placeInExpenseArr = i;
				break;
			}
		}
		ExpensesArr[placeInExpenseArr][ResultName] = input;
		localStorage.setItem("ExpensesArr", JSON.stringify(ExpensesArr)); // save in local storage
		SearchResults[placeInResult][ResultName] = input;
		ShowExpense(SearchResults);
		Abort(MyName);
		ShowExpense(SearchResults);
		alert("השינוי בוצע!");
	}
	
	function optionChoice(selectOption){
		if(selectOption == 1)
			return "date";
		if(selectOption == 2)
			return "categoryName";
		if(selectOption == 3)
			return "paymentName";
		if(selectOption == 4)
			return "transaction";
		if(selectOption == 5)
			return "comment";
	}
	
	function Delete(MyName){ // delete current element
		var placeInExpenseArr;
		ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr"));
		var placeInResult = MyName.replace( /^\D+/g, '');
		for(var i = 0; i < ExpensesArr.length; i++)
		{
			if(SearchResults[placeInResult].number == ExpensesArr[i].number)
			{
				placeInExpenseArr = i;
				break;
			}
		}	
		ExpensesArr.splice(placeInExpenseArr,1);
		localStorage.setItem("ExpensesArr", JSON.stringify(ExpensesArr)); // save in local storage
		SearchResults.splice(placeInResult, 1);
		ShowExpense(SearchResults);
		Abort(MyName);
		ShowExpense(SearchResults);
	}
	
	function Abort(MyName){ // abort editing and clear buttons and input textbox
		var Abort = document.getElementsByName(MyName);
		var i = MyName.replace( /^\D+/g, '');
		var saveName = "Save" + i;
		var deleteName = "Delete" + i;
		var inputID = "input" + i;
		var selectID = "selectOption" + i;
		var Save = document.getElementsByName(saveName);
		var Delete = document.getElementsByName(deleteName);
		var Input = document.getElementById(inputID);
		var Select = document.getElementById(selectID);
		$(Save).remove();
		$(Delete).remove();
		$(Abort).remove();
		$(Input).remove();
		$(Select).remove();
		enableButtons();
	}
		
	function disableButtons(){ // disable all buttons when editing item
		document.getElementById("InputDateStart").disabled = true;
		document.getElementById("InputDateEnd").disabled = true;
		document.getElementById("InputCategory").disabled = true;
		document.getElementById("InputPayment").disabled = true;
		document.getElementById("InputTransactionSum").disabled = true;
		document.getElementById("Search").disabled = true;
		document.getElementById("Clean").disabled = true;
		document.getElementById("BackButton").disabled = true;
		var hlink = document.getElementById("BackLink"); // css make grey
		hlink.disabled = true;
		hlink.href = "#";
		var numOfChangeButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfChangeButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = true;
		}
		var numOfSortButtons = $("#divExpense > button").length;
		for(var j = 0; j < numOfSortButtons; j++)
		{
			document.getElementById("tableButton" + j).disabled = true;
		}
		
	}
	
	function enableButtons(){ // enable all buttons when finishing editing an item
		document.getElementById("InputDateStart").disabled = false;
		document.getElementById("InputDateEnd").disabled = false;
		document.getElementById("InputCategory").disabled = false;
		document.getElementById("InputPayment").disabled = false;
		document.getElementById("InputTransactionSum").disabled = false;
		document.getElementById("Search").disabled = false;
		document.getElementById("Clean").disabled = false;
		document.getElementById("BackButton").disabled = false;
		var hlink = document.getElementById("BackLink");
		hlink.disabled = false;
		hlink.href = "javascript:history.back()";
		var numOfChangeButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfChangeButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = false;
		}
		var numOfSortButtons = $("#divExpense > button").length;
		for(var j = 0; j < numOfSortButtons; j++)
		{
			document.getElementById("tableButton" + j).disabled = false;
		}
	}
	
	function changeToDate(id){
		var i = id.replace( /^\D+/g, '');
		var inputID = "input" + i;
		document.getElementById(inputID).type = 'date';
	}
	
	function changeToInput(id){
		var i = id.replace( /^\D+/g, '');
		var inputID = "input" + i;
		document.getElementById(inputID).type = 'input';
	}
			
	$("document").ready(function() {
		CategoryPopulate();
		PaymentPopulate();
		$("#Search").click(function(){ // search for expenses
			Search();
		});
		
		$("#Clean").click(function(){ // search for expenses
			ClearChoices();
		});
		
		$(document).on("click", "#tableButton0", function(){
			DateSort();
		});
		
		$(document).on("click", "#tableButton1", function(){
			CategorySort();
		});
		
		$(document).on("click", "#tableButton2", function(){
			PaymentSort();
		});
		
		$(document).on("click", "#tableButton3", function(){
			TransactionSort();
		});
		
		$(document).on("click", "#tableButton4", function(){
			CommentsSort();
		});
		
		$(document).on("click", "#divEdit", function(){ // edit category/payment button
			var id = $(this).children("button").attr("id");
			EditName(id);
		});
	
		$(document).on("click", "#buttonSave", function(){ // save new category/payment button
			var MyName = $(this).attr("name");
			Save(MyName);
		});
		
		$(document).on("click", "#buttonDelete", function(){ // delete category/payment button
			var MyName = $(this).attr("name");
			Delete(MyName);
		});
		
		$(document).on("click", "#buttonAbort", function(){ // abort editing category/payment button
			var MyName = $(this).attr("name");
			Abort(MyName);
		});
		
		$(document).on("change", ".selectStyle", function(){
			var id = $(this).attr("id");
			if($(this).prop("selectedIndex") == 1)
				changeToDate(id);
			else
				changeToInput(id);
		});
		
	});	
	
}());



