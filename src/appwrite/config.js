import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,          // Database ID
                conf.appwriteCollectionID,         // Collection Id
                slug,                              // Document ID
                                                   // object containing extra information
                {
                    title, content, featuredImage, status, userID 
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,          // Database ID
                conf.appwriteCollectionID,         // Collection Id
                slug,                              // Document ID
                                                   // object containing extra information
                {
                    title, content, featuredImage, status
                }
            );
        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,          // Database ID
                conf.appwriteCollectionID,         // Collection Id
                slug,                              // Document ID
            );
            return true;

        } catch (error) {
            console.log("Appwrite Service :: CreatePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                slug,
            );
        } catch (error) {
            console.log("Appwrite Service :: GetPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionID,
                queries
            );
        } catch (error) {
            console.log("Appwrite Service :: GetPosts :: error", error);
            return false;
        }
    }

    // file upload 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Service :: GetPosts :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite Service :: GetPosts :: error", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}; 

const service = new Service()
export default service