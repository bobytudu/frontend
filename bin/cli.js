#! /usr/bin/env node

const execSync = require("child_process").execSync;

const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (e) {
    console.error("Failed to execute command:", command);
    throw e;
  }
  return true;
};

const repoName = process.argv[2];
const checkoutCommand = `git clone https://github.com/bobytudu/create-themed-react ${repoName}`;
const installCommand = `cd ${repoName} && npm install`;

console.log(`Cloning repository with name ${repoName}`);
const checkedOut = runCommand(checkoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installCommand);
if (!installedDeps) process.exit(-1);

console.log("Follow the following commands to start");
console.log(`cd ${repoName} && npm start`);
