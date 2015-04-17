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

This.day = "";

This.init = function()
{
	This.day = This.getQueryVariable("day");
	if (This.day)
	{
		var initDay = This.day;

		var now = new Date();
		var initTime = 
			("0" + now.getHours()).slice(-2) + 
			":" + 
			("0" + now.getMinutes()).slice(-2) +
			":" +
			("0" + now.getSeconds()).slice(-2);

		var initDateTime = initDay + "T" + initTime;
		document.getElementById("expense_time").value = initDateTime;
	}

	call("accounts_select_names_all", [], function(data)
		 {
			 var html = [];
			 for (var i = 0; i < data.length; i++)
			 {
				 html.push("<option>");
				 html.push(data[i].account_name);
				 html.push("</option>");
			 }
			 document.getElementById("account_name").innerHTML = html.join("");
		 });

	call("expense_types_select_all", [], function(data)
		 {
			 var html =[];
			 for (var i= 0; i < data.length; i++)
			 {
				 html.push("<option>");
				 html.push(data[i].expense_type_name);
				 html.push("</option>");
			 }
			 document.getElementById("expense_type_name").innerHTML = html.join("");
		 });
	// <optgroup label="">
};


This.insert = function()
{
	call("expense_insert", 
		 [
			 document.getElementById("expense_time").value,
			 document.getElementById("account_name").value,
			 document.getElementById("expense_type_name").value,
			 document.getElementById("expense_amount").value,
			 document.getElementById("expense_description").value
		 ],
		 function(data)
		 {
			 window.location.href = "#!expenses/day/?day=" + This.day;
		 });
};

This.init();
