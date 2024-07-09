import { ContestType } from "@model/Contest";
import { ParticipantType } from "@model/Participant";
import UserParticipantInfo, {
  UserParticipantInfoType,
} from "@model/adaptor/UserParticipantInfo";
import { filterParticipantList } from "@tools/filterTargetList";
import { sortTarget } from "@tools/sortTargetList";

import { sectorEnum } from "@model/enums/index";

export interface UserContestInfoType {
  title: string;
  curContestingSection?: string;
  curParticipant?: UserParticipantInfoType | string;
  participantListContainer: any;
}

export default class UserContestInfo implements UserContestInfoType {
  title: string;
  curContestingSection?: string;
  curParticipant?: UserParticipantInfoType | string;
  participantListContainer: any;

  constructor(data: ContestType) {
    this.title = data.title;
    this.curContestingSection = data.curContestingSection;
    this.participantListContainer = {};

    sectorEnum.map((sector) => {
      const filteredParticipantList = filterParticipantList(
        data.participantList,
        {
          sectorRecordBy: "contestSector",
          sectorRecordValue: sector,
        }
      );

      const filteredParticipantInfo = filteredParticipantList.map(
        (participant: ParticipantType, index: number) => {
          const newParticipant = new UserParticipantInfo(participant, sector);

          if (participant.id === data?.curParticipantId) {
            this.curParticipant = newParticipant;
          }

          return newParticipant;
        }
      );

      let prevParticipantRank = 0;
      let prevParticipantFastestLapTime = 0;
      const participantInfo = sortTarget(
        filteredParticipantInfo,
        "fastestLapTime"
      ).map((participant, index) => {
        const isCurParticipant =
          JSON.stringify(this.curParticipant) === JSON.stringify(participant);

        if (prevParticipantFastestLapTime === participant.fastestLapTime) {
          participant.rank = prevParticipantRank;
        } else {
          participant.rank = index + 1;
        }

        if (isCurParticipant) {
          this.curParticipant = participant;
        }
        prevParticipantRank = participant.rank;
        prevParticipantFastestLapTime = participant.fastestLapTime;
        return participant;
      });

      if (participantInfo.length > 0) {
        this.participantListContainer[sector] = participantInfo;
      }
    });
  }
}
