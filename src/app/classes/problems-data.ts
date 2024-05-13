import {Problem} from "./problem";

export class ProblemsData {
  problemsList:Problem[];
  username:string;

  constructor(problemsList: Problem[], username:string) {
    this.problemsList = problemsList;
    this.username = username;
  }
}
