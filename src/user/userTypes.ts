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
  discordId?: string;
};

export default OrgMember;
