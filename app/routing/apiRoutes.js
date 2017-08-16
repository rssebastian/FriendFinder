var friendData = require("../data/friends");

module.exports = function(app) {
	var differences = 0;
	var leastDifferences, leastDifferencesIndex, bestFriend, newFriendData;
	
	app.get("/api/friends", function (req, res) {
		res.json(friendData);
	});

	app.post("/api/friends", function(req, res) {
		var friendDifferences = [];
		
		for (var h=0; h<friendData.length; h++) {
			if (friendData[h].name === req.body.name) {
				friendData.splice(h, 1);
				newFriendData = friendData;
			}
		}

		if (newFriendData) {
			//loops through each friend stored
			for (var i=0; i<newFriendData.length; i++) {
				//for each friend it loops and calculates differences between the friend and user
				for (var j=0; j<newFriendData[i].scores.length; j++) {
					differences += Math.abs(newFriendData[i].scores[j]-req.body.scores[j]);
				}

				friendDifferences.push(differences);
				differences = 0;
			}

			leastDifferences = friendDifferences[0];
			leastDifferencesIndex = 0;

			//loop through  and find the friend 
			for (var k=1; k<friendDifferences.length; k++) {
				if (friendDifferences[k]<leastDifferences) {
					leastDifferencesIndex = k;
					leastDifferences = friendDifferences[k];
				}
			}

			newFriendData.push(req.body);

			bestFriend = newFriendData[leastDifferencesIndex];
			res.json(bestFriend);
		} else {
			//loops through each friend stored
			for (var i=0; i<friendData.length; i++) {
				//for each friend it loops and calculates differences between the friend and user
				for (var j=0; j<friendData[i].scores.length; j++) {
					differences += Math.abs(friendData[i].scores[j]-req.body.scores[j]);
				}

				friendDifferences.push(differences);
				differences = 0;
			}

			leastDifferences = friendDifferences[0];
			leastDifferencesIndex = 0;

			//loop through  and find the friend 
			for (var k=1; k<friendDifferences.length; k++) {
				if (friendDifferences[k]<leastDifferences) {
					leastDifferencesIndex = k;
					leastDifferences = friendDifferences[k];
				}
			}

			friendData.push(req.body);

			bestFriend = friendData[leastDifferencesIndex];
			res.json(bestFriend);
		}
	});
};