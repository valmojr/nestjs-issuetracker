import { Injectable } from '@nestjs/common';
import { URLSearchParams } from 'url';
import { Issue } from './issueTypes';

@Injectable()
export class IssueService {
  async getAllIssues() {
    const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
      process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
    );

    const params = new URLSearchParams();
    params.append('state', 'all');
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const issues = await fetch(url);

    return await issues.json();
  }

  async getOpenIssues() {
    const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
      process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
    );

    const params = new URLSearchParams();
    params.append('state', 'open');
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const issues = await fetch(url);

    return await issues.json();
  }

  async getIssuesByAssignedUser(username: string) {
    const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
      process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
    );

    const params = new URLSearchParams();
    params.append('state', 'open');
    params.append('assigned_by', username);
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const issues: Issue[] = await (await fetch(url)).json();

    return issues;
  }
}
