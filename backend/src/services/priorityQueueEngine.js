/**
 * MedPulse ER - Dynamic Priority Queue Engine
 * Recalculates case priorities dynamically so critical patients (Level 1-2)
 * immediately jump ahead of less urgent cases, while wait time prevents starvation.
 */

class PriorityQueueEngine {
  constructor() {
    // Level Severity Base Weights (Level 1 is highest priority)
    this.severityWeights = {
      1: 50, // Critical / Resuscitation
      2: 40, // Emergent
      3: 30, // Urgent
      4: 20, // Less Urgent
      5: 10  // Non-Urgent
    };
  }

  /**
   * Compute dynamic priority score for a single case
   * @param {Object} caseItem - Triage case object
   * @returns {number} Dynamic priority score
   */
  calculatePriorityScore(caseItem) {
    const level = caseItem.triageLevel || 3;
    const baseWeight = this.severityWeights[level] || 30;

    // Elapsed wait time in minutes
    const waitStartTime = new Date(caseItem.waitStartTime || caseItem.createdAt || Date.now());
    const elapsedMins = Math.max(0, Math.floor((Date.now() - waitStartTime.getTime()) / (1000 * 60)));

    // Vitals Risk Score multiplier
    const vitalsRiskScore = Number(caseItem.vitalsRiskScore || 0);

    // Dynamic Priority Math Formula:
    // Priority Score = (Severity Base Weight * 1000) + (Elapsed Wait Mins * 5) + (Vitals Risk * 50)
    const priorityScore = (baseWeight * 1000) + (elapsedMins * 5) + (vitalsRiskScore * 50);

    return Math.round(priorityScore * 100) / 100;
  }

  /**
   * Sort array of queue items by priority score descending, breaking ties with wait start time
   * @param {Array} queueList
   * @returns {Array} Reordered queue with updated positions
   */
  reorderQueue(queueList) {
    const scoredList = queueList.map(item => ({
      ...item,
      priorityScore: this.calculatePriorityScore(item)
    }));

    // Sort descending by priority score; if scores equal, older wait time wins
    scoredList.sort((a, b) => {
      if (b.priorityScore !== a.priorityScore) {
        return b.priorityScore - a.priorityScore;
      }
      return new Date(a.waitStartTime).getTime() - new Date(b.waitStartTime).getTime();
    });

    // Assign 1-indexed queue position
    return scoredList.map((item, index) => ({
      ...item,
      queuePosition: index + 1
    }));
  }
}

module.exports = new PriorityQueueEngine();
