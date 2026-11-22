# Fiber Testnet: Pay to Unlock Encrypted Data

**Report date:** 22 November 2026  
**Basis:** User-provided screenshots of the Fiber interactive tutorial, “Unlock Encrypted Data with a Fiber Payment”  
**Status:** The screenshots show the tutorial reaching its paid and decrypted result states. This report does not independently verify the payment against a CKB transaction or Fiber node record.

## Summary

The tutorial demonstrates a digital-content sale in which the seller encrypts a result before delivery. A Fiber invoice commits to the secret used as the encryption key. After the buyer pays, the payment preimage becomes available to the buyer and can be used locally to decrypt the result.

The demonstration connects payment completion and delivery of the decryption key. It avoids a separate post-payment key-delivery step in this flow. The screenshots show a Testnet scenario and are evidence of the tutorial UI, not a production deployment or security audit.

## Observed flow

1. **Prepare Fiber channels.** The tutorial explains that browser nodes can initiate connections but cannot accept them, so Buyer A and Seller C each open a channel with Bottle, a public forwarding node. The screen states that Bottle contributes 250 CKB to each new channel; after a 100 CKB settlement reserve, 150 CKB is spendable on Bottle's side.
2. **Encrypt the result and create an invoice.** The seller enters a sample report. The tutorial uses AES-256-GCM, generates a 256-bit key and a 96-bit initialization vector, and uses the key as the invoice payment preimage. The encrypted result and invoice are packaged in the offer.
3. **Transfer and validate the offer.** The buyer receives the offer JSON and checks the invoice network, amount, and payment hash before paying.
4. **Pay over Fiber.** The payment screen shows an invoice amount of 1 CKB, a 0.001 CKB routing fee, and 1.001 CKB total paid. Its status is shown as “Paid.”
5. **Decrypt after payment.** The tutorial returns the payment preimage to the buyer. Selecting “Decrypt result” uses that value as the AES key and displays the original sample report. The final screenshot shows the decrypted result and the payment preimage.

## What this demonstrates

- A service provider can prepare encrypted content before receiving payment.
- The invoice's payment hash commits to the preimage without placing the preimage itself in the offer.
- After successful payment, the buyer can use the returned preimage as the decryption key.
- The tutorial performs decryption in the buyer's browser; the screenshots do not show a separate content-server key-release request.

This pattern may suit reports, generated files, query results, or other digital deliverables. The screenshots alone do not establish production readiness, service-provider fairness, durable content storage, key recovery, or resistance to a compromised client.

## Values visible in the tutorial

| Item | Displayed value |
| --- | ---: |
| Invoice amount | 1 CKB |
| Routing fee | 0.001 CKB |
| Total paid | 1.001 CKB |
| Bottle contribution per channel | 250 CKB |
| Settlement reserve | 100 CKB |
| Bottle spendable channel balance | 150 CKB |
| Encryption | AES-256-GCM |
| Key size | 256 bits |
| Initialization vector | 96 bits |

These values are copied from the tutorial screens. They are not fee estimates or claims about current Fiber network conditions.

## Security and evidence handling

The submitted screenshots expose the payment preimage used as the AES decryption key and the decrypted sample content. The screenshots are therefore not included in this public repository. The preimage and full payment hash are also omitted from this report.

Anyone who obtained the preimage from the screenshots may be able to decrypt the associated ciphertext. Treat that tutorial result as public, do not reuse its payment material, and generate a fresh key and invoice for another test.

## Limits

- This is a guided Testnet tutorial scenario; it is not evidence of mainnet use or user adoption.
- The report does not independently query a Fiber node, verify a CKB transaction, or validate the invoice cryptographically.
- No transaction hash, full payment hash, or payment preimage is reproduced here.
- The report is not a security audit of Fiber, AES-GCM, the tutorial implementation, or a production payment application.

## References

- [Fiber tutorial: Unlock Encrypted Data with a Fiber Payment](https://fiber.world/docs/build/encrypted-data-payment#transfer)
- [Fiber Talk: How a Fiber Payment Can Unlock Data and Control Settlement](https://talk.nervos.org/t/how-a-fiber-payment-can-unlock-data-and-control-settlement/10731)
- [Fiber invoice guide](https://www.fiber.world/docs/concept/payments/invoice-guide)
- [Fiber payment lifecycle](https://www.fiber.world/docs/concept/payments/payment-lifecycle)
