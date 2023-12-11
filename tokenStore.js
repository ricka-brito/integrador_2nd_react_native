import { create } from 'zustand';

const useTokenStore = create((set) => ({
  token: null, // Initial token value is null
  setToken: (newToken) => set({ token: newToken }), // Function to set the token
}));

export default useTokenStore;
