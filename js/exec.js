function exec(src)
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
			}
		}
	};
	scr.send(null);	
}
