import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { URLSearchParams } from 'url';
import { Issue } from './issueTypes';

@Injectable()
export class IssueService {
  private logger = new Logger(IssueService.name);

  async getAllIssues() {
    try {
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
    } catch (error) {
      this.logger.error(`Error while fetching issues`);

      if (typeof error == typeof BadRequestException) {
        this.logger.error(
          `The error is a BadRequestException, is the environment variables correctly set?`,
        );
      } else {
        this.logger.error(``);
      }

      process.exit(1);
    }
  }

  async getOpenIssues() {
    try {
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
    } catch (error) {
      this.logger.error(`Error while fetching issues`);

      if (typeof error == typeof BadRequestException) {
        this.logger.error(
          `The error is a BadRequestException, is the environment variables correctly set?`,
        );
      } else {
        this.logger.error(``);
      }

      process.exit(1);
    }
  }

  async getIssuesByAssignedUser(username: string) {
    try {
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
    } catch (error) {
      this.logger.error(`Error while fetching issues assigned to ${username}`);

      if (typeof error == typeof BadRequestException) {
        this.logger.error(
          `The error is a BadRequestException, is the environment variables correctly set?`,
        );
      } else if (error.message == 'Unexpected token < in JSON at position 0') {
        this.logger.error(
          `The error is a Unexpected token < in JSON at position 0, is the environment variables correctly set?`,
        );
      } else if (error.message.includes('Failed to fetch')) {
        this.logger.error(
          `The error is a Failed to fetch, is the server up and running?`,
        );
      } else {
        this.logger.error(error);
      }

      process.exit(1);
    }
  }

  async getOnExecIssues() {
    try {
      const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
        process.env;
      const url = new URL(
        `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
      );

      const params = new URLSearchParams();
      params.append('state', 'open');
      params.append('labels', 'Status/Em execução');
      params.append('token', GITEA_AUTH_TOKEN);

      url.search = params.toString();

      const issues: Issue[] = await (await fetch(url)).json();

      return issues;
    } catch (error) {
      this.logger.error(`Error while fetching on going issues`);

      if (typeof error == typeof BadRequestException) {
        this.logger.error(
          `The error is a BadRequestException, is the environment variables correctly set?`,
        );
      } else if (error.message == 'Unexpected token < in JSON at position 0') {
        this.logger.error(
          `The error is a Unexpected token < in JSON at position 0, is the environment variables correctly set?`,
        );
      } else if (error.message.includes('Failed to fetch')) {
        this.logger.error(
          `The error is a Failed to fetch, is the server up and running?`,
        );
      } else {
        this.logger.error(error);
      }

      process.exit(1);
    }
  }
  async getImprovementIssues() {
    try {
      const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
        process.env;
      const url = new URL(
        `http://${GITEA_URL}/api/v1/repos/${GITEA_REPO_OWNER}/${GITEA_REPO_NAME}/issues`,
      );

      const params = new URLSearchParams();
      params.append('state', 'open');
      params.append('labels', 'Status/Melhorias');
      params.append('token', GITEA_AUTH_TOKEN);

      url.search = params.toString();

      const issues: Issue[] = await (await fetch(url)).json();

      return issues;
    } catch (error) {
      this.logger.error(`Error while fetching on going issues`);

      if (typeof error == typeof BadRequestException) {
        this.logger.error(
          `The error is a BadRequestException, is the environment variables correctly set?`,
        );
      } else if (error.message == 'Unexpected token < in JSON at position 0') {
        this.logger.error(
          `The error is a Unexpected token < in JSON at position 0, is the environment variables correctly set?`,
        );
      } else if (error.message.includes('Failed to fetch')) {
        this.logger.error(
          `The error is a Failed to fetch, is the server up and running?`,
        );
      } else {
        this.logger.error(error);
      }

      process.exit(1);
    }
  }
}
