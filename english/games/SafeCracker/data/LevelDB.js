var allLevels = 
{"levels":[
	{
		"id": 1,
		"bg": 1,
		"perfectMovesCount": 2,
		"bricks" : [
			{"id":3, "x":3, "y":2, "isVertical":true},
		],
		"obstacles": [
			//{"id":1, "x":0, "y":3},
			//{"id":3, "x":5, "y":3},
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":400,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":10,
		}
	},
	{
		"id": 2,
		"bg": 1,
		"perfectMovesCount": 3,
		"bricks" : [
			{"id":3, "x":3, "y":2, "isVertical":true},
			{"id":2, "x":2, "y":2},
		],
		"obstacles": [
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":550,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":10,
		}
	},
	{
		"id": 3,
		"bg": 1,
		"perfectMovesCount": 4,
		"bricks" : [
			{"id":4, "x":3, "y":2, "isVertical":true},
			{"id":6, "x":2, "y":5, "isVertical":true},
			{"id":2, "x":2, "y":2},
		],
		"obstacles": [
		],
		"key": {"x":4, "y":4},
		"lock": {"x":4, "y":-1},
		"police_alert": {
			"interval":500,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":3,
		}
	},
	{
		"id": 4,
		"bg": 1,
		"perfectMovesCount": 6,
		"bricks" : [
			{"id":3, "x":3, "y":3, "isVertical":true},
			{"id":6, "x":3, "y":1, "isVertical":true},
			{"id":5, "x":1, "y":5, "isVertical":true},
			{"id":5, "x":5, "y":1},
			{"id":5, "x":2, "y":3},
		],
		"obstacles": [
			{"id":1, "x":2, "y":1},
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":400,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":7,
		}
	},
	{
		"id": 5,
		"bg": 1,
		"perfectMovesCount": 8,
		"bricks" : [
			{"id":1, "x":0, "y":0, "isVertical":true},
			{"id":2, "x":1, "y":2, "isVertical":true},
			{"id":1, "x":1, "y":5, "isVertical":true},
			{"id":5, "x":4, "y":5, "isVertical":true},
			{"id":5, "x":4, "y":0},
			{"id":6, "x":0, "y":4},
			{"id":2, "x":5, "y":1},
		],
		"obstacles": [
			//{"id":1, "x":2, "y":1},
		],
		"key": {"x":2, "y":3},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":400,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":7,
		}
	},
	{
		"id": 6,
		"bg": 1,
		"perfectMovesCount": 7,
		"bricks" : [
			{"id":1, "x":2, "y":0, "isVertical":true},
			{"id":4, "x":0, "y":0, "isVertical":true},
			{"id":4, "x":3, "y":1, "isVertical":true},
			{"id":5, "x":1, "y":1, "isVertical":true},
			{"id":5, "x":4, "y":5, "isVertical":true},
			{"id":6, "x":5, "y":0},
			{"id":6, "x":0, "y":1},
			{"id":2, "x":5, "y":2},
		],
		"obstacles": [
			{"id":1, "x":0, "y":4},
			{"id":1, "x":1, "y":4},
			{"id":1, "x":2, "y":4},
			{"id":2, "x":1, "y":2},
			{"id":2, "x":3, "y":2},
		],
		"key": {"x":2, "y":2},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":400,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 7,
		"bg": 1,
		"perfectMovesCount": 7,
		"bricks" : [
			{"id":1, "x":1, "y":0, "isVertical":true},
			{"id":4, "x":2, "y":1, "isVertical":true},
			{"id":5, "x":1, "y":2, "isVertical":true},
			{"id":5, "x":4, "y":3, "isVertical":true},
			{"id":4, "x":3, "y":2, "isVertical":true},
			{"id":4, "x":0, "y":5, "isVertical":true},
			{"id":2, "x":0, "y":0},
			{"id":5, "x":5, "y":1},
			{"id":6, "x":5, "y":4},
			{"id":3, "x":3, "y":3},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":450,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 8,
		"bg": 1,
		"perfectMovesCount": 18,
		"bricks" : [
			{"id":1, "x":0, "y":0, "isVertical":true},
			{"id":4, "x":4, "y":1, "isVertical":true},
			{"id":5, "x":3, "y":5, "isVertical":true},
			{"id":2, "x":1, "y":3, "isVertical":true},
			{"id":2, "x":0, "y":3},
			{"id":5, "x":3, "y":0},
			{"id":3, "x":5, "y":3},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":300,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":6,
		}
	},
	{
		"id": 9,
		"bg": 1,
		"perfectMovesCount": 19,
		"bricks" : [
			{"id":1, "x":1, "y":1, "isVertical":true},
			{"id":2, "x":1, "y":2, "isVertical":true},
			{"id":5, "x":1, "y":3, "isVertical":true},
			{"id":6, "x":3, "y":3, "isVertical":true},
			{"id":5, "x":4, "y":4, "isVertical":true},
			{"id":4, "x":3, "y":4},
			{"id":4, "x":5, "y":2},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":300,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":6,
		}
	},
	{
		"id": 10,
		"bg": 1,
		"perfectMovesCount": 17,
		"bricks" : [
			{"id":1, "x":1, "y":2, "isVertical":true},
			{"id":2, "x":1, "y":1, "isVertical":true},
			{"id":5, "x":1, "y":0, "isVertical":true},
			{"id":6, "x":4, "y":4, "isVertical":true},
			{"id":4, "x":3, "y":4},
			{"id":4, "x":4, "y":2},
			{"id":6, "x":5, "y":2},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":300,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 11,
		"bg": 1,
		"perfectMovesCount": 9,
		"bricks" : [
			{"id":1, "x":0, "y":2, "isVertical":true},
			{"id":2, "x":0, "y":5, "isVertical":true},
			{"id":5, "x":3, "y":3, "isVertical":true},
			{"id":1, "x":3, "y":0},
			{"id":3, "x":5, "y":1},
		],
		"obstacles": [
			{"id":1, "x":4, "y":0},
			{"id":1, "x":5, "y":0},
		],
		"key": {"x":2, "y":3},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":300,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 12,
		"bg": 1,
		"perfectMovesCount": 19,
		"bricks" : [
			{"id":1, "x":0, "y":2, "isVertical":true},
			{"id":2, "x":0, "y":3, "isVertical":true},
			{"id":5, "x":3, "y":1, "isVertical":true},
			{"id":4, "x":1, "y":1, "isVertical":true},
			{"id":6, "x":3, "y":4, "isVertical":true},
			{"id":4, "x":0, "y":0},
			{"id":5, "x":4, "y":2},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":300,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 13,
		"bg": 2,
		"perfectMovesCount": 10,
		"bricks" : [
			{"id":1, "x":1, "y":0, "isVertical":true},
			{"id":2, "x":1, "y":1, "isVertical":true},
			{"id":3, "x":2, "y":2, "isVertical":true},
			{"id":4, "x":3, "y":3, "isVertical":true},
			{"id":6, "x":4, "y":5, "isVertical":true},
			{"id":1, "x":5, "y":0},
			{"id":5, "x":1, "y":4},
			{"id":4, "x":3, "y":4},
		],
		"obstacles": [
			{"id":2, "x":1, "y":2},
			{"id":2, "x":0, "y":5},
		],
		"key": {"x":2, "y":3},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 14,
		"bg": 2,
		"perfectMovesCount": 15,
		"bricks" : [
			{"id":1, "x":2, "y":0, "isVertical":true},
			{"id":4, "x":0, "y":2, "isVertical":true},
			{"id":5, "x":2, "y":2, "isVertical":true},
			{"id":4, "x":4, "y":4, "isVertical":true},
			{"id":6, "x":0, "y":5, "isVertical":true},
			{"id":1, "x":3, "y":3},
			{"id":5, "x":4, "y":2},
			{"id":6, "x":5, "y":2},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":9,
		}
	},
	{
		"id": 15,
		"bg": 2,
		"perfectMovesCount": 20,
		"bricks" : [
			{"id":1, "x":2, "y":2, "isVertical":true},
			{"id":4, "x":1, "y":0, "isVertical":true},
			{"id":5, "x":4, "y":0, "isVertical":true},
			{"id":4, "x":2, "y":3, "isVertical":true},
			{"id":2, "x":1, "y":2},
			{"id":3, "x":4, "y":3},
			{"id":6, "x":3, "y":0},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":10,
		}
	},
	{
		"id": 16,
		"bg": 2,
		"perfectMovesCount": 12,
		"bricks" : [
			{"id":1, "x":2, "y":1, "isVertical":true},
			{"id":3, "x":3, "y":5, "isVertical":true},
			{"id":5, "x":2, "y":0, "isVertical":true},
			{"id":4, "x":4, "y":0, "isVertical":true},
			{"id":5, "x":1, "y":2, "isVertical":true},
			{"id":6, "x":4, "y":3, "isVertical":true},
			{"id":4, "x":0, "y":4, "isVertical":true},
			{"id":2, "x":3, "y":2},
			{"id":4, "x":0, "y":0},
			{"id":6, "x":1, "y":0},
			{"id":5, "x":0, "y":2},
		],
		"obstacles": [
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 17,
		"bg": 2,
		"perfectMovesCount": 20,
		"bricks" : [
			{"id":6, "x":0, "y":0},
			{"id":4, "x":0, "y":2},
			{"id":5, "x":0, "y":4, "isVertical":true},
			{"id":4, "x":0, "y":5, "isVertical":true},
			{"id":6, "x":1, "y":0, "isVertical":true},
			{"id":4, "x":2, "y":3, "isVertical":true},
			{"id":3, "x":3, "y":0},
			{"id":5, "x":3, "y":4, "isVertical":true},
			{"id":6, "x":3, "y":5, "isVertical":true},
			{"id":4, "x":4, "y":1, "isVertical":true},
			{"id":6, "x":4, "y":2},
			{"id":4, "x":5, "y":4},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{ 
		"id": 18, 
		"bg": 2, 
		"perfectMovesCount": 14,
		"bricks" : [ 
			{"id":6, "x":0, "y":0}, 
			{"id":4, "x":0, "y":2, "isVertical":true}, 
			{"id":5, "x":1, "y":0, "isVertical":true}, 
			{"id":6, "x":1, "y":1, "isVertical":true}, 
			{"id":6, "x":1, "y":3, "isVertical":true}, 
			{"id":4, "x":2, "y":2, "isVertical":true}, 
			{"id":5, "x":3, "y":0}, 
			{"id":5, "x":3, "y":3}, 
			{"id":4, "x":4, "y":0, "isVertical":true}, 
			{"id":5, "x":4, "y":1}, 
			{"id":5, "x":4, "y":3, "isVertical":true}, 
			{"id":5, "x":5, "y":1}, 
			{"id":5, "x":5, "y":4}, 
		], 
		"obstacles": [ 
			 
			 
		], 
		"key": {"x":2, "y":4}, 
		"lock": {"x":2, "y":-1}, 
		"police_alert": { 
			"interval":250, 
			"clickPower":0.02, 
			"max_appearing":0, 
			"waitBeforeAlert":12, 
		} 
	},
	{
		"id": 19,
		"bg": 2,
		"perfectMovesCount": 16,
		"bricks" : [
			{"id":4, "x":0, "y":0},
			{"id":1, "x":0, "y":2, "isVertical":true},
			{"id":2, "x":1, "y":0, "isVertical":true},
			{"id":5, "x":1, "y":1, "isVertical":true},
			{"id":6, "x":1, "y":3},
			{"id":4, "x":1, "y":5, "isVertical":true},
			{"id":3, "x":3, "y":2},
			{"id":5, "x":4, "y":1},
			{"id":6, "x":4, "y":3, "isVertical":true},
		],
		"obstacles": [
		
			
		],
		"key": {"x":2, "y":3},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
		{
		"id": 20,
		"bg": 2,
		"perfectMovesCount": 22,
		"bricks" : [
			{"id":1, "x":0, "y":0, "isVertical":true},
			{"id":4, "x":0, "y":1},
			{"id":5, "x":0, "y":3, "isVertical":true},
			{"id":2, "x":0, "y":5, "isVertical":true},
			{"id":6, "x":1, "y":1, "isVertical":true},
			{"id":4, "x":3, "y":0},
			{"id":3, "x":3, "y":2, "isVertical":true},
			{"id":5, "x":3, "y":3, "isVertical":true},
			{"id":1, "x":5, "y":3},
		],
		"obstacles": [
			{"id":3, "x":4, "y":4},
			
		],
		"key": {"x":2, "y":2},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 21,
		"bg": 2,
		"perfectMovesCount": 22,
		"bricks" : [
			{"id":6, "x":0, "y":3},
			{"id":4, "x":1, "y":1},
			{"id":5, "x":1, "y":3, "isVertical":true},
			{"id":1, "x":2, "y":2, "isVertical":true},
			{"id":6, "x":2, "y":5, "isVertical":true},
			{"id":4, "x":3, "y":0, "isVertical":true},
			{"id":5, "x":3, "y":1, "isVertical":true},
			{"id":6, "x":4, "y":3, "isVertical":true},
			{"id":6, "x":4, "y":4},
			{"id":2, "x":5, "y":0},
		],
		"obstacles": [
			
			
		],
		"key": {"x":3, "y":3},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 22,
		"bg": 2,
		"perfectMovesCount": 27,
		"bricks" : [
			{"id":6, "x":0, "y":3, "isVertical":true},
			{"id":4, "x":0, "y":4},
			{"id":3, "x":1, "y":0},
			{"id":4, "x":1, "y":5, "isVertical":true},
			{"id":2, "x":2, "y":2, "isVertical":true},
			{"id":5, "x":2, "y":3},
			{"id":3, "x":3, "y":0, "isVertical":true},
			{"id":5, "x":4, "y":1, "isVertical":true},
			{"id":6, "x":4, "y":5, "isVertical":true},
			{"id":1, "x":5, "y":2},
		],
		"obstacles": [
			
			
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 23,
		"bg": 2,
		"perfectMovesCount": 25,
		"bricks" : [
			{"id":4, "x":0, "y":0, "isVertical":true},
			{"id":5, "x":0, "y":1},
			{"id":6, "x":0, "y":3, "isVertical":true},
			{"id":4, "x":2, "y":0},
			{"id":1, "x":2, "y":2, "isVertical":true},
			{"id":4, "x":3, "y":1, "isVertical":true},
			{"id":5, "x":3, "y":3, "isVertical":true},
			{"id":5, "x":4, "y":0, "isVertical":true},
			{"id":6, "x":4, "y":4, "isVertical":true},
			{"id":2, "x":5, "y":1},
		],
		"obstacles": [
			
			
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 24,
		"bg": 2,
		"perfectMovesCount": 19,
		"bricks" : [
			{"id":3, "x":0, "y":3},
			{"id":2, "x":1, "y":2},
			{"id":5, "x":1, "y":5, "isVertical":true},
			{"id":4, "x":2, "y":0},
			{"id":6, "x":2, "y":2, "isVertical":true},
			{"id":4, "x":2, "y":3},
			{"id":3, "x":3, "y":0, "isVertical":true},
			{"id":5, "x":3, "y":3, "isVertical":true},
			{"id":6, "x":4, "y":1},
			{"id":4, "x":4, "y":4, "isVertical":true},
			{"id":1, "x":5, "y":1},
		],
		"obstacles": [
			
			
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 25,
		"bg": 3,
		"perfectMovesCount": 24,
		"bricks" : [
			{"id":6, "x":0, "y":0},
			{"id":5, "x":0, "y":2},
			{"id":6, "x":0, "y":4, "isVertical":true},
			{"id":4, "x":0, "y":5, "isVertical":true},
			{"id":1, "x":1, "y":0, "isVertical":true},
			{"id":4, "x":1, "y":2},
			{"id":3, "x":2, "y":3, "isVertical":true},
			{"id":5, "x":3, "y":1},
			{"id":6, "x":3, "y":4},
			{"id":4, "x":4, "y":0},
			{"id":5, "x":4, "y":2, "isVertical":true},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 26,
		"bg": 3,
		"perfectMovesCount": 23,
		"bricks" : [
			{"id":6, "x":0, "y":0, "isVertical":true},
			{"id":2, "x":0, "y":1},
			{"id":5, "x":0, "y":4, "isVertical":true},
			{"id":1, "x":1, "y":1, "isVertical":true},
			{"id":6, "x":1, "y":2},
			{"id":4, "x":3, "y":2},
			{"id":5, "x":3, "y":4, "isVertical":true},
			{"id":5, "x":4, "y":0},
			{"id":4, "x":4, "y":3, "isVertical":true},
			{"id":6, "x":5, "y":4},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 27,
		"bg": 3,
		"perfectMovesCount": 30,
		"bricks" : [
			{"id":6, "x":0, "y":0, "isVertical":true},
			{"id":1, "x":0, "y":1},
			{"id":5, "x":0, "y":4, "isVertical":true},
			{"id":2, "x":0, "y":5, "isVertical":true},
			{"id":1, "x":1, "y":1, "isVertical":true},
			{"id":4, "x":1, "y":2},
			{"id":6, "x":2, "y":0, "isVertical":true},
			{"id":5, "x":3, "y":3, "isVertical":true},
			{"id":6, "x":3, "y":4},
			{"id":3, "x":4, "y":0},
			{"id":6, "x":5, "y":4},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":3},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 28,
		"bg": 3,
		"perfectMovesCount": 30,
		"bricks" : [
			{"id":2, "x":1, "y":0, "isVertical":true},
			{"id":4, "x":1, "y":2, "isVertical":true},
			{"id":1, "x":1, "y":3},
			{"id":4, "x":2, "y":3, "isVertical":true},
			{"id":6, "x":3, "y":1},
			{"id":5, "x":3, "y":5, "isVertical":true},
			{"id":6, "x":4, "y":2, "isVertical":true},
			{"id":5, "x":4, "y":3},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 29,
		"bg": 3,
		"perfectMovesCount": 26,
		"bricks" : [
			{"id":5, "x":0, "y":1, "isVertical":true},
			{"id":6, "x":0, "y":2, "isVertical":true},
			{"id":2, "x":1, "y":3},
			{"id":4, "x":2, "y":0, "isVertical":true},
			{"id":6, "x":2, "y":1},
			{"id":3, "x":2, "y":3, "isVertical":true},
			{"id":5, "x":2, "y":4},
			{"id":5, "x":4, "y":0, "isVertical":true},
			{"id":6, "x":4, "y":5, "isVertical":true},
			{"id":1, "x":5, "y":2},
		],
		"obstacles": [
			
			
		],
		"key": {"x":3, "y":4},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 30,
		"bg": 3,
		"perfectMovesCount": 31,
		"bricks" : [
			{"id":4, "x":0, "y":0, "isVertical":true},
			{"id":4, "x":0, "y":2},
			{"id":5, "x":0, "y":4},
			{"id":6, "x":1, "y":1},
			{"id":4, "x":1, "y":3, "isVertical":true},
			{"id":6, "x":2, "y":0, "isVertical":true},
			{"id":3, "x":2, "y":1, "isVertical":true},
			{"id":5, "x":2, "y":4},
			{"id":2, "x":3, "y":4, "isVertical":true},
			{"id":1, "x":3, "y":5, "isVertical":true},
			{"id":6, "x":5, "y":0},
			{"id":4, "x":5, "y":2},
		],
		"obstacles": [
			
			
		],
		"key": {"x":3, "y":2},
		"lock": {"x":3, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 31,
		"bg": 3,
		"perfectMovesCount": 32,
		"bricks" : [
			{"id":6, "x":0, "y":0, "isVertical":true},
			{"id":5, "x":0, "y":1, "isVertical":true},
			{"id":1, "x":0, "y":2},
			{"id":4, "x":0, "y":5, "isVertical":true},
			{"id":2, "x":1, "y":2},
			{"id":6, "x":2, "y":1, "isVertical":true},
			{"id":3, "x":2, "y":2, "isVertical":true},
			{"id":5, "x":2, "y":3, "isVertical":true},
			{"id":4, "x":4, "y":0},
			{"id":4, "x":5, "y":1},
			{"id":6, "x":5, "y":3},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":4},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},
	{
		"id": 32,
		"bg": 3,
		"perfectMovesCount": 60,
		"bricks" : [
			{"id":6, "x":0, "y":1, "isVertical":true},
			{"id":4, "x":0, "y":3},
			{"id":1, "x":0, "y":5, "isVertical":true},
			{"id":2, "x":1, "y":0, "isVertical":true},
			{"id":6, "x":1, "y":3, "isVertical":true},
			{"id":5, "x":1, "y":4, "isVertical":true},
			{"id":4, "x":3, "y":2, "isVertical":true},
			{"id":3, "x":3, "y":3},
			{"id":6, "x":4, "y":0},
			{"id":5, "x":4, "y":3, "isVertical":true},
			{"id":6, "x":5, "y":1},
			{"id":4, "x":5, "y":4},
		],
		"obstacles": [
			
			
		],
		"key": {"x":2, "y":1},
		"lock": {"x":2, "y":-1},
		"police_alert": {
			"interval":250,
			"clickPower":0.02,
			"max_appearing":0,
			"waitBeforeAlert":12,
		}
	},


]}

function LevelDB() {
}

LevelDB.prototype.getAllLevels = function() {
	return allLevels.levels;
}
