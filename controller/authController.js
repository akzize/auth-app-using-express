import * as bcrypt from "bcrypt";
import User from "../models/User.js";

const index = (req, res) => {
	res.render("home");
};

// signup
const signup = (req, res) => {
	res.render("signup");
};

const saveUser = (req, res) => {
	const { name, email, password } = req.body;

    // check for user existance
    const userExist = User.findOne({email: email})
    if (userExist) {
        return res.send('user deja exist !!')
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
export { index, signup, login, saveUser };
