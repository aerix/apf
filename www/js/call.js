/**
 * Call MySql stored procedure.
 */
function call(procedureName, procedureArguments, resultCallbackFunction)
{
	var sqlr = new XMLHttpRequest();
	sqlr.onreadystatechange = function()
	{
		if (sqlr.readyState == 4)
		{
			if (sqlr.status == 200)
			{
				var data = JSON.parse(sqlr.responseText);
				resultCallbackFunction(data);
			}
			else
			{
				alert(sqlr.responseText);
			}
		}
	};
	sqlr.open("POST", db.webservice, true);
	sqlr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var arguments = "";
	if (procedureArguments != null)
	{
	for (var i = 0; i < procedureArguments.length; i++)
	{
		if (typeof(procedureArguments[i]) == "string")
		{
			procedureArguments[i] = "'" + procedureArguments[i].replace(new RegExp("'", "g"), "''") + "'";
		}
	}
	arguments = procedureArguments.join(",");
	}
	sqlr.send
	(
		"server=" + db.server + "&" +
		"database=" + db.database + "&" +
		"user=" + credentials.user + "&" + 
		"password=" + credentials.password + "&" +
		"sql=" + "call " + procedureName + "(" + arguments + ")"
	);
}
