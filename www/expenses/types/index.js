This.select = function()
{
	call("expense_types_select_all", null, function(data)
		 {
			 var html = [];
			 var rowsCount = 0;
			 for (var i = 0; i < data.length; i++)
			 {
				 html.push("<tr>");
				 html.push("<td>");
				 var name = data[i].expense_type_name;
				 html.push("<a href='#!expenses/types/update/?name=" + escape(name) + "'>" + name + "</a>");
				 html.push("</td>");
				 html.push("<td>");
				 html.push(data[i].expense_type_description);
				 html.push("</td>");
				 html.push("<td>");
				 html.push(data[i].expense_type_group_name);
				 html.push("</td>");
				 html.push("<td>");
				 html.push("<button onclick='This.del(\"" + escape(name) + "\")'>Delete</button>");
				 html.push("</td>");
				 html.push("</tr>");
				 rowsCount++;
			 }
			 document.getElementById("table").getElementsByTagName("tbody")[0].innerHTML = html.join("");
			 document.getElementById("rowsCount").innerHTML = rowsCount;
		 });
};

This.select();

This.del = function(expense_type_name)
{
	var name = unescape(expense_type_name);
	if (confirm("Confirm delete '" + name + "'?"))
	{
		call("expense_type_delete", [name], function()
			 {
				 This.select();
			 });
	}
};

