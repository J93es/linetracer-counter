import UserContest, { UserContestType } from "./model/UserContest";
import UserParticipant, { UserParticipantType } from "./model/UserParticipant";
import UserDriveRecord, { UserDriveRecordType } from "./model/UserDriveRecord";

import { ContestRepository } from "../core/repository/contest";
import { ContestMongoRepo } from "../repository/mongo/contest";

import { UserService } from "../core/service/user-service";

const contestRepository: ContestRepository = new ContestMongoRepo();

export class UserMongoService implements UserService {
  async getData(year: string): Promise<UserContestType> {
    try {
      const contest = await contestRepository.readContestWithParticipant({
        idYear: year,
      });

      const participantList = contest.participantList.map(
        (participant: UserParticipantType) => {
          const driveRecordList = participant.driveRecord.map(
            (driveRecord: UserDriveRecordType) => {
              return new UserDriveRecord(driveRecord);
            }
          );

          const newParticipant = JSON.parse(JSON.stringify(participant));
          newParticipant.driveRecord = driveRecordList;

          return new UserParticipant(newParticipant);
        }
      );

      const userContest = new UserContest({
        title: contest.title,
        curContestingSection: contest.curContestingSection,
        curParticipantId: contest.curParticipantId,
        nextParticipantId: contest.nextParticipantId,
        participantList: participantList,
      });

      return userContest;
    } catch (e) {
      throw e;
    }
  }
}
