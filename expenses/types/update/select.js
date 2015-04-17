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

This.init = function()
{
	This.ename = unescape(This.getQueryVariable("name"));
	document.getElementById("expense_type_name").innerHTML = This.ename;

	call("expense_type_select_one", [This.ename], function(data)
		 {
			 document.getElementById("name").value = data[0].expense_type_name;
			 document.getElementById("description").value = data[0].expense_type_description;
			 This.initGroups(data[0].expense_type_group_name);
		 });
};

This.initGroups = function(selectedGroup)
{
	call("expense_type_groups_select_names_all", null, function(data)
		 {
			 var html = [];
			 for (var i = 0; i < data.length; i++)
			 {
				 var groupName = data[i].expense_type_group_name;
				 if (groupName == selectedGroup)
				 {
					 html.push("<option selected>");
				 }
				 else
				 {
					 html.push("<option>");
				 }
				 html.push(groupName);
				 html.push("</option>");
			 }
			 var groups = document.getElementById("groups");
			 groups.innerHTML = html.join("");
		 });
};

This.init();

