import User from 'src/user/user';

type Team = {
  id: string;
  name: string;
  users: User[];
};

export default Team;
