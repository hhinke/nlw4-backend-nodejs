import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import CreateConnection from '../database';

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await CreateConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Survey Title",
            description: "Description of the new Survey"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to list all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Survey Title 2",
            description: "Description of the new Survey"
        });

        const response = await request(app).get("/surveys");

        expect(response.body.length).toBe(2);
    })
});