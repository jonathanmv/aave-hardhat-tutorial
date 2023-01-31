# Aave v3 Playground

I want to test the Aave v3 protocol. I'm deploying it to a local network following [these instructions](https://github.com/aave/aave-v3-deploy#how-to-integrate-in-your-hardhat-project).

When tests run, they will use the local network. There are 2 local networks, though. The Hardhat one and the Ganache one. Tests use the Hardhat one. You can use the Ganache one to deploy the contracts. See the NPM Scripts section below for more info.

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```

# NPM Scripts

## Tests
To run tests in the Hardhat network execute:

```shell
npm test
```

## Deploy
There are 3 networks you can deploy the contracts to: `hardhat`, `local`, and `goerli`.

### Hardhat network
It uses an embedded network from Hardhat. Deployments to this network get lost, but it is still useful to test if the deployment works. To deploy to the Hardhat network run:

```shell
npm run deploy
```

### Local network (Ganache)
To deploy to the `local` network you need to be running `ganache` locally. In one terminal at the project's root directory, run:

```shell
npm run local:network
```

In another terminal at the project's root directory, run:
```shell
npm run deploy:local
```

### Goerli network
You need a `.env` file in the project's root directory. You can look at the `.env.example` file. Follow the instructions in the [Hardhat tutorial](https://hardhat.org/tutorial/deploying-to-a-live-network) to get the required `ALCHEMY_KEY` and `GOERLI_PRIVATE_KEY`.

Once your `.env` file is ready, execute:

```shell
npm run deploy:goerli
```
