/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	
	function chooseType(){
		if(document.getElementById("Category").checked == true)
				saveNewCategory();
		else if(document.getElementById("Payment").checked == true)
				saveNewPayment();
	}
	
	function saveNewCategory(){
		var Category = JSON.parse(localStorage.getItem("Category"));
		if(Category == null) 
			Category = [];
		var NewCategory = document.getElementById("InputCategoryPayment").value;
		if(NewCategory == "")
		{
			alert("נא הזן קטגוריה!")
			return;
		}
		for(var i = 0; i < Category.length; i++)
		{
			if(NewCategory == Category[i])
			{
				alert("הקטגוריה הנוכחית כבר קיימת!")
				return;
			}
		}
		Category.push(NewCategory);
		localStorage.setItem("Category", JSON.stringify(Category)); // save in local storage
		clearTextData(); // clear all input fields
		alert("הקטגוריה נוספה בהצלחה!");
	}
	
	function saveNewPayment(){
		var Payment = JSON.parse(localStorage.getItem("Payment"));
		if(Payment == null) 
			Payment = [];
		var NewPayment = document.getElementById("InputCategoryPayment").value;
		if(NewPayment == "")
		{
			alert("נא הזן אמצעי תשלום!");
			return;
		}
		for(var i = 0; i < Payment.length; i++)
		{
			if(NewPayment == Payment[i])
			{
				alert("אמצעי התשלום הנוכחי כבר קיים!");
				return;
			}
		}
		Payment.push(NewPayment);
		localStorage.setItem("Payment", JSON.stringify(Payment)); // save in local storage
		clearTextData(); // clear all input fields
		alert("אמצעי התשלום נוסף בהצלחה!");
	}
	
	function clearTextData(){ // clear all input fields
		document.getElementById("InputCategoryPayment").value = "";
	}

		
	$("document").ready(function(){
						
		$("#AddNewCategoryPaymentButton").click(function(){ // filter the expenses
			chooseType();
		});
	});
	
}());



