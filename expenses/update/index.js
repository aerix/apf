setTitle("Expense Update");

This.getQueryVariable = function(variable)
{
	var query = window.location.href;
	query = query.substring(query.indexOf("?") + 1);
	var vars = query.split("&");
	for (var i=0;i < vars.length;i++)
	{
		var pair = vars[i].split("=");
		if (pair[0] == variable)
		{return pair[1];}
	}
	return(false);
};

This.date2Str = function(date)
{
	return date.getFullYear() + 
		"-" + 
		("0" + (date.getMonth() + 1)).slice(-2) +
		"-" +
		("0" + date.getDate()).slice(-2);
};

This.expense_time = "";
This.account_name = "";
This.expense_type_name = "";

This.init = function()
{
	This.expense_time = This.getQueryVariable("expense_time");
	document.getElementById("expense_time").value = This.expense_time;

	call("expense_select_one", [This.expense_time], function(data)
		 {
			 This.account_name = data[0].account_name;
			 This.expense_type_name = data[0].expense_type_name;

			 document.getElementById("expense_amount").value = data[0].expense_amount;
			 document.getElementById("expense_description").value = data[0].expense_description;

		 });

	call("accounts_select_names_all", [], function(data)
		 {
			 var html = [];
			 for (var i = 0; i < data.length; i++)
			 {
				 var account_name = data[i].account_name;
				 if (account_name == This.account_name)
				 {
					 html.push("<option selected>");
				 }
				 else
				 {
					 html.push("<option>");
				 }
				 html.push(account_name);
				 html.push("</option>");
			 }
			 document.getElementById("account_name").innerHTML = html.join("");
		 });

	call("expense_types_select_all", [], function(data)
		 {
			 var html =[];
			 for (var i= 0; i < data.length; i++)
			 {
				 var expense_type_name = data[i].expense_type_name;
				 if (expense_type_name == This.expense_type_name)
				 {
					 html.push("<option selected>");
				 }
				 else
				 {
					 html.push("<option>");
				 }
				 html.push(expense_type_name);
				 html.push("</option>");
			 }
			 document.getElementById("expense_type_name").innerHTML = html.join("");
		 });
};

This.update = function()
{
	call("expense_update",
		 [
			 This.expense_time,
			 document.getElementById("expense_time").value,
			 document.getElementById("account_name").value,
			 document.getElementById("expense_type_name").value,
			 document.getElementById("expense_amount").value,
			 document.getElementById("expense_description").value
		 ],
		 function()
		 {
			 var dateTime = new Date(This.expense_time);
			 window.location.href = "#!expenses/day/?day=" + This.date2Str(dateTime);
		 }
		 );
};

This.init();
