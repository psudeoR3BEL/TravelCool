document.addEventListener('DOMContentLoaded', () => {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const fromSuggestions = document.getElementById('from-suggestions');
    const toSuggestions = document.getElementById('to-suggestions');
    const flightSearchForm = document.getElementById('flight-search-form');

    // Function to fetch location suggestions from a dummy API
    async function fetchLocationSuggestions(query) {
        // Replace with a real API endpoint
        const dummyData = [
            'Warsaw, Poland',
            'New York, USA',
            'London, UK',
            'Paris, France',
            'Bangkok, Thailand',
            'Tokyo, Japan'
        ].filter(location => location.toLowerCase().startsWith(query.toLowerCase()));

        return new Promise(resolve => {
            setTimeout(() => {
                resolve(dummyData);
            }, 200);
        });
    }

    // Function to display autocomplete suggestions
    function displaySuggestions(suggestions, suggestionList) {
        suggestionList.innerHTML = '';
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.addEventListener('click', () => {
                if (suggestionList === fromSuggestions) {
                    fromInput.value = suggestion;
                } else {
                    toInput.value = suggestion;
                }
                suggestionList.innerHTML = ''; // Clear suggestions after selection
            });
            suggestionList.appendChild(li);
        });

        // Add class to position the suggestions list correctly
        suggestionList.classList.add('autocomplete-suggestions');

        //Ensure the suggestion list is visible
        suggestionList.style.display = suggestions.length > 0 ? 'block' : 'none';
    }

    // Event listener for 'From' input
    fromInput.addEventListener('input', async () => {
        const query = fromInput.value;
        if (query.length > 2) {
            const suggestions = await fetchLocationSuggestions(query);
            displaySuggestions(suggestions, fromSuggestions);
        } else {
            fromSuggestions.innerHTML = '';
            fromSuggestions.style.display = 'none';
        }
    });

    // Event listener for 'To' input
    toInput.addEventListener('input', async () => {
        const query = toInput.value;
        if (query.length > 2) {
            const suggestions = await fetchLocationSuggestions(query);
            displaySuggestions(suggestions, toSuggestions);
        } else {
            toSuggestions.innerHTML = '';
            toSuggestions.style.display = 'none';
        }
    });

    // Close the suggestions when clicking outside the input/suggestions box
    document.addEventListener('click', (event) => {
        if (!fromInput.contains(event.target) && !fromSuggestions.contains(event.target)) {
            fromSuggestions.innerHTML = '';
            fromSuggestions.style.display = 'none';
        }
        if (!toInput.contains(event.target) && !toSuggestions.contains(event.target)) {
            toSuggestions.innerHTML = '';
            toSuggestions.style.display = 'none';
        }
    });

    // Form submission handling
    flightSearchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission
        const from = fromInput.value;
        const to = toInput.value;
        const tripType = document.getElementById('trip-type').value;
        const passengers = document.getElementById('passengers').value;

        // Basic validation
        if (!from || !to) {
            alert('Please enter both departure and destination locations.');
            return;
        }

        // Replace with actual flight search API call
        console.log('Searching for flights:');
        console.log('From:', from);
        console.log('To:', to);
        console.log('Trip Type:', tripType);
        console.log('Passengers:', passengers);

        // For demonstration, just show an alert
        alert(`Searching for flights from ${from} to ${to} for ${passengers} passenger(s). Trip type: ${tripType}`);

        // Optionally, redirect to a search results page or display results in a modal
    });
});