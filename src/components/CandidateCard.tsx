import { Candidate } from '../interfaces/Candidate.interface';

interface CandidateCardProps {
  candidate: Candidate;
  onSave?: (candidate: Candidate) => void;
}

const CandidateCard = ({ candidate, onSave }: CandidateCardProps) => {
  return (
    <div className="candidate-card">
      <img src={candidate.avatar_url} alt={candidate.login} />
      <div className="candidate-details">
        <h2>{candidate.name || candidate.login}</h2>
        <p><strong>Username:</strong> {candidate.login}</p>
        <p><strong>Location:</strong> {candidate.location || 'N/A'}</p>
        <p><strong>Email:</strong> {candidate.email || 'N/A'}</p>
        <p><strong>Company:</strong> {candidate.company || 'N/A'}</p>
        <p><strong>Bio:</strong> {candidate.bio || 'No bio available'}</p>
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">View Profile</a>
        {onSave && <button onClick={() => onSave(candidate)}>Save Candidate</button>}
      </div>
    </div>
  );
};

export default CandidateCard;
