import { GitRepoInterface } from '../../Components/Portfolio/Portfolio';
import { UPDATE_REPO } from '../Types/portfolioTypes';

export function updateRepo(repo: GitRepoInterface) {
  return {
    type: UPDATE_REPO,
    repo: repo
  };
}
