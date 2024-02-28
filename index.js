import express, { json, urlencoded } from "express";
import router from "./routes/userRouter.js";
import dbConnect from "./database/config.js";
import session from "express-session";

const app = express();
// connect to db
dbConnect();

// middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
// session
app.use(
	session({
		secret: "authuser",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);
// engine
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", router);

// 404 pages
app.use((req, res) => {
	res.send("<h1>404</h1><h3>Page not found</h3>");
});

const port = 3000;
app.listen(port, () => {
	console.log("site is live in http://localhost:" + port);
});
