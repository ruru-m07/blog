import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)      // first field should be useerID and 2nd should be email
            if(userAccount){
                // call another method   --  apparently we want to login the user aswell when user is created , we may or may not , totally upto us
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite error :: getCurrentUSer :: error", error);
        }

        return null; // so that if it fails to get the user then it return something (null) instead of returning something undefined.
    }

    async logout(){
        try {
            // await this.account.deleteSession('current');
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite error :: Logout :: error", error);
        }
    }

};

const authService = new AuthService();

export default authService;


// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// }); 


// Rather than declaring directly we will declare thm in class as we will be able to fecth them when we want to 
// not when the component renders 


/* 
The benefit of doing this is

--> That when we want to use our own backend services then , we can just modify the class constructors and the user creation method 

*/