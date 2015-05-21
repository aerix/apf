function exec(src, completeCallbackFunction)
{
	var scr = new XMLHttpRequest();
	scr.open("GET", src);
	scr.onreadystatechange = function()
	{
		if (scr.readyState == 4)
		{
			if (scr.status == 200)
			{
				eval(scr.responseText);		
				if (typeof(completeCallbackFunction) != "undefined")
				{
					completeCallbackFunction();
				}
			}
		}
	};
	scr.send(null);	
}
