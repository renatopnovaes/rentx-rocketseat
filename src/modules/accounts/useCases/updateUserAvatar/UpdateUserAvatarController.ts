import { container } from "tsyringe";
// eslint-disable-next-line import-helpers/order-imports
import { Request, Response } from "express";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
    handle(request: Request, response: Response) {
        const { id: user_id } = request.user;
        const avatar_file = request.file.filename;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase,
        );

        updateUserAvatarUseCase.execute({ user_id, avatar_file });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
