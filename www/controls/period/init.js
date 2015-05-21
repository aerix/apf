This.Period = function()
{
	var now = new Date();

	var startDate = new Date(now.getFullYear(), now.getMonth(), 1);
	var endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

	this.start = This.date2Str(startDate);
	this.end = This.date2Str(endDate);
};


This.date2Str = function(date)
{
	return date.getFullYear() + 
		"-" + 
		("0" + (date.getMonth() + 1)).slice(-2) +
		"-" +
		("0" + date.getDate()).slice(-2);
};

This.period = new This.Period();
document.getElementById("periodStart").value = This.period.start;
document.getElementById("periodEnd").value = This.period.end;

