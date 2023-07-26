import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab1.css";
import { ConnectWallet, Web3Button, useAddress } from "@thirdweb-dev/react";
import { useNftDrop } from "../hooks/useNftDrop";
import { CONTRACT_ADDRESS } from "../const";

const Tab1: React.FC = () => {
  const address = useAddress();
  const {
    loadingUnclaimedSupply,
    loadingClaimedSupply,
    claimedNfts,
    totalSupply,
  } = useNftDrop();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mint</IonTitle>
          <IonButtons slot="end" style={{ marginRight: "10px" }}>
            <ConnectWallet />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mint</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="container">
          <img
            src="/cat.png"
            style={{
              width: "85%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
              border: "2px",
              borderRadius: "25px",
            }}
          />
          <IonLabel style={{ marginTop: "12px", fontSize: "25px" }}>
            Thirdweb Ionic Collection
          </IonLabel>
          <IonLabel>
            {claimedNfts}/{totalSupply} Minted
          </IonLabel>
          <Web3Button
            style={{
              width: "80%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
            }}
            contractAddress={CONTRACT_ADDRESS}
            action={(contract) => {
              contract.erc721.claim(1); // hardcode to "1" for demo
            }}
          >
            Mint now
          </Web3Button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
