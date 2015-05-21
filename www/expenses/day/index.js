This.day = "";

This.init = function()
{
	This.day = This.getQueryVariable("day");
	document.getElementById("day").innerHTML = This.day;
	This.select();
};

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

This.select = function()
{
	call("expenses_select_by_day", [This.day], function(data)
		 {
			 var amountTotal = 0;
			 var rowsCount = 0;
			 var html = [];
			 for (var i = 0; i < data.length; i++)
			 {
				 var dateTime = new Date(data[i].expense_time);
				 var timeString = ("0" + dateTime.getHours()).slice(-2) + 
					 ":" + 
					 ("0" + dateTime.getMinutes()).slice(-2) +
					 ":" +
					 ("0" + dateTime.getSeconds()).slice(-2);
				 var dateTimeString = This.day + "T" + timeString;
				 
				 var amount = parseFloat(data[i].expense_amount);
				 amountTotal += amount;
				 
				 html.push("<tr>");
				 html.push("<td>");
				 html.push("<a href='#!expenses/update/?expense_time=" + dateTimeString + "'>" + timeString + "<a/>");
				 html.push("</td>");
				 html.push("<td>");
				 html.push(data[i].expense_type_name);
				 html.push("</td>");
				 html.push("<td>");
				 html.push(data[i].expense_description);
				 html.push("</td>");
				 html.push("<td>");
				 html.push(amount);
				 html.push("</td>");
				 html.push("<td>");
				 html.push("<button onclick='This.del(\"%\")'>".replace("%", dateTimeString));
				 html.push("Delete");
				 html.push("</button>");
				 html.push("</td>");
				 html.push("</tr>");
				 
				 rowsCount ++;
			 }
			 document.getElementById("table").
				 getElementsByTagName("tbody")[0].
				 innerHTML = html.join("");
				 
				 document.getElementById("expenses_amount_total").innerHTML = amountTotal;
				 document.getElementById("rowsCount").innerHTML = rowsCount;
		 });

};

This.insert = function()
{
	location.href = "#!expenses/insert/?day=" + This.day;
};

This.del = function(expense_time)
{
	if (confirm("Confirm delete expense on % ?".replace("%", expense_time)))
	{
		call("expense_delete", [expense_time], function()
			 {
				 This.select();
			 });
	}
};


This.init();
