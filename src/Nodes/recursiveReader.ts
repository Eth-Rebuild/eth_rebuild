import {readdirSync} from "node:fs";

export function recursiveGet(path: string): string[] {
  let files: string[] = readdirSync(path);
  if(!files) return []
  // for each file
  files.forEach((file) => {
    // if the file doesn't have an extension, it isn't a file, so search it
    if(!file.match(/\..*/)) {
      return files.concat(recursiveGet(`${path}/${file}`))
    } else {
      //otherwise return the file
      return files.push(file)
    }
  })
  return files;
} 

export function getAllFiles() {
  return recursiveGet("./src/Nodes")
}
