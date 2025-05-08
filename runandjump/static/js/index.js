// Flag to check if the game is over
var gameOver = false;
let score = 0;
let obstacleTimer = null;
clearTimeout(obstacleTimer);


// Function to update the score
function updateScore() {
    score += 10; // Increment score
    document.getElementById("score").innerText = score; // Update the score display
}

// Function to stop the game and remove all classes
function stopGame() {
    gameOver = true;
    var person = document.querySelector(".person");
    var obstacles = document.querySelectorAll(".obstacle");

    person.classList.remove("jump");
    obstacles.forEach(function (obstacle) {
        obstacle.style.animation = "none";
    });

    alert("Game Over! Final Score: " + score);
    // Show the play button
    document.getElementById("play-button").style.display = "block";
    document.getElementById("your-score").style.display = "block";
    document.getElementById("game-text").style.display = "block";
    document.getElementById("your-score").innerText = "Your Score: " + score;
}

// Listen for spacebar press to trigger jump
document.addEventListener("keydown", function (event) {
    if (gameOver) return;

    if (event.keyCode === 32) {
        var person = document.querySelector(".person");

        if (!person.classList.contains("jump")) {
            person.classList.add("jump");

            setTimeout(function () {
                person.classList.remove("jump");
            }, 500);
        }
    }
});

// Function to spawn a new obstacle
function createObstacle() {
    if (gameOver) return;

    var obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");

    // Optional: Add image if desired
    var img = document.createElement("img");
    img.src = "/static/images/chair.png"; // Adjust path if needed
    obstacle.appendChild(img);

    document.querySelector(".ground").appendChild(obstacle);

    // Remove obstacle after it finishes moving
    // obstacle.addEventListener("animationend", function () {
    //     obstacle.remove();
    // });
    setTimeout(() => {
        if (obstacle && obstacle.parentNode) {
            obstacle.remove();
        }
    }, 6000); // Delay removal slightly longer than the animation

}

// Function to check for collision
function checkCollision() {
    if (gameOver) return;

    var person = document.querySelector(".person");
    var personRect = person.getBoundingClientRect();
    var obstacles = document.querySelectorAll(".obstacle");

    obstacles.forEach(function (obstacle) {
        var obstacleRect = obstacle.getBoundingClientRect();

        // Collision detection
        if (
            personRect.right > obstacleRect.left &&
            personRect.left < obstacleRect.right &&
            personRect.bottom > obstacleRect.top &&
            personRect.top < obstacleRect.bottom
        ) {
            stopGame();
        } else {

            // Scoring
            // if (
            //     obstacleRect.right < personRect.left &&
            //     !obstacle.classList.contains("scored")
            // ) {
            obstacle.classList.add("scored");
            updateScore();
            // }
        }
    });
}

// Game loop
setInterval(checkCollision, 500);
let obstacleSpawnInterval = 20000; // Start slower, e.g., 20 seconds
const minSpawnInterval = 1500;
const spawnAcceleration = 200; // Reduce by 200ms at a time
let spawnCount = 0; // Count how many obstacles have spawned

function spawnObstacleLoop() {
    if (gameOver) return;

    createObstacle(); // Spawn a new obstacle
    spawnCount++;

    // Only start speeding up after 3 obstacles (or however many you want)
    if (spawnCount > 3 && obstacleSpawnInterval > minSpawnInterval) {
        obstacleSpawnInterval -= spawnAcceleration;
    }

    obstacleTimer = setTimeout(spawnObstacleLoop, obstacleSpawnInterval);
}

// Start spawning when game starts
spawnObstacleLoop();

document.getElementById("play-button").addEventListener("click", function () {
    // Reset game state
    score = 0;
    document.getElementById("score").innerText = score;
    gameOver = false;
    spawnCount = 0;
    obstacleSpawnInterval = 20000;

    // Remove any remaining obstacles
    document.querySelectorAll(".obstacle").forEach(function (ob) {
        ob.remove();
    });

    // Clear previous spawn timer if still running
    clearTimeout(obstacleTimer);

    // Hide the play button
    document.getElementById("play-button").style.display = "none";
    document.getElementById("your-score").style.display = "none";
    document.getElementById("game-text").style.display = "none";

    // Start game again
    spawnObstacleLoop();
});

