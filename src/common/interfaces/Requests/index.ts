import { Request, Response ,NextFunction } from "express";

export interface IRequest {
    req: Request;
    res: Response;
    next: NextFunction
}