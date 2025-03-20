/**
 * This script dynamically updates a custom order summary on a Shopify product page.
 *
 * - It retrieves the product price from various possible elements.
 * - It calculates and updates the subtotal, total price, and quantity in the summary.
 * - It includes an optional QR code cost (2.75€ per unit) if selected.
 * - It observes changes in the product price (e.g., due to variant selection) and updates accordingly.
 * - It listens for user interactions with the quantity input and QR code checkbox to reflect changes in the summary.
 *
 */

document.addEventListener('DOMContentLoaded', function () {
  // Locate key elements
  const priceContainer =
    document.querySelector('.product__info-container') || document.querySelector('.price-item')?.parentElement;
  const summaryProductPrice = document.getElementById('summary-product-price');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryTotal = document.getElementById('summary-total');
  const qrCheckbox = document.getElementById('product-options-checkbox');
  const summaryQRCode = document.getElementById('summary-qr-code');
  const quantityInput = document.querySelector('input[name="quantity"]');
  const summaryQuantity = document.getElementById('summary-quantity');
  if (
    !priceContainer ||
    !summaryProductPrice ||
    !summarySubtotal ||
    !summaryTotal ||
    !qrCheckbox ||
    !summaryQRCode ||
    !quantityInput
  ) {
    console.warn('Missing elements for custom summary update!');
    return;
  }

  // Function to extract numeric price value
  function getPriceFromText(text) {
    return (
      parseFloat(
        text
          .replace(/[^\d,]/g, '')
          .replace(',', '.')
          .trim()
      ) || 0
    );
  }

  // Function to get the latest price dynamically
  function getCurrentPrice() {
    let priceElement =
      document.querySelector('.price-item.price-item--sale.price-item--last') ||
      document.querySelector('.product__price') ||
      document.querySelector('.product__info-container .price');

    return priceElement ? getPriceFromText(priceElement.textContent) : 0;
  }

  let lastKnownPrice = getCurrentPrice(); // Store initial price to prevent infinite loops

  // Function to update the summary
  function updateCustomSummary() {
    let newPrice = getCurrentPrice();
    let quantity = parseInt(quantityInput.value) || 1;
    let qrCost = qrCheckbox.checked ? 2.75 * quantity : 0;
    let subtotal = newPrice * quantity;
    let total = subtotal + qrCost;

    // Update all elements dynamically
    summarySubtotal.textContent = subtotal.toFixed(2) + '€';
    summaryProductPrice.textContent = newPrice.toFixed(2) + '€';
    summaryQRCode.textContent = qrCost.toFixed(2) + '€';
    summaryTotal.textContent = total.toFixed(2) + '€';
    summaryQuantity.textContent = quantity;
  }

  // MutationObserver to detect price changes (variant selection)
  const observer = new MutationObserver(() => {
    let newPrice = getCurrentPrice();
    if (newPrice !== lastKnownPrice) {
      lastKnownPrice = newPrice;
      updateCustomSummary();
    }
  });

  observer.observe(priceContainer, { childList: true, subtree: true });

  // Event listener for quantity changes
  quantityInput.addEventListener('input', updateCustomSummary);
  quantityInput.addEventListener('change', updateCustomSummary);

  // Ensure the QR checkbox only updates Gesamtpreis
  qrCheckbox.addEventListener('change', updateCustomSummary);

  updateCustomSummary(); // Run on page load
});
