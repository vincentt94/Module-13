import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';
import './SavedCandidates.css';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  // retrieve from localstroage any saved candidates 
  useEffect(() => {
    //converts json string back into js array
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  // Function to remove a candidate from localStorage
  const removeCandidate = (candidateId: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== candidateId);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  return (
    <section className="saved-candidates-page">
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <div className="candidates-container">
          {savedCandidates.map((candidate) => (
            <div key={candidate.id} className="saved-candidate-card">
              <CandidateCard candidate={candidate} />
              <button className="remove-button" onClick={() => removeCandidate(candidate.id)}>
                {/* Button to remove candidate from local storage & from the page */}
                 Remove Candidate
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-candidates">No saved candidates yet.</p>
      )}
    </section>
  );
};

export default SavedCandidates;
