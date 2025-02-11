import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await searchGithub();
      setCandidates(data);
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    const user = await searchGithubUser(searchTerm);
    setCandidates(user ? [user] : []);
    setLoading(false);
  };

  const saveCandidate = (candidate: Candidate) => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...saved, candidate]));
    alert(`${candidate.login} saved!`);
  };

  return (
    <section>
      <h1>Search GitHub Candidates</h1>
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? <p>Loading...</p> : null}

      <div>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard key={candidate.login} candidate={candidate} onSave={saveCandidate} />
          ))
        ) : (
          <p>No candidates found</p>
        )}
      </div>
    </section>
  );
};

export default CandidateSearch;
