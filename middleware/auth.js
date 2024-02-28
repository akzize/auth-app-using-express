import User from "../models/User.js";

async function authMiddleware(req, res, next) {
	if (req.session && req.session.user) {
		const user = await User.findOne({ _id: req.session.user });
		res.locals.user = user
		console.log(res.locals);
		next();
	} else {
		return res.redirect("/login");
	}
}

// in case user visit /login or /signup if his auth
function redirectIfLoggedIn (req, res, next) { 
	if (req.session && req.session.user) {
		return res.redirect('/')
	}
	next()
 }

export { authMiddleware, redirectIfLoggedIn };
