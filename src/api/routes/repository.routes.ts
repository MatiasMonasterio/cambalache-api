import { Router } from "express";

import { repositoryController } from "../controlllers";
import { isAuthenticated } from "../middleware";
import { repositoryValidator } from "../validators";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Repository
 *  description: Repository endpoint
 * components:
 *  parameters:
 *    repositoryId:
 *     in: path
 *     name: id
 *     required: true
 *     description: Repository id
 *     schema:
 *       type: string
 *       example: 1
 */

/**
 * @swagger
 *  /api/repositories:
 *    get:
 *      tags: [Repository]
 *      summary: Get repositories
 *      description: Get all repositories
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
 *                      $ref: "#/components/schemas/Repository"
 *        403:
 *          description: Missin or invalid token
 */
router.get("/", isAuthenticated, repositoryController.getAll);

/**
 * @swagger
 * /api/repositories:
 *  post:
 *      tags: [Repository]
 *      summary: Create repository
 *      description: Create a new repository and connect with the logged in user
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: pockeapi-rest-with-ci
 *                          description:
 *                              type: string
 *                              examplte: new pockeapi
 *                          languaje:
 *                              type: string
 *                              examplte: php
 *                              enum:
 *                                  - javascript
 *                                  - python
 *                                  - java
 *                                  - c
 *                                  - rust
 *                                  - go
 *                                  - r
 *                                  - swift
 *                                  - php
 *      responses:
 *          201:
 *              description: Successful operation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 *                              data:
 *                                $ref: "#/components/schemas/Repository"
 *          400:
 *              description: Some field is invalid
 *          403:
 *              description: Missin or invalid token
 */
router.post("/", isAuthenticated, repositoryValidator.validateCreate, repositoryController.create);

/**
 * @swagger
 * /api/repositories/{id}:
 *  get:
 *      tags: [Repository]
 *      summary: Get one repository
 *      description: Get one repository by id
 *      parameters:
 *          - $ref: "#/components/parameters/repositoryId"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successful operation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                type: string
 *                                examplte: OK
 *                              data:
 *                                $ref: "#/components/schemas/Repository"
 *          400:
 *              description: Invalid parameter
 *          403:
 *              description: Missin or invalid token
 *          404:
 *              description: Repository not found
 */
router.get(
  "/:id",
  isAuthenticated,
  repositoryValidator.validateIdParam,
  repositoryController.getOneById
);

/**
 * @swagger
 * /api/repositories/{id}:
 *  put:
 *      tags: [Repository]
 *      summary: Update repository
 *      description: Update user repository logged in by repository id
 *      parameters:
 *          - $ref: "#/components/parameters/repositoryId"
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: pockeapi-rest-with-ci
 *                          description:
 *                              type: string
 *                              examplte: new pockeapi
 *                          languaje:
 *                              type: string
 *                              examplte: php
 *                              enum:
 *                                  - javascript
 *                                  - python
 *                                  - java
 *                                  - c
 *                                  - rust
 *                                  - go
 *                                  - r
 *                                  - swift
 *                                  - php
 *      responses:
 *          200:
 *              description: Successful operation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            status:
 *                              type: string
 *                              example: OK
 *                            data:
 *                              $ref: "#/components/schemas/Repository"
 *          400:
 *              description: Invalid parameter / Some field is invalid
 *          403:
 *              description: Missin or invalid token
 *          404:
 *              description: Repository not found
 */
router.put(
  "/:id",
  isAuthenticated,
  repositoryValidator.validateIdParam,
  repositoryValidator.validateUpdate,
  repositoryController.update
);

/**
 * @swagger
 * /api/repositories/{id}:
 *  delete:
 *      tags: [Repository]
 *      summary: Remove repository
 *      description: Remove user repository logged in by repository id
 *      parameters:
 *          - $ref: "#/components/parameters/repositoryId"
 *      security:
 *        - bearerAuth: []
 *      responses:
 *          200:
 *              description: Successful operation
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 *                              data:
 *                                $ref: "#/components/schemas/Repository"
 *          400:
 *              description: Invalid parameter
 *          403:
 *              description: Missin or invalid token
 *          404:
 *              description: Repository not found
 */
router.delete(
  "/:id",
  isAuthenticated,
  repositoryValidator.validateIdParam,
  repositoryController.delete
);

export default router;
