import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    swagger: '2.0',
    info: {
        title: 'Task API',
        version: '1.0.0',
        description: 'A simple Express CRUD API for managing tasks',
    },
    servers: [
        {
            url: 'http://localhost:4006',
            description: 'Development server',
        }
    ],
    paths: {
        '/api/users/signup': {
            post: {
                tags: ['Users'],
                summary: 'Registers a new user',
                description: 'Register a new user with the provided username, email, and password',
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        description: 'User information',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                username: { type: 'string' },
                                email: { type: 'string' },
                                password: { type: 'string' }
                            },
                            required: ['username', 'email', 'password']
                        }
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    email: { type: 'string' },
                                    password: { type: 'string' }
                                },
                                required: ['username', 'email', 'password']
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'User registered successfully',
                        schema: {
                            type: 'object',
                            properties: {
                                status: { type: 'string' },
                                message: { type: 'string' },
                                data: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' },
                                        user: { $ref: '#/components/schemas/User' }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                },
            },
        },
        '/api/users/login': {
            post: {
                tags: ['Users'],
                summary: 'Logs in a user',
                description: 'Log in a user with the provided email and password',
                parameters: [
                    {
                        name: 'body',
                        in: 'body',
                        description: 'User information',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                email: { type: 'string' },
                                password: { type: 'string' }
                            },
                            required: ['email', 'password']
                        }
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    password: { type: 'string' }
                                },
                                required: ['email', 'password']
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'User logged in successfully',
                        schema: {
                            type: 'object',
                            properties: {
                                status: { type: 'string' },
                                message: { type: 'string' },
                                data: {
                                    type: 'object',
                                    properties: {
                                        token: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                },
            },
        },
        '/api/users': {
            get: {
                tags: ['Users'],
                summary: 'Get all users',
                description: 'Get all registered users',
                security: [{ JWTAuth: [] }],
                responses: {
                    '200': {
                        description: 'Successfully found all users',
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "Successfully found all users" },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/User" } // ✅ Reference User schema
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                },
            },
        },
        '/api/users/{id}': {
            get: {
                tags: ['Users'],
                summary: 'Get user by ID',
                description: 'Get user information by ID',
                security: [{ JWTAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'User ID',
                        required: true,
                        type: 'string'
                    }
                ],
                responses: {
                    '200': {
                        description: 'User found',
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "User found" },
                                        data: { $ref: "#/components/schemas/User" } // ✅ Reference User schema
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'User not found',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal server error',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                },
            },
            patch: {
                tags: ['Users'],
                summary: 'Update user by ID',
                description: 'Update user information by ID',
                security: [{ JWTAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'User ID',
                        required: true,
                        type: 'string'
                    },
                    {
                        in: 'body',
                        name: 'user',
                        description: 'Details to update the user',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                username: { type:'string' },
                                email: { type: 'string' }
                            },
                            optional: ['username', 'email'],
                        }
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    email: { type: 'string' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'User updated successfully',
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "User updated successfully" },
                                        data: { $ref: "#/components/schemas/User" } // ✅ Reference User schema
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad request',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                    '404': {
                        description: 'User not found',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                },
            },
            delete: {
                tags: ['Users'],
                summary: 'Delete user by ID',
                description: 'Delete user by ID',
                security: [{ JWTAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        description: 'User ID',
                        required: true,
                        type: 'string'
                    }
                ],
                responses: {
                    '200': {
                        description: 'User deleted successfully',
                        schema: {
                            type: 'object',
                            properties: {
                                status: { type: 'string' },
                                message: { type: 'string' }
                            }
                        }
                    },
                    '404': {
                        description: 'User not found',
                        schema: {
                            type: 'object',
                            properties: {
                                message: { type: 'string' }
                            }
                        }
                    },
                },
            },
        },
        '/api/tasks/add': {
            post: {
                tags: ['Tasks'],
                summary: 'Create a new task',
                description: 'Create a new task with the provided title and description',
                security: [{ JWTAuth: [] }], 
                parameters: [
                    {
                        in: 'body',
                        name: 'body',
                        description: 'Task information',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                description: { type: 'string' }
                            },
                            required: ['title']
                        }
                    }
                ],
                requestBody: {  
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    title: { type: 'string' },
                                    description: { type: 'string' }
                                },
                                required: ['title']
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Task created successfully",
                        content: {
                            "application/json": { 
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "Task created successfully" },
                                        data: { $ref: "#/components/schemas/Task" } // ✅ Reference Task schema
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {  // ✅ Wrap error response in content
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Title is required" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/tasks': {
            get: {
                tags: ["Tasks"],
                summary: "Get all tasks",
                description: "Get all tasks",
                security: [{ JWTAuth: [] }],
                responses: {
                    "200": {
                        description: "Successfully found all tasks",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "Successfully found all tasks" },
                                        data: {
                                            type: "array",
                                            items: { $ref: "#/components/schemas/Task" } // ✅ Reference Task schema
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Internal server error" }
                                    }
                                }
                            }
                        }
                    },
                }
            },
        },
        '/api/tasks/{id}': {
            get: {
                tags: ["Tasks"],
                summary: "Get task by ID",
                description: "Get task by ID",
                security: [{ JWTAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Task ID",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "Task found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "Task found" },
                                        data: { $ref: "#/components/schemas/Task" } // ✅ Reference Task schema
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Task not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Task not found" }
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Internal server error",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Internal server error" }
                                    }
                                }
                            }
                        }
                    },
                }
            },
            patch: {
                tags: ["Tasks"],
                summary: "Update task by ID",
                description: "Update task by ID",
                security: [{ JWTAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Task ID",
                        required: true,
                        type: "string"
                    },
                    {
                        in: 'body',
                        name: 'update task dto',
                        description: 'Details to update the tasks',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: {
                                title: { type: 'string' },
                                description: { type: 'string' },
                                status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                            },
                            optional: ['title', 'description', 'status'],
                        }
                    }
                ],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string", example: "Complete project report" },
                                    description: { type: "string", example: "Finish the report before the deadline" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Task updated successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "Task updated successfully" },
                                        data: { $ref: "#/components/schemas/Task" } // ✅ Reference Task schema
                                    }
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Bad request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Title is required" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Task not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Task not found" }
                                    }
                                }
                            }
                        }
                    },
                }
            },
            delete: {
                tags: ["Tasks"],
                summary: "Delete task by ID",
                description: "Delete task by ID",
                security: [{ JWTAuth: [] }],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        description: "Task ID",
                        required: true,
                        type: "string"
                    }
                ],
                responses: {
                    "200": {
                        description: "Task deleted successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        message: { type: "string", example: "Task deleted successfully" }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Task not found",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        message: { type: "string", example: "Task not found" }
                                    }
                                }
                            }
                        }
                    },
                }
            },
        }
    },
    securityDefinitions: {
        JWTAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    username: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' }
                },
                required: ['username', 'email', 'password']
            },
            Task: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "605c72b8d5d7f9001788d394" },
                    title: { type: "string", example: "Complete project report" },
                    description: { type: "string", example: "Finish the report before the deadline" },
                    status: { 
                        type: "string", 
                        enum: ["pending", "in-progress", "completed"], 
                        example: "pending"
                    },
                    user: { type: "string", ref: "User", example: "605c72b8d5d7f9001788d392" },
                    createdAt: { type: "string", format: "date-time", example: "2024-02-26T12:00:00Z" },
                    updatedAt: { type: "string", format: "date-time", example: "2024-02-26T12:30:00Z" }
                },
                required: ["title", "status", "user"]
            }
        }
    }
}

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.ts"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;