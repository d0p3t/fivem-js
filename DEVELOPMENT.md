### Getting Started

1. First, you need to have the latest git, node 12 or greater installed. OSX, Windows and Linux should all be supported as build environments. This may differ from FiveM's supported environments.

**We do not use `yarn`, so it's not supported.**

1. For this repo by using the "Fork" button on the upper-right
2. Check out your fork
```
git clone git@github.com:yournamehere/fivem-js.git
```
3. Install or Update all dependencies
```
npm i
```
4. Get coding! If you've changed or added new functionality, update any relevant documentation. Ensure your work is committed within a feature branch.
5. Ensure the project has no linting errors and builds
```
npm run lint
npm run build
```

### Relevant Commands
1. `npm i` - install and link all packages
2. `npm run build` - builds using `tsc`
3. `npm run format` - autoformats with eslint --fix and prettier
4. `npm run lint` - checks for linting issues
5. `npm run docs` - builds documentation
