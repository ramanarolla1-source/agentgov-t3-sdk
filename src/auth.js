/**
 * src/auth.js
 * Terminal 3 Agent Auth SDK integration.
 * Manages client initialization and agent identity provisioning.
 */

const { Terminal3 } = require('@terminal3/sdk');

class AgentGovClient {
    constructor() {
        // Initialize T3 ADK client with environment configuration
        this.client = new Terminal3({
            apiKey: process.env.T3_API_KEY,
            mode: process.env.T3_MODE || 'sandbox', // Defaults to 'sandbox' for dev
        });
    }

    /**
     * Registers the agent and provisions a W3C-compliant DID.
     */
    async registerAgent() {
        try {
            console.log("Registering agent with Terminal 3 TEE...");
            const agent = await this.client.registerAgent();
            
            if (!agent.did) {
                throw new Error("Failed to provision W3C-compliant DID");
            }
            
            return agent;
        } catch (error) {
            // Log for TECHNICAL_AUDIT.md: SDK registration failures[cite: 1]
            console.error("SDK Onboarding Friction: Error during registerAgent()", error);
            throw error;
        }
    }
}

module.exports = { AgentGovClient };
