import Participant from "model/Participant";
import { ParticipantType } from "model/Participant";
import { getParticipant } from "util/getParticipant";

async function postData(
  id: string,
  participant: ParticipantType
): Promise<string> {
  try {
    const response = await fetch(`http://localhost:8000/participant/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participant),
      credentials: "include",
    });
    return response.statusText;
  } catch (error) {
    throw new Error("Failed to update participant data");
  }
}

function margeParticipant(
  id: string,
  src: any,
  origin: ParticipantType
): ParticipantType {
  const newParticipant = new Participant(origin);

  if (!src) {
    return newParticipant;
  }
  if (origin.id !== id || src.id !== id) {
    if (origin.id === id) {
      newParticipant.id = id;
    } else {
      newParticipant.id = id;
    }
  }
  if (src.title && typeof src.title === "string") {
    newParticipant.title = src.title;
  }
  if (src.contestLog && src.contestLog instanceof Array) {
    newParticipant.contestLog = src.contestLog;
  }
  if (src.driveLog && src.contestLog instanceof Array) {
    newParticipant.driveLog = src.driveLog;
  }
  if (
    src.remainingContestTime &&
    typeof src.remainingContestTime === "number"
  ) {
    newParticipant.remainingContestTime = src.remainingContestTime;
  }

  return new Participant(newParticipant);
}

async function postParticipant(id: string, srcData: any) {
  try {
    const originParticipant = await getParticipant(id);
    console.log("originParticipant", originParticipant);

    const newParticipant = margeParticipant(id, srcData, originParticipant);

    console.log("newParticipant", newParticipant);
    const response = await postData(id, newParticipant);

    return response;
  } catch (error) {
    console.error("Failed to update participant data", error);
    return "Failed to update participant data";
  }
}

export { postParticipant };
