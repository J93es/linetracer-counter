import UserContest, { UserContestType } from "../model/service/UserContest";
import UserParticipant, {
  UserParticipantType,
} from "../model/service/UserParticipant";
import UserSectorRecord, {
  UserSectorRecordType,
} from "../model/service/UserSectorRecord";
import UserDriveRecord, {
  UserDriveRecordType,
} from "../model/service/UserDriveRecord";

import { ContestRepository } from "../core/repository/contest";
import { ContestMongoRepo } from "../repository/mongo/contest";

import { UserService } from "../core/service/user";

const contestRepository: ContestRepository = new ContestMongoRepo();

// function userDriveRecordFilter(driveRecord: UserDriveRecordType[]) {
//   return driveRecord.map((driveRecord: UserDriveRecordType) => {
//     return new UserDriveRecord(driveRecord);
//   });
// }

// function userSectorRecordFilter(
//   SectorRecordList: UserParticipantType[]
// ) {
//   return SectorRecordList.map(
//     (SectorRecord: UserSectorRecordType) => {
//       const newSectorRecord = new UserSectorRecord(SectorRecord);

//       return userParticipantFilter(participant);
//     }
//   );
// }

// function userParticipantFilter(participant: UserParticipantType) {
//   const newParticipant = new UserParticipant(participant);
//   const driveRecord = userDriveRecordFilter(newParticipant.driveRecord);
//   newParticipant.driveRecord = driveRecord;

//   return newParticipant;
// }

let instance: UserMongoService | null = null;
export class UserMongoService implements UserService {
  constructor() {
    if (instance) return instance;
    instance = this;
  }

  async getData(year: string): Promise<UserContestType> {
    try {
      const data = await contestRepository.readContestWithJoinById(
        year,
        {
          _id: 0,
          name: 1,
          association: 1,
          speech: 1,
          SectorRecordList: 1,
        },
        {
          _id: 0,
          contestSector: 1,
          order: 1,
          remainingContestTime: 1,
          driveRecordList: 1,
        }
      );
      const contest = new UserContest(data);

      // if (contest.curParticipant) {
      //   contest.curParticipant = userParticipantFilter(contest.curParticipant);
      // }
      // if (contest.nextParticipant) {
      //   contest.nextParticipant = userParticipantFilter(
      //     contest.nextParticipant
      //   );
      // }
      // contest.participantList = contest.participantList.map(
      //   (participant: any) => {
      //     return userParticipantFilter(participant);
      //   }
      // );

      return contest;
    } catch (e) {
      throw e;
    }
  }
}
