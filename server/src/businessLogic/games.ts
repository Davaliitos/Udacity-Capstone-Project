import * as uuid from 'uuid'

import { GameItem } from '../models/GameItem';
import { GameAccess } from '../dataLayer/gamesAccess';
import { CreateGameRequest } from '../requests/CreateGameRequest';
import { UpdateGameRequest } from '../requests/UpdateGameRequest';
import { parseUserId } from '../auth/utils';

const gameAccess = new GameAccess();

export async function getAllGames(userId: string): Promise<GameItem[]>{
    return gameAccess.getAllGames(userId);
}

export async function createGame(
    createGameRequest: CreateGameRequest,
    jwtToken: string
) : Promise<GameItem> {

    const gameId = uuid.v4();
    const userId = parseUserId(jwtToken)

    return await gameAccess.createGame({
        gameId,
        name: createGameRequest.name,
        createdAt: new Date().toISOString(),
        userId: userId
    })

}

export async function updateGame(
    gameId: string,
    updatedGameRequest: UpdateGameRequest
) : Promise<AWS.DynamoDB.AttributeMap> {
    return await gameAccess.updateGame(gameId, updatedGameRequest);
}

export async function deleteGame(
    gameId: string
): Promise<AWS.DynamoDB.AttributeMap>{
    return await gameAccess.deleteGame(gameId);
}

export async function updateImage(gameId: string) : Promise<AWS.DynamoDB.AttributeMap>{
    return await gameAccess.updateImage(gameId);
}