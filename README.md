# Building a Decentralized Voting Application with Celo Blockchain

## Purpose:
This tutorial aims to guide developers in creating a decentralized voting application using the Celo blockchain. By the end of this tutorial, you'll have a solid understanding of Celo's blockchain technology and be able to build a simple but functional decentralized voting system. This project showcases the power of blockchain in ensuring transparency and security in voting processes.

## **Introduction:**
Blockchain technology, at its core, is a decentralized and distributed ledger system that enables secure and transparent record-keeping. One blockchain platform that stands out for its emphasis on usability, stability, and the goal of financial inclusion is Celo.

### **Celo Blockchain Technology:**
Celo is an open-source blockchain platform that aims to make financial tools accessible to anyone with a mobile phone. Built on the Ethereum framework, Celo extends its capabilities by introducing features like a stablecoin pegged to the US Dollar, allowing for a more user-friendly and stable environment. The platform prioritizes ease of use, making it an ideal choice for projects seeking to integrate blockchain technology seamlessly.

### **Applicability to the Topic:**
Celo's blockchain technology is particularly well-suited for our decentralized voting application. Its focus on usability ensures that individuals with basic technical knowledge can easily participate in the voting process, promoting inclusivity. Additionally, Celo's stability features, such as its stablecoin, contribute to a more reliable ecosystem, crucial for applications where accuracy and trust are paramount, as in the case of voting systems.

By leveraging Celo for our decentralized voting application, we tap into a blockchain platform that aligns with the principles of transparency, security, and accessibility. As we proceed with this tutorial, we'll explore how to harness the capabilities of Celo to build a robust and user-friendly decentralized voting system.

