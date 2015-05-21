This.save = function()
{
	var name = document.getElementById("name").value;
	var description = document.getElementById("description").value;
	var group = document.getElementById("groups").value;
	call("expense_type_update", [This.ename, name, description, group], function(data)
		 {
			 location.href = "#!expenses/types/?updatedName=" + name;
		 });
};

This.save();
