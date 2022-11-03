import { verifyMessage } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { addUserToDB, getUserBuildsFromDB, getUserFromDB } from "../Recoil/firebase";
import { Space, Button } from "antd";

export function Landing() {
  const { address, isConnected } = useAccount();
  const userAddress = localStorage.getItem("userAddress");
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { data, status, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data);
      localStorage.setItem("userAddress", address);
      getOrCreateUser();
    },
  });
  const [userBuilds, setUserBuilds] = useState([]);

  async function getOrCreateUser() {
    console.log("Attempting to fetch user from DB");
    let user = await getUserFromDB();
    if (user) {
      console.log("Succesfully got user from DB");
      setUserBuilds(await getUserBuildsFromDB());
    } else {
      console.log("User not found in DB, creating new user");
      try {
        await addUserToDB();
        setUserBuilds(await getUserBuildsFromDB());
        console.log("Succesfully created new user");
      } catch (e) {
        console.error("Something went wrong while creating new user, error:", e);
      }
    }
  }

  useEffect(() => {
    if (userAddress) {
      getOrCreateUser();
    }
  }, [userAddress]);

  return (
    <Space direction="vertical" size="large">
      <h1>Welcome to BuidlBlocks.xyz!</h1>
      {isConnected ? (
        <>
          <h1>Connected to: {address}</h1>
          <h1>UserAddress is: {userAddress}</h1>
          <Button type="primary" onClick={() => disconnect()}>
            Disconnect
          </Button>
        </>
      ) : (
        <Button type="primary" onClick={() => connect()}>
          Connect Wallet
        </Button>
      )}
      {userAddress === address ? (
        <div>
          <h1>You have {userBuilds?.length || 0} builds saved.</h1>
          {userBuilds?.map((build) => {
            return (
              <div key={build}>
                <a href={`/create/${build}`}>Open Build: {build}</a>
              </div>
            );
          })}
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
