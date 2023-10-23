# Carbon Code contracts

This project contain the Carbon Credit Token Contract

## To start

```shell
npm install --force
```

## Env file

fill in your own PRIVATE_KEY and POLYGON_API_KEY according to .env.example

## To deploy all the contracts: the following line will deploy all the above mentioned contracts

```shell
npx hardhat deployAll --network mumbai
```

## Verification for deployed contracts

```shell
npx hardhat verifyAll --network mumbai
```

## To test the contract

```shell
npx hardhat test
```
