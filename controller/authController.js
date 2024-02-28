import * as bcrypt from "bcrypt";
import User from "../models/User.js";

const index = (req, res) => {
	res.render("home");
};

// signup
const signup = (req, res) => {
	res.render("signup");
};

const saveUser = async (req, res) => {
	const { name, email, password } = req.body;

	// check for user existance
	const user = await User.findOne({ email: email });
	if (user) {
        console.log(user);
		return res.send("user deja exist !!");
	}
	// cypting password before saving it
	bcrypt.hash(password, 10, async (err, hashedPassword) => {
		const newUser = new User({
			name,
			email,
			password: hashedPassword,
		});

		console.log(newUser);
		try {
			await newUser.save();
			req.session.user = newUser._id;
			return res.redirect("/");
		} catch (error) {
			console.error("signup error: ", error);
		}
	});
};

// login
const login = (req, res) => {
	res.render("login");
};

const checkUser = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });
	if (user) {
		try {
			const match = await bcrypt.compare(password, user.password);
			if (match) {
				req.session.user = user._id;
				console.log("session is setup");
				// res.send("logged in " + user.name);
				res.redirect("/");
			} else {
				res.send("user or password are not correct");
			}
		} catch (error) {
			console.error("error:", error);
			res.status(500).send(
				"An error occurred while comparing passwords."
			);
		}
	} else {
		res.send("User not found");
	}
};

// logout
function logout(req, res) {
	req.session.destroy();
	res.redirect('/')
}
export { index, signup, login, saveUser, checkUser, logout };
