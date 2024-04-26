import UserContest, { UserContestType } from "../model/service/UserContest";
import UserParticipant, {
  UserParticipantType,
} from "../model/service/UserParticipant";
import UserDriveRecord, {
  UserDriveRecordType,
} from "../model/service/UserDriveRecord";

import { ContestRepository } from "../core/repository/contest";
import { ContestMongoRepo } from "../repository/mongo/contest";

import { UserService } from "../core/service/user";

const contestRepository: ContestRepository = new ContestMongoRepo();

function userDriveRecordFilter(driveRecord: UserDriveRecordType[]) {
  return driveRecord.map((driveRecord: UserDriveRecordType) => {
    return new UserDriveRecord(driveRecord);
  });
}

function userParticipantFilter(participant: UserParticipantType) {
  const newParticipant = new UserParticipant(participant);
  const driveRecord = userDriveRecordFilter(newParticipant.driveRecord);
  newParticipant.driveRecord = driveRecord;

  return newParticipant;
}

export class UserMongoService implements UserService {
  async getData(year: string): Promise<UserContestType> {
    try {
      const data = await contestRepository.readContestWithParticipant(year);
      const contest = new UserContest(data);

      if (contest.curParticipant) {
        contest.curParticipant = userParticipantFilter(contest.curParticipant);
      }
      if (contest.nextParticipant) {
        contest.nextParticipant = userParticipantFilter(
          contest.nextParticipant
        );
      }
      contest.participantList = contest.participantList.map(
        (participant: any) => {
          return userParticipantFilter(participant);
        }
      );

      return contest;
    } catch (e) {
      throw e;
    }
  }
}
