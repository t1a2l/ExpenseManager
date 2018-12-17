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
			SearchResults = ExpensesArr.sort(function(a, b){ 
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
			SearchResults = ExpensesArr.sort(function(a, b){ 
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
			SearchResults = ExpensesArr.sort(function(a, b){ 
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
			SearchResults = ExpensesArr.sort(function(a, b){ 
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
			SearchResults = ExpensesArr.sort(function(a, b){ 
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
			SearchResults = ExpensesArr.sort(function(a, b){ 
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
			SearchResults = ExpensesArr.sort(function(a, b){ 
				return a.transaction - b.transaction;
			});
			ShowExpense(SearchResults);
			sortTransaction = 1;
		}
		else if(sortTransaction == 1)
		{
			SearchResults = ExpensesArr.sort(function(a, b){
				return b.transaction - a.transaction;				
			});
			ShowExpense(SearchResults);
			sortTransaction = 0;
		}
	}
			
	function Filter(){
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
			if(document.getElementById("InputTransactionSum").value <= 0)
			{
				alert("הכנס סכום עסקה גדול מאפס!");
				return;
			}
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
		$("#ExpensesTable").html('');
		Sum = 0;
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
			if(tempArr[4] == undefined || tempArr[4] == "")
				tempArr[4] = " ";
			var Sum = Sum + Number(localExpenseArr[val].transaction);
			tempArr[0] = formattedDate(tempArr[0]);
			
			var row = $('<tr id="row' + val + '"></tr>');
			for(var j = 0; j < MyCols - 1; j++)
			{
				var col = $('<td></td>');
				var addDiv = $('<div id="divExpense' + val + "_" + j + '" class="divExpenseStyle">&nbsp;'+ tempArr[j] +'</div>');
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
		var row = $('<tr id="row' + (val + 1) + '"></tr>');
		table.append(row);
		$('#ExpensesTable').append(table);
		showSum(val, Sum);
	}
	
	function formattedDate(date) {
		var myDate = new Date(date);
		var month = myDate.getMonth() + 1;
		var day = myDate.getDate();
		var year = myDate.getFullYear();
		return day + '/' + month + '/' + year;
	}
	
	function showSum(val, Sum){
		var row = document.getElementById("row" + (val + 1));
		var addsumCaption = row.insertCell(0);
		row.insertCell(1);
		row.insertCell(2);
		var addsum = row.insertCell(3);
		var addlabel1 = document.createElement("label"); // input for changing element
		addlabel1.setAttribute("id", "ExpenseSumCaption");
		addlabel1.setAttribute("class", "ExpenseSumCaptionStyle");
		addlabel1.innerHTML = "סך הכל הוצאות:";
		addsumCaption.appendChild(addlabel1);
		var addlabel2 = document.createElement("label"); // input for changing element
		addlabel2.setAttribute("id", "ExpenseSum");
		addlabel2.setAttribute("class", "ExpenseSumStyle");
		addlabel2.innerHTML = Sum.toFixed(2);
		addsum.appendChild(addlabel2);
	}
		
	function ClearChoices(){
		itemChosen = 0;
		$("#ExpensesTable").html('');
		document.getElementById("InputDateStart").value = ""; // clear start date
		document.getElementById("InputDateEnd").value = ""; // clear end date
		document.getElementById("InputCategory").value = "0"; // clear category choice
		document.getElementById("InputPayment").value = "0"; // clear payment choice
		document.getElementById("InputTransactionSum").value = ""; // clear transaction
		ShowExpense(ExpensesArr);
	}
	
	$("document").ready(function() {
		CategoryPopulate();
		PaymentPopulate();
		ShowExpense(ExpensesArr);
		
		$("#Filter").click(function(){ // search for expenses
			Filter();
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
				
	});	
	
}());



