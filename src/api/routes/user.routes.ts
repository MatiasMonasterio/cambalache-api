import { Router } from "express";

import { userController } from "../controlllers";
import { userValidator } from "../validators";
import { isAuthenticated } from "../middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User endpoint
 * components:
 *  parameters:
 *   userId:
 *     in: path
 *     name: id
 *     required: true
 *     description: User id
 *     schema:
 *       type: string
 *       example: 1
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags: [User]
 *    summary: Get users
 *    description: Get all users
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: "#/components/schemas/User"
 *      403:
 *        description: Missin or invalid token
 */
router.get("/", isAuthenticated, userController.getAll);

/**
 * @swagger
 * /api/users:
 *  put:
 *    tags: [User]
 *    summary: Update user logged in
 *    description: Update user logged in
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: Matias M. Monasterio
 *              email:
 *                type: string
 *                example: matias_monasterio@outlook.com
 *              birthdayDate:
 *                type: string
 *                format: date-time
 *                example: 1995-12-01T00:00:00Z
 *              languaje:
 *                type: string
 *                examplte: javascript
 *                enum:
 *                  - javascript
 *                  - python
 *                  - java
 *                  - c
 *                  - rust
 *                  - go
 *                  - r
 *                  - swift
 *                  - php
 *    responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  $ref: "#components/schemas/User"
 *       400:
 *        description: Some field is invalid
 *       403:
 *        description: Missin or invalid token
 *       409:
 *        description: Email is already register
 */
router.put("/", isAuthenticated, userValidator.validateUpdate, userController.update);

/**
 * @swagger
 * /api/users:
 *  delete:
 *    tags: [User]
 *    summary: Delete user logged in
 *    description: Delete user logged in and upload the token to the blacklist
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  $ref: "#components/schemas/User"
 *      403:
 *        description: Missin or invalid token
 */
router.delete("/", isAuthenticated, userController.delete);

/**
 * @swagger
 * /api/users/login-count:
 *  get:
 *    tags: [User]
 *    summary: Login count of the logged in user
 *    description: Get the login count of the logged in user
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  type: number
 *                  example: 2
 *      403:
 *        description: Missin or invalid token
 */
router.get("/login-count", isAuthenticated, userController.getLoginCount);

/**
 * @swagger
 *  /api/users/repositories:
 *    get:
 *      tags: [User]
 *      summary: Get repositories from logged in user
 *      description: Get repositories from logged in user
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: string
 *                    example: OK
 *                  data:
 *                    type: array
 *                    items:
 *                      $ref: "#components/schemas/Repository"
 *        403:
 *          description: Missin or invalid token
 */
router.get("/repositories", isAuthenticated, userController.getRepositories);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    tags: [User]
 *    summary: Get a user by id
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: "#/components/parameters/userId"
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  $ref: "#components/schemas/User"
 *      400:
 *        description: Invalid parameter
 *      403:
 *        description: Missin or invalid token
 *      404:
 *        description: User not found
 */
router.get("/:id", isAuthenticated, userValidator.validateIdParam, userController.getOne);

/**
 * @swagger
 * /api/users/{id}/repositories:
 *  get:
 *    tags: [User]
 *    summary: Get repositories by user id
 *    description: Get repositories by user id
 *    parameters:
 *      - $ref: "#/components/parameters/userId"
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: OK
 *                data:
 *                  $ref: "#components/schemas/Repository"
 *      400:
 *        description: Invalid parameter
 *      403:
 *        description: Missin or invalid token
 *      404:
 *        description: User not found
 */
router.get(
  "/:id/repositories",
  isAuthenticated,
  userValidator.validateIdParam,
  userController.getRepositoriesByUserId
);

export default router;
