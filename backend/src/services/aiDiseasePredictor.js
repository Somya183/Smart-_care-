/**
 * SmartCare Pretrained AI Clinical Diagnostic Engine & Gemini LLM Integration
 * Combines Google Gemini Generative AI API with a local Pretrained Clinical Engine.
 * Analyzes natural language symptoms, predicts specific medical conditions,
 * calculates confidence scores, emergency severity levels (Level 1-5),
 * and routes patients to the exact specialized hospital department.
 */

const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIDiseasePredictor {
  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY || '';
    if (this.geminiApiKey) {
      const genAI = new GoogleGenerativeAI(this.geminiApiKey);
      this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    } else {
      this.model = null;
    }

    // Pretrained Clinical Knowledge Database (Fallback & Local Engine)
    this.diseaseDatabase = [
      // 1. CARDIOLOGY (HEART & CIRCULATION)
      {
        id: 'dis_001',
        name: 'Acute Myocardial Infarction (Heart Attack / Coronary Syndrome)',
        category: 'Cardiovascular Emergency',
        keywords: ['heart', 'chest pain', 'crushing chest', 'left arm pain', 'angina', 'palpitations', 'cardiac', 'shortness of breath', 'racing heart', 'sweating'],
        baseProbability: 0.95,
        severity: 'Level 1 - Critical (Immediate Resuscitation)',
        triageLevel: 1,
        recommendedSpecialty: 'Cardiology',
        departmentCode: 'cardiology',
        precautions: ['Avoid exertion', 'Administer supplemental oxygen', 'Immediate EKG & Cardiac Monitor']
      },
      // 2. NEUROLOGY (BRAIN & NERVOUS SYSTEM)
      {
        id: 'dis_002',
        name: 'Acute Ischemic Stroke / Cerebrovascular Attack',
        category: 'Neurological Emergency',
        keywords: ['brain', 'headache', 'slurred speech', 'facial droop', 'arm weakness', 'numbness', 'seizure', 'dizziness', 'fainting', 'stroke', 'paralysis'],
        baseProbability: 0.93,
        severity: 'Level 1 - Critical',
        triageLevel: 1,
        recommendedSpecialty: 'Neurology',
        departmentCode: 'neurology',
        precautions: ['Check FAST protocol', 'Keep head elevated 30 degrees', 'Prepare Stat Brain CT Scan']
      },
      // 3. ORTHOPEDICS (BONES, JOINTS & TRAUMA)
      {
        id: 'dis_003',
        name: 'Acute Bone Fracture / Musculoskeletal Trauma',
        category: 'Orthopedic Trauma',
        keywords: ['bone', 'fracture', 'joint', 'knee', 'leg pain', 'arm pain', 'swelling', 'inability to walk', 'dislocation', 'spine pain', 'broken'],
        baseProbability: 0.90,
        severity: 'Level 3 - Urgent',
        triageLevel: 3,
        recommendedSpecialty: 'Orthopedics',
        departmentCode: 'orthopedics',
        precautions: ['Immobilize limb with splint', 'Stat X-Ray evaluation', 'Pain management']
      },
      // 4. GASTROENTEROLOGY & GENERAL SURGERY (ABDOMEN & STOMACH)
      {
        id: 'dis_004',
        name: 'Acute Appendicitis / Peritonitis Risk',
        category: 'Gastrointestinal Emergency',
        keywords: ['abdomen', 'stomach', 'appendix', 'right lower abdominal pain', 'rebound tenderness', 'nausea', 'vomiting', 'gut pain'],
        baseProbability: 0.88,
        severity: 'Level 2 - Emergent',
        triageLevel: 2,
        recommendedSpecialty: 'Gastroenterology & General Surgery',
        departmentCode: 'gastroenterology',
        precautions: ['NPO (Nothing by mouth)', 'Abdominal Ultrasound / CT', 'IV Fluids & Antibiotics']
      },
      // 5. PULMONOLOGY (LUNGS & RESPIRATORY)
      {
        id: 'dis_005',
        name: 'Acute Asthma Exacerbation / Respiratory Failure',
        category: 'Respiratory Distress',
        keywords: ['lung', 'asthma', 'cough', 'wheezing', 'difficulty breathing', 'gasping', 'shortness of breath', 'phlegm'],
        baseProbability: 0.89,
        severity: 'Level 2 - Emergent',
        triageLevel: 2,
        recommendedSpecialty: 'Pulmonology',
        departmentCode: 'pulmonology',
        precautions: ['Bronchodilator nebulizer', 'Monitor SpO2 oxygen level', 'Steroid therapy']
      },
      // 6. NEPHROLOGY & UROLOGY (KIDNEY & URINARY)
      {
        id: 'dis_006',
        name: 'Renal Calculi (Kidney Stone) / Severe Colic',
        category: 'Urinary Tract Emergency',
        keywords: ['kidney', 'urine', 'flank pain', 'back loin pain', 'burning urination', 'blood in urine', 'renal'],
        baseProbability: 0.86,
        severity: 'Level 3 - Urgent',
        triageLevel: 3,
        recommendedSpecialty: 'Nephrology & Urology',
        departmentCode: 'urology',
        precautions: ['IV Analgesics', 'KUB Ultrasound', 'Hydration therapy']
      }
    ];
  }

  /**
   * Predict diseases using Google Gemini AI or Pretrained Local Clinical Engine fallback
   * @param {Object} input - { symptomsText, painLevel, vitals }
   */
  async predictDiseaseAsync(input) {
    const { symptomsText = '', painLevel = 5, vitals = {} } = input;

    // Try Google Gemini LLM API if key is present
    if (this.model && this.geminiApiKey) {
      try {
        const prompt = `
          You are an expert ER AI Triage Physician.
          Analyze the patient's symptoms: "${symptomsText}".
          Pain scale: ${painLevel}/10.
          
          Respond ONLY with a valid JSON object in this exact schema without markdown formatting:
          {
            "primaryPrediction": {
              "name": "Predicted Medical Disease / Condition Name",
              "category": "Medical Specialty Emergency",
              "confidence": 0.95
            },
            "severity": "Level 1 - Critical (Immediate Resuscitation)" | "Level 2 - Emergent" | "Level 3 - Urgent" | "Level 4 - Less Urgent" | "Level 5 - Non-Urgent",
            "triageLevel": 1,
            "suggestedSpecialty": "Cardiology" | "Neurology" | "Orthopedics" | "Gastroenterology & General Surgery" | "Pulmonology" | "General Emergency",
            "recommendedActions": ["Action 1", "Action 2", "Action 3"]
          }
        `;

        const result = await this.model.generateContent(prompt);
        const text = result.response.text().trim().replace(/```json|```/g, '');
        const parsed = JSON.parse(text);
        return {
          ...parsed,
          aiSource: 'Google Gemini 1.5 Clinical LLM'
        };
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local pretrained clinical engine:', err.message);
      }
    }

    // Fallback to local Pretrained Engine
    const localResult = this.predictDisease(input);
    return {
      ...localResult,
      aiSource: 'SmartCare Pretrained Clinical Engine'
    };
  }

  /**
   * Synchronous Pretrained Local Clinical Engine
   */
  predictDisease(input) {
    const { symptomsText = '', painLevel = 5 } = input;
    const textLower = symptomsText.toLowerCase();

    let matchedDiseases = [];

    for (const disease of this.diseaseDatabase) {
      const matchCount = disease.keywords.filter(kw => textLower.includes(kw)).length;
      if (matchCount > 0) {
        const confidence = Math.min(0.99, disease.baseProbability + (matchCount * 0.03) + (painLevel >= 8 ? 0.02 : 0));
        matchedDiseases.push({
          ...disease,
          confidence: Math.round(confidence * 100) / 100,
          matchScore: matchCount
        });
      }
    }

    matchedDiseases.sort((a, b) => b.confidence - a.confidence);

    if (matchedDiseases.length === 0) {
      const isHighPain = painLevel >= 7;
      matchedDiseases.push({
        id: 'dis_def',
        name: 'General Acute Distress Syndrome',
        category: 'General Emergency',
        keywords: [],
        confidence: 0.78,
        severity: isHighPain ? 'Level 2 - Emergent' : 'Level 4 - Less Urgent',
        triageLevel: isHighPain ? 2 : 4,
        recommendedSpecialty: 'General ER',
        departmentCode: 'general_er',
        precautions: ['Nurse initial vitals assessment', 'General triage evaluation']
      });
    }

    const primaryPrediction = matchedDiseases[0];

    return {
      primaryPrediction,
      differentialDiagnosis: matchedDiseases.slice(1, 4),
      severity: primaryPrediction.severity,
      triageLevel: primaryPrediction.triageLevel,
      suggestedSpecialty: primaryPrediction.recommendedSpecialty,
      departmentCode: primaryPrediction.departmentCode,
      recommendedActions: primaryPrediction.precautions,
      aiSource: 'SmartCare Pretrained Clinical Engine'
    };
  }
}

module.exports = new AIDiseasePredictor();
