/**
 * src/agent.js
 * Core agent logic for AgentGov.
 * Integrates with Terminal 3 Agent Dev Kit (ADK) for verifiable identity.
 */

const { AgentGovClient } = require('./auth');
const { verifyAction } = require('./verification');
const { validatePolicy } = require('./policy');

async function runAgentTask(taskData) {
    console.log("Initializing AgentGov Client...");
    const client = new AgentGovClient();

    try {
        // Register agent to get W3C-compliant DID via T3 ADK
        const agent = await client.registerAgent();
        console.log(`Agent Registered: ${agent.did}`);

        // Evaluate action against policy engine
        const isAuthorized = await validatePolicy(taskData);
        
        if (isAuthorized) {
            console.log("Policy validation passed. Executing action...");
            
            // Perform action and generate cryptographic proof
            const result = await verifyAction(taskData);
            console.log("Action Authorized and Logged:", result.auditHash);
        } else {
            console.error("Policy violation: Action rejected.");
        }
    } catch (error) {
        console.error("Agent Execution Error:", error.message);
    }
}

// Example usage
const mockTask = { action: 'BANK_TRANSFER', amount: 4250, recipient: 'VENDOR_01' };
runAgentTask(mockTask);
