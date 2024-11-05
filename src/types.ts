export interface Choice {
  title: string;
  pobUrl: string;
  youtubeUrl: string;
}

export interface Assignment {
  participant: string;
  choice: Choice;
  timestamp: number;
  unassigned?: boolean;
}

export interface AssignmentHistory {
  assignments: Assignment[];
  id: string;
}