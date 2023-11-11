#! /usr/bin/env node

const execSync = require("child_process").execSync;
const fs = require("fs");
const path = require("path");

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error("Failed to execute command:", command);
    throw e;
  }
  return true;
};

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.rm(path, { recursive: true, force: true }, (err) => {
      if (err) {
        console.error(`Error while deleting ${path}.`, err);
      } else {
        console.log(`${path} is deleted.`);
      }
    });
  }
};

const repoName = process.argv[2];
const checkoutCommand = `git clone https://github.com/bobytudu/create-themed-react ${repoName}`;
const installCommand = `cd ${repoName} && npm install`;

console.log(`Cloning repository with name ${repoName}`);
const checkedOut = runCommand(checkoutCommand);
if (!checkedOut) process.exit(-1);

// Edit package.json
const packageJsonPath = `${repoName}/package.json`;
let packageJson = require(`./${packageJsonPath}`);
packageJson.name = repoName; // Change the name field
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2)); // Write back to package.json

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installCommand);
if (!installedDeps) process.exit(-1);

console.log("Follow the following commands to start");
console.log(`cd ${repoName} && npm start`);

deleteFolderRecursive(path.join(__dirname, "..", repoName, "bin"));
