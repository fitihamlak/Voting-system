// app.js
const kit = require('@celo/contractkit');
const contract = require('./Voting.json'); // Adjust path accordingly

// Set up ContractKit
const kitInstance = kit.newKit('https://alfajores-forno.celo-testnet.org');
kitInstance.addAccount(process.env.PRIVATE_KEY);

// Get the deployed contract instance
const contractInstance = new kitInstance.web3.eth.Contract(contract.abi, '0x1234567890123456789012345678901234567890'); // Replace with your contract address

// Function to start a new election
async function startElection() {
    try {
        const transaction = await contractInstance.methods.startElection(1).send();
        console.log('Transaction Hash:', transaction.transactionHash);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to submit a vote
async function vote() {
    const electionId = document.getElementById('electionId').value;
    try {
        const transaction = await contractInstance.methods.vote(electionId).send();
        console.log('Transaction Hash:', transaction.transactionHash);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to get the result of an election
async function getResult() {
    const electionId = document.getElementById('electionId').value;
    try {
        const result = await contractInstance.methods.getResult(electionId).call();
        document.getElementById('result').innerText = `Result: ${result}`;
    } catch (error) {
        console.error('Error:', error);
    }
}
// Assume there is a function to initiate a new election
function initiateElection() {
    // Your logic to initiate an election...

    // Display success message to the user
    console.log("Election initiated successfully!");
}

// Assume there is a function to cast a vote
function castVote(candidateId) {
    // Your logic to cast a vote...

    // Display success message to the user
    console.log("Vote cast successfully!");
}

// Example of improved error handling
try {
    // Attempt to initiate a new election
    initiateElection();
} catch (error) {
    // Handle errors by displaying meaningful messages to the user
    console.error("Failed to initiate election:", error.message);
}

try {
    // Attempt to cast a vote
    castVote(1); // Pass the candidate ID as an example
} catch (error) {
    // Handle errors by displaying meaningful messages to the user
    console.error("Failed to cast vote:", error.message);
}
