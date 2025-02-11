// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
    id: number;
    login: string; // Username
    name?: string; // Full Name 
    location?: string; // Location 
    avatar_url: string; // Profile picture
    email?: string | null; // Email 
    html_url: string; // GitHub profile link
    company?: string | null; // Company (may be null)
    bio?: string | null; // Short bio (may be null)
  }
  