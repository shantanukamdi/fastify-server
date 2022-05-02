const autocannon = require("autocannon");
const { argv } = require("process");

function startBench() {
	const url = `http://0.0.0.0:8002`;
	const args = process.argv.slice(2);
	const numConnections = args[0] || 1000;
	const maxConnectionRequests = args[1] || 1000;

	const instance = autocannon(
		{
			url,
			connections: numConnections,
			duration: 10,
			maxConnectionRequests,
			headers: {
				"content-type": "application/json",
			},
			requests: [
				{
					method: "GET",
					path: "/healthcheck",
				},
			],
		},
		finishedTest
	);

	autocannon.track(instance);

	function finishedTest(err, res) {
		console.log("Finished Test", { err, res });
	}
}

startBench();
