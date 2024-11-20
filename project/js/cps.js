let cpsStartTime;
let cpsInterval;
let cpsCount = 0;
let cpsDuration = 10; // Default to 10 seconds
let isCpsTestRunning = false;

function reloadCpsTest() {
    // Update CPS test duration based on the selected value
    cpsDuration = parseInt(document.getElementById('cpsDuration').value);
    clearInterval(cpsInterval);
    document.getElementById('cpsTimer').textContent = cpsDuration;
    document.getElementById('cpsCount').textContent = '0';
    document.getElementById('clickButton').disabled = false;
}

function startCpsTest() {
    const startButton = document.querySelector("button[onclick='startCpsTest()']");
    
    if (isCpsTestRunning) {
        // Stop the CPS test and reload
        clearInterval(cpsInterval);
        document.getElementById('clickButton').disabled = true;
        startButton.textContent = "Start Test";
        startButton.style.backgroundColor = "";
        isCpsTestRunning = false;
        setTimeout(() => location.reload(), 500); // Reload the page after 0.5 seconds
        return;
    }

    // Start CPS Test
    cpsCount = 0;
    document.getElementById('cpsResult').textContent = "Click as fast as you can!";
    document.getElementById('cpsCount').textContent = '0';
    document.getElementById('cpsTimer').textContent = cpsDuration;

    cpsStartTime = Date.now();

    cpsInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - cpsStartTime) / 1000);
        const timeRemaining = cpsDuration - elapsed;

        document.getElementById('cpsTimer').textContent = timeRemaining;

        if (timeRemaining <= 0) {
            endCpsTest();
        }
    }, 1000);

    document.getElementById('clickButton').disabled = false;

    startButton.textContent = "Stop Test";
    startButton.style.backgroundColor = "red";
    isCpsTestRunning = true;
}

function countClick() {
    cpsCount++;
    document.getElementById('cpsCount').textContent = cpsCount;
}

function endCpsTest() {
    clearInterval(cpsInterval);
    document.getElementById('clickButton').disabled = true;
    document.getElementById('cpsResult').textContent = `Test Complete! Your CPS: ${cpsCount / cpsDuration}`;
}