## **Prerequisites:**
- Basic understanding of blockchain concepts. If you are new to blockchain, consider exploring resources such as [Blockchain Basics](https://www.ibm.com/cloud/learn/blockchain-basics) to gain a foundational understanding.
- Familiarity with JavaScript and Node.js. If you need a refresher or are new to these technologies, check out Mozilla Developer Network's [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) and the [Node.js Getting Started Guide](https://nodejs.org/en/docs/guides/getting-started-guide/).
- Celo Development Kit (Celo SDK) installed. Follow the tutorial on [Installing Celo Development Kit](https://docs.celo.org/developer-guide/start) to set up the necessary tools for Celo blockchain development.

# Step 1: Setting Up the Project:
Begin by creating a new Node.js project and installing the necessary dependencies. Use the following commands in your terminal:
```bash
mkdir decentralized-voting
cd decentralized-voting
npm init -y
npm install celo-sdk
```

# Step 2: Smart Contract Development:
Create a simple smart contract for the voting system. The contract should include functions for creating a new election, submitting votes, and retrieving results. Here's a basic example:
```Javascript
// Voting.sol
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    mapping(uint256 => uint256) public votes;

    // Modifier to restrict access to the admin
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    // Constructor to set the admin when the contract is deployed
    constructor() {
        admin = msg.sender;
    }

    // Function to start a new election, only callable by the admin
    function startElection(uint256 electionId) external onlyAdmin {
        require(votes[electionId] == 0, "Election ID already exists");
        votes[electionId] = 1; // Initialize with one vote to avoid division by zero later
    }

    // Function to submit a vote for a specific election
    function vote(uint256 electionId) external {
        require(votes[electionId] > 0, "Election does not exist");
        votes[electionId]++;
    }

    // Function to retrieve the result of a specific election
    function getResult(uint256 electionId) external view returns (uint256) {
        require(votes[electionId] > 0, "Election does not exist");
        return votes[electionId] - 1; // Subtract the initial vote
    }
}
```

# Step 3: Deploying the Smart Contract:
Use Celo's development network for testing purposes. Deploy the smart contract using the following script:
```Javascript
// deploy.js
const contract = require('./Voting.json'); // Make sure to compile your smart contract first
const kit = require('@celo/contractkit');

// Function to deploy the smart contract
async function deployContract() {
    // Initialize Celo ContractKit
    const kitInstance = await kit.newKit('https://alfajores-forno.celo-testnet.org');
    kitInstance.addAccount(process.env.PRIVATE_KEY);

    // Get the deployer's account
    const accounts = await kitInstance.web3.eth.getAccounts();
    const deployer = accounts[0];

    // Create a new instance of the smart contract
    const instance = new kitInstance.web3.eth.Contract(contract.abi);
    const deploy = instance.deploy({ data: contract.bytecode });

    // Deploy the contract to the Celo blockchain
    const newContract = await deploy.send({
        from: deployer,
        gas: 5000000,
    });

    console.log('Contract deployed at:', newContract.options.address);
}

deployContract();
```
**Getting Started:**

Before deploying the smart contract, make sure you have a Celo account and its private key. If you're new to Celo or need assistance, check out this [tutorial on creating a Celo account and obtaining the private key](https://coin98.net/what-is-celo-wallet). Ensure you keep your private key secure and never share it publicly.

Run the deployment script using:
```bash
export PRIVATE_KEY=your_private_key
node deploy.js
```
The provided code is a set of commands that you can run in a Bash shell to deploy the smart contract using the `deploy.js` script. Here's an explanation of each part:

1. `export PRIVATE_KEY=your_private_key`: This command exports a private key as an environment variable named `PRIVATE_KEY`. You need to replace `your_private_key` with the actual private key associated with the Celo account that will be used to deploy the smart contract.

2. `node deploy.js`: This command runs the `deploy.js` script using Node.js. The script is responsible for deploying the smart contract to the Celo blockchain.

### Troubleshooting: "Cannot find module" Error

If you encounter an error similar to the one below:

![Cannot find module error](![Alt text](image.png))

**Solution:**

This error typically occurs when the specified module or file is not found. Follow these steps to resolve it:

1. **Check File Paths:**
   - Verify that the file specified in the error message (`./Voting.json` in this case) exists in the correct location.

2. **Correct File Paths in Code:**
   - Double-check your code, specifically the paths where you are requiring or importing modules. Ensure that they match the actual file paths.

3. **Ensure File Existence:**
   - Confirm that the file `Voting.json` is present in the expected directory.

If the issue persists, consider [checking our tutorial on resolving common Node.js module errors](https://www.freecodecamp.org/news/error-cannot-find-module-node-npm-error-solved/) for further guidance.


After running the provided code, you can expect to see the contract address logged to the console. Here's an example result you might see after running deploy.js:
```bash
Contract deployed at: 0x1234567890123456789012345678901234567890
```
The actual address will be different, but it will be similar in structure. This address is where your smart contract is deployed on the Celo blockchain. You can use this address to interact with your smart contract from your frontend application.

# Step 4: Building the Frontend - Developing a Simple Web Interface:

Now that we have our smart contract deployed on the Celo blockchain, let's create a user-friendly web interface to interact with it. For simplicity, we'll use HTML, CSS, and JavaScript. You can enhance the frontend further based on your project requirements.
##Create HTML file (index.html):
```html
    <!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Decentralized Voting App</title>
</head>
<body>
    <h1>Decentralized Voting App</h1>

    <button onclick="startElection()">Start New Election</button>

    <label for="electionId">Election ID:</label>
    <input type="number" id="electionId" placeholder="Enter Election ID">
    <button onclick="vote()">Vote</button>

    <button onclick="getResult()">Get Result</button>

    <div id="result"></div>

    <script src="app.js"></script>
</body>
</html>
```
## Create JavaScript file (app.js):
```javascript
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
```
## Link to a Tutorial on Creating a Web Interface for a Smart Contract:

To learn more about creating a web interface for a smart contract, you can follow the tutorial here. This tutorial provides step-by-step guidance on building a simple decentralized application frontend using web technologies and Web3.js.

By integrating this frontend with your Celo smart contract, users can easily interact with the voting system through a web browser, making the application more accessible and user-friendly.

Remember to replace placeholder values such as the contract address and private key with your actual values before testing your application.

# **Step 5: Testing the Application - Hosting and Connecting the Frontend:**

Now that we've built the frontend, it's time to host it on a web server and connect it to the deployed smart contract on the Celo blockchain. This step is crucial to allow users to interact with the voting system through a user-friendly interface.

1. **Host the Frontend:**
    - There are various ways to host a simple web application. One common approach is to use GitHub Pages if your repository is hosted on GitHub.
    - Create a new branch in your repository named `gh-pages`.
    - Push your `index.html` and `app.js` files to this branch.
    - After a few moments, you should be able to access your hosted application at `https://your-username.github.io/your-repo-name`.

2. **Connect the Frontend to the Smart Contract:**
    - Open your `app.js` file and locate the line where the contract address is specified. Replace `'0x1234567890123456789012345678901234567890'` with the actual address of your deployed smart contract.

3. **Test the Application:**
    - Open the hosted application in a web browser.
    - Use the provided buttons to start a new election, submit votes, and retrieve results.
    - Check the browser's console for transaction hashes and potential errors. The JavaScript console can be accessed in most browsers by right-clicking on the page, selecting "Inspect," and navigating to the "Console" tab.

4. **Enhancements (Optional):**
    - Depending on your project requirements, you can enhance the frontend further. For example, you may add user authentication, real-time result updates, or a more visually appealing design.

5. **Demo and Share:**
    - Share the hosted application link with others to test the decentralized voting system. Provide clear instructions on how users can simulate the voting process and observe the results.

**Link to a Tutorial on Hosting Web Applications:**

To learn more about hosting web applications, you can follow the tutorial [here](https://pages.github.com/). This guide will walk you through the process of using GitHub Pages to host your HTML, CSS, and JavaScript files directly from your GitHub repository.

By completing this step, you demonstrate the full cycle of a decentralized voting application – from interacting with a smart contract on the blockchain to providing a user-friendly interface accessible via a web browser.

Remember to replace placeholder values in your code, such as the contract address, with actual values before testing your application.

# Conclusion:
Congratulations! You've successfully built a decentralized voting application on the Celo blockchain. This project demonstrates the potential of blockchain in ensuring trust and transparency in voting systems. Feel free to expand on this project by adding features such as user authentication, real-time result updates, and more.

# Code Repository:
Check out the code in the [Voting-system](https://github.com/Gillmasija/voting-system).


