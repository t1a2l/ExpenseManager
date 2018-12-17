/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	var sortCategory = 0; // sorting category acending/decnding variable
	var sortPayment = 0; // sorting payment acending/decnding variable
	var SearchResults = []; // array from local storage
	var tableExist = 0; // while sorting don't fetch array from local storage
	var name;
	
	function CategorySort(){ // sorting category acending/decnding 
		tableExist = 1;
		name = "Category";
		if(sortCategory == 0)
		{
			SearchResults = SearchResults.sort(function(a, b){ 
				if(a > b) 
					return -1
				else if (a < b)
					return 1 
				else  
					return 0
			});
			ShowCategoryPayment();
			sortCategory = 1;
		}
		else if(sortCategory == 1)
		{
			
			SearchResults = SearchResults.sort(function(a, b){ 
				if(a > b) 
					return 1
				else if (a < b)
					return -1 
				else  
					return 0
			});
			ShowCategoryPayment();
			sortCategory = 0;
		}
		tableExist = 0;
	}
	
	function PaymentSort(){ // sorting payment acending/decnding
		tableExist = 1;
		name = "Payment";
		if(sortPayment == 0)
		{
			SearchResults.sort(function(a, b){ 
				if(a > b) 
					return -1
				else if (a < b)
					return 1 
				else  
					return 0
			});
			ShowCategoryPayment();
			sortPayment = 1;
		}
		else if(sortPayment == 1)
		{
			SearchResults.sort(function(a, b){ 
				if(a > b) 
					return 1
				else if (a < b)
					return -1 
				else  
					return 0
			});
			ShowCategoryPayment();
			sortPayment = 0;
		}
		tableExist = 0;
	}
	
	function EditName(id){ // edit categories/payment - create save, delete and abort buttons and input
		var i = id.replace( /^\D+/g, '');
		var row =  document.getElementById("row" + i);
		var add = row.insertCell(2);
		
		var addinput = document.createElement("input"); // input for changing element
		var inputID = "input" + i;
		addinput.setAttribute("id", "input" + i);
		addinput.setAttribute("class", "inputStyle");
		add.appendChild(addinput);
		
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
		var type;
		if(document.getElementById("Category").checked)
		{
			SearchResults = JSON.parse(localStorage.getItem("Category"));
			type = "Category";
		}
		else if(document.getElementById("Payment").checked)
		{
			SearchResults = JSON.parse(localStorage.getItem("Payment"));
			type = "Payment";
		}
		var placeInResult = MyName.replace( /^\D+/g, '');
		var inputID = "input" + placeInResult;
		input = document.getElementById(inputID).value;
		if(input == "")
		{
			alert("לא הוזן ערך חדש!");
			return;
		}
		for(var i = 0; i < SearchResults.length; i++)
		{
			if(input == SearchResults[i])
			{
				if(type == "Category")
					alert("הקטגוריה הנוכחית כבר קיימת!");
				else if(type == "Payment")
					alert("אמצעי התשלום הנוכחי כבר קיים!");
				return;
			}
		}
		SearchResults.splice(placeInResult, 1, input);
		localStorage.setItem(type, JSON.stringify(SearchResults)); // save in local storage
		ShowCategoryPayment();
		Abort(MyName);
		ShowCategoryPayment();
	}
	
	function Delete(MyName){ // delete current element
		var type;
		if(document.getElementById("Category").checked)
		{
			SearchResults = JSON.parse(localStorage.getItem("Category"));
			type = "Category";
		}
		else if(document.getElementById("Payment").checked)
		{
			SearchResults = JSON.parse(localStorage.getItem("Payment"));
			type = "Payment";
		}
		var placeInResult = MyName.replace( /^\D+/g, '');
		SearchResults.splice(placeInResult,1);
		localStorage.setItem(type, JSON.stringify(SearchResults)); // save in local storage
		ShowCategoryPayment();
		Abort(MyName);
		ShowCategoryPayment();
	}
	
	function Abort(MyName){ // abort editing and clear buttons and input textbox
		var Abort = document.getElementsByName(MyName);
		var i = MyName.replace( /^\D+/g, '');
		var saveName = "Save" + i;
		var deleteName = "Delete" + i;
		var inputID = "input" + i;
		var Save = document.getElementsByName(saveName);
		var Delete = document.getElementsByName(deleteName);
		var Input = document.getElementById(inputID);
		$(Save).remove();
		$(Delete).remove();
		$(Abort).remove();
		$(Input).remove();
		enableButtons();
	}
				
	function ShowCategoryPayment(){ // show category/payment table
	
		$("#CategoryPaymentTableResults").html(''); // clear table
		if(tableExist == 0) // check if table already
		{
			if(document.getElementById("Category").checked)
			{
				SearchResults = JSON.parse(localStorage.getItem("Category"));
				name = "Category";
			}
			else if(document.getElementById("Payment").checked)
			{
				SearchResults = JSON.parse(localStorage.getItem("Payment"));
				name = "Payment";
			}
		
			if(SearchResults == null)
			{
				alert("אין פריטים בקטגוריה זו!");
				return;
			}
		}
					
		var val = 0;
		var tempArr = [];
		var table = $('<table></table>'); 
		var MyCols = 2;
		var row1 = $('<tr></tr>');
		var col1 = $('<td></td>');
		var addDivButton1 = $('<div id="div' + name + '"><button id="' + name + 'Button" class="ButtonStyle">'+ name +'</button></div>');
		col1.append(addDivButton1);
		row1.append(col1);
		
		table.append(row1);		
		for(var i = 0; i < SearchResults.length; i++)
		{
			var row1 = $('<tr id="row' + val + '"></tr>');
			var col1 = $('<td></td>');
			var addDiv1 = $('<div id="divSearchResult' + val + '" class="divSearchResultStyle">'+ SearchResults[i] +'</div>');
			col1.append(addDiv1);
			row1.append(col1);
			var col2 = $('<td></td>');
			var addDiv2 = $('<div id="divEdit"><button id="EditButton'+ val +'" class="EditButtonStyle">שינוי</button></div>'); //onClick="EditName(this.id)"
			col2.append(addDiv2);
			row1.append(col2);
			table.append(row1);
			val++;
		}
		$('#CategoryPaymentTableResults').append(table);
	}
	
	function disableButtons(){ // disable all buttons when editing item
		document.getElementById("ShowCategoryPayment").disabled = true;
		document.getElementById("BackButton").disabled = true;
		var hlink = document.getElementById("BackLink"); // css make grey
		hlink.disabled = true;
		hlink.href = "#";
		document.getElementById("Category").disabled = true;
		document.getElementById("Payment").disabled = true;
		var numOfButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = true;
		}
		if(document.getElementById("Category").checked)
			document.getElementById("CategoryButton").disabled = true;
		else if(document.getElementById("Payment").checked)
			document.getElementById("PaymentButton").disabled = true;
	}
	
	function enableButtons(){ // enable all buttons when finishing editing an item
		document.getElementById("ShowCategoryPayment").disabled = false;
		document.getElementById("BackButton").disabled = false;
		var hlink = document.getElementById("BackLink");
		hlink.disabled = false;
		hlink.href = "javascript:history.back()";
		document.getElementById("Category").disabled = false;
		document.getElementById("Payment").disabled = false;
		var numOfButtons = $("#divEdit > button").length;
		for(var j = 0; j < numOfButtons; j++)
		{
			document.getElementById("EditButton" + j).disabled = false;
		}
		if(document.getElementById("Category").checked)
			document.getElementById("CategoryButton").disabled = false;
		else if(document.getElementById("Payment").checked)
			document.getElementById("PaymentButton").disabled = false;
	}
	
		
	$("document").ready(function(){
				
		$("#ShowCategoryPayment").click(function(){ // show categories/payment methods
			ShowCategoryPayment();
		});
		
		$(document).on("click", "#CategoryButton", function(){ // category sort button
			CategorySort();
		});
		
		$(document).on("click", "#PaymentButton", function(){ // payment sort button
			PaymentSort();
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
		
		$(document).on("click", "#Category", function(){ // clear table when clicking on other radio button
			$("#CategoryPaymentTableResults").html('');
		});
	
		$(document).on("click", "#Payment", function(){ // clear table when clicking on other radio button
			$("#CategoryPaymentTableResults").html('');
		});
			
	});	
	
}());



