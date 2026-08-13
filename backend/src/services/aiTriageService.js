/**
 * MedPulse ER - AI Triage Engine
 * Performs NLP Keyword & Clinical Symptom Assessment, Vitals Risk Calculation,
 * Emergency Severity Index (Level 1-5) Scoring, and Department Assignment.
 */

class AITriageService {
  constructor() {
    // Clinical Keyword Dictionary with Severity Weights & Target Departments
    this.clinicalRules = [
      {
        keywords: ['cardiac', 'chest pain', 'heart attack', 'cardiac arrest', 'left arm pain', 'crushing chest', 'diaphoresis'],
        level: 1,
        severityLabel: 'Resuscitation / Critical',
        department: 'Cardiology ER',
        baseConfidence: 0.98,
        riskFactors: ['Potential Acute Myocardial Infarction', 'Cardiogenic Shock Risk']
      },
      {
        keywords: ['stroke', 'slurred speech', 'facial droop', 'unilateral weakness', 'seizure', 'unresponsive', 'coma'],
        level: 1,
        severityLabel: 'Resuscitation / Critical',
        department: 'Neurology Stroke Unit',
        baseConfidence: 0.96,
        riskFactors: ['Acute Ischemic/Hemorrhagic Stroke', 'Neurological Compromise']
      },
      {
        keywords: ['gunshot', 'stab', 'severe hemorrhage', 'amputation', 'major trauma', 'multiple fracture', 'car crash'],
        level: 1,
        severityLabel: 'Resuscitation / Critical',
        department: 'Trauma & Emergency Surgery',
        baseConfidence: 0.97,
        riskFactors: ['Massive Hemorrhage', 'Polytrauma', 'Hypovolemic Shock']
      },
      {
        keywords: ['shortness of breath', 'difficulty breathing', 'wheezing', 'asthma attack', 'cyanosis', 'choking'],
        level: 2,
        severityLabel: 'Emergent',
        department: 'General ER',
        baseConfidence: 0.91,
        riskFactors: ['Acute Respiratory Distress', 'Hypoxia Risk']
      },
      {
        keywords: ['severe abdominal pain', 'appendicitis', 'high fever', 'persistent vomiting', 'dehydration'],
        level: 3,
        severityLabel: 'Urgent',
        department: 'General ER',
        baseConfidence: 0.88,
        riskFactors: ['Acute Abdomen', 'Severe Infection / Sepsis Risk']
      },
      {
        keywords: ['child fever', 'pediatric cough', 'child vomiting', 'pediatric rash'],
        level: 3,
        severityLabel: 'Urgent',
        department: 'Pediatric ER',
        baseConfidence: 0.92,
        riskFactors: ['Pediatric Febrile Condition']
      },
      {
        keywords: ['sprain', 'ankle injury', 'minor laceration', 'mild fever', 'sore throat', 'earache'],
        level: 4,
        severityLabel: 'Less Urgent',
        department: 'General ER',
        baseConfidence: 0.85,
        riskFactors: ['Minor Musculoskeletal Injury', 'Mild Localized Infection']
      },
      {
        keywords: ['prescription refill', 'suture removal', 'routine checkup', 'rash', 'minor abrasion'],
        level: 5,
        severityLabel: 'Non-Urgent',
        department: 'Outpatient ER Clinic',
        baseConfidence: 0.90,
        riskFactors: ['Non-Urgent Condition']
      }
    ];
  }

  /**
   * Evaluate patient intake data and compute AI Triage Result
   * @param {Object} intakeData
   * @returns {Object} Triage Assessment Result
   */
  assessIntake(intakeData) {
    const { symptomsText = '', painLevel = 1, vitals = {}, medicalHistory = [] } = intakeData;
    const textLower = symptomsText.toLowerCase();

    let matchedRule = null;
    for (const rule of this.clinicalRules) {
      if (rule.keywords.some(kw => textLower.includes(kw))) {
        matchedRule = rule;
        break;
      }
    }

    // Default rule if no explicit keyword matches
    if (!matchedRule) {
      if (painLevel >= 8) {
        matchedRule = {
          level: 2,
          severityLabel: 'Emergent',
          department: 'General ER',
          baseConfidence: 0.78,
          riskFactors: ['Severe Pain Distress']
        };
      } else if (painLevel >= 5) {
        matchedRule = {
          level: 3,
          severityLabel: 'Urgent',
          department: 'General ER',
          baseConfidence: 0.80,
          riskFactors: ['Moderate Pain']
        };
      } else {
        matchedRule = {
          level: 4,
          severityLabel: 'Less Urgent',
          department: 'General ER',
          baseConfidence: 0.82,
          riskFactors: ['Low Complexity Complaint']
        };
      }
    }

    // Compute Vitals Risk Modifier
    const vitalsRisk = this.calculateVitalsRisk(vitals);
    let finalLevel = matchedRule.level;

    // Escalation trigger: unstable vitals escalate triage level by 1 step (up to Level 1)
    if (vitalsRisk.isUnstable && finalLevel > 1) {
      finalLevel -= 1;
    }

    return {
      triageLevel: finalLevel,
      severityLabel: this.getSeverityLabel(finalLevel),
      assignedDepartment: matchedRule.department,
      aiConfidence: matchedRule.baseConfidence,
      riskFactors: [...matchedRule.riskFactors, ...vitalsRisk.flags],
      vitalsRiskScore: vitalsRisk.score,
      recommendedActions: this.getRecommendedActions(finalLevel, matchedRule.department)
    };
  }

  /**
   * Evaluate vital signs instability
   */
  calculateVitalsRisk(vitals) {
    let score = 0;
    const flags = [];

    const hr = Number(vitals.heartRate);
    const spo2 = Number(vitals.oxygenSat);
    const temp = Number(vitals.temperature);

    if (hr > 120) {
      score += 30;
      flags.push('Severe Tachycardia (HR > 120)');
    } else if (hr < 50 && hr > 0) {
      score += 30;
      flags.push('Bradycardia (HR < 50)');
    }

    if (spo2 > 0 && spo2 < 92) {
      score += 40;
      flags.push('Hypoxia Risk (SpO2 < 92%)');
    }

    if (temp > 39.0) {
      score += 20;
      flags.push('High Febrile State (Temp > 39°C)');
    }

    return {
      score,
      isUnstable: score >= 30,
      flags
    };
  }

  getSeverityLabel(level) {
    const labels = {
      1: 'Critical / Resuscitation',
      2: 'Emergent',
      3: 'Urgent',
      4: 'Less Urgent',
      5: 'Non-Urgent'
    };
    return labels[level] || 'Urgent';
  }

  getRecommendedActions(level, dept) {
    if (level === 1) return ['Immediate Resuscitation Room', 'Notify On-Call Trauma/Cardiology Team', 'Establish IV & Monitor Vitals'];
    if (level === 2) return ['Bed Assignment within 10 Mins', 'Continuous Pulse Oximetry', 'Rapid Diagnostic Workup'];
    if (level === 3) return ['Placement in Urgent Care Bay', 'Standard Blood Work & Vitals Evaluation'];
    return ['Waiting Room Intake', 'Routine Nurse Evaluation'];
  }
}

module.exports = new AITriageService();
