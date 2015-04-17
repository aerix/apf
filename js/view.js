function View(elementId)
{
	this.elementId = elementId;

	this.load = function (pageName)
	{
		var node = document.getElementById(this.elementId);

		// Clear previous content.
		while (node.hasChildNodes())
		{
			node.removeChild(node.firstChild);
		}

		// Delete content object.
		if (typeof(This) != "undefined")
		{
			if (typeof(This.onDestroy) == "function")
			{
				This.onDestroy();
			}
			delete This;
		}

		// Load new content.
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", pageName);
		xhttp.onreadystatechange = function()
		{
			if (xhttp.readyState == 4)
			{
				if (xhttp.status == 200)
				{
					This = new Object();
					
					node.innerHTML = xhttp.responseText;
					
					// Execute scripts.
					var arr = node.getElementsByTagName('script');
					for (var n = 0; n < arr.length; n++)
					{
						eval(arr[n].innerHTML);
					}
				}
			}
		};
		xhttp.send(null);
	};
}
