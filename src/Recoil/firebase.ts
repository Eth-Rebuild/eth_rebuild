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
  createdBy: string;
}

export const addBuildToDB = async (build: Build, address: string) => {
  // if (build.createdBy === address) {
  console.log("Saving your build");
  await set(ref(db, "builds/" + build.id), JSON.stringify(build));
  console.log("Build saved");
  // } else {
  //   console.log("You are not the owner of this build, you can only view.");
  //   const newBuild = {
  //     ...build,
  //     createdBy: address,
  //     forkedFrom: build.id,
  //     id: Math.random().toString(36).substring(7),
  //   };
  // }
};

export const getBuildFromDB = async (buildId: string) => {
  const dbRef = ref(db);
  try {
    return await (await get(child(dbRef, `builds/${buildId}`))).val();
  } catch (e) {
    console.error(e);
  }
};

export const addUserToDB = async (address: string) => {
  await set(ref(db, "users/" + address), JSON.stringify(true));
};

export const getUserFromDB = async (address: string) => {
  const dbRef = ref(db);
  try {
    return await (await get(child(dbRef, `users/${address}`))).val();
  } catch (e) {
    console.error(e);
  }
};

export const getUserBuildsFromDB = async (address: string) => {
  const dbRef = ref(db);
  try {
    // using firebase, get all builds where createdBy === address

    let builds = await (await get(child(dbRef, `builds`))).val();
    builds = Object.values(builds).map((build: any) => JSON.parse(build));
    console.log(builds);
    const userBuilds = builds.filter((build: Build) => build.createdBy === address);
    return userBuilds.length;

    // let builds = JSON.parse(await (await get(child(dbRef, `builds/`))).val());
    // builds.filter((build: Build) => build.createdBy === address);
    // console.log("You have ", builds.length, " builds");
    // return builds.length;
  } catch (e) {
    console.error(e);
  }
};
