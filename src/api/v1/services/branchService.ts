import { Branch } from '../interfaces/branch';

let branches: Branch[] = []; // Temporary in-memory storage for branches

/**
 * Adds a new branch to the list with a unique identifier.
 * 
 * @param {Branch} branch - The branch details.
 * @returns {Branch} The created branch with an assigned id.
 */
export const createBranch = (branch: Branch): Branch => {
  const newBranch = { ...branch, id: branches.length + 1 };
  branches.push(newBranch);
  return newBranch;
};

/**
 * Retrieves all stored branches.
 * 
 * @returns {Branch[]} A list of all branches.
 */
export const getAllBranches = (): Branch[] => {
  return branches;
};

/**
 * Finds a branch by its identifier.
 * 
 * @param {number} id - The branch id.
 * @returns {Branch | undefined} The matching branch or undefined if not found.
 */
export const getBranchById = (id: number): Branch | undefined => {
  return branches.find(branch => branch.id === id);
};

/**
 * Updates the details of an existing branch.
 * 
 * @param {number} id - The branch id.
 * @param {Partial<Branch>} updatedData - The new branch details.
 * @returns {Branch | undefined} The updated branch or undefined if not found.
 */
export const updateBranch = (id: number, updatedData: Partial<Branch>): Branch | undefined => {
  const branchIndex = branches.findIndex(branch => branch.id === id);
  if (branchIndex === -1) return undefined;
  
  const updatedBranch = { ...branches[branchIndex], ...updatedData };
  branches[branchIndex] = updatedBranch;
  return updatedBranch;
};

/**
 * Removes a branch by its identifier.
 * 
 * @param {number} id - The branch id.
 * @returns {boolean} True if the branch was removed, otherwise false.
 */
export const deleteBranch = (id: number): boolean => {
  const branchIndex = branches.findIndex(branch => branch.id === id);
  if (branchIndex === -1) return false;
  
  branches.splice(branchIndex, 1);
  return true;
};
