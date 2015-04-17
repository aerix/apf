call("expense_type_groups_select_names_all", null, function(data){
	var html = [];
	for(var i = 0; i < data.length; i++)
	{
		html.push("<option>");
		html.push(data[i].expense_type_group_name);
		html.push("</option>");
	}
	var groups = document.getElementById("groups");
	groups.innerHTML = html.join("");
});
