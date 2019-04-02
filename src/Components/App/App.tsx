import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Client, DatabaseAPI, Discussion } from 'dsteem';
import { updatePosts, clearPost } from '../../Redux/Actions/postActions';
import { AppState } from '../../Redux/Reducers';
import Home from '../Home';
import Portfolio from '../Portfolio';
import Feed from '../Feed';
import About from '../About';

import './App.css';
import Post from '../Post';
import { GitRepoInterface, GitDirInterface } from '../Portfolio/Portfolio';
import { updateRepo } from '../../Redux/Actions/portfolioActions';
import { Dispatch } from 'redux';

interface AppProps {
  posts: Discussion[];
  repos: GitRepoInterface[];
  updatePosts: typeof updatePosts;
  clearPost: typeof clearPost;
  updateRepo: typeof updateRepo;
}

const mapStateToProps = (state: AppState) => ({
  posts: state.Post.posts,
  repos: state.Portfolio.repos
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updatePosts: (newPosts: Discussion[]) => dispatch(updatePosts(newPosts)),
  clearPost: (key: string) => dispatch(clearPost(key)),
  updateRepo: (repo: GitRepoInterface) => dispatch(updateRepo(repo))
});

class App extends React.Component<AppProps> {
  private steemClient: Client;
  private dbAPI: DatabaseAPI;

  constructor(props: AppProps) {
    super(props);

    this.steemClient = new Client('https://api.steemit.com');
    this.dbAPI = new DatabaseAPI(this.steemClient);
  }

  public componentDidMount() {
    this.dbAPI
      .getDiscussions('blog', {
        tag: 'petertag',
        limit: 100
      })
      .then(posts => {
        const noActifitPosts = posts.filter(
          post => post.category !== 'actifit' && post.author === 'petertag'
        );
        this.props.updatePosts(noActifitPosts);
      })
      .catch(error => alert(error));

    for (const repo of this.props.repos) {
      fetch(
        'https://api.github.com/repos/gitschwifty/' + repo.url + '/contents'
      )
        .then(response => {
          if (response.status !== 403) {
            response
              .json()
              .then(data => {
                for (const file of data) {
                  if (file.type === 'dir' || file.type === 'tree') {
                    if (file.path !== 'public' || repo.url !== 'pjtaggart') {
                      repo.topDirs.push(this.getTreeRecursive(file));
                    }
                  } else {
                    repo.topFiles.push({
                      sha: file.sha,
                      path: file.path,
                      type: file.type,
                      git_url: file.git_url
                    });
                  }
                }

                this.props.updateRepo(repo);
              })
              .catch(error => alert(error));
          }
        })
        .catch(error => alert(error));
    }
  }

  private getTreeRecursive(file: any) {
    const dir: GitDirInterface = {
      sha: file.sha,
      path: file.path,
      git_url: file.git_url,
      dirs: [],
      files: []
    };

    fetch(file.git_url + '?recursive=1')
      .then(response => {
        if (response.status !== 403) {
          response
            .json()
            .then(data => {
              for (const treeFile of data.tree) {
                if (treeFile.path.includes('/')) {
                  const path = treeFile.path.split('/');
                  dir.dirs = dir.dirs.map(folder =>
                    folder.path === path[0]
                      ? this.updateDir(path.slice(1), treeFile, folder)
                      : folder
                  );
                } else {
                  if (treeFile.type === 'tree') {
                    dir.dirs.push({
                      sha: treeFile.sha,
                      path: treeFile.path,
                      git_url: treeFile.url,
                      dirs: [],
                      files: []
                    });
                  } else {
                    dir.files.push({
                      sha: treeFile.sha,
                      path: treeFile.path,
                      type: treeFile.type,
                      git_url: treeFile.url
                    });
                  }
                }
              }

              return dir;
            })
            .catch(error => alert(error));
        }
      })
      .catch(error => alert(error));

    return dir;
  }

  private updateDir(path: string[], file: any, dir: GitDirInterface) {
    if (path.length === 1) {
      if (file.type === 'tree') {
        dir.dirs.push({
          sha: file.sha,
          path: path[0],
          git_url: file.url,
          dirs: [],
          files: []
        });
      } else {
        dir.files.push({
          sha: file.sha,
          path: path[0],
          type: file.type,
          git_url: file.url
        });
      }
    } else {
      dir.dirs = dir.dirs.map(folder =>
        folder.path === path[0]
          ? this.updateDir(path.slice(1), file, folder)
          : folder
      );
    }

    return dir;
  }

  public render() {
    return (
      <div id='app_container'>
        <BrowserRouter>
          <Route exact path='/' component={Home} />
          <Route path='/portfolio' component={Portfolio} />
          <Route path='/feed' component={Feed} />
          <Route path='/about' component={About} />
          <Route path='/post/:permlink' component={Post} />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
