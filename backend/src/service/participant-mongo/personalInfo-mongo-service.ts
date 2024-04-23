import PersonalInfo from "../../model/Participant/PersonalInfo";
import { PersonalInfoType } from "../../model/Participant/PersonalInfo";
import { PersonalInfoService } from "../../core/participant-service";

import { anyToString } from "../../util/index";

export class PersonalInfoMongoService implements PersonalInfoService {
  getPersonalInfoTemplate(): PersonalInfoType {
    return new PersonalInfo({
      name: "",
      association: "",
    } as PersonalInfoType);
  }

  filterPersonalInfo(personalInfoData: any): void {
    if (!personalInfoData) {
      return;
    }
    if (typeof personalInfoData !== "object") {
      throw new Error("personalInfo: personalInfo must be object");
    }
    if (
      personalInfoData.name !== undefined &&
      typeof personalInfoData.name !== "string"
    ) {
      throw new Error("personalInfo: name must be string");
    }
    if (
      personalInfoData.association !== undefined &&
      typeof personalInfoData.association !== "string"
    ) {
      throw new Error("personalInfo: association must be string");
    }
  }

  publishPersonalInfo(
    personalInfoData: Partial<PersonalInfoType>
  ): PersonalInfoType {
    const personalInfoTemplate = this.getPersonalInfoTemplate();

    if (typeof personalInfoData !== "object") {
      return personalInfoTemplate;
    }

    return new PersonalInfo({
      name: personalInfoData.name ?? personalInfoTemplate.name,
      association:
        personalInfoData.association ?? personalInfoTemplate.association,
    });
  }

  margePersonalInfo(
    src: Partial<PersonalInfoType>,
    origin: PersonalInfoType
  ): PersonalInfoType {
    const personalInfoTemplate = this.getPersonalInfoTemplate();

    return new PersonalInfo({
      name: src.name ?? origin.name ?? personalInfoTemplate.name,
      association:
        src.association ??
        origin.association ??
        personalInfoTemplate.association,
    });
  }
}
