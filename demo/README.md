# CKB Research Brief: Fiber Pay-to-Unlock

A browser-only seller and buyer demo for delivering a paid CKB Testnet research brief. The seller encrypts the full brief and creates a 1 CKB Fiber invoice. The buyer receives the encrypted offer, confirms it cannot be decrypted without the key, pays the invoice, and uses the payment-revealed preimage to decrypt the brief in the browser.

This app is adapted from the [official Fiber encrypted-data-payment starter kit](https://www.fiber.world/downloads/fiber-encrypted-data-payment.zip). The use case, sample report, page title, and invoice description are adapted for this repo. Fiber node/channel, offer validation, AES-256-GCM encryption, payment-state recovery, and receipt behavior come from the starter.

## Run locally

Requirements: Node.js 22.18 or newer and npm.

```sh
npm install
npm run dev
```

Open http://localhost:3001. Use `localhost` or HTTPS: Fiber WASM requires a secure context, `SharedArrayBuffer`, Web Locks, and cross-origin isolation. `next.config.mjs` supplies the isolation headers. A browser extension or proxy that strips those headers can prevent startup.

## Run the Testnet flow

1. Start Buyer A and Seller C in separate browser tabs. Keep one tab per saved node.
2. Fund each displayed address with more than 500 Testnet CKB, plus enough for the on-chain transaction fee. Use the linked Testnet faucet; never send Mainnet funds.
3. Open a 500 CKB channel for each node through Bottle and refresh status until both report `CHANNEL_READY`. Confirmation can take several minutes.
4. On Seller, edit the sample brief if desired, then select **Encrypt & create 1 CKB Invoice**. Copy the generated public offer.
5. On Buyer, paste and validate the offer, then select **Decrypt without key**. The app should reject decryption.
6. Select **Pay 1 CKB** and wait for the payment state. If it is pending or the tab reloads, use **Check payment status**; do not submit a second payment while the outcome is unknown.
7. After success, select **Decrypt result**. Confirm that the full brief appears and the receipt shows the amount, fee, and payment hash.

The app requires both channels to be ready and verifies the invoice's Testnet currency, 1 CKB amount, payment hash, and Bottle route before submission. The configured maximum routing fee is 1 CKB; the receipt displays the actual fee.

## Recovery and data handling

- After refresh, start the same saved nodes, restore the offer, and check the existing payment status. A pending or successful attempt is never automatically submitted again. Retry is enabled only after Fiber confirms failure.
- Expired invoices are blocked before a new attempt. Unknown outcomes stay locked for status checking.
- Browser storage contains node identities and public offer/payment progress. AES keys and decrypted output stay in memory and are not stored by the app. After settlement, the buyer recovers the preimage through Fiber's `getPayment` response.
- Clearing browser data can remove access to funded channels. Do not clear it to resolve a pending transaction.
- The sample brief is illustrative. This is a Testnet demo, not an independent chain verification or a production security audit.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

The unit tests cover invoice validation, recording an attempt before submission, pending/success recovery without resubmission, failure-only retry, and expired invoice handling.
