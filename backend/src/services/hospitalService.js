/**
 * SmartCare - Hospital & Bed Management Service
 * Manages hospital listings, bed/seat availability, and doctor rosters.
 */

class HospitalService {
  constructor() {
    this.hospitals = [
      {
        id: 'hosp_101',
        name: 'City Care General Hospital',
        location: 'Downtown Metro Center, Sector 4',
        rating: 4.8,
        distanceKm: 2.3,
        totalBeds: 150,
        availableBeds: 24,
        specialties: ['Cardiology', 'Neurology', 'General Surgery', 'General ER'],
        seats: [
          { id: 'seat_101', name: 'ICU Bed 01 - Cardiac Bay', type: 'ICU', isOccupied: false },
          { id: 'seat_102', name: 'ICU Bed 02 - Cardiac Bay', type: 'ICU', isOccupied: true },
          { id: 'seat_103', name: 'ER Bay 01 - Acute Trauma', type: 'ER', isOccupied: false },
          { id: 'seat_104', name: 'ER Bay 02 - General', type: 'ER', isOccupied: false },
          { id: 'seat_105', name: 'General Bed 12', type: 'GENERAL', isOccupied: false }
        ],
        doctors: [
          { id: 'doc_201', name: 'Dr. Sarah Jenkins, MD', specialization: 'Cardiology', isAvailable: true },
          { id: 'doc_202', name: 'Dr. Robert Chen, MD', specialization: 'Neurology', isAvailable: true },
          { id: 'doc_203', name: 'Dr. Anita Roy, MS', specialization: 'General Surgery', isAvailable: true }
        ]
      },
      {
        id: 'hosp_102',
        name: 'Apex Super Specialty Medical Center',
        location: 'North Hill Avenue, Block B',
        rating: 4.9,
        distanceKm: 4.1,
        totalBeds: 200,
        availableBeds: 42,
        specialties: ['Neurology', 'Orthopedics', 'Pulmonology', 'Pediatrics'],
        seats: [
          { id: 'seat_201', name: 'Neuro ICU Bed 04', type: 'ICU', isOccupied: false },
          { id: 'seat_202', name: 'Ortho ER Bay 03', type: 'ER', isOccupied: false },
          { id: 'seat_203', name: 'Pediatric Bay 01', type: 'PEDIATRIC', isOccupied: false }
        ],
        doctors: [
          { id: 'doc_301', name: 'Dr. Vikram Patel, DM', specialization: 'Neurology', isAvailable: true },
          { id: 'doc_302', name: 'Dr. Emily Vance, MS', specialization: 'Orthopedics', isAvailable: true }
        ]
      },
      {
        id: 'hosp_103',
        name: 'St. Jude Emergency & Trauma Care',
        location: 'West Avenue 12th Street',
        rating: 4.7,
        distanceKm: 5.8,
        totalBeds: 100,
        availableBeds: 12,
        specialties: ['Trauma Surgery', 'Orthopedics', 'General Medicine'],
        seats: [
          { id: 'seat_301', name: 'Trauma Bay Red 1', type: 'TRAUMA', isOccupied: false },
          { id: 'seat_302', name: 'Trauma Bay Red 2', type: 'TRAUMA', isOccupied: true }
        ],
        doctors: [
          { id: 'doc_401', name: 'Dr. Marcus Brody, FACS', specialization: 'Trauma Surgery', isAvailable: true }
        ]
      }
    ];
  }

  getHospitals(searchQuery = '') {
    if (!searchQuery.trim()) return this.hospitals;

    const query = searchQuery.toLowerCase();
    return this.hospitals.filter(h =>
      h.name.toLowerCase().includes(query) ||
      h.location.toLowerCase().includes(query) ||
      h.specialties.some(s => s.toLowerCase().includes(query))
    );
  }

  getHospitalById(id) {
    return this.hospitals.find(h => h.id === id);
  }

  getHospitalSeats(hospitalId) {
    const hosp = this.getHospitalById(hospitalId);
    return hosp ? hosp.seats : [];
  }

  updateSeatOccupancy(hospitalId, seatId, isOccupied) {
    const hosp = this.getHospitalById(hospitalId);
    if (!hosp) return false;

    const seat = hosp.seats.find(s => s.id === seatId);
    if (seat) {
      const prevStatus = seat.isOccupied;
      seat.isOccupied = isOccupied;
      if (prevStatus !== isOccupied) {
        hosp.availableBeds += isOccupied ? -1 : 1;
      }
      return true;
    }
    return false;
  }
}

module.exports = new HospitalService();
