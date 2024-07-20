document.getElementById('infoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate inputs
    if (!validateName(name) || !validateEmail(email) || !validateMessage(message)) {
        return;
    }

    const entry = {
        name: name,
        email: email,
        message: message
    };

    // Get existing entries from local storage or initialize an empty array
    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Add the new entry
    entries.push(entry);

    // Keep only the latest three entries
    if (entries.length > 3) {
        entries.shift();
    }

    // Save back to local storage
    localStorage.setItem('entries', JSON.stringify(entries));

    // Display the latest entries
    displayEntries(entries);

    // Display a thank you message
    document.getElementById('response').innerText = `Thank you, ${name}! We have received your message.`;

    // Clear the form
    document.getElementById('infoForm').reset();
});

function validateName(name) {
    if (name === '') {
        alert('Name cannot be empty');
        return false;
    }
    return true;
}

function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }
    return true;
}

function validateMessage(message) {
    if (message === '') {
        alert('Message cannot be empty');
        return false;
    }
    return true;
}

function displayEntries(entries) {
    const latestEntries = document.getElementById('latestEntries');
    latestEntries.innerHTML = '';

    entries.forEach(entry => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Name:</strong> ${entry.name}<br><strong>Email:</strong> ${entry.email}<br><strong>Message:</strong> ${entry.message}`;
        latestEntries.appendChild(li);
    });
}

// Display entries on page load
document.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    displayEntries(entries);
});
