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
import {
  GitRepoInterface,
  GitDirInterface,
  GitTreeInterface
} from '../Portfolio/Portfolio';
import { updateRepo } from '../../Redux/Actions/portfolioActions';
import { Dirent } from 'fs';

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

const mapDispatchToProps = (dispatch: Function) => ({
  updatePosts: (newPosts: Discussion[]) => dispatch(updatePosts(newPosts)),
  clearPost: (key: string) => dispatch(clearPost(key)),
  updateRepo: (repo: GitRepoInterface) => dispatch(updateRepo(repo))
});

class App extends React.Component<AppProps> {
  steemClient: Client;
  dbAPI: DatabaseAPI;

  constructor(props: AppProps) {
    super(props);

    this.steemClient = new Client('https://api.steemit.com');
    this.dbAPI = new DatabaseAPI(this.steemClient);
  }

  componentDidMount() {
    this.dbAPI
      .getDiscussions('blog', {
        tag: 'petertag',
        limit: 100
      })
      .then(posts => {
        console.log(posts);
        const noActifitPosts = posts.filter(
          post => post.category !== 'actifit' && post.author === 'petertag'
        );
        console.log(noActifitPosts);
        this.props.updatePosts(noActifitPosts);
      })
      .catch(error => console.log(error));

    for (const repo of this.props.repos) {
      fetch(
        'https://api.github.com/repos/gitschwifty/' + repo.url + '/contents'
      ).then(response => {
        if (response.status !== 403) {
          response.json().then(data => {
            for (const file of data) {
              console.log(file);

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
          });
        } else {
          console.log('AUTH_ERROR');
        }
      });
    }
  }

  getTreeRecursive(file: any) {
    let dir: GitDirInterface = {
      sha: file.sha,
      path: file.path,
      git_url: file.git_url,
      has_dir: false,
      dir: [],
      tree: {
        sha: '',
        tree: []
      }
    };

    fetch(file.git_url + '?recursive=1').then(response => {
      if (response.status !== 403) {
        response.json().then(data => {
          dir.sha = data.sha;

          for (const treeFile of data.tree) {
            dir = this.getPath(treeFile.path.split('/'), treeFile, dir);
          }

          console.log(data);
          return dir;
        });
      } else {
        console.log('AUTHERROR');
      }
    });

    return dir;
  }

  getPath(path: string[], file: any, dir: GitDirInterface): GitDirInterface {
    if (path[0] === 'ckeditor' || path[0] === '') return dir;

    if (path.length === 1) {
      if (file.type === 'tree') {
        dir.dir.push({
          sha: file.sha,
          path: path[0],
          git_url: file.url,
          has_dir: false,
          dir: [],
          tree: {
            sha: file.sha,
            tree: []
          }
        });
      } else {
        dir.tree.tree.push({
          sha: file.sha,
          path: path[0],
          type: file.type,
          url: file.url
        });
      }

      return dir;
    } else {
      const nextDir = dir.dir.find(val => val.path === path[0]);

      if (nextDir) {
        return {
          ...dir,
          dir: [
            ...dir.dir.filter(value => value.path !== path[0]),
            this.getPath(path.slice(1), file, nextDir)
          ]
        };
      } else {
        return {
          ...dir,
          dir: [
            ...dir.dir.filter(value => value.path !== path[0]),
            this.getPath(path.slice(1), file, {
              sha: file.sha,
              path: path[0],
              git_url: file.url,
              has_dir: false,
              dir: [],
              tree: {
                sha: file.sha,
                tree: []
              }
            })
          ]
        };
      }
    }

    return dir;
  }

  render() {
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
