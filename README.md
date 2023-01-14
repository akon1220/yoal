
## Getting Started with Development

### Required Installs

- [NVM](https://github.com/nvm-sh/nvm)
  - Node Version Manager, the recommended way to install and manage different
    versions of Node
- Node (Version 14.x)
  - Follow NVM usage instruction to install
- Firebase Tools
  - After installing Node, run `npm -g install firebase-tools`
- [Yarn](https://classic.yarnpkg.com/lang/en/)
  - NPM (Node Package Manager) alternative with additional useful features
  - Install Yarn 1 (Classic) not Yarn 2+ for now

### Recommended Installs

- [VSCode](https://code.visualstudio.com/)
  - Recommended Plugins
    - ESLint
    - Firebase
    - Prettier

### Set up

- Clone repo
- From project root directory, run `yarn install`

### Run project locally

- Start frontend
  - From project root, run `yarn start:frontend`
- Start Firebase functions emulator
  - From project root, run `yarn start:functions`
