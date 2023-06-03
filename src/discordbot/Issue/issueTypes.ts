import OrgMember from '../../user/userTypes';

export type Repository = {
  id: number;
  name: string;
  owner: string;
  full_name: string;
};

export type Label = {
  id: number;
  name: string;
  exclusive: true;
  color: string;
  description: string;
  url: string;
};

export type Milestone = {
  id: number;
  title: string;
  description: string;
  state: string;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  due_on: string;
};

export type Issue = {
  id: number;
  url: string;
  html_url: string;
  number: number;
  user: OrgMember;
  original_author: string;
  original_author_id: number;
  title: string;
  body: string;
  ref: string;
  assets: [];
  labels: Label[];
  milestone: Milestone;
  assignee: OrgMember;
  assignees: OrgMember[];
  state: string;
  is_locked: false;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: null;
  due_date: null;
  pull_request: null;
  repository: Repository;
};
