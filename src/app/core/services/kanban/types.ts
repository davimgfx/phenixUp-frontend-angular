export interface IKanbanProjects {
  id: number;
  name: string;
  description: string;
  owner_id: number;
  code: number;
  picture: string;
  createdAt: string;
  updatedAt: string;
  colorLogo1: string;
  colorLogo2: string;
}

export interface IColorsProject {
  colorLogo1: string;
  colorLogo2: string;
}
