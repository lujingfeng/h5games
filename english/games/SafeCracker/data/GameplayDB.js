 var allBricks=
 {"bricks": 
	[
		{
			"id":1,
			"image":1,
			"size":3,
		},
		{
			"id":2,
			"image":2,
			"size":3,
		},
		{
			"id":3,
			"image":3,
			"size":3,
		},
		{
			"id":4,
			"image":4,
			"size":2,
		},
		{
			"id":5,
			"image":5,
			"size":2,
		},
		{
			"id":6,
			"image":6,
			"size":2,
		},
	]
 }
 
function GameplayDB() {
}

GameplayDB.prototype.getAllBricks= function() {
	return allBricks.bricks;
}