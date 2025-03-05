
import { Alert } from "react-native";
import { Client, Databases, Account, ID, Avatars, Query, Storage } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "67c510d2002ae5f50e73",
  platform: "com.tth.auro",
  databaseId: "67c513b0002dbffb1c31",
  usercollectionId: "67c513c0001c06734f00",
  videocollectionId: "67c513cd00340ae0a1bd",
  storageId: "67c5156c0008d7789b97"
}

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId) // Replace with your project ID
  .setPlatform(config.platform);


export const account = new Account(client);
const avatars = new Avatars(client);
export const database = new Databases(client)
const storage = new Storage(client)
// export const databases = new Databases(client);

export const createAccount = async (email, password, name) => {
  const newuser = await account.create(
    ID.unique(),
    email,
    password,
    name
  )
  const avatarurl = avatars.getInitials(name)
  await signin(email, password)

  console.log(newuser)
  const newUser = database.createDocument(
    config.databaseId,
    config.usercollectionId,
    ID.unique(),
    {
      accountId: newuser.$id,
      name: name,
      email: email,
      avatar: avatarurl

    })
  return newuser
}

export const signin = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password)
    return session
  } catch (error) {
    console.log(error)
    Alert.alert(error)
  }
}

export const signOut = async () => {
  try {
    const currentAccount = await account.deleteSession("current")
    return currentAccount
  } catch (error) {

  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    const currentUser = await database.listDocuments(
      config.databaseId,
      config.usercollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    )
    return currentUser.documents[0];
  } catch (error) {
    console.log(error)
  }
}

export const getAllPost = async () => {
  try {
    const posts = await database.listDocuments(config.databaseId, config.videocollectionId)

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const getLastestPost = async () => {
  try {
    const posts = await database.listDocuments(config.databaseId, config.videocollectionId, [Query.orderDesc('$createdAt', Query.limit(7))])

    return posts.documents
  } catch (error) {
    throw new Error(error)
  }
}

export const searchpost = async (query) => {
  try {
    const posts = await database.listDocuments(config.databaseId, config.videocollectionId, [Query.search('title', query)])
    // console.log(query)
    console.log(posts)
    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export const videoByProfile = async (id) => {
  try {
    const posts = await database.listDocuments(config.databaseId, config.videocollectionId, [Query.equal("creator", id)])
    console.log(posts)

    return posts.documents
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error)

  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error)

  }
}

// Create Video Post
export async function createVideoPost(form) {
  console.log(form)
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await database.createDocument(
      config.databaseId,
      config.videocollectionId,
      ID.unique(),
      {
        title: form.title,
        thumnail: thumbnailUrl,
        video: videoUrl,
        propt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log(error)
  }
}




