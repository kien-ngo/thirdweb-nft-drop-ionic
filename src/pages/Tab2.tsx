import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab2.css";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const";

const Tab2: React.FC = () => {
  const address = useAddress();
  const { data: nftDrop } = useContract(CONTRACT_ADDRESS, "nft-drop");
  const { data: nfts, isLoading } = useOwnedNFTs(nftDrop, address);
  if (nfts) console.log({ nfts });
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your NFTs</IonTitle>
          <IonButtons slot="end" style={{ marginRight: "10px" }}>
            <ConnectWallet />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Your NFTs</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!isLoading && (
          <div style={{ display: "flex", marginTop: "15px" }}>
            <IonLabel
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              You own {nfts?.length ?? 0} NFT(s)
            </IonLabel>
          </div>
        )}
        {nfts && nfts.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {nfts.map((item) => (
              <IonCard
                style={{
                  maxWidth: "85%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <img
                  alt="Silhouette of mountains"
                  src={item.metadata.image ?? "/cat.png"}
                />
                <IonCardHeader>
                  <IonCardTitle>{item.metadata.name}</IonCardTitle>
                  <IonCardSubtitle>
                    Token ID: {item.metadata.id}
                  </IonCardSubtitle>
                </IonCardHeader>
                {item.metadata.description && (
                  <IonCardContent>{item.metadata.description}</IonCardContent>
                )}
              </IonCard>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
