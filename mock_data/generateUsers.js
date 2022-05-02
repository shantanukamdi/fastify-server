const { faker } = require("@faker-js/faker");
const fs = require("fs");

const users = [];

function generateData() {
	for (let i = 0; i < 10000; i++) {
		const name = faker.name.findName();
		const email = faker.internet.email();
		const password = faker.internet.color() + name;
		users.push({ name, email, password });
	}
}

generateData();

fs.writeFile("users.json", JSON.stringify(users), "utf8", (err, data) => {
	console.log({ err, data });
});
