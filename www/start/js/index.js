This.afterInitPeriod = function()
{
	var periodStart = document.getElementById("periodStart").value;
	var periodEnd = document.getElementById("periodEnd").value;
	
	call("dashboard_select", [periodStart, periodEnd], function(data)
	{
		document.getElementById("expenses_amount_total").innerHTML = data[0].expenses_amount_total;
	});
};

exec("controls/period/init.js", This.afterInitPeriod);

