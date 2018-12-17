/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function(){
	
	function saveExpense(){
		var itemCount;
		var ExpensesArr = JSON.parse(localStorage.getItem("ExpensesArr"));
		if(ExpensesArr == null)
		{
			itemCount = 0;
			ExpensesArr = [];
		}
		else
		{
			itemCount = arrayMax(ExpensesArr, "number");
			itemCount++;
		}
		var date = document.getElementById("NewDate").value; // get date from input
		var categoryNum = document.getElementById("InputCategory").value; 
		var categoryName = document.getElementById("InputCategory").options[categoryNum].text; // get category from input
		var paymentNum = document.getElementById("InputPayment").value; 
		var paymentName = document.getElementById("InputPayment").options[paymentNum].text; // get payment method from input
		var transaction = document.getElementById("NewTransaction").value; // get transaction sum value from input
		var comment = document.getElementById("NewComment").value; // get comment value from input
		if(comment == "")
			comment = "";
		if(date == "" || categoryName == "" || paymentName == "" || transaction == "")
		{
			alert("רק שדה הערה יכול להשאר ריק!");
			return;
		}
		if(transaction <= 0)
		{
			alert("סכום עסקה חייב להיות חיובי!");
			return;
		}
		
		var expense = new Object();
		expense.number = itemCount;
		expense.date = date;
		expense.categoryName = categoryName;
		expense.paymentName = paymentName;
		expense.transaction = transaction;
		expense.comment = comment;
		ExpensesArr.push(expense);
		localStorage.setItem("ExpensesArr", JSON.stringify(ExpensesArr)); // save in local storage
		clearTextData(); // clear all input fields
		
		alert("ההוצאה נוספה בהצלחה!");
	}
	
	function clearTextData(){ // clear all input fields
		document.getElementById("NewDate").value = ""; // get time from input
		document.getElementById("InputCategory").value = "0"; // get date from input
		document.getElementById("InputPayment").value = "0"; // get notes from input
		document.getElementById("NewTransaction").value = ""; // get sugar value from input
		document.getElementById("NewComment").value = ""; // get sugar value from input
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
	
	function arrayMax(arr, key){
		var m = -Infinity, cur, i;
		for(i = 0; i < arr.length; i++)
		{
			cur = arr[i][key];
			if(cur > m)
				m = cur;
		}
		return m;
	}
		
	$("document").ready(function(){
		CategoryPopulate();
		PaymentPopulate();
		$("#AddNewExpenseButton").click(function(){ // filter the expenses
			saveExpense();
		});
	});
	
}());



