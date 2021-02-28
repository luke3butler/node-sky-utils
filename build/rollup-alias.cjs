const path = require("path");

exports.compat = fs.readdirSync(path.resolve(__dirname, "../compat")).map(function(file) {
	var name = file.replace(/\.mjs$/i, "");
	return { find: "sky-utils/universal/" + name, replacement: path.resolve(__dirname, "../compat/" + name) };
});
exports.modern = fs.readdirSync(path.resolve(__dirname, "../modern")).map(function(file) {
	var name = file.replace(/\.mjs$/i, "");
	return { find: "sky-utils/universal/" + name, replacement: path.resolve(__dirname, "../modern/" + name) };
});
exports.module = fs.readdirSync(path.resolve(__dirname, "../module")).map(function(file) {
	var name = file.replace(/\.mjs$/i, "");
	return { find: "sky-utils/universal/" + name, replacement: path.resolve(__dirname, "../module/" + name) };
});
exports.node = fs.readdirSync(path.resolve(__dirname, "../node")).map(function(file) {
	var name = file.replace(/\.mjs$/i, "");
	return { find: "sky-utils/universal/" + name, replacement: path.resolve(__dirname, "../node/" + name) };
});