const autocannon = require("autocannon");
const { argv } = require("process");
const users = require("../users.json");

function startBench() {
	const url = `http://0.0.0.0:8002`;
	const args = process.argv.slice(2);
	const numConnections = +args[0] || 1000;
	const maxConnectionRequests = +args[1] || 1;

	let requestNumber = 0;

	const instance = autocannon(
		{
			debug: true,
			url,
			connections: numConnections,
			duration: 10,
			maxConnectionRequests,
			headers: {
				"content-type": "application/json",
			},
			requests: [
				{
					method: "POST",
					path: "/api/users",
					setupRequest: function (req) {
						console.log("Request Number", requestNumber + 1);
						req.body = JSON.stringify(users[requestNumber]);
						requestNumber++;
						return req;
					},
				},
			],
		},
		finishedTest
	);

	autocannon.track(instance);

	function finishedTest(err, res) {
		const { statusCodeStats } = res;

		console.log("Finished Test", {
			err,
			res,
			statusCodeStats: JSON.stringify(statusCodeStats),
		});
	}
}

startBench();
