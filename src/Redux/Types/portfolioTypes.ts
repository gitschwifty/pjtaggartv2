import { GitRepoInterface } from '../../Components/Portfolio/Portfolio';

export const UPDATE_REPO = 'UPDATE_REPO';

export interface PortfolioState {
  repos: GitRepoInterface[];
}

interface UpdateRepoAction {
  type: typeof UPDATE_REPO;
  repo: GitRepoInterface;
}

export type PortfolioActionType = UpdateRepoAction;
