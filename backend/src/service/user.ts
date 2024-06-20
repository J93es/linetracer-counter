// import { ContestType } from "@model/Contest";
// import UserContest, { UserContestType } from "@model/service/user/Contest";

// import { UserService } from "@core/service/user";

// import { contestRepository } from "@repository/index";

// let instance: UserServ | null = null;
// export class UserServ implements UserService {
//   constructor() {
//     if (instance) return instance;
//     instance = this;
//   }

//   async getData(queryId: string): Promise<UserContestType> {
//     try {
//       const data: ContestType = await contestRepository.readWithJoinByQueryId(
//         queryId,
//         "participantList curParticipant nextParticipant",
//         {
//           name: 1,
//           association: 1,
//           speech: 1,
//           sectorRecordList: 1,
//         },
//         {
//           contestSector: 1,
//           order: 1,
//           remainingContestTime: 1,
//           driveRecordList: 1,
//         }
//       );
//       const contest = new UserContest({ ...data } as UserContestType);

//       return contest;
//     } catch (e) {
//       throw e;
//     }
//   }
// }
