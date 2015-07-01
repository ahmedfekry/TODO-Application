
function Task (title,description,id) {
	this.id = id;
	this.title = title;
	this.description = description;
}

function Node (lastId,array) {
	this.lastId = lastId;
	this.array = array;
}

function TODO () {
	// body...
	var list = []
	this.save = function(title,description){
		var list = localStorage.getItem("list");
		var id =0;
		list = JSON.parse(list);
		if (list === null) {
			list = new Node(1,new Array());
			id=1;
			list.lastId=id;
		}else{
			id = list.lastId+1;
			list.lastId = id;
		};

		list.array.push(new Task(title,description,id));
		localStorage.setItem("list",JSON.stringify(list));
		return true;
	}

	this.delete = function(id) {
		// body...
		var retrived = localStorage.getItem("list");
		retrived = JSON.parse(retrived);
		if (retrived === null) { return false;};
		var Data = retrived.array;
		for (var i = 0; i < Data.length; ++i) {
			if (Data[i].id == id) {
				console.log(i);
				Data.splice(i,1);
				break;
			};
		};
		localStorage.removeItem("list");
		localStorage.setItem("list",JSON.stringify(new Node(retrived.lastId,Data)));
	}

	this.get = function(title){
		var retrived = localStorage.getItem(title);
		retrived =  JSON.parse(retrived)
		return retrived.array;
	}


}