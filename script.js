document.addEventListener('DOMContentLoaded', function() {
    // Load the cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to update localStorage and UI whenever the cart changes
    function saveAndUpdateCartUI() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartUI();
    }

    // Toggle cart sidebar
    document.getElementById('cart-button').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.toggle('active');
    });

    // Event listener for the close button
    document.getElementById('close-cart-btn').addEventListener('click', function() {
        document.getElementById('cart-sidebar').classList.remove('active');
    });

    // Update the current year in the footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Quiz functionality
    let totalScore = 0; // Initialize total score
    const questions = document.querySelectorAll('.question'); // Get all questions
    const resultSection = document.getElementById('result'); // Get the result section
    const totalScoreSpan = document.getElementById('totalScore'); // Where to display the score

    function hideAllQuestions() {
        questions.forEach(question => {
            question.style.display = 'none';
        });
    }

    function showQuestion(questionId) {
        hideAllQuestions();
        document.getElementById(questionId).style.display = 'block';
    }

    showQuestion('question1');

    document.querySelectorAll('.answer').forEach(button => {
        button.addEventListener('click', function() {
            const nextQuestionId = this.getAttribute('data-next');
            const score = parseInt(this.getAttribute('data-score'), 10);
            totalScore += score;

            if (nextQuestionId === 'result') {
                hideAllQuestions();
                resultSection.style.display = 'block';
                totalScoreSpan.textContent = `${totalScore}`;
                const adviceText = totalScore >= 80 ? "Your security setup is strong, but always stay vigilant." : "Your security setup needs improvement for better safety.";
                document.getElementById('securityAdvice').textContent = adviceText;
            } else {
                showQuestion(nextQuestionId);
            }
        });
    });

    function addToCart(productId) {
        const existingProductIndex = cartItems.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
            cartItems[existingProductIndex].quantity += 1;
        } else {
            cartItems.push({ id: productId, quantity: 1 });
        }
        saveAndUpdateCartUI();
    }

    function removeFromCart(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity -= 1;
        } else {
            cartItems.splice(index, 1);
        }
        saveAndUpdateCartUI();
    }

    // Function to dynamically update the cart's UI
    function updateCartUI() {
        const cartContent = document.getElementById('cart-items');
        cartContent.innerHTML = ''; // Clear current cart items
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
                <p>Item ID: ${item.id}, Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
                <button onclick="addToCart('${item.id}')">Add More</button>
            `;
            cartContent.appendChild(itemElement);
        });
        if (cartItems.length === 0) {
            cartContent.innerHTML = 'Your Cart is empty.';
        }
    }

    // Setup for purchase now button
    document.getElementById('purchase-now').addEventListener('click', function() {
        // Logic for purchasing items
        alert('Thank you for your purchase!');
        cartItems = [];
        saveAndUpdateCartUI();
    });

    // Call updateCartUI to reflect any items already in the cart on page load
    updateCartUI();
});

function setupQuiz() {
    // Implement your quiz setup here
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Logic to send form data to your server goes here

        // Show confirmation message
        confirmationMessage.classList.remove('hidden');

        // Optionally, clear the form fields
        form.reset();

        // Hide the form to focus on the confirmation message
        form.classList.add('hidden');
    });
});
