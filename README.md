# Fiber Pay-to-Unlock: CKB Research Brief

A browser demo for selling an encrypted CKB Testnet research brief through a Fiber invoice. The buyer receives the encrypted offer first; a successful 1 CKB Testnet payment reveals the key needed to read the brief.

## Demo

The app is in [`demo/`](demo/README.md). It is based on the official [encrypted-data-payment starter kit](https://www.fiber.world/downloads/fiber-encrypted-data-payment.zip), adapted with a CKB research-brief use case and sample content.

Quest 2 proof screenshots: [`demo/proof/`](demo/proof/).

Run it locally with Node.js 22.18 or newer:

```sh
cd demo
npm install
npm run dev
```

Open http://localhost:3001. The live payment flow uses Fiber and CKB Testnet. See the demo README for funding, channel, recovery, and test instructions.

## Basic quest report

Open the [Fiber Testnet tutorial report](report/fiber-testnet-pay-to-unlock.md).

The original screenshots are intentionally not published because they expose the AES payment preimage/decryption key and decrypted sample content. The report records tutorial UI values and explicitly says the transaction was not independently verified on-chain.
