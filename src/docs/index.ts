import swaggerJSDoc from "swagger-jsdoc";
import { Languaje } from "../types";

export default swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Cambalache REST API",
      version: "1.0.0",
    },
    server: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["id", "name", "email", "birthdayDate", "createdAt", "updatedAt"],
          properties: {
            id: {
              type: "number",
              example: 14,
            },
            name: {
              type: "string",
              example: "Matias M. Monasterio",
            },
            email: {
              type: "string",
              example: "matias_monasterio@outlook.com",
            },
            birthdayDate: {
              type: "string",
              format: "date",
              example: "1995-12-01T00:00:00Z",
            },
            languaje: {
              type: "string",
              example: "javascript",
              enum: Languaje,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2021-01-30T08:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              examplte: "2021-01-30T08:30:00Z",
            },
          },
        },
        Repository: {
          type: "object",
          required: ["id", "name", "languaje", "createdAt", "updatedAt"],
          properties: {
            id: {
              type: "number",
              example: 2,
            },
            name: {
              type: "string",
              example: "test-repository",
            },
            description: {
              type: "string",
              example: "A simple repository",
            },
            languaje: {
              type: "string",
              example: "javascript",
              enum: Languaje,
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2021-01-30T08:30:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2021-01-30T08:30:00Z",
            },
          },
        },
      },
    },
  },
  apis: ["./src/api/routes/*.routes.ts"],
});
