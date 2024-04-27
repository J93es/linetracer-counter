import UserContest, { UserContestType } from "../model/service/UserContest";
import UserParticipant, {
  UserParticipantType,
} from "../model/service/UserParticipant";
import UserParticipantRecord, {
  UserParticipantRecordType,
} from "../model/service/UserParticipantRecord";
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

// function userParticipantRecordFilter(
//   participantRecordList: UserParticipantType[]
// ) {
//   return participantRecordList.map(
//     (participantRecord: UserParticipantRecordType) => {
//       const newParticipantRecord = new UserParticipantRecord(participantRecord);

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

export class UserMongoService implements UserService {
  async getData(year: string): Promise<UserContestType> {
    try {
      const data = await contestRepository.readContestWithPopulate(
        year,
        {
          _id: 0,
          name: 1,
          association: 1,
          speech: 1,
          participantRecordList: 1,
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
