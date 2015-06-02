function init(element, start)
{
	view = new View(element);
	
	if (window.location.hash != "")
	{
		view.load(window.location.hash.replace("#!", ""));
	}
	else
	{
		location.href = start;
	}
	
	window.onhashchange = function(e)
	{
		view.load(window.location.hash.replace("#!", ""));
	};
};

credentials = new Credentials("root", "");
db = new DB("db/", "", "APF");
