import { verifyMessage } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { addUserToDB, getUserBuildsFromDB, getUserFromDB } from "../Recoil/firebase";
import { Space, Button, Col, Row, Typography, Card, List } from "antd";

const { Title } = Typography;

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
        }}
      >
        <h1>Welcome to</h1>
        <h1>BuidlBlocks!</h1>
        <h3>Learn about the blockchain visually!</h3>
        <h3>Sorry about the landing page carlos ;)</h3>
        <Space direction="vertical" align="center">
          {isConnected ? address?.substring(0, 6) : "Not connected"}
          {isConnected ? <Button onClick={() => disconnect()}>Disconnect</Button> : <Button onClick={() => connect()}>Connect</Button>}
          {userAddress !== address ? (
            <Button
              onClick={() => {
                signMessage({ message: "Signing this message to verify your address for BuidlBlocks.xyz" });
              }}
            >
              Sign a message to verify
            </Button>
          ) : (
            <Button
              onClick={() => {
                window.location.href = "/build";
              }}
            >
              Create a build!
            </Button>
          )}
        </Space>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <h3>Your Saved builds:</h3>
          <List
            bordered={true}
            size="large"
            dataSource={userBuilds}
            itemLayout="horizontal"
            grid={{ gutter: 32, column: 2 }}
            renderItem={(item, index) => (
              <List.Item>
                <Card title={`Build: ${index}`}>
                  <Button
                    size="middle"
                    onClick={() => {
                      window.location.href = `/build/${item}`;
                    }}
                  >
                    Open Build
                  </Button>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}
