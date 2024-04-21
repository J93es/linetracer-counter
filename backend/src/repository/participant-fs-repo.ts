import Participant from "../model/Participant/Participant";
import { ParticipantType } from "../model/Participant/Participant";

import { ParticipantIdTitleType } from "../model/Participant/ParticipantIdTitle";

import { ParticipantRepository } from "../core/participant-repository";

import fs from "fs";
import path from "path";

export class ParticipantFsRepo implements ParticipantRepository {
  private _isDataExist(id: string): boolean {
    const dataPath = path.resolve(__dirname + `/../data/${id}`);

    return fs.existsSync(dataPath) ? true : false;
  }

  private _getIdTitleList(): Array<ParticipantIdTitleType> {
    const memoFiles = fs.readdirSync(path.resolve(__dirname + "/../data/"));

    const fileData = memoFiles.map((title) => {
      return { id: title, title: title.split(".")[0] };
    });

    return fileData;
  }

  private _readData(id: string): object {
    const dataPath = path.resolve(__dirname + `/../data/${id}`);

    const dataBuffer = fs.readFileSync(dataPath);
    const dataString = dataBuffer.toString("utf-8");
    const dataJson = JSON.parse(dataString || "{}");

    return dataJson;
  }

  private _writeData(id: string, data: ParticipantType) {
    const dataPath = path.resolve(__dirname + `/../data/${id}`);

    const fd = fs.openSync(dataPath, "w");

    fs.writeSync(fd, JSON.stringify(data));

    return data;
  }

  isParticipantExist(id: string): boolean {
    try {
      return this._isDataExist(id);
    } catch (error) {
      throw error;
    }
  }

  readParticipantIndex(): Array<{ id: string; title: string }> {
    try {
      return this._getIdTitleList();
    } catch (error: any) {
      throw error;
    }
  }

  readParticipant(id: string): Partial<ParticipantType> {
    try {
      return this._readData(id);
    } catch (error: any) {
      console.error(error);
      throw error;
    }
  }

  writeParticipant(participant: ParticipantType): ParticipantType {
    try {
      return this._writeData(participant.id, participant);
    } catch (error: any) {
      throw error;
    }
  }
}

// 싱글톤 패턴
// class Singletone {
//   private static instance: Singletone | null = null;

//   private constructor() { }

//   public static getInstance(): Singletone {
//     if (!Singletone.instance) {
//       Singletone.instance = new Singletone();
//     }

//     return Singletone.instance;
//   }

//   public getParticipant(id: string): ParticipantType {
//     return {
//       id: "",
//       title: "",
//       contestLog: "",
//       driveLog: "",
//       remainingContestTime: 0
//     };
//   }

//   public postParticipant(id: string, srcData: any): string {
//     return "OK";
//   }

//   public margeParticipant(id: string, src: any, origin: ParticipantType): ParticipantType {
//     return {
//       id: "",
//       title: "",
//       contestLog: "",
//       driveLog: "",
//       remainingContestTime: 0
//     };
//   }
// }

// const myInstance = new Singletone();
// myInstance.getParticipant("test");
