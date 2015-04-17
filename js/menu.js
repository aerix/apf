function Item(name, href, icon)
{
	this.name = name;
	this.href = href;
	this.icon = icon;
}


function Menu()
{
	this.items = [];
}

Menu.prototype.toggle = function ()
{
	var element = document.getElementById("menu");

	if (element.className.match(/(?:^|\s)hidden(?!\S)/))
	{
		element.className = element.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
	}
	else
	{
		element.className += " hidden";
	}
};

Menu.prototype.choice = function (id)
{	
	var item = this.items[id];
	if (item.href.substring(0, 1) == "#")
	{
		if (document.body.clientWidth <= 600)
		{
			var element = document.getElementById("menu");
			element.className += " hidden";
		}
	}
	
	location.href = item.href;	
};

Menu.prototype.render = function(elementId)
{	
	var itemsHtml = [];
	
	for (var i = 0; i < this.items.length; i++)
	{
		itemsHtml.push("<div class='item'>");
		itemsHtml.push("<button onclick='menu.choice(" + i + ")';>");
		
		itemsHtml.push("<div>");
		itemsHtml.push("<img src='%' />".replace("%", this.items[i].icon));
		itemsHtml.push("</div>");
		
		itemsHtml.push("<div>");
		itemsHtml.push("<span>" + this.items[i].name + "</span>");
		itemsHtml.push("</div>");
		
		itemsHtml.push("</button>");
		itemsHtml.push("</div>");		
	}
	
	var element = document.getElementById(elementId).innerHTML = itemsHtml.join("");	
};

// -----------------------------------------------------------------------------

var menu = new Menu();

if (document.body.clientWidth <= 600)
{
	var element = document.getElementById("menu");
	element.className += " hidden";
}

menu.items.push(new Item("Start", "#!start/", "img/menu/dashboard.png"));
menu.items.push(new Item("Expenses", "#!expenses/", "img/menu/expenses.png"));
menu.items.push(new Item("Expense types", "#!expenses/types/", ""));
menu.items.push(new Item("Profits", "#!page1/", ""));
menu.items.push(new Item("Profit types", "#!page2/", ""));
menu.items.push(new Item("Tables", "#!tables/", ""));
menu.items.push(new Item("Excel", "#!excel/", ""));
menu.items.push(new Item("User", "/", ""));

menu.render("items");


