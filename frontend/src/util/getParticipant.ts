import Participant from "model/Participant";
import { ParticipantType } from "model/Participant";

async function getData(id: string): Promise<any> {
  try {
    const response = await fetch(`http://localhost:8000/participant/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
    throw new Error("Failed to fetch data");
  }
}

// function dataToParticipant(data: any): ParticipantType {
//   return participant;
// }

async function getParticipant(id: string): Promise<ParticipantType> {
  try {
    const response = await getData(id);

    const participant = new Participant(response);

    return participant;
  } catch (error) {
    console.error("Failed to fetch participant data", error);
    return new Participant({
      id: "",
      title: "",
      contestLog: [],
      driveLog: [],
      remainingContestTime: 0,
    });
  }
}

export { getParticipant };
