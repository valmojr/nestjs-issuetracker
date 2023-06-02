import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';

type OrgMember = {
  id: number;
  login: string;
  login_name: string;
  full_name: string;
  email: string;
  avatar_url: string;
  language: string;
  is_admin: true;
  last_login: string;
  created: string;
  restricted: false;
  active: true;
  prohibit_login: false;
  location: string;
  website: string;
  description: string;
  visibility: string;
  followers_count: 0;
  following_count: 0;
  starred_repos_count: 0;
  username: string;
};

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  private logger = new Logger(UserService.name);

  async create(data: User) {
    this.logger.log(`Creating user ${data.username}`);
    return this.databaseService.user.create({ data });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findById(id: number) {
    return this.databaseService.user.findUnique({ where: { id } });
  }

  async update(data: User) {
    this.logger.log(`Updating user ${data.username}`);
    return this.databaseService.user.update({
      where: { id: data.id },
      data,
    });
  }

  async fetchUsersFromOrg() {
    const { GITEA_URL, GITEA_REPO_OWNER, GITEA_REPO_NAME, GITEA_AUTH_TOKEN } =
      process.env;
    const url = new URL(
      `http://${GITEA_URL}/api/v1/orgs/${GITEA_REPO_OWNER}/members`,
    );

    const params = new URLSearchParams();
    params.append('token', GITEA_AUTH_TOKEN);

    url.search = params.toString();

    const orgMembers: OrgMember[] = await (await fetch(url)).json();

    console.log(orgMembers);

    const users: User[] = await Promise.all(
      orgMembers.map(async (member: any) => {
        return await this.databaseService.user.upsert({
          where: { id: member.id },
          create: {
            id: member.id,
            username: member.username,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          update: {
            id: member.id,
            username: member.username,
            updatedAt: new Date(),
          },
        });
      }),
    );

    return users;
  }

  async remove(id: number) {
    const deletedUser = await this.databaseService.user.delete({
      where: { id },
    });

    this.logger.log(`Updating user ${deletedUser.username}`);
    return deletedUser;
  }
}
