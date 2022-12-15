import { Reply } from "./reply.model";


export class Tweet {
    tweetId=0
    tweet=''
	tweetPostDate='';
    tweetedBy='';  
	edited=false;
	editedDate='';
	likedBy:string[]=[];
	parentTweetId=-1;
	deleted=false;
	reply:Reply[]=[];
	initials='';
	profileColor='';
}
