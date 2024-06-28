import "pages/body/sponser/Index.css";
import maxonLogo from "assets/images/maxon_logo.png";
import monsterEnergyLogo from "assets/images/monster_energy_logo.png";
import uosLogo from "assets/images/uos_logo.png";

export default function Sponser() {
  return (
    <div className="sponser-container">
      <h3 className="sponser-enterprise">후원사</h3>
      {/* <div className="maxon-logo" /> */}
      <img className="maxon-logo" src={maxonLogo} alt="maxon logo" />
      <img
        className="monster-energy-logo"
        src={monsterEnergyLogo}
        alt="monster energy logo"
      />
      <h3 className="sponser-uos">주관 / 후원</h3>
      <img className="uos-logo" src={uosLogo} alt="uos logo" />
    </div>
  );
}
