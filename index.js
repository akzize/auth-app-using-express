import express, { json, urlencoded } from "express";
import router from "./routes/userRouter.js";

const app = express();

// middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/', router)

const port = 3000;
app.listen(port, () => {
	console.log("site is live in http://localhost:" + port);
});
