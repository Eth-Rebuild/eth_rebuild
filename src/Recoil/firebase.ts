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

export interface User {
  address: string; // ethereum address as id
  builds: string[]; // list of build ids
}

export interface Build {
  id: string;
  nodes: Array<Node>;
  edges: Array<Edge>;
  nodeData: any;
  createdBy: string;
}

export const addBuildToDB = async (localBuild: Build) => {
  let address = localStorage.getItem("userAddress");
  // fetch the localBuild and see who created it
  let remoteBuild = JSON.parse(await getBuildFromDB(localBuild.id));
  // check if the remoteBuild is undefined
  if (!remoteBuild) {
    //save the localBuild with the current user as the creator
    console.log("Saving new build");
    await set(ref(db, `builds/${localBuild.id}`), JSON.stringify(localBuild));
    // add the build to the user's list of builds
    console.log("Adding build to user's list of builds");
    await addUserBuildToDB(localBuild.id);
    console.log("Build saved");
  } else {
    // if the localBuild was created by the user, then update the localBuild
    console.log("Remote project create by: ", remoteBuild.createdBy);
    console.log("Your Address: ", address);
    if (remoteBuild.createdBy === address) {
      console.log("Saving your build");
      await set(ref(db, "builds/" + localBuild.id), JSON.stringify(localBuild));
      console.log("build saved");
    } else {
      // otherwise, user cannot save the localBuild
      alert("You cannot save this build because you did not create it!");
      console.log("You cannot save this build because you did not create it!");
    }
  }
};

export const getBuildFromDB = async (buildId: string) => {
  const dbRef = ref(db);
  try {
    return await (await get(child(dbRef, `builds/${buildId}`))).val();
  } catch (e) {
    // console.error(e);
  }
};

export const addUserToDB = async () => {
  let address = localStorage.getItem("userAddress");
  await set(
    ref(db, "users/" + address),
    JSON.stringify({
      address: address,
      builds: [],
    })
  );
};

export const getUserFromDB = async () => {
  let address = localStorage.getItem("userAddress");
  const dbRef = ref(db);
  try {
    return await (await get(child(dbRef, `users/${address}`))).val();
  } catch (e) {
    console.error(e);
  }
};

export const addUserBuildToDB = async (buildId: string) => {
  let address = localStorage.getItem("userAddress");
  const dbRef = ref(db);
  try {
    let user = JSON.parse(await (await get(child(dbRef, `users/${address}`))).val());
    if (user) {
      console.log(user);
      let builds = user.builds;
      builds.push(buildId);
      await set(ref(db, "users/" + address), JSON.stringify(user));
    }
  } catch (e) {
    console.error(e);
  }
};

export const getUserBuildsFromDB = async () => {
  let address = localStorage.getItem("userAddress");
  const dbRef = ref(db);
  try {
    let user = JSON.parse(await (await get(child(dbRef, `users/${address}`))).val());
    if (user) {
      console.log(user);
      let builds = user.builds;
      return builds;
    }
  } catch (e) {
    // console.error(e);
  }
};
