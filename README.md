# Ventic Desktop

!!! The latest version of this repository is now hosted on a private GitLab server. As a reference to my work, I have cloned the repository to my personal GitHub profile. You can watch the short preview of the app [here](https://www.youtube.com/watch?v=8BgjFmTXyM0)!!!

> Watch movies with your friends online and track your progress, automatically!

![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)

Ventic Desktop is a desktop application, powered by Electron and written in Vue and JavaScript. It allows you to parse torrents and play videos and movies without the need to fully download them. On top of that, you are able to stream movies with your friends and watch them together, fully in sync!

## Installation
Ventic is still in pre-alpha phase, which is why binaries are not available yet, but you can build them yourself!

## Development
Would you like to contribute? Great! This is what you need to get started.

### Prerequisites
- Code editor of your choice, we recommend [Visual Studio Code](https://code.visualstudio.com/)
- [Git Client](https://git-scm.com/download/win), if you are not familiar with Git, we recommend using [Git GUI Client](https://git-scm.com/downloads/guis)
- [Node.js](https://nodejs.org/en/) (version >= 14.5.0)
    - You **will need** tools for native modules, which can be installed during Node.js installation (check the "Automatically install the necessary tools" box)
    - If you did not install tools for native modules, you can run `npm install --global --production windows-build-tools` from an elevated PowerShell or CMD.exe (run as Administrator) - if you have problems, check [here](https://github.com/nodejs/node-gyp)

### Getting the code
Clone the repository using `git clone https://github.com/ventic/desktop.git` (alternatively, download [here](https://github.com/ventic/desktop/archive/master.zip)) - we encourage the use of [GitHub Forks](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

### Running and debugging
1. Run `npm install`, which will download and install required packages
2. After installation, you will be able to:
    - Serve the application using `npm run start:dev`, which will open the application with hot reload
    - Build the application using `npm run packages:all:build`, which will build binaries and can be used to run the application without compilation - it will also generate a setup executable

After you are done with code additions and changes, be sure to lint your code using `npm run check-lint`, which will check for style and syntax errors.

### FAQ
#### There is an error after running `npm install`, which mentioned `node-gyp`... What do I do?
You probably did not install tools for native modules or do not have `node-gyp` installed. Please follow the installation guide [here](https://github.com/nodejs/node-gyp#installation).

#### If you have any other questions, please create an issue.

## Contributing
Wiki for contribution is still in the works.
