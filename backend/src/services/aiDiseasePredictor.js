/**
 * SmartCare AI - Disease Prediction Engine
 * Analyzes natural language symptoms, suggests specific disease predictions,
 * calculates probability scores, severity levels, and department suggestions.
 */

class AIDiseasePredictor {
  constructor() {
    this.diseaseDatabase = [
      {
        id: 'dis_001',
        name: 'Acute Myocardial Infarction (Heart Attack)',
        category: 'Cardiovascular Emergency',
        keywords: ['chest pain', 'crushing chest', 'left arm pain', 'shortness of breath', 'sweating', 'diaphoresis', 'palpitations'],
        baseProbability: 0.94,
        severity: 'CRITICAL',
        recommendedSpecialty: 'Cardiology',
        urgencyLevel: 'HIGH',
        precautions: ['Avoid exertion', 'Administer supplemental oxygen', 'Immediate EKG required']
      },
      {
        id: 'dis_002',
        name: 'Acute Ischemic Stroke',
        category: 'Neurological Emergency',
        keywords: ['facial droop', 'slurred speech', 'arm weakness', 'sudden numbness', 'loss of balance', 'confusion'],
        baseProbability: 0.92,
        severity: 'CRITICAL',
        recommendedSpecialty: 'Neurology',
        urgencyLevel: 'HIGH',
        precautions: ['Check FAST protocol', 'Keep patient elevated', 'Prepare CT scan']
      },
      {
        id: 'dis_003',
        name: 'Acute Asthma Exacerbation / Bronchospasm',
        category: 'Respiratory Distress',
        keywords: ['wheezing', 'difficulty breathing', 'coughing', 'chest tightness', 'gasping'],
        baseProbability: 0.88,
        severity: 'URGENT',
        recommendedSpecialty: 'Pulmonology',
        urgencyLevel: 'MEDIUM',
        precautions: ['Nebulizer therapy', 'Monitor SpO2 saturation']
      },
      {
        id: 'dis_004',
        name: 'Acute Appendicitis',
        category: 'Gastrointestinal Emergency',
        keywords: ['right lower abdominal pain', 'rebound tenderness', 'nausea', 'vomiting', 'fever', 'loss of appetite'],
        baseProbability: 0.86,
        severity: 'URGENT',
        recommendedSpecialty: 'General Surgery',
        urgencyLevel: 'MEDIUM',
        precautions: ['NPO (Nothing by mouth)', 'Abdominal ultrasound', 'IV fluids']
      },
      {
        id: 'dis_005',
        name: 'Acute Gastroenteritis / Dehydration',
        category: 'Gastrointestinal',
        keywords: ['diarrhea', 'stomach cramps', 'nausea', 'vomiting', 'mild fever', 'dehydration'],
        baseProbability: 0.82,
        severity: 'MODERATE',
        recommendedSpecialty: 'General Medicine',
        urgencyLevel: 'LOW',
        precautions: ['Oral rehydration salts', 'Probiotics', 'Fluid monitoring']
      },
      {
        id: 'dis_006',
        name: 'Fracture / Acute Trauma',
        category: 'Orthopedic Trauma',
        keywords: ['bone pain', 'swelling', 'inability to bear weight', 'deformity', 'fall injury'],
        baseProbability: 0.90,
        severity: 'URGENT',
        recommendedSpecialty: 'Orthopedics',
        urgencyLevel: 'MEDIUM',
        precautions: ['Immobilize limb', 'X-ray evaluation', 'Analgesics']
      }
    ];
  }

  /**
   * Predict diseases based on patient symptom intake
   * @param {Object} input - { symptomsText, painLevel, vitals }
   */
  predictDisease(input) {
    const { symptomsText = '', painLevel = 5, vitals = {} } = input;
    const textLower = symptomsText.toLowerCase();

    let matchedDiseases = [];

    for (const disease of this.diseaseDatabase) {
      const matchCount = disease.keywords.filter(kw => textLower.includes(kw)).length;
      if (matchCount > 0) {
        const confidence = Math.min(0.99, disease.baseProbability + (matchCount * 0.02) + (painLevel >= 8 ? 0.03 : 0));
        matchedDiseases.push({
          ...disease,
          confidence: Math.round(confidence * 100) / 100,
          matchScore: matchCount
        });
      }
    }

    // Sort by confidence score descending
    matchedDiseases.sort((a, b) => b.confidence - a.confidence);

    if (matchedDiseases.length === 0) {
      // Fallback prediction
      matchedDiseases.push({
        id: 'dis_def',
        name: 'General Acute Distress Syndrome',
        category: 'General Medicine',
        keywords: [],
        confidence: 0.75,
        severity: painLevel >= 7 ? 'URGENT' : 'MODERATE',
        recommendedSpecialty: 'General ER',
        urgencyLevel: painLevel >= 7 ? 'HIGH' : 'LOW',
        precautions: ['Nurse evaluation', 'Standard blood panel']
      });
    }

    const primaryPrediction = matchedDiseases[0];

    return {
      primaryPrediction,
      differentialDiagnosis: matchedDiseases.slice(1, 4),
      severity: primaryPrediction.severity,
      suggestedSpecialty: primaryPrediction.recommendedSpecialty,
      recommendedActions: primaryPrediction.precautions
    };
  }
}

module.exports = new AIDiseasePredictor();
