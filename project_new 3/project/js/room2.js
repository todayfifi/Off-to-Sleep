let password = '';
let clickCount = 0;
const letters = ['A', 'B', 'C', 'D'];
const keys = document.querySelectorAll('.key');
const passwordDisplay = document.getElementById('password-display');
const message = document.getElementById('message');
const animationContainer = document.getElementById('animation-container');
const passwordForm = document.getElementById('password-form');
const enteredPasswordInput = document.getElementById('entered-password');
const submitButton = document.getElementById('submit-button');

// Generate New Password
function generatePassword() {
	// choose a random index to be the character
    const letterIndex = Math.floor(Math.random() * 6);
    for (let i = 0; i < 6; i++) {
        if (i === letterIndex) { //if this is the random index for the character
            password += letters[Math.floor(Math.random() * letters.length)]; //choose random character
        } else {
            password += Math.floor(Math.random() * 10); //choose random number
        }
    }
    passwordDisplay.textContent = `Remember this! \n\n\nPassword: ${password}`;
}
//Starts game by generating password and giving user 5 seconds before the password disappears and game starts
function startGame() {
    generatePassword();
    setTimeout(() => {
        passwordDisplay.style.display = 'none';
		
        startKeyboardAnimation();
    }, 5000);
}

// Function to start password typing on page
function startKeyboardAnimation() {
    keys.forEach(key => {
        animateKey(key);
    });
}

// Every 2 seconds, update the password
function animateKey(key) {
    let interval;
    function updateKey() {
		// Only update non-selected keys
        if (!key.classList.contains('selected')) {
            if (Math.random() < 0.2) {
                key.textContent = letters[Math.floor(Math.random() * letters.length)];
            } else {
                key.textContent = Math.floor(Math.random() * 10);
            }
        }
    }
    updateKey(); // Set initial content
    interval = setInterval(updateKey, 2000);
    
    // Store the interval in the key's dataset
    key.dataset.interval = interval;
}

keys.forEach(key => {
    key.addEventListener('click', () => {
        if (clickCount < 6 && !key.classList.contains('selected')) {
            // Stop the animation for this key if it is selected
            clearInterval(key.dataset.interval);
            
            key.classList.add('selected');
			// Store the keys the user has entered
            enteredPasswordInput.value += key.textContent;
            clickCount++;
            
			//If enough keys pressed for password, so this is the 6th key
            if (clickCount === 6) {
                submitButton.style.display = 'block';
				
				//Stop animation and disable new key entering for each key
                keys.forEach(k => {
                    if (!k.classList.contains('selected')) {
                        k.classList.add('disabled');
						
                        clearInterval(k.dataset.interval);
                    }
                });
            }
        }
    });
});


function checkPassword() {
    let enteredPassword = enteredPasswordInput.value;
    
    // Sort both the entered password and the correct password
    let sortedEntered = enteredPassword.split('').sort().join('');
    let sortedCorrect = password.split('').sort().join('');
    
    if (sortedEntered === sortedCorrect) {
        message.textContent = 'Correct Password!';
        showSuccessAnimation();
    } else {
        message.textContent = 'Oh, Please play again';
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

// Show animation and redirect
function showSuccessAnimation() {
    animationContainer.style.display = 'block';
    setTimeout(() => {
        window.location.href = 'room3.html';
    }, 4000);
}

//Check password once submit is pressed
passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    checkPassword();
});

// Check password
function checkPassword() {
    let enteredPassword = enteredPasswordInput.value;
    
    console.log('Generated password:', password);
    console.log('Entered password:', enteredPassword);
    
    let sortedEntered = enteredPassword.split('').sort().join('');
    let sortedCorrect = password.split('').sort().join('');
    
    console.log('Sorted entered:', sortedEntered);
    console.log('Sorted correct:', sortedCorrect);
	
	// If password is correct, show correct animation and redirect
    if (sortedEntered === sortedCorrect) {
        message.textContent = 'Correct Password!';
        showSuccessAnimation();
    } else {
		// Password wrong, user must retry
        message.textContent = 'Wrong Password, Please play again';
        setTimeout(() => {
            location.reload();
        }, 4000);
    }
}
startGame();