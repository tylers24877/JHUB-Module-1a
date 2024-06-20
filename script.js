const items = [
  {
    name: "PCS Jacket MTP",
    description: "A camouflaged jacket for all seasons",
    price: 20.99,
    imageUrl:
      "https://www.militarykit.com/cdn/shop/products/british-army-pcs-combat-shirt-mtp-camo_1024x1024.jpg?v=1664292379",
  },
  {
    name: "PCS Trousers MTP",
    description: "To pair with the jacket for a full set",
    price: 40.99,
    imageUrl:
      "https://www.thearmynavystores.com/cdn/shop/files/mtppants_large.jpg?v=1709988806",
  },
  {
    name: "Belt",
    description: "An upgrade to your standard issue belt",
    price: 30,
    imageUrl:
      "https://www.militarykit.com/cdn/shop/products/combat-belt-mtp-camo_1024x1024.jpg?v=1656595267",
  },
];

let itemsCheckout = [];

//----------------------------------------------------------------------------
// Function to populate the shop with items
function populateShop() {
  const gridContainer = document.getElementById("grid-container");

  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className =
      "flex flex-col items-center justify-center rounded-lg shadow-xl p-5 bg-gray-50";

    itemDiv.innerHTML = `

    <img alt="Product Image" src="${item.imageUrl}" class="h-32 w-32 object-contain mb-4" />
    <div class="text-xl font-bold text-gray-900 mb-2">${item.name}</div>
    <div class="text-lg text-gray-700 mb-4">${item.description}</div>
    <hr class="w-full border-gray-300 mb-4" />
    <div class="flex justify-between items-center w-full">
        <div class="text-lg text-gray-900">Price: £${item.price}</div>
        <div class="flex items-center">
            <label for="item-${index}-quantity" class="text-lg mr-2">Quantity:</label>
            <select id="item-${index}-quantity" class="h-8 w-16 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
        </div>
    </div>
    <button id="addButton" class="mt-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 focus:outline-none focus:ring-2 focus:ring-blue-500" onclick="addToCart(${index}, document.getElementById('item-${index}-quantity').value)">Add to Cart</button>
`;

    gridContainer.appendChild(itemDiv);
  });

  // Add event listener to the add to cart button for flash state
  gridContainer.querySelectorAll("#addButton").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.add("flash");

      // Remove the 'flash' class after the animation completes
      setTimeout(function () {
        button.classList.remove("flash");
      }, 500); // Adjust this time to match the animation duration
    });
  });
}

// Function to show the checkout dropdown
function showCheckoutDropdown() {
  const checkoutDropdown = document.getElementById("checkoutDropdown");
  // Show the dropdown
  checkoutDropdown.classList.remove("hidden");
  // Add event listener to keep dropdown open on hover
  checkoutDropdown.addEventListener("mouseenter", () => {
    checkoutDropdown.classList.remove("hidden");
  });

  // Close dropdown when mouse leaves
  checkoutDropdown.addEventListener("mouseleave", () => {
    checkoutDropdown.classList.add("hidden");
  });
}
//Add Cart function to add items to the cart and update the checkout
function addToCart(itemId, qty = 1) {
  itemsCheckout.push({ itemId: itemId, qty: qty });
  populateCheckout();
}

// Remove item from cart and update the checkout
function removeItemFromCart(id) {
  itemsCheckout.splice(id, 1);
  populateCheckout();
}

// Update total displayed on Nav Bar
function updateSummaryCheckoutTotal() {
  const total = itemsCheckout.length;
  const totalDiv = document.getElementById("checkoutSummaryTotal");
  totalDiv.innerHTML = total;
}

// Update total displayed on Checkout
function updateCheckoutTotal() {
  const totalDiv = document.getElementById("checkoutTotal");
  let total = 0;
  itemsCheckout.forEach((item) => {
    total += items[item.itemId].price * item.qty;
  });
  totalDiv.innerHTML = `£${total.toFixed(2)}`;
}

function toggleDisableCheckoutButton(disabled) {
  const orderNowButton = document.getElementById("checkoutButton");
  orderNowButton.disabled = disabled;
}

//Populate the checkout with items which are in the basket
function populateCheckout() {
  updateSummaryCheckoutTotal();
  updateCheckoutTotal();

  const checkoutItemsDiv = document.getElementById("checkoutItems");
  const emptyCheckoutDiv = document.getElementById("emptyCheckout");

  // Clear previous content
  checkoutItemsDiv.innerHTML = "";

  if (itemsCheckout.length === 0) {
    emptyCheckoutDiv.classList.remove("hidden");
    toggleDisableCheckoutButton(true);
    return;
  } else {
    toggleDisableCheckoutButton(false);
    emptyCheckoutDiv.classList.add("hidden");
  }
  // Populate with checkout items
  itemsCheckout.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    const itemData = items[item.itemId];

    // Apply Tailwind classes directly
    itemDiv.classList.add(
      "p-4",
      "border-b",
      "border-gray-200",
      "flex",
      "justify-between",
      "items-center",
    );

    itemDiv.innerHTML = `
    <div class="flex-1 mr-4">
      <div class="font-bold">${itemData.name}</div>
      <div class="text-sm text-gray-600">Quantity: ${item.qty}</div>
    </div>
    <div class="font-bold text-lg">£${(itemData.price * item.qty).toFixed(2)}</div>
     <button type="button" class="flex-shrink-0 ml-2 text-gray-600 hover:text-gray-800 focus:outline-none remove-item-btn" data-item-id="${index}">
      <span class="text-xl leading-none">&times;</span> <!-- Text x icon -->
    </button>
  `;

    checkoutItemsDiv.appendChild(itemDiv);
  });
  checkoutItemsDiv.querySelectorAll(".remove-item-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.dataset.itemId); // Get item id
      removeItemFromCart(itemId);
    });
  });
}

//------------------------------------------------------------------------------------

const checkoutTrigger = document.getElementById("checkoutTrigger");
// Event listener for hover (mouseenter)
checkoutTrigger.addEventListener("mouseenter", () => {
  showCheckoutDropdown();
});

// Initial population of the shop
populateShop();
