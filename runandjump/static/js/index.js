// Flag to check if the game is over
var gameOver = false;
let score = 0;

// Function to update the score
function updateScore() {
    score += 10; // Increment score
    document.getElementById("score").innerText = score; // Update the score display
}

// Function to stop the game and remove all classes
function stopGame() {
    var person = document.querySelector(".person");
    var obstacles = document.querySelectorAll(".obstacle");

    // Stop all animations and remove classes
    person.classList.remove("jump");
    obstacles.forEach(function(obstacle) {
        obstacle.style.animation = "none"; // Stops obstacle animations
        obstacle.style.display = "none"; // Hides obstacles
    });
}

// Listen for spacebar press to trigger jump
document.addEventListener("keydown", function(event) {
    // If game is over, stop any further actions
    if (gameOver) return;

    // Check if the pressed key is the spacebar (key code 32)
    if (event.keyCode === 32) {
        var person = document.querySelector(".person");

        // Add the 'jump' class to make the person jump
        person.classList.add("jump");

        // Remove the 'jump' class after a certain time (for example, 500ms)
        setTimeout(function() {
            person.classList.remove("jump");
        }, 500);
    }
});

// Function to check if there is a collision between the person and obstacles
function checkCollision() {
    if (gameOver) return; // Stop collision check if game is over

    var person = document.querySelector(".person");
    var obstacles = document.querySelectorAll(".obstacle");

    obstacles.forEach(function(obstacle) {
        var personRect = person.getBoundingClientRect();
        var obstacleRect = obstacle.getBoundingClientRect();

        // Check for a collision (overlapping of the person and obstacle)
        if (
            personRect.right > obstacleRect.left &&
            personRect.left < obstacleRect.right &&
            personRect.bottom > obstacleRect.top &&
            personRect.top < obstacleRect.bottom
        ) {
            // Collision detected, stop the game
            gameOver = true;
            alert("Game Over! You hit an obstacle.");

            // Stop the game and cleanup
            stopGame();

            // Optionally, add logic to reset or restart the game here
        }

        // Check if the person successfully passed the obstacle
        if (
            obstacleRect.right < personRect.left && // Obstacle is behind the person
            !obstacle.classList.contains("scored") // Obstacle hasn't been scored yet
        ) {
            obstacle.classList.add("scored"); // Mark the obstacle as scored
            updateScore(); // Update the score
        }
    });
}

// Check for collisions every 50ms (can adjust for performance)
setInterval(checkCollision, 50); 
