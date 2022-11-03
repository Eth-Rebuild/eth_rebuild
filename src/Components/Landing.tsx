import { verifyMessage } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { userAddressState, userVerifiedState } from "../Recoil/Atoms/atoms";
import { addUserToDB, getUserBuildsFromDB, getUserFromDB } from "../Recoil/firebase";
import { Space, Button } from "antd";

export function Landing() {
  const { address, isConnected } = useAccount();
  const [userAddress, setUserAddress] = useRecoilState(userAddressState);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data, status, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data);
      getOrCreateUser(address);
    },
  });
  const [verified, setVerified] = useRecoilState(userVerifiedState);
  const [userBuilds, setUserBuilds] = useState(0);

  async function getOrCreateUser(address) {
    console.log("Attempting to fetch user from DB");
    let user = await getUserFromDB(address);
    if (user) {
      console.log("Succesfully got user from DB");
      setVerified(true);
      setUserAddress(address);
      setUserBuilds(await getUserBuildsFromDB(address));
    } else {
      console.log("User not found in DB, creating new user");
      try {
        await addUserToDB(address);
        setVerified(true);
        setUserAddress(address);
        setUserBuilds(await getUserBuildsFromDB(address));
        console.log("Succesfully created new user");
      } catch (e) {
        console.error("Something went wrong while creating new user, error:", e);
      }
    }
  }

  return (
    <Space direction="vertical" size="large">
      <h1>Welcome to BuidlBlocks.xyz!</h1>
      {isConnected ? (
        <>
          <h1>Connected to: {address}</h1>
          <Button type="primary" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
      {verified ? (
        <div>
          <h1>You have {userBuilds} builds saved.</h1>
          <Button
            type="primary"
            onClick={() => {
              window.location.href = "/create";
            }}
          >
            Create a new build
          </Button>
        </div>
      ) : address ? (
        <Button
          type="primary"
          onClick={() => {
            signMessage({
              message: `Verifying account: ${address} for buidlblocks.xyz!`,
            });
          }}
        >
          Sign a message to create a build!
        </Button>
      ) : null}
    </Space>
  );
}
