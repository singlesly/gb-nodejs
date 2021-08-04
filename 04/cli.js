#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const { join } = require("path");

const executionDir = process.cwd();

const isFile = (filename) => fs.lstatSync(filename).isFile()

const list = fs.readdirSync(executionDir).filter(isFile);


inquirer
    .prompt([
        {
            name: "fileName",
            type: "list",
            message: "Choose a file to read",
            choices: list
        }
    ])
    .then(answer => answer.fileName)
    .then(fileName => join(executionDir, fileName))
    .then(filePath => fs.readFileSync(filePath, "utf8"))
    .then(console.log);
