/**
 * src/policy.js
 * Automated Policy Engine for AgentGov.
 * Enforces compliance rules before agent actions are authorized.
 */

// Define governance thresholds for the enterprise
const GOVERNANCE_POLICIES = {
    MAX_TRANSFER_AMOUNT: 5000,
    ALLOWED_ACTIONS: ['BANK_TRANSFER', 'VENDOR_ONBOARDING'],
};

/**
 * Validates agent actions against enterprise compliance rules.
 * @param {Object} task - The action request from the agent.
 * @returns {boolean} - Authorization decision.
 */
async function validatePolicy(task) {
    console.log("Evaluating action against policy engine...");

    // Rule 1: Validate action type
    if (!GOVERNANCE_POLICIES.ALLOWED_ACTIONS.includes(task.action)) {
        console.warn(`Policy Error: Unauthorized action attempted: ${task.action}`);
        return false;
    }

    // Rule 2: Validate transaction thresholds
    if (task.action === 'BANK_TRANSFER' && task.amount > GOVERNANCE_POLICIES.MAX_TRANSFER_AMOUNT) {
        console.warn(`Policy Error: Transfer amount ${task.amount} exceeds limit.`);
        return false;
    }

    console.log("Action complies with organizational policies.");
    return true;
}

module.exports = { validatePolicy };
