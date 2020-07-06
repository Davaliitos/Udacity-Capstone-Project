import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register';

import { UpdateGameRequest } from '../../requests/UpdateGameRequest';
import { updateGame } from '../../businessLogic/games';

export const handler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    
    const gameId = event.pathParameters.gameId;
    console.log('This is the game Id',gameId);
    const updatedGame: UpdateGameRequest = JSON.parse(event.body);
    console.log('This is the update body',updatedGame);

    const answer = await updateGame(gameId,updatedGame);
    console.log('This is the answer',answer)

    return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: ''
      }

}