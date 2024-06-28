import { ContestType } from "@model/Contest";
import { ParticipantType } from "@model/Participant";
import ParticipantInfo, {
  ParticipantInfoType,
} from "@model/adaptor/ParticipantInfo";
import { findTargetById } from "@tools/utils";
import { filterParticipantList } from "@tools/filterTargetList";

import { sectorEnum } from "@model/enums/index";

export interface UserContestInfoType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantInfoType | string;
  nextParticipant?: ParticipantInfoType | string;

  participantListContainer: any;
}

export default class UserContestInfo implements UserContestInfoType {
  title: string;

  curContestingSection?: string;
  curParticipant?: ParticipantInfoType | string;
  nextParticipant?: ParticipantInfoType | string;

  participantListContainer: any;

  constructor(data: ContestType) {
    this.title = data.title;

    this.curContestingSection = data.curContestingSection;

    const originCurParticipant = findTargetById(
      data.curParticipantId,
      data.participantList
    );
    const originNextParticipant = findTargetById(
      data.nextParticipantId,
      data.participantList
    );
    this.curParticipant = new ParticipantInfo(
      originCurParticipant,
      this.curContestingSection ?? ""
    );
    this.nextParticipant = new ParticipantInfo(
      originNextParticipant,
      this.curContestingSection ?? ""
    );

    this.participantListContainer = {};

    sectorEnum.map((sector) => {
      const filteredParticipantList = filterParticipantList(
        data.participantList,
        {
          sectorRecordBy: "contestSector",
          sectorRecordValue: sector,
        }
      );

      const participantInfo = filteredParticipantList.map(
        (participant: ParticipantType) => {
          return new ParticipantInfo(participant, sector);
        }
      );

      if (participantInfo.length > 0) {
        this.participantListContainer[sector] = participantInfo;
      }
    });
  }
}
