import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import CandidateCard from '../components/CandidateCard';
import './CandidateSearch.css';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch a random candidate with full details on page refresh/load
  const fetchRandomCandidate = async () => {
    setLoading(true);
    try {
      //set candidates to wait for searchgithub method ( from API.tsx)
      const candidates = await searchGithub();
      if (candidates.length > 0) {
        const randomIndex = Math.floor(Math.random() * candidates.length);
        const selectedCandidate = candidates[randomIndex];

        // console.log('Basic Candidate Info:', selectedCandidate); see random candidate info

        const fullCandidate = await searchGithubUser(selectedCandidate.login);

        // console.log('Full Candidate Info:', fullCandidate); pull details about email, bio, location, etc 


        //alternatively sets candidates email/location/company/bio to null or none if its not available 
        setCandidate({
          ...selectedCandidate,
          location: fullCandidate.location || 'N/A',
          email: fullCandidate.email || 'N/A',
          company: fullCandidate.company || 'N/A',
          bio: fullCandidate.bio || 'No bio available',
        });
      }


    } catch (error) {
      console.error('Error fetching candidate:', error);
    }
    setLoading(false);
  };

  // Search for a specific GitHub user by username
  const searchCandidate = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const user = await searchGithubUser(searchTerm);
      if (user && user.login) {
        setCandidate({
          ...user,
          location: user.location || 'N/A',
          email: user.email || 'N/A',
          company: user.company || 'N/A',
          bio: user.bio || 'No bio available',
        });
      } else {
        alert('User not found.');
      }
    } catch (error) {
      console.error('Error searching for user:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRandomCandidate();
  }, []);

  const saveCandidate = () => {
    if (!candidate) return;
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    localStorage.setItem('savedCandidates', JSON.stringify([...saved, candidate]));
    alert(`${candidate.login} saved!`);
    fetchRandomCandidate(); // Fetch a new candidate after saving
  };

  const skipCandidate = () => {
    fetchRandomCandidate();
  };

  return (
    <section className="candidate-search-page">
    {/* Centered Search Bar at the Top */}
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchCandidate}> Search</button>
    </div>

    {loading ? (
      <p>Loading...</p>
    ) : candidate ? (
      <div className="candidate-container">
        <CandidateCard candidate={candidate} />

        {/* Buttons Below the Card */}
        <div className="button-container">
          <button onClick={saveCandidate}> Save Candidate</button>
          <button onClick={skipCandidate}> Skip</button>
        </div>
      </div>
    ) : (
      <p>No candidate available</p>
    )}
  </section>
  );
};

export default CandidateSearch;
