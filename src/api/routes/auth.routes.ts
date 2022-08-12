import { Router } from "express";

import { authController } from "../controlllers";
import { authValidator } from "../validators";
import { isAuthenticated } from "../middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth endpoint
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      tags: [Auth]
 *      summary: Register user
 *      description: Register and login in the same process. return token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - name
 *                          - email
 *                          - password
 *                          - birthdayDate
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Matias M. Monasterio
 *                          email:
 *                              type: string
 *                              example: matias_monasterio@outlook.com
 *                          password:
 *                              type: string
 *                              example: userpassword
 *                          birthdayDate:
 *                              type: string
 *                              format: date
 *                              example: 1995-01-12
 *                          languaje:
 *                              type: string
 *                              examplte: javascript
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
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGlhcyBNLiBNb25hc3RlcmlvIiwiZW1haWwiOiJtYXRpYXNfbW9uYXN0ZXJpb0BvdXRsb29rLmNvbSIsImlhdCI6MTY2MDA4NDkwNCwiZXhwIjoxNjYwMDg2NzA0fQ.HAWrczWsZMySUgNufvTYD1HcfNOkDg-y4BmoVgmL_1o
 *
 *          400:
 *              description: Some field is invalid
 *          409:
 *              description: User already exist
 *
 */
router.post("/register", authValidator.validateRegister, authController.register);

/**
 * Login User
 * @swagger
 *  /api/auth/login:
 *  post:
 *      tags: [Auth]
 *      summary: Login user
 *      description: Login user. Return token
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: matias_monasterio@outlook.com
 *                          password:
 *                              type: string
 *                              example: userpassword
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
 *                                  type: string
 *                                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ik1hdGlhcyBNLiBNb25hc3RlcmlvIiwiZW1haWwiOiJtYXRpYXNfbW9uYXN0ZXJpb0BvdXRsb29rLmNvbSIsImlhdCI6MTY2MDA4NDkwNCwiZXhwIjoxNjYwMDg2NzA0fQ.HAWrczWsZMySUgNufvTYD1HcfNOkDg-y4BmoVgmL_1o
 *          400:
 *              description: Some field is invalid
 *          401:
 *              description: Invalid email or password
 *
 */
router.post("/login", authValidator.validateCredentials, authController.login);

/**
 * @swagger
 *  /api/auth/logout:
 *       post:
 *          tags: [Auth]
 *          summary: Logout user
 *          description: Log out the user and upload the token to the blacklist
 *          responses:
 *              200:
 *                  description: Successful operation
 *              403:
 *                  description: Missin or invalid token
 *          security:
 *              - bearerAuth: []
 *
 */
router.post("/logout", isAuthenticated, authController.logout);

export default router;
