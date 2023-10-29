import { container } from "tsyringe";
// eslint-disable-next-line import-helpers/order-imports
import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
    async handle(resquest: Request, response: Response): Promise<Response> {
        const listSpecificationsUseCase = container.resolve(
            ListSpecificationsUseCase,
        );

        const all = await listSpecificationsUseCase.execute();

        return response.json(all);
    }
}

export { ListSpecificationsController };
