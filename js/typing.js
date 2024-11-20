let typingStartTime;
let typingInterval;
let currentCharIndex = 0;
let typedWords = 0;
const typingTimerDuration = 60; // Fixed duration

function setTypingText() {
    const newText = document.getElementById('customText').value.trim();
    if (newText) {
        document.getElementById('typingText').textContent = newText;
    }
}

function startTypingTest() {
    clearInterval(typingInterval);
    currentCharIndex = 0;
    typedWords = 0;

    document.getElementById('typingTimer').textContent = typingTimerDuration; // Show 60 seconds initially
    document.getElementById('wpm').textContent = '0';
    document.getElementById('typingArea').value = '';
    document.getElementById('typingArea').disabled = false;
    document.getElementById('typingArea').focus();

    typingStartTime = Date.now();

    typingInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - typingStartTime) / 1000);
        const timeRemaining = typingTimerDuration - elapsed;

        document.getElementById('typingTimer').textContent = timeRemaining;

        if (timeRemaining <= 0) {
            endTypingTest(elapsed);
        }
    }, 1000);

    document.getElementById('typingArea').addEventListener('input', handleTypingInput);
}

function handleTypingInput(event) {
    const input = event.target.value;
    const targetText = document.getElementById('typingText').textContent;

    if (input[currentCharIndex] === targetText[currentCharIndex]) {
        currentCharIndex++;

        if (targetText[currentCharIndex - 1] === ' ') {
            typedWords++;
        }

        if (currentCharIndex >= targetText.length) {
            const elapsedTime = Math.floor((Date.now() - typingStartTime) / 1000);
            endTypingTest(elapsedTime);
        }
    }
}

function endTypingTest(elapsedTime) {
    clearInterval(typingInterval);
    document.getElementById('typingArea').disabled = true;

    if (currentCharIndex > 0 && currentCharIndex === document.getElementById('typingText').textContent.length) {
        typedWords++;
    }

    const wpm = Math.round((typedWords / elapsedTime) * 60);
    document.getElementById('wpm').textContent = wpm;

    // Change button text to Stop and change color to red
    const startButton = document.querySelector('button[onclick="startTypingTest()"]');
    startButton.textContent = "Stop Typing Test";
    startButton.style.backgroundColor = "red";
}
