import { ImagesAccess } from '../dataLayer/imagesAccess';

const imagesAccess = new ImagesAccess();

export async function getUploadUrl(gameId: string): Promise<string>{

    return await imagesAccess.getUploadUrl(gameId);

}

