let currentMovie = null; // Stores the currently selected movie

document.addEventListener("DOMContentLoaded",() => {
    fetchFirstMovie(); // Load the first movie on page load
     fetchAndDisplayMovies(); // Fetch and display movies in the list
     ticketHandler(); // Set up event listener for ticket purchasing
})

function fetchFirstMovie(){
    fetch("http://localhost:3000/films")
        .then(res => res.json())
        .then(movies => {
            const availableMovies = movies.filter(movie => movie.capacity - movie.tickets_sold > 0);
            if (availableMovies.length > 0) {
                displayMovieDetails(availableMovies[0]);
            }
        })
        .catch(error => console.error("Error fetching movies", error))
}

function displayMovieDetails(movie) {
    currentMovie = movie; // Store the selected movie

    document.getElementById("poster").src = movie.poster;
    document.getElementById("title").textContent = movie.title;
    document.getElementById("runtime").textContent = `Runtime: ${movie.runtime} minutes`;
    document.getElementById("showtime").textContent = `Showtime: ${movie.showtime}`;

    // Calculate available tickets
    let availableTickets = movie.capacity - movie.tickets_sold;
    document.getElementById("available-tickets").textContent = `Available tickets: ${availableTickets}`;
    
    // Update buy button state
    const buyTicketBtn = document.getElementById("buy-ticket");
    if (availableTickets > 0) {
        buyTicketBtn.textContent = "Buy Ticket";
        buyTicketBtn.disabled = false;
    } else {
        buyTicketBtn.textContent = "SOLD OUT";
        buyTicketBtn.disabled = true;
    }
}

function fetchAndDisplayMovies(){
    fetch("http://localhost:3000/films")
        .then(res => res.json())
        .then(movies => {
            const filmsList = document.getElementById("films"); // Get the <ul>
            filmsList.innerHTML = "";

            movies.forEach(movie => { // Loop through the array
                let availableTickets = movie.capacity - movie.tickets_sold;
                if (availableTickets > 0) {
                    const li = document.createElement("li"); //  Create <li>
                    li.textContent = movie.title; // Set text to movie title
                    li.classList.add("film-item")
                    li.dataset.id = movie.id; // Store movie ID
    
                    li.addEventListener("click", () => {
                        console.log(`Clicked movie: ${movie.title}`); // Debug click event
                        displayMovieDetails(movie);
                    });
    
                    // Create delete button
                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.addEventListener("click", (event) => {
                        event.stopPropagation(); // Prevent movie selection when clicking delete
                        deleteMovie(movie.id, li);
                    });
    
                    li.appendChild(deleteBtn); // Append delete button
                    filmsList.appendChild(li); // Append to <ul>
                }
            });
        })
        .catch(error => console.error("Failed to fetch movies:", error))
}

function deleteMovie(movieId, listItem) {
    fetch(`http://localhost:3000/films/${movieId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            listItem.remove(); // Remove from DOM
            console.log(`Movie ${movieId} deleted successfully.`);
            fetchFirstMovie(); // Show the next available movie
        } else {
            console.error("Failed to delete movie");
        }
    })
    .catch(error => console.error("Error deleting movie:", error));
}

function ticketHandler() {
    const buyTicketBtn = document.getElementById("buy-ticket");

    buyTicketBtn.addEventListener("click", () => {
        console.log("Buy button clicked"); // Debug button click
        let availableTicketsElement = document.getElementById("available-tickets");
        let availableTickets = parseInt(availableTicketsElement.textContent.split(": ")[1]);

        if (availableTickets > 0) {
            availableTickets--; // Decrease by 1
            updateTickets(currentMovie, currentMovie.tickets_sold + 1); // Send update to server
            availableTicketsElement.textContent = `Available tickets: ${availableTickets}`; // Update UI

            if (availableTickets === 0) {
                buyTicketBtn.textContent = "SOLD OUT"; // Change button text
                buyTicketBtn.disabled = true; // Disable button
                fetchAndDisplayMovies(); // Refresh movie list to hide sold-out movies
            }
            
            // Send a POST request to add a new ticket record
            postNewTicket(currentMovie.id);
        }
    });
}

function updateTickets(movie, updatedTicketsSold){
    fetch(`http://localhost:3000/films/${movie.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ tickets_sold: updatedTicketsSold }),
    })
    .then(res => res.json())
    .then(updatedMovie => {
        console.log("Updated successfully:", updatedMovie);
        movie.tickets_sold = updatedMovie.tickets_sold;
    })
    .catch(error => console.error("Error updating tickets:", error));
}

function postNewTicket(filmId) {
    fetch("http://localhost:3000/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            film_id: filmId,
            number_of_tickets: 1
        })
    })
    .then(res => res.json())
    .then(newTicket => {
        console.log("New ticket added:", newTicket);
    })
    .catch(error => console.error("Error adding new ticket:", error));
}