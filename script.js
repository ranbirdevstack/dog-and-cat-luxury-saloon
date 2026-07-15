/**
 * Luxury Saloon Dog & Cat Shop - Search Dashboard Controller
 * Features: Client-side validation, ARIA state handling, and layout shift prevention.
 */

// Mock Database representing premium product inventory
const MOCK_PRODUCTS = [
  { id: 1, name: "Dog's Silk Coat Shampoo", category: "Grooming", pet: "Dog", price: "₹2,350", status: "In Stock" },
  { id: 2, name: "Cat's Organic Lavender Shampoo", category: "Grooming", pet: "Cat", price: "₹1,999", status: "In Stock" },
  { id: 3, name: "Cat's Grain-Free Salmon Treat", category: "Nutrition", pet: "Cat", price: "₹1,250", status: "Out of Stock" },
  { id: 4, name: "Dog's Gourmet Duck Jerky Treat", category: "Nutrition", pet: "Dog", price: "₹1,400", status: "In Stock" },
  { id: 5, name: "Dog & Cat Premium Memory Foam Bed", category: "Luxury Living", pet: "Dog & Cat", price: "₹9,999", status: "In Stock" },
  { id: 6, name: "Dog's Odour Control Herbal Shampoo", category: "Grooming", pet: "Dog", price: "₹1,850", status: "In Stock" },
  { id: 7, name: "Cat's Freeze-Dried Chicken Treat", category: "Nutrition", pet: "Cat", price: "₹1,100", status: "Low Stock" },
  { id: 8, name: "Dog & Cat Argan Oil Paw Balm", category: "Wellness", pet: "Dog & Cat", price: "₹1,550", status: "Low Stock" },
  { id: 9, name: "Dog's Genuine Leather Collar", category: "Accessories", pet: "Dog", price: "₹3,200", status: "In Stock" },
  { id: 10, name: "Cat's Silk Play Tunnel Toy", category: "Toys", pet: "Cat", price: "₹1,850", status: "In Stock" }
];


document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const errorFeedback = document.getElementById("errorFeedback");
  const searchBtn = document.getElementById("searchbtn");
  const resultDisplay = document.getElementById("resultDisplay");

  /**
   * Clears the error message and resets input accessibility attributes.
   */
  function clearValidationError() {
    errorFeedback.textContent = "";
    searchInput.removeAttribute("aria-invalid");
  }

  /**
   * Displays a validation error message and marks the input as invalid.
   */
  function showValidationError(message) {
    errorFeedback.textContent = message;
    searchInput.setAttribute("aria-invalid", "true");
  }

  /**
   * Renders the search findings neatly into the results container.
   */
  function renderResults(results) {
    if (results.length === 0) {
      resultDisplay.classList.remove("has-data");
      resultDisplay.textContent = "No luxury products match your search query.";
      return;
    }

    resultDisplay.classList.add("has-data");
    resultDisplay.innerHTML = results.map(product => `
      <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--color-border);">
        <strong style="color: var(--color-primary); display: block;">${product.name}</strong>
        <span style="font-size: 0.85rem; color: var(--color-text-muted);">
          Category: ${product.category} | Price: ${product.price} | 
          <em style="color: ${product.status === 'Out of Stock' ? 'var(--color-error)' : 'var(--color-secondary)'}; font-style: normal; font-weight: 600;">
            ${product.status}
          </em>
        </span>
      </div>
    `).join("");
  }

  // Clear errors when the user types or alters text
  searchInput.addEventListener("input", clearValidationError);

  // Handle search presentation logic
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearValidationError();

    const query = searchInput.value.trim();

    // 1. Client-Side Input Validation
    if (!query) {
      showValidationError("Please enter a pet product to begin your search.");
      searchInput.focus();
      return;
    }

    if (query.length < 3) {
      showValidationError("Search keyword must be at least 3 characters long.");
      searchInput.focus();
      return;
    }

    // 2. Set Visual Loading States and Update ARIA accessibility rules
    searchBtn.disabled = true;
    searchBtn.classList.add("loading");
    searchBtn.setAttribute("aria-busy", "true");
    resultDisplay.textContent = "Searching premium registry...";

    // 3. Simulate API Call Delays
    setTimeout(() => {
      const filteredProducts = MOCK_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      // Render items to dashboard
      renderResults(filteredProducts);

      // Reset application interactive state
      searchBtn.disabled = false;
      searchBtn.classList.remove("loading");
      searchBtn.removeAttribute("aria-busy");
    }, 800); // 800ms elegant debounce animation delay
  });
});
