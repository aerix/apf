This.insert = function()
{
	var day = prompt("Day", This.date2Str(new Date()));
	if (day != null)
	{
		location.href = '#!expenses/day/?day=' + day;
	}
};

This.select = function()
{
	var periodStart = document.getElementById("periodStart").value;
	var periodEnd = document.getElementById("periodEnd").value;
	call("expenses_select_days_by_period", [periodStart, periodEnd], function(data)
		 {
			 var html = [];
			 var weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
			 var amountTotal = 0;
			 var rowsCount = 0;
			 for (var i = 0; i < data.length; i++)
			 {
				 var day = data[i].expenses_day;
				 var amount = parseFloat(data[i].expenses_amount_sum);
				 amountTotal += amount;
				 
				 html.push("<tr>");
				 html.push("<td>");
				 html.push("<a href='#!expenses/day/?day=" + day + "'>" + day + "</a>");
				 html.push("</td>");
				 html.push("<td>");
				 html.push(weekDays[data[i].expenses_weekday]);
				 html.push("</td>");
				 html.push("<td>");
				 html.push(amount);
				 html.push("</td>");
				 html.push("</tr>");
				 
				 rowsCount++;
			 }
			 document.getElementById("table").
				 getElementsByTagName("tbody")[0].innerHTML
				 = html.join("");
				 
				 document.getElementById("amountTotal").innerHTML = amountTotal;
				 document.getElementById("rowsCount").innerHTML = rowsCount;
		 });
};

This.afterInitPeriod = function()
{
	This.select();
};

exec("controls/period/init.js", This.afterInitPeriod);
