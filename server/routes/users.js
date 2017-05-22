var express = require('express');
var router = express.Router();

var users = [
				{'user_name': 'Admin'}
			];
			
function registerUser(user_name) {
	var len = users.length;
	var alreadyRegistered = false;
	
	// check to see if User Name is already registered
	for (var i = 1; i < len; i++) { // skip Admin at users[0]
		var currentUser = users[i];
		if (user_name == currentUser.user_name) {
			alreadyRegistered = true;
			break; // found User registered with this user_name
		}
	}
	
	// register the new User
	if (! alreadyRegistered) {
		users.push({'user_name': user_name});
	}
	
	return alreadyRegistered;
}

router.post('/', function(req, res){
    var user_name = req.body.user_name;
    if (user_name == null || user_name == '') {
        res.json(
            {
                'success' : false,
                'msg'     : 'Bad Input: Missing User Name.'
            }
        );
    } else {
		var registeredUser = registerUser(user_name);
        if (registeredUser) {
			// A User was already registered with this User Name
			res.json(
				{
					'success' : false,
					'msg'     : 'Registration Failed: User Name already taken.'
				}
			);
		} else {
			// New User has been registered
			res.json(
				{
					'success' : true,
					'msg'     : 'Registration successful.'
				}
			);
		}
    }
});

module.exports = router;
