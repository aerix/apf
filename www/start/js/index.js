This.afterInitPeriod = function()
{
	This.select();
	
	document.getElementById("periodStart").addEventListener
	(
		"change", 
	 	This.period_onChange
	);
	document.getElementById("periodEnd").addEventListener
	(
		"change",
		This.period_onChange
	);
};

This.select = function()
{
	var periodStart = document.getElementById("periodStart").value;
	var periodEnd = document.getElementById("periodEnd").value;

	call("dashboard_select", [periodStart, periodEnd], function(data)
		 {
			 document.getElementById("expenses_amount_total").innerHTML = data[0].expenses_amount_total;

		 });
};

This.period_onChange = function()
{
	This.select();
};

exec("controls/period/init.js", This.afterInitPeriod);
