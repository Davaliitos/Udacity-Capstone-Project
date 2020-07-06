import * as AWS from 'aws-sdk';
//import * as AWSXRay from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

//const XAWS = AWSXRay.captureAWS(AWS);

import { GameItem } from '../models/GameItem';
import { UpdateGameRequest } from '../requests/UpdateGameRequest';

export class GameAccess{

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly gamesTable = process.env.GAMES_TABLE,
        private readonly userIdIndex = process.env.USER_ID_INDEX,
        private readonly imagesBucket = process.env.IMAGES_S3_BUCKET
    ){}

    async getAllGames(userId: string): Promise<GameItem[]>{
        console.log('Getting all games');

        console.log(userId);
        
        const result = await this.docClient.query({
            TableName: this.gamesTable,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId' : userId
            },
            ScanIndexForward: false
        }).promise();
      

        const items = result.Items;
        return items as GameItem[]
    }

    async createGame(game: GameItem): Promise<GameItem>{
        await this.docClient.put({
            TableName: this.gamesTable,
            Item: game
        }).promise();

        return game;
    }

    async updateGame(gameId: string, game: UpdateGameRequest): Promise<AWS.DynamoDB.AttributeMap> {
        const result = await this.docClient.update({
            TableName: this.gamesTable,
            Key:{
                'gameId' : gameId
            },
            UpdateExpression: 'set #name = :name',
            ExpressionAttributeValues: {
                ':name' : game.name
            },
            ExpressionAttributeNames:{
                '#name' : 'name'
            },
            ReturnValues:"UPDATED_NEW"
        }).promise();

        const items = result.Attributes;
        return items;
    }

    async deleteGame(gameId: string) : Promise<AWS.DynamoDB.AttributeMap> {
        const result = await this.docClient.delete({
            TableName: this.gamesTable,
            Key:{
                'gameId' : gameId
            }
        }).promise();
        const items = result.Attributes;
        return items;
    }

    async updateImage(gameId: string) : Promise<AWS.DynamoDB.AttributeMap>{
        const result = await this.docClient.update({
            TableName: this.gamesTable,
            Key:{
                'gameId' : gameId
            },
            UpdateExpression: 'set attachmentUrl = :attachmentUrl',
            ExpressionAttributeValues: {
                ':attachmentUrl' : 'https://' + this.imagesBucket + '.s3.amazonaws.com/' + gameId
            },
            ReturnValues:"UPDATED_NEW"
        }).promise();

        const items = result.Attributes;
        return items;
    }

}

function createDynamoDBClient(){
    if(process.env.IS_OFFLINE){
        console.log('Creating a local DynamoDB instance');
        return new AWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000'
        })
    }

    return new AWS.DynamoDB.DocumentClient();
}