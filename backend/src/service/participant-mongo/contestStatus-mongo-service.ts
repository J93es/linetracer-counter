import ContestStatus from "../../model/Participant/ContestStatus";
import { ContestStatusType } from "../../model/Participant/ContestStatus";
import { ContestStatusService } from "../../core/participant-service";

export class ContestStatusMongoService implements ContestStatusService {
  getContestStatusTemplate(): ContestStatusType {
    return new ContestStatus({
      remainingContestTime: 0,
      driveRecord: [],
    } as ContestStatusType);
  }

  filterContestStatus(contestData: any): void {
    if (!contestData) {
      return;
    }
    if (typeof contestData !== "object") {
      throw new Error("contestStatus: contestStatus must be object");
    }
    if (
      contestData.remainingContestTime !== undefined &&
      typeof contestData.remainingContestTime !== "number"
    ) {
      throw new Error("participant: remainingContestTime must be number");
    }
    if (
      contestData.driveRecord !== undefined &&
      !Array.isArray(contestData.driveRecord)
    ) {
      throw new Error("contestStatus: driveRecord must be array");
    }
  }

  publishContestStatus(
    contestData: Partial<ContestStatusType>
  ): ContestStatusType {
    const contestStatusTemplate = this.getContestStatusTemplate();

    if (typeof contestData !== "object") {
      return contestStatusTemplate;
    }

    return new ContestStatus({
      remainingContestTime:
        contestData.remainingContestTime ??
        contestStatusTemplate.remainingContestTime,
      driveRecord: contestData.driveRecord ?? contestStatusTemplate.driveRecord,
    });
  }

  margeContestStatus(
    src: Partial<ContestStatusType>,
    origin: ContestStatusType
  ): ContestStatusType {
    const contestStatusTemplate = this.getContestStatusTemplate();

    const driveRecord: Array<any> =
      origin.driveRecord ?? contestStatusTemplate.driveRecord;
    driveRecord.push(src.driveRecord);

    return new ContestStatus({
      remainingContestTime:
        src.remainingContestTime ??
        origin.remainingContestTime ??
        contestStatusTemplate.remainingContestTime,
      driveRecord: driveRecord,
    });
  }
}
