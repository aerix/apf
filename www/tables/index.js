This.query = function()
{
	var http = new XMLHttpRequest();
	http.onreadystatechange = function()
	{
		if (http.readyState == 4)
		{
			if (http.status == 200)
			{
				var data = JSON.parse(http.responseText);

				var html = [];
				for (var i = 0; i < data.length; i++)
				{
					html.push("<tr>");
					html.push("<td>");
					html.push(data[i].TABLE_SCHEMA);
					html.push("</td>");
					html.push("<td>");
					html.push(data[i].TABLE_NAME);
					html.push("</td>");
					html.push("</tr>");
				}
				document.getElementById("table").getElementsByTagName("tbody")[0].innerHTML = html.join("");
			}
			else
			{
				alert(http.responseText);
			}
		}
	};

	http.open("POST", db.webservice, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send
	(
	    "server=" + db.server + "&" +
	    "user=" + credentials.user + "&" + 
		"password=" + credentials.password + "&" +
		"sql=" + "SELECT * FROM information_schema.tables"
	);
};

This.query();
