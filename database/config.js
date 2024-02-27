import { connect } from "mongoose";

const MONGO_URI = "mongodb://localhost:27000/dataset";

const dbConnect = () => {
	connect(MONGO_URI)
		.then(() => {
			console.log("connected to db !!");
		})
		.catch((err) => {
			console.error("mongo error: ", err);
		});
};

export default dbConnect;
