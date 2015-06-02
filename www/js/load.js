function load(src, destinationElementId, completeCallbackFunction)
{
	var node = document.getElementById(destinationElementId);
	if (node != null)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", src);
		xhttp.onreadystatechange = function()
		{
			if (xhttp.readyState == 4)
			{
				if (xhttp.status == 200)
				{
					// Clear previous content.
					while (node.hasChildNodes())
					{
						node.removeChild(node.firstChild);
					}

					// Set new content.
					node.innerHTML = xhttp.responseText;

					// Execute scripts.
					var arr = node.getElementsByTagName('script');
					for (var n = 0; n < arr.length; n++)
					{
						eval(arr[n].innerHTML);
					}

					if (typeof(completeCallbackFunction) != "undefined")
					{
						completeCallbackFunction();
					}
				}
			}
		};
		xhttp.send(null);
	}
	else
	{
		alert('Error. Element with ID "{0}" is not found.'.replace('{0}', destinationElementId));
	}
}
