import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { Edge, Node } from "reactflow";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

interface Build {
  id: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
  nodeData: any;
}

export const addBuildToDB = async (build: Build) => {
  await set(ref(db, "builds/" + build.id), JSON.stringify(build));
};

export const testAddBuildToDB = async (nodes, edges, nodeData) => {
  const build = {
    id: "test",
    nodes,
    edges,
    nodeData,
  };
  await addBuildToDB(build);
};

export const getBuildFromDB = async (buildId: string) => {
  const dbRef = ref(db);
  try {
    return await (await get(child(dbRef, `builds/${buildId}`))).val();
  } catch (e) {
    console.error(e);
  }
};

export const testGetBuildFromDB = async () => {
  const dbRef = ref(db);
  try {
    return await await getBuildFromDB("test");
  } catch (e) {
    console.error(e);
  }
};
