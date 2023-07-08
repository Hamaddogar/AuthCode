import React from 'react';
import { auth, provider } from './firebase';

const GitHubAuth = () => {
  const signInWithGitHub = () => {
    auth.signInWithPopup(provider)
      .catch((error) => {
        console.error('Error signing in with GitHub:', error);
      }).then(()=>console.log(provider))
  };

  return (
    <button onClick={signInWithGitHub}>Sign In with GitHub</button>
  );
};

export default GitHubAuth;
